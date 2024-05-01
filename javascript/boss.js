// const canvas = document.getElementById("canvas"); //캔버스
// const ctx = canvas.getContext("2d"); //2d
// canvas.width = 800; //화면 넓이
// canvas.height = window.innerHeight; //화면 높이


// let bulltInterval;

class Boss {
    constructor() {
        // 넓이
        this.width = 200;
        // 높이
        this.height = 200;
        // 가로(x) 좌표
        this.x = 50;
        //  세로(y) 좌표
        this.y = 50;
        this.hp = 10;
        // 움직일때 속도
        this.speed = 5;
        this.attack = 1;
        this.direction_x = 1;
        this.direction_y = 0;
        this.patten = 0;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)

    }
    drawHP(idx) {
        ctx.fillStyle = "red";
        ctx.fillRect(10 + idx * 40, 10, 30, 30);
    }


    moveBoss() {

        if (this.x > canvas.width - this.width) {
            this.direction_x = -1;
        } else if (this.x < 0) {
            this.direction_x = 1;
        } else if (this.x == canvas.width / 2 - this.width / 2) {
            if (this.patten == 2) {
                if (this.direction_x != 0) {

                    setTimeout(function () {
                        boss.direction_y = 1;

                    }, 2000);
                }
                if (this.y > canvas.height / 2) {
                    boss.direction_y = -1;

                }
                clearInterval(bulltInterval);
                this.direction_x = 0;
                if (this.direction_y == -1 && this.y == 50) {
                    this.direction_y = 0;
                    this.direction_x = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
                    console.log(this.direction_x);
                    this.patten = 0;
                    bulltInterval = setInterval(createbossBullet, 300, boss);
                }


            } else {
                this.patten = Math.floor(Math.random() * 3);
            }
        }


        this.x += this.direction_x * this.speed;
        this.y += this.direction_y * this.speed;
        //this.y -=this.speed;
    }
}
// 적 생성 함수
const enemies = [];
function spawnEnemy() 
{
    
    return {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        color: "#FFA500",
        speed: Math.random() * 2 + 1
    };
    
}

let bulletList = []
class bossBullet {
    constructor(boss, speed = 10) {
        this.width = 10;
        this.height = 10;
        this.x = boss.x + boss.width / 2;
        this.y = boss.y + boss.height + 10;
        this.speed = speed;
        this.attack = 1;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //boss 총알에 player hp 감소 
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x - this.width &&
            player.y < this.y + this.radius &&
            player.y + player.height > this.y - this.width
        ) {
            // 플레이어의 체력 감소
            player.hp -= 1; // 


            // 보스 총알 제거
            bossBullets.splice(index, 1);
        }
    }
    move() {
        this.y += this.speed;

    }

}





function createbossBullet(boss) {
    console.log(boss);
    let b = new bossBullet(boss);
    let c = new bossBullet(boss, 1);
    bulletList.push(b);
    bulletList.push(c);

}


let boss = new Boss();


let bossBulletTime = 0;
function bossUpdate() {
    boss.draw();
    boss.moveBoss();
    

    bulletList.forEach((item, index) => {
        item.draw();
        item.move();
    });

    if (Math.random() < 0.02) {
        enemies.push(spawnEnemy());
    }
    

    
    enemies.forEach((enemy, index) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    
        // 적 이동
        enemy.y += enemy.speed;
        
    
        // 적이 캔버스 아래쪽으로 나갔을 때 제거
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
        
    });
    

    requestAnimationFrame(bossUpdate);
   


}

// setInterval(createbossBullet,300,boss);

bulltInterval = setInterval(createbossBullet, 300, boss);
bossUpdate();

