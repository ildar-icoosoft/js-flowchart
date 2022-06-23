'use strict';

export default {
  nodes: [{
    id: '0',
    text: 'Fire Incident',
    top: 10,
    left: 510,
    width: 100,
    height: 60,
    shape: 'circle',
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
    shape: 'diamond',
  }, {
    id: '2',
    text: 'Employees manually activates alarm',
    top: 150,
    left: 250,
    width: 100,
    height: 60,
    shape: 'rect',
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
    source: 'bottom',
    target: 'top',
    sourceNode: '0',
    targetNode: '1',
  }, {
    source: 'left',
    target: 'right',
    sourceNode: '1',
    targetNode: '2',
    label: 'no',
  }],
};

