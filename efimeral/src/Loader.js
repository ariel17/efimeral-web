import { Component } from "react";
import SquareLoader from "react-spinners/SquareLoader";


class Loader extends Component {

    render() {
        return (
            <SquareLoader color="#AABBCC" loading="true" size="150px" aria-label="Loading" />
        );
    }
}

export default Loader;