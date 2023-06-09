import { Component } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as Sentry from "@sentry/react";
import ReactGA4 from "react-ga4";
import './App.css';
import Box from './Box';
import Loader from './Loader';
import ENavbar from './ENavbar';
import EError from './EError';


class App extends Component {

    constructor(props) {
        super(props);
        this._mounted = false;
        this.state = {
          loading: true,
          showTerminationAlert: false,
        }
    }

    handleNewBox = (type) => {
      ReactGA4.event({
        action: 'New-box',
        label: type,
      }); 
      this.setState({
        loading: true,
        showTerminationAlert: false,
        error: undefined,
        statusCode: undefined,
        containerURL: undefined,
      });
      this.createBox(type);
    }

    createBox(type) {
      if (this.props.forcedState === "loading") {
        return;
      }
      if (this.props.forcedState === "error") {
        this.setState({
          loading: false,
          containerURL: undefined,
          statusCode: 500,
          error: new Error("Mocked error description"),
          showTerminationAlert: false,
        });
        return;
      }
      const instance = axios.create({
        baseURL: this.props.apiURL,
        timeout: this.props.apiTimeout,
      });
      instance.post('/prod/boxes/', {type: type}).then(postResponse => {
          axiosRetry(instance, {
            retries: 10, // number of retries
            shouldResetTimeout: true,
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
              showTerminationAlert: true,
            });
          }).catch(e => {
            this.setState({
              loading: false,
              containerURL: undefined,
              statusCode: e.response?.status || e.code,
              error: String(e),
              showTerminationAlert: false,
            });
            console.error('API error', e);
            Sentry.captureException(e);
          });
      }).catch(e => {
          this.setState({
            loading: false,
            containerURL: undefined,
            statusCode: e.response?.status || e.code,
            error: String(e),
            showTerminationAlert: false,
          });
          console.error('API error', e);
          Sentry.captureException(e);
      });
    }

    componentDidMount() {
      if (this._mounted) {
        return;
      }
      this._mounted = true;
      this.createBox('alpine');
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
            <ENavbar
              handleNewBox={this.handleNewBox}
              showAboutModal={true}
              showTerminationAlert={this.state.showTerminationAlert}
              boxTimeout={this.props.boxTimeout}
            />
            {component}
          </>
        );
    }
}

export default App;
