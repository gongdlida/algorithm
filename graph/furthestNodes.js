/*
프로그래머스 가장 긴 노드 https://school.programmers.co.kr/learn/courses/30/lessons/49189
 1. 그래프를 인접 리스트로 변환
 2. BFS를 사용하여 1번 노드에서 가장 멀리 떨어진 노드 찾기
 3. 1번 노드에서 각 노드까지의 거리를 찾기
 4. 가장 멀리 떨어진 노드들을 수집
*/

function solution(n, vertex) {
  // 그래프를 인접 리스트로 변환
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of vertex) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // BFS를 사용하여 1번 노드에서 가장 멀리 떨어진 노드 찾기
  const bfs = (start) => {
    const distances = Array(n + 1).fill(-1);
    const queue = [start];
    distances[start] = 0;

    while (queue.length > 0) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (distances[neighbor] === -1) {
          distances[neighbor] = distances[node] + 1;
          queue.push(neighbor);
        }
      }
    }

    return distances;
  };

  // 1번 노드에서 각 노드까지의 거리를 찾기
  const distancesFromStart = bfs(1);
  const maxDistance = Math.max(...distancesFromStart);
  const furthestNodes = [];

  // 가장 멀리 떨어진 노드들을 수집
  for (let i = 1; i <= n; i++) {
    if (distancesFromStart[i] === maxDistance) {
      furthestNodes.push(i);
    }
  }

  return furthestNodes.length;
}
