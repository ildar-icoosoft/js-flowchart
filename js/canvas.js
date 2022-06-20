'use strict';

import {BaseNode} from './nodes/base-node.js';
import {BaseEdge} from "./edges/base-edge.js";

export class Canvas {
  constructor(options) {
    this.nodes = [];
    this.edges = [];

    this.wrapper = null;
    this.root = options.root;

    /**
     * @private
     * @type {BaseNode}
     */
    this.NodeClass = BaseNode;

    /**
     * @private
     * @type {BaseEdge}
     */
    this.EdgeClass = BaseEdge;

    this.generateWrapper();
  }

  /**
   * @private
   */
  generateWrapper() {
    const temp = document.createElement('template');
    temp.innerHTML = '<div class="diagram-wrapper"></div>';
    this.wrapper = temp.content.firstChild;
    this.root.append(this.wrapper);
  }

  addNodes(nodes) {
    const canvasFragment = document.createDocumentFragment();

    const result = nodes.map(node => {
      const NodeClass = node.Class || this.NodeClass;
      const nodeObj = new NodeClass(node);

      nodeObj.init();

      canvasFragment.append(nodeObj.dom);

      this.nodes.push(nodeObj)

      return nodeObj;
    });

    this.wrapper.append(canvasFragment);

    return result;
  }

  addEdges(edges) {
    const canvasFragment = document.createDocumentFragment();

    const result = edges.map(edge => {
      const EdgeClass = edge.Class || this.EdgeClass;
      const edgeObj = new EdgeClass();

      edgeObj.init();

      canvasFragment.append(edgeObj.dom);

      this.edges.push(edgeObj)

      return edgeObj;
    });

    this.wrapper.append(canvasFragment);

    return result;
  }

  draw(opts) {
    const nodes = opts.nodes || [];
    const edges = opts.edges || [];

    this.addNodes(nodes);
    this.addEdges(edges);
  }
}
