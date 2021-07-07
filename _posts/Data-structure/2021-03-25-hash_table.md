---
layout: post
navigation: True
title: 해시 테이블 (Hash Table)
class: post-template
subclass: "post tag-python"
author: parkjju
---

- 해시 테이블은 일종의 사전(dictionary)이고, Python의 dict 자료구조처럼 insert, remove, search 연산을 빠르게 지원한다
- (데이터 item이 key&value쌍으로 구성된다고 가정)

  1. insert(key,value) -> (key, value)를 해시 테이블에 저장, 같은 key가 있으면 overwrite
  2. remove(key) -> (key,value)가 해시 테이블에 있으면 삭제
  3. search(key) -> (key,value)찾아서 리턴

- 사용 분야 - database, compilers&interpreters, document similarity, network router, substring search, file/directory synchronization, **cryptography** .... 매우 중요

- **예시**

1. key값이 학번이고, value가 이름인 item이 있다고 가정
2. key를 10으로 나눈 나머지를 인덱스로 하는 장소에 value를 저장한다.
3. 201701342를 10으로 나눈 나머지 -> 인덱스 2에 value를 저장.
4. 이후 원하는 연산 진행 시 key 탐색에 있어서 **key를 10으로 나눈 나머지에 대한 연산만 진행하면 된다**

- 위의 예시에서 볼 수 있듯, key값을 key값이 저장될 index로의 mapping을 진행해주는 function을 **해시 함수(hash function)이라고 한다.**

- **collision**?

- 구현되어 있는 hash function을 통해 특정 index에 접근을 시도하는데, 이미 다른 item이 저장되어 있었다면 이를 충돌(collision)이 발생했다고 한다.

- 이를 해결하는 방법을 **충돌해결방법(collision resolution method)라고한다.**

### 위의 내용까지 정리

1. Table은 기본적으로 List로 구현된다.
2. Hash function에 대한 결정
3. Collision resolution method 구현에 대하여

- 해시 테이블은 2,3번이 잘 구현되어 있는지 여부에 따라 전체적인 성능이 결정된다.

### 해시 함수(hash function)

- 좋은 hash function?
  1. less collision
  2. fast computation
- 이 둘은 어느 정도 trade-off한 부분이 있기 때문에 적절히 두 비율을 조정해야함

1. perfect hash function : key -> slot에 1대1로 대응 되는 것. **(ideal hash function) -> 비현실적**
2. universal hash function?
   - 각각 x, y key값을 가지는 item이 있다고 가정. Prob(f(x)==f(y))은 collision이 발생할 확률이며 슬롯의 개수를 m이라고 가정하면 universal hash function은 **Prob(f(x)==f(y))= 1/m** 을 만족해야한다.
   - 확률을 1/m 으로 설계하는 것도 어려움
3. c-universal hash function : universal hash function의 collision확률이 **c/m**인 hash function

### 현실에서 자주 쓰이는 해시 함수들

1. Division : f(k) = (k mod p) mod m (p는 소수)

2. Multiplication : f(k) = (ak) mod 2^w) >> (w-r)

   - a:랜덤 값, w = log(r), r = log(m)

3. Folding : key값의 digit을 나눠 연산하는 형식

   1. shift folding 예시 ) 계좌번호 - 1234-567-890을 두 digit씩 나누어 모두 더한 후 mod m. (12+34+56+78+90) mod m
   2. boundary folding : 여러 digit으로 나눈 후 더하는 데, 짝수번 조각은 거꾸로 해서 더함
      - 12+**43**+56+**87**+90 mod m

4. Mid-Square : key값을 적당히 연산 후 그 결과의 중간 부분을 떼어내 주소로 이용

   - m=1000이라고 가정, key=3121일 때 key^2 = 97**406**41의 중간 digit 406을 주소로 이용

5. Extraction : key 값의 각 파트마다 임의의 digit을 떼어내 연결하여 계산
   - 계좌번호가 1234-567-890이면, 1234에서 12, 567에서 7을 떼어내 **127**을 주소로 만듦.

### 현실에서 자주 쓰이는 해시 함수들 - key값이 문자열일 때

1. Additive hash : key[i]의 단순 합 - ASCII값
2. Rotating hash : <<,>> 비트쉬프트 연산과 ^(exclusive or)연산을 적당히 반복
3. Universal hash
   - Bernstein hash
   - C++ STLPort 4.6.2 hash
   - java.lang.String.hashCode()

<!-- Todo: hash function들 실습해보기 -->

### 충돌회피방법(Collision resolution method) - open addressing, Chaining

- open addressing - 충돌이 발생하면 주위의 빈 슬롯을 살펴본다.

  1. linear probing
  2. quadratic probing
  3. double hashing

- chaining

##### open addressing - linear probing?

- 충돌이 발생하면 바로 다음 슬롯을 살피고, 또 충돌이 발생하면 계속해서 다음 슬롯을 살핌
- 빈칸이 생기면 그곳에 데이터 저장 (처음과 끝이 연결되어 있다고 생각, 마지막 슬롯에서 충돌이 발생하면 처음 슬롯부터 다시 탐색)

- **cluster?** -> 군집된 데이터들

- search 메소드 구현의 경우 - 충돌 발생 이후 cluster 전체를 훑어도 key값을 찾지 못한 상태 -> 빈 슬롯을 search 하였다면 linear probing에 따라 저장되는 데이터인데 빈 슬롯에도 저장되어 있지 않았으므로 해당 key값을 가진 데이터는 없다고 판단.

- set(insert역할) 메소드 구현의 경우 - set(key,value=None):

  1. key값이 해시 테이블에 **있으면** value를 Update
  2. key값이 해시 테이블에 **없으면** (key, value)를 insert

- remove(key) -> 해시 테이블에 key있으면 value 삭제

###### set, search, remove 연산

- find-slot(key) 함수 정의가 선행되어야 함

  1. key값이 있으면 slot 번호 리턴
  2. key값이 없으면 key값이 삽입될 slot 번호 리턴

```text
i = hash_function(key)
start = i
while (table[i] == occupied) and (table[i].key !=key) # occupied -> slot에 공간이 차있음
    i = (i+1)%m
    if i == start : return FULL # 테이블 전체가 꽉 차있음
return i
```

- set(key, value=None):

  1. find-slot 호출
  2. find-slot이 return한 값이 FULL이면, **table 사이즈를 키워야함**
  3. find-slot이 return한 값의 슬롯에 value가 저장되어 있었으면 (is.occupied), value값 update
  4. find-slot이 return한 값의 슬롯이 비어있으면, table[i].key, table[i].value = key, value
  5. return key -> 성공적으로 set을 진행하였다는 표시

- search(key)

  - 전체적인 흐름은 set과 유사함

- remove연산

  - remove진행 후에, 빈 슬롯으로 그대로 두면 **탐색의 고리가 끊어짐**
  - remove 이후 cluster 당겨주는 작업은 **key가 밀린 상태인지에 대한 test가 필요하다**
  - 해당 작업을 연속된 빈칸이 등장할때까지 진행한다.
  - 즉, k = f(table[j].key) - k는 테이블 j번째 키값의 해시함수 결과 & 빈칸이 i번째에 존재 - 에서, k에 있어야할 table[j].key가 밀려서 j에 있다면 해당 key를 빈칸으로 옮겨줘야한다.

  - i, k, j의 관계식 (j는 옮겨야하는 slot, k는 hash function의 결과 -- 원래 있어야 하는 자리, i는 빈칸)
    1. k < i <= j
    2. i < j < k
    3. j < k < i

<img src= "/assets/images/kjh.jpg" width="30%" height="30%"/>

```text
# pseudo code
remove(key):
    i = find_slot(key)
    if table[i] is unoccupied:
        return None
    j = i  //table[i] :빈 슬롯, table[j] : 옮겨야할 슬롯
    while True:
        table[i] = None
        while True: # 이사할 table[j] 찾기
            j = (j+1)%m
            if table[j] is unoccupied: # 연속된 빈칸의 등장
                return key # 성공적으로 remove 후 빈칸 채움까지 완료하였다는 표시
            k = hash_function(table[j].key)
            if (k < i <= j): # k, i, j 세 가지 조건에 따라 모두 검사해야함.
                break
        table[i] = table[j]
        i=j
```

- linear probing의 성능 좌우하는 부분? -> **cluster의 길이에 비례함** -> **hash function이 어느 정도로 cluster를 형성하지 않고 분산되게 데이터를 저장하였는가?**

<!-- Todo remove, search, set 연산 구현해보기 -->

##### open addressing - quadratic probing (제곱의 인덱스), double hashing (hash function을 두개 사용)

- **quadratic probing** -> 기존 linear probing에서 슬롯 search를 진행할 때, 해당 슬롯이 occupied 되어있으면 한 칸씩 건너뛰었다.

  - quadratic probing에서는 k번째 슬롯이 occupied 되어있었다면, k+**n^2**만큼 건너뛴다.

- **double hashing** -> hashfunction을 두개 사용함.
  - k번째 슬롯이 occupied되어있었다면, 기존 f hash function에 key값을 대입하여 새로운 slot을 찾는다.
  - 그럼에도 해당 슬롯이 occupied 되어있다면, 그 다음 빈 슬롯을 찾기 위해 **또 다른 hashfunction을 정의하여, f(key) + g(key) 슬롯을 찾는다.**
  - 그럼에도 해당 슬롯이 occupied 되어있다면, 이후로는 **f(key) + n\*g(key)** 형태로 계속해서 슬롯을 찾아나간다.

##### quadratic probing & double hashing 성능평가

- linear probing 복기 -> set, remove, search : cluster size에 의 해 영향.

  - cluster 형성이유 ?

  1. hash function
  2. collision resolution method
  3. load factor: n/m -> m: hash table 사이즈 (slot 갯수) , n: hash table에 저장된 item 갯수.
     - set, remove, search 등 함수에 대해 그래프를 그려 비교할 수 있음.
       <img src="../Data_structure/images/graph.jpg" height="40%" width="40%"/>
     - 또는, 함수를 돌면서 발생한 collision횟수를 저장된 slot의 개수인 n으로 나누어 충돌 비율 비교를 통해 hash function에 대한 성능평가를 진행.

- **m>=2n**, 즉 최소 50%이상 빈 슬롯을 유지한다면 cluster의 사이즈가 O(1)로 형성된다. -> set, remove, search를 O(1)에 사용할 수 있게된다는 의미임.

#### 충돌 회피 방법 - chaining

- 각 슬롯에 꼭 하나의 데이터만 저장해야하는가? NO!
- 슬롯에 **한방향 연결리스트를 생성**하여 데이터를 계속해서 저장. (양방향도 상관X)
- hash의 set함수 호출 -> 해당 연결리스트에 pushFront를 통해 슬롯에 데이터를 새롭게 저장하게 되는것. **O(1)**
- search 함수 -> 해당 슬롯에 충돌된 key의 평균 개수 **O(충돌 key의 평균 개수)** -> 연결리스트의 길이
- remove 함수 -> search와 동일 (search해야하기 때문)
  -> hash function을 **c-universal**로 작성했을 때, 슬롯 내의 연결리스트 평균 개수의 길이가 O(1).

### 최종 정리

- 빈 슬롯이 충분하다고 가정하였을 때, set, remove, search 등의 함수를 O(1)시간에 사용할 수 있음.
