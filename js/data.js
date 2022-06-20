'use strict';

import {BaseNode} from './nodes/base-node.js';
import {BaseEdge} from './edges/base-edge.js';

export default {
    nodes: [{
        id: '0',
        text: 'Fire Incident',
        top: 10,
        left: 510,
        width: 100,
        height: 60,
        color: 'orange',
        shape: 'circle',
        border: 'dashed',
        Class: BaseNode,
        endpoints: [{
            id: 'top',
            orientation: [0, -1],
            pos: [0.5, 0]
        }, {
            id: 'right',
            orientation: [1, 0],
            pos: [0, 0.5]
        }, {
            id: 'bottom',
            orientation: [0, 1],
            pos: [0.5, 0]
        }, {
            id: 'left',
            orientation: [-1, 0],
            pos: [0, 0.5]
        }]
    }, {
        id: '1',
        text: 'Auto alarm activated?',
        top: 137,
        left: 500,
        width: 100,
        height: 60,
        color: 'purple',
        shape: 'diamond',
        border: 'solid',
        Class: BaseNode,
    }],
    edges: [{
        source: 'bottom',
        target: 'top',
        sourceNode: '0',
        targetNode: '1',
        type: 'endpoint',
        color: 'black',
        arrow: true,
        arrowPosition: 1,
        Class: BaseEdge
    }],
};

