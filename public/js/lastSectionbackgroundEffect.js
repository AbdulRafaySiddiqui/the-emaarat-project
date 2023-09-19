let mouse = {
  x: 0,
  y: 0,
};

let scene;
let camera;
let renderer;
let sphere;
let torus;

/**
 * Initializes the WebGL canvas and sets up the scene, camera, and renderer.
 *
 * @return {void} This function does not return a value
 */
function init() {
  const canvas = document.getElementById("webgl_canvas");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 3;
  scene.add(camera);
  const geometry = new THREE.TorusGeometry(2, 0.4, 32, 128);
  const sphereGeometry = new THREE.SphereGeometry(1.2, 64, 64);
  const material = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: false,
  });

  sphere = new THREE.Points(sphereGeometry, material);
  sphere.position.z = -0.2;
  torus = new THREE.Points(geometry, material);

  const group = new THREE.Group();

  group.add(sphere, torus);
  group.scale.set(2, 2, 1.4);

  scene.add(group);
  renderer.render(scene, camera);
}

/**
 * Updates the mouse position based on the pointer move event.
 *
 * @param {Object} e - The event object containing information about the pointer move.
 */
function onPointerMove(e) {
  if (e.isPrimary === false) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
}

/**
 * Updates the camera aspect ratio based on the window size, and
 * resizes the renderer to match the window dimensions.
 *
 * @param {number} window.innerWidth - The width of the window.
 * @param {number} window.innerHeight - The height of the window.
 * @return {void} This function does not return a value.
 */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
}

const clock = new THREE.Clock();

/**
 * Executes the animation loop for rendering the scene.
 *
 * @return {void} This function does not return a value.
 */
function tick() {
  let elapsedTime = clock.getElapsedTime();

  camera.position.x += (-mouse.x - camera.position.x) * 0.05;
  camera.position.y += (mouse.y - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  sphere.rotation.y = elapsedTime * 0.1;
  torus.rotation.z = elapsedTime * 0.1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

init();
window.addEventListener("resize", onResize);
window.addEventListener("mousemove", onPointerMove);

tick();
