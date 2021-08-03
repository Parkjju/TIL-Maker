---
layout: post
navigation: True
title: Django setting
class: post-template
subclass: "post tag-python"
author: parkjju
---

# Mac OS 세팅

1. python 3.7XX 이상 버전 설치 - `brew install python`
2. git 설치 - `brew install git`, `git --version`
3. git config file 세팅
   - a. `git config --global user.name "git계정 이름"`
   - b. `git config --global user.email "email 주소"`
   - c. `git config --list` - 설정파일 확인
4. vscode (pycharm) 설치

- [참고 - How to set Python3 as a default python version on MacOS](https://dev.to/malwarebo/how-to-set-python3-as-a-default-python-version-on-mac-4jjf)

## Django 시작하기

1. vscode - 새 터미널, git bash선택
2. 가상환경 켜기 - `python -m venv virtual-name`
3. activate 실행 - `source myvenv/bin/activate`
4. Django 설치 - `pip install django`
5. Django 프로젝트 생성 - `django-admin startproject projectname`
6. cd projectFolder
7. python manage.py runserver
