import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { fabric } from 'fabric';
import FabricObjects from '../../lib/fabric-objects';

export default class Whiteboard extends Component {

    componentDidMount() {

        const canvas = new fabric.Canvas(findDOMNode(this), {
            isDrawingMode: this.props.isDrawingMode,
            selection: false
        });

        this.canvas = canvas;

        this.canvas.on('object:added', async ({ target: fabricObject }) => {
            try {
                const id = await FabricObjects.genInsert(fabricObject.toObject());
                fabricObject.id = id;
                console.log(id);
                // const id = FabricObjects.insert(fabricObject.toObject());

            } catch(e) {
                console.log(String(e));
            }

        });

        this.canvas.on('object:modified', () => {

        });

        this.canvas.on('object:remove', () => {

        });

    }

    componentWillUpdate(nextProps) {
        this.canvas.isDrawingMode = nextProps.isDrawingMode;
    }

    render() {
        return (
            <canvas width="800" height="600" className="canvas"></canvas>
        );
    }
}