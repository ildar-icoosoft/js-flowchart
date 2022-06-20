'use strict';

export class BaseNode {
  constructor(opts) {
    this.id = opts.id;
    this.top = opts.top || 0;
    this.left = opts.left || 0;
    this.options = opts;

    this.dom = null;
  }

  init() {
    if (!this.dom) {
      this.dom = this.draw({
        id: this.id,
        top: this.top,
        left: this.left,
        options: this.options
      });
    }
  }

  draw(data) {
    const element = document.createElement('div');
    element.classList.add('flowchart-node');
    element.setAttribute('id', data.id);

    if (data.top !== undefined) {
      element.style.top = `${data.top}px`;
    }
    if (data.left !== undefined) {
      element.style.left = `${data.left}px`;
    }

    if (data.options.color) {
      element.classList.add(data.options.color);
    }

    if (data.options.border) {
      element.classList.add(data.options.border);
    }

    element.classList.add(data.options.shape);

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.innerText = data.options.text;
    if (data.options.shape === 'diamond') {
      textSpan.classList.add('rotate');
    }

    element.append(textSpan);

    return element;
  }
}
