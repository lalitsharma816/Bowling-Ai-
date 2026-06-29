alert("AI Bowling Loaded");


const video = document.getElementById("video");
const status = document.getElementById("status");


let previousWristY = null;
let cooldown = false;



async function startCamera(){

try{

const stream = await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user"
},

audio:false

});


video.srcObject = stream;

status.innerHTML="📷 Camera Started";


}

catch(error){

console.log(error);

status.innerHTML="❌ Camera Error";

}

}





const pose = new Pose({

locateFile:(file)=>{

return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;

}

});




pose.setOptions({

modelComplexity:1,

smoothLandmarks:true,

minDetectionConfidence:0.6,

minTrackingConfidence:0.6

});






pose.onResults((results)=>{


if(results.poseLandmarks){


let wrist = results.poseLandmarks[16];

let elbow = results.poseLandmarks[14];



if(wrist && elbow){



let wristMove = 0;



if(previousWristY !== null){



wristMove = wrist.y - previousWristY;



}



// Wrist should move down fast

if(
wristMove > 0.08 &&
elbow.y < wrist.y &&
!cooldown
){


status.innerHTML="🔥 REAL BOWLING RELEASE";


cooldown=true;



if(window.releaseBall){

window.releaseBall();

}



setTimeout(()=>{

cooldown=false;

},1500);



}

else{


status.innerHTML="✋ Waiting Bowling";

}



previousWristY=wrist.y;



}


}


});







video.addEventListener("loadeddata",()=>{


async function detect(){


await pose.send({

image:video

});


requestAnimationFrame(detect);


}


detect();


});





startCamera();
