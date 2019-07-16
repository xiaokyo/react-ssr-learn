import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//components
import Home from '../app/home';
import Notification from '../app/notification';

const App = () => {
  return (
    <div>
      <Router>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/notification">notification</Link></li>
        </ul>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/notification" component={Notification} />
      </Router>
    </div>
  );
};

ReactDOM.render (<App />, document.getElementById ('app'));
