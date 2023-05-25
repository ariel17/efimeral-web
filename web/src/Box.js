import { Component } from "react";
import Container from 'react-bootstrap/Container';


const iframeStyles = {
  border: 0,
  'margin-top': '5px',
}

class Box extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <Container fluid>
                <iframe
                    data-testid="box"
                    title="Box"
                    width="100%"
                    height="700vh"
                    src={this.props.containerURL }
                    style={iframeStyles}>
                </iframe>
            </Container>
        );
    }
}

export default Box;