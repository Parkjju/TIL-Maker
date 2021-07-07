---
layout: post
navigation: True
title: 리스트와 문자열의 함수들
class: post-template
subclass: "post tag-python"
author: parkjju
---

```python
>>> st=[1,2,3]
>>> num=len(st)
>>> print(num)
3
```

- 지금까지 파이썬 함수를 호출하는 방식은 위와 같았다. </br></br>

- 해당 유형의 함수를 나열해보면, </br>
  len(st) => 리스트 길이 반환함수 </br>
  min(st) => 리스트 저장 값중 최소값 반환 </br> max(st) => 리스트 저장 값중 최대값</br> 등등 여러가지가 있다.</br>

---

- 위와같은 유형이 아닌 함수 호출 방법도 존재한다.

```python
>>> st = [1,2,3]
>>> st.remove(2) #list_name.remove(data) 형태로 remove 함수를 호출!
>>> print(st)
[1, 3]
```

- 반환과 값 저장 형태의 함수 호출이 아니라 </br> 점을 찍어 함수를 호출하고 있다. </br></br> 지금까지 리스트를 다루는 데에 있어서 우리가 그릴 수 있는 상상적 이미지를 그려보면</br>
  <img src="/assets/images/img.jpg" width="50%" height="50%" alt="img"/>

* 리스트는 데이터와 함수로 이루어진 객체이다.

---

- 리스트가 객체라는 것을 알았다. </br> 파이썬에서 객체의 함수를 호출하는 법을 알아보자 </br>

```python
>>> st = [1,2,3]
>>> st.remove(2) #st 리스트의 2라는 원소를 찾아 삭제.
>>> print(st) # 객체의 함수를 호출하기 위해 .(dot)을 사용하였다
[1, 3]
```

---

- 파이썬 리스트에 내장되어 있는 함수들을 몇 가지 알아보자.

```python
>>> st = [1,2,3]
>>> st.append(4) # append함수, 리스트 끝에 전달된 값을 추가한다.
>>> print(st)
[1, 2, 3, 4]

>>> str = "123"
>>> str.isalpha() # str이 문자인가?, 문자와 숫자가 섞여있으면 False반환
False

>>> str = "ABC"
>>> str.isdigit() # str이 숫자인가?
False


>>> st=[1,2,3]
>>> st.extend([4,5]) #extend함수, 리스트 끝에 전달된 리스트 내용 전체를 추가한다.
>>> print(st)
[1, 2, 3, 4, 5]

>>> st=[1,2,3]
>>> st.clear() #clear함수, 리스트 내용 전체 삭제하여 빈 리스트를 반환한다.
>>> print(st)
[]

>>> st = [1,2,3]
>>> st.insert(2,4) #insert(i,value)형식의 함수로, 리스트의 i번째에 value를 저장 또는 추가한다
>>> print(st)
[1, 2, 4, 3]

>>> st = [1,2,3]
>>> st.pop(1) #pop함수, 전달된 인덱스 위치의 리스트 값을 삭제 및 해당 값을 반환
2
>>> print(st)
[1, 3]

>>> st=[1,2,3,2]
>>> st.remove(2) #remove함수, 전달된 값이 가장 처음 나오는 인덱스의 값을 삭제
>>> print(st)
[1, 3, 2]

>>> st = [1,2,3,2]
>>> st.count(2) # count함수, 전달된 값이 리스트에 얼마나 있는지 개수를 세어 반환
2

>>> st=[1,2,3,2]
>>> st.index(2) #index함수, 전달된 값이 가장 처음 나오는 인덱스 값 반환
1
```

---

- 지금까지 함수를 보며 두 가지 갈래로 나누어 진다는 것을 알 수 있었다. </br></br>1. 객체 밖에 있는 함수(사용자 정의 함수)</br>2. 객체 안에 있는 함수</br></br>해당 함수들을 나누어 정의하는 이유가 뭘까. </br></br></br>객체 밖에 있는 함수의 경우?</br>"둘 이상의 다양한 종류의 값을 대상으로 동작하는 함수"</br>"만들기 편하고 사용하기에도 편한 함수"</br></br></br>객체 안에 있는 함수의 경우?</br>"해당 객체에 특화된 형태의 함수 구현"</br></br>

---

### 문자열과 함수들

```python
>>> str = "wordo"
>>> str.count("o") #str 문자열에 입력된 문자 및 문자열의 개수가 몇개인지 세어 숫자 반환
2

>>> str.upper() #str문자열을 전부 대문자로 바꾼 문자열 반환
'WORDO'
>>> print(str) #str실제 값에는 변화가 없음을 알 수 있다.
wordo

>>> str.lower() #str 문자열을 전부 소문자로 바꾼 문자열 반환
'wordo'

>>> str = "  word with blank"
>>> print(str)
  word with blank

>>> str.lstrip() #str문자열의 앞에 위치한 공백들 모두 제거
'word with blank'
>>> print(str) #실제 데이터에는 변화가 없음
  word with blank

>>> str.rstrip() # 문자열의 뒤에 위치한 공백들 모두 제거
>>> str.strip() # 문자열의 앞과 뒤에 위치한 공백들 모두 제거

>>> str = "word"
>>> str.replace("word","string") #str의 word문자열을 string으로 대체하는 함수
'string'

>>> str = "word with blank"
>>> str.split() #str문자열을 공백을 기준으로 하여 나누어 리스트에 저장 및 해당리스트 반환
['word', 'with', 'blank']

>>> str = "word_with_blank"
>>> str.split('_') #split함수에 전달되는 문자 기준으로 쪼갤 수도 있다.
['word', 'with', 'blank']
```

### 문자 탐색 관련 함수

```python
>>> str = "hello park hellllo"
>>> str.find("park") #str문자열에서 입력된 문자열이 처음 등장하기 시작한 인덱스 값을 반환
6

>>> str = "Hi park Hi park"
>>> str.rfind("park") #str문자열에서 입력된 문자열이 마지막에 등장하기 시작한 인덱스 값을 반환
11
```

### 이스케이프 문자

```python
# \n ->줄 바꿈
# \t ->탭 출력
# \' ->작은따옴표 출력
# \" ->큰따옴표 출력
```

```python
>>> str = "안녕하세요. "경준" 입니다."
SyntaxError: invalid syntax

>>> str = "안녕하세요. \"경준\" 입니다."
>>> print(str)
안녕하세요. "경준" 입니다.
```

---

### 함수가 아닌 del명령어

```python
>>> lst = [1,2,3]
>>> del lst[:] #슬라이싱 연산이 아니더라도, del명령어를 통해 리스트 원소를 삭제할 수 있다.
>>> lst
[]

>>> lst = [1,2,3]
>>> del lst[1] #원소 삭제
>>> lst
[1, 3]


>>> del lst #리스트를 완전 삭제
>>> print(lst)
Traceback (most recent call last):
  File "<pyshell#103>", line 1, in <module>
    print(lst)
NameError: name 'lst' is not defined
```
