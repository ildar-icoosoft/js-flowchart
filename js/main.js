import mockData from './data.js';
import {Diagram} from "./diagram.js";

window.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('flowchart-container');
  const diagram = new Diagram({
    root,
    nodes: mockData.nodes,
    edges: mockData.edges
  });
  diagram.draw();
});
