import {Endpoint} from "./endpoint.js";
import {Edge} from "./edge.js";
import {Node} from "./node.js";

export class Diagram {
  constructor(options) {
    this.root = options.root;
    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode(nodeOptions)) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => this.createEdge(edgeOptions)) : [];

    this.dom = this.generateWrapper();
    this.svg = this.generateSvgWrapper();

    this.dom.append(this.svg);
  }

  createEndpoint(options) {
    return new Endpoint(options);
  }

  createEdge(options) {
    const sourceNode = this.nodes.find(item => item.id === options.sourceNode);
    const sourceEndpoint = sourceNode.endpoints.find(item => item.id === options.sourceEndpoint);

    const targetNode = this.nodes.find(item => item.id === options.targetNode);
    const targetEndpoint = targetNode.endpoints.find(item => item.id === options.targetEndpoint);

    return new Edge({
      ...options,
      sourceNode,
      sourceEndpoint,
      targetNode,
      targetEndpoint
    });
  }

  createNode(options) {
    return new Node({
      ...options,
      endpoints: options.endpoints.map(item => this.createEndpoint(item))
    });
  }

  draw() {
    this.root.append(this.dom);

    this.nodes.map(node => node.draw()).forEach(nodeDom => this.dom.append(nodeDom));
    this.edges.map(edge => edge.draw()).forEach(edgeDom => this.svg.append(edgeDom));
  }

  /**
   * @private
   */
  generateWrapper() {
    const el = document.createElement('div');
    el.classList.add('flowchart');
    return el;
  }

  generateSvgWrapper() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.classList.add('flowchart-svg');
    el.setAttribute('version', '1.1')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    return el;
  }
}
