const titleNew = $(":header");
const boxNew = document.getElementsByClassName("main-post--titleLink");

(function () {
  var timer;
  $(window).bind("scroll", function () {
    clearTimeout(timer);
    timer = setTimeout(refresh, 150);
  });
  var refresh = function () {
    const currentPosition = document.documentElement.scrollTop;
    const maxScroll = $(document).height() - $(window).height();
    for (var i = 1; i < title.length - 1; i++) {
      if (
        titleNew[i].offsetTop <= currentPosition &&
        titleNew[i + 1].offsetTop > currentPosition
      ) {
        boxNew[0].childNodes[i - 1].style.color = "black";
      } else {
        if (boxNew[0].childNodes[i - 1].style.color === "black") {
          boxNew[0].childNodes[i - 1].style.color = "#858e96";
        }
      }
    }
    if (currentPosition === maxScroll) {
      boxNew[0].childNodes[boxNew[0].childNodes.length - 1].style.color =
        "black";
      boxNew[0].childNodes[boxNew[0].childNodes.length - 2].style.color =
        "#858e96";
    } else {
      boxNew[0].childNodes[boxNew[0].childNodes.length - 1].style.color =
        "#858e96";
    }
  };
})();
