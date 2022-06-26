export function getEndpointCoordinates(node, endpoint) {
  let x;
  if (endpoint.orientation[0] === 1) {
    x = node.left + node.width - endpoint.pos[0] * node.width;
  } else {
    x = node.left + endpoint.pos[0] * node.width;
  }

  let y;
  if (endpoint.orientation[1] === 1) {
    y = node.top + node.height - endpoint.pos[1] * node.height;
  } else {
    y = node.top + endpoint.pos[1] * node.height;
  }

  return [x, y]
}

export function findEndpointByCoordinates(nodes, coordinates) {
  for (let node of nodes) {
    for (let endpoint of node.endpoints) {
      if (
        coordinates[0] >= endpoint.left &&
        coordinates[0] <= endpoint.left + endpoint.width &&
        coordinates[1] >= endpoint.top &&
        coordinates[1] <= endpoint.top + endpoint.height
      ) {
        return {
          node,
          endpoint
        };
      }
    }
  }
  return null;
}
