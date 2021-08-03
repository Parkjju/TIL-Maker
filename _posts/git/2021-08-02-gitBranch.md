---
layout: post
navigation: True
title: git branch 전략
class: post-template
subclass: "post tag-python"
author: parkjju
---

- [10분 깃코톡 - 웨지의 Git 브랜치 전략](https://www.youtube.com/watch?v=jeaf8OXYO1g&t=190s)

## 브랜치 전략이란?

- git branch managenent strategy
  - a. 여러 개발자 협업 환경에서 git저장소를 효과적으로 활용하기 위한 work-flow

### 자주 쓰이는 브랜치 전략

1. git-flow : 5가지 브랜치를 이용하여 운영하는 브랜치 전략
2. github-flow : master브랜치와 pull request를 활용한 단순 브랜치 전략

#### 1. git-flow

- 2개의 메인 브랜치와 3개의 보조 브랜치로 구성

1. 메인 브랜치 : **항상 유지**된다.
   - a. master: 제품으로 출시될 수 있는 브랜치
   - b. develop : 다음 출시 버전을 기다리는 브랜치
2. 보조 브랜치 : **merge되면 사라진다.**
   - a. feature : 기능을 개발하는 브랜치
   - b. release : 이번 출시 버전을 준비하는 브랜치
   - c. hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치

##### git-flow 프로세스

1. develop 브랜치로부터 본인이 개발할 기능을 위한 feature브랜치를 생성.
2. feature브랜치에서 기능을 만들다가 기능이 완성되면, develop브랜치에 merge
3. 이번 배포 버전의 기능들이 develop브랜치에 모두 merge되면, QA(Quality Assurance)를 위해 release브랜치를 생성
4. release브랜치에서 오류가 발생 -> release브랜치 내에서 수정
   - a. QA가 마무리되면, 해당 버전 배포를 위해 master브랜치로 merge
   - b. bugfix가 있었다면 해당 내용 반영을 위해 develop브랜치에도 merge
5. master브랜치에서 버그가 발생 -> hotfix브랜치 만들어서 수정
   - a. hotfix브랜치에서 bugfix 마무리되면 develop과 master브랜치에 각각 merge

##### git-flow 특징

1. 주기적으로 배포를 하는 서비스에 적합
2. 가장 유명한 전략

#### 2. github-flow

- master브랜치만 존재

##### github-flow 프로세스

1. 기능 개발, 버그, 픽스 등 어떠한 이유로든 브랜치를 생성.
   - a. git-flow처럼 체계적 분류 기준이 없기 때문에 작업의 내용이 잘 드러나도록 브랜치 이름을 고려해야됨.
2. 커밋
3. PR생성 - 리뷰진행
4. 실제 서버 및 테스트 환경에 배포
5. master에 merge 및 push (보통 merge가 일어나면 배포를 자동으로 진행되도록 설정한다고 함)

##### github-flow 특징

1. 브랜치 전략이 단순함 -> git에 익숙하지 않은 사람들에게 유용
2. CI(지속적 통합), CD(지속적 배포)가 자연스럽게 이루어진다
