import {Node} from "./node.js";

export class Palette {
  constructor(options) {
    this.root = options.root;
    this.wrapperDom = this.createWrapperDom();

    this.nodes = options.nodes ? options.nodes.map(nodeOptions => this.createNode(nodeOptions)) : [];

    // отключаем возможность выделения текста
    this.wrapperDom.addEventListener('selectstart', (e) => e.preventDefault());
  }

  createNode(options) {
    return new Node({
      ...options,
      wrapperDom: this.wrapperDom,
    });
  }

  /**
   * @private
   * @return {HTMLDivElement}
   */
  createWrapperDom() {
    const el = document.createElement('div');
    el.classList.add('palette');
    return el;
  }

  draw() {
    this.nodes.forEach(node => {
      node.draw();
    });

    this.root.append(this.wrapperDom);
  }
}
