'use strict';

import {getEndpointCoordinates} from "./utils/endpoint.js";

export class Endpoint {
  constructor(options) {
    this.id = options.id;
    this.orientation = options.orientation;
    this.pos = options.pos;

    this.width = 0;
    this.height = 0;
  }

  draw(node) {
    const el = document.createElement('div');
    el.classList.add('flowchart-circle-endpoint', node.color);
    el.setAttribute('id', `${node.id}-${this.id}`);

    return el;
  }

  redraw(node, el) {
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;

    const coordinates = getEndpointCoordinates(node, this);

    el.style.left = `${coordinates[0] - this.width / 2}px`;
    el.style.top = `${coordinates[1] - this.height / 2}px`;
  }

}
