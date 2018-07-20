var totalImages, totalSlides;
var autoSlide = 0;
var clickedImage;
var interval1, interval;
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i)
) {
  document.addEventListener("DOMContentLoaded", mainCall);
}

function mainCall() {
  totalImages = document.querySelectorAll("li.img");
  for (var i = 0; i < totalImages.length; i++) {
    totalImages[i].style.zIndex = totalImages.length - i;
    totalImages[i].id = "img" + i;
    totalImages[i].addEventListener("touchstart", pause);
    totalImages[i].addEventListener("touchend", play);
    totalImages[i].addEventListener("click", imgClick);
  }
  progressBar();
  totalSlides = document.querySelectorAll(".slides li");
  for (var j = 0; j < totalSlides.length; j++) {
    totalSlides[j].id = "li" + j;
    //totalSlides[j].addEventListener("click", imgClick);
  }
}

interval = setInterval(function() {
  console.log("1");
  if (autoSlide < totalImages.length) {
    autoslideImg(autoSlide);
    autoSlide++;

    if (autoSlide == totalImages.length) {
      autoSlide = 0;
    }
  }
}, 3000);

function autoslideImg(autoSlideCnt) {
  var index = autoSlideCnt;
  var currentImg = totalImages[index];
  var topval = index + 1;
  if (currentImg.parentNode.classList.contains("slides")) {
    topval = index;
  }
  if (topval >= totalImages.length) {
    changeBar(0);
  } else {
    changeBar(topval);
  }
  for (var i = 0; i < totalImages.length; i++) {
    if (index == i) {
      totalImages[i].style.zIndex = 1;
    } else if (i < index) {
      totalImages[i].style.zIndex = topval - i;
    }
  }
  for (var j = 0; j < totalImages.length; j++) {
    var indexVal = j + topval;
    if (typeof totalImages[indexVal] != "undefined") {
      totalImages[indexVal].style.zIndex = totalImages.length - j;
    }
  }
}

function pause() {
  clearInterval(interval);
  clearInterval(interval1);
}

function play() {
  interval1 = setInterval(function() {
    console.log("2");
    if (autoSlide < totalImages.length) {
      autoslideImg(autoSlide);
      autoSlide++;

      if (autoSlide == totalImages.length) {
        autoSlide = 0;
      }
    }
  }, 3000);
}

function imgClick() {
  clearInterval(interval);
  autoSlide++;
  var currentImg = this;
  var regex = /\d+/g;
  var index = parseInt(currentImg.id.match(regex));
  var topval = index + 1;
  if (currentImg.parentNode.classList.contains("slides")) {
    topval = index;
  }
  if (topval >= totalImages.length) {
    changeBar(0);
  } else {
    changeBar(topval);
  }
  for (var i = 0; i < totalImages.length; i++) {
    if (index == i) {
      totalImages[i].style.zIndex = 1;
    } else if (i < index) {
      totalImages[i].style.zIndex = topval - i;
    }
  }
  for (var j = 0; j < totalImages.length; j++) {
    var indexVal = j + topval;
    if (typeof totalImages[indexVal] != "undefined") {
      totalImages[indexVal].style.zIndex = totalImages.length - j;
    }
  }
  clearInterval(interval1);
  play();
}

function progressBar() {
  var dicEle = document.createElement("div");
  dicEle.className = "slides";
  var parentId = document.getElementById("image-wrapper");
  parentId.appendChild(dicEle);
  for (var i = 0; i < totalImages.length; i++) {
    var liEle = document.createElement("li");
    dicEle.appendChild(liEle);
  }
  slideWidth();
  parentId.lastElementChild.firstElementChild.classList.add("active");
}

function changeBar(indexValue) {
  var parentId = document.getElementById("image-wrapper");
  var k = parentId.lastElementChild.getElementsByClassName("active");
  k[0].classList.remove("active");
  var activeEle = parentId.lastElementChild.children[indexValue];
  activeEle.classList.add("active");
}

function imageHeight() {
  totalImages[0].parentElement.style.height =
    totalImages[0].offsetHeight + 50 + "px";
}

function slideWidth() {
  var parentId = document.getElementById("image-wrapper");
  var liEle = document.querySelectorAll(".slides li");
  var liWidth = parentId.offsetWidth / totalImages.length - 5;
  for (var i = 0; i < liEle.length; i++) {
    liEle[i].style.width = liWidth + "px";
  }
}
window.addEventListener("resize", function() {
  imageHeight();
  slideWidth();
});

window.addEventListener("load", function() {
  imageHeight();
});

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};
