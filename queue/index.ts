// 데이터의 순서가 있는 자료구조로, 자료를 추가할 때는 항상 끝에 추가되고, 삭제나 조회를 할 때는 맨 앞의 자료를 대상으로 합니다.
const queue = <T>() => {
  const items: { [key: number]: T } = {};
  let headIndex = 0;
  let tailIndex = 0;

  return {
    enqueue: (item: T): T | undefined => {
      items[tailIndex] = item;
      tailIndex++;
      return item;
    },
    dequeue: (): T | undefined => {
      if (tailIndex === headIndex) return undefined;

      const deletedItem = items[headIndex];
      delete items[headIndex];
      headIndex++;
      return deletedItem;
    },
    peek: (): T | undefined => items[headIndex],
    getLength: () => tailIndex - headIndex
  };
};

export default queue;
