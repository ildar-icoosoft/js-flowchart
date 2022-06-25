'use strict';

let ARROW_TYPE = {
    default1: {
      type: 'pathString',
      content: 'M0 0 L-3 3 L2 0 L-3 -3 Z'
    },
    default: {
      type: 'pathString',
      content: 'M5 0 L0 -2 Q 1.0 0 0 2 Z'
    },
    length: 5,
};

function calcSlope(opts) {
  let shapeType = opts.shapeType;
  let dom = opts.dom;
  let arrowPosition = opts.arrowPosition ?? 0.5;
  let path = opts.path;
  let coordinates = path.split(' ');
  let x = 0;
  let y = 0;

  if (shapeType === 'BezierTest' || shapeType === 'AdvancedBezierTest') {
    let p0 = {x: coordinates[8], y: coordinates[9]};
    let p1 = {x: coordinates[1], y: coordinates[2]};

    if (arrowPosition !== 1) {
      p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition + 0.001);
      p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
    } else {
      p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
      p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition - 0.001);
    }

    x = p1.x - p0.x;
    y = p1.y - p0.y;
  } else if (shapeType === 'Straight') {
    let p0 = {x: coordinates[1], y: coordinates[2]};
    let p1 = {x: coordinates[4], y: coordinates[5]};

    x = p1.x - p0.x;
    y = p1.y - p0.y;
  } else {
    let p0 = 0;
    let p1 = 1;

    if (arrowPosition !== 1) {
      p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
      p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition + 0.001);
    } else {
      p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition - 0.001);
      p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
    }

    x = p1.x - p0.x;
    y = p1.y - p0.y;
  }

  return {x, y};
}

const registerArrow = (arrows) => {
  arrows.forEach((item) => {
    ARROW_TYPE[item.key] = {
      type: item.type,
      content: item.content,
      width: item.width,
      height: item.height
    }
  });
}

export default {
  calcSlope,
  ARROW_TYPE,
  registerArrow
};
