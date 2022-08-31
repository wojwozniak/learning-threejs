import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
console.log(gui);
const world = {
  plane: {
    width: 5,
    height: 5,
    widthSegments: 15,
    heightSegments: 15

  }
}

const generatePlane = () => {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
  generateHeight();
}
gui.add(world.plane, 'width', 1, 10).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'height', 1, 10).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'widthSegments', 1, 50).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'heightSegments', 1, 50).onChange(() => {
  generatePlane();
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

/*
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });


const mesh = new THREE.Mesh(boxGeometry, material);

scene.add(mesh);

*/

camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 15, 15);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xFF0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const generateHeight = () => {
  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i+=3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    
    array[i + 2] = z + Math.random();
  }
}

generateHeight();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  /*
  mesh.rotation.x += .01;
  mesh.rotation.y += .01;
  */
  //planeMesh.rotation.x += .02;
}

animate();

addEventListener('mousemove', () => {
  console.log(pageX);

})