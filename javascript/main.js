const canvas = document.getElementById("canvas"); //캔버스
const ctx = canvas.getContext("2d"); //2d
canvas.width = 800; //화면 넓이
canvas.height = window.innerHeight; //화면 높이



class Player {
    //플레이어 class 선언
    constructor() {

        this.width = 50; //wdith 50
        this.height = 50; //height 50
        this.x = canvas.width / 2 - this.width / 2; //x좌표
        this.y = canvas.height - (this.height + 50); //y좌표
        this.hp = 3; //player 체력
        this.speed = 120; //속도
        this.attack = 1; //공격력

    }
    draw() {
        //플레이어 그리기 함수 나중에 이미지로 대체
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    drawHp(idx) {
        //플레이어 그리기 함수 나중에 이미지로 대체
        ctx.fillStyle = "pink";
        ctx.fillRect(10 + idx * 40, 10, 30, 30);
    }

}

let player = new Player();

class Bullet {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.x = player.x + player.width / 2;
        this.y = player.y - 10;
        this.speed = 110;
        this.attack = 1;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}



let deltaTime;
let previousTime = performance.now();
let moveDirection = "";
let move_x = 0;
let move_y = 0;
let bulletArr = [];
let widthLimit = canvas.width - player.width;
let heightLimit = canvas.height - player.height;
let invincibility = false;
let aniFrame;

function update(currentTime) {
    currentTime = performance.now();
    deltaTime = (currentTime - previousTime) / 100;
    previousTime = currentTime;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    for (let i = 0; i < player.hp; i++) {
        player.drawHp(i);
    }
    bulletArr.forEach((bullet) => {
        if (bullet.y < 0) {
            bulletArr.shift();
            return;
        }
        bullet.y -= bullet.speed * deltaTime;
        bullet.draw();
        if (!invincibility) {
            onCrash(player, bullet);
        }
    });

    playerMove();

    aniFrame=requestAnimationFrame(update);
    if(player.hp<=0){gameOver();}
}

requestAnimationFrame(update);

window.addEventListener("keydown", function (e) {
    if (e.code == "ArrowLeft") {
        move_x = -1 * player.speed * deltaTime;
    } else if (e.code == "ArrowRight") {
        move_x = 1 * player.speed * deltaTime;
    } else if (e.code == "ArrowUp") {
        move_y = -1 * player.speed * deltaTime;
    } else if (e.code == "ArrowDown") {
        move_y = 1 * player.speed * deltaTime;
    }
    if (e.code == "Space") {
        let bullet = new Bullet();
        bullet.draw();
        bulletArr.push(bullet);
    }
});
window.addEventListener("keyup", function (e) {
    if (e.code == "ArrowLeft") {
        move_x = 0;
    } else if (e.code == "ArrowRight") {
        move_x = 0;
    } else if (e.code == "ArrowUp") {
        move_y = 0;
    } else if (e.code == "ArrowDown") {
        move_y = 0;
    }
});

function playerMove() {
    if (player.x + move_x > 0 && player.x + move_x < widthLimit) {
        player.x += move_x;
    }
    if (player.y + move_y > 0 && player.y + move_y < heightLimit) {
        player.y += move_y;
    }
}

function onCrash(player, object) {
    let player_x = player.x + player.width;
    let object_x = object.x + object.width;
    let player_y = player.y + player.height;
    let object_y = object.y + object.height;
    if (player.x < object_x && player_x > object.x) {
        // 플레이러아 오브젝트가 부딪칠시 플레이어의 hp - 오브젝트의 공격력
        if (player.y < object_y && player_y > object.y) {
            player.hp -= object.attack;
            invincibility=true;
            setTimeout(()=>{invincibility=false;},1000);
        }
    }
}




function gameOver(){
    cancelAnimationFrame(aniFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alert("게임종료");
}