let lastWristY = null;
let releaseLock = false;

let stableFrames = 0;


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




let movement = 0;


if(lastWristY !== null){

    movement = wrist.y - lastWristY;

}


lastWristY = wrist.y;



// Debug

document.getElementById("status").innerHTML =
"Wrist move: " + movement.toFixed(3);




// Very strict release

if(

movement > 0.18 &&

wrist.y > elbow.y &&

elbow.y > shoulder.y &&

!releaseLock

){


stableFrames++;


}

else{


stableFrames = 0;


}





// 3 frames same condition required

if(stableFrames >= 3){


releaseLock=true;


document.getElementById("status").innerHTML =
"🔥 BALL RELEASE";



if(window.releaseBall){

window.releaseBall();

}



setTimeout(()=>{

releaseLock=false;

stableFrames=0;

},2500);



}


}
