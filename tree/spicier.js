/*
프로그래머스 더 맵게 https://school.programmers.co.kr/learn/courses/30/lessons/42626

스코빌 지수가 가장 낮은 두 개의 음식을 섞어 새로운 음식
섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

주어진 배열의 원소가 K 값 이하일 경우 위의 방식으로 수를 증가시켜 새로운 배열을 만든다.

[1, 2, 3, 9, 10, 12]
[3, 5, 9, 10, 12] 
1. 0번에서 추출한 배열을 오름차순으로 정렬

2. 각 요소를 k와 비교
[1] 
[3] 
  2-1. 스코빌 지수가 K보다 낮은 경우 3번 실행, (함수 실행횟수 ++)
  2-2. 스코빌 지수가 K보다 높은 경우 순회 멈춤

3. 2-1번의 다음 순서의 값이 있는지 확인
[1, 2] , [3, 9, 10, 12]
[3, 5] , [9, 10, 12]
   3-1. 값이 있는 경우 n, n+1 값 이후 값 분리
   3-2. 값이 없는 경우 -1 리턴
[5] , [3, 9, 10, 12]
[13] , [9, 10, 12]
4. n, n+1을 공식으로 더한 후 값 추출

[5, 3, 9, 10, 12] 
[13, 9, 10, 12]
5. 추출한 값과 4-1에서 n+2 이후 값을 병합
6. 함수 실행 횟수 더한 후 1번 실행 
*/

const combineFood = (a, b) => a + b * 2;

const makeNewScoville = (sortedScoville, targetFood, nextFood) => {
  return [combineFood(targetFood, nextFood), ...sortedScoville.splice(2)];
};

function solution(scoville, K, answer = 0) {
  if (scoville === undefined || scoville.length <= 1) return -1;
  const sortedScoville = scoville.sort((a, b) => a - b);

  const [targetFood, nextFood] = sortedScoville;
  if (targetFood < K) {
    if (nextFood === undefined) return -1;
    const newScoville = makeNewScoville(sortedScoville, targetFood, nextFood);
    return solution(newScoville, K, answer + 1);
  }
  return answer;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7)); // 2
console.log(solution([1, 2], 10)); // -1
console.log(solution([10, 12], 7)); // 0
console.log(solution([0, 0, 3], 6)); // 2

/* 

힙을 사용하지 않고 문제를 풀어보니, 성능 테스트는 0점

문제점
1. solution 함수 호출 시 sort함수 매번 동작함 
2. 재귀로 인한 스택오버플로우 이슈발생 가능성
*/
