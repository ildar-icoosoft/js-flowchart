import {Node} from "./node.js";

export class Palette {
  constructor(options) {
    this.root = options.root;
    this.wrapperDom = this.createWrapperDom_();

    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode_(nodeOptions)) : [];
  }

  draw() {
    this.nodes.forEach(node => {
      node.draw();
    });

    this.root.append(this.wrapperDom);
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
    el.classList.add('palette');
    return el;
  }
}
