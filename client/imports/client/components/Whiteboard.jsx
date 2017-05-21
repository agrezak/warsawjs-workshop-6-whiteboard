import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { fabric } from 'fabric';
import FabricObjects from '../../lib/fabric-objects';

global.FabricObjects = FabricObjects;

export default class Whiteboard extends Component {

    componentDidMount() {

        this.canvas = new fabric.Canvas(findDOMNode(this), {
            isDrawingMode: true,
            selection: false
        });

        this.canvas.on('object:added', () => {

        });

        this.canvas.on('object:modified', () => {

        });

        this.canvas.on('object:remove', () => {

        });

    }

    render() {
        return (
            <canvas id="c" width="800" height="600" className="canvas"></canvas>
        );
    }
}