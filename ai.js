let lastWristY = null;
let releaseLock = false;


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



// Bowling condition

if(

movement > 0.07 &&

wrist.y > elbow.y &&

!releaseLock

){


releaseLock = true;


document.getElementById("status").innerHTML =
"🔥 BALL RELEASE";



// Send signal to game

if(window.releaseBall){

window.releaseBall();

}



setTimeout(()=>{

releaseLock=false;

},1200);



}

else{


document.getElementById("status").innerHTML =
"✋ Tracking Hand";


}



lastWristY = wrist.y;



}
