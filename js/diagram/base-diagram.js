export class BaseDiagram {
  constructor(options) {
    if (this.constructor === BaseDiagram) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.root = options.root;
    this.nodes = options.nodes ? options.nodes.map(nodeOptions => {
      return this.createNode({
        ...nodeOptions,
        endpoints: nodeOptions.endpoints.map(item => this.createEndpoint(item))
      });
    }) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => {
      const sourceNode = this.nodes.find(item => item.id === edgeOptions.sourceNode);
      const sourceEndpoint = sourceNode.endpoints.find(item => item.id === edgeOptions.sourceEndpoint);

      const targetNode = this.nodes.find(item => item.id === edgeOptions.targetNode);
      const targetEndpoint = targetNode.endpoints.find(item => item.id === edgeOptions.targetEndpoint);

      return this.createEdge({
        ...edgeOptions,
        sourceNode,
        sourceEndpoint,
        targetNode,
        targetEndpoint
      })
    }) : [];
  }

  /**
   * @abstract
   * @param options
   * @return {BaseEndpoint}
   */
  createEndpoint(options) {
    throw Error('not implemented');
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
