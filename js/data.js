'use strict';

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
    id: '2',
    text: 'Employees manually activates alarm',
    top: 150,
    left: 250,
    width: 100,
    height: 60,
    color: 'green',
    shape: 'rect',
    border: 'solid',
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
  }],
  edges: [{
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '0',
    targetNode: '1',
    color: 'black',
  }, {
    sourceEndpoint: 'left',
    targetEndpoint: 'right',
    sourceNode: '1',
    targetNode: '2',
    label: 'no',
    color: 'black',
  }],
};

