---
layout: post
navigation: True
title: 자료형 분류와 set, frozenset
class: post-template
subclass: "post tag-python"
author: parkjju
---

# 자료형 분류와 set & frozenset

### 자료형 분류

- 파이썬이 제공하는 다음과 같은 자료형들을 가리켜 '시퀀스 타입(sequence type)'이라 한다. 문자열의 경우 '텍스트 시퀀스 타입(text sequence type)'이라 부르지만 이 역시 시퀀스 타입의 일종

  - 리스트 list 클래스의 객체
  - 튜플 tuple 클래스의 객체
  - 레인지 range 클래스의 객체
  - 문자열 str 클래스의 객체

- **저장된 값의 순서 정보가 존재하는 것이 시퀀스 타입의 가장 큰 특징이다**

- 따라서 이들에게 순서 정보를 기반으로 진행하는 연산 두 가지가 가능하다

  - 인덱싱 연산 특정 값 하나를 참조하는 연산 ) s[0] s[1] s[2] ...

  - 슬라이싱 연산 시작과 끝을 정하여 이를 참조하는 연산 ) s[0:3] s[5:8] ...

- 다음 자료형에 대해서는 '매핑 타입(mapping type)' 이라고 한다.

  - 딕셔너리 dict 클래스의 객체

- 매핑 타입은 본질적으로 **저장된 값의 순서 또는 위치 정보를 기록하지 않는 자료형이다.**

- 따라서 매핑 타입을 대상으로는 인덱싱이나 슬라이싱 연산이 불가능하다.

- 다음 두 자료형을 가리켜 '셋 타입(set type)' 이라고 한다.

  - 셋(set) set 클래스의 객체

  - 프로즌셋 frozenset 클래스의 객체

- 셋 타입은 **수학의 집합을 표현한 자료형이다.**

  - "수학의 집합은 저장 순서를 유지하지 않는다."

  - "수학의 집합은 중복된 값의 저장을 허용하지 않는다."

- 따라서 두 자료형에 대해서도 저장된 값의 순서 정보가 존재하지 않고, 중복된 값의 저장도 허용하지 않는다.

### set, frozenset

- 두 집합을 대상으로 하는 수학의 기본 연산들

  - 합집합 두 집합의 모든 원소들을 합한 집합

  - 차집합 한 집합에서 다른 한 집합이 갖는 원소들을 뺀 집합

  - 교집합 두 집합에 공통으로 존재하는 원소들의 집합

  - 대칭 차집합 두 집합의 합집합에서 교집합을 뺀 집합

- set객체 기반 연산의 예시를 살펴보자

```python
>>> A = {'a', 'c', 'd', 'f'} # 집합 A, 이것이 셋을 생성하는 기본 방법
>>> B = {'a', 'b', 'd', 'e'} # 집합 B
>>> A-B # 차집합
{'c', 'f'}
>>> A & B # 교집합
{'d','a'}
>>> A|B # 합집합
{'e','f','d','a','b','c'}
>>> A^B # 대칭 차집합
{'e','f','b','c'}
```

- 위의 예에서는 연산 결과로 새로운 set이 생성되고, 그 생성된 set의 값이 출력된 것

- 이들 set을 대상으로 in, not in 연산이 가능하고 set 객체역시 iterable 객체이므로 for 루프 구성도 가능

```python
>>> A = set(['a','b','c','d']) # set함수에 iterable객체 전달하여 set 생성
>>> B = set('dcba') # 문자열도 iterable 객체이므로 이를 통해 set 생성 가능
>>> A==B
True # 저장순서 상관 X
```

- set은 딕셔너리와 마찬가지로 {} 에 값을 담음.

- 빈 set을 생성하기

```python
>>> s = set() # 빈 셋
>>> type(s)
<class 'set'>
```

- 위의 set에 대한 모든 설명이 frozenset을 대상으로도 동일하게 적용된다.

- 리스트 내의 중복된 값들 모두 지우는 예제)

```python
>>> t = [3,3,3,7,7,'z','z']
>>> t = list(set(t)) # t를 가지고 set을 구성, 그 결과를 list로 재구성
>>> t
[3,'z',7]
```

### set 변경가능, frozenset 변경 불가능

- set과 frozenset은 다 똑같지만 한 가지 차이점이 있다.

  - set mutable 객체

  - frozenset immutable 객체

- 기존에 존재하던 객체의 값을 수정하는 연산 or 메소드 호출은 set을 대상으로만 가능

  - add 원소 추가하기

  - discard 원소 삭제하기

  - update,|= 다른 집합의 원소 전부 추가하기

  - intersection_update,&= 다른 집합과 공통으로 있는 원소만 남기기

  - difference_update,-= 다른 집합이 갖는 원소 모두 삭제하기

  - symmetric_difference_update,^= 공통으로 갖지 않는 것들은 추가하고 나머지는 삭제

```python
>>> os = {1,2,3,4,5}
>>> os.add(6)
>>> os.discard(1)
>>> os
{2,3,4,5,6}
>>> os.update({7,8,9})
>>> os
{2,3,4,5,6,7,8,9}
>>> os &= {2,4,6,8} #intersection_update
>>> os
{8,2,4,6}
>>> os -= {2,4} # difference_update
{6,8}
>>> os ^= {1,3,6} # symmetric_difference_update
>>> os
{1,3,8}
```

### set 컴프리헨션

- 리스트와 딕셔너리를 대상으로 한 컴프리헨션이 set에 대해서도 가능하다.

```python
>>> s1 = {x for x in range(1,11)}
>>> s1
{1,2,3,4,5,6,7,8,9,10}
>>> s2 = {x**2 for x in s1}
>>> s3 = {x for x in s2 if x<50}
```
