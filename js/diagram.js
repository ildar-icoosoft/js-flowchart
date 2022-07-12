import {Edge} from "./edge.js";
import {Node} from "./node.js";
import {findEndpointByCoordinates} from "./utils/endpoint.js";
import {createNodeByShape} from "./utils/create-node-by-shape.js";

export class Diagram {
  constructor(options) {
    this.root = options.root;
    this.wrapperDom = this.createWrapperDom_();
    this.svgWrapperDom = this.createSvgWrapperDom_();

    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode_(nodeOptions)) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => this.createEdge_(edgeOptions)) : [];

    this.selectedNode = null;
    this.movingNode = null;
    this.movingEdge = null;

    this.addEventListeners_();
  }

  draw() {
    this.nodes.forEach(node => {
      node.draw();
    });

    this.edges.forEach(edge => {
      edge.draw();
    });

    this.wrapperDom.append(this.svgWrapperDom);
    this.root.append(this.wrapperDom);
  }

  /**
   * @private
   */
  addEventListeners_() {
    this.addNodesEventHandlers_(this.nodes);

    this.addSelectNodeEventHandler_();

    this.addDragNodesEventHandlers_();

    this.addDragEdgeEventHandlers_();

    this.addDragFromPaletteEventHandlers_();
  }

  /**
   * @param {Node[]} nodes
   * @private
   */
  addNodesEventHandlers_(nodes) {
    nodes.forEach(node => {
      // при выделении ноды, убираем выделение с ранее выделенной ноды
      node.addEventListener('selectNode', () => {
        if (node.selected) {
          node.edited = true;
        } else {
          node.selected = true;
        }
        node.redraw();

        if (this.selectedNode && this.selectedNode !== node) {
          this.selectedNode.edited = false;
          this.selectedNode.selected = false;
          this.selectedNode.redraw();
        }
        this.selectedNode = node;
      });
    });

    nodes.forEach(node => {
      // начало перемещения ноды
      node.addEventListener('startDrag', () => {
        this.movingNode = node;
      });
    });

    nodes.forEach(node => {
      // начало перемещения ребра (либо создается новое ребро, либо перемещается существующее, если клик произошёл на конечной точке ребра)
      node.addEventListener('endpointMousedown', (event) => {
        const endpoint = event.detail.endpoint;
        const originEvent = event.detail.originEvent;

        let edge = this.edges.find(edgeItem => edgeItem.targetEndpoint === endpoint || edgeItem.sourceEndpoint === endpoint);
        if (edge && edge.sourceEndpoint === endpoint) {
          return;
        }
        if (!edge) {
          edge = new Edge({
            wrapperDom: this.wrapperDom,
            svgWrapperDom: this.svgWrapperDom,
            color: 'green',
            type: 'endpoint',
            arrowPosition: 1,
            sourceNode: node,
            sourceEndpoint: endpoint,
            targetNode: null,
            targetEndpoint: null,
            targetCoordinates: [
              originEvent.pageX - this.wrapperDom.offsetLeft,
              originEvent.pageY - this.wrapperDom.offsetTop
            ]
          });
          this.edges.push(edge);

          edge.draw();
        }

        if (edge) {
          this.movingEdge = edge;
        }
      });
    });

    // обработка уничтожения ноды
    nodes.forEach(node => {
      node.addEventListener('unmount', () => {
        this.nodes = this.nodes.filter(item => item !== node);

        this.edges = this.edges.filter(edge => {
          if (edge.sourceNode === node || edge.targetNode === node) {
            edge.unmount();
            return false;
          }
          return true;
        });

        if (node === this.selectedNode) {
          this.selectedNode = null;
        }
      });
    });
  }

  /**
   * обработка событий перетаскивания элементов из палитры (для добавления новой ноды)
   * @private
   */
  addDragFromPaletteEventHandlers_() {
    this.wrapperDom.addEventListener('dragover', event => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });

    this.wrapperDom.addEventListener('drop', event => {
      event.preventDefault();

      const shape = event.dataTransfer.getData("text/plain");

      const node = createNodeByShape(shape, this.wrapperDom);
      if (!node) return;

      node.left = event.pageX - this.wrapperDom.offsetLeft - node.width / 2;
      if (node.left < 0) node.left = 0;
      if (node.left > this.wrapperDom.offsetWidth - node.width) node.left = this.wrapperDom.offsetWidth - node.width;

      node.top = event.pageY - this.wrapperDom.offsetTop - node.height / 2;
      if (node.top < 0) node.top = 0;
      if (node.top > this.wrapperDom.offsetHeight - node.height) node.top = this.wrapperDom.offsetHeight - node.height;

      this.nodes.push(node);

      this.addNodesEventHandlers_([node]);

      node.draw();
    });
  }

  /**
   * обработка событий перемещения ребра
   * @private
   */
  addDragEdgeEventHandlers_() {
    // процесс перемещения ребра
    window.addEventListener('mousemove', (event) => {
      if (this.movingEdge) {
        let offsetX = event.pageX - this.wrapperDom.offsetLeft;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > this.wrapperDom.offsetWidth) offsetX = this.wrapperDom.offsetWidth;

        let offsetY = event.pageY - this.wrapperDom.offsetTop;
        if (offsetY < 0) offsetY = 0;
        if (offsetY > this.wrapperDom.offsetHeight) offsetY = this.wrapperDom.offsetHeight;

        this.movingEdge.targetCoordinates = [
          offsetX,
          offsetY
        ];
        this.movingEdge.targetNode = null;
        this.movingEdge.targetEndpoint = null;

        this.movingEdge.redraw();
      }
    });

    // завершение перемещения ребра
    window.addEventListener('mouseup', () => {
      if (this.movingEdge) {
        // Если есть targetEndpoint, значит ребро не двигалось. И ничего не нужно делать
        if (this.movingEdge.targetEndpoint) {
          this.movingEdge = null;
          return;
        }

        const targetEndpoint = findEndpointByCoordinates(this.nodes, this.movingEdge.targetCoordinates);

        if (targetEndpoint && this.movingEdge.sourceEndpoint !== targetEndpoint.endpoint) {
          this.movingEdge.targetCoordinates = null;
          this.movingEdge.targetNode = targetEndpoint.node;
          this.movingEdge.targetEndpoint = targetEndpoint.endpoint;

          this.movingEdge.redraw();
        } else {
          this.edges = this.edges.filter(edge => edge !== this.movingEdge);
          this.movingEdge.unmount();
        }
        this.movingEdge = null;
      }
    });
  }

  /**
   * Обработка событий выделения ноды
   * @private
   */
  addSelectNodeEventHandler_() {
    // убираем выделение ноды при клике по экрану
    window.addEventListener('mousedown', () => {
      if (this.selectedNode) {
        this.selectedNode.selected = false;
        this.selectedNode.edited = false;
        this.selectedNode.redraw();
        this.selectedNode = null;
      }
    });
  }

  /**
   * обработка событий перемещения ноды
   * @private
   */
  addDragNodesEventHandlers_() {
    // процесс перемещения ноды
    window.addEventListener('mousemove', (event) => {
      if (!this.movingNode || (this.selectedNode && this.selectedNode.edited)) {
        return;
      }

      const node = this.movingNode;

      node.left = event.pageX - this.wrapperDom.offsetLeft - node.width / 2;
      if (node.left < 0) node.left = 0;
      if (node.left > this.wrapperDom.offsetWidth - node.width) node.left = this.wrapperDom.offsetWidth - node.width;

      node.top = event.pageY - this.wrapperDom.offsetTop - node.height / 2;
      if (node.top < 0) node.top = 0;
      if (node.top > this.wrapperDom.offsetHeight - node.height) node.top = this.wrapperDom.offsetHeight - node.height;

      this.edges.filter(edge => edge.sourceNode === node || edge.targetNode === node).forEach(edge => {
        edge.redraw();
      });

      node.redraw();
    });

    // завершение перемещения ноды
    window.addEventListener('mouseup', () => {
      this.movingNode = null;
    });
  }

  /**
   * @param options
   * @return {Edge}
   * @private
   */
  createEdge_(options) {
    const sourceNode = this.nodes.find(item => item.id === options.sourceNode);
    const sourceEndpoint = sourceNode.endpoints.find(item => item.id === options.sourceEndpoint);

    const targetNode = this.nodes.find(item => item.id === options.targetNode);
    const targetEndpoint = targetNode.endpoints.find(item => item.id === options.targetEndpoint);

    return new Edge({
      ...options,
      wrapperDom: this.wrapperDom,
      svgWrapperDom: this.svgWrapperDom,
      sourceNode,
      sourceEndpoint,
      targetNode,
      targetEndpoint
    });
  }

  /**
   * @param options
   * @return {Node}
   * @private
   */
  createNode_(options) {
    return new Node({
      ...options,
      wrapperDom: this.wrapperDom,
    });
  }

  /**
   * @private
   * @return {HTMLDivElement}
   */
  createWrapperDom_() {
    const el = document.createElement('div');
    el.classList.add('flowchart');
    return el;
  }

  /**
   * @private
   * @return {SVGSVGElement}
   */
  createSvgWrapperDom_() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.classList.add('flowchart-svg');
    el.setAttribute('version', '1.1')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    return el;
  }
}
