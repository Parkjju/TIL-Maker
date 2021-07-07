---
layout: post
navigation: True
title: Web 요청과 응답과정
class: post-template
subclass: "post tag-python"
author: parkjju
---

- [10분 테코톡 - 삭정의 web요청 & 응답과정](https://www.youtube.com/watch?v=0jV7xOUcKog)

### 인터넷 (Internet) != Web

- LAN - Local Area Network - **근거리 통신망**, 가까운 지역을 한데 묶는 컴퓨터 네트워크
- MAN (Metropolitan Area Network) - 도시지역 통신망, WAN(Wide Area Network) - 국가 이상의 넓은 통신망

- 인터넷 (Internet) - 컴퓨터 네트워크들을 서로 연결 지어주는 **범지구적 네트워크**
  - Inter-Network : 컴퓨터 네트워크들의 네트워크
  - 구축된 인터넷이라는 네트워크 위에서 다양한 서비스들이 동작 - **웹도 인터넷 위에서 동작하는 서비스들 중 하나**

### 웹 (World Wide Web)

- 웹의 목적, 존재 이유?

  - 과거 CERN(물리 입자 연구소의 Sir Tim Berners-Lee) - 연구원끼리 정보 공유를 함에 있어서 일관된 방식으로 진행되지 못하는 점이 불편하게 느껴졌음
  - 발전하는 인터넷과, HyperText(당시 부상하던 기술)을 활용하여 **Information Management: A Proposal**제안서를 토대로 웹이 탄생

- 웹의 존재 이유 - **정보(자원)의 공유** - 웹은 **수많은 요청과 응답 사이클의 연속으로 이루어짐** (웹의 본질)

### 공유과정에 참여하는 주체 - 서버&클라이언트

- 서버(Server) - 정보, 자원, 서비스를 **제공하는 측**. -> 요청을 받고 응답
- 클라이언트(Client) - 정보, 자원, 서비스를 **사용하는 측** -> 요청

- **HTTP (HyperrText Transfer Protocol)** - 웹 요청과 응답에 관한 클라이언트와 서버 사이의 약속
  - HTTPS - HTTP의 보안이 강화된 버전

### HTTP

- HTTP의 대표적인 특성

  1. 비연결성(Connectionless) - 클라이언트 요청에 대해 서버가 응답을 마치면 연결을 **끊음**. -> 다음 요청은 **새로운 연결을 통해 이루어짐**
     - 매번 모든 요청에 대해 새로운 연결 및 해제 과정을 거침 -> **네트워크 비용 측면에서 비효율적**
     - HTTP/1.1 Keep-Alive속성 -> 서버와 클라이언트 사이에 통신이 없어도 **지정 시간동안 연결을 유지하는 기능이 추가됨**
  2. 무상태 (Stateless) - 서버와 클라이언트는 **하나의 요청이 진행되는 동안만 서로를 인지**
     - 클라이언트 인증 - 로그인이 필요한 서비스 -> 서비스 내에서 이동할 때마다 새롭게 로그인해야함
     - 쿠키, 세션, 토큰(OAuth, JWT) - 상태를 기억하기 위한 기능들
     - [HTTP 쿠키와 세션](https://juyoung-1008.tistory.com/2)
     - [JWT에 대한 설명](http://www.opennaru.com/opennaru-blog/jwt-json-web-token/) - 서버와 클라이언트 간 정보를 주고받을 때 HTTP 리퀘스트 헤더에 JSON 토큰을 넣은 뒤 서버가 별도의 인증 과정 없이 JWT를 통해 인증. (로그인 서비스 시 이용)

- HTTP Status Code (응답 코드, 상태 코드)
  - 클라이언트 요청에 대하여 서버는 **요청에 대한 처리 상태를 숫자 코드로 변환**
  - 200(서버가 요청을 제대로 처리 시..), 404(요청한 페이지 찾을 수 없음..)
  1. 1xx : (정보) - 요청을 받았으며 프로세스를 계속한다
  2. 2xx : (성공) - 요청을 성공적으로 받았고, 인식하여 처리완료
  3. 3xx : (리다이렉션) - 요청 완료를 위해 추가 작업 조치가 필요하다
  4. 4xx : (클라이언트 에러) - 요청의 문법이 잘못되었거나 요청 처리 불가
  5. 5xx : (서버 에러) - 서버가 **명백히** 유효한 요청에 대해 충족을 실패했다

* HTTP Method(verbs) - HTTP 메서드 : 클라이언트가 요청을 보낼 때 요청의 **목적이 무엇인지** HTTP 메서드를 통해 명시
  1. GET - 서버의 리소스를 조회하고자 할 때(READ)
  2. POST - 서버의 리소스를 생성하고자 할 때(CREATE)
  3. PUT - 서버의 리소스를 수정할 때 (UPDATE)
  4. DELETE - 서버의 리소스를 삭제할 때 (DELETE) ...... -> 1~4를 묶어 **CRUD**

### 웹 요청과 응답과정

1. 티스토리 홈페이지에 대한 요청과 응답
   1. URL + Enter -> Uniform Resourse Locator : 네트워크상 자원의 위치(주소)
   2. 홈 페이지에 대한 요청을 서버로 전송 (HTTP Request) - 현재로써는 GET방식
   3. 서버가 클라이언트로부터 요청을 받아 처리 - Request Headers 확인 (URL, HTTP Method등 + 클라이언트 정보 - accept, user-agent : os 등 클라이언트 환경, 쿠키 등)
      - 요청에 상응하는 로직을 수행 -> www.tistory.com에 해당하는 html파일 찾은 뒤 요청에 대한 응답을 생성
   4. 서버가 클라이언트에게 응답 (HTTP Response)
   5. 클라이언트(웹 브라우저)가 응답을 받은 뒤 필요한 리소스 추가 요청 + 응답받기 -> CSS,JS등
   6. 모든 리소스 요청에 대한 응답을 받아 브라우저가 렌더링 -> 원하는 홈페이지 표시
2. 티스토리 블로그 글 임시저장 요청 & 응답
   - 임시저장 클릭 -> POST방식으로 Request
     - HTTP method POST방식일 때에는 (PUT도 마찬가지) - Request Payload라는 추가적인 정보가 포함되어 요청이 감.
     - 제목이나 내용 등
     - Response형태 `{"success":true,"draft":{sequence":6},"total":2}` (JSON형태.)
     * success - 요청에대한 처리 여부, draft - 일련번호 6번으로 저장, total - 임시저장 글 개수
3. 임시저장 글 삭제
   - DELETE메소드로 요청...
   - Response형태 `{"success":true,"total":1}`
