alert("JavaScript Loaded");


const video = document.getElementById("video");
const status = document.getElementById("status");


let previousY = null;
let bowling = false;



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
minDetectionConfidence:0.5,
minTrackingConfidence:0.5

});





pose.onResults((results)=>{


if(results.poseLandmarks){


let wrist = results.poseLandmarks[16];



if(wrist){


let movement = 0;



if(previousY !== null){


movement = wrist.y - previousY;



if(movement > 0.04){


bowling=true;

status.innerHTML="💥 Bowling Action Detected";


}

else{


status.innerHTML=
"✋ Hand Tracking";


}



}



previousY = wrist.y;



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
