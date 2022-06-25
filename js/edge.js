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
    this.color = options.color;
    this.shapeType = options.shapeType ?? 'Manhattan';
    this.arrowShapeType = options.arrowShapeType ?? 'default';
    this.arrowPosition = options.arrowPosition ?? 0.5;
    this.arrowOffset = options.arrowOffset ?? 0;
  }

  drawLine() {
    let el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    el.classList.add('flowchart-link', this.color);

    const path = this.calcPath();
    el.setAttribute('d', path);

    return el;
  }

  drawArrow(lineDom) {
    let arrowObj = ArrowUtil.ARROW_TYPE[this.arrowShapeType];
    let arrowWidth = arrowObj.width || 8;
    let arrowHeight = arrowObj.height || 8;
    let dom = undefined;
    if (arrowObj.type === 'pathString') {
      dom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    } else if (arrowObj.type === 'svg') {
      dom = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      dom.setAttribute('href', arrowObj.content);
      dom.setAttribute('width', `${arrowWidth}px`);
      dom.setAttribute('height', `${arrowHeight}px`);
    }
    dom.setAttribute('class', 'flowchart-arrow');

    const linePath = lineDom.getAttribute('d');

    const length = lineDom.getTotalLength();
    if (length) {
      let arrowFinalPosition = 1;
      if (1 - arrowFinalPosition < ArrowUtil.ARROW_TYPE.length / length) {
        arrowFinalPosition = (length * arrowFinalPosition - ArrowUtil.ARROW_TYPE.length) / length;
      }
      if (this.shapeType === 'Bezier') {
        arrowFinalPosition = 1 - arrowFinalPosition;
      }

      let point = lineDom.getPointAtLength(length * arrowFinalPosition);
      let x = point.x;
      let y = point.y;
      let _x = x;
      let _y = y;

      let vector = ArrowUtil.calcSlope({
        shapeType: this.shapeType,
        dom: lineDom,
        arrowPosition: arrowFinalPosition,
        path: linePath
      });
      let deg = Math.atan2(vector.y, vector.x) / Math.PI * 180;
      let arrowObj = ArrowUtil.ARROW_TYPE[this.arrowShapeType];
      let arrowWidth = arrowObj.width || 8;
      let arrowHeight = arrowObj.height || 8;
      if (arrowObj.type === 'pathString') {
        dom.setAttribute('d', arrowObj.content);
      } else if (arrowObj.type === 'svg') {
        if (vector.x === 0) {
          _y -= arrowHeight / 2;
        } else {
          _x -= arrowWidth / 2;
          _y -= arrowHeight / 2;
        }
      }
      dom.setAttribute('transform', `rotate(${deg}, ${x}, ${y})translate(${_x}, ${_y})`);
    }

    return dom;
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

    let path = '';
    if (this.shapeType === 'Bezier') {
      path = DrawUtil.drawBezier(sourcePoint, targetPoint);
    } else if (this.shapeType === 'Straight') {
      path = DrawUtil.drawStraight(sourcePoint, targetPoint);
    } else if (this.shapeType === 'Flow') {
      path = DrawUtil.drawFlow(sourcePoint, targetPoint);
    } else if (this.shapeType === 'Manhattan') {
      let obj = DrawUtil.drawManhattan(sourcePoint, targetPoint, {
        breakPoints: [],
        hasDragged: false,
        draggable: true,
        hasRadius: false
      });
      path = obj.path;
      obj.breakPoints[0].type = 'start';
      obj.breakPoints[obj.breakPoints.length - 1].type = 'end';
    } else if (this.shapeType === 'AdvancedBezier') {
      path = DrawUtil.drawAdvancedBezier(sourcePoint, targetPoint);
    } else if (/^Bezier2-[1-3]$/.test(this.shapeType)) {
      path = DrawUtil.drawSecondBezier(sourcePoint, targetPoint, this.shapeType);
    } else if(this.shapeType === 'BrokenLine'){
      path = DrawUtil.drawBrokenLine(sourcePoint, targetPoint);
    }

    return path;
  }
}
