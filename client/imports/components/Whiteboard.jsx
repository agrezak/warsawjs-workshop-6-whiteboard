import React, { Component } from 'react';
import { fabric } from 'fabric';

export default class Whiteboard extends Component {

    componentDidMount() {
        const canvas = new fabric.Canvas('c', {
            isDrawingMode: true
        });
    }

    render() {
        return (
            <canvas id="c" width="800" height="600"></canvas>
        );
    }
}