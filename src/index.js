import "./styles.scss";
import CanvasScrollClip from "canvas-scroll-clip";
import tween from "tween.js";
import * as THREE from "three";
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
//Init Variable three js
let camera, scene, renderer, group;
let geometry, material, line, mesh, mesh2, mesh3, mesh4, mesh5, plane;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2;

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
  init();
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
};

var t = new tween.Tween(/* etc */);
t.start();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 11;

  group = new THREE.Group();

  scene = new THREE.Scene();
  geometry = new THREE.RingGeometry(0.05, 0.06, 32);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(geometry, material);
  mesh3 = new THREE.Mesh(geometry, material);
  mesh4 = new THREE.Mesh(geometry, material);
  mesh5 = new THREE.Mesh(geometry, material);

  group.add(mesh, mesh2, mesh3, mesh4, mesh5);
  scene.add(group);
  scene.add(line);

  mesh.position.set(0, 0.5, 0);
  mesh2.position.set(0.4, 0.2, 0);
  mesh3.position.set(-0.4, 0.2, 0);
  mesh4.position.set(0.3, -0.3, 0);
  mesh5.position.set(-0.3, -0.3, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector("#threejs").appendChild(renderer.domElement);
  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("scroll", onDocumentScroll);
}

function onDocumentScroll(event) {
  const scrollPos = window.scrollY;

  if (scrollPos > 800) {
    let valueZoom = normalizeMath(scrollPos, 800, 3500, 11, 0);
    let rotateZoom = normalizeMath(scrollPos, 800, 3500, 0, 1);
    camera.position.z = valueZoom;
    group.rotation.z = rotateZoom;
  } else {
    camera.position.z = 11;
  }
  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  camera.position.x = -mouseX / 5000;
  camera.position.y = mouseY / 5000;
  renderer.render(scene, camera);
}

function normalizeMath(val, minVal, maxVal, newMin, newMax) {
  return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
}

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}
