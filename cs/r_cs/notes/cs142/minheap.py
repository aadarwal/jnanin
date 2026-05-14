from typing import Optional


# Helper functions for obtaining the parent/left/right
# index of a given position.
def _parent_index(i):
    if i == 0:
        return None
    return (i - 1) // 2

def _left_child_index(i):
    return 2 * i + 1

def _right_child_index(i):
    return 2 * i + 2


class MinHeap:
    """
    Class implementing a min heap. This heap can
    specifically store string values with an associated
    integer priority (and the heap will return the values
    with the lowest integer priorities first)
    """

    _data: list[Optional[tuple[int, str]]]
    _capacity: int
    _index_of_item: dict[str, int]
    _next: int

    def __init__(self, initial_capacity=10):
        """
        Constructor. The min heap is constructed with
        an initial capacity, which grows dynamically
        as more elements are added.

        Args:
            initial_capacity: Initial capacity of the min heap.
        """
        # Create an array with enough space for the initial
        # capacity of the min heap
        self._data = [None] * initial_capacity
        self._capacity = initial_capacity

        # The _index_of_item dictionary maps string items
        # to their position in the minheap array. This
        # allows us to easily locate items whose priority
        # we want to update.
        self._index_of_item = {}
        self._next = 0

    @property
    def size(self) -> int:
        """
        Returns: Number of elements in the min heap
        """
        return self._next

    @property
    def empty(self) -> bool:
        """
        Returns: whether the min heap is empty or not
        """
        return self._next == 0

    def min(self) -> Optional[tuple[int, str]]:
        """
        Returns: If the heap is not empty, returns the
         priority and value of the minimum element.
         Otherwise, returns None.
        """
        if self.empty:
            return None
        return self._data[0]

    def _swap(self, p: int, q: int) -> None:
        """
        Swaps two elements in the minheap array
        (in positions p and q)
        """
        assert p < self._next and q < self._next
        elem_p = self._data[p]
        elem_q = self._data[q]
        assert elem_p is not None and elem_q is not None

        tmp = elem_p
        self._index_of_item[elem_p[1]] = q
        self._index_of_item[elem_q[1]] = p
        self._data[p] = elem_q
        self._data[q] = tmp

    def _sift_up(self, pos: int) -> None:
        """
        Sifts up the element in the given position until
        it is in the correct position.
        """
        if pos == 0:
            return
        pi = _parent_index(pos)
        if self._data[pos] < self._data[pi]:
            self._swap(pos, pi)
            self._sift_up(pi)

    def _sift_down(self, pos: int) -> None:
        """
        Sifts down the element in the given position until
        it is in the correct position.
        """
        curr = self._data[pos]
        (li, ri) = (_left_child_index(pos), _right_child_index(pos))
        if li >= self._next:
            return
        elif li < self._next and ri >= self._next:
            lc = self._data[li]
            m = min(curr, lc)
            if lc == m:
                self._swap(pos, li)
                self._sift_down(li)
        else:
            (lc, rc) = (self._data[li], self._data[ri])
            m = min([curr, lc, rc])
            if rc == m:
                self._swap(pos, ri)
                self._sift_down(ri)
            elif lc == m:
                self._swap(pos, li)
                self._sift_down(li)

    def remove_min(self) -> Optional[tuple[int, str]]:
        """
        Removes the minimum element from the minheap.

        Returns: If the heap is not empty, returns the
         priority and value of the minimum element.
         Otherwise, returns None.
        """
        if self.empty:
            return None

        min_item = self._data[0]
        assert min_item is not None

        if self._next > 0:
            self._data[0] = self._data[self._next - 1]
            assert self._data[0] is not None

            self._index_of_item[self._data[0][1]] = 0
            self._next -= 1
            del self._index_of_item[min_item[1]]
            self._sift_down(0)
        return min_item

    def insert(self, priority: int, item: str) -> None:
        """
        Inserts a new element into the min heap

        Args:
            priority: Priority of element to insert
            item: Value of element to insert

        Returns: Nothing
        """
        if item in self._index_of_item:
            raise ValueError(f"item '{item}' already in minheap")

        if self.size == self._capacity:
            self._data += [None] * 10
            self._capacity += 10

        self._data[self._next] = (priority, item)
        self._index_of_item[item] = self._next
        self._next += 1
        self._sift_up(self._next - 1)

    def change_priority(self, item: str, new_prio: int) -> None:
        """
        Changes the priority of an item in the minheap.

        Args:
            item: Value of the item to update.
            new_prio: New priority

        Raises:
            ValueError: If there is no item with value `item`
              in the minheap.

        Returns: Nothing
        """
        if item not in self._index_of_item:
            raise ValueError(f"item '{item}' not in minheap")

        at = self._index_of_item[item]
        entry = self._data[at]
        assert entry is not None

        old_prio, _ = entry
        self._data[at] = (new_prio, item)
        if new_prio < old_prio:
            self._sift_up(at)
        elif new_prio > old_prio:
            self._sift_down(at)

    def __str__(self) -> str:
        """
        Returns: String representation of min heap.
        """
        if self.empty:
            return "[empty]"

        linebreak = 1
        row_count = 0
        rv = ""
        for i in range(self._next):
            rv += str(self._data[i]) + " "
            row_count += 1
            if row_count == linebreak or i == self._next - 1:
                rv += "\n"
                linebreak *= 2
                row_count = 0
        return rv
