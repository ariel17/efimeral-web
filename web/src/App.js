import { Component } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as Sentry from "@sentry/react";
import './App.css';
import Box from './Box';
import Loader from './Loader';
import ENavbar from './ENavbar';
import EError from './EError';


class App extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this._mounted = false;
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
      if (process.env.REACT_APP_FORCED_STATE === "loading") {
        return;
      }
      if (process.env.REACT_APP_FORCED_STATE === "error") {
        this._mounted = true;
        this.setState({
          loading: false,
          containerURL: undefined,
          statusCode: 500,
          error: new Error("Mocked error description"),
        });
        return;
      }

      if (this._mounted) {
        return;
      }
      this._mounted = true;
      const instance = axios.create({
        baseURL: this.props.apiURL,
        timeout: Number(this.props.apiTimeout),
      });
      instance.post('/prod/boxes/').then(postResponse => {

          axiosRetry(instance, {
            retries: 10, // number of retries
            retryDelay: (retryCount) => {
                console.log(`API check running box attempt: ${retryCount}`);
                return retryCount * 1000; // time interval between retries
            },
            retryCondition: (error) => {
                return error.response.status === 404;
            },
          });
          instance.get(`/prod/boxes/${postResponse.data.box_id}`).then(getResponse => {
            this.setState({
              loading: false,
              containerURL: getResponse.data.url,
              error: undefined,
              statusCode: getResponse.data.statusCode,
            });

          }).catch(e => {
            throw e;
          });

      }).catch(e => {
          this.setState({
            loading: false,
            containerURL: undefined,
            statusCode: e.response?.status || e.code,
            error: String(e),
          });
          console.error('API error', e);
          Sentry.captureException(e);
      });
    }

    render() {
        let component;
        if (this.state.loading) {
            component = <Loader />;
        } else if (!this.state.loading && this.state.containerURL) {
            component = <Box containerURL={this.state.containerURL} />;
        } else {
            component = <EError statusCode={this.state.statusCode} error={this.state.error}></EError>;
        }

        return (
          <>
            <ENavbar />
            {component}
          </>
        );
    }
}

export default App;
