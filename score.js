let runs = 0;

let wickets = 0;

let balls = 0;



function updateScore(){


document.getElementById("runs").innerHTML = runs;


document.getElementById("wickets").innerHTML = wickets;


document.getElementById("balls").innerHTML = balls;



}




function addBall(){


balls++;



// Miss ball = 0 run


if(balls >= 6){


document.getElementById("status").innerHTML =

"🏏 Over Complete";



balls = 0;


}



updateScore();


}






function addWicket(){


wickets++;


balls++;



document.getElementById("status").innerHTML =

"🔥 WICKET!";



updateScore();



}





function restartGame(){


runs = 0;

wickets = 0;

balls = 0;



updateScore();



document.getElementById("status").innerHTML =

"Game Restarted";


}
