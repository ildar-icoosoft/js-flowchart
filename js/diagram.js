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

    this.selectedNode = null;
    this.movingNode = null;
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
      node.redraw();

      node.endpoints.forEach(endpoint => {
        const endpointDom = endpoint.draw(node);
        this.wrapper.append(endpointDom);

        endpoint.redraw(node);
      });
    });

    this.edges.forEach(edge => {
      const lineDom = edge.drawLine();
      this.svg.append(lineDom);
      edge.redrawLine();

      const arrowDom = edge.drawArrow(lineDom);
      this.svg.append(arrowDom);
      edge.redrawArrow();

      if (edge.label) {
        const labelDom = edge.drawLabel(lineDom);
        this.wrapper.append(labelDom);

        edge.redrawLabel();
      }
    });

    this.addEventListeners();
  }

  /**
   * private
   */
  addEventListeners() {
    window.addEventListener('mousedown', () => {
      if (this.selectedNode) {
        this.selectedNode.selected = false;
        this.selectedNode.redraw();
        this.selectedNode = null;
      }
    });

    window.addEventListener('mousemove', (event) => {
      if (this.movingNode) {
        this.movingNode.left = event.clientX - this.movingNode.width / 2;
        this.movingNode.top = event.clientY - this.movingNode.height / 2;

        this.movingNode.endpoints.forEach(endpoint => {
          endpoint.redraw(this.movingNode);
        });

        this.edges.filter(edge => edge.sourceNode === this.movingNode || edge.targetNode === this.movingNode).forEach(edge => {
          edge.redrawLine();
          edge.redrawArrow();
          if (edge.label) {
            edge.redrawLabel();
          }
        });

        this.movingNode.redraw();
      }
    });

    window.addEventListener('mouseup', (event) => {
      this.movingNode = null;
    });

    window.addEventListener('keydown', (event) => {
      if (event.code === 'Delete' && this.selectedNode) {
        this.selectedNode.endpoints.forEach(endpoint => {
          this.wrapper.removeChild(endpoint.dom);
        });
        this.nodes = this.nodes.filter(node => node !== this.selectedNode);
        this.wrapper.removeChild(this.selectedNode.dom);

        this.edges = this.edges.filter(edge => {
          if (edge.sourceNode === this.selectedNode || edge.targetNode === this.selectedNode) {
            this.svg.removeChild(edge.arrowDom);
            this.svg.removeChild(edge.lineDom);
            if (edge.labelDom) {
              this.wrapper.removeChild(edge.labelDom);
            }
            return false;
          }
          return true;
        });

        this.selectedNode = null;
      }
    });

    this.nodes.forEach(node => {
      node.dom.addEventListener('mousedown', (event) => {
        const LEFT_KEY = 0;
        if (event.button !== LEFT_KEY) {
          return;
        }

        event.stopPropagation();

        this.movingNode = node;

        if (this.selectedNode === node) {
          this.selectedNode.selected = false;
          this.selectedNode = null;
        } else {
          if (this.selectedNode !== null) {
            this.selectedNode.selected = false;
            this.selectedNode.redraw();
          }

          this.selectedNode = node;
          node.selected = true;
        }
        node.redraw();
      });
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
