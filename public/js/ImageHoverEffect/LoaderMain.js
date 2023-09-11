// import { TextureLoader } from "three";

export class Loader {
  constructor() {
    this.#createTextureLoader();
  }

  #createTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  loadTexture(src) {
    this.imageTexture = this.textureLoader.load(
      src,
      undefined,
      undefined,
      (err) => {
        console.log("err", err);
      }
    );
    return this.imageTexture;
  }
}
