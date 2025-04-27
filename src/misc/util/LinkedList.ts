
import { ListNode } from './ListNode';
export class LinkedList<T> {
    private head: ListNode<T> | null;
    private capacity: number;

    public constructor() {
        this.head = null;
        this.capacity = 0;

    }
    public addFirst(item: T): void {
        var node = new ListNode<T>(item);
        node.setNext(this.head);
        this.head = node;
        this.capacity++;
    }

    public remove(item: T): boolean {
        this.capacity--;
        return false;
    }
    public size(): number {
        return this.capacity;
    }

    public isEmpty(): boolean {
        return (this.capacity === 0);
    }
    public getFirst(): T | null {
        if (this.head) {
            return this.head.getValue();
        }
        return null;
    }

    public set(index:number, replacement:T):void{
        var count = 1;
        if (this.head) {
            if (index==0){
                this.head.setValue(replacement);
            }
            else{
                var current = this.head.getNext();
                while (current!= null) {
                    if (index == count){
                        current.setValue(replacement);
                    }
                    count++;
                    current = current.getNext();
                   
                }
            }
        }
    }

    public indexOf(item: T): number {
        var count = 1;
        if (this.head) {
            if (this.head.getValue() == item){
                return 0;
            }
            var current = this.head.getNext();
            while (current!= null) {
                if (current.getValue() == item){
                    return count;
                }
                count++;
                current = current.getNext();
               
            }


        }
        return -1;
    }
}
