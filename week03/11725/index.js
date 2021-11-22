const fs = `7
1 6
6 3
3 5
4 1
2 4
4 7`

const input = fs.trim().toString().split('\n');

const sol = (input) => {
  const N = +input[0];
  input = input.slice(1);
  
  const tree = Array.from({ length: N + 1 }, () => new Array());
  
  input.map((val) => {
    const [from, to] = val.split(" ").map(Number);
    tree[from].push(to);
    tree[to].push(from); // 무방향 트리이므로 A->B, B->A 정보를 모두 넣어준다.
  });

  let check = Array.from({ length: N + 1 }, () => 0);
  
  function bfs() {
    const queue = [];
    check[1] = 1;
    for (let next of tree[1]) { // next(child) 노드 값의 인덱스에 1(부모 노드)값을 넣어주고, 큐에 넣어준다.
      check[next] = 1;
      queue.push(next);
    }
    
    while (queue.length) {
      const node = queue.shift();
      for (let next of tree[node]) { // 노드를 순회하면서, 방문한 노드라면 건너뛴다.
        if (check[next]) continue;
        check[next] = node; // 위와 같이 next 인덱스에는 node(부모 노드)값을 넣는다.
        queue.push(next);
      }
    }
  }
  
  bfs();

  check = check.slice(2);
  let result = "";
  check.map((v) => (result += `${v}\n`)); // 체크 배열의 2번 인덱스(2번 노드)부터 출력한다.
  return result;
};

console.log(sol(input));
