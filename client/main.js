import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import App from '../imports/client/components/App.jsx';

Meteor.startup(() => {
    render(
        <Router>
            <div>
                <Route exact path="/" component={App}></Route>
                <Route path="/board/:id" component={App}></Route>
            </div>
        </Router>
        , document.getElementById('app'));
});