---
layout: post
navigation: True
title: Vue js기초 - 인프런 캡틴판교님
class: post-template
subclass: "post tag-python"
author: parkjju
---

## 1. Vue js 소개

### 1.1 MVVM 모델에서의 vue

-   Vue란? - MVVM패턴의 뷰모델 레이어에 해당하는 화면단 라이브러리
-   html요소에서 사용자에게 이벤트를 받음 (DOM Listener) -> Model로 넘어가 자바스크립트 상에서 조작 -> DataBindings를 통해 view에 반영

### 1.2 기존 웹 개발 방식 (HTML - js만 이용)

```html
<div id="app"></div>

<script>
    // console.log(div);
    var div = document.querySelector("#app");
    var str = "hello world";
    div.innerHTML = str;
    str = "hello world!!!";
    div.innerHTML = str;
</script>
```

-   id app을 가진 div태그를 받아서 문자열을 수정하고 싶을때 기존 웹 개발 방식에서는 **문자열 수정 코드를 한번 더 기입 해줘야했다.** -> 위의 예시 코드에서 `str = "hello world!!!";`로 str값을 수정해도, `div.innerHTML`로 DOM에 대한 값을 한번 더 수정해줘야함.

### 1.3 Reactivity 구현

-   Reactivity는 vue의 핵심 기능!
-   Reactivity의 구현은 Object객체의 defineProperty() 메소드를 이용한다.

```html
<body>
    <div id="app"></div>

    <script>
        var div = document.querySelector("#app");
        var viewModel = {};

        // Object.defineProperty('대상 객체', '객체의 속성', {
        //     정의할 내용
        // })
        Object.defineProperty(viewModel, "str", {
            // 속성에 접근했을 때의 동작을 정의
            get: function () {
                console.log("접근");
            },
            // 속성에 값을 할당했을 때의 동작을 정의
            set: function (newValue) {
                console.log("할당", newValue);
                div.innerHTML = newValue;
            },
        });
    </script>
</body>
```

-   Object.defineProperty()는 객체의 기본 속성을 **재 정의한다.**

    -   a. 객체의 할당, 접근이라는 기본 속성을 재 정의하기 위해 get, set을 이용한다.
    -   b. get은 접근, set은 할당

-   `Object.defineProperty(viewModel, "str", {})` -> viewModel 객체의 str속성에 접근할 {} 행동으로 객체 속성을 재 정의

### 1.4 Reactivity 코드 라이브러리화 하기

-   코드의 라이브러리화를 위해 즉시 실행 함수 표현을 이용한다.
-   [즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression)](https://developer.mozilla.org/ko/docs/Glossary/IIFE)

```js
(function () {
    statements;
})();
```

-   `(function (){})` -> 익명 함수 (Anonymous Function)
    1. IIFE 내부에서 선언하는 변수를 통해 전역 범위에서의 불필요한 변수 선언을 없앤다.
    2. IIFE 내부로 다른 변수들이 접근하는 것을 막아준다.
-   `...();` -> 즉시 실행 함수를 생성하는 괄호

```js
(function () {
    var Name = "Barry";
})();
Name;
// throws "uncaught ReferenceError : Name is not defined
```

```js
var result = (function () {
    var name = "barry";
    return name;
})();
result; //barry
// barry를 return하는 IIFE가 변수에 저장되는 것이 아니라, 함수 실행 결과만 저장된다.
```

```html
<script>
    var div = document.querySelector("#app");
    var viewModel = {};
    // IIFE에 함수들 집어넣기
    (function () {
        // init함수 추가
        function init() {
            Object.defineProperty(viewModel, "str", {
                get: function () {
                    console.log("접근");
                },
                set: function (newValue) {
                    console.log("할당", newValue);
                    render(newValue);
                },
            });
        }
        // render함수 추가
        function render(value) {
            div.innerHTML = value;
        }
        // init실행
        init();
    })();
</script>
```

## 2. 인스턴스

### 2.1 인스턴스 소개

-   인스턴스란 뷰로 개발할 때 필수로 생성해야하는 코드 (객체지향 언어에서 클래스 내의 함수 및 변수)

```js
new Vue();

var vm = new Vue();
console.log(vm);
// vm을 로그로 찍어서 인스턴스 내에 속성과 API를 확인해볼 수 있다.
```

#### 2.1.1 생성자 함수 만들기

-   암묵적인 합의 내용 -> 함수의 이름 첫 글자를 대문자로 한다.

```js
function Person(name, job) {
    this.name = name;
    this.job = job;
}
new Person("josh", "doctor");
var p = Person("josh", "developer"); // 객체 생성 및 저장
```

-   모든 객체는 자신의 prototype으로부터 constructor 속성을 상속한다.

```text
프로토타입(prototype)이란?
Javascript는 프로토타입 기반 언어이다. (클래스가 ECMA6에 와서 문법적으로 추가되었지만, 여전히 프로토타입 기반)
JS의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어있는데,
이러한 부모 객체를 프로토타입(Prototype) 객체 또는 프로토타입이라고 한다.

자식 관계에 있는 객체가 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 됨.
```

**vue를 생성자 함수 형태로 저장하는 이유?**

-   객체 사용시 매번 함수를 정의하는 것이 아니라, 인스턴스로 저장되어 있는 함수를 불러다가 사용하기 위해

```js
function Vue() {
    this.logText = function () {
        console.log("hello");
    };
}
var vm = new Vue();
vm.logText(); // hello
```

-   [Cracking Vue.js 인스턴스 라이프사이클 다이어그램 & 사이프사이클 훅](https://joshua1988.github.io/vue-camp/vue/life-cycle.html)

## 3. 컴포넌트

-   뷰 컴포넌트 -> 화면을 영역별로 나누어 관리한다.
-   컴포넌트의 적용을 통해 재사용성을 확대
-   컴포넌트 생성시 각 컴포넌트간에 관계가 생긴다.
-   인스턴스 생성시 기본적으로 루트 컴포넌트가 된다.

*   컴포넌트 등록하기

```html
<body>
    <div id="app">
        <app-header></app-header>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        //전역 컴포넌트
        Vue.component("app-header", {
            template: "<h1>Header</h1>",
        });
        new Vue({
            el: "#app",
        });
    </script>
</body>
```

-   `Vue.component('컴포넌트 이름', { statements... 컴포넌트 내용})`
-   위 코드에서 컴포넌트로 app-header를 생성한 뒤, 해당 컴포넌트는 `<h1>Header</h1>`라는 역할을 하도록 만들었다.
-   이후 html상에 일반 태그를 이용하는 것 처럼 `<app-header></app-header>` 사용하면 컴포넌트가 적용된다. (chrome inspect에서 확인하기)
-   위 코드는 **전역 컴포넌트임.**

### 3.1 지역 컴포넌트 등록

-   서비스 개발 시 가장 자주 사용하게 됨.
-   Vue 인스턴스 생성시 `components` 속성으로 지역 컴포넌트를 등록한다. (전역컴포넌트와 구조가 동일)

```html
<script>
    // 전역 컴포넌트 등록 방식
    Vue.component("app-header", {
        template: "<h1>Header</h1>",
    });
    // 전역 컴포넌트 등록 방식
    Vue.component("app-content", {
        template: "<div>content</div>",
    });

    // 지역 컴포넌트 등록 방식
    new Vue({
        el: "#app",
        components: {
            // '컴포넌트 이름 : 컴포넌트 내용'
            "app-footer": {
                template: "<footer>footer</footer>",
            },
        },
    });
</script>
```

**전역 컴포넌트와 지역 컴포넌트의 차이점?**

-   SPA 프레임워크로써, 한 페이지에 다양한 기능을 가진 앱들 (component들)을 만들기 위해 지역 컴포넌트를 이용하는 것이고, 전역컴포넌트를 이용하는 경우는 라이브러리화 하여 전역적 범위에서 서비스가 이용해야하는 기능 또는 플러그인들을 정의할 때 사용한다.

### 3.2 컴포넌트와 인스턴스의 관계

```html
<script>
    new Vue({
        el: "#app",
        components: {
            // '컴포넌트 이름 : 컴포넌트 내용'
            "app-footer": {
                template: "<footer>footer</footer>",
            },
        },
    });

    new Vue({
        el: "#app2",
        components: {
            "app-footer": {
                template: "<h1>hello</h1>",
            },
        },
    });
</script>
```

-   위와같이 인스턴스를 두개 생성하였을 때, `#app` 인스턴스에서 이용중인 지역 컴포넌트 app-footer를 `#app2` 인스턴스에서 이용하는 것은 불가능하다. 새로운 인스턴스(#app2)를 생성하여 `#app2`의 지역 컴포넌트를 따로 생성해줘야함.

### 3.3 컴포넌트 통신 방식

-   뷰 컴포넌트는 각각 고유한 데이터 유효 범위를 갖는다.
-   컴포넌트들을 생성하면 각 컴포넌트는 서로 관계가 만들어진다.
-   컴포넌트의 관계를 활용하려면 규칙을 정확히 알아야한다. 이 규칙이 바로 컴포넌트 통신 방식이다.
-   [Cracking Vue.js - Component communication](https://joshua1988.github.io/vue-camp/vue/components-communication.html)
-   상위에서 하위 컴포넌트로 데이터 이동 -> props속성을 이용
-   하위에서 상위 컴포넌트로 데이터 이동 -> 이벤트 발생이라는 데이터 전달 방식 이용

**컴포넌트 통신 규칙이 필요한 이유**

-   컴포넌트 간에 통신이 시작되면서, 데이터의 입력으로 다양한 컴포넌트들이 유기적으로 값에 변화를 주게 된다. 이러한 상황에서 컴포넌트 통신 규칙이 중요하다.
    1. MVC 패턴에서의 문제점 -> n방향 컴포넌트들은 데이터 전달중에 발생한 버그를 추적하는 데에 어려움이 존재한다.
    2. Vue 컴포넌트 통신 방식이라는 규칙을 통해, 데이터를 부모객체로부터 자식 객체라는 단방향 흐름으로 확정짓게 되면 데이터 전달 중에 발생한 버그를 추적하는 데에 어려움이 적어진다. (자식 객체에서 올라가는 데이터 -> Event, 부모 객체에서 자식으로 -> Props)

### 3.4 Props 속성

```html
<body>
    <div id="app">
        <app-header v-bind:propsdata="message"></app-header>
    </div>
</body>
<script>
    var appHeader = {
        template: "<h1>header</h1>",
        props: ["propsdata"],
    };
    new Vue({
        el: "#app",
        components: {
            "app-header": appHeader,
        },
        data: {
            message: "hi",
        },
    });
</script>
```

1. Vue 인스턴스를 message속성과 함께 생성한다. (인스턴스는 루트 컴포넌트가 된다)
2. 자식 컴포넌트를 생성하여 props 속성을 추가한다.
3. html상에서 props 문법을 적용한다. `<compName v-bind:props속성의 이름 = "상위 컴포넌트의 data 이름"></compName>`
4. inspect해보면, 자식 컴포넌트에 상위 컴포넌트의 데이터가 들어있는 것을 확인할 수 있다.

**Props 속성의 특징**

-   상-하위 컴포넌트 데이터 전달 중에 Reactivity가 그대로 구현된다. (하위 컴포넌트에서 props로 데이터를 받고 있는 상황에서, 상위 컴포넌트의 데이터를 변경하면 변경사항이 바로 반영됨.)

### 3.5 Event emit

```html
<body>
    <div id="app">
        <app-Header></app-Header>
    </div>
    <script>
        var appHeader = {
            template: '<button v-on:click="passEvent">Click me</button>',
            methods: {
                passEvent: function () {
                    this.$emit("pass");
                },
            },
        };
        new Vue({
            el: "#app",
            components: {
                "app-header": appHeader,
            },
        });
    </script>
</body>
```

1. 인스턴스를 생성하고, 자식 컴포넌트도 생성한다.
2. 자식 컴포넌트의 템플릿에 `v-on:click: methodName`을 준다.
    - a. `<button v-on:click="methodName"></button>`
3. 자식 컴포넌트의 템플릿에 전달할 메소드를 정의한다.

```js
methods:{
    methodName: function(){
        alert("event received!");
    }
}
```

-   v-on:click을 통해 하위 컴포넌트에서 이벤트를 pass라는 이름으로 발생시킨다. `this.$emit("pass")`
-   상위 컴포넌트 입장에서 하위 컴포넌트가 발생시킨 이벤트를 잡아주는 작업을 추가로 진행해야한다. `v-on:하위 컴포넌트에서 발생한 이벤트 이름 = "상위 컴포넌트의 메서드 이름"`

```html
<script>
    // 루트 컴포넌트
    new Vue({
        el: "#app",
        components: {
            "app-header": appHeader,
        },
        methods: {
            logText: function () {
                console.log("hi");
            },
        },
    });
</script>
```

### 3.6 뷰 컴포넌트에서의 this

```js
var obj = {
    num: 10,
    getNumber: function () {
        console.log(this.num);
    },
};
```

```js
new Vue =({
    methods:{
        getNumber: function(){
            console.log(this.num);
        }
    },
    el: '',
    data:{
        num: 10,
    }
})
```

-   첫 번째 예제코드 -> pure js기반. this로 객체의 속성 하나를 불러오고 있음.
-   두 번째 예제코드 -> vue 인스턴스를 생성하여 this로 data값을 출력하고있음.
    -   `this.data.num`이 아니라, `this.num`만 하면 된다.

## 4. 컴포넌트 통신 방법 - 응용

### 4.1 같은 컴포넌트 레벨 간의 통신 방법

-   간단한 트리 구조를 생각하면 된다.
<figure>
<img src="./assets/images/components.jpg" height="80%" width="80%"/>
<figcaption>같은 레벨에서 컴포넌트 통신 방법</figcaption>
</figure>

-   트리 구조라고 생각했을 때, 같은 레벨의 노드끼리 횡적으로 연결된 상태가 아니기 때문에 **부모 노드를 거쳐 형제 노드로 데이터를 전달해야한다.**
-   따라서, 상위로 넘어갈 때 event를 발생시키고, 부모노드에서 자식 노드로 내려갈 때 props 프로퍼티를 이용한다.

```html
<body>
    <div id="app">
        <app-header v-bind:propsdata="num"></app-header>
        <app-content v-on:pass="deliverNum"></app-content>
    </div>
</body>
<script>
    var appHeader = {
        props: ["propsdata"],
        template: "<div>header</div>",
    };
    var appContent = {
        template:
            "<div>content<button v-on:click='passNum'>pass</button></div>",
        methods: {
            passNum: function () {
                this.$emit("pass", 10);
            },
        },
    };
    new Vue({
        el: "#app",
        components: {
            "app-header": appHeader,
            "app-content": appContent,
        },
        data: {
            num: 0,
        },
        methods: {
            deliverNum: function (value) {
                this.num = value;
            },
        },
    });
</script>
```

### 4.2 컴포넌트 통신 흐름 정리 (같은 레벨의 컴포넌트)

1. app-header 컴포넌트에서 app-Content 컴포넌트로 데이터를 보낸다고 가정
2. app-header 컴포넌트에서 상위 컴포넌트인 인스턴스로 데이터를 먼저 보낸다.
    - a. app-header 컴포넌트에 `this.$emit('전달하는 이벤트 명', data)`로 methods 프로퍼티 추가
    * b. html의 컴포넌트에 v-on 추가 `<app-header v-on:"상위 컴포넌트로 전달할 이벤트 명"="상위 컴포넌트에서 받을 메소드 명"></app-header>
    * c. 상위 컴포넌트에서 methods 프로퍼티를 추가한다. `methods: {상위 컴포넌트에서 받을 메소드 명 - function...}`
3. app-content 컴포넌트에서 props프로퍼티로 데이터 받기
    - d. html 컴포넌트중 데이터를 내려받을 컴포넌트에 `<app-content v-bind:propsdata="component methods "></app-content> 추가. (v-bind:내려받을 데이터 props프로퍼티 이름 = "상위 컴포넌트에서 데이터를 전달할 메소드 이름")

## 5. 라우터

### 5.1 뷰 라우터 소개와 설치

-   뷰 라우터란? SPA를 구현하거나, 페이지 간 이동하는 기능을 구현할 때 이용하는 라이브러리

-   설치
    1. Vue CDN, Vue Router CDN 등록
    2. Vue 인스턴스와 Vue Router 인스턴스 두개 생성

```html
<script>
    new VueRouter({});
    new Vue({
        el: "#app",
    });
</script>
```

### 5.2 뷰 라우터 인스턴스 연결 및 초기 상태

```html
<script>
    var router = new VueRouter({});
    new Vue({
        el: "#app",
        router: router,
    });
</script>
```

-   뷰 라우터 인스턴스 생성 후 변수에 할당
-   Vue인스턴스의 router 프로퍼티에 주입

<figure>
<img src="./assets/images/vueRouter.png" height="80%" width="80%" />
<figcaption>라우터가 뷰 인스턴스에 주입된 상황</figcaption>
</figure>

```html
<script>
    var LoginComponent = {
        template: "<div>login</div>",
    };
    var MainComponent = {
        template: "<div>main</div>",
    };
    var router = new VueRouter({
        // 페이지의 라우팅 정보
        routes: [
            {
                // 페이지의 url
                path: "/login",
                //해당 url에서 표시될 컴포넌트
                component: LoginComponent,
            },
            {
                path: "/main",
                component: MainComponent,
            },
        ],
    });

    new Vue({
        el: "#app",
        router: router,
    });
</script>
```

-   routes 프로퍼티 이용하기
    1. routes프로퍼티에는 페이지 당 객체 하나가 할당된다.
    2. 객체 내에 정의하는 프로퍼티로 path, component 등이 있다.
    3. path는 페이지의 url을 의미하고, component는 해당 url에서 표시될 컴포넌트를 의미한다.

### 5.3 라우터가 표시되는 영역 및 router-view 태그 설명

```html
<body>
    <div id="app">
        <router-view></router-view>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script>
        var LoginComponent = {
            template: "<div>login</div>",
        };
        var MainComponent = {
            template: "<div>main</div>",
        };
        var router = new VueRouter({
            // 페이지의 라우팅 정보
            routes: [
                {
                    // 페이지의 url
                    path: "/login",
                    //해당 url에서 표시될 컴포넌트
                    component: LoginComponent,
                },
                {
                    path: "/main",
                    component: MainComponent,
                },
            ],
        });

        new Vue({
            el: "#app",
            router: router,
        });
    </script>
</body>
```

1. html상에 라우터 컴포넌트가 표시될 영역에 `<router-view></router-view>` 태그로 감싼다.
2. 이후 라우터 프로퍼티에 정의한 객체의 path프로퍼티에 따라 url을 수정하면 해당 컴포넌트 객체 (페이지)에 맞는 템플릿이 표시된다.

<figure>
<img src="./assets/images/routerIndex.png" height="80%" width="80%"/>
<figcaption>router-view만 등록해놓은 메인페이지</figcaption>
<img src="./assets/images/routerLogin.png" height="80%" width="80%" /> 
<figcaption>라우터 로그인 컴포넌트 표시(url확인)</figcaption>
</figure>

### 5.4 링크를 이용한 페이지 이동 및 router-link 태그 설명

-   url을 통한 페이지의 이동이 아니라, 링크를 통해 이동하는 방법에 대해 설명

```html
<body>
    <div id="app">
        <div>
            <router-link to="/login">Login</router-link>
            <router-link to="/main">Main</router-link>
        </div>
        <router-view></router-view>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script>
        var LoginComponent = {
            template: "<div>login</div>",
        };
        var MainComponent = {
            template: "<div>main</div>",
        };
        var router = new VueRouter({
            mode: "history",
            // 페이지의 라우팅 정보
            routes: [
                {
                    // 페이지의 url
                    path: "/login",
                    //해당 url에서 표시될 컴포넌트
                    component: LoginComponent,
                },
                {
                    path: "/main",
                    component: MainComponent,
                },
            ],
        });

        new Vue({
            el: "#app",
            router: router,
        });
    </script>
</body>
```

-   mode:history 프로퍼티로 깔끔한 url을 만들 수 있다.

*   html상에서 이동할 라우터 컴포넌트에 `<router-link to="/routerLink"></router-link>`를 추가해준다.
*   router-link to="pathName"
*   위의 코드가 잘 작동하기 위해서는, **path가 등록되어 있는 라우터 인스턴스가 Vue인스턴스에 router프로퍼티로 연결되어있어야한다**
*   router인스턴스 내에서 routes 프로퍼티의 페이지 객체에 기입하는 component는 **components가 아니라, component이다. (페이지마다 뿌려지는 컴포넌트는 하나이기 때문)**

## 6. 액시오스

### 6.1 Ajax

-   비동기 웹 어플리케이션 제작을 위해 사용하는 웹 개발 기법이다. (Asynchronous JavaScript and XML)

1. 표현 정보를 위한 HTML과 CSS
2. 동적인 화면 출력 및 표시 정보와의 상호작용을 위한 DOM - JS
3. 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 XML, XSLT, XMLHttpRequest

-   새로운 웹 페이지를 가공하여 전달하는 것이 아니라, 필요한 데이터만 전달 및 가공후 로드

### 6.2 axios소개

-   Vue에서 공식적으로 라이브러리 관리를 하지는 않지만, axios Http통신 라이브러리가 vue 커뮤니티 상에서 가장 널리 사용된다.

-   자바스크립트 비동기 처리 패턴
    1. callback
    2. promise
    3. promise + generator
    4. async & await

### 6.3 axios 실습

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    new Vue({
        el: "#app",
        data: {
            users: [],
        },
        methods: {
            getData: function () {
                var vm = this;
                axios
                    .get("https://jsonplaceholder.typicode.com/users/")
                    .then(function (response) {
                        console.log(response.data);
                        vm.users = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    });
</script>
```
