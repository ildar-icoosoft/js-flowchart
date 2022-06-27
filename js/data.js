'use strict';

export default {
  nodes: [{
    id: '0',
    text: 'Fire Incident',
    top: 10,
    left: 510,
    width: 80,
    height: 80,
    color: 'green',
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
    width: 145,
    height: 145,
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
    width: 107,
    height: 77,
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
  }, {
    id: '3',
    text: 'Activate evacuation',
    top: 150,
    left: 50,
    width: 107,
    height: 77,
    color: 'green',
    shape: 'rect',
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
    id: '4',
    text: 'Activate evacuation',
    top: 150,
    left: 750,
    width: 107,
    height: 77,
    color: 'green',
    shape: 'rect',
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
    id: '5',
    text: 'Employees informs primary contact',
    top: 280,
    left: 250,
    width: 107,
    height: 77,
    color: 'green',
    shape: 'rect',
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
    id: '6',
    text: 'Evacuees report to Gathering Point / Safe Area',
    top: 330,
    left: 950,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '7',
    text: 'Alarm monitoring service provider contacts orangnization?',
    top: 380,
    left: 500,
    width: 145,
    height: 145,
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
    id: '8',
    text: 'Roll call taken by team leads',
    top: 450,
    left: 950,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '9',
    text: 'Floor Marshals brief Crisis Management Team using floor plans',
    top: 570,
    left: 950,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '10',
    text: 'Primary contact contacts Fire Department',
    top: 500,
    left: 700,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '11',
    text: 'Primary contact informs Emergency Response Team',
    top: 620,
    left: 700,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '12',
    text: 'Emergency Response Team informs Crisis Management Team',
    top: 740,
    left: 700,
    width: 107,
    height: 77,
    color: 'black',
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
  }, {
    id: '13',
    text: 'Primary contact confirm fire incident',
    top: 610,
    left: 498,
    width: 107,
    height: 77,
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
  }, {
    id: '14',
    text: 'Service Provider contacts Frie Department',
    top: 730,
    left: 498,
    width: 107,
    height: 77,
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
  }, {
    id: '15',
    text: 'Fire Engines arrives',
    top: 850,
    left: 498,
    width: 107,
    height: 77,
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
  }, {
    id: '16',
    text: 'Cris Management Team Leader briefs Battalion Chief',
    top: 970,
    left: 498,
    width: 107,
    height: 77,
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
  }, {
    id: '17',
    text: 'Fire Department becomes Incident Commander',
    top: 630,
    left: 250,
    width: 107,
    height: 77,
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
  }, {
    id: '18',
    text: 'Fire Department gives All-Clear signal',
    top: 750,
    left: 250,
    width: 107,
    height: 77,
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
  }, {
    id: '19',
    text: 'Crisis Management Team directs future actions',
    top: 870,
    left: 250,
    width: 107,
    height: 77,
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
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'right',
    targetEndpoint: 'left',
    sourceNode: '1',
    targetNode: '4',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'left',
    targetEndpoint: 'right',
    sourceNode: '1',
    targetNode: '2',
    color: 'purple',
    label: 'no',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '1',
    targetNode: '7',
    color: 'purple',
    label: 'yes',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'left',
    targetEndpoint: 'right',
    sourceNode: '2',
    targetNode: '3',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '2',
    targetNode: '5',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'left',
    sourceNode: '5',
    targetNode: '7',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'right',
    targetEndpoint: 'top',
    sourceNode: '4',
    targetNode: '6',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '6',
    targetNode: '8',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '8',
    targetNode: '9',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'right',
    sourceNode: '9',
    targetNode: '16',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'right',
    targetEndpoint: 'top',
    sourceNode: '7',
    targetNode: '10',
    color: 'purple',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '10',
    targetNode: '11',
    color: 'black',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '11',
    targetNode: '12',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '7',
    targetNode: '13',
    color: 'purple',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '13',
    targetNode: '14',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '14',
    targetNode: '15',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '15',
    targetNode: '16',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'left',
    targetEndpoint: 'top',
    sourceNode: '16',
    targetNode: '17',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '17',
    targetNode: '18',
    color: 'green',
    arrowPosition: 1,
  }, {
    sourceEndpoint: 'bottom',
    targetEndpoint: 'top',
    sourceNode: '18',
    targetNode: '19',
    color: 'green',
    arrowPosition: 1,
  }]
};

