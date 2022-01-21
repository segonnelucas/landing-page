// Images asset
const images = {
  1: "./assets/img/image1.png",
  2: "./assets/img/image2.png",
  3: "./assets/img/image3.png",
  4: "./assets/img/image4.png",
  5: "./assets/img/image5.png",
  6: "./assets/img/image6.png",
  7: "./assets/img/image7.png",
  8: "./assets/img/image8.png",
  9: "./assets/img/image9.png",
  10: "./assets/img/image10.png",
  11: "./assets/img/image11.png",
  12: "./assets/img/image12.png",
  13: "./assets/img/image13.png",
  14: "./assets/img/image14.png",
  15: "./assets/img/image15.png",
  16: "./assets/img/image16.png",
  17: "./assets/img/image17.png",
  18: "./assets/img/image18.png",
  19: "./assets/img/image19.png",
  20: "./assets/img/image20.png",
  21: "./assets/img/image20.png",
  22: "./assets/img/image19.png",
  23: "./assets/img/image18.png",
  24: "./assets/img/image17.png",
  25: "./assets/img/image16.png",
  26: "./assets/img/image15.png",
  27: "./assets/img/image14.png",
  28: "./assets/img/image13.png",
  29: "./assets/img/image12.png",
  30: "./assets/img/image11.png",
  31: "./assets/img/image10.png",
  32: "./assets/img/image9.png",
  33: "./assets/img/image8.png",
  34: "./assets/img/image7.png",
  35: "./assets/img/image6.png",
  36: "./assets/img/image5.png",
  37: "./assets/img/image4.png",
  38: "./assets/img/image3.png",
  39: "./assets/img/image2.png",
  40: "./assets/img/image1.png",
  41: "./assets/img/image1.png",
  42: "./assets/img/image2.png",
  43: "./assets/img/image3.png",
  44: "./assets/img/image4.png",
  45: "./assets/img/image5.png",
  46: "./assets/img/image6.png",
  47: "./assets/img/image7.png",
  48: "./assets/img/image8.png",
  49: "./assets/img/image9.png",
  50: "./assets/img/image10.png",
  51: "./assets/img/image11.png",
  52: "./assets/img/image12.png",
  53: "./assets/img/image13.png",
  54: "./assets/img/image14.png",
  55: "./assets/img/image15.png",
  56: "./assets/img/image16.png",
  57: "./assets/img/image17.png",
  58: "./assets/img/image18.png",
  59: "./assets/img/image19.png",
  60: "./assets/img/image20.png",
};

// Global variable to control the scrolling behavior
const step = 20; // For each 20px, change an image
const imgNumber = Object.keys(images).length;
let textOpacity = 1;
let sectionSize = 100;
let lastScrollTop = 0;
let textScale = 1;

function trackScrollPosition() {
  // Section 1 var
  const y = window.scrollY;
  const label = Math.min(Math.floor(y / step) + 1, imgNumber);
  const imageToUse = images[label];
  const clipPathSize = y / 2;

  //Detect scroll direction
  let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  let scrollBottom = st > lastScrollTop;
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  // Change clip path;
  $(".section-1 .bg").css("clip-path", `circle(${clipPathSize}% at 50% 20%)`);
  // Change the background image
  $(".section-1 .bg").css("background-image", `url('${imageToUse}')`);

  // Text opacity
  if (label >= 11 && label <= 20) {
    if (scrollBottom) {
      textAppearanceUp();
    } else {
      textAppearanceDown();
    }
  } else if (label >= 21 && label <= 30) {
    textOpacity = 1;
    $(".section-1 h1").css("opacity", textOpacity);
  } else if (label >= 31 && label <= 40) {
    if (scrollBottom) {
      textAppearanceDown();
    } else {
      textAppearanceUp();
    }
  } else {
    textOpacity = 0;
    $(".section-1 h1").css("opacity", textOpacity);
  }

  // Section Size
  if (label >= 0 && label <= 30) {
    sectionSize = 100;
    $(".section-1").css("width", `${sectionSize}%`);
  } else if (label >= 31 && label <= 50) {
    if (scrollBottom) {
      sectionReduceSize();
    } else {
      sectionAugmentSize();
    }
  } else {
    sectionSize = 40;
    $(".section-1").css("width", `${sectionSize}%`);
  }
}

// Text appearance function
function textAppearanceDown() {
  if (textOpacity <= 0) {
    textOpacity = 0;
  } else {
    textOpacity -= 0.1;
  }
  if (textScale <= 1) {
    textScale = 1;
  } else {
    textScale -= 0.05;
  }
  $(".section-1 h1").css("opacity", textOpacity);
  $(".section-1 h1").css("transform", "scale(" + textScale + ")");
}
function textAppearanceUp() {
  if (textOpacity >= 1) {
    textOpacity = 1;
  } else {
    textOpacity += 0.1;
  }
  if (textScale >= 1.5) {
    textScale = 1.5;
  } else {
    textScale += 0.05;
  }
  $(".section-1 h1").css("opacity", textOpacity);
  $(".section-1 h1").css("transform", "scale(" + textScale + ")");
}

// Section Size Appearance Function
function sectionReduceSize() {
  if (sectionSize <= 40) {
    sectionSize = 40;
  } else {
    sectionSize -= 3;
  }
  $(".section-1").css("width", `${sectionSize}%`);
}
function sectionAugmentSize() {
  if (sectionSize >= 100) {
    sectionSize = 100;
  } else {
    sectionSize += 3;
  }
  $(".section-1").css("width", `${sectionSize}%`);
}
$(document).ready(() => {
  // register an event listener on window
  $(window).scroll(() => {
    // We don't need to use 'event' as the scroll exist in window
    trackScrollPosition();
  });
});
