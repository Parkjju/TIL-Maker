---
layout: post
navigation: True
title: 입출력과 변수
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 수식의 계산 및 출력

<pre>
<code>
{
>>> print(3+4," Hi")
7  Hi

>>> 33+55
88

>>> 9*(1+3)/2
18.0
}
</code>
</pre>

- 출력하고 싶은 대상이 여러개라면 위와 같이 동시에 나열하여 출력하면 된다.

- 수식의 계산은 소괄호를 포함하여 모두 계산이 가능하다.

### 변수에 값 저장하기

<pre>
<code>
{
    >>> a = 3
    >>> print(a)
    3

    >>> x,y = 10,20
    >>> print(x,y)
    10 20

    >>> x,y = 20,10 #주목!
    >>> print(x,y)
    20 10
}
</code>
</pre>

- **파이썬에서는 특별히 여러 변수에 동시에 값 할당이 가능하다.**
