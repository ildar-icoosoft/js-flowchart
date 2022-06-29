

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
