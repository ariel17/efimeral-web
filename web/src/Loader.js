import { Component } from "react";
import SquareLoader from "react-spinners/SquareLoader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};

const rowSpinnerStyle = {
    'padding-top': '300px',
    'padding-bottom': '60px',
}

const rowTextStyle = {
    color: '#FFAAAA',
}

class Loader extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <Container fluid className="fill-height">
                <Row lg="auto" style={rowSpinnerStyle}>
                    <SquareLoader
                        data-testid="spinner"
                        color="#AA3939"
                        cssOverride={override}
                        loading="true"
                        size="50"
                        aria-label="Loading" />
                </Row>
                <Row className="text-center" style={rowTextStyle}>
                    <p className="loader-text">Box is being created; it can take up to 40 seconds. Please be patient.</p>
                </Row>
            </Container>
        );
    }
}

export default Loader;
