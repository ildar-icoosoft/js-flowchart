'use strict';

import {BaseNode} from "./base-node.js";

export class SvgNode extends BaseNode {
  /**
   * @param options
   * @param {SvgCanvas} canvas
   */
  constructor(options, canvas) {
    super(options);

    this.canvas = canvas;
  }

  draw() {
    const element = document.createElement('div');
    element.classList.add('flowchart-node');
    element.setAttribute('id', this.id);

    element.style.top = `${this.top}px`;
    element.style.left = `${this.left}px`;

    element.classList.add(this.shape);
    element.classList.add('black');
    element.classList.add('solid');

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.innerText = this.text;
    if (this.shape === 'diamond') {
      textSpan.classList.add('rotate');
    }

    element.append(textSpan);

    this.canvas.dom.append(element);
  }
}
