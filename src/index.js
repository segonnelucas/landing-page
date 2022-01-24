import "./styles.scss";
import CanvasScrollClip from "canvas-scroll-clip";
import $ from "jquery";
window.jQuery = $;
window.$ = $;

//Init Variable
let lastScrollTop = 0,
  title = $(".section-1 h1"),
  subtitle = $(".section-1 p"),
  images = $(".section-1 picture"),
  leftAirpod = $(".img-left"),
  rightAirpod = $(".img-right");

// ScrollCanvasClip
new CanvasScrollClip(document.querySelector(".section-2"), {
  framePath:
    "https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/spatial-audio/large/0001.jpg",
  frameCount: 214,
  scrollArea: 3000,
});

// Document Event
$(document).ready(() => {
  $(window).scroll(() => {
    // Detect Scroll Direction
    let st = window.pageYOffset || document.documentElement.scrollTop,
      scrollBottom = st > lastScrollTop;
    lastScrollTop = st <= 0 ? 0 : st;
    animateHeader();
  });
});

$(window).bind("load", function () {
  appearHeader();
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
          subtitle.addClass("is-visible");
          images.addClass("is-loaded");
        });
    });
};

// Function Header Animation on scroll
const animateHeader = () => {
  const scrollPos = window.scrollY,
    valueToMovePositive = scrollPos,
    valueToMoveNegative = -Math.abs(scrollPos),
    valueToScale = 1 + scrollPos / 400;
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
};
