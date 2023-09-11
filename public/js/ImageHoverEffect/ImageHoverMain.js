// import * as THREE from "three";
import { Image } from "./ImageHover.js";

export class ImageHoverEffect {
  constructor(canvasEl, frontImageSrc, backImageSrc) {
    this.canvasEl = canvasEl;
    this.frustumSize = 5;
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.aspect = this.size.width / this.size.height;
    this.createScene();
    this.createCamera();
    this.image = new Image(
      this.scene,
      this.size,
      this.camera,
      frontImageSrc,
      backImageSrc
    );
    this.createRenderer();
    this.onResize();
    this.elapsedTime = 0;
    this.previousTime = 0;

    this.addEventListeners();

    // this.render();
    this.createClock();
    // Get a reference to the canvas element

    // Get the dimensions and position of the canvas element
    this.canvasRect = canvasEl.getBoundingClientRect();

    // Get the dimensions of the viewport (visible area)

    // Check if the canvas is visible on screen
    this.isVisible =
      this.canvasRect.top < this.size.height &&
      this.canvasRect.bottom > 0 &&
      this.canvasRect.left < this.size.width &&
      this.canvasRect.right > 0;

    if (this.isVisible) {
      console.log("The canvas is visible on screen.");
    } else {
      console.log("The canvas is offscreen.");
    }

    this.renderer.setAnimationLoop(() => {
      this.run();
    });
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.OrthographicCamera(
      (0.5 * this.frustumSize * this.aspect) / -2,
      (0.5 * this.frustumSize * this.aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      150,
      1000
    );
    this.camera.position.z = this.camera.near;
    this.scene.add(this.camera);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasEl,
      alpha: true,
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  createClock() {
    this.clock = new THREE.Clock();
  }

  onResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    this.aspect = this.size.width / this.size.height;

    this.camera.left = (-0.5 * this.frustumSize * this.aspect) / 2;
    this.camera.right = (0.5 * this.frustumSize * this.aspect) / 2;
    this.camera.top = this.frustumSize / 2;
    this.camera.bottom = -this.frustumSize / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.image.onResize(this.size);
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", (e) => {
      this.image.onPointerMove(e);
    });
  }

  run() {
    this.elapsedTime = this.clock.getElapsedTime();
    this.delta = this.elapsedTime - this.previousTime;
    this.previousTime = this.elapsedTime;

    this.image.tick(this.delta);

    this.renderer.render(this.scene, this.camera);
  }
}
