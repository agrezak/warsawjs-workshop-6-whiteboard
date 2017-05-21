import React, { Component } from 'react';
import Whiteboard from './Whiteboard.jsx';
import FabricObjects from '../../lib/fabric-objects';

if (Meteor.isDevelopment) {
    global.FabricObjects = FabricObjects;
}

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDrawingMode: true
        };
    }

    render() {
        const { isDrawingMode } = this.state;
        return (
            <div className="container">
                <h1>Whiteboard App</h1>
                <Whiteboard
                    isDrawingMode={isDrawingMode}
                />
                <label>
                    <input
                        type="checkbox"
                        onChange={(event) => {
                            this.setState({
                                isDrawingMode: event.target.checked,
                            });
                        }}
                        checked={isDrawingMode}
                    />
                    Drawing mode
                </label>
            </div>
        );
    }
}