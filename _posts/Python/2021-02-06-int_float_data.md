---
layout: post
navigation: True
title: int형 데이터와 float형 데이터
class: post-template
subclass: "post tag-python"
author: parkjju
---

### type함수

```python
>>> type(3)
<class 'int'>

>>> type(1.1)
<class 'float'>

>>> type(1.0)
<class 'float'>

#type함수에 전달된 값의 종류가 무엇인지 알려준다
```

### int형으로 변환, float형으로 변환

```python
>>> num=10
>>> num=float(num)
>>> print(num)
10.0

>>> type(num)
<class 'float'>

# int->float로의 변환, 반대의 경우는 <class 'int'>로 나타남
```

- eval함수는 사용자가 원치 않는 경우에도 함수를 임의로 호출하여 보안성에 문제를 일으킬 수 있다고 하였다.

- 따라서 input 함수를 통해 입력받는 값을 적절히 변환시키기 위해서는 eval보다는 int나 float를 통해 형 변환을 진행하는 것이 바람직하다.

```python
>>> height =eval(input("키 정보 입력 : "))     #eval 함수로 변환
키 정보 입력 : 198.3
>>> print(height)
198.3


>>> height = float(input("키 정보 입력 : ")) #float 함수로 변환
키 정보 입력 : 198.3
>>> print(height)
198.3
```

### 복합 대입 연산자

```python
>>> num=1
>>> num = num+1
>>> print(num)
2

>>> num+=1  # num = num+1과 같은 연산
>>> print(num)
3
```

- 덧셈 뿐만 아니라 다른 연산자들에게도 복합 대입 연산자를 적용할 수 있다.

### 소괄호

```python
>>> print(3+4/2)
5.0

>>> print((3+4)/2)
3.5

# 소괄호를 포함한 연산은 수학에서 일반적으로 사용하는 의미와 같다
```
