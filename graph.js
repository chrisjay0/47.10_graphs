class Node {
  constructor(value) {
      this.value = value;
      this.adjacent = new Set();
  }
}

class Graph {
  constructor() {
      this.nodes = new Set();
  }

  addVertex(vertex) {
      this.nodes.add(vertex);
  }

  addVertices(vertices) {
      for (let vertex of vertices) {
          this.addVertex(vertex);
      }
  }

  addEdge(vertex1, vertex2) {
      vertex1.adjacent.add(vertex2);
      vertex2.adjacent.add(vertex1);
  }

  removeEdge(vertex1, vertex2) {
      vertex1.adjacent.delete(vertex2);
      vertex2.adjacent.delete(vertex1);
  }

  removeVertex(vertex) {
      for (let node of this.nodes) {
          node.adjacent.delete(vertex);
      }
      this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
      const visited = new Set();
      const result = [];

      function dfs(vertex) {
          if (!vertex || visited.has(vertex)) return;

          visited.add(vertex);
          result.push(vertex.value);

          for (let neighbor of vertex.adjacent) {
              if (!visited.has(neighbor)) {
                  dfs(neighbor);
              }
          }
      }

      dfs(start);

      return result;
  }

  breadthFirstSearch(start) {
      const visited = new Set();
      const queue = [start];
      const result = [];

      while (queue.length) {
          let current = queue.shift();

          if (!visited.has(current)) {
              result.push(current.value);
              visited.add(current);

              for (let neighbor of current.adjacent) {
                  if (!visited.has(neighbor)) {
                      queue.push(neighbor);
                  }
              }
          }
      }

      return result;
  }
}


module.exports = { Graph, Node };
