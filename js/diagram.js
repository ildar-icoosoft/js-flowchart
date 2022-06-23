import {SvgCanvas} from "./canvas/svg-canvas.js";

export class Diagram {
  constructor(options) {
    /**
     * @type {'svg' | 'canvas'}
     */
    this.mode = options.mode || 'svg';

    this.canvas = this.createCanvas({
      root: options.root,
      nodes: options.nodes || [],
      edges: options.edges || []
    })
  }

  /**
   * @private
   * @return {BaseCanvas}
   */
  createCanvas(options) {
    if (this.mode === 'svg') {
      return new SvgCanvas(options);
    }
  }

  draw() {
    this.canvas.draw();
  }
}
