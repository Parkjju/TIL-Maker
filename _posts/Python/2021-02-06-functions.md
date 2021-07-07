---
layout: post
navigation: True
title: 함수 만들기
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 인자와 반환값 모두 없는 함수

<pre>
<code>
{
    #Hi라는 문자열을 출력해주는 함수
    def greet():
        print("Hi")
}
</code>
</pre>

- C언어에서는 중괄호를 통해 함수의 범위를 지정해주었다면 python에서는 들여쓰기를 통해 함수의 범위를 지정해준다.

<pre>
<code>
{
 >>> def greet():
    print("HI")
    SyntaxError: expected an indented block
}
</code>
</pre>

### 인자만 있고 반환 값은 없는 함수

<pre>
<code>
{
    #변수 name을 출력해주는 함수
    >>> pname = "ABC"
    >>> def print_fuction(name):
        print(name)

        
    >>> print_fuction(pname)
    ABC
}
</code>
</pre>

### 값의 반환이 있는 함수

<pre>
<code>
{
    #전달된 두 매개변수를 더하여 값을 반환해주는 함수
    >>> def adder(num1,num2):
        return num1+num2


    >>> a = adder(1,2)
    >>> print(a)
    3
}
</code>
</pre>

### main함수 정의를 통해 프로그램의 실행 흐름 담기

```python
    #전달된 매개변수 둘을 더하여 반환해주는 함수
    def adder(num1,num2):
        return num1+num2

    #main함수 정의를 통해 프로그램의 실행 흐름을 담아보자
    def main():
        print("Adder file.py")
        print(adder(1,2))
```

- 필요할 때마다 정의한 함수를 불러와 호출하는 방법도 좋지만, main()함수를 정의하여 프로그램 전체 실행 흐름을 담아놓는다면 코드 관리가 용이해질 것이다.
