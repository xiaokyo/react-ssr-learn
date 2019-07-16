import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter as Router, Route, Link} from 'react-router-dom';
import fs from 'fs';
import path from 'path';

//components
import Home from '../app/home';
import Notification from '../app/notification';

const app = express ();
app.use ('/', express.static ('./dist'));

const htmlTemplate = fs.readFileSync ('./dist/app.html', 'utf-8');

app.get ('*', (req, res) => res.send (createStaticRouterComponent (req)));

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});

//replace component
const replaceTemp = component => {
  let mergeHtml = htmlTemplate.replace ('<!-- app -->', component);
  return mergeHtml;
};

//create staticRouter
const createStaticRouterComponent = req => {
  const context = {};
  const AppComponent = ReactDOMServer.renderToString (
    <Router location={req.url} context={context}>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/notification">notification</Link></li>
      </ul>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/notification" component={Notification} />
    </Router>
  );
  return replaceTemp (AppComponent);
};
