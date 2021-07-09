---
layout: post
navigation: True
title: CSS Icon, Block Element Modifier, Font
class: post-template
subclass: "post tag-python"
author: parkjju
---

- Icon 사용

  - 직접 아이콘을 구하기(이미지 추출 or svg파일 이용)

  - [HeroIcons 아이콘사이트](https://heroicons.com/)

  - svg파일 복-붙! (추후 CSS를 통해 크기 조절)

- [FontAwesome 아이콘 사이트](https://fontawesome.com/) - 이메일 입력하여 JS파일 codekit 접근권한 획득

  - script 프로퍼티 받아서 body 태그 가장 마지막에 추가. (body 닫기 직전)

  - 아이콘 검색 및 복사하여 원하는 위치에 추가

  * icon 사이즈 옵션도 존재 (크기에 대한 클래스 이름이 존재, 보통 fa-2x, fa-5x와 같이 수치적 표현 사용)

### BEM

- Block Element Modifier - CSS 개발 방법론 중 하나

  - 문제의 요소에 대한 속성에 근거하는 **클래스의 이름을 짓는데 구조적인 방법을 제시**

  - ID에는 사용 X 오직 클래스명에만 활용 가능

- 블록 요소는 **클래스의 어근을 형성, 항상 맨 앞에 위치하도록 함**

- 요소(element)는 블록이 포함하고 있는 한 조각

- **블록이 전체를 말하고, 요소들을 그 조각들을 일컫고 각 요소는 두개의 밑줄표시로 연결**

```CSS
.block__elemet{property: value;}
```

```CSS
.header__logo{property:value;}
.header__searchbar{property:value;}
```

- Modifier는 블럭 또는 요소의 속성

- 블록 또는 요소의 외관이나 상태를 변화시킬 때 사용 **하이픈 두개 추가**

```CSS
.block--modifier{....;}
.block__element--modifier{...;}
```

```CSS
.header__navigation--secondary{property:value;}
```

```html
<a class="btn btn--big btn--orange" href="#">
  <span class="btn__price">9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```

### CSS Fonts

- [google fonts](https://fonts.google.com/?preview.text_type=custom)

  1. 원하는 폰트 클릭

  2. style 선택

  3. 오른쪽 상단 사각형 (View your selected families 클릭)

  4. import url을 external css 파일 상단에 추가

  5. CSS font-family 프로퍼티 추가
