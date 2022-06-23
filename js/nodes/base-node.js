'use strict';

export class BaseNode {
  constructor(options) {
    if (this.constructor === BaseNode) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.id = options.id;
    this.left = options.left;
    this.top = options.top;
    this.width = options.width;
    this.height = options.height;
    this.shape = options.shape;
    this.text = options.text;
  }

  draw() {
    throw Error('not implemented');
  }
}
