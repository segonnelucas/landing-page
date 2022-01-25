import "./styles.scss";
import CanvasScrollClip from "canvas-scroll-clip";
import tween from "tween.js";
import $ from "jquery";
window.jQuery = $;
window.$ = $;

//Init Variable
let lastScrollTop = 0,
  title = $(".section-1 h1"),
  subtitle = $(".section-1 p"),
  images = $(".section-1 picture"),
  leftAirpod = $(".img-left"),
  headerContainer = $(".header__wrapper"),
  rightAirpod = $(".img-right"),
  transition = $(".transition");

// Document Event
$(document).ready(() => {
  $(window).scroll(() => {
    // Detect Scroll Direction
    let st = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTop = st <= 0 ? 0 : st;
    animateHeader();
  });
});
$(window).bind("load", function () {
  appearHeader();
});

// ScrollCanvasClip
new CanvasScrollClip(document.querySelector(".section-2"), {
  framePath:
    "https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/spatial-audio/large/0001.jpg",
  frameCount: 214,
  scrollArea: 3000,
});

//Function Header Appeareance
const appearHeader = () => {
  images
    .addClass("is-visible")
    .delay(1000)
    .queue(function () {
      title
        .addClass("is-visible")
        .delay(1000)
        .queue(function () {
          subtitle
            .addClass("is-visible")
            .delay(500)
            .queue(function () {
              title.addClass("is-loaded");
              subtitle.addClass("is-loaded");
              images.addClass("is-loaded");
            });
        });
    });
};

// Function Header Animation on scroll
const animateHeader = () => {
  const scrollPos = window.scrollY,
    valueToMovePositive = scrollPos,
    valueToMoveNegative = -Math.abs(scrollPos),
    valueToScale = 1 + scrollPos / 600,
    valueToScaleHeader = 1 + scrollPos / 4000;
  headerContainer.css({
    transform: `scale(${valueToScaleHeader})`,
  });
  leftAirpod.css({
    transform: `translateX(${valueToMoveNegative}px) translateY(${
      valueToMoveNegative / 10
    }px) scale(${valueToScale})`,
  });
  rightAirpod.css({
    transform: `translateX(${valueToMovePositive}px) translateY(${
      valueToMovePositive / 10
    }px) scale(${valueToScale})`,
  });

  if (scrollPos > 450) {
    let subtitleOpacity = Math.max((550 - scrollPos) / 100, 0);
    subtitle.css({
      opacity: `${subtitleOpacity}`,
    });
  } else {
    subtitle.css({
      opacity: "1",
    });
  }
  if (scrollPos > 650) {
    let titleOpacity = Math.max((750 - scrollPos) / 100, 0);
    title.css({
      opacity: `${titleOpacity}`,
    });
  } else {
    title.css({
      opacity: "1",
    });
  }
  if (scrollPos > 800) {
  } else {
  }
};

var t = new tween.Tween(/* etc */);
t.start();

// Tween test
// $.fn.parallax = function (resistance, mouse) {
//   $el = $(this);
//   TweenLite.to($el, 0.2, {
//     x: -((mouse.clientX - window.innerWidth / 2) / resistance),
//     y: -((mouse.clientY - window.innerHeight / 2) / resistance),
//   });
// };

// $(document).mousemove(function (e) {
//   $(".rock1").parallax(-30, e);
//   $(".rock2").parallax(10, e);
//   $(".rock3").parallax(20, e);
//   $(".rock4").parallax(30, e);
// });
