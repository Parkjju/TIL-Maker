---
layout: post
navigation: True
title: Django class-based view
class: post-template
subclass: "post tag-python"
author: parkjju
---

- [Django document - Class-based views](https://docs.djangoproject.com/en/3.2/topics/class-based-views/)

## Class-based views

- A view is a callable which takes a request and returns a response. This can be more than just a function, and Django provides an example of some classes which can be used as views. These allow you to structure your views and reuse code by harnessing inheritance and mixins. There are also some generic views for tasks which we’ll get to later, but you may want to design your own structure of reusable views which suits your use case. For full details, see the class-based views reference documentation.

* view는 요청을받고 응답을 반환한다. Django는 함수르 넘어 뷰로 사용될 수 있는 클래스도 제공한다. 클래스형 뷰는 뷰를 구조화하고, 상속과 mixin 기술에 있어서 부담없이 코드를 재사용 할 수 있다.

* [Django built-in class-based views API](https://docs.djangoproject.com/en/3.2/ref/class-based-views/)

## Introduction to class-based views

- [Django document - Introduction to class-based views](https://docs.djangoproject.com/en/3.2/topics/class-based-views/intro/)

* Class-based views provide an alternative way to implement views as Python objects instead of functions. They do not replace function-based views, but have certain differences and advantages when compared to function-based views:
  Organization of code related to specific HTTP methods (GET, POST, etc.) can be addressed by separate methods instead of conditional branching.
  Object oriented techniques such as mixins (multiple inheritance) can be used to factor code into reusable components.

- 클래스 기반 뷰는 함수 대신 파이썬 객체로 뷰를 구현할 수 있게 해준다. 함수 기반 뷰의 완전 대체재가 아니고, 둘 사이는 차이점이 존재한다.

1. 특정 HTTP메소드 (GET, POST등)를 처리하는 코드 구성에 있어 if문 대신 별도의 메소드로 처리할 수 있다.
2. mixins(multiple inheritance)와 같은 객체지향 기술이 재사용 가능한 구성요소의 코드로 사용될 수 있다.

## The relationship and history of generic views, class-based views, and class-based generic views

- **generic view**란, django에서 기본적으로 제공하고 있는 뷰를 뜻함. 개발시 자주 등장하는 내용을 모아놓은 뷰
- function-based view가 처음으로 구현되기 시작하면서 코드들에 대해 상당한 수준의 abstract를 진행하였다.
- function-based view는 단순한 사례를 잘 다루긴 했지만 일부 옵션에 대해 확장하거나 커스터마이징 할 수 없어서 실제 어플리케이션 개발에 있어서 실용성이 떨어진다는 단점이 존재

- 이에 따라 function-based view로 고안된 객체에 대해 class-based generic view가 개발되면서 뷰 개발이 한층 쉬워짐

## Using class-based view

- The code to handle HTTP GET method in a view function

```python
from django.http import HttpResponse

def my_view(request):
    if request.method == 'GET':
        # <view logic>
        return HttpResponse('result')
```

- class-based view

```python
from django.http import HttpResponse
from django.views import View

class MyView(View):
    def get(self, request):
        # <view logic>
        return HttpResponse('result')
```

- Django urls.py에 클래스형 뷰를 전달하는데, as_view()라는 클래스 메소드를 전달해야한다.
- as_view 메소드는 urlpatterns의 URL과 매칭되는 요청을 받을 때 호출할 수 있는 함수이다.
- as_view는 class내에 setup()인스턴스를 생성한다. setup()은 attributes를 초기화하고 dispatch() 메소드를 호출한다.
- dispatch()는 HTTP메소드가 GET인지 POST인지 판단하고, 매칭되면 해당 메소드로 요청을 relay(중계)하거나 매핑되지 않으면 `HttpResponseNotAllowed`를 발생시킨다.

```python
# urls.py
from django.urls import path
from myapp.views import MyView

urlpatterns = [
    path('about/', MyView.as_view()),
]
```

- 간단한 클래스기반 뷰를 작성할때는 class attribute가 필요하지 않지만, class attribute는 다양한 class-based view에서 사용된다.

- way to configure or set class attribute 1

```python
from django.http import HttpResponse
from django.views import View

class GreetingView(View):
    greeting = "Good Day" # greeting이라는 클래스 속성을 작성함

    def get(self, request):
        return HttpResponse(self.greeting)
```

- greeting이라는 클래스 속성을 서브클래스에서 오버라이드한다.

```python
class MorningGreetingView(GreetingView):
    greeting = "Morning to ya"
```

- way to configure or set class attribute 2
- 클래스 속성을 as_view()메소드의 키워드로 전달한다. (urlpatterns에서)

```python
urlpatterns = [
    path('about/', GreetingView.as_view(greeting="G'day")),
]
```

## Using mixins

- mixins는 다수의 부모 클래스가 결합되어 메소드 및 속성을 상속받는 것을 말함
- generic class-based view에는 **TemplateResponseMixin**이라는 mixin이 있다. 이는 render_to_response()라는 메소드를 정의하는데에 사용됨.

## 실습 - 인프런 Django & vue

- 클래스기반 뷰 정의 - **RedirectView를 제외한 모든 generic view에 template_name속성이 사용된다.** 따라서 클래스 정의 후 가장 먼저 작성
- 이후 각 뷰에 필요한 속성들을 오버라이딩

```python
# todoapp/views.py
from django.views.generic import TemplateView, CreateView, ListView, DeleteView

class TodoVueOnlyTV(TemplateView):
    template_name = 'todo/todo_vue_only.html'

class TodoCV(CreateView):
    template_name = 'todo/todo_form.html'

class TodoLV(ListView):
    template_name = 'todo/todo_list.html'

class TodoDelV(DeleteView):
    template_name = 'todo/todo_confirm_delete.html'
```
