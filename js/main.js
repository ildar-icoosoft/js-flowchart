import mockData from './data.js';
import {SvgDiagram} from "./diagram/svg-diagraam.js";

window.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('flowchart-container');
  const diagram = new SvgDiagram({
    root,
    nodes: mockData.nodes,
    edges: mockData.edges
  });
  diagram.draw();
});
