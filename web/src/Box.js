import { Component } from "react";
import Container from 'react-bootstrap/Container';


const iframeStyles = {
  border: 0,
  marginTop: '5px',
}

class Box extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <Container>
                <iframe
                    data-testid="box"
                    title="Box"
                    width="100%"
                    height="920vh"
                    src={this.props.containerURL }
                    style={iframeStyles}>
                </iframe>
            </Container>
        );
    }
}

export default Box;