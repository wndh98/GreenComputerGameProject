const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=800;
canvas.height=window.innerHeight;

class Player{
    constructor(){
        this.width=50;
        this.height=50;
        this.x=canvas.width/2 - this.width/2;
        this.y=canvas.height - (this.height + 50);
        this.hp=3;
        this.speed=100;
        this.attack=1;
    }
    draw(){
        ctx.fillStyle='green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

let player=new Player();
class Bullet{
    constructor(){
        this.width=10;
        this.height=10;
        this.x=player.x+player.width/2;
        this.y=player.y-10;
        this.speed=12;

    }
    draw(){
        
        ctx.fillStyle='red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}





let deltaTime;
let previousTime=performance.now();
let moveDirection="";
let bulletArr=[]
let widthLimit=canvas.width-player.width;
let heightLimit=canvas.height - player.height;

function update(currentTime){
    currentTime=performance.now();
    deltaTime=(currentTime-previousTime)/100;
    previousTime=currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    bulletArr.forEach((bullet)=>{
        bullet.draw();
        bullet.y-=bullet.speed;
    });
    
        playerMove(moveDirection);
    
    requestAnimationFrame(update);
}

requestAnimationFrame(update);





window.addEventListener("keydown",function(e){
    console.log(e);
    if(e.code=="ArrowLeft" || e.code=="ArrowRight" || e.code=="ArrowUp" || e.code=="ArrowDown"){
        moveDirection=e.code;
    }
    if(e.code=="Space"){
        let bullet=new Bullet();
        bullet.draw();
        bulletArr.push(bullet);
        
    }
});
window.addEventListener("keyup",function(e){
    if(e.code=="ArrowLeft" || e.code=="ArrowRight" || e.code=="ArrowUp" || e.code=="ArrowDown"){
        moveDirection="";
    }

});



function playerMove(move){
    if(move=="ArrowLeft"){
        if(player.x-player.speed*deltaTime > 0){
            player.x-=player.speed*deltaTime;
        }else{
            player.x=0;
        }
    }else if(move=="ArrowRight" ){
        if((player.x + player.speed*deltaTime) < widthLimit){
            player.x+=player.speed*deltaTime;
        }else{
            player.x=widthLimit;
        }
    }else if(move=="ArrowUp"){
        if(player.y-player.speed*deltaTime > 0){
            player.y-=player.speed*deltaTime;
        }else{
            player.y=0;
        }
    }else if(move=="ArrowDown"){
        if((player.y + player.speed*deltaTime) < heightLimit){
            player.y+=player.speed*deltaTime;
        }else{
            player.y=heightLimit;
        }
    }
}


function onCrash(player,object){

}



