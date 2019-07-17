import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';

//react
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter as Router, Route, Link, matchPath} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import routers from '../routers';
import createStore, {initializeSession, storeData} from '../redux';

//components
import Layout from '../app/layout';
import Home from '../app/home';
import Notification from '../app/notification';

const app = express ();
app.use (bodyParser.json ({limit: '20mb'}));
app.use (bodyParser.urlencoded ({limit: '20mb', extended: true}));
app.use (cookieParser ());

app.use ('/', express.static ('./dist'));

const htmlTemplate = fs.readFileSync ('./dist/app.html', 'utf-8');

app.get ('*', async (req, res) => {
  const store = createStore ();
  const dispatch = store.dispatch;

  dispatch (initializeSession ());

  let currentRoute = null;
  routers.some (route => {
    const match = matchPath (req.path, route);
    // console.log (match);
    if (match) currentRoute = route;
    return match;
  });

  if (currentRoute.loadData) {
    await currentRoute.loadData () (dispatch);
  }

  // const context = {};
  const AppComponent = ReactDOMServer.renderToString (
    <ReduxProvider store={store}>
      <Router location={req.url}>
        <Layout />
      </Router>
    </ReduxProvider>
  );

  const reduxState = JSON.stringify (store.getState ()).replace (/</g, '\\x3c');

  let reactDom = htmlTemplate.replace ('<!-- app -->', AppComponent);
  // console.log (reactDom);
  reactDom = reactDom.replace ('REDUX_DATA_INIT', reduxState);
  res.send (reactDom);
});

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});
