import { Component } from "react";
import SquareLoader from "react-spinners/SquareLoader";


const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}

class Loader extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <div style={divStyle}>
                <SquareLoader
                    data-testid="spinner"
                    color="#AA3939"
                    cssOverride={override}
                    loading="true"
                    size="50"
                    aria-label="Loading" />
            </div>
        );
    }
}

export default Loader;