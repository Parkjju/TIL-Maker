---
layout: post
navigation: True
title: Github Page 만들어 배포하기
class: post-template
subclass: "post tag-python"
author: parkjju
---

### 1. repository 만들기

- 자신의 github계정에 로그인하여 repository 생성을 합니다. </br>이때 repository의 이름은 **username.github.io**로 해야만 합니다.</br>

<img src="images/2.png" width="100%" height="100%"></img>

- 제 개인 github계정의 이름이 Parkjju이므로 github page 생성을 위한 repository 이름을 </br> Parkjju.github.io로 지정한 것을 볼 수 있습니다. </br>

### 2. 무료 Bootstrap template을 이용하여 홈페이지 만들기

<img src="images/gg.png" width="100%" height="100%"></img>

- 구글에 free bootstrap을 검색하여 원하는 템플릿을 다운 받은 후,</br> html코드를 이용하여 간단하게 수정해보겠습니다.</br></br>

<img src="images/f.png" width="100%" height="100%"></img>
<img src="images/s.png" width="100%" height="100%"></img>

</br>

```html
<div class="resume-section-content">
  <h1 class="mb-0">
    Park
    <span class="text-primary">GyeongJun</span>
  </h1>

  <div class="subheading mb-5">
    17035 경기도 용인시 처인구 모현읍 외대로 81 Tel. 031-330-4114
    <a href="mailto:name@email.com">rudwns3927@gmail.com</a>
  </div>

  <p class="lead mb-5">
    I am experienced in leveraging agile frameworks to provide a robust synopsis
    for high level overviews. Iterative approaches to corporate strategy foster
    collaborative thinking to further the overall value proposition.
  </p>

  <div class="social-icons">
    <a class="social-icon" href="#"><i class="fab fa-linkedin-in"></i></a>
    <a class="social-icon" href="#"><i class="fab fa-github"></i></a>
    <a class="social-icon" href="#"><i class="fab fa-twitter"></i></a>
    <a class="social-icon" href="#"><i class="fab fa-facebook-f"></i></a>
  </div>
</div>
```

- div태그에 템플릿 제작자가 정의해놓은 class를 이용하여 </br> 저의 이름과 학교 주소에 대한 정보만 새롭게 입력하였습니다.</br></br> 이후 Git Push를 통해 해당 repository에 수정한 index.html파일을 포함하여 템플릿 다운로드시 함께 있었던 파일 전부 업로드 진행합니다. </br></br></br></br>

### 3. 생성된 Github Page에 접속하기

- Github 에서는 username.github.io로 repository를 생성하면 자동으로 github page를 생성해줍니다.</br> 생성한 repository에 html파일을 업로드 하였다면</br> 주소창에 "username.github.io/파일경로/file.html"을 입력하여 github page에 접속합니다.
  <img src="images/qwe.png" width="100%" height="100%" title="주소창에 주목해주세요"></img>

- 제가 저장한 html 파일은 현재 디렉토리에 존재하기 때문에 따로 경로지정을 하지 않았지만, </br> 현재 디렉토리 하위 폴더에 html파일이 존재한다면</br>Parkjju.github.io/**foldername**/index.html과 같이 주소창에 입력한 뒤 접속해야할 것입니다 !</br></br>(html뿐만 아니라 js,css 기타 첨부되었던 모든 파일들도 함께 하위 폴더에 존재해야 합니다.)</br>
  <img src="images/fq.png" width="100%" height="100%" title="변경된 주소창에 주목해주세요." ></img>

</br></br>
<img src="images/stb.png" width="100%" height="100%" title="하위 폴더의 위치와 구성입니다. URL에서 볼 수 있듯 myfolder라는 폴더 안에 다운로드 한 템플릿 파일들을 모두 넣었습니다."></img>

- 만약 위의 사진처럼 폴더 구성을 하지 않고 html파일만 덩그러니 현재 디렉토리에 넣어두면 </br> 사진이나 다른 CSS효과들은 구현되지 않습니다.</br></br>
