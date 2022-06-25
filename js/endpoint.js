'use strict';

import {getEndpointCoordinates} from "./utils/endpoint.js";

export class Endpoint {
  constructor(options) {
    this.id = options.id;
    this.orientation = options.orientation;
    this.pos = options.pos;

    this.width = 8;
    this.height = 8;
  }

  draw(node) {
    const coordinates = getEndpointCoordinates(node, this);

    const el = document.createElement('div');
    el.classList.add('flowchart-circle-endpoint');
    el.setAttribute('id', `${node.id}-${this.id}`);

    el.style.left = `${Math.floor(coordinates[0]) - this.width / 2}px`;
    el.style.top = `${Math.floor(coordinates[1]) - this.height / 2}px`;

    el.style.width = `${this.width - 2}px`;
    el.style.height = `${this.height - 2}px`;

    return el;
  }
}
