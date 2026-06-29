let lastWristY = null;
let releaseLock = false;
let frameCount = 0;


function analyzeBowling(results){

    if(!results.poseLandmarks){
        return;
    }


    let wrist = results.poseLandmarks[16];
    let elbow = results.poseLandmarks[14];


    if(!wrist || !elbow){
        return;
    }



    let movement = 0;


    if(lastWristY !== null){

        movement = wrist.y - lastWristY;

    }


    lastWristY = wrist.y;



    // small movement ignore

    if(Math.abs(movement) < 0.03){

        document.getElementById("status").innerHTML =
        "Waiting Bowling";

        return;

    }




    // real bowling action

    if(

        movement > 0.10 &&

        wrist.y > elbow.y &&

        !releaseLock

    ){


        releaseLock = true;


        document.getElementById("status").innerHTML =
        "🔥 DELIVERY RELEASE";



        if(window.releaseBall){

            window.releaseBall();

        }



        setTimeout(()=>{

            releaseLock=false;

        },3000);


    }


}
