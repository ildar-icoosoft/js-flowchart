import {BaseDiagram} from "./base-diagram.js";
import {SvgEndpoint} from "../endpoints/svg-endpoint.js";
import {SvgEdge} from "../edges/svg-edge.js";
import {SvgNode} from "../nodes/svg-node.js";

export class SvgDiagram extends BaseDiagram {
  constructor(options, canvas) {
    super(options, canvas);

    this.dom = this.generateWrapper();
    this.svg = this.generateSvgWrapper();

    this.dom.append(this.svg);
  }

  createEndpoint(options) {
    return new SvgEndpoint(options);
  }

  createEdge(options) {
    return new SvgEdge(options, this);
  }

  createNode(options) {
    return new SvgNode(options, this);
  }

  draw() {
    this.root.append(this.dom);

    this.nodes.forEach(node => node.draw());
    this.edges.map(edge => edge.draw()).forEach(edgeDom => {
      this.svg.append(edgeDom);
    });
  }

  /**
   * @private
   */
  generateWrapper() {
    const temp = document.createElement('template');
    temp.innerHTML = '<div class="flowchart"></div>';
    return temp.content.firstChild;
  }

  generateSvgWrapper() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.classList.add('flowchart-svg');
    el.setAttribute('width', '2px')
    el.setAttribute('height', '2px')
    el.setAttribute('version', '1.1')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    el.style.zIndex = '499';

    // hack
    let wrapperOffset = this.dom.getBoundingClientRect();
    let svgOffset = el.getBoundingClientRect();
    el.style.top = (wrapperOffset.top - svgOffset.top) + 'px';
    el.style.left = (wrapperOffset.left - svgOffset.left) + 'px'

    return el;
  }
}
