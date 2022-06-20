'use strict';

export class BaseEdge {
  draw() {
    const temp = document.createElement('template');
    temp.innerHTML = '<div>EDGE</span>';
    return temp.content;
  }

  drawLabel() {
  }

  drawArrow() {
  }

  init() {
    if (!this.dom) {
      this.dom = this.draw();
    }
  }
}
