'use strict';

import {BaseNode} from "./base-node.js";

export class SvgNode extends BaseNode {
  /**
   * @param options
   * @param {SvgDiagram} canvas
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
    element.style.width = `${this.width}px`;
    element.style.height = `${this.height}px`;

    element.classList.add(this.shape);

    element.classList.add(this.color);
    element.classList.add(this.border);

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
