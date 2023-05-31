import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
          showAboutModal: this.props.showAboutModal || false,
        }
    } 

    render() {
      const newIcon = (<FontAwesomeIcon icon={faPlus} />);
      return (
          <>
            <Navbar fixed="top" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Efimeral</Navbar.Brand>
                <Nav className="justify-content-end">
                  <NavDropdown title={newIcon} bg="dark" variant="dark">
                    <NavDropdown.Item onClick={() => this.props.handleNewBox("alpine")}>Alpine</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => this.props.handleNewBox("ubuntu")}>Ubuntu</NavDropdown.Item>
                  </NavDropdown>  
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
        <p>Linux boxes in your browser. Non-root, time limited. Side-project. All the love ❤️</p>
        <br />
        <p>
          Hi there! you will have access to a freshly new created remote Linux
          box (dockerized) in a remote place. Root access is disabled but you
          have some tools at hand like curl, telnet, htop... and no much more.
          Feel free to explore. 😉 The box will be destroyed after you close
          your browser or tab.
        </p>
        <p>
          You are also time limited 😆 by only 10 minutes; after that time, your
          box will be destroyed and you will need to create another if you want
          to continue. This is a POC project, so it has to be near cost-free
          for me until it makes me millonaire.
        </p>
        <p>
          By default, it creates an Alpine Linux box. You can choose other
          images using the <FontAwesomeIcon icon={faPlus} /> icon in menu.
        </p>
        <p>
          Have fun!
        </p>
        <p><a href="http://github.com/ariel17/efimeral-web" className="link-dark">See it on GitHub.</a></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ENavbar;