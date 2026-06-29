let lastWristY = null;
let lastElbowY = null;

let releaseLock = false;


function analyzeBowling(results){


    if(!results.poseLandmarks){
        return;
    }


    let wrist = results.poseLandmarks[16];
    let elbow = results.poseLandmarks[14];
    let shoulder = results.poseLandmarks[12];


    if(!wrist || !elbow || !shoulder){
        return;
    }



    let wristMove = 0;
    let elbowMove = 0;



    if(lastWristY !== null){

        wristMove = wrist.y - lastWristY;

    }


    if(lastElbowY !== null){

        elbowMove = elbow.y - lastElbowY;

    }




    /*
       Strict Bowling Condition

       1. Wrist fast down
       2. Elbow also moving
       3. Wrist below elbow
    */


    if(

        wristMove > 0.12 &&

        elbowMove > 0.04 &&

        wrist.y > elbow.y &&

        !releaseLock

    ){


        releaseLock = true;


        document.getElementById("status").innerHTML =
        "🔥 REAL BALL RELEASE";



        if(window.releaseBall){

            window.releaseBall();

        }



        setTimeout(()=>{

            releaseLock=false;

        },2000);


    }

    else{

        document.getElementById("status").innerHTML =
        "✋ Waiting Bowling";

    }



    lastWristY = wrist.y;
    lastElbowY = elbow.y;


}
