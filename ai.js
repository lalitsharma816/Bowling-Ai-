alert("AI FILE RUNNING");
let lastWristY = null;
let releaseLock = false;


function analyzeBowling(results){

    if(!results.poseLandmarks){
        return;
    }


    let wrist = results.poseLandmarks[16];


    if(!wrist){
        return;
    }



    let movement = 0;



    if(lastWristY !== null){

        movement = wrist.y - lastWristY;

    }



    lastWristY = wrist.y;



    // Debug

    document.getElementById("status").innerHTML =
    "Movement: " + movement.toFixed(3);




    if(
        movement > 0.05 &&
        !releaseLock
    ){


        releaseLock = true;


        document.getElementById("status").innerHTML =
        "🔥 BALL RELEASE";



        if(window.releaseBall){

            window.releaseBall();

        }



        setTimeout(()=>{

            releaseLock=false;

        },1500);



    }


}
