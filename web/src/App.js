import { Component } from 'react';
import './App.css';
import SquareLoader from "react-spinners/SquareLoader";
import Box from './Box';
import axios from 'axios';


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
      if (this._mounted) {
        return;
      }
      this._mounted = true;
      const instance = axios.create({
        baseURL: this.props.apiURL,
        timeout: Number(this.props.apiTimeout),
      });
      instance.post('/prod/').then(response => {
          this.setState({
            loading: false,
            containerURL: response.data.url,
            error: undefined,
          });
      }).catch(e => {
          this.setState({
            loading: false,
            containerURL: undefined,
            error: String(e),
          });
          console.error('API error', e);
      });
    }

    render() {
        if (this.state.loading) {
            return (
                <SquareLoader data-testid="spinner" color="#AABBCC" loading="true" size="150px" aria-label="Loading" />
            );
        }
        if (!this.state.loading && this.state.containerURL) {
            return (
                <Box containerURL={this.state.containerURL} />
            );
        } 

        return (
          <div>{this.state.error}</div>
        );
    }
}

export default App;
