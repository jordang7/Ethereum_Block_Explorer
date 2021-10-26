import "./App.css";
import BlockDetail from "./components/BlockDetail";
import HomePage from "./components/HomePage";
import Accounts from "./components/Accounts";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function App() {
  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Ethereum Block Explorer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/account">Lookup Balance</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/blockDetail/:network/:blockNum"
            component={BlockDetail}
          />
          <Route exact path="/account" component={Accounts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
