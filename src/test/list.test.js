import {expect, jest, test} from '@jest/globals';
import { LinkedList} from './model/util/LinkedList';

describe("LinkedList",()=>{
    it('greet', () => {
        const greeter = new Greeter();
        expect(greeter.greet('John')).toBe('Hello, John!');
      });
});