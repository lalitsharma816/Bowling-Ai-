const video = document.getElementById("video");
const status = document.getElementById("status");

async function startCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = stream;

        status.innerHTML = "📷 Camera Started";

    } catch(error) {

        status.innerHTML = "❌ Camera Error";
        console.log(error);

    }
}


const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
});


pose.setOptions({

    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5

});


pose.onResults((results)=>{

    if(results.poseLandmarks){

        // Right wrist landmark = 16
        let wrist = results.poseLandmarks[16];

        if(wrist){

            let x = Math.round(wrist.x * 100);
            let y = Math.round(wrist.y * 100);

            status.innerHTML =
            "🏏 Right Wrist: X=" + x + " Y=" + y;

        }

    }
    else{

        status.innerHTML="👤 Stand in Camera";

    }

});


video.addEventListener("loadeddata",()=>{

    async function detect(){

        await pose.send({
            image: video
        });

        requestAnimationFrame(detect);

    }

    detect();

});


startCamera();
