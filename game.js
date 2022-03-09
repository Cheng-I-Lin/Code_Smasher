const shape=document.getElementsByClassName("shape");
const title=document.getElementById("title");
const grid=document.getElementById("grid");
//document.getElementById("hi").innerHTML=(title.offsetTop);
title.style.left=(window.innerWidth-title.offsetWidth)/2+"px";
for(let i=0;i<shape.length;i++){
    shape[i].style.opacity="1";
    document.getElementById("chooseTitle").style.opacity="1";
    document.getElementById("instructions").style.opacity="1";
    document.getElementById("start").style.opacity="1";
}
//Move title down like smashing
title.style.top="0vh";
var pause=false;
//Used to see which game is played
var bubble=false;
var squareUp=false;
var trinity=false;
//Label each dot as 1,2,3 and use click and array to see if clicked the right ones, add onto array each time
var trinityArr=[];
//Uses players' inputs, if equal to trinityArr size then empty array and plus a move
var trialArr=[];
var addEquation=false;
var codeSmasher=false;
//The two squares
var player1={
    x:0,
    y:0,
    ySpeed:0,
    size:150
}
var player2={
    x:window.innerWidth-150,
    y:0,
    ySpeed:0,
    size:150
}
var controls1={
    up:false,
    down:false,
    left:false,
    right:false,
    //Dash in square up, can have timer/progress bar for that
    dash:false,
    jump:true
}
var controls2={
    up:false,
    down:false,
    left:false,
    right:false,
    dash:false,
    jump:true
}
function gameMode(id){
    let gameName=document.getElementById("gameName");
    switch(id){
        case "square":
            squareUp=true;
            bubble=false;
            trinity=false;
            addEquation=false;
            codeSmasher=false;
            gameName.innerHTML="Square Up";
            break;
        case "circle":
            bubble=true;
            squareUp=false;
            trinity=false;
            addEquation=false;
            codeSmasher=false;
            gameName.innerHTML="Protect the Bubble";
            break;
        case "triangle":
            trinity=true;
            squareUp=false;
            bubble=false;
            addEquation=false;
            codeSmasher=false;
            gameName.innerHTML="Trinity";
            break;
        case "plus":
            addEquation=true;
            squareUp=false;
            bubble=false;
            trinity=false;
            codeSmasher=false;
            gameName.innerHTML="Addition Equation";
            break;
        case "title":
            codeSmasher=true;
            squareUp=false;
            bubble=false;
            trinity=false;
            addEquation=false;
            gameName.innerHTML="Code Smasher";
            break;
        default:
            break;
    }
    document.getElementById("intro").style.bottom="100vh";
    document.getElementById("instructionPage").style.bottom="100vh";
}
function drawGame(){
    let canvas=document.getElementById("gameCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width=grid.offsetWidth;
    canvas.height=grid.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(squareUp){
        ds.fillStyle="white";
        ds.fillRect(player1.x,player1.y,player1.size,player1.size);
        ds.fillStyle="orange";
        ds.fillRect(player2.x,player2.y,player2.size,player2.size);
    }
    if(bubble){
        ds.fillStyle="white";

    }
    if(trinity){
        ds.fillStyle="white";
        ds.moveTo(window.innerWidth/2,70);
        ds.lineTo(window.innerWidth/2-100,170);
        ds.lineTo(window.innerWidth/2+100,170);
        ds.fill();
        ds.moveTo(window.innerWidth/4,grid.offsetHeight/2+70);
        ds.lineTo(window.innerWidth/4-100,grid.offsetHeight/2+170);
        ds.lineTo(window.innerWidth/4+100,grid.offsetHeight/2+170);
        ds.fill();
        ds.moveTo(window.innerWidth-window.innerWidth/4,grid.offsetHeight/2+70);
        ds.lineTo(window.innerWidth-window.innerWidth/4-100,grid.offsetHeight/2+170);
        ds.lineTo(window.innerWidth-window.innerWidth/4+100,grid.offsetHeight/2+170);
        ds.fill();
        ds.font="100px Arial";
        ds.fillText(trialArr.length,window.innerWidth/2-25,grid.offsetHeight/2+80);
    }
    if(addEquation){
        ds.fillStyle="white";
        ds.font="100px Arial";
        ds.fillText(trialArr.length,window.innerWidth/2-25,grid.offsetHeight/2+80);
    }
    if(codeSmasher){
        ds.fillStyle="brown";
        ds.fillRect(window.innerWidth/2-37.5,player1.y,75,200);
        ds.fillStyle="white";
        //Minus 50 due to the half of width
        ds.fillRect(window.innerWidth/2-100,player1.y+200,200,100);
        ds.fillStyle="orange";
        ds.fillRect(window.innerWidth/2-125,player1.y+200,25,100);
        ds.fillRect(window.innerWidth/2+100,player1.y+200,25,100);
    }
}
document.addEventListener("keydown",function(key){
    switch(key.code){
        case "ArrowUp":
            controls2.up=true;
            if(!(player2.jump)){
                player2.ySpeed=-25;
            }
            break;
        case "KeyW":
            controls1.up=true;
            if(!(player1.jump)){
                player1.ySpeed=-25;
            }
            break;
        case "ArrowLeft":
            controls2.left=true;
            break;
        case "KeyA":
            controls1.left=true;
            break;
        case "ArrowDown":
            if(!player2.jump){
                controls2.down=true;
            }
            break;
        case "KeyS":
            if(!player1.jump){
                controls1.down=true;
            }
            break;
        case "ArrowRight":
            controls2.right=true;
            break;
        case "KeyD":
            controls1.right=true;
            break;
        case "Enter":
            controls2.dash=false;
            break;
        case "Space":
            controls1.dash=false;
            break;
        default:
            break;
    }
});
document.addEventListener("keyup",function(key){
    switch(key.code){
        case "ArrowUp":
            controls2.up=false;
            if(player2.ySpeed<-2){
                player2.ySpeed=-3;
            }
            break;
        case "KeyW":
            controls1.up=false;
            if(player1.ySpeed<-2){
                player1.ySpeed=-3;
            }
            break;
        case "ArrowLeft":
            controls2.left=false;
            break;
        case "KeyA":
            controls1.left=false;
            break;
        case "ArrowDown":
            controls2.down=false;
            break;
        case "KeyS":
            controls1.down=false;
            break;
        case "ArrowRight":
            controls2.right=false;
            break;
        case "KeyD":
            controls1.right=false;
            break;
        case "Enter":
            controls2.dash=true;
            if(controls2.left){
                player2.x-=200;
            } else if(controls2.right){
                player2.x+=200;
            } else{
                player2.x-=200;
            }
            break;
        case "Space":
            controls1.dash=true;
            if(controls1.left){
                player1.x-=200;
            } else if(controls1.right){
                player1.x+=200;
            } else{
                player1.x+=200;
            }
            break;
        default:
            break;
    }
});
function game(){
    if(squareUp){
        //Gravity pull
        player1.ySpeed+=0.85;
        player2.ySpeed+=0.85;
        player1.jump=true;
        player2.jump=true;
        if(controls1.down){
            player1.size=75;
        } else{
            player1.size=150;
        }
        if(controls2.down){
            player2.size=75;
        } else{
            player2.size=150;
        }
        if(controls1.left&&controls1.down){
            player1.x-=5;
        } else if(controls1.left){
            player1.x-=3;
        }
        if(controls2.left&&controls2.down){
            player2.x-=5;
        } else if(controls2.left){
            player2.x-=3;
        }
        if(controls1.right&&controls1.down){
            player1.x+=5;
        } else if(controls1.right){
            player1.x+=3;
        }
        if(controls2.right&&controls2.down){
            player2.x+=5;
        } else if(controls2.right){
            player2.x+=3;
        }
        if(player1.x<=0){
            player1.x=0;
        }
        if(player2.x<=0){
            player2.x=0;
        }
        if(player1.x+player1.size>=grid.offsetWidth){
            player1.x=grid.offsetWidth-player1.size;
        }
        if(player2.x+player2.size>=grid.offsetWidth){
            player2.x=grid.offsetWidth-player2.size;
        }
        player1.y+=player1.ySpeed;
        player2.y+=player2.ySpeed;
        if(player1.y+player1.size>=grid.offsetHeight){
            player1.jump=false;
            player1.ySpeed=0;
            player1.y=grid.offsetHeight-player1.size;
        }    
        if(player2.y+player2.size>=grid.offsetHeight){
            player2.jump=false;
            player2.ySpeed=0;
            player2.y=grid.offsetHeight-player2.size;
        }    
    }
}
function instruct(){
    document.getElementById("intro").style.bottom="100vh";
}
function back(){
    document.getElementById("intro").style.bottom="0vh";
    document.getElementById("instructionPage").style.bottom="0vh";
    player1.x=0;
    player1.y=0;
    player2.x=window.innerWidth-player2.size;
    player2.y=0;
    squareUp=false;
    bubble=false;
    trinity=false;
    addEquation=false;
    codeSmasher=false;
}
function pauseGame(){
    let pauseButton=document.getElementById("pauseButton");
    if(!pause){
        pause=true;
        pauseButton.style.backgroundColor="orange";
    } else{
        pause=false;
        pauseButton.style.backgroundColor="rgb(255, 212, 147)";
    }
}
function restartGame(){

}
setInterval(function(){
    if(!pause){
        drawGame();
        game();
    }
},20);
/*
Try using other languages as well, like c++, python, unity
4 games with the four shapes:
1. Protect the Bubble(circle): Floating bubble through obstables, use the one from climate rage
2. Square Up(square): Two player game, two squares fighting 
3. Trinity(triangle): Three dots repeat simon says
4. Addition Equations(plus): Select or type numbers for the necessary addition(like wordle numbers)
5. Code Smasher(title card): fall down, user click on time to stop hammer at an exact moment, breaks something, moves on
Notable game ideas: Three dots form in line, player move all dots to move

Consider only use one dash in square up, need to think what migh happen when two dash and collide
*/