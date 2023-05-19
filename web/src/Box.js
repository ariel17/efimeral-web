import { Component } from "react";

class Box extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            <iframe data-testid="box" title="Box" width="100%" height="1000" src={this.props.containerURL } style={{border: 0, }}>
            </iframe>
        );
    }
}

export default Box;