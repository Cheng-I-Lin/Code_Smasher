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
var secretAddition=[];
var codeSmasher=false;
//Negative one so at first one plus point
var points=-1;
var smashPoint=0;
//The two squares
var player1={
    x:0,
    y:0,
    ySpeed:0,
    size:150,
    radius:25,
    dead:false,
    color:"white"
}
var player2={
    x:window.innerWidth-150,
    y:0,
    ySpeed:0,
    size:150,
    dead:false,
    color:"orange"
}
var obstacle={
    y:0,
    size:80,
    speed:2
}
//Initialize obstacle position
obstacle.y=-obstacle.size;
var safeSpot={
    x:Math.random()*(grid.offsetWidth-300),
    y:0,
    size:300
}
var triangle={
    t1:false,
    t2:false,
    t3:false,
    color1:false,
    color2:false,
    color3:false
}
var platform={
    //window.innerWidth+20 because of the draw is 20 less than x position
    x:window.innerWidth+20,
    green:false,
    orange:false,
    white:false,
    size:250,
    speed:2
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
var answer=0;
var tries=5;
function drawGame(){
    let canvas=document.getElementById("gameCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width=grid.offsetWidth;
    canvas.height=grid.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(squareUp){
        if(player1.dead){
            ds.fillStyle="red";
        } else{
            ds.fillStyle=player1.color;
        }
        ds.fillRect(player1.x,player1.y,player1.size,player1.size);
        if(player2.dead){
            ds.fillStyle="red";
        } else{
            ds.fillStyle=player2.color;
        }
        ds.fillRect(player2.x,player2.y,player2.size,player2.size);
    }
    if(bubble){
        ds.fillStyle="transparent";
        ds.fillRect(0,obstacle.y,window.innerWidth,obstacle.size);
        ds.strokeStyle="orange";
        ds.beginPath();
        ds.moveTo(2,obstacle.y+2);
        ds.lineTo(window.innerWidth-2,obstacle.y+2);
        ds.lineTo(window.innerWidth-2,obstacle.y+obstacle.size-2);
        ds.lineTo(2,obstacle.y+obstacle.size-2);
        ds.closePath();
        ds.lineWidth=4;
        ds.stroke();
        ds.fillStyle="black";
        ds.fillRect(safeSpot.x,safeSpot.y,safeSpot.size,obstacle.size);
        ds.beginPath();
        ds.moveTo(safeSpot.x-2,safeSpot.y);
        ds.lineTo(safeSpot.x-2,safeSpot.y+obstacle.size);
        ds.closePath();
        ds.stroke();
        ds.beginPath();
        ds.moveTo(safeSpot.x+safeSpot.size+2,safeSpot.y);
        ds.lineTo(safeSpot.x+safeSpot.size+2,safeSpot.y+obstacle.size);
        ds.closePath();
        ds.stroke();
        if(player1.dead){
            ds.fillStyle="red";
        } else{
            ds.fillStyle="white";
        }
        ds.arc(player1.x,player1.y-grid.offsetTop,player1.radius,0,2*Math.PI);
        ds.fill();
    }
    if(trinity){
        ds.beginPath();
        ds.moveTo(window.innerWidth/2,70);
        ds.lineTo(window.innerWidth/2-100,170);
        ds.lineTo(window.innerWidth/2+100,170);
        ds.closePath();
        if(triangle.color1){
            ds.fillStyle="gold";
        } else if(ds.isPointInPath(mouseX,mouseY-grid.offsetTop)){
            //Determines if the mouse is over the triangle
            ds.fillStyle="orange";
            triangle.t1=true;
        } else{
            ds.fillStyle="white";
            triangle.t1=false;
        }
        if(player1.dead){
            ds.fillStyle="red";
        }
        ds.fill();
        ds.beginPath();
        ds.moveTo(window.innerWidth/4,grid.offsetHeight/2+70);
        ds.lineTo(window.innerWidth/4-100,grid.offsetHeight/2+170);
        ds.lineTo(window.innerWidth/4+100,grid.offsetHeight/2+170);
        ds.closePath();
        if(triangle.color2){
            ds.fillStyle="gold";
        } else if(ds.isPointInPath(mouseX,mouseY-grid.offsetTop)){
            ds.fillStyle="orange";
            triangle.t2=true;
        } else{
            ds.fillStyle="white";
            triangle.t2=false;
        }
        if(player1.dead){
            ds.fillStyle="red";
        }
        ds.fill();
        ds.beginPath();
        ds.moveTo(window.innerWidth-window.innerWidth/4,grid.offsetHeight/2+70);
        ds.lineTo(window.innerWidth-window.innerWidth/4-100,grid.offsetHeight/2+170);
        ds.lineTo(window.innerWidth-window.innerWidth/4+100,grid.offsetHeight/2+170);
        ds.closePath();
        if(triangle.color3){
            ds.fillStyle="gold";
        } else if(ds.isPointInPath(mouseX,mouseY-grid.offsetTop)){
            ds.fillStyle="orange";
            triangle.t3=true;
        } else{
            ds.fillStyle="white";
            triangle.t3=false;
        }
        if(player1.dead){
            ds.fillStyle="red";
        }
        ds.fill();
        ds.fillStyle="white";
        ds.font="100px Arial";
        if(trialArr.length>=9){
            ds.fillText(trinityArr.length,window.innerWidth/2-50,grid.offsetHeight/2+80);
        } else{
            ds.fillText(trinityArr.length,window.innerWidth/2-25,grid.offsetHeight/2+80);
        }
    }
    if(addEquation){
        document.getElementById("secretNum").innerHTML=Math.floor(answer/10)*10+" < Answer < "+(Math.floor(answer/10)*10+10);
        ds.fillStyle="white";
        ds.font="100px Arial";
        ds.fillText("+",numBox[1].offsetLeft+numBox[1].offsetWidth+25,numBox[1].offsetTop+25);
        ds.fillText("=",numBox[3].offsetLeft+numBox[3].offsetWidth+25,numBox[3].offsetTop+25);
    } else{
        document.getElementById("secretNum").innerHTML="";
    }
    if(codeSmasher){
        ds.shadowBlur=0;
        ds.fillStyle="rgba(255,255,255,0.15)";
        ds.fillRect(platform.x-20,0,70,grid.offsetHeight);
        ds.fillRect(platform.x+platform.size-40,0,70,grid.offsetHeight);
        ds.fillStyle="white";
        ds.shadowBlur=75;
        ds.shadowColor="rgba(255, 255, 255, 1)";
        ds.fillRect(platform.x-20,0,10,grid.offsetHeight);
        ds.fillRect(platform.x+platform.size+20,0,10,grid.offsetHeight);
        ds.shadowBlur=0;
        ds.fillStyle="rgba(255,255,0,0.15)";
        ds.fillRect(platform.x+50,0,60,grid.offsetHeight);
        ds.fillRect(platform.x+platform.size-100,0,50,grid.offsetHeight);
        ds.fillStyle="orange";
        ds.shadowBlur=75;
        ds.shadowColor="rgba(255, 255, 0, 1)";
        ds.fillRect(platform.x+50,0,10,grid.offsetHeight);
        ds.fillRect(platform.x+platform.size-50,0,10,grid.offsetHeight);
        ds.shadowBlur=0;
        ds.fillStyle="rgba(0,255,0,0.15)";
        ds.fillRect(platform.x+110,0,30,grid.offsetHeight);
        ds.fillStyle="green";
        ds.shadowBlur=75;
        ds.shadowColor="rgba(0, 255, 0, 1)";
        ds.fillRect(platform.x+110,0,10,grid.offsetHeight);
        ds.fillRect(platform.x+platform.size-110,0,10,grid.offsetHeight);
        ds.shadowBlur=30;
        ds.shadowColor="rgba(255, 0, 0, 1)";
        ds.fillStyle="brown";
        ds.fillRect(50,window.innerHeight/2-grid.offsetTop-25,175,50);
        if(player1.dead){
            ds.fillStyle="red";
        } else{
            ds.fillStyle="black";
        }
        //Minus 50 due to the half of width
        ds.fillRect(window.innerWidth/5-100,window.innerHeight/2-grid.offsetTop-75,100,150);
        ds.fillStyle="gold";
        ds.fillRect(window.innerWidth/5-100,window.innerHeight/2-grid.offsetTop-100,100,25);
        ds.fillRect(window.innerWidth/5-100,window.innerHeight/2-grid.offsetTop+75,100,25);
    }
}
//Determine if triangle clicked or not
document.addEventListener("click",function(){
    if(trinity&&!pause&&!player1.dead){
        if(triangle.t1){
            //document.getElementById("hi").innerHTML=trialArr;
            trialArr.push(0);
        } else if(triangle.t2){
            trialArr.push(1);
        } else if(triangle.t3){
            trialArr.push(2);
        }
    }
});
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
            let shouldCheck=true;
            if(squareUp&&!player1.dead&&!player2.dead){
                controls2.dash=false;
            }
            if(addEquation){
                for(let i=0;i<number.length;i++){
                    if(number[i].innerHTML=="?"){
                        shouldCheck=false;
                    }
                }
                if(shouldCheck&&!pause&&parseInt(number[0].innerHTML)+parseInt(number[1].innerHTML)+parseInt(number[2].innerHTML)+parseInt(number[3].innerHTML)==parseInt(number[4].innerHTML)+parseInt(number[5].innerHTML)+parseInt(number[6].innerHTML)){
                    for(let i=0;i<number.length;i++){
                        if(parseInt(number[i].innerHTML)==secretAddition[i]){
                            numBox[i].style.border="green 4px solid";
                        } else if(secretAddition.includes(parseInt(number[i].innerHTML))){
                            numBox[i].style.border="orange 4px solid";
                        } else{
                            numBox[i].style.border="white 4px solid";
                        }
                    }
                    //document.getElementById("hi").innerHTML=number+"<br>"+secretAddition;
                }
            }
            break;
        case "Space":
            if(squareUp&&!player1.dead&&!player2.dead){
                controls1.dash=false;
            }
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
            if(squareUp&&!player1.dead&&!player2.dead){
                controls2.dash=true;
                if(controls2.left){
                    player2.x-=200;
                } else if(controls2.right){
                    player2.x+=200;
                } else{
                    player2.x-=200;
                }
            }
            break;
        case "Space":
            if(squareUp&&!player1.dead&&!player2.dead){
                controls1.dash=true;
                if(controls1.left){
                    player1.x-=200;
                } else if(controls1.right){
                    player1.x+=200;
                } else{
                    player1.x+=200;
                }
            }
            //Checks if hit the platform
            if(codeSmasher&&!player1.dead){
                if(window.innerWidth/5<platform.x-20||window.innerWidth/5>platform.x+platform.size+30){
                    player1.dead=true;
                } else{
                    if((window.innerWidth/5>=platform.x-20&&window.innerWidth/5<=platform.x+50)||(window.innerWidth/5>=platform.x+platform.size-40&&window.innerWidth/5<=platform.x+platform.size+30)){
                        smashPoint++;
                    } else if((window.innerWidth/5>=platform.x+50&&window.innerWidth/5<=platform.x+110)||(window.innerWidth/5>=platform.x+platform.size-100&&window.innerWidth/5<=platform.x+platform.size-40)){
                        smashPoint+=3;
                    } else{
                        smashPoint+=5;
                    }
                    //Returns once clicked so player can't keep clicking to stack up points
                    platform.x=window.innerWidth+20;
                }
            }
            break;
        case "Digit1":
            if(!pause)
            number[boxID].innerHTML=1;
            break;
        case "Digit2":
            if(!pause)
            number[boxID].innerHTML=2;
            break;
        case "Digit3":
            if(!pause)
            number[boxID].innerHTML=3;
            break;
        case "Digit4":
            if(!pause)
            number[boxID].innerHTML=4;
            break;
        case "Digit5":
            if(!pause)
            number[boxID].innerHTML=5;
            break;
        case "Digit6":
            if(!pause)
            number[boxID].innerHTML=6;
            break;
        case "Digit7":
            if(!pause)
            number[boxID].innerHTML=7;
            break;
        case "Digit8":
            if(!pause)
            number[boxID].innerHTML=8;
            break;
        case "Digit9":
            if(!pause)
            number[boxID].innerHTML=9;
            break;
        case "Digit0":
            if(!pause)
            number[boxID].innerHTML=0;
            break;
        case "KeyR":
            restartGame();
            break;
        case "KeyP":
            pauseGame();
            break;
        case "KeyB":
            back();
            break;
        default:
            break;
    }
});
var mouseX=0;
var mouseY=0;
document.addEventListener("mousemove",function(mouse){
    mouseX=mouse.x;
    mouseY=mouse.y;
    //document.getElementById("hi").innerHTML=index;
});
document.addEventListener("click",function(mouse){
    if(squareUp&&!player1.dead&&!player2.dead){
        if((mouse.x>=player1.x&&mouse.x<=player1.x+player1.size)&&(mouse.y-grid.offsetTop>=player1.y&&mouse.y-grid.offsetTop<=player1.y+player1.size)){
            if(player1.color=="white"){
                player1.color="orange";
            } else if(player1.color=="orange"){
                player1.color="green";
            } else if(player1.color=="green"){
                player1.color="teal";
            } else{
                player1.color="white";
            }
        }
        if((mouse.x>=player2.x&&mouse.x<=player2.x+player2.size)&&(mouse.y-grid.offsetTop>=player2.y&&mouse.y-grid.offsetTop<=player2.y+player2.size)){
            if(player2.color=="white"){
                player2.color="orange";
            } else if(player2.color=="orange"){
                player2.color="green";
            } else if(player2.color=="green"){
                player2.color="teal";
            } else{
                player2.color="white";
            }
        }
    }
});
const numBox=document.getElementsByClassName("box");
const number=document.getElementsByClassName("num");
//Make -1 so won't have default selection box
var boxID=-1;
function selectBox(id){
    //document.getElementById("hi").innerHTML=id.substring(id.length-1);
    if(!pause){
        for(let i=0;i<numBox.length;i++){
            if(i==parseInt(id.substring(id.length-1))-1){
                numBox[i].style.backgroundColor="rgba(255, 255, 255, 0.5)";
            } else{
                numBox[i].style.backgroundColor="transparent";
            }
        }
        boxID=parseInt(id.substring(id.length-1))-1;
    }
}
function game(){
    let score=document.getElementById("score");
    if(bubble){
        score.style.display="block";
        score.innerHTML="Score: "+points;
        if(smashPoint>249){
            obstacle.speed=15;
        } else if(smashPoint>199){
            obstacle.speed=10;
        } else if(smashPoint>174){
            obstacle.speed=9;
        } else if(smashPoint>149){
            obstacle.speed=8;
        } else if(smashPoint>124){
            obstacle.speed=7;
        } else if(smashPoint>99){
            obstacle.speed=6;
        } else if(smashPoint>74){
            obstacle.speed=5;
        } else if(smashPoint>49){
            obstacle.speed=4;
        } else if(points>24){
            obstacle.speed=3;
        }
        if(!player1.dead){
            player1.x=mouseX;
            player1.y=mouseY;
            obstacle.y+=obstacle.speed;
            safeSpot.y=obstacle.y;
            if(obstacle.y>=grid.offsetHeight){
                obstacle.y=0-obstacle.size;
                safeSpot.x=Math.random()*(grid.offsetWidth-safeSpot.size);
            }
            if((player1.x+player1.radius>=safeSpot.x+safeSpot.size||player1.x-player1.radius<=safeSpot.x)&&(player1.y-player1.radius-grid.offsetTop<=safeSpot.y+obstacle.size&&player1.y+player1.radius-grid.offsetTop>=safeSpot.y)){
                player1.dead=true;
            }
        }
    } else{
        score.style.display="none";
    }
    if(squareUp&&!player1.dead&&!player2.dead){
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
    if(trinity&&!player1.dead){
        //Check if all clicks are correct
        for(let i=0;i<trialArr.length;i++){
            if(trialArr[i]!=trinityArr[i]){
                player1.dead=true;
            }
        }
        if(trialArr.length==trinityArr.length){
            trinityArr.push(Math.floor(Math.random()*3));
            trialArr=[];
            index=0;
        }
    }
    if(addEquation){
        for(let i=0;i<numBox.length;i++){
            numBox[i].style.display="block";
        }
        if(secretAddition.length!=7){
            for(let i=0;i<4;i++){
                secretAddition.push(Math.floor(Math.random()*9));
            }
            answer=(secretAddition[0]*10+secretAddition[1])+(secretAddition[2]*10+secretAddition[3]);
            secretAddition.push(Math.floor(answer/100));
            secretAddition.push(Math.floor((answer/10)%10));
            secretAddition.push(Math.floor(answer%10));
        }
        //document.getElementById("hi").innerHTML=secretAddition;
    } else{
        for(let i=0;i<numBox.length;i++){
            numBox[i].style.display="none";
        }
    }
    if(codeSmasher){
        score.style.display="block";
        if(!player1.dead){
            score.innerHTML="Score: "+smashPoint;
            if(smashPoint>999){
                platform.speed=50;
            } else if(smashPoint>749){
                platform.speed=40;
            } else if(smashPoint>499){
                platform.speed=30;
            } else if(smashPoint>249){
                platform.speed=20;
            } else if(smashPoint>99){
                platform.speed=10;
            } else if(smashPoint>49){
                platform.speed=5;
            } else if(smashPoint>24){
                platform.speed=3;
            }
            //Hammer goes sideways
            platform.x-=platform.speed;
            //Game ends if passes the last white mark
            if(platform.x+platform.size+30<=0){
                player1.dead=true;
            }
        }
    }
}
var index=0;
//Colors the triangles in trinity
setInterval(function(){
    if(trinity&&!pause){
        triangle.color1=false;
        triangle.color2=false;
        triangle.color3=false;
        switch(trinityArr[index]){
            case 0:
                triangle.color1=true;
                triangle.color2=false;
                triangle.color3=false;
                break;
            case 1:
                triangle.color1=false;
                triangle.color2=true;
                triangle.color3=false;
                break;
            case 2:
                triangle.color1=false;
                triangle.color2=false;
                triangle.color3=true;
                break;
            default:
                break;
        }
        if(index!=trinityArr.length){
            index++;
        }
    }
},800);
function instruct(){
    document.getElementById("intro").style.bottom="100vh";
}
function back(){
    document.getElementById("intro").style.bottom="0vh";
    document.getElementById("instructionPage").style.bottom="0vh";
    restartGame();
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
    player1.color="white";
    player2.color="orange";
    player1.x=0;
    player1.y=0;
    player1.ySpeed=0;
    player2.ySpeed=0;
    player2.x=window.innerWidth-player2.size;
    player2.y=0;
    points=-1;
    obstacle.y=-obstacle.size;
    player1.dead=false;
    player2.dead=false;
    safeSpot.x=Math.random()*(grid.offsetWidth-safeSpot.size);
    for(let i=0;i<number.length;i++){
        number[i].innerHTML="?";
    }
    for(let i=0;i<numBox.length;i++){
        numBox[i].style.backgroundColor="transparent";
        numBox[i].style.border="white 4px solid";
    }
    secretAddition=[];
    boxID=-1;
    trinityArr=[];
    trialArr=[];
    index=0;
    smashPoint=0;
    platform.x=window.innerWidth+20;
    platform.speed=2;
    obstacle.speed=2;
    //Unpause game so that canvas can change
    pause=false;
    document.getElementById("pauseButton").style.backgroundColor="rgb(255, 212, 147)";
}
setInterval(function(){
    if(bubble&&!pause&&!player1.dead){
        points++;
    }
},1000);
//Use this so checks collision faster
setInterval(function(){
    if(squareUp&&!player1.dead&&!player2.dead){
        if((player1.y+player1.size>=player2.y&&player1.y+player1.size<=player2.y+20)&&(player1.x<=player2.x+player2.size&&player1.x+player1.size>=player2.x)&&player1.jump&&player1.ySpeed>0){
            player2.dead=true;
        }
        if((player2.y+player2.size>=player1.y&&player2.y+player2.size<=player1.y+20)&&(player2.x<=player1.x+player1.size&&player2.x+player2.size>=player1.x)&&player2.jump&&player2.ySpeed>0){
            player1.dead=true;
        }
    }
});
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

See how to solve bubble collision problem
See if want to make hard modes for add equation
*/