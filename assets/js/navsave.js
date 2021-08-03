// !!!!!!!!!!!!!save without formatting!!!!!!!!!!!!!!

// 1. title = $(":header") -> 타이틀태그 전체 얻어냄.
// 2. box = document.getElementsByClassName("main-post--titleLink")
// 3. link = document.createElement('a')
// 4. link.href = ?
// 5. link.innerText = "#"

// id를 공략하자.
// 1. link.href = "#" + title[1].id
// 2. title[0].prepend()

// link = document.creatElement('a') -> a태그 생성
// link.append(title[0].innerText) -> a태그에 text 삽입 -> box에 삾입
// titlebox[0].appendChild(link) -> titlebox[0]은 링크박스, 링크박스에 link노드 삽입
// link.href = ""

var box = document.getElementsByClassName("main-post--titleLink");
var title = $(":header");

function titleLink() {
  for (var i = 0; i < title.length; i++) {
    var link = document.createElement("a");
    link.innerText = "#";
    if (i === 0) {
      continue;
    }
    link.href = "#" + title[i].id;

    title[i].prepend(link);
    title[i].style.position = "relative";
    title[i].style.left = "-1rem";
  }
}

function titleBoxLink() {
  for (var i = 0; i < title.length; i++) {
    var link = document.createElement("a");

    if (i === 0) {
      continue;
    }
    link.style.display = "block";
    link.style.height = "auto";
    link.href = "#" + title[i].id;
    link.innerText = title[i].innerText;
    link.style.lineHeight = "0.9rem";
    if (title[i].tagName === "H3") {
      link.style.position = "relative";
      link.style.left = "0.5rem";
    } else if (title[i].tagName === "H4") {
      link.style.position = "relative";
      link.style.left = "1rem";
    } else if (title[i].tagName === "H5") {
      link.style.position = "relative";
      link.style.left = "1.5rem";
    } else if (title[i].tagName === "H6") {
      link.style.position = "relative";
      link.style.left = "2rem";
    }

    link.style.marginBottom = "0.5rem";
    box[0].appendChild(link);
  }
}
titleBoxLink();
titleLink();

function addHeight() {
  for (var i = 0; i < box[0].length; i++) {
    box[0].style.height += box[0].childNodes[i].offsetHeight;
  }
}
if (box[0].offsetHeight > 320) {
  box[0].style.height = "20rem";
}

addHeight();
