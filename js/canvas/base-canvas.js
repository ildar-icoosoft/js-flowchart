'use strict';

export class BaseCanvas {
  constructor(options) {
    if (this.constructor === BaseCanvas) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.root = options.root;
    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode(nodeOptions)) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => this.createEdge(edgeOptions)) : [];
  }

  /**
   * @abstract
   * @param options
   * @return {BaseNode}
   */
  createNode(options) {
    throw Error('not implemented');
  }

  /**
   * @abstract
   * @param options
   * @return {BaseEdge}
   */
  createEdge(options) {
    throw Error('not implemented');
  }

  /**
   * @abstract
   */
  draw() {
    throw Error('not implemented');
  }
}
