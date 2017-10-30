import * as three from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

const viewAngle = 45;
const aspectRatio = width / height;
const nearLimit = 0.1;
const farLimit = 10000;

const container = document.getElementById('app');

const renderer = new three.WebGLRenderer();
const camera = new three.PerspectiveCamera(viewAngle, aspectRatio, nearLimit, farLimit);

const scene = new three.Scene();

scene.add(camera);

renderer.setSize(width, height);
renderer.setClearColor(0x1E90FF);

container.appendChild(renderer.domElement);

const radius = 50;
const segments = 64;
const rings = 64;

const sphereMaterial = new three.MeshLambertMaterial({
    color: 0x0000CC
});

const sphere = new three.Mesh(
    new three.SphereGeometry(radius, segments, rings),
    sphereMaterial
);

sphere.position.z = -300;

scene.add(sphere);

const pointLight = new three.PointLight(0xFFFFFF);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight);

const update = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(update);
};

requestAnimationFrame(update);
