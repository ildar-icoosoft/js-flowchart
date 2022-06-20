'use strict';

export class BaseNode {

    constructor(options) {
        this.dom = null;
    }

    init() {
        if (!this.dom) {
            this.dom = this.draw();
        }
    }

    draw() {
        const temp = document.createElement('template');
        temp.innerHTML = '<div>NODE</span>';
        return temp.content;
    }
}
