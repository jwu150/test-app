import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const IAApp = () => (
  <Router>
    <div>
      <Nav>
        <NavItem>
          <NavLink>
            <Link to="/">Home</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/app">Tweets</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/topics">Topics</Link>
          </NavLink>
        </NavItem>
      </Nav>
      <Route exact path="/" component={Home} />
      <Route path="/app" component={App} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Home = () => (
  <header className="App-header">
    <h1 className="App-title">Home</h1>
  </header>
);

const Topics = ({ match }) => (
  <div>
    <header className="App-header">
      <h1 className="App-title">Topics</h1>
    </header>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default IAApp;