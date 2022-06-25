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
  const dom = opts.dom;
  const arrowPosition = opts.arrowPosition ?? 0.5;

  let p0;
  let p1;

  if (arrowPosition !== 1) {
    p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
    p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition + 0.001);
  } else {
    p0 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition - 0.001);
    p1 = dom.getPointAtLength(dom.getTotalLength() * arrowPosition);
  }

  const x = p1.x - p0.x;
  const y = p1.y - p0.y;

  return {x, y};
}

export default {
  calcSlope,
  ARROW_TYPE,
};
