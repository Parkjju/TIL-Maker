---
layout: post
navigation: True
title: dict 루핑 기술과 컴프리헨션
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 딕셔너리 루핑 테크닉

- 딕셔너리를 대상으로 하는 보편적인 for 루프 구성

```python
>>> d = dict(a=1, b=2, c=3)
>>> for k in d: # k 에는 키가 담긴다.
        print(d[k],end = ", ")
1, 2, 3,
```

- 딕셔너리의 세 가지 메소드를 알아두면 딕셔너리를 대상으로 다양한 for 루프를 구성할 수 있다.

  1. dict.keys() 딕셔너리의 키들만 참고하고자 할 때
  2. dict.values() 딕셔너리의 값들만 참고하고자 할 때
  3. dict.items() 딕셔너리의 키와 값을 튜플 형태로 참고하고자 할 때

- 위의 세 메소드가 반환하는 것을 가리켜 **'뷰(view)'** 객체라 한다.

- 뷰 객체도 iterable 객체이므로 for 루프를 통해 그 값을 하나씩 참조할 수 있다.

```python
>>> d = dict(a=1, b=2, c=3)
>>> for k in d.keys():      # keys는 뷰 객체 반환함. 뷰 객체 이용한 for 루프
        print(k, end=", ") # d.keys() 를 d.values()로 바꾸면 키가 아닌 값을 참조한 뷰 객체를 반환하겠지요?
a, b, c,
```

```python
>>> d = dict(a=1,b=2, c=3)
>>> for k in d.items(): # (키, 값)에 대해 튜플 형태로 참조
        print(k, end=", ")
('a',1), ('b',2), ('c',3),
```

- items 메소드를 이용하면서 튜플 언패킹 또한 진행할 수 있다.

```python
>>> d = dict(a=1, b=2, c=3)
>>> for v, k in d.items(): # 튜플 언패킹
        print(v, k, sep=", ")
a, 1
b, 2
c, 3
```

### 뷰가 바라보는 현재 상태

- 뷰 객체는 단순 키 또는 값 (튜플형태도 .. ) 을 얻어오는 데 사용될 뿐만 아니라 **현재 딕셔너리의 상태를 그대로 반영** 한다는 특징이 있다.

```python
>>> d = dict(a=1, b=2, c=3)
>>> vo = d.items() # 뷰 객체 생성
>>> for kv in vo:
        print(kv, end=' ')
('a',1) ('b',2) ('c',3)
>>>
>>> d['a'] += 3 # 딕셔너리 수정
>>> for kv in vo: # 수정사항이 딕셔너리에 그대로 반영
        print(kv, end=' ')
('a', 4) ('b', 2) ('c', 3)
```

- **한번 생성된 뷰 객체는 딕셔너리의 현재 상태를 반영한다**

### dict 컴프리헨션

- 리스트 컴프리헨션과 동일하게 딕셔너리도 컴프리헨션 기법을 쓸 수 있다.

```python
>>> d1 = dict(a=1, b=2, c=3)
>>> d2 = {k : v*2 for k, v in d1.items()} # d1 의 값을 2배 늘린 딕셔너리 생성
```

- 물론 딕셔너리 컴프리헨션은 if문도 추가 가능하다.

```python
>>> d1 = dict(a=1, b=2, c=3)
>>> d2 = {k : v for k,v in d1.items() if v%2} # d1 값중 홀수인 것만 모은 딕셔너리를 생성
```

- 굳이 해석해보자면

  1. for k,v의 k, v에 d1.items 키와 값을 넣고
  2. if문 내의 조건이 True인지 검사하여
  3. True이면 k : v를 딕셔너리에 추가한다.

- 딕셔너리 컴프리헨션 + zip 함수 예제

```python
>>> ks = ['a','b','c']
>>> vs = [1,2,3]
>>> d = {k:v for k,v in zip(ks,vs)} # zip을 이용하여 같은 위치의 값들을 묶음
```
