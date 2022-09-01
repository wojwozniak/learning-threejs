import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';

const gui = new dat.GUI();
console.log(gui);
const world = {
  plane: {
    width: 19,
    height: 19,
    widthSegments: 32,
    heightSegments: 30

  }
}

const generatePlane = () => {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
  generateHeight();
  generateColours();
}
gui.add(world.plane, 'width', 5, 50).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'height', 5, 50).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'widthSegments', 1, 50).onChange(() => {
  generatePlane();
});
gui.add(world.plane, 'heightSegments', 1, 50).onChange(() => {
  generatePlane();
});

const raycaster = new THREE.Raycaster();
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

const planeGeometry = new THREE.PlaneGeometry(19, 19, 32, 30);
const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true
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

let colors = [];

const generateColours = () => {
  colors = [];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, .19, .4);
  }

  planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new
      Float32Array(colors), 3)
  );
}

generateColours();


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

const mouse = {
  x: undefined,
  y: undefined
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  /*
  mesh.rotation.x += .01;
  mesh.rotation.y += .01;
  */
  //planeMesh.rotation.x += .02;


  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planeMesh);
  if (intersects.length > 0) {

    const { color } = intersects[0].object.geometry.attributes;
    // wektor 1
    color.setX(intersects[0].face.a, .1);
    color.setY(intersects[0].face.a, .5);
    color.setZ(intersects[0].face.a, 1);

    //wektor 2
    color.setX(intersects[0].face.b, .1);
    color.setY(intersects[0].face.b, .5);
    color.setZ(intersects[0].face.b, 1);
    //wektor 3
    color.setX(intersects[0].face.c, .1);
    color.setY(intersects[0].face.c, .5);
    color.setZ(intersects[0].face.c, 1);

    color.needsUpdate = true;

    const initialColor = {
      r: 0,
      g: .19,
      b: .4
    }

    const hoverColor = {
      r: .1,
      g: .5,
      b: 1
    }
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        //wektor 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);
        //wektor 3
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);

        color.needsUpdate = true;
      }
    });
  }
}

animate();

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth)*2-1;
  mouse.y = -(event.clientY / innerHeight)*2+1;
});
