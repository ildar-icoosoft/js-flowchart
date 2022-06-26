'use strict';

import * as DrawUtil from './utils/link';
import ArrowUtil from './utils/arrow.js';
import {getEndpointCoordinates} from "./utils/endpoint.js";

export class Edge {
  /**
   * @param options
   */
  constructor(options) {
    this.sourceEndpoint = options.sourceEndpoint;
    this.targetEndpoint = options.targetEndpoint;
    this.sourceNode = options.sourceNode;
    this.targetNode = options.targetNode;
    this.label = options.label;
    this.color = options.color;
    this.arrowShapeType = options.arrowShapeType ?? 'default';
    this.arrowPosition = options.arrowPosition ?? 0.5;
    this.arrowOffset = options.arrowOffset ?? 0;
    this.labelPosition = options.labelPosition ?? 0.5;
    this.labelOffset = options.labelOffset ?? 0;
  }

  drawLine() {
    let el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    el.classList.add('flowchart-link', this.color);
    return el;
  }

  redrawLine(el) {
    const path = this.calcPath();
    el.setAttribute('d', path);
  }

  drawLabel() {
    let dom = document.createElement('span');
    dom.className = 'flowchart-label';
    dom.innerText = this.label;

    return dom;
  }

  redrawLabel(lineDom, labelDom) {
    const length = lineDom.getTotalLength();
    if(!length) {
      return;
    }
    let labelLength = length * this.labelPosition + this.labelOffset;
    let point = lineDom.getPointAtLength(labelLength);

    labelDom.style.left = `${point.x - labelDom.offsetWidth / 2}px`;
    labelDom.style.top = `${point.y - labelDom.offsetHeight / 2}px`;
  }

  drawArrow() {
    let dom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dom.classList.add('flowchart-arrow', this.color);

    return dom;
  }

  redrawArrow(arrowDom, lineDom) {
    const linePath = lineDom.getAttribute('d');

    const length = lineDom.getTotalLength();
    if (length) {
      let arrowFinalPosition = (length * this.arrowPosition + this.arrowOffset) / length;

      if (arrowFinalPosition > 1) {
        arrowFinalPosition = 1;
      }
      if (arrowFinalPosition < 0) {
        arrowFinalPosition = 0;
      }
      if (1 - arrowFinalPosition < ArrowUtil.ARROW_TYPE.length / length) {
        arrowFinalPosition = (length * arrowFinalPosition - ArrowUtil.ARROW_TYPE.length) / length;
      }

      let point = lineDom.getPointAtLength(length * arrowFinalPosition);
      let x = point.x;
      let y = point.y;
      let _x = x;
      let _y = y;

      let vector = ArrowUtil.calcSlope({
        dom: lineDom,
        arrowPosition: arrowFinalPosition,
        path: linePath
      });
      let deg = Math.atan2(vector.y, vector.x) / Math.PI * 180;
      let arrowObj = ArrowUtil.ARROW_TYPE[this.arrowShapeType];
      arrowDom.setAttribute('d', arrowObj.content);
      arrowDom.setAttribute('transform', `rotate(${deg}, ${x}, ${y})translate(${_x}, ${_y})`);
    }
  }


  calcPath() {
    const sourceEndpointCoordinates = getEndpointCoordinates(this.sourceNode, this.sourceEndpoint);
    const targetEndpointCoordinates = getEndpointCoordinates(this.targetNode, this.targetEndpoint);

    const sourcePoint = {
      pos: sourceEndpointCoordinates,
      orientation: this.sourceEndpoint.orientation
    };

    const targetPoint = {
      pos: targetEndpointCoordinates,
      orientation: this.targetEndpoint.orientation
    };

    const obj = DrawUtil.drawManhattan(sourcePoint, targetPoint, {
      breakPoints: [],
      hasDragged: false,
      draggable: true,
      hasRadius: false
    });

    const path = obj.path;
    obj.breakPoints[0].type = 'start';
    obj.breakPoints[obj.breakPoints.length - 1].type = 'end';

    return path;
  }
}
