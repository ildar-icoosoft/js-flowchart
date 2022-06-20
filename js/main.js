import {Canvas} from "./canvas.js";
import mockData from './data.js';

window.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('diagram-container');
    const canvas = new Canvas({
        root
    });
    canvas.draw(mockData);
});
