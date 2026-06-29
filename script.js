alert("AI System Loaded");

const video = document.getElementById("video");
const status = document.getElementById("status");


async function startCamera(){

    try{

        const stream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"user"
            },

            audio:false

        });


        video.srcObject = stream;

        status.innerHTML="📷 Camera Ready";


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

    analyzeBowling(results);

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
