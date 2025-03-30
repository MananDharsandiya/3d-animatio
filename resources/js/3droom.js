import * as THREE from 'three';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('http://127.0.0.1:8000/tiles.jpg');
const wallTextures = [
    textureLoader.load('http://127.0.0.1:8000/wall1.jpg'),
    textureLoader.load('http://127.0.0.1:8000/wall2.jpg'),
    textureLoader.load('http://127.0.0.1:8000/wall3.jpg'),
    textureLoader.load('http://127.0.0.1:8000/wall4.jpg')  
];

// Create floor
const floorGeometry = new THREE.PlaneGeometry(6, 6);
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create walls
const wallGeometry = new THREE.PlaneGeometry(6, 3);
const walls = [];

for (let i = 0; i < 4; i++) {
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTextures[i] });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);

    switch (i) {
        case 0: wall.position.set(0, 1.5, -3); break;  // Back Wall
        case 1: wall.position.set(0, 1.5, 3); wall.rotation.y = Math.PI; break; // Front Wall
        case 2: wall.position.set(-3, 1.5, 0); wall.rotation.y = Math.PI / 2; break; // Left Wall
        case 3: wall.position.set(3, 1.5, 0); wall.rotation.y = -Math.PI / 2; break; // Right Wall
    }

    scene.add(wall);
    walls.push(wall);
}

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 5, 3);
scene.add(light);

// Set camera position
camera.position.set(0, 2, 6);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Add colorful title
const title = document.createElement('div');
title.innerHTML = "Welcome to the 3D Colorful Room!";
title.style.position = 'absolute';
title.style.top = '20px';
title.style.left = '50%';
title.style.transform = 'translateX(-50%)';
title.style.fontSize = '24px';
title.style.fontWeight = 'bold';
title.style.color = 'white';
title.style.background = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
title.style.padding = '10px 20px';
title.style.borderRadius = '10px';
title.style.textAlign = 'center';
title.style.boxShadow = '0px 4px 10px rgba(0,0,0,0.3)';
document.body.appendChild(title);
