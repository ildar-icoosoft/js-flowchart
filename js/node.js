'use strict';

import {Endpoint} from "./endpoint.js";

export class Node extends EventTarget {
  /**
   * @param options
   */
  constructor(options) {
    super();

    this.wrapperDom = options.wrapperDom;
    this.id = options.id;
    this.left = options.left;
    this.top = options.top;
    this.width = options.width;
    this.height = options.height;
    this.shape = options.shape;
    this.color = options.color;
    this.border = options.border;
    this.text = options.text;
    this.endpoints = options.endpoints.map(endpointOptions => new Endpoint({
      wrapperDom: this.wrapperDom,
      node: this,
      ...endpointOptions
    }))

    this.dom = null;
    this.selected = false
    this.isDragging = false;
  }

  createDom() {
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

  draw() {
    this.dom = this.createDom();

    this.addEventListeners();

    this.wrapperDom.append(this.dom);

    this.endpoints.forEach(endpoint => {
      endpoint.draw(false);
    });

    requestAnimationFrame(() => {
      this.redraw();
    });
  }

  redraw() {
    const nodeEl = this.dom;

    if (this.selected) {
      nodeEl.classList.add('selected');
    } else {
      nodeEl.classList.remove('selected');
    }

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

    this.endpoints.forEach(endpoint => {
      endpoint.redraw();
    });
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  handleKeyDown = (event) => {
    if (event.code === 'Delete' && this.selected) {
      this.unmount();
    }
  }

  /**
   * @private
   */
  addEventListeners() {
    this.dom.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return;
      }

      event.stopPropagation();

      this.dispatchEvent(new Event('startDrag'));

      if (this.selected) return;
      this.selected = true;
      this.redraw();

      this.dispatchEvent(new Event('selectNode'));
    });

    this.endpoints.forEach(endpoint => {
      endpoint.addEventListener('mousedown', (event) => {
        this.dispatchEvent(new CustomEvent('endpointMousedown', {
          detail: {
            endpoint,
            originEvent: event.detail.originEvent
          }
        }));
      });
    });

    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * @private
   */
  removeEventListeners() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  unmount() {
    this.wrapperDom.removeChild(this.dom);
    this.endpoints.forEach(endpoint => {
      endpoint.unmount();
    })
    this.dispatchEvent(new Event('unmount'));

    this.removeEventListeners();
  }
}
