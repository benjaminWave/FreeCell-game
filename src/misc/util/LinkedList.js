import { ListNode } from './ListNode';
export class LinkedList {
    constructor() {
        this.head = null;
        this.capacity = 0;
    }
    addFirst(item) {
        var node = new ListNode(item);
        node.setNext(this.head);
        this.head = node;
        this.capacity++;
    }
    remove(item) {
        this.capacity--;
        return false;
    }
    size() {
        return this.capacity;
    }
    isEmpty() {
        return (this.capacity === 0);
    }
    getFirst() {
        if (this.head) {
            return this.head.getValue();
        }
        return null;
    }
    set(index, replacement) {
        var count = 1;
        if (this.head) {
            if (index == 0) {
                this.head.setValue(replacement);
            }
            else {
                var current = this.head.getNext();
                while (current != null) {
                    if (index == count) {
                        current.setValue(replacement);
                    }
                    count++;
                    current = current.getNext();
                }
            }
        }
    }
    indexOf(item) {
        var count = 1;
        if (this.head) {
            if (this.head.getValue() == item) {
                return 0;
            }
            var current = this.head.getNext();
            while (current != null) {
                if (current.getValue() == item) {
                    return count;
                }
                count++;
                current = current.getNext();
            }
        }
        return -1;
    }
}
