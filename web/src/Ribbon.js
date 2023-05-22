import { Component } from "react";


class Ribbon extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    } 

    render() {
        return (
            
            <a href={this.props.url}><img decoding="async" loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
        );
    }
}

export default Ribbon;