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
                // const id = FabricObjects.insert(fabricObject.toObject()); - another way of inserting obj
                const id = await FabricObjects.genInsert(fabricObject.toObject());
                fabricObject.id = id;
            } catch(e) {
                console.log(String(e));
            }
        });

        this.canvas.on('object:modified', async ({ target: fabricObject }) => {
            try {
                await FabricObject.genUpdate(fabricObject.id, fabricObject.toObject());
                fabricObject.id = id;
            } catch(e) {
                console.log(String(e));
            }
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