---
layout: post
navigation: True
title: 프로그램 사용자로부터 값 입력받기 , 코드의 반복
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 프로그램 사용자로부터 입력받기

```python
#input함수로 str변수 선언과 동시에 값을 저장하고 있다.
>>> str = input("How old are you?: ")
How old are you?: 24

>>> print(str)
24
```

```python
>>> str1 = input("How old are you?: ")
How old are you?: 25

>>> str2 = input("How old are you?: ")
How old are you?: 13

>>> str1+str2
'2513' #??
```

- str1변수와 str2변수에 input함수를 이용하여 25와 13 값을 저장하였는데,
  덧셈을 진행해보았더니 두 값이 숫자로써 계산된 것이 아니라
  문자열이 합쳐지는 연산이 진행되었다.

* 이로부터 유추할 수 있는 것은

  **input 함수는 입력된 값을 문자열 하나로 묶어서 변수에 저장**한다는 것이다.

### 입력받은 내용을 숫자로 바꾸려면

```python
>>> year = input("This year: ")
This year: 2021

#eval()함수를 통해 year에 저장된 문자열을 계산 가능한 숫자로 변환한다.
>>> year = eval(year)
>>> year+=1
>>> print("Next year: ",year)
Next year:  2022
```

### 한 번에 두개 입력받기

```python
>>> a,b = input('문자열 두번 입력하세요').split()
```

### 강력하지만 위험할 수 있는 eval()함수

```python
>>> def val():
	return 1

>>> result = eval(input("프로그래머가 함수 호출을 명령하지 않아도 호출이 된다: "))
프로그래머가 함수 호출을 명령하지 않아도 호출이 된다: val()
>>> print(result)
1

```

- eval 함수를 사용하면 입력하는 문자열로 val()이 입력되었는데도
  파이썬이 임의로 분석하여 이미 정의되어있던 val()함수를 호출해버린다.

- 이는 **보안의 취약점으로 작용할 수 있기 때문에** 강력한 힘을 지닌 eval() 함수이지만 사용에 있어서는 신중해야한다.

### 코드의 반복

```python
>>> for i in [0,1,2]:
	print(i)


0
1
2
```

- 위의 코드에서 i는 루프 내의 변수이고, [0,1,2]는 반복 횟수에 대한 정보를 표현한다.
  가장 왼쪽의 원소부터 i에 대입하며 루프를 진행해 나간다.
  함수 정의에서와 마찬가지로 들여 쓰기로 루프의 범위를 지정한다.

### range함수 이용하여 반복문 작성하기

```python
#1부터 100까지 더하는 연산 진행

>>> sum = 0
>>> for i in range(1,101):
	sum+=i


>>> print(sum)
5050
```

- range(a,b)로 나타낸 반복 횟수 정보는 a 부터 b-1까지 변수 i에 값을 대입하며 반복을 진행하라는 뜻이다.

```python
>>> for i in range(3):
	print("A")


A
A
A
```

- 루프가 진행되는 동안 값의 대입이 필요 없는 위와 같은 경우에
  관례적으로 루프의 시작점을 0으로 설정하는 것이 일반적이기 때문에
  range(a,b)의 형식이 아닌 range(b)의 형식 또한 가능하다.
