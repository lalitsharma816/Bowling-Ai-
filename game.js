import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);


const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/400,
0.1,
1000
);


const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,400);

document.body.appendChild(renderer.domElement);



// Ground

const ground = new THREE.Mesh(

new THREE.PlaneGeometry(20,40),

new THREE.MeshPhongMaterial({
color:0x228b22
})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);



// Pitch

const pitch = new THREE.Mesh(

new THREE.BoxGeometry(2,0.05,16),

new THREE.MeshPhongMaterial({
color:0xd2b48c
})

);

pitch.position.y=0.03;

scene.add(pitch);




// ----------------
// BALL
// ----------------

const ball = new THREE.Mesh(

new THREE.SphereGeometry(0.15,32,32),

new THREE.MeshPhongMaterial({
color:0x8b0000
})

);


ball.position.set(0,1,5);

scene.add(ball);



let ballMoving=false;

let velocityZ=0.18;

let velocityY=0;



// ----------------
// BATSMAN
// ----------------


const batsman = new THREE.Group();



// Body

const body = new THREE.Mesh(

new THREE.BoxGeometry(0.5,1.5,0.3),

new THREE.MeshPhongMaterial({
color:0x3366ff
})

);

body.position.y=1;

batsman.add(body);



// Head

const head = new THREE.Mesh(

new THREE.SphereGeometry(0.25),

new THREE.MeshPhongMaterial({
color:0xffcc99
})

);

head.position.y=2;

batsman.add(head);



// Bat

const bat = new THREE.Mesh(

new THREE.BoxGeometry(0.12,1.2,0.25),

new THREE.MeshPhongMaterial({
color:0x8b4513
})

);


bat.position.set(0.35,1,0);

bat.rotation.z=-0.3;

batsman.add(bat);



batsman.position.set(0,0,-6);

scene.add(batsman);





// ----------------
// WICKETS
// ----------------


for(let i=-0.15;i<=0.15;i+=0.15){


const stump=new THREE.Mesh(

new THREE.CylinderGeometry(
0.03,
0.03,
1
),

new THREE.MeshPhongMaterial({
color:0xffffff
})

);


stump.position.set(i,0.5,-7);

scene.add(stump);


}






// BALL RELEASE

window.releaseBall=function(){

console.log("GAME RECEIVED RELEASE");


ball.position.set(0,1,5);

velocityY=0;

ballMoving=true;


document.getElementById("status").innerHTML =
"🏏 BALL THROWN";


};






// BALL PHYSICS

function moveBall(){

if(ballMoving){


ball.position.z-=velocityZ;



// gravity

velocityY-=0.01;

ball.position.y+=velocityY;



// bounce on pitch

if(ball.position.y<0.15 && ball.position.z<2){

ball.position.y=0.15;

velocityY=0.12;

document.getElementById("status").innerHTML=
"🏏 Ball Bounce";

}



// batsman area

if(ball.position.z<-5.5){

document.getElementById("status").innerHTML=
"⚾ Batsman Time";

}



if(ball.position.z<-8){

ballMoving=false;

ball.position.set(0,1,5);

}


}

}






// LIGHT

const light=new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(5,10,5);

scene.add(light);


scene.add(
new THREE.AmbientLight(
0xffffff,
0.5
)
);





camera.position.set(0,5,12);

camera.lookAt(0,0,-5);





function animate(){

requestAnimationFrame(animate);

moveBall();

renderer.render(scene,camera);

}


animate();
