---
layout: post
# current: post
# cover: assets/built/images/python-logo.png
navigation: True
title: 재귀(Recursion)
tags: [python]
class: post-template
subclass: "post tag-python"
author: parkjju
---

- 재귀함수란? - 함수 내부에서 한번 이상 자신의 함수를 호출
  - 재귀 알고리즘 -> 알고리즘 내부에서 한번 이상 자신의 알고리즘을 호출

```python
def sum(n):
    if n==1:
        return 1
    return sum(n-1) + n
```

- 수행시간 T(n) = T(n-1) + c . 점화식의 생성

  - = (T(n-2) + c) + c
  - = ... T(n-(n-1)) + (n-1)c
  - = T(1) + (n-1)c
  - = c\*n
  - -> T(n) = cn = O(n)

- 재귀알고리즘 검사

  1. n==1 테스트 : 바닥조건 base case => T(1) = 1 or C
  2. 재귀 호출 : T(n) = 점화식
  3. 전개 => T(n)도출 후 빅-오표기

- 예시2) -> sum(a,b) = a + (a+1) ... + b-1 +b
- 첫번쨰 예시처럼 말고, 중간값을 찾아서 중간값 기준으로 반으로 갈라서 재귀적으로 구현

```python
def sum(a,b):
    if a==b: return a
    if a>b: return 0
    m = (a+b)//2
    return sum(a,m)+sum(m+1,b)
```

- T(n) = 2\*T(n/2) + c, T(1) = c
- T(n) = 2\*T(n/2) + c (n=2^k)

  - = 2*(2*T(n/4)+ c) + c .....
  - 2^k\*T(n/2^k) + c(1 + 2 + 2^2 ..... + 2^(k-1))
  - c\*2^k + c(2^k-1) = c\*2^k + c\*2^k - c = 2c2^k - c, (2^k = n) = 2cn - c

- 예시3)

* 문자열 reverse함수를 재귀적으로 구현

  - reverse(A) = reverse() + A\[0\]
  - = reverse(A\[1:\]) + A\[:1\] => T(n) = T(n-1) + c = O(n)

* reverse(A, start, stop) = A\[start\] ... A\[stop-1\]
  - A\[stop-1\] ..... A\[start\], 가운데에는 reverse(A\[start+1\] ... A\[stop-2\]) = reverse(A, start+1, stop-2)
  - T(n) = T(n-2) + c
  - T(n) = T(1) + n/2 \* c = O(n)
