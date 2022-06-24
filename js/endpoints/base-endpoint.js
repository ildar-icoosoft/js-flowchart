'use strict';

export class BaseEndpoint {
  constructor(options) {
    if (this.constructor === BaseEndpoint) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.id = options.id;
    this.orientation = options.orientation;
    this.pos = options.pos;
  }

  draw() {
    throw Error('not implemented');
  }
}
