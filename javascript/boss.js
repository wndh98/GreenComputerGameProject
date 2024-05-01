// const canvas = document.getElementById("canvas"); //캔버스
// const ctx = canvas.getContext("2d"); //2d
// canvas.width = 800; //화면 넓이
// canvas.height = window.innerHeight; //화면 높이



// boss 클래스 생성 
class Boss {
    constructor() {
        this.width = 200;
        this.height = 200;
        this.x = 50;
        this.y = 50;
        this.hp = 10;
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
        ctx.fillRect(canvas.width - idx * 40, 10, 30, 30);
    }

    // 보스의 움직임 구현 //
    moveBoss() {

        if (this.x > canvas.width - this.width) {
            this.direction_x = -1;
        } else if (this.x < 0) {
            this.direction_x = 1;
            //패턴을 랜덤으로 만들고 33.3% 확률 로 보스가 내려가서 운석을 날림
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
    }
}
// 적 생성 함수
const enemies = [];
function spawnEnemy() {
    return {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        attack: 1,
        color: "#FFA500",
        speed: Math.random() * 2 + 1
    };

}
//총알 배열 //
let bulletList = []
//총알 클래스 생성 
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
//보스의 총알 생성 
function createbossBullet(boss) {
    console.log(boss);
    let b = new bossBullet(boss);
    let c = new bossBullet(boss, 1);
    bulletList.push(b);
    bulletList.push(c);

}
let boss = new Boss();
let bossBulletTime = 0;

//보스 업데이트 
function bossUpdate() {
    boss.draw();
    boss.moveBoss();
    for (let i = 0; i < boss.hp; i++) {
        boss.drawHP(i);
    }
    if (onCrash(player, boss)) {
        if (invincibility == false) {
            onHit(player, boss);
            invincibility = true;
            setTimeout(function () { invincibility = false; }, 1000);
        }
    }
    //총알 생성 및 총알과 플레이어의 충돌 onhit () 과정 
    bulletList.forEach((item, index) => {
        item.draw();
        item.move();
        if (onCrash(player, item)) {
            if (invincibility == false) {
                onHit(player, item);
                invincibility = true;
                setTimeout(function () { invincibility = false; }, 1000);
            }
        }
    });
    //운석이 보스가 멈춰있는 패턴에서 만 랜덤으로 등장
    if (Math.random() < 0.02 && boss.patten == 2) {
        enemies.push(spawnEnemy());
    }
    
    enemies.forEach((enemy, index) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemy.speed;
        // 운석이 캔버스 아래쪽으로 나갔을 때 제거
        if (enemy.y >= canvas.height) {
            enemies.splice(index, 1);
        }
        //운석과 플레이어의 충돌 onhit () 과정 
        if (onCrash(player, enemy)) {
            if (invincibility == false) {
                onHit(player, enemy);
                invincibility = true;
                setTimeout(function () { invincibility = false; }, 1000);
            }
        }

    });
    requestAnimationFrame(bossUpdate);

}
//보스가 총알을 일정 시간동안 발사 
bulltInterval = setInterval(createbossBullet, 300, boss);
bossUpdate();

