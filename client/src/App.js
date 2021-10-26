import logo from "./logo.svg";
import "./App.css";
import BlockDetail from "./components/BlockDetail";
import HomePage from "./components/HomePage";
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
              <Nav className="me-auto"></Nav>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
