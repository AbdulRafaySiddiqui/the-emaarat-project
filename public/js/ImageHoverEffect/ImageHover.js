// import { gsap } from "gsap";
// import * as THREE from "three";
import { Loader } from "./LoaderMain.js";
import { fragmentShader as fragmentShaderRaw } from "./shaders/fragment-shader.js";
import { vertexShader as vertexShaderRaw } from "./shaders/vertex-shader.js";
// const vertexShader = document.querySelector("#vertexShader");
// const fragmentShader = document.querySelector("#fragmentShader");

// console.log(fragmentShader.toString());
const fragmentShader = fragmentShaderRaw.toString();
const vertexShader = vertexShaderRaw.toString();

console.log(fragmentShader);

gsap.config({
  force3D: true,
});

export class Image {
  constructor(scene, viewportSize, camera, frontImageSrc, backImageSrc) {
    this.scene = scene;
    this.camera = camera;
    this.size = viewportSize;
    this.textureLoader = new Loader();
    this.frontImageSrc = frontImageSrc;
    this.backImageSrc = backImageSrc;
    this.createMesh();
    this.initializaRaycaster();
    this.pointer = new THREE.Vector2(0, 0);
    this.intersect = false;
    this.revealAnimStarted = false;
  }

  createMesh() {
    this.frontTexture = this.textureLoader.loadTexture(this.frontImageSrc);
    this.backTexture = this.textureLoader.loadTexture(this.backImageSrc);

    console.log({
      front: this.frontTexture,
    });

    this.geometry = new THREE.PlaneGeometry(1, 2.5, 512, 512);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMaskRadius: {
          value: 0,
        },
        uFrontTexture: { value: this.frontTexture },
        uBackTexture: { value: this.backTexture },
        uPlaneRatio: { value: 1 / 2.5 },
        uMouse: { value: new THREE.Vector2() },
        uResolution: {
          value: new THREE.Vector2(this.size.width, this.size.height),
        },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  onResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    this.material.uniforms.uResolution.value.set(this.size.width);
  }

  revealHideMaskAnimation() {
    if (this.intersect) {
      if (!this.revealAnimStarted) {
        gsap.to(this.material.uniforms.uMaskRadius, {
          value: 1,
          duration: 0.5,
        });
      }
      this.revealAnimStarted = true;
    } else {
      if (!this.revealAnimStarted) {
        gsap.to(this.material.uniforms.uMaskRadius, {
          value: 0,
          duration: 0.5,
        });
      }
      this.revealAnimStarted = true;
    }
    this.revealAnimStarted = false;
  }

  tick(delta) {
    this.revealHideMaskAnimation();
    this.material.uniforms.uTime.value += delta;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    let intersects = this.raycaster.intersectObjects(
      this.scene.children,
      false
    );

    if (this.pointer.x === 0 && this.pointer.y === 0) {
      intersects = [];
    }

    if (intersects.length > 0) {
      const intersectMesh = intersects[0];
      this.intersect = true;

      this.material.uniforms.uMouse.value = intersectMesh.uv;
      return;
    }

    this.intersect = false;
  }
  initializaRaycaster() {
    this.raycaster = new THREE.Raycaster();
    // this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}
