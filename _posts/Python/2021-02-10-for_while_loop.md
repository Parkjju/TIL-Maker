---
layout: post
navigation: True
title: for 루프와 while 루프
class: post-template
subclass: "post tag-python"
author: parkjju
---

### for 루프에 대한 복습

- for <변수> in <범위>:</br> <루프에 속하는 문장들>

- 하나 이상의 문장을 **정해진 횟수만큼** 반복해서 실행한다.

### False가 될 때까지 반복하는 while루프

- while<조건>:</br> <조건이 True인 경우 반복 실행할 문장들>

```python
def main():
    cnt=0
    while cnt<3:
        print(cnt, end=' ')
        cnt=cnt+1

main()
```

- while문 내의 조건에 비교하여 False가 나올 때 까지 반복이 진행된다.

### for 루프와 while 루프의 비교

- for<변수> in **<반복 범위>**

- while **<반복 조건>**

- while루프는 **반복의 횟수가 정해지지 않은 경우에** 사용하는 것이 좋다.

### break

```python
def main():
    i=0
    while i<100:
        print(i, end=' ')
        i=i+1
        if i==20:
            break # 반복문 탈출
        # if i==20: break 이렇게도 표현 가능
main()
```

```python
cnt=0
while True:
    print("무한루프..")
    if cnt>10:
        break;
    cnt= cnt+1
```

### continue

```python
>>> for i in range(1,11):
        if i%2==0:
            continue
        print(i, end=' ')
# 1~10까지 2의 배수가 아닌 것들만 출력하는 코드
# continue를 통해 자신이 속해있는 루프를 다시 실행한다.

```

### 이중 for루프

- for 루프 안에 for 루프가 존재

```python
>>> for i in [1,2,3]:
        for j in ['a','b']:
            print(i*j,end = ' ')
```

- 안쪽 for 루프를 반복실행하는 루프를 이중 루프라고 생각!
