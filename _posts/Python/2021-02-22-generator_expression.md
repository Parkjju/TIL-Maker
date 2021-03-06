---
layout: post
navigation: True
title: 제너레이터 표현식
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 하나의 문장으로 제너레이터를 구성하는 방법

- '제너레이터 표현식은 제너레이터 함수와 마찬가지로 제너레이터 객체를 생성하는 방법이다.'

- '제너레이터 표현식의 문법 구성이 리스트 컴프리헨션과 거의 똑같다.'

- iterable 객체를 통해 값을 출력하는 함수)

```python
>>> def show_all(s):
        for i in s:
            print(i, end=' ') # iterable 객체를 전달하면서 이 함수 호출
```

```python
>>> st = [2*i for i in range(1,10)] # 구구단 2단을 전부 저장한 리스트 생성
>>> show_all(st) # 위에서 정의한 show_all 호출
```

- 위의 식을 제너레이터 함수 기반으로 다시 작성

```python
>>> def times2(): # 제너레이터 함수의 정의
        for i in range(1,10):
            yield i*2

>>> g=times2() # 제너레이터 객체 생성
>>> show_all(g) # 제너레이터 객체도 iterable하기 때문에 for루프에 전달가능
```

- 제너레이터 기반 함수 정의하였을 때 장단점이 분명히 생긴다.

  1. 장점 : 메모리를 효율적으로 사용한다.

  2. 단점 : 함수를 추가적으로 제너레이터 기반하여 정의해야한다.

- 위에서의 단점을 커버하기위해 제너레이터 표현식을 이용!

```python
>>> g = (2*i for i in range(1,10)) # 표현식 기반 제너레이터 생성
>>> show_all(g) # 위에서 정의한 show_all 호출
```

- 제너레이터 표현식과 리스트 컴프리헨션 식을 비교

  - st = [2*i for i in range(1,10)] - 리스트 컴프리헨션

  - g = (2\*i for i in range(1,10)) - 제너레이터 표현식

- 제너레이터 표현식은 대괄호가 소괄호로 바뀐 것 이외에 리스트 컴프리헨션과 차이가 없다!

- 파이썬은 리스트 컴프리헨션과 표현이 비슷하다고 해서 **lazy evaluation** 규칙을 절대로 어기지 않는다!

### 제너레이터 표현식을 직접 전달하기

```python
>>> def show_all(s):
        for i in s:
            print(i, end=" ")

>>> show_all((2*i for i in range(1,10))) # 제너레이터 표현식을 직접 전달
>>> show_all(2*i for i in range(1,10)) # 제너레이터 표현식을 함수에 직접 전달할 때에는 소괄호 생략 가능하다.

```
