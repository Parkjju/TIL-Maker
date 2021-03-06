---
layout: post
navigation: True
title: 자료구조에 대한 이해
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 자료구조란?

- 프로그램이란 **데이터를 표현(자료구조)**, 그렇게 **표현된 데이터를 처리(알고리즘)** 하는 것이다.
  </br>==>표현에는 저장의 의미가 포함된다.

- 예) 자료구조 -> 배열의 선언</br>알고리즘 -> 배열에 저장된 값의 처리

### 자료구조의 분류

- 선형 구조

  - 리스트
  - 스택
  - 큐

- 비선형 구조

  - 트리
  - 그래프

- 파일구조

  - 순차파일
  - 색인파일
  - 직접파일

- 단순구조
  - 정수
  - 실수
  - 문자
  - 문자열

### 알고리즘의 성능분석 방법

- 알고리즘을 평가하는 두 가지 요소

  - 시간 복잡도(time complexity) -> 얼마나 빠른가? **CPU에 대한 부담 정도를 나타냄**

  - 공간 복잡도(space complexity) -> 얼마나 메모리를 적게 쓰는가?

- **시간 복잡도를 더 중요시 한다.**

### 시간 복잡도의 평가 방법

- **중심이 되는 특정 연산** 의 횟수를 세어서 평가한다.

- 데이터의 수에 대한 연산횟수의 함수 T(n)을 구한다.

### 알고리즘의 수행 속도 비교 기준

- 데이터의 수에 따른 **수행 속도의 변화 정도를 기준** 으로 한다.(데이터가 많고 적고는 중요하지 않음.)

### 최악의 경우와 최상의 경우 (순차 탐색 상황 가정)

- 상황 1: 운이 좋은 경우

  - 배열의 맨 앞에서 대상을 찾음
  - 만족스러운 상황은 성능평가의 주 관심 X
  - **최상의 경우(best case)** 라 한다. T(n)=1

- 상황 2: 운이 좋지 않은 경우

  - 배열의 끝에서 찾거나 대상이 저장되어있지 않은 경우
  - 만족스럽지 못한 상황이 성능평가의 주 관심대상이다.
  - **최악의 경우(worst case)** 라 한다. T(n)=n

- _시간 복잡도와 공간 복잡도 각각에 대해 최악의 경우와 최상의 경우를 구할 수있다._

### 빅-오 표기법(Big-Oh Notation)

- T(n)에서 실제로 영향력을 끼치는 부분을 가리켜 빅-오(Big-Oh)라고 한다.

<img src="/assets/images/tn.jpg" width="50%" height="75%"/>

> [출처](http://www.orentec.co.kr/jaryosil/DA_ST_1/add_form1.php)

### 빅-오 구하기

- T(n)이 다항식으로 표현이 된 경우, **최고차항의 차수가 빅-오** 가 된다.

  - T(n)=n^2+2\*n+9 => O(n^2)

<img src="/assets/images/on.jpg" height="75%" width="75%"/>

> 출처 - http://www.orentec.co.kr/jaryosil/DA_ST_1/add_form1.php

### 빅-오에 대한 수학적 접근

- 빅-오의 수학적 정의

  - 두 개의 함수 f(n)과 g(n)이 주어졌을 때, 모든 **n>k** 에 대하여 **f(n)<=Cg(n)** 을 만족하는 두 개의 상수 **C와 K** 가 존재하면, f(n)의 빅-오는 O(g(n))이다.

- 빅-오의 실질적인 의미

  - 5n^2+100의 빅-오는 O(n^2)
  - 다항함수의 예시에서 볼 수 있듯, **최고차항의 계수가 아무리 높더라도 최고차항의 지수가 높아지는 것 만큼의 증가율 패턴 변화가 생기지는 않으므로,** 다항함수의 빅-오는 계수가 붙지 않는다.

- 빅-오의 판별 예시
  - "두 개의 함수 f(n)과 g(n)이 주어졌을 때" => f(n)=5n^2+100, g(n)=n^2
  - "모든 n>=K에 대하여" => 모든 n>=12, K=12
  - "f(n)<=Cg(n)을 만족하는 두 개의 상수 C와 K가 존재하면, " => n>=12인 n을 예시로 들어서, n=12일 때 5 *12^2+100 <= C *12^2를 만족하는 C는 존재한다.
  - f(n)의 빅-오는 O(g(n))이다. => 5n^2+100의 빅-오는 O(g(n))이다.

<img src="/assets/images/examp.jpg" width="50%" height="50%"/>
