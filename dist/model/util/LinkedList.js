(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ListNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkedList = void 0;
    var ListNode_1 = require("./ListNode");
    var LinkedList = /** @class */ (function () {
        function LinkedList() {
            this.head = null;
            this.capacity = 0;
        }
        LinkedList.prototype.addFirst = function (item) {
            var node = new ListNode_1.ListNode(item);
            node.setNext(this.head);
            this.head = node;
            this.capacity++;
        };
        LinkedList.prototype.remove = function (item) {
            this.capacity--;
            return false;
        };
        LinkedList.prototype.size = function () {
            return this.capacity;
        };
        LinkedList.prototype.isEmpty = function () {
            return (this.capacity === 0);
        };
        LinkedList.prototype.getFirst = function () {
            if (this.head) {
                return this.head.getValue();
            }
            return null;
        };
        LinkedList.prototype.set = function (index, replacement) {
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
        };
        LinkedList.prototype.indexOf = function (item) {
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
        };
        return LinkedList;
    }());
    exports.LinkedList = LinkedList;
});
