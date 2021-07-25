function rotate(e) {
  const name = "down";
  const doc = document.getElementsByClassName("menu-bar");
  const name2 = "active";
  const group = document.getElementsByClassName("sidebar-group");
  const arrowGroup = document.getElementsByClassName("fa-caret-right");
  a = e.children;
  b = e.parentNode;
  if (a[1].classList.contains(name)) {
    a[1].classList.remove(name);
    // doc[0].style.height = "100vh";
    b.classList.remove(name2);
  } else {
    for (var i = 0; i < group.length; i++) {
      if (group[i].classList.contains("active")) {
        group[i].classList.remove("active");
        arrowGroup[i].classList.remove("down");
        // group[i].nextElementSibling.classList.remove("show");
        $(".show").collapse("hide");
      }
    }
    a[1].classList.add(name);
    doc[0].style.height = "95vh";
    b.classList.add(name2);
  }
}
