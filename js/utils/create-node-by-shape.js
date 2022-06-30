import {Node} from "../node.js";

const options = {
  circle: {
    id: 'circle',
    text: 'Start',
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    color: 'green',
    shape: 'circle',
    border: 'dashed',
    endpoints: [{
      id: 'top',
      orientation: [0, -1],
      pos: [0.5, 0]
    }, {
      id: 'right',
      orientation: [1, 0],
      pos: [0, 0.5]
    }, {
      id: 'bottom',
      orientation: [0, 1],
      pos: [0.5, 0]
    }, {
      id: 'left',
      orientation: [-1, 0],
      pos: [0, 0.5]
    }]
  },
  rect: {
    id: 'rect',
    text: 'Action',
    top: 150,
    left: 250,
    width: 107,
    height: 77,
    color: 'green',
    shape: 'rect',
    border: 'solid',
    endpoints: [{
      id: 'top',
      orientation: [0, -1],
      pos: [0.5, 0]
    }, {
      id: 'right',
      orientation: [1, 0],
      pos: [0, 0.5]
    }, {
      id: 'bottom',
      orientation: [0, 1],
      pos: [0.5, 0]
    }, {
      id: 'left',
      orientation: [-1, 0],
      pos: [0, 0.5]
    }]
  }
};

/**
 * Создание новой ноды
 * @param {string} shape - форма
 * @param {HTMLDivElement | null} wrapperDom
 */
export function createNodeByShape(shape, wrapperDom) {
  if (!options[shape]) {
    return null;
  }

  // @todo генерировать уникальные ID, либо отказаться от них, т.к. id у нас нигде не используются

  const optionsClone = JSON.parse(JSON.stringify(options[shape]));

  return new Node({
    ...optionsClone,
    wrapperDom
  })
}
