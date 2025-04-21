
export class ListNode<T> {
    
    private next: ListNode<T> | null; //Can be NULL
    private value: T

    constructor(value: T) {
        this.value = value;
        this.next = null;

    }
    setNext(next: ListNode<T> | null): void {
        this.next = next;
    }
    setValue(value: T): void {
        this.value = value;
    }
    getValue(): T {
        return this.value;
    }
    getNext(): ListNode<T> | null {
        return this.next;
    }
}
