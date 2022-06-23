'use strict';

import {BaseEdge} from "./base-edge.js";

export class SvgEdge extends BaseEdge {
  /**
   * @param options
   * @param {SvgCanvas} canvas
   */
  constructor(options, canvas) {
    super(options);

    this.canvas = canvas;
  }

  draw(canvas) {
    const temp = document.createElement('template');
    temp.innerHTML = '<div>EDGE</span>';

    this.canvas.dom.append(temp.content.firstChild);
  }
}
