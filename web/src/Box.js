import { Component } from "react";


const iframeStyles = {
  border: 0,
}

class Box extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <iframe
                data-testid="box"
                title="Box"
                width="100%"
                height="100vh"
                src={this.props.containerURL }
                style={iframeStyles}>
            </iframe>
        );
    }
}

export default Box;