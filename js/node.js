'use strict';

export class Node {
  /**
   * @param options
   */
  constructor(options) {
    this.id = options.id;
    this.left = options.left;
    this.top = options.top;
    this.width = options.width;
    this.height = options.height;
    this.shape = options.shape;
    this.color = options.color;
    this.border = options.border;
    this.text = options.text;
    this.endpoints = options.endpoints;
  }

  draw() {
    const element = document.createElement('div');
    element.classList.add('flowchart-node');
    element.setAttribute('id', this.id);

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

    return element;
  }

  redraw(nodeEl) {
    if (this.shape === 'diamond') {
      const halfWidth = this.width / 2;
      const diamondWidth = Math.sqrt(2 * halfWidth * halfWidth);

      // @todo 2px - толщина border. Нужно будет избавиться от этого костыля
      nodeEl.style.width = `${diamondWidth - 2}px`;
      nodeEl.style.height = `${diamondWidth - 2}px`;

      nodeEl.style.top = `${this.top + (this.width - diamondWidth) / 2}px`;
      nodeEl.style.left = `${this.left + (this.width - diamondWidth) / 2}px`;
    } else {
      // @todo 2px - толщина border. Нужно будет избавиться от этого костыля
      nodeEl.style.width = `${this.width - 2}px`;
      nodeEl.style.height = `${this.height - 2}px`;

      nodeEl.style.top = `${this.top}px`;
      nodeEl.style.left = `${this.left}px`;
    }
  }
}
