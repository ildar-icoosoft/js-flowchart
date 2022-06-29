import {Edge} from "./edge.js";
import {Node} from "./node.js";
import {findEndpointByCoordinates} from "./utils/endpoint.js";

export class Diagram {
  constructor(options) {
    this.root = options.root;
    this.wrapperDom = this.createWrapperDom();
    this.svgWrapperDom = this.createSvgWrapperDom();

    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode(nodeOptions)) : [];
    this.edges = options.edges ? options.edges.map(edgeOptions => this.createEdge(edgeOptions)) : [];

    this.selectedNode = null;
    this.movingNode = null;
    this.movingEdge = null;

    this.addEventListeners();
  }

  addEventListeners() {
    // отключаем возможность выделения текста
    window.addEventListener('selectstart', (e) => e.preventDefault());

    // обработка событий перемещения ноды
    this.addSelectNodeEventHandlers();

    // обработка событий перемещения ноды
    this.addDragNodesEventHandlers();

    // обработка событий перемещения ребра
    this.addDragEdgeEventHandlers();

    // обработка уничтожения ноды
    this.nodes.forEach(node => {
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

  addDragEdgeEventHandlers() {
    // процесс перемещения ребра
    window.addEventListener('mousemove', (event) => {
      if (this.movingEdge) {
        this.movingEdge.targetCoordinates = [
          event.clientX,
          event.clientY
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

    this.nodes.forEach(node => {
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
            targetCoordinates: [originEvent.clientX, originEvent.clientY]
          });
          this.edges.push(edge);

          edge.draw();
        }

        if (edge) {
          this.movingEdge = edge;
        }
      });
    });
  }

  addSelectNodeEventHandlers() {
    // убираем выделение ноды при клике по экрану
    window.addEventListener('mousedown', () => {
      if (this.selectedNode) {
        this.selectedNode.selected = false;
        this.selectedNode.redraw();
        this.selectedNode = null;
      }
    });

    this.nodes.forEach(node => {
      // при выделении ноды, убираем выделение с ранее выделенной ноды
      node.addEventListener('selectNode', () => {
        if (this.selectedNode) {
          this.selectedNode.selected = false;
          this.selectedNode.redraw();
        }
        this.selectedNode = node;
      });
    });
  }

  addDragNodesEventHandlers() {
    this.nodes.forEach(node => {
      // начало перемещения ноды
      node.addEventListener('startDrag', () => {
        this.movingNode = node;
      });
    });

    // процесс перемещения ноды
    this.wrapperDom.addEventListener('mousemove', (event) => {
      if (!this.movingNode) {
        return;
      }

      const node = this.movingNode;

      node.left = event.clientX - node.width / 2;
      node.top = event.clientY - node.height / 2;

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

  createEdge(options) {
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

  createNode(options) {
    return new Node({
      ...options,
      wrapperDom: this.wrapperDom,
    });
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
   * @return {HTMLDivElement}
   */
  createWrapperDom() {
    const el = document.createElement('div');
    el.classList.add('flowchart');
    return el;
  }

  /**
   * @private
   * @return {SVGSVGElement}
   */
  createSvgWrapperDom() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.classList.add('flowchart-svg');
    el.setAttribute('version', '1.1')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    return el;
  }
}
