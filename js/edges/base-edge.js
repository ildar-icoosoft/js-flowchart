'use strict';

export class BaseEdge {
  constructor(options) {
    if (this.constructor === BaseEdge) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.source = options.source;
    this.target = options.target;
    this.sourceNode = options.sourceNode;
    this.targetNode = options.targetNode;
  }

  draw() {
    throw Error('not implemented');
  }
}
