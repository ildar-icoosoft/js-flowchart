import {flowChartData, paletteNodes} from './data.js';
import {Diagram} from "./diagram.js";
import {Palette} from "./palette.js";

window.addEventListener('DOMContentLoaded', () => {
  const diagram = new Diagram({
    root: document.getElementById('flowchart-container'),
    nodes: flowChartData.nodes,
    edges: flowChartData.edges
  });
  diagram.draw();

  const palette = new Palette({
    root: document.getElementById('palette-container'),
    nodes: paletteNodes
  });
  palette.draw();
});
