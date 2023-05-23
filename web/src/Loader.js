import { Component } from "react";
import SquareLoader from "react-spinners/SquareLoader";
import Container from 'react-bootstrap/Container';


const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
}

class Loader extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <Container fluid style={containerStyle}>
                <SquareLoader
                    data-testid="spinner"
                    color="#AA3939"
                    cssOverride={override}
                    loading="true"
                    size="50px"
                    aria-label="Loading" />
            </Container>
        );
    }
}

export default Loader;