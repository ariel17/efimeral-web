import { Component } from 'react';
import axios from 'axios';
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
      instance.post('/prod/').then(response => {
          if (response.data.statusCode >= 500) {
            Sentry.captureMessage("API response 5xx", response.data);
            this.setState({
              loading: false,
              containerURL: response.data.url,
              error: response.data.message,
              statusCode: response.data.statusCode,
            });
            return;
          }

          if (response.data.statusCode >= 400 && response.data.statusCode < 500) {
            Sentry.captureMessage("API response 4xx", response.data);
            this.setState({
              loading: false,
              containerURL: response.data.url,
              error: response.data.message,
              statusCode: response.data.statusCode,
            });
            return;
          } 

          this.setState({
            loading: false,
            containerURL: response.data.url,
            error: undefined,
            statusCode: 201,
          });

      }).catch(e => {
          this.setState({
            loading: false,
            containerURL: undefined,
            statusCode: 500,
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
