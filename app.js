import * as Three from 'three';
import Mousetrap from 'mousetrap';

const width = window.innerWidth;
const height = window.innerHeight;

let camera,
    renderer,
    scene,
    cube,
    light;

const init = () => {
    initCamera();
    initRenderer();
    initScene();
    initCube();
    initLight();

    initKeybindings();

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

    const cubeMaterial = new Three.MeshLambertMaterial({
        color: 0xAAAAAA
    });

    cube = new Three.Mesh(
        cubeGeometry,
        cubeMaterial
    );

    cube.position.z = -300;
};

const initLight = () => {
    light = new Three.PointLight(0xFFFFFF);

    light.position.x = 10;
    light.position.y = 50;
    light.position.z = 130;
}

const initKeybindings = () => {
    const cameraMoveSpeed = 3;
    
    Mousetrap.bind('d', () => {
        camera.position.x += cameraMoveSpeed;
    });

    Mousetrap.bind('a', () => {
        camera.position.x -= cameraMoveSpeed;
    });

    Mousetrap.bind('s', () => {
        camera.position.z += cameraMoveSpeed;
    });

    Mousetrap.bind('w', () => {
        camera.position.z -= cameraMoveSpeed;
    });

    Mousetrap.bind('space', () => {
        camera.position.y += cameraMoveSpeed;
    });

    Mousetrap.bind('ctrl', () => {
        camera.position.y -= cameraMoveSpeed;
    });
};

const update = () => {
    requestAnimationFrame(update);
    rotateCube();
    renderer.render(scene, camera);
};

const rotateCube = () => {
    const speed = 0.01;

    cube.rotation.x -= speed;
    cube.rotation.y -= speed;
    cube.rotation.z -= speed;
};

init();

