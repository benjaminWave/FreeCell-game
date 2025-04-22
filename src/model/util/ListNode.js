"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
var ListNode = /** @class */ (function () {
    function ListNode(value) {
        this.value = value;
        this.next = null;
    }
    ListNode.prototype.setNext = function (next) {
        this.next = next;
    };
    ListNode.prototype.setValue = function (value) {
        this.value = value;
    };
    ListNode.prototype.getValue = function () {
        return this.value;
    };
    ListNode.prototype.getNext = function () {
        return this.next;
    };
    return ListNode;
}());
exports.ListNode = ListNode;
