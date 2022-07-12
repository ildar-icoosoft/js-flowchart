'use strict';

import ArrowUtil from './utils/arrow.js';
import {drawManhattan} from "./utils/link/edge-types/manhattan.js";

export class Edge {
  /**
   * @param options
   */
  constructor(options) {
    this.wrapperDom = options.wrapperDom;
    this.svgWrapperDom = options.svgWrapperDom;

    this.sourceEndpoint = options.sourceEndpoint;
    this.targetEndpoint = options.targetEndpoint ?? null;
    this.sourceNode = options.sourceNode;
    this.targetNode = options.targetNode ?? null;
    this.targetCoordinates = options.targetCoordinates ?? null;
    this.label = options.label;
    this.color = options.color;
    this.arrowShapeType = options.arrowShapeType ?? 'default';
    this.arrowPosition = options.arrowPosition ?? 0.5;
    this.arrowOffset = options.arrowOffset ?? 0;
    this.labelPosition = options.labelPosition ?? 0.5;
    this.labelOffset = options.labelOffset ?? 0;

    this.lineDom = null;
    this.arrowDom = null;
    this.labelDom = null;
  }

  draw() {
    this.drawLine_();
    this.drawLabel_();
    this.drawArrow_();
  }

  redraw() {
    this.redrawLine_();
    this.redrawLabel_();
    this.redrawArrow_();
  }

  unmount() {
    this.svgWrapperDom.removeChild(this.lineDom);
    if (this.labelDom) {
      this.wrapperDom.removeChild(this.labelDom);
    }
    this.svgWrapperDom.removeChild(this.arrowDom);
  }

  /**
   * @private
   */
  drawLine_() {
    this.lineDom = this.createLineDom_();
    this.svgWrapperDom.append(this.lineDom);
    requestAnimationFrame(() => {
      this.redrawLine_();
    });
  }

  /**
   * @private
   */
  redrawLine_() {
    const path = this.calcPath_();
    this.lineDom.setAttribute('d', path);
  }

  /**
   * @private
   */
  drawLabel_() {
    if (!this.label) return;

    this.labelDom = this.createLabelDom_();
    this.wrapperDom.append(this.labelDom);
    requestAnimationFrame(() => {
      this.redrawLabel_();
    });
  }

  /**
   * @private
   */
  redrawLabel_() {
    if (!this.label) return;

    const length = this.lineDom.getTotalLength();
    if(!length) {
      return;
    }
    let labelLength = length * this.labelPosition + this.labelOffset;
    let point = this.lineDom.getPointAtLength(labelLength);

    this.labelDom.style.left = `${point.x - this.labelDom.offsetWidth / 2}px`;
    this.labelDom.style.top = `${point.y - this.labelDom.offsetHeight / 2}px`;
  }

  /**
   * @private
   */
  drawArrow_() {
    this.arrowDom = this.createArrowDom_();
    this.svgWrapperDom.append(this.arrowDom);
    requestAnimationFrame(() => {
      this.redrawArrow_();
    });
  }

  /**
   * @private
   */
  redrawArrow_() {
    const linePath = this.lineDom.getAttribute('d');

    const length = this.lineDom.getTotalLength();
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

      const point = this.lineDom.getPointAtLength(length * arrowFinalPosition);
      const x = point.x;
      const y = point.y;

      let vector = ArrowUtil.calcSlope({
        dom: this.lineDom,
        arrowPosition: arrowFinalPosition,
        path: linePath
      });
      let deg = Math.atan2(vector.y, vector.x) / Math.PI * 180;
      let arrowObj = ArrowUtil.ARROW_TYPE[this.arrowShapeType];
      this.arrowDom.setAttribute('d', arrowObj.content);
      this.arrowDom.setAttribute('transform', `rotate(${deg}, ${x}, ${y})translate(${x}, ${y})`);
    }
  }

  /**
   * @private
   */
  calcPath_() {
    const sourceEndpointCoordinates = this.sourceEndpoint.getEndpointCoordinates();

    const targetEndpointCoordinates = this.targetCoordinates ?? this.targetEndpoint.getEndpointCoordinates();

    const sourcePoint = {
      pos: sourceEndpointCoordinates,
      orientation: this.sourceEndpoint.orientation
    };

    const targetPoint = {
      pos: targetEndpointCoordinates,
      orientation: this.targetEndpoint ? this.targetEndpoint.orientation : undefined
    };

    const obj = drawManhattan(sourcePoint, targetPoint, {
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

  /**
   * @private
   * @return {SVGPathElement}
   */
  createLineDom_() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    el.classList.add('flowchart-link', this.color);
    return el;
  }

  /**
   * @private
   * @return {HTMLSpanElement}
   */
  createLabelDom_() {
    const el = document.createElement('span');
    el.className = 'flowchart-label';
    el.innerText = this.label;
    return el;
  }

  /**
   * @private
   * @return {SVGPathElement}
   */
  createArrowDom_() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.classList.add('flowchart-arrow', this.color);
    return el;
  }
}
