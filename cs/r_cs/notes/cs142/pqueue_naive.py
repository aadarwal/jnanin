class PriorityQueue:
    """
    Priority queue implemented with a list that gets
    re-sorted every time a new element is inserted
    (or whenever a priority is updated)
    """

    _queue: list[tuple[int, str]]

    def __init__(self):
        """
        Constructor. Creates an empty priority queue.
        """
        self._queue = []

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
        for _, val in self._queue:
            if val == value:
                raise ValueError(f"Value is already in queue: {value}")
        self._queue.append((priority, value))
        self._queue.sort()

    def dequeue(self) -> tuple[str, int]:
        """
        Dequeue the highest-priority element from the queue.
        If multiple elements have the same priority, those
        elements are dequeued in lexicographical order.

        Args: None

        Returns: Tuple with the highest-priority element
        and its priority.
        """
        prio, val = self._queue.pop(0)
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
        # Find the element to update
        to_update = None
        for prio, val in self._queue:
            if val == value:
                to_update = (prio, val)
                break

        # Raise exception if the value is not in the list
        if to_update is None:
            raise ValueError(f"No such value in queue: {value}")

        # Remove, re-add, and re-sort
        self._queue.remove((prio, val))
        self._queue.append((new_priority, value))
        self._queue.sort()

    @property
    def size(self) -> int:
        """
        Returns the number of elements in the priority queue
        """
        return len(self._queue)

    def __str__(self) -> str:
        """
        Returns a string representation of the priority queue
        """
        raise NotImplementedError
