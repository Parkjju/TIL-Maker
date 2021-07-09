---
layout: post
navigation: True
title: bootstrap 클래스 충돌 관련 이슈
class: post-template
subclass: "post tag-python"
author: parkjju
---

<!-- Todo: coursera troubleshooting 학습 후 정리 -->

## Problem

- 개발중인 웹 버전 today I Learned의 sidebar 스크롤 기능을 부트스트랩 collapse를 통해 구현할 수 있다는 것을 확인
- 동작은 되지만, 메인 바의 CSS가 깨져버리는 현상이 발생

## search

- 구글링 결과 bootstrap를 가져오게될 경우 자신의 html 컴포넌트가 bootstrap의 css프로퍼티 또는 클래스 이름의 충돌로 인해 bootstrap의 것이 적용될 수 있다는 것을 확인 (사례 다수 발생)

## solving

- 일차적으로 bootstrap 사용을 위해 import하는 CDN들을 먼저 배치하고 head태그 내에서 본인의 css링크를 후진배치하여 해결되었음
- 후에 bootstrap의 CSS도 사용해야할 경우가 생기면 bootstrap의 CSS전부가 무시되는지는 확인해야함.
- JS는 문제없이 돌아갔음
- css property에 !important 추가도 가능
