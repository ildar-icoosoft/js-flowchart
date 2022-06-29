'use strict';

export class Endpoint extends EventTarget {
  constructor(options) {
    super();

    this.wrapperDom = options.wrapperDom;
    this.node = options.node;

    this.id = options.id;
    this.orientation = options.orientation;
    this.pos = options.pos;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.dom = null;
  }

  addEventListeners() {
    this.dom.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();

      this.dispatchEvent(new Event('mousedown'));
    })
  }

  createDom() {
    const el = document.createElement('div');
    el.classList.add('flowchart-circle-endpoint', this.node.color);
    el.setAttribute('id', `${this.node.id}-${this.id}`);

    return el;
  }

  draw(shouldRedraw) {
    this.dom = this.createDom();
    this.addEventListeners();
    this.wrapperDom.append(this.dom);
    if (shouldRedraw) {
      requestAnimationFrame(() => {
        this.redraw();
      });
    }
  }

  redraw() {
    const endpointDom = this.dom;

    this.width = endpointDom.offsetWidth;
    this.height = endpointDom.offsetHeight;

    const coordinates = this.getEndpointCoordinates();

    this.left = coordinates[0] - this.width / 2;
    this.top = coordinates[1] - this.height / 2;

    endpointDom.style.left = `${this.left}px`;
    endpointDom.style.top = `${this.top}px`;
  }

  getEndpointCoordinates() {
    const node = this.node;

    let x;
    if (this.orientation[0] === 1) {
      x = node.left + node.width - this.pos[0] * node.width;
    } else {
      x = node.left + this.pos[0] * node.width;
    }

    let y;
    if (this.orientation[1] === 1) {
      y = node.top + node.height - this.pos[1] * node.height;
    } else {
      y = node.top + this.pos[1] * node.height;
    }

    return [x, y]
  }

  unmount() {
    this.wrapperDom.removeChild(this.dom);
  }
}
