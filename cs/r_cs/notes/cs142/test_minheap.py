import sys
from typing import Optional

from minheap import MinHeap
import pytest

#
# BLACK-BOX TESTS
#
# These are tests that are designed based only on the interface of
# the MinHeap class (i.e., without knowledge of how the Min Heap is
# implemented internally). Notice how they're very similar to our
# tests for PriorityQueue
#


def test_init() -> None:
    mh = MinHeap()

    assert mh.size == 0
    assert mh.empty


def test_min_empty() -> None:
    mh = MinHeap()

    val = mh.min()
    assert val is None


def test_insert_single() -> None:
    mh = MinHeap()

    mh.insert(20, "abc")

    assert mh.size == 1
    assert not mh.empty


def test_insert_repeated() -> None:
    mh = MinHeap()

    mh.insert(20, "abc")

    with pytest.raises(ValueError):
        mh.insert(40, "abc")


def test_min_single() -> None:
    mh = MinHeap()

    mh.insert(20, "abc")

    rv = mh.min()
    assert rv is not None

    prio, val = rv
    assert prio == 20
    assert val == "abc"

    # Min doesn't remove the minimum element
    # (it just tells us what it is). Let's
    # make sure we didn't remove the element as well.
    assert mh.size == 1
    assert not mh.empty


def test_min_multiple() -> None:
    mh = MinHeap()

    mh.insert(100, "abc")
    mh.insert(50, "def")
    mh.insert(20, "ghi")
    mh.insert(75, "jkl")

    rv = mh.min()
    assert rv is not None

    prio, val = rv
    assert prio == 20
    assert val == "ghi"

    # Min doesn't remove the minimum element
    # (it just tells us what it is). Let's
    # make sure we didn't remove the element as well.
    assert mh.size == 4
    assert not mh.empty


def test_remove_min_single() -> None:
    mh = MinHeap()

    mh.insert(20, "abc")

    rv = mh.remove_min()
    assert rv is not None

    prio, val = rv
    assert prio == 20
    assert val == "abc"

    # Check that the item was actually removed
    assert mh.size == 0
    assert mh.empty


def check_remove_min(mh: MinHeap, items: list[tuple[int, str]]) -> None:
    """
    Helper function that inserts items, then checks that they are being
    removed in the correct order.
    """
    for prio, val in items:
        mh.insert(prio, val)

    # Check that the elements are removed in priority order
    sorted_items = sorted(items)

    for prio_expected, val_expected in sorted_items:
        rv = mh.remove_min()
        assert rv is not None

        prio, val = rv
        assert prio == prio_expected
        assert val == val_expected

    # Check that the items were actually removed
    assert mh.size == 0
    assert mh.empty


def test_remove_min_multiple() -> None:
    mh = MinHeap()

    items = [(100, "abc"), (50, "def"), (20, "ghi"), (75, "jkl")]

    check_remove_min(mh, items)


def test_remove_min_repeated() -> None:
    mh = MinHeap()

    items = [(30, "abc"), (20, "mno"), (20, "def"), (10, "jkl"), (75, "ghi")]

    check_remove_min(mh, items)


def test_change_priority_single() -> None:
    mh = MinHeap()

    mh.insert(20, "abc")
    mh.change_priority("abc", 70)

    rv = mh.min()
    assert rv is not None

    prio, val = rv
    assert prio == 70
    assert val == "abc"


def test_change_priority_multiple() -> None:
    mh = MinHeap()

    mh.insert(100, "abc")
    mh.insert(50, "def")
    mh.insert(20, "ghi")
    mh.insert(75, "jkl")
    mh.change_priority("jkl", 30)

    rv = mh.remove_min()
    assert rv is not None

    prio, val = rv
    assert prio == 20
    assert val == "ghi"

    # The element whose priority we updated should be next
    rv = mh.remove_min()
    assert rv is not None

    prio, val = rv
    assert prio == 30
    assert val == "jkl"


#
# WHITE-BOX TESTS
#
# These are tests that are aware of the internal implementation
# of the data structure we are testing, and that are designed
# to ensure that as much of that internal code is covered
# by the tests

# The following list of items will result in the min heap
# we described in class.


def sample_heap() -> MinHeap:
    """
    This fixture returns the heap we described in class
    """
    items = [(1, "A"), (4, "B"), (8, "C"), (18, "D"), (8,"E"),
             (99, "F"), (12, "G"), (21, "H")]

    mh = MinHeap()

    for prio, val in items:
        mh.insert(prio, val)

    return mh

def check_remove_in_order(mh: MinHeap) -> None:
    """
    Helper function that verifies that elements
    are removed in the correct order (but doesn't
    check the exact values)
    """

    cur_priority: Optional[int] = None
    while not mh.empty:
        rv = mh.remove_min()
        assert rv is not None
        prio, _ = rv

        if cur_priority is None:
            cur_priority = prio
        else:
            assert prio > cur_priority, \
            (f"After removing element with priority {cur_priority} "
             f"the next element returned a higher priority ({prio})")


# The following are examples of white-box test where we've set up the
# tests to insert values in a way that will result in different sifting
# scenarios. We don't directly verify that the sifting did (or did not)
# take place but, at the very least, we are ensuring that we're checking
# that our code works correctly in these scenarios.

def test_insert_no_sift() -> None:
    """
    Performs an insertion that will not result in sifting any nodes.
    """

    mh = sample_heap()
    mh.insert(37, "I")
    assert mh.size == 9
    check_remove_in_order(mh)

def test_insert_sift_up_mid_tree() -> None:
    """
    Performs an insertion that will result in the node being
    sifted up two levels (not all the way to the tree).
    """

    mh = sample_heap()
    mh.insert(2, "I")
    assert mh.size == 9
    check_remove_in_order(mh)


def test_insert_sift_up_root() -> None:
    """
    Performs an insertion that will result in the node being
    sifted up all the way to the root.
    """

    mh = sample_heap()
    mh.insert(-10, "I")
    assert mh.size == 9

    rv = mh.min()
    assert rv is not None
    prio, val = rv
    assert prio == -10
    assert val == "I"

    check_remove_in_order(mh)


# The following are alternate versions of the above tests where we also
# check the internal data structures to verify that the sifting is/isn't
# taking place. Be careful when writing this kind of white-box test, as
# they will have to be updated if the internal implementation of a class
# changes.

def test_insert_no_sift_alt() -> None:
    """
    Performs an insertion that will not result in sifting any nodes.
    """

    mh = sample_heap()
    mh.insert(37, "I")

    # The new node should be in the last position of the data array
    elem = mh._data[mh._next - 1]
    assert elem is not None

    prio, val = elem
    assert prio == 37
    assert val == "I"


def test_insert_sift_up_mid_tree_alt() -> None:
    """
    Performs an insertion that will result in the node being
    sifted up two levels (not all the way to the tree).
    """

    mh = sample_heap()
    mh.insert(2, "I")

    # The new node should be sifted up to the second position of the data array
    elem = mh._data[1]
    assert elem is not None

    prio, val = elem
    assert prio == 2
    assert val == "I"


def test_insert_sift_up_root_alt() -> None:
    """
    Performs an insertion that will result in the node being
    sifted up all the way to the root.
    """

    mh = sample_heap()
    mh.insert(-10, "I")

    # The new node should be sifted up to the first position of the data array
    elem = mh._data[0]
    assert elem is not None

    prio, val = elem
    assert prio == -10
    assert val == "I"
