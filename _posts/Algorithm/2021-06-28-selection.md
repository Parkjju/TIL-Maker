---
layout: post
navigation: True
title: 선택문제
class: post-template
subclass: "post tag-python"
author: parkjju
---

- 입력 : n개의 값과 k(1<=k<=n)값
- 출력 : k번째로 작은 입력 값
- 목표 : 비교횟수 최소화

- n-1번의 비교 -> 최댓값 찾기 가능 : 상한(upperbound)
- n-1번의 비교가 필수적인 경우 : 하한 (lowerbound)

* n-1의 비교시 상한 하한이 모두 solve!

### 선택문제 2

- 토너먼트식으로 k=n 최대값찾기 -> 둘씩 짝지어서 비교하여 승자를 선택 (홀수일 경우 부전승) -> 최댓값 n-1번

- k=1, n : 최대값, 최소값 찾기

  1. 최대값을 먼저 n-1번 비교를 통해 찾는다.
  2. 최대값을 제외하고 n-1개를 n-2번 비교를 통해 최소값을 찾는다.
  3. 최종 -> 2n-3번의 비교

- k=1, n : 최대값 최소값찾기 경우의 수 줄이기
  1. 최대값은 토너먼트식으로 추려낸다.
  2. 최소값은 **1라운드에서 패배한 원소들을 서로 비교하면 된다.** -> n/2 개중에 최소값을 찾는다 -> (n/2 - 1)번 비교 !
  3. 최종 -> 3n/2 - 2 번 비교 -> upperbound, 해당 횟수만큼 비교를 진행하면 반드시 최대,최소가 찾아진다. (lowerbound도 동일하다고 증명되어있음)

### 선택문제 3

- k = 1, 2중에 제일 작은값, 두번째로 작은값 찾기
- n-1번 비교 + n-2번 비교 => 2n-3번 비교 (단순비교이므로 더 줄일 수 있음)

- 최소값구하기 -> 토너먼트를 진행하는 동안, 두번째로 작은 값은 최소값을 만나기 전까지 토너먼트에서 승리한다.
- 두번째로 작은값 구하기 -> n-1번을 통해 최소값을 추려내기. + round수 - 1번 비교
  - n=8, round수 3번
  - n=9, round수 4번
  - ....n=16, round수 4번
  - n=17, round수 5번
  - ....n=33, round수 6번
  - log2(n)의 올림 수가 round 수
- 최종 -> n - log2(n) (의 올림) - 2 => 해당 횟수는 upperbound와 lowerbound가 일치된다고 증명되어있음.

## Quick Select

- n개의 값중에서 k번째로 작은 수 찾기

- 알고리즘 전개
  1. L이라는 리스트에 n개의 값이 들어있음.
  2. pivot을 고른다 - L 내에서 랜덤한 값
  3. A = {p보다 작은 값들}, M = {p와 같은 값들}, B = {p보다 큰 값들} -> n-1번 비교
  4. A의 개수를 비교.
     1. if |A| > k -> A에서 k번째로 작은 값이 L에서 k보다 작은 값임. -> 재귀적 사고를 활용 (L = A)
     2. elif |A| + |M| < k -> k번째로 작은 값은 B에 존재 -> **B의 입장에서는 k-|A|-|M|**번째의 값이 L에서 k번째 작은 값이 됨.
     3. else -> M에 k번째 작은값이 존재. -> m은 pivot과 같은 값으로만 이어져있으므로, `return pivot`

```python
# pseudo code
def quickSelect(L,k):
    p = L[0]
    A,B,M = [],[],[]
    for x in L :
        if x<p:
            A.append(x)
        elif x==p:
            M.append(x)
        else:
            B.append(x)

    if len(A) > k:
        return quickSelect(A, k)
    elif len(A) + len(M) < k:
        return quickSelect(B, k-len(A)-len(M)) # 조심! B에 피봇이 존재해도 재귀적으로 구현
    else:
        return p
    # 재귀적 호출이므로, pivot값이 재귀의 깊은 단계에서 리턴되었더라도 메모리에서 소멸되지 않음!!
```

- quickSelect worst case -> A든 B든, 피봇의 비교로 나뉘는 집합이 극단적으로 나뉘는 경우

  - T(n) = T(n-1) + n = 1 + 2 + ... n = O(n^2)

- quickSelect best case -> 피봇이 A와 B를 공평하게 나누는 경우

  - T(n) = T(n/2) + n, let n = 2^k
  - T(n/2) = T(n/4) + n/2
  - ... 1 + ... n/4 + n/2 + n = n(1+1/2+1/4.....+1/2^k) <= 2n => O(n)

- Average Case => O(n)
