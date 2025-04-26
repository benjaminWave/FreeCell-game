export class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
    setNext(next) {
        this.next = next;
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getNext() {
        return this.next;
    }
}
