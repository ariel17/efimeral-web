import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull } from '@fortawesome/free-solid-svg-icons'


const rowSpinnerStyle = {
    'padding-top': '300px',
    'padding-bottom': '60px',
    color: '#FFAAAA',
    display: 'inline-block',
    width: '100%',
}

const rowTextStyle = {
    color: '#FFAAAA',
}

class EError extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <Container fluid className="fill-height">
                <Row lg="auto" className="text-center" style={rowSpinnerStyle}>
                    <FontAwesomeIcon icon={faSkull} className="fa-10x" />
                </Row>
                <Row className="text-center" style={rowTextStyle}>
                    <p className="error">Something terrible had happened, Yisus...</p>
                    <p>{ String(this.props.error) }</p>
                </Row>
            </Container>
        );
    }
}

export default EError;