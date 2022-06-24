'use strict';

export class BaseEdge {
  constructor(options) {
    if (this.constructor === BaseEdge) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.sourceEndpoint = options.sourceEndpoint;
    this.targetEndpoint = options.targetEndpoint;
    this.sourceNode = options.sourceNode;
    this.targetNode = options.targetNode;
    this.color = options.color;
  }
}
