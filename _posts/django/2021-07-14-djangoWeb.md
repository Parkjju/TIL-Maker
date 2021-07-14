---
layout: post
navigation: True
title: Python 웹 프로그래밍 기초편 - 김석훈 저
class: post-template
subclass: "post tag-python"
author: parkjju
---

## Chapter 1 웹 프로그래밍의 이해

### 1.1 웹 프로그래밍이란?

- HTTP(S) 프로토콜로 통신하는 클라이언트와 서버를 개발하는 것 (둘 중 하나만 개발할 수도 있음)
- 웹 브라우저는 이미 웹 클라이언트로서 개발되어 있기 때문에 웹 프레임워크를 이용하여 웹 서버만을 개발하는 것을 마치 웹 프로그래밍의 전부인 것으로 착각함 (실제로는 웹 클라이언트를 개발해야하는 상황도 자주 생김)
  <img src="./assets/images/webdraw.jpg" height="30%" width="60%"/>

### 1.2 다양한 웹 클라이언트

#### **1.2.1 웹 브라우저를 사용하여 요청**

- 웹 브라우저가 주소창의 문장을 해석 - HTTP요청을 보내는 클라이언트의 역할을 수행 - 요청을 받은 대상 도메인의 웹 서버가 결과를 웹 브라우저로 전송 - HTML 해석하여 화면에 렌더링

#### **1.2.2 리눅스 curl명령을 사용하여 요청**

- 리눅스의 `curl`명령은 HTTP/HTTPS/FTP등 여러 프로토콜을 사용하여 데이터를 송수신할 수 있는 명령

```bash
$ curl http://www.example.com
```

- 요청 뒤에 웹 서버로부터 html을 받는다

#### **1.2.3 Telnet을 사용하여 요청**

- 리눅스의 Telnet프로그램을 사용하여 HTTP 요청을 보낼 수도 있다.

```bash
$telnet www.example.com 80
```

- GET, HOST에 대한 정보를 받은 뒤 요청을 받은 웹 서버에서 html을 넘겨준다.

#### **1.2.4 직접 만든 클라이언트로 요청**

- 파이썬으로 직접 웹 클라이언트를 만든다.

```python
import urllib.request
print(urllib.request.urlopen("http://www.example.com").read().decode('utf-8'))
```

```bash
baggyeongjun-ui-MacBook-Pro:pythonTest parkgyeongjun$ python client.py
<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
```

### 1.3 HTTP 프로토콜

- HTTP는 웹 서버와 웹 클라이언트 사이에서 데이터를 주고받기 위해 사용하느 통신 방식 - TCP/IP 프로토콜 위에서 동작한다. -> 웹을 이용하려면 웹 서버와 웹 클라이언트는 각각 TCP/IP동작에 필수적인 IP주소를 가져야한다.

#### **1.3.1 HTTP 메시지의 구조**

- HTTP 메시지 - 클라이언트에서 서버로 보내는 요청 메시지 & 서버에서 클라이언트로 보내는 응답 메시지

<figure>
    <img src="./assets/images/httpmessage.jpg" height="50%" width="50%"/>
    <figcaption>http 메시지 구조</figcaption>
</figure>

1. 스타트라인 : 요청 메시지일 때 요청라인, 응답 메시지일 때 **상태 라인**
2. 헤더 : 각 행의 끝에 CRLF(Carriage Return Line Feed - 줄바꿈문자)가 있음. 해더와 바디는 빈 줄로 구분하고 헤더와 바디는 생략될 수 있음.
3. 바디 : 바디에는 텍스트 뿐만 아니라 바이너리 데이터도 들어갈 수 있음.

- 바디가 없는 요청 메시지 예시

```bash
GET /book/shakespeare HTTP/1.1 # 요청라인.
Host: www.example.com:8080 # 헤더
```

- 요청라인은 요청 method, 요청 URL, 프로토콜 버전으로 구성
- 헤더는 `이름: 값` 형식으로 표현

- 동시에 표시할 수 있음

```bash
GET http://www.example.com:8080/book/shakespeare HTTP/1.1
```

- **응답메시지 예시**

```bash
HTTP/1.1 200 OK
Content-Type: application/xhtml+xml; charset=utf-8

<html>
...
</html>
```

- 첫 번째 줄은 프로토콜 버전, 상태코드, 상태 텍스트로 구성
- 두 번째 줄부터 헤더. html문서가 시작되는 곳부터 바디이므로 빈 줄로 구분하는중

#### **1.3.2 HTTP 처리 방식**

1. GET - 리소스 취득 - Read
   - 지정한 URL정보를 가져오는 메소드. 서버로부터 웹 페이지, 이미지, 동영상 등을 불러올때 사용
2. POST - 리소스 생성 , 리소스 데이터 추가 - Create
3. PUT - 리소스 변경 - Update
   - PUT메소드도 리소스를 생성하는 데 사용할 수 있다.
   - 리소스 생성 관점에서 PUT과 POST를 구분하려면 리소스에 대한 URL 결정권이 서버 측에 있을 때 POST, 반대로 클라이언트에 있을 때 PUT을 사용하는 것이 적합.
   - 위키백과처럼 클라이언트가 결정한 타이틀이 URL로 결정될때 - PUT으로 하는 것이 적합하지만, 오히려 혼동을 줄 수 있기 때문에 POST PUT 각자의 역할 수행하도록 구현하기
4. DELETE - 리소스 삭제 - Delete
5. HEAD - 리소스 헤더 취득
6. OPTIONS - 리소스가 서포트하는 메소드 취득
7. TRACE - 루프백 시험에 사용
8. CONNECT - 프록시 동작의 터널 접속으로 변경

#### **1.3.3 GET과 POST메소드**
