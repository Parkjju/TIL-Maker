---
layout: post
navigation: True
title: Union find 자료구조
class: post-template
subclass: "post tag-python"
author: parkjju
---

- 집합(set)에 대한 연산을 효율적으로 제공하기 위해 만들어진 자료구조
- S = {...} 원소들이 중복되면 안됨

- 제공연산들
  1. membership 연산 : 2라는 원소가 S에 속하는 원소인가
  2. 기본적으로 집합과 관련된 연산들 - 합집합(Union) 교집합(intersection) 차집합(difference) 등
- 모든 연산을 제공하지 않고, membership과 union 중점으로 수업 진행
  1. make_set(x) : {x} -> O(1)
  2. find(x) : membership function. x가 속한 집합을 리턴 (각 집합을 대표하는 값을 정의할 것임) -> O(logn)
  3. union(x-key,y-key) -> 합집합해줌 -> O(logn)
- python - set자료구조

```python
a = set() # a = {} 공집합
b = {3,5,1,3} # b = {3,5,1} - 중복 key값들은 제거
```

- 구현 1 -> 원형 양방향리스트 기반으로 union자료구조 구현

  1. make_set(x) -> 더미노드를 붙여서 집합을 형성 : O(n)
  2. find(x) -> 연결리스트 순회하며 x를 찾음. 더미노드가 해당 집합의 id : O(n)
  3. union(x,y)
     - v = find(x) -> O(n)
     - w = find(y) -> O(n)
     - if v!=w: join(v, w)

- 구현 2 -> 트리로 union-find자료구조 구현

  - 일반적인 트리가 아님. 각 노드를 가리키는 링크가 child -> parent로의 방향밖에 없음 (자식이 이진으로 형성될 필요도 x)
  - 자기자신을 가리키게 될 때 id가 됨 (root노드)
  - make_set(x) -> x가 자기자신을 가리키는 노드로 트리 형성
  - find(x) -> x노드에서 부모 노드까지 가서 root를 반환 : O(h) - h를 줄이기
  - union(x,y)
    1. v = find(x)
    2. w = find(y)
    3. `if v!=w: w.parent = v` -> 두개의 트리를 하나의 트리로 : v또는 w중 하나의 root노드가 다른 하나의 root노드를 가리키도록 함
  - union시 누가 부모 노드가 될 지는 rank라는 값에 따라 결정

- 구현2의 rank
  - union 되었을 때 height이 작게 트리가 형성되면 수행시간에 좋음
  - 작은 height 가진 트리가 큰 height 가진 트리에 연결되도록 구현
  - 결합된 이후에도 전체 height이 변하지 않게됨 (높이가 같은 트리를 연결할 시에는 높이가 1 증가)
  - union-find 자료구조에서는 관례적으로 height을 rank로 표현!

```python
#pseudo
if v.height > w.height:
    w.parent = v
elif v.height < w.height:
    v.parent = w
else: # 높이가 동일
    # 둘중 아무거나 골라서 연결
```

- 전체적인 pseudo code 정의

```python
# pseudo code
class Node:
    def __init__(self,key):
        self.key = key
        self.parent = self
        self.rank = 0

def makeset(x):
    return Node(x)

def find(x): # x의 루트노드 리턴
    while x.parent != x: # x is not root
        x = x.parent
    return x

def union(x, y):
    v, w = find(x), find(y)
    if v.rank > w.rank:
        v, w = w, v # rank가 작은 쪽에서 rank가 큰 쪽으로 트리를 연결, swap의 필요성?
    v.parent = w
    if v.rank==w.rank:
        w.rank+=1
```

- h = O() 구하기
  1. Nh = 높이 h인 트리의 최소 노드 갯수
  2. N0 = 1
  3. N1 = 2
  4. N2 = 4
  5. Nh = 2\*N(h-1) = 2^h\*N0 = 2^h
  6. n >= Nh = 2^h
  7. h = O(logn)
