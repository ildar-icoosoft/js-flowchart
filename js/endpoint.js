'use strict';

import {getEndpointCoordinates} from "./utils/endpoint.js";

export class Endpoint {
  constructor(options) {
    this.id = options.id;
    this.orientation = options.orientation;
    this.pos = options.pos;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.dom = null;
  }

  draw(node) {
    const el = document.createElement('div');
    el.classList.add('flowchart-circle-endpoint', node.color);
    el.setAttribute('id', `${node.id}-${this.id}`);

    this.dom = el;

    return el;
  }

  redraw(node) {
    const endpointDom = this.dom;

    this.width = endpointDom.offsetWidth;
    this.height = endpointDom.offsetHeight;

    const coordinates = getEndpointCoordinates(node, this);

    this.left = coordinates[0] - this.width / 2;
    this.top = coordinates[1] - this.height / 2;

    endpointDom.style.left = `${this.left}px`;
    endpointDom.style.top = `${this.top}px`;
  }

}
