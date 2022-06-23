import {BaseCanvas} from "./base-canvas.js";
import {SvgNode} from "../nodes/svg-node.js";
import {SvgEdge} from "../edges/svg-edge.js";

export class SvgCanvas extends BaseCanvas {
  constructor(options, canvas) {
    super(options, canvas);

    this.dom = this.generateWrapper();
  }

  createNode(options) {
    return new SvgNode(options, this);
  }

  createEdge(options) {
    return new SvgEdge(options, this);
  }

  draw() {
    this.root.append(this.dom);

    this.nodes.forEach(node => node.draw());
    this.edges.forEach(edge => edge.draw());
  }

  /**
   * @private
   */
  generateWrapper() {
    const temp = document.createElement('template');
    temp.innerHTML = '<div class="flowchart"></div>';
    return temp.content.firstChild;
  }
}
