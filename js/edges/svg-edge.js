'use strict';

import {BaseEdge} from "./base-edge.js";
import * as DrawUtil from '../utils/link';

export class SvgEdge extends BaseEdge {
  /**
   * @param options
   */
  constructor(options) {
    super(options);
  }

  draw() {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.classList.add('flowchart-link', this.color);

    const pathAttr = this.calcPath();
    path.setAttribute('d', pathAttr);

    return path;
  }

  getEndpointCoordinates(node, endpoint) {
    let x;
    if (endpoint.orientation[0] === 1) {
      x = node.left + node.width - endpoint.pos[0] * node.width;
    } else {
      x = node.left + endpoint.pos[0] * node.width;
    }

    let y;
    if (endpoint.orientation[1] === 1) {
      y = node.top + node.height - endpoint.pos[1] * node.height;
    } else {
      y = node.top + endpoint.pos[1] * node.height;
    }

    return [x, y]
  }

  calcPath() {
    const sourceEndpointCoordinates = this.getEndpointCoordinates(this.sourceNode, this.sourceEndpoint);
    const targetEndpointCoordinates = this.getEndpointCoordinates(this.targetNode, this.targetEndpoint);

    const sourcePoint = {
      pos: sourceEndpointCoordinates,
      orientation: this.sourceEndpoint.orientation
    };

    const targetPoint = {
      pos: targetEndpointCoordinates,
      orientation: this.targetEndpoint.orientation
    };

    return DrawUtil.drawStraight(sourcePoint, targetPoint);
  }
}
