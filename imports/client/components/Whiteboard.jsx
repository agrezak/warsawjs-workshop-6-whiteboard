import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React from 'react';
import { findDOMNode } from 'react-dom';

import { fabric } from 'fabric';
import FabricObjects from '../../lib/fabric-objects';

Meteor.subscribe('fabricObjects');

class Whiteboard extends React.Component {

    componentDidMount() {

        const canvas = new fabric.Canvas(findDOMNode(this), {
            isDrawingMode: this.props.isDrawingMode,
            selection: false
        });

        window.addEventListener('keyup', () => this.handleKeyEvents(event));
        this._canvas = canvas;

        canvas.on('object:added', async ({ target: fabricObject }) => {

            if (fabricObject.id) {
                return;
            }

            try {
                // const id = FabricObjects.insert(fabricObject.toObject()); - another way of inserting obj
                const id = await FabricObjects.genInsert(fabricObject.toObject());
                fabricObject.id = id;
            } catch(e) {
                console.log(String(e));
            }
        });

        canvas.on('object:modified', async ({ target: fabricObject }) => {
            try {
                await FabricObjects.genUpdate(fabricObject.id, { $set: fabricObject.toObject() } );
            } catch(e) {
                console.log(String(e));
            }
        });

        canvas.on('object:removed', async ({ target: fabricObject }) => {
            try {
                await FabricObjects.genRemove(fabricObject.id);
            } catch(e) {
                console.log(String(e));
            }
        });

        this.fabricObjectsChangesHandle = this.props.fabricObjectsCursor.observeChanges({
            added(id, doc) {
                const objectExists = canvas.getObjectById(id);
                if (objectExists) {
                    return;
                }

                fabric.util.enlivenObjects([doc], ([fabricObject]) => {
                    fabricObject.id = id;
                    canvas.add(fabricObject);
                });
            },
            changed(id, fields) {
                const fabricObject = canvas.getObjectById(id);
                if (!fabricObject) {
                    return;
                }

                fabricObject.set(fields);
                canvas.deactivateAll().renderAll();
            },
            removed(id) {
                const fabricObject = canvas.getObjectById(id);
                if (!fabricObject) {
                    return;
                }

                canvas.remove(fabricObject);
            },
        });

    }

    handleKeyEvents(event) {
        if (event.keyCode === 27) {
            const activeObject = this._canvas.getActiveObject();
            activeObject.remove();
        }
    }

    componentWillUpdate(nextProps) {
        this._canvas.isDrawingMode = nextProps.isDrawingMode;
    }

    componentWillUnmount() {
        this.fabricObjectsChangesHandle.stop();
    }

    render() {
        return (
            <canvas width="800" height="600" className="canvas"></canvas>
        );
    }
}

export default createContainer(() => {
    return {
        objectHandle: Meteor.subscribe('fabricObjects'),
        fabricObjectsCursor: FabricObjects.find()
    };
}, Whiteboard);

fabric.Canvas.prototype.getObjectById = function (id) {
    return this.getObjects().find(obj => obj.id === id);
};