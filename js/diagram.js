import {Endpoint} from "./endpoint.js";
import {Edge} from "./edge.js";
import {Node} from "./node.js";

export class Diagram {
  constructor(options) {
    this.root = options.root;
    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode(nodeOptions)) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => this.createEdge(edgeOptions)) : [];

    this.wrapper = this.generateWrapper();
    this.svg = this.generateSvgWrapper();

    this.wrapper.append(this.svg);
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
    this.root.append(this.wrapper);

    this.nodes.forEach(node => {
      const nodeDom = node.draw();
      this.wrapper.append(nodeDom);

      node.endpoints.forEach(endpoint => {
        const endpointDom = endpoint.draw(node);
        this.wrapper.append(endpointDom);
      });
    });

    this.edges.forEach(edge => {
      const lineDom = edge.drawLine();
      this.svg.append(lineDom);

      const arrowDom = edge.drawArrow(lineDom);
      this.svg.append(arrowDom);

      if (edge.label) {
        const labelDom = edge.drawLabel(lineDom);
        this.wrapper.append(labelDom);

        edge.redrawLabel(lineDom, labelDom);
      }
    });
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
