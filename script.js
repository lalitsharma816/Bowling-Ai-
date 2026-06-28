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
                facingMode: "environment"
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
