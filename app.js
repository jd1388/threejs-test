import * as Three from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

let camera,
    renderer,
    scene,
    cube,
    light,
    previousX,
    previousY,
    keyMap = {};

const init = () => {
    initCamera();
    initRenderer();
    initScene();
    initCube();
    initLight();

    initControls();

    scene.add(camera, cube, light);

    requestAnimationFrame(update);
}

const initCamera = () => {
    const viewAngle = 45;
    const aspectRatio = width / height;
    const nearLimit = 0.1;
    const farLimit = 10000;

    camera = new Three.PerspectiveCamera(viewAngle, aspectRatio, nearLimit, farLimit);
};

const initRenderer = () => {
    const container = document.getElementById('app');

    renderer = new Three.WebGLRenderer({antialias: true});

    renderer.setSize(width, height);
    renderer.setClearColor(0x1E90FF);

    container.appendChild(renderer.domElement);
};

const initScene = () => {
    scene = new Three.Scene();
};

const initCube = () => {
    const cubeWidth = 100;
    const cubeHeight = 100;
    const cubeDepth = 100;

    const cubeGeometry = new Three.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);

    const cubeTexture = new Three.TextureLoader().load('./resources/blocks/dirt.png');
    cubeTexture.magFilter = Three.NearestFilter;
    cubeTexture.minFilter = Three.LinearMipMapLinearFilter;

    const cubeMaterial = new Three.MeshLambertMaterial({
        map: cubeTexture
    });

    cube = new Three.Mesh(
        cubeGeometry,
        cubeMaterial
    );

    cube.position.z = -300;
};

const initLight = () => {
    light = new Three.AmbientLight(0xFFFFFF);

    light.position.x = 10;
    light.position.y = 50;
    light.position.z = 130;
}

const mouseControls = event => {
    rotateCamera(event.movementX, event.movementY);
};

const initControls = () => {
    const keyboardDownControls = event => {
        console.log(event.key);
        keyMap[event.key] = true;
    }

    const keyboardUpControls = event => {
        keyMap[event.key] = false;
    }

    document.addEventListener('keydown', keyboardDownControls, false);
    document.addEventListener('keyup', keyboardUpControls, false);
    
    renderer.domElement.requestPointerLock();

    document.addEventListener('mousemove', mouseControls, false);
};

const rotateCamera = (currentX, currentY) => {
    camera.rotation.y -= currentX * 0.001;
    camera.rotation.x -= currentY * 0.001;
};

const moveCamera = () => {
    const cameraMoveSpeed = 5;

    if (keyMap['d'])
        camera.position.x += cameraMoveSpeed;

    if (keyMap['a'])
        camera.position.x -= cameraMoveSpeed;

    if (keyMap['s'])
        camera.position.z += cameraMoveSpeed;

    if (keyMap['w'])
        camera.position.z -= cameraMoveSpeed;

    if (keyMap[' '])
        camera.position.y += cameraMoveSpeed;

    if (keyMap['Control'])
        camera.position.y -= cameraMoveSpeed;

    if (keyMap['Escape'])
        document.exitPointerLock();
}

const update = () => {
    requestAnimationFrame(update);
    moveCamera();
    renderer.render(scene, camera);
};

init();
