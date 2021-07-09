---
layout: post
navigation: True
title: CSS transition, transform, animation, Media query
class: post-template
subclass: "post tag-python"
author: parkjju
---

### Transitions

- CSS state를 통해 선택한 요소가 특별한 상태일 때 만족되는 상황들을 만들 수 있다.

- 예) :hover를 적용하면, 포인터를 해당 요소에 올려놓아야 상태의 변화가 일어난다.

```html
<style>
  button:hover {
    color: blue;
  }
</style>
```

- 상당히 cool하지 못한 모습이기 때문에 transition프로퍼티를 이용하여 이를 자연스럽게 꾸며준다

- state선언 되어있는 곳이 아닌 외부 공간에 스타일을 따로 지정해야 한다.

```html
<style>
  a {
    color: tomato;
    background-color: wheat;
    transition: color 1s ease-in-out;
  }
  a:hover {
    color: red;
    background-color: black;
  }
</style>
```

- 위를 보면, hover 상태 만족 시 스타일 안에 transition을 넣은 것이 아니라 외부 a 태그 지정에 transition 프로퍼티를 넣었음을 관찰

- transition이 state 지정되어있는 프로퍼티들을 찾아 전환 스타일에 대한 설정을해줌.

- state설정해준 모든 프로퍼티에 대해 transition설정을 하고싶다면 all을 이용!

```html
<style>
    a{
        color:tomato;
        background-color:black;
        transition:all 1s ease-out;
    }
    a:hover{
        color:red;
        background-color:white;
    }
```

### transition part two

- transition 프로퍼티에는 ease-in function이라는 것이 존재한다.

- 브라우저에게 애니메이션이 어떻게 변할 지에 대해 알리는 함수이다

```html
<style>
  a {
    color: tomato;
    transition: all 1s ease-in-out;
  }
</style>
```

- 위 코드에서 ease-in-out에 해당하는 부분.

- ease-in-out 등등 여러 옵션들이 있지만, cubic-beizer라는 옵션을 통해 더 디테일한 애니메이션으로 꾸밀 수 있다.

```html
<style>
  a {
    color: wheat;
    background-color: tomato;
    text-decoration: none;
    padding: 3px 5px;
    border-radius: 5px;
    font-size: 55px;
    transition: color 1s cubic-bezier(0.6, 0, 0.735, 0.045), border-radius 5s
        ease-in-out;
  }
  a:hover {
    border-radius: 20px;
    color: tomato;
    background-color: wheat;
  }
</style>
```

- 여러 옵션들을 한번에 transition 적용시키고 싶으면 쉼표를 통해 구분하면 됨! (위의 코드 참고)

### Transformation

- transform 프로퍼티 - 이미지 등에 대해 전환

- scaleX, scaleY, matrix, rotateX,Y,Z ... 너무나 많은 옵션들이 존재함.

- [Transform 프로퍼티 옵션 참고](https://developer.mozilla.org/ko/docs/Web/CSS/transform)

- Transform 프로퍼티는 transition 프로퍼티와 함께 쓰일 때 진정 cool한 모습을 보인다

```html
<style>
  img {
    border: 10px solid black;
    border-radius: 50%;
    transition: all 2s ease-in-out;
  }
  img:hover {
    transform: rotateX(50deg);
  }
</style>
```

- 각도에 대한 단위 -> deg

- rotate 옵션에 대해 자연스러운 움직임을 부여하기 위해 root 태그에 transition 프로퍼티를 **무조건** 부여하자!

- 기본 transform 옵션들

  1. scale - X, Y기준 늘이기 (Z축은 안됨)

  2. rotate - 회전

  3. translate - 이동

- CSS로 3D 애니메이션 구현 가능하게 된 것은 브라우저의 진보 + 컴퓨터 GPU의 활용으로 인함!

- **transform프로퍼티는 다른 요소의 box에 영향을 주지 않는다.** 페이지의 픽셀 차원에서 일어나는 변화이고 box 자체에 대한 변화가 일어나지 않음.

- 따라서 형제 요소가 인식하기를, transform이 일어난 요소에 대해서 그 요소가 제자리에 있는 것으로 인식함.

### Animaition part one

- state에 상관 없이 움직이는 animation?

```html
<style>
  @keyframes myAnimate {
    from {
      transform: rotateX(0);
    }
    to {
      transform: rotateX(360deg);
    }
  }
  img {
    border: 10px solid black;
    border-radius: 50%;
    animation: myAnimate 5s ease-in-out infinite;
  }
</style>
```

- @keyframes을 통해 특정 상태에 대한 만족이 없어도 실행되는 애니메이션을 정의한다.

- from~to의 구조를 가지며, 애니메이션을 적용할 요소에 animation 프로퍼티를 적용한다.

- infinite 옵션을 animation 프로퍼티에 추가하면 위의 코드를 예시로, 5초 동안 ease-in-out형태로 움직이는 애니메이션이 무한히 반복된다.

```html
<style>
  @keyframes name {
    from {
      transform: rotateX();
    }
    to {
      transform: rotateX(360deg) translate(100px);
    }
  }
</style>
```

- 위와 같이 tranform to에서 위치를 옮기는 옵션을 추가하면 애니메이션 한 사이클을 돈 뒤에 처음부터 시작할 때에 툭 끊기는 부자연스러움이 보인다.

### Animation Part two

- CSS를 통해 브라우저에 애니메이션을 구현하고 싶을 때, keyframes를 이용했었다.

- 하지만 translate를 이용하여 위치 전환을 자연스럽게 하고싶어도 애니메이션 사이클이 한번 돌면 초기화 될 때 jump를 하는 경우가 발생한다.

- 이를 해결하기 위해 애니메이션을 keyframes의 from~to가 아니라 %비율로 나누어 애니메이션화를 진행한다.

```html
<style>
  @keyframes superSexyCoinFlip {
    0% {
      transform: rotateY(0);
    }
    50% {
      border-radius: 0px;
      transform: rotateY(180deg) translate(100px);
      border-color: tomato;
    }
    100% {
      transform: rotateY(0) translate(0);
    }
  }
</style>
```

- 100% 완료하게 되었을 떄의 애니메이션 상태를 초기 애니메이션 상태 + 중간에 추가된 애니메이션들의 초기 상태 값으로 만들어주면 자연스러운 애니메이션이 만들어진다.

- [CSS 애니메이션 사이트](https://animista.net/)

- %의 비율 분할은 자유롭게 진행 가능하다.

- keyframes 내의 property들은 transform 이외에도 자유롭게 입력 가능하지만, 애니메이션으로 적용이 되지 않는 property들도 존재하기 때문에 transform을 권장한다.

- 100% 애니메이션에 opacity:0 프로퍼티를 넣으면 애니메이션 대상이 자연스럽게 사라지는 연출을 할 수 잇슴.

### Media Query

- media query란? -> CSS만을 이용해서 스크린 사이즈를 알 수 있는 방법.

- 핸드폰 또는 스크린사이즈가 이 정도 크기라면 어떨지 CSS를 보여주라!

```html
<style>
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    div {
      background-color: wheat;
    }
  }
</style>
```

- 스크린 width가 600~1200일 때 div의 background-color를 wheat으로 설정!

```html
<style>
  @media screen and (min-width: 601px) and (orientation: landscape) {
    span {
      display: none;
    }
  }
</style>
```

```html
<body>
  <span>Please flip Your phone</span>
</body>
```

- span 내의 텍스트를 orientation이 landscape모드일 때 사라지게 하겠다 !

  1. orientation은 화면이 가로 또는 세로모드일 상태를 지정한다.

  2. landscape -> 가로 , portrait -> 세로

* min-device-width -> (only phone, 데스크탑 브라우저는 이해못함)

* CSS Media query MDN 검색!!

### media type -> print

```html
<style>
  @media print {
    body {
      background-color: tomato;
    }
  }
</style>
```

- ctrl + p -> 인쇄 상태의 브라우저를 확인
