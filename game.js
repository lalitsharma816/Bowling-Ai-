import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, 400);

document.body.appendChild(renderer.domElement);

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20,40),
    new THREE.MeshPhongMaterial({color:0x2e8b57})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);

// Pitch
const pitch = new THREE.Mesh(
    new THREE.BoxGeometry(2,0.05,16),
    new THREE.MeshPhongMaterial({color:0xd2b48c})
);

pitch.position.y = 0.03;
scene.add(pitch);
// Cricket Ball
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.15,32,32),
    new THREE.MeshPhongMaterial({color:0x8b0000})
);

ball.position.set(0,1,5);
scene.add(ball);


// Ball movement test
let ballSpeed = 0.08;

function moveBall(){

    ball.position.z -= ballSpeed;

    if(ball.position.z < -7){
        ball.position.z = 5;
    }

}
// Wickets
const material = new THREE.MeshPhongMaterial({color:0xffffff});

for(let i=-0.15;i<=0.15;i+=0.15){

    const stump=new THREE.Mesh(
        new THREE.CylinderGeometry(0.03,0.03,1),
        material
    );

    stump.position.set(i,0.5,-7);

    scene.add(stump);

}

const light=new THREE.DirectionalLight(0xffffff,1);

light.position.set(5,10,5);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

camera.position.set(0,5,12);

camera.lookAt(0,0,-5);

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}

animate();
