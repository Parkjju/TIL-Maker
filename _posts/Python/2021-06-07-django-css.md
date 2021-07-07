---
layout: post
navigation: True
title: How to add css to django application
class: post-template
subclass: "post tag-python"
author: parkjju
---

- [참고자료](https://www.vitoshacademy.com/python-django-how-to-add-css-to-django-application/)

1. settings.py 하위에 해당 코드 작성
   - STATIC_URL 부분은 이미 작성되어있음
   * import os 필요

```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'),]
```

2. django 앱의 폴더에 static이라는 이름으로 폴더를 생성
3. templates 폴더의 html파일로 가서 템플릿 언어 작성
   - html파일 맨 위에 작성 (DOCTYPE뒤에)

```html
{% raw %} {% load static %} {% endraw %}
```

4. head태그에 템플릿 언어로 링크 추가
   - "% static '경로' %"

```html
<head>
  {% raw %}
  <link rel="stylesheet" href="{% static 'css/style.css' %}" />
  {% endraw %}
</head>
```
