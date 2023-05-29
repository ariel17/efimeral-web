import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactGA4 from "react-ga4";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons'


class ENavbar extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
          showSignInModal: false,
          showAboutModal: false,
        }
    } 

    render() {
      return (
          <>
            <Navbar fixed="top" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Efimeral</Navbar.Brand>
                <Nav className="justify-content-end">
                  <Nav.Link title="New box" onClick={() => newBox()}><FontAwesomeIcon icon={faPlus} /></Nav.Link>
                  <Nav.Link title="What's this?" onClick={() => this.setState({showAboutModal: true})}><FontAwesomeIcon icon={faCircleInfo} /></Nav.Link>
                  <Nav.Link title="Sign in" onClick={() => this.setState({showSignInModal: true})}><FontAwesomeIcon icon={faUser} /></Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            <SignInModal
              show={this.state.showSignInModal}
              onHide={() => this.setState({showSignInModal: false})}
            />
            <AboutModal
              show={this.state.showAboutModal}
              onHide={() => this.setState({showAboutModal: false})}
            />
          </>
      );
    }
}

function newBox() {
  ReactGA4.event({
    category: 'Refresh',
    action: 'New-box',
  }); 
  window.location.reload(true);
}

function SignInModal(props) {
  ReactGA4.event({
    category: 'Modal',
    action: 'Sign-in',
  });

  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thank you for your interest! We haven't implemented this functionallity yet.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AboutModal(props) {
  ReactGA4.event({
    category: 'Modal',
    action: 'About',
  });

  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>What's this?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Efimeral</h4>
        <p>Linux boxes in your browser.</p>
        <p>Non-root, time limited. Side-project. All the love ❤️</p>
        <p><a href="http://github.com/ariel17/efimeral-web" className="link-dark">See it on GitHub.</a></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ENavbar;