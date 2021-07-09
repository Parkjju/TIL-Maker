---
layout: post
navigation: True
title: gitignore 설정
class: post-template
subclass: "post tag-python"
author: parkjju
---

- 특정파일을 깃헙 레포에 업로드하기 싫음(예 - .DS_store 파일, 맥 os전용)

- 모든 커밋에서 해당 파일을 무시하기가 쉽지 않음 -> **gitignore이용!** -> 무시하고 싶은 파일들을 기억!

```.gitignore
.DS_Store
/screenshots
```

- 파일 및 폴더명을 통해 무시

* [생활코딩 - .gitignore: 파일무시방법](https://www.youtube.com/watch?v=XPGiVhdlS8Y)
  - 쓸모없는 파일도 버전관리 시스템에 의해 감지되게 되어있음.
  - .gitignore -> git에서 없는 것으로 취급할 파일들이 적여있는 리스트
  - 사용중인 에디터, 프레임워크, 개발환경 등에 따라 ignore할 파일 목록이 다 같기때문에 이를 제공하는 ignore사이트가 뜸
  - [gitignore.io](https://www.toptal.com/developers/gitignore)

```bash
$git add ha.md
The following paths are ignored by one of your .gitignore files:
ha.md
```

- ha.md라는 파일 생성 및 ignore목록에 추가한 뒤(.gitignore 파일은 커밋상태) add 시도해보니 해당 메세지 출력됨
