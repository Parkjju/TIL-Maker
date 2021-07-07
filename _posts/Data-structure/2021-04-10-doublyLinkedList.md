---
layout: post
navigation: True
title: 양 방향 연결리스트 구현
class: post-template
subclass: "post tag-python"
author: parkjju
---

```python
# 1. class Node 선언 부분
class Node:
    def __init__(self, key=None):
        self.key = key
        self.prev = self
        self.next = self

    def __str__(self):
        return str(self.key)

# 2. class DoublyLinkedList 선언부분


class DoublyLinkedList:
    def __init__(self):
        self.head = Node()  # create an empty list with only dummy node

    def __iter__(self):
        v = self.head.next
        while v != self.head:
            yield v
            v = v.next

    def __str__(self):
        return " -> ".join(str(v.key) for v in self)

    def printList(self):
        v = self.head.next
        print("h -> ", end="")
        while v != self.head:
            print(str(v.key)+" -> ", end="")
            v = v.next
        print("h")

    def splice(self, a, b, x):
        # a와 b 위치에 따른 테스트케이스 확인
        if a == None or b == None or x == None:
            return

        ap = a.prev
        bn = b.next

        # cut [a..b]
        ap.next = bn
        bn.prev = ap

        xn = x.next
        xn.prev = b
        b.next = xn
        a.prev = x
        x.next = a

    def moveAfter(self, a, x):
        self.splice(a, a, x)

    def moveBefore(self, a, x):
        self.splice(a, a, x.prev)

    def pushFront(self, key):
        self.insertAfter(self.head, key)

    def pushBack(self, key):
        self.insertBefore(self.head, key)

    def popFront(self):
        if self.isEmpty():
            return None

        if self.head.next.next == self.head:  # 연결리스트의 노드가 하나인 경우
            x = self.head.next
            key = x.key
            del x
            self.head.next = self.head
            self.head.prev = self.head
            return key

        x = self.head.next
        key = x.key

        self.head.next = x.next
        x.next.prev = self.head

        del x
        return key

    def popBack(self):
        if self.isEmpty():
            return None

        if self.head.next.next == self.head:  # 연결리스트의 노드가 하나인 경우
            x = self.head.next
            key = x.key
            del x
            self.head.next = self.head
            self.head.prev = self.head
            return key

        x = self.head.prev
        key = x.key
        x.prev.next = self.head
        self.head.prev = x.prev
        del x
        return key

    def search(self, key):
        v = self.head
        while v.next != self.head:
            if v.key == key:
                return v
            v = v.next
        if v.next == self.head and v.key == key:
            return v
        return None

    def insertAfter(self, x, key):
        newNode = Node(key)
        self.moveAfter(newNode, x)

    def insertBefore(self, x, key):
        newNode = Node(key)
        self.moveBefore(newNode, x)

    def deleteNode(self, x):
        delNode = self.head.next
        prev = self.head
        while delNode.next != self.head:
            if x.key == delNode.key:
                break
            prev = delNode
            delNode = delNode.next

        if delNode.next == self.head:
            self.popBack()

        prev.next = delNode.next
        delNode.next.prev = prev
        del delNode

    def first(self):
        return self.head.next


    def last(self):
        return self.head.prev

    def findMax(self):
        if self.isEmpty():
            return None
        max_node = self.head.next
        max_key = max_node.key
        while max_node.next != self.head:
            max_node = max_node.next
            if max_key < max_node.key:
                max_key = max_node.key

        return max_key


    def deleteMax(self):
        max_key = self.findMax()
        delNode = self.search(max_key)

        self.deleteNode(delNode)
        return max_key



    def sort(self):
        newList = DoublyLinkedList()
        while not self.isEmpty():
            newList.pushFront(self.deleteMax())
        return newList

    def isEmpty(self):
        if self.head.next == self.head and self.head.prev == self.head:
            return True
        else:
            return False


L = DoublyLinkedList()
while True:
	cmd = input().split()
	if cmd[0] == 'pushF':
		L.pushFront(int(cmd[1]))
		print("+ {0} is pushed at Front".format(cmd[1]))
	elif cmd[0] == 'pushB':
		L.pushBack(int(cmd[1]))
		print("+ {0} is pushed at Back".format(cmd[1]))
	elif cmd[0] == 'popF':
		key = L.popFront()
		if key == None:
			print("* list is empty")
		else:
			print("- {0} is popped from Front".format(key))
	elif cmd[0] == 'popB':
		key = L.popBack()
		if key == None:
			print("* list is empty")
		else:
			print("- {0} is popped from Back".format(key))
	elif cmd[0] == 'search':
		v = L.search(int(cmd[1]))
		if v == None: print("* {0} is not found!".format(cmd[1]))
		else: print("* {0} is found!".format(cmd[1]))
	elif cmd[0] == 'insertA':
		# inserta key_x key : key의 새 노드를 key_x를 갖는 노드 뒤에 삽입
		x = L.search(int(cmd[1]))
		if x == None: print("* target node of key {0} doesn't exit".format(cmd[1]))
		else:
			L.insertAfter(x, int(cmd[2]))
			print("+ {0} is inserted After {1}".format(cmd[2], cmd[1]))
	elif cmd[0] == 'insertB':
		# inserta key_x key : key의 새 노드를 key_x를 갖는 노드 앞에 삽입
		x = L.search(int(cmd[1]))
		if x == None: print("* target node of key {0} doesn't exit".format(cmd[1]))
		else:
			L.insertBefore(x, int(cmd[2]))
			print("+ {0} is inserted Before {1}".format(cmd[2], cmd[1]))
	elif cmd[0] == 'delete':
		x = L.search(int(cmd[1]))
		if x == None:
			print("- {0} is not found, so nothing happens".format(cmd[1]))
		else:
			L.deleteNode(x)
			print("- {0} is deleted".format(cmd[1]))
	elif cmd[0] == "first":
		print("* {0} is the value at the front".format(L.first()))
	elif cmd[0] == "last":
		print("* {0} is the value at the back".format(L.last()))
	elif cmd[0] == "findMax":
		m = L.findMax()
		if m == None:
			print("Empty list!")
		else:
			print("Max key is", m)
	elif cmd[0] == "deleteMax":
		m = L.deleteMax()
		if m == None:
			print("Empty list!")
		else:
			print("Max key", m, "is deleted.")
	elif cmd[0] == 'sort':
		L = L.sort()
		L.printList()
	elif cmd[0] == 'print':
		L.printList()
	elif cmd[0] == 'exit':
		break
	else:
		print("* not allowed command. enter a proper command!")

```
