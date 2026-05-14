from pqueue import PriorityQueue
import pytest

def test_init() -> None:
    q = PriorityQueue()
    assert q.size == 0

def test_enqueue_single() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=20)

    assert q.size == 1

def test_enqueue_repeated() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=20)

    with pytest.raises(ValueError):
        q.enqueue("abc", priority=50)

def test_dequeue_single() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=20)

    val, prio = q.dequeue()

    assert val == "abc"
    assert prio == 20

def test_dequeue_multiple() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=100)
    q.enqueue("def", priority=50)
    q.enqueue("ghi", priority=20)
    q.enqueue("jkl", priority=75)

    # Check that the elements are dequeued in priority order
    val, prio = q.dequeue()
    assert val == "ghi"
    assert prio == 20

    val, prio = q.dequeue()
    assert val == "def"
    assert prio == 50

    val, prio = q.dequeue()
    assert val == "jkl"
    assert prio == 75

    val, prio = q.dequeue()
    assert val == "abc"
    assert prio == 100

def test_dequeue_repeated() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=30)
    q.enqueue("mno", priority=20)
    q.enqueue("def", priority=20)
    q.enqueue("jkl", priority=10)
    q.enqueue("ghi", priority=20)

    # Check that the elements are dequeued in priority order
    # and, when priorities are equal, in lexicographical order.
    val, prio = q.dequeue()
    assert val == "jkl"
    assert prio == 10

    val, prio = q.dequeue()
    assert val == "def"
    assert prio == 20

    val, prio = q.dequeue()
    assert val == "ghi"
    assert prio == 20

    val, prio = q.dequeue()
    assert val == "mno"
    assert prio == 20

    val, prio = q.dequeue()
    assert val == "abc"
    assert prio == 30

def test_update_priority_single() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=20)
    q.update_priority("abc", new_priority=70)

    val, prio = q.dequeue()

    assert val == "abc"
    assert prio == 70

def test_update_priority_multiple() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=100)
    q.enqueue("def", priority=50)
    q.enqueue("ghi", priority=20)
    q.enqueue("jkl", priority=75)

    q.update_priority("jkl", new_priority=30)

    # Check that the elements are dequeued in priority order
    val, prio = q.dequeue()
    assert val == "ghi"
    assert prio == 20

    val, prio = q.dequeue()
    assert val == "jkl"
    assert prio == 30

    val, prio = q.dequeue()
    assert val == "def"
    assert prio == 50

    val, prio = q.dequeue()
    assert val == "abc"
    assert prio == 100

def test_update_priority_nonexistent() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=100)
    q.enqueue("def", priority=50)
    q.enqueue("ghi", priority=20)
    q.enqueue("jkl", priority=75)

    with pytest.raises(ValueError):
        q.update_priority("foobar", new_priority=30)

def test_size() -> None:
    q = PriorityQueue()

    q.enqueue("abc", priority=20)
    q.enqueue("def", priority=30)
    q.enqueue("ghi", priority=40)

    assert q.size == 3


