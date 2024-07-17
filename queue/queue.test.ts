import queue from "../queue";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("Queue", () => {
  let q: ReturnType<typeof queue<number>>;

  beforeEach(() => {
    q = queue();
  });

  test("should enqueue items", () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    expect(q.getLength()).toBe(3);
    expect(q.peek()).toBe(1);
  });

  test("should dequeue items", () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    const item1 = q.dequeue();
    const item2 = q.dequeue();
    const item3 = q.dequeue();

    expect(item1).toBe(1);
    expect(item2).toBe(2);
    expect(item3).toBe(3);
    expect(q.getLength()).toBe(0);
  });

  test("should peek at the front item without removing it", () => {
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    const item = q.peek();

    expect(item).toBe(1);
    expect(q.getLength()).toBe(3);
  });

  test("should return the correct length", () => {
    expect(q.getLength()).toBe(0);

    q.enqueue(1);
    expect(q.getLength()).toBe(1);

    q.enqueue(2);
    expect(q.getLength()).toBe(2);

    q.dequeue();
    expect(q.getLength()).toBe(1);

    q.dequeue();
    expect(q.getLength()).toBe(0);
  });

  test("should handle dequeue on empty queue", () => {
    const item = q.dequeue();
    expect(item).toBeUndefined();
    expect(q.getLength()).toBe(0);
  });

  test("should handle peek on empty queue", () => {
    const item = q.peek();
    expect(item).toBeUndefined();
  });
});
