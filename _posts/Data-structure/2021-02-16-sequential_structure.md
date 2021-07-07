---
layout: post
navigation: True
title: 순차적 자료구조
class: post-template
subclass: "post tag-python"
author: parkjju
---

### Array(배열), List(리스트)

- 데이터를 **연속적인 메모리 공간** 에 저장하고, 저장된 곳의 **주소(address, reference)** 를 통해 매우 빠른 시간에 접근할 수 있는 가장 많이 쓰이는 자료구조

  - C에서의 배열 -> 배열의 시작 주소, 저장된 값의 종류(바이트 개수), 몇 번째에 저장되어 있는지 나타내는 인덱스(index) 세 정보만으로 값이 저장된 곳의 주소 계산 가능!

    - C의 배열은 읽기/쓰기 연산만 제공하는 제한된 자료구조

  - Python에서의 list A (또는 tuple A)

    - C언어 배열의 셀에는 실제 값(데이터)이 저장된 형식이지만, **Python 리스트의 셀에는 데이터가 아닌 데이터가 저장된 곳의 주소(address 또는 reference)** 가 저장된다.

    - 각 셀에서 데이터를 가리키고 있는 형태이며, 새로운 객체 생성 후 그 객체에 대해 접근 시 가리키던 객체는 그대로 두고 새로운 객체를 가리키게 되는 것.

    - **리스트는 동적 배열이다**

      - C언어의 배열과의 또 다른 중요한 차이점은 list의 크기(셀의 개수)가 필요에 따라 자동으로 증가, 감소한다는 것.

      - append 또는 insert연산을 위한 공간이 부족하면 더 큰 메모리를 할당받아 **새로운 리스트를 만들고** 이전 리스트의 값을 **모두 이동한다.**

      - 반대로 pop연산을 하면서 실제 저장된 값의 개수가 리스트 크기에 비해 충분히 작다면 **더 작은 크기의 리스트를 만들고** **모두 이동한다.**

      - 위와 같이 필요에 따라 크기가 변하는 배열을 **동적 배열(dynamic array)** 라 부른다. -> 파이썬 사용자는 배열의 크기를 전혀 신경쓰지 않아도 됨!

      - 동적배열인 list를 위해서는 python내부적으로 현재 list의 크기 (capacity)와 list에 저장된 실제 값의 개수(n)를 항상 알고 있어야함. -> 해당 추가 정보를 위한 메모리가 필요하므로 빈 리스트 A는 0바이트보다 클 수 밖에 없다

```python
>>>import sys
>>> A = []
>>> sys.getsizeof(A) # 빈 리스트가 0바이트보다 큰 이유
64
>>>A.append("Python")
>>>sys.getsizeof(A)
96
```

#### 수행 시간

1. 인덱싱 연산 -> 값을 읽음 + 값을 쓰기 (읽/쓰 O(1))

2. append -> 평균적으로 O(1)

3. pop -> 평균적으로 O(1)

4. pop(index_value) -> pop(0) 이 worst case로, O(len(A))시간

5. insert -> 최악의 경우가 insert(0, value), 즉 삽입하는 인덱스값이 0일때 이므로 O(len(A))

6. remove -> worst O(n)

7. index, count -> O(len(A))

### Stack : LIFO, Queue = FIFO, DQueue; Stack + Queue

- Stack -> Last In First Out 규칙

- Queue -> First In First Out 규칙

- DQueue -> Stack과 Queue 모두 지원

#### Stack

- 데이터는 리스트에 저장(append, pop함수 이용)

- push, pop, top, isEmpty, size(Len)함수 내장된 자료구조

- 클래스 Stack 선언

```python
class Stack:
    def __init__(self): #생성함수 -> python초급편 클래스 단원 참조
        self.items=[] #데이터 저장을 위한 리스트

    def push(self,val):
        self.items.append(val)

    def pop(self):
        try:
            self.items.pop()
        except IndexError: #예외처리
            print("Stack is Empty") # pop할 아이템 X

    def top(self):
        try:
            return self.items[-1]
        except IndexError:
            print("Stack is Empty")

    def __len__(self): #스페셜 메소드로써, 함수 호출을 len(Stack_list)로 할 수 있게 해줌
    # len에 관련한 정보는 리스트에서 이미 관리하고 있기 때문
        return len(self.items)

    def isEmpty(self):
        return len(self)==0 # True, False반환

```

- 스택 사용 예시1) 괄호맞추기

```python
from Stack_python import Stack #스택 정의 후 메소드 import

def parChecker(parSeq): # 괄호 맞추기 함수
    S = Stack()
    for p in parSeq:
        if p=="(":
            S.push(p)
        elif p==")":
            if S.isEmpty():
                return False
            else:
                S.pop()
        else:
            print("Not allowed Symbol")

    if S.isEmpty():
        return True
    else:
        return False

# 여는 괄호를 계속해서 스택에 저장
# 닫는 괄호를 만나면 스택에서 여는 괄호를 추출하여 짝을 맞춰 소멸시켜준다
# 모든 작업, 즉 괄호로 주어진 수식에 대해 전체 루프를 끝마치고 나왔을 때 스택에 괄호가 남아있다면 짝이 맞춰지지 않았으므로 False를 반환


def parChecker2(parSeq): # 중괄호, 대괄호 추가
    S = Stack()
    for p in parSeq:
        if p == "(" or p == "[" or p=="{":
            S.push(p)
        elif p==")":
            if S.top()!="(":
                return False
            else:
                if S.isEmpty():
                    return False
                S.pop()
        elif p=="]":
            if S.top()!="[":
                return False
            else:
                if S.isEmpty():
                    return False
                S.pop()
        elif p=="}":
            if S.top()!="{":
                return False
            else:
                if S.isEmpty():
                    return False
                S.pop()
        else:
            print("Not allowed symbol")



    if S.isEmpty():
        return True
    else:
        return False

# 위의 소괄호 맞추기 방식과 전체적으로 동일
# 스택에 계속해서 저장하다가 닫는 괄호를 만났을 경우
# 닫는 괄호가 소,중,대괄호였다면 스택의 가장 위쪽에 있는 괄호 또한 소,중,대괄호로 똑같은 종류여야만 한다.
```

- 스택 사용 예시 2) infix를 Prefix로 변환

  1. 한 자리수 피연산자를 만나면 Prefix 변환 리스트 공간에 둔다
  2. 두 자리수 피연산자를 만나는 것을 check -> loop변수를 통해 함수에 전달되는 문자열의 이전 원소 또한 숫자임을 if로 확인 -> exp[loop-1].isdigit()
  3. 소수점 피연산자 만나는 것을 check -> 소수점 확인 후 이전에 Prefix변환 공간에 전달되었던 피연산자 숫자를 소수점과 결합한 상태로 변환 + 2차원 리스트 접근 방식을 통해 **가장 최근 리스트의 원소 - 문자열** 의 **가장 마지막 글자인 소수점.** 의 형태를 지니고 있다면 숫자 추가한 상태로 변환하여 prefix변환 공간에 전달. ->> 코드 확인 요망!
  4. 변환된 Prefix수식을 계산 함수에 전달
  5. 숫자를 스택에 쌓고 피연산자를 만날때마다 두 개씩 pop하여 연산자에 맞게 float변환 후 계산, 다시 push
  6. 최종 push된 하나의 마지막 원소가 바로 계산된 값

```python
from Stack_python import Stack #스택 메소드 import

def InfixToPrefix(exp): # infix를 prefix로 변환
    opstack = Stack() # 연산자operator를 담을 공간
    outstack = [] # 변환된 수식을 담을 공간
    loop=0 # 실수에 대한 연산이므로, 소수점이나 두자리수 이상 되는 피연산자에 대하여 접근하기 위한 방법 고안
    exp = exp.replace(" ","") # 연산자와 피연산자 사이에 공백 존재 가능성 배제

    for tok in exp:
        if tok == "*" or tok =="/":
            if opstack.top()=="^":
                oustack.append(opstack.pop())
                opstack.push(tok)
            opstack.push(tok)
            loop+=1
        elif tok == "^":
            opstack.push(tok)
            loop+=1
        elif tok == "+" or tok =="-":
            if opstack.top() == "*" or opstack.top()=="/" or opstack.top()=="^":
                outstack.append(opstack.pop())
                opstack.push(tok)
                loop+=1
            else:
                opstack.push(tok)
                loop+=1
        elif tok == "(":
            opstack.push(tok)
            loop+=1
        elif tok == ")":
            while opstack.top()!="(":
                outstack.append(opstack.pop())
            opstack.pop()
            loop+=1
        else:
            if outstack==[]: # loop를 통해 이전 토큰이 숫자였다면 두자리수 이상임을 확
                outstack.append(tok)
                loop+=1
            else:
                if exp[loop-1].isdigit():
                    newstr = outstack[-1]+tok
                    outstack[-1]=newstr
                    loop+=1
                elif tok=="." or outstack[-1][-1] ==".":
                    newstr = outstack[-1]+tok
                    outstack[-1]=newstr
                    loop+=1
                else:
                    outstack.append(tok)
                    loop+=1



    while not opstack.isEmpty():
        outstack.append(opstack.pop())

    return outstack


def Calculator(exp): # if token in '*+/-':
    S = Stack()
    for tok in exp:
        if tok in "*/-+^":
            a=float(S.pop())
            b=float(S.pop())
            if tok=="-":
                S.push(b-a)
            elif tok=="+":
                S.push(b+a)
            elif tok=="*":
                S.push(b*a)
            elif tok == "^":
                S.push(b**a)
            else:
                S.push(b/a)
        else:
            S.push(tok)
    return S.top()


```

### Queue

- Queue 자료구조의 연산
  - enqueue(val) -> val을 큐의 rear에 삽입
  - dequeue() -> 가장 앞쪽에 저장된 값을 삭제 및 리턴
  - front() -> 가장 앞쪽에 저장된 값을 (삭제하지 않고) 리턴

```python
class Queue:
    def __init__(self):
        self.items=[] # 데이터 저장 공간
        self.front_index=0 # 가장 앞 원소의 위치 초기화

    def enqueue(self,val):
        self.items.append(val) # rear에 데이터 저장

    def dequeue(self):
        if self.front_index==len(self.items): #Queue 자료구조에서 dqueue연산은 실제 데이터를 삭제하는 것이 아니라 front 인덱스의 이동을 통해 값을 무시하는 것이다.따라서 enqueue로 데이터의 추가 없이 계속된 dequeue를 진행하면 front값이 Queue 공간의 길이값까지 움직이게 된다
            print("Queue is empty")
            return None # dequeue할 아이템이 없음
        else:
            result_value = self.items[self.front_index] # dequeue대상 값 반환하기 위해 저장
            self.front_index+=1 # dequeue진행 후 front위치 이동
            return result_value
```

- Queue사용 예) Josephus게임
  - Josephus게임은 주어지는 조건으로 게임에 참여하는 인원의 수, 탈락의 기준인 간격 k 두 가지가 있다.
  - 예를 들어 6명이 게임에 참여하고, k=2로 주어졌다면 1부터 시작하여 6까지 두 번째 사람이 탈락.
  - 1로부터 2번째인 2탈락 -> 3으로부터 2번째인 4 탈락 ......
  - dequeue하여 다시 그 값을 enqueue하는 과정을 k-1 번 반복하고
    해당 과정을 진행한 뒤에 dequeue를 진행한다. (k번째 기준에 해당하는 사람 탈락!)

```python
from Queue_python import Queue


def Josephus(loop, n):
    Q = Queue()
    for i in range(1,n+1):
        Q.enqueue(i)

    while Q.front_index!=len(Q.items): # Queue공간이 빌 때까지 게임 진행
        for i in range(loop-1):
            Q.enqueue(Q.dequeue())
        result = Q.dequeue()

    return result #Queue 공간을 비워내는 차례의 dequeue값을 저장한 상태의 result
```

### Deque 덱

- python에서는 collection모듈에 deque클래스로 덱이 이미 구현되어 있음!

- rear push -> append, front push -> appendleft

- rear pop -> pop, front pop -> popleft

- Deque 사용 예1) Palindrome검사
  - Palindrome은 왼쪽부터 읽어도, 오른쪽부터 읽어도 같은 문자열을 말함.
    - 기러기, radar,madam
  - Palindrome checking은 세 방법이 있음
    1. reversed함수 이용
    ```python
    s == ''.join(reversed(s))
    ```
    2. i=0, j=n-1부터 진행하여 i==j이거나 i>j일때까지 s[i]==s[j]검사
    3. deque 이용!
       - deque에 저장 후 popleft, pop이용하여 같은지 검사

# 순차적 자료구조 - 연결 리스트 (Linked List) - 한방향 vs 양방향

### 연결 리스트의 개념

- 연결리스트는 파이썬의 list와는 다른 개념이다. -> 연속적인 메모리의 할당이 아니라, 다음 값이 저장되어 있는 주소가 필요함

- 저장할 data값을 key, 값이 저장된 곳의 주소를 link라고 한다.

- 이 둘을 합친 것을 **node라고 한다.** (클래스)

### 한 방향 연결리스트 (singly linked list)

- 가장 앞의 노드를 **head 노드라고 한다.** -> head 노드를 통해 리스트의 노드를 접근.
- 가장 마지막 노드는 **해당 노드의 next가 None을 가리킨다.**

- head로부터 link를 따라가며 데이터를 참조하므로, **노드 위치에 따른 값 참조의 수행 시간이 늘어난다.** -> 파이썬의 리스트와는 다르게, 값 참조의 수행시간이 상수 시간이 아니다.

- 값을 중간에 끼워넣는 연산을 진행하는 경우 insert

  1. 파이썬 리스트 -> 최악의 경우 O(n)
  2. 연결리스트 -> 노드의 link만 만져주면 됨 (상수시간)

- Node 클래스

```python
class Node:
    def __init__(self, key=none, value=None): # parameter 전달되지 않았을 시 default 모두 None으로 초기화
        self.key = key
        self.value = value
        self.next = None

    def __str__(self):
        return str(self.key) # key를 문자열 반환하는 스페셜메소드
```

- 한방향 연결 리스트 클래스
- (제너레이터 함수)[https://github.com/Parkjju/TIL/blob/master/Python/middle_class/generator.md]

```python
class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def __iter__(self):
        v = self.head
        while v!=None:
            yield v
            v = v.next

    def __str__(self):
        return " -> ".join(str(v) for v in self)

    def __len__(self):
        return self.size
```

- iter 스페셜메소드에 작동방식에 대한 이해 (@@@@중요@@@@ - 천천히 읽어보기)

  1. v를 head노드로 초기화한다.
  2. v가 None인지 여부를 검사하여 while로 진입한다 (처음에 head로 초기화 하였으니, head가 None인지 검사할 것)
  3. v를 yield하며 함수를 마친다.
  4. 현재 바깥에서는 singly linked List 객체를 생성하여 iterator로서의 역할을 지시하고 있는 상황 (while루프 전달을 통해 연속적인 값의 참조를 진행)
  5. 바깥의 while 루프 조건을 다시금 만족하여, iterator객체의 다음 값으로의 참조 (singly linked list객체)가 지시됨
  6. 이전 yield문 다음 부터, 그 다음 yield문을 만날 때까지의 문장을 실행하므로 이번에 실행될 문장은 v=v.next이다.
  7. v에 next를 저장하였고, 그 다음 iter스페셜 메소드로 돌아가 while 루프 조건 검사를 진행한다.
  8. next가 저장된 v가 none이면 탈출, 아니면 다시금 해당 v를 yield한다.

* str 스페셜 메소드 작동방식은 직접 SinglyLinkedList객체를 생성하고, 다음의 예제를 실행해보면 이해하게 된다.
* (pushBack, pushFront 등 데이터 생성까지 완료한 상황에서 다음의 예제를 실행)

```python
slist = SinglyLinkedList()
print(str(slist))
```

- 작동 방식에 대한 이해를 정리하자면

  1. join 컴프리헨션에 전달되는 for 문은 iter 스페셜 메소드의 generator 함수 호출을 진행한다.
  2. 계속해서 yield하며 v로 각 node의 정보들이 전달된다.
  3. 이를 str(v)를 통해 string으로 변환하고
  4. join을 통해 표시할 노드 데이터들 사이사이에 -> 화살표 표시를 넣는다.

#### 한방향 리스트에 구현되어야 할 각종 함수들

1. L.pushFront(key) : key값을 갖는 새 노드를 L객체 가장 앞에 삽입 **L 객체 head의 변경**
2. L.pushBack(key) : key값을 갖는 새 노드를 L객체 가장 뒤에 삽입 **함수 내에 tail 선언, 이를 통해 노드를 붙인다.**
3. L.popFront() : L 객체의 head 노드를 삭제한 후 key 값을 리턴
4. L.popBack() : L 객체의 가장 마지막 노드를 삭제한 후 key값 리턴
5. L.search(key) : key값을 갖는 노드를 찾아 리턴
6. L.remove(v) : L 객체에서 v 노드를 삭제

- 함수들을 정의할 때에, 한방향 연결리스트 객체의 길이가 0인지 아닌 지에 대한 확인이 필요한 경우가 많으니 **주의**

### 양방향 연결 리스트(doubly linked list)

- 한방향 연결 리스트의 **결정적인 단점**은 다음 노드에 대한 링크(next)만 있어서, 이전 노드를 알기 위해서는 head 노드부터 차례로 탐색을 진행해야 한다.

- 이를 보완하기 양방향 연결 리스트를 설계한다.

  1. 이전 노드로의 링크 (prev)를 통해 왼쪽 이동
  2. 마지막 노드와 head노드를 연결하여 원형 리스트를 가정
  3. head노드는 **항상 dummy 노드가 되도록 하자**

- dummy 노드란? 리스트 처음을 구분할 수 있는 **"marker"**의 기능

- 노드 클래스

```python
class Node:
    def __init__(self, key=None):
        self.key=key
        self.next = self.prev = self # 자기 자신으로 향하는 링크, 첫 객체 생성 시 이러한 형태로 초기화 -> 그림그려보기

    def __str__(self):
        return str(self.key)
```

- 양방향(원형) 연결 리스트

```python
class DoublyLinkedList:
    def __init__(self):
        self.head = Node()
        self.size = 0

    def __iter__(self):
        pass

    def __str__(self):
        pass

    def __len__(self):
        pass

    # 각 함수들 직접 작성해보기.
```

###### 중요 - splice(a,b,x)연산 - 다른 연산에 이용되는 중요한 기본연산

- 노드 a부터 노드 b까지 떼어내(cut) -> 노드 x 뒤에 붙여넣는 연산 (cut-and-paste)

  1. 조건1 - a와 b가 동일하거나 b가 a뒤에 나타나야함
  2. 조건2 - head노드와 x는 a와 b사이에 포함되면 안됨.

```python
def splice(self, a,b,x):
    if a==None or b==None or x==None:
        return

    ap = a.prev # ap is previous node of a
    bn = b.next # bn is next node of b

    # cut [a..b]
    ap.next = bn
    bn.prev = ap

    # insert [a..b] after x
    xn = x.next # xn is next node of x
    xn.prev = b
    b.next = xn
    a.prev = x
    x.next = a
    # 떼어낸 [a..b]를 a는 x에, b는 xn에 연결하는 과정
```

<!-- Todo 추후 수업 및 과제에서 직접 구현한 것들 이곳에 정리하기 -->

- 각종 연산들. (직접 구현해보기 - 추후 수업 과정에서 구현한 것들 정리)

1. 탐색 및 기본 연산들
   - search(key) : key 가지는 노드 값 리턴. 없으면 None
   - isEmpty() : 빈 리스트면 True, 아니면 False
   - first(), last() : 처음, 마지막 노드를 리턴
2. 이동 및 삽입연산
   - moveAfter(a,x) : 노드 a를 x뒤로
   - moveBefore(a,x): 노드 a를 x이전으로
   - insertAfter(x, key) : 노드 x 뒤에 데이터가 key인 새 노드 생성하여 삽입
   - insertBefore(x, key) : 노드 x 앞에
   - pushFront(key) : 데이터가 key인 새 노드 생성, head 다음에 삽입
   - pushBack(key) : 데이터가 key인 새 노드 생성, head 이전에 삽입
3. 삭제 연산

   - remove(self, x) : 빈 리스트 체크 후 삭제 (자료45p 참조)
   - popFront(self) : head 다음에 있는 노드 데이터 값 리턴 - 빈 리스트면 None리턴

   * popBack(self) : head 이전에 있는 노드...

4. 기타 연산
   - join(another_list) : self 뒤에 another_list 연결
   - split(x) : self를 노드 x 이전과 x 이후 노드들로 구성된 두 리스트로 분할
