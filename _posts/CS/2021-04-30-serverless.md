---
layout: post
navigation: True
title: serverless란?
class: post-template
subclass: "post tag-python"
author: parkjju
---

- [Nomad coders - 서버리스는 서버가 없는걸까? ](https://www.youtube.com/watch?v=ufLmReluPww)

### 서버리스란?

- 서버리스는 애플리케이션을 빌드하고, 백엔드를 디자인하는 방법을 바꾸고 있다

- 서버리스 - 백엔드에 서버가 없나? No
  - 서버가 없는 백엔드 X - 코드가 어딘가에는 저장되어있어야 하기 떄문
  - 백엔드이지만, **개발자가 직접 서버를 관리하지 않는 경우**

### 서버리스의 탄생

- 이전에 어떻게 어플리케이션이 배포되었는가?

  - 직접 서버를 사야할 시절.
  - 서버의 하드웨어 (전원꽂아서 직접..) + 소프트웨어 둘다 관리 -> 하드웨어에 문제 or 트래픽이 급증하여 메모리가 부족 -> 다운되어버림

- Amazon EC2의 출시 -> 서버를 빌려옴

  - 돈만 더 내면 트래픽의 급증에도 서버를 실시간으로 늘려줌
  - google, amazon, microsoft 등 큰 회사들이 **서버의 하드웨어 부분을 책임지고 관리해줌**

- 서버의 소프트웨어는 직접 관리해줌.
  - 이 또한 귀찮다. 업데이트, 보안, 데이터 백업.. 등 작업이 많다. -> **serverless의 탄생**

### 서버리스의 활용

- 서버리스를 활용하면, 백엔드를 서버에 올리지 않는다.
- **백엔드를 작은 함수단으로 쪼개어 직접 관리하지 않는 서버로 올린다** -> EX) AWS lambda

- 서버리스가 아닌 경우 - 서버가 24시간 돌아감. - 언제든지 요청에 응답할 준비를 하고있어야함
- 서버리스인 경우 - 업로드한 함수는 sleeping - 요청이 오는 순간 AWS가 함수를 작동시키고 다시 sleep

  - 서버리스를 통해 함수의 작동 시간만큼 돈을 내면 되게됨
  - 요청이 없어서 함수가 잠에 들면 돈을 안냄!

- 트래픽의 급증 -> AWS lambda의 함수를 복사하여 작동시켜줌. -> 함수의 수가 트래픽에 비례하므로 **성능저하도 X**

### 서버리스의 단점

- cold start -> 함수는 자고있음. 요청에 응답하기 위해 함수를 깨우는 데 시간이 걸림

  - 항시 대기중인 일반적 서버와 응답 속도에 차이가 존재할 것
  - 느린 것은 아니지만, 짧은 시간차도 허용되지 않아야 하는 경우는 서버리스가 단점으로 작용
  - AWS lambda - 자주 사용되는 함수는 아예 잠들지 않도록 하여 리퀘스트에 빨리 대응할 수 있도록 대기시킴

- 서버 제공자에 너무 의지하게 됨.
  - 서버리스 백엔드를 AWS에 베포
  - **AWS에서 microsoft로 쉽게 서버를 이전?** -> 한 서버리스에서 다른 쪽으로 마이그레이팅 하는 것은 쉽지 않다.
  - 마이그레이션 - 한 운영환경으로부터, 대개의 경우 좀더 낫다고 여겨지는 다른 운영환경으로 옮겨가는 과정
  - AWS에서 서버를 빌렸다가, google 클라우드로 마이그레이팅하기는 쉽지만, 서버리스는 어려움.
  - **서버리스로 작업하면 어플리케이션의 구조 자체가 바뀐다고 함.**
    - 서버를 통제하지 않아도 된다는 마인드를 가지고 어플리케이션 구조를 짤 것..

### 누가 서버리스를 사용해야하는가?

1. 사이드프로젝트 진행자들!
2. 최대한 빠르게 프로토타입을 출시하고 싶은 경우
   - 프로토타입이란 - 원래의 형태 또는 전형적인 예, 기초 또는 표준.
   - **정보시스템의 미완성 버전 또는 중요한 기능들이 포함되어 있는 시스템의 초기모델**
   - 설정은 신경 끄고, 코드에만 집중할 수 있게됨.

- 참고
  1. [serverless.com](https://www.serverless.com/)
  2. [AWS lambda](https://aws.amazon.com/ko/lambda/)
  3. [Google Cloud Functions](https://cloud.google.com/functions)
  4. [Apex. terraform](https://scalr.com/terraform-cloud-alternative/?utm_campaign=TACOS%20v2&utm_source=google&utm_medium=cpc&utm_content=Terraform%20Cloud&utm_term=terraform%20cloud&gclid=Cj0KCQjw1a6EBhC0ARIsAOiTkrFy5WZR81Nb4Ow_4Dr0hyxP_kG4yaCaMLNpqsatuYIo7ze1f5Nqlq4aAj2dEALw_wcB)
