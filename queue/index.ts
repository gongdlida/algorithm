// 데이터의 순서가 있는 자료구조로 자료 추가 시 자료구조 순서 끝에 들어오며, 삭제나 조회를 하는 경우 자료구조 순서의 맨 앞에 자료를 대상으로 한다.
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
