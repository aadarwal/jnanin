from minheap import MinHeap

class PriorityQueue:
    """
    Priority queue implemented with a min heap
    """

    _mh: MinHeap

    def __init__(self):
        """
        Constructor. Creates an empty priority queue.
        """
        self._mh = MinHeap()

    def enqueue(self, value: str, priority: int) -> None:
        """
        Enqueues an element with a priority. The element must
        not already be in the priority queue.

        Args:
          value: Value to enqueue
          priority: Priority (lower values mean higher priority)

        Raises:
          ValueError: If `value` is already in the priority queue

        Returns: Nothing
        """

        self._mh.insert(priority, value)

    def dequeue(self) -> tuple[str, int]:
        """
        Dequeue the highest-priority element from the queue.
        If multiple elements have the same priority, those
        elements are dequeued in lexicographical order.

        Args: None

        Returns: Tuple with the highest-priority element
        and its priority.
        """
        elem = self._mh.remove_min()
        assert elem is not None
        prio, val = elem

        return val, prio

    def update_priority(self, value: str, new_priority: int) -> None:
        """
        Updates the priority of an element in the priority queue

        Args:
          value: Value whose priority we want to update
          new_priority: New priority (lower values mean higher priority)

        Raises:
          ValueError: If `value` does not exist in the priority queue.

        Returns: Nothing
        """
        self._mh.change_priority(value, new_priority)

    @property
    def size(self) -> int:
        """
        Returns the number of elements in the priority queue
        """
        return self._mh.size

    def __str__(self) -> str:
        """
        Returns a string representation of the priority queue
        """
        return str(self._mh)