const video = document.getElementById("video");
const status = document.getElementById("status");

async function startCamera() {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        status.innerHTML = "❌ Camera Not Supported";
        return;
    }

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = stream;

        status.innerHTML = "✅ Camera Started";

    } catch (error) {

        console.log(error);

        status.innerHTML = "❌ Camera Permission Denied";

    }

}

startCamera();
const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
});

pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

pose.onResults((results) => {
    if (results.poseLandmarks) {
        status.innerHTML = "🏏 Bowler Detected";
    } else {
        status.innerHTML = "👤 Stand in Front of Camera";
    }
});

video.addEventListener("loadeddata", async () => {
    async function detect() {
        await pose.send({ image: video });
        requestAnimationFrame(detect);
    }
    detect();
});
