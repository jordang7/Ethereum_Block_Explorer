import logo from "./logo.svg";
import "./App.css";
import CurrentBlock from "./components/CurrentBlock";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
function App() {
  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/Home">Ethereum Block Explorer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/CurrentBlock">CurrentBlock</Nav.Link>
                {/* <Nav.Link href="/Transactions">Transactions</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/currentblock" component={CurrentBlock} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
