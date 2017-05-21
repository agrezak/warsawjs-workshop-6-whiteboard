import React, { Component } from 'react';
import Whiteboard from './Whiteboard.jsx';

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <h1>Whiteboard App</h1>
                <Whiteboard/>
            </div>
        );
    }
}