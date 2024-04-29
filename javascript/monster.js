

class Monster {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height / 2; // 화면 상단 중앙에 위치
        this.hp = 1;
        this.speed = Math.random() * 2 + 100;
        this.attack = 1;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height); // 몬스터를 캔버스에 그림
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime; // 적군을 아래로 이동시킴

        // 화면 아래로 벗어난 경우 재생성
        if (this.y > canvas.height) {
            this.y = -this.height / 2; // 화면 상단 중앙에 위치
            this.x = Math.random() * (canvas.width - this.width);
            this.speed = Math.random() * 2 + 100;
        }
    }
}

const monster = new Monster();

class Mbullet {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.x = player.x + player.width / 2;
        this.y = player.y - 10;
        this.speed = 50;
        this.attack = 1;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }


// 게임 루프에서 적군 생성 및 업데이트

const monsters = []; // 적군 배열

function spawnMonster() {
    if (monsters.length < 10) { // 몬스터 최대 생성 갯수가 10개 이하일 때만 새로운 몬스터 생성
        const monster = new Monster();
        monsters.push(monster);
        if(monster.length < 1){
            let mbullet = new Mbullet(); 
            mbullet.draw();

        } 
        
    }
}
function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000; // 이전 프레임에서 현재 프레임까지의 시간 간격 계산
    lastTime = timestamp;

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

    // 적군 업데이트 및 그리기
    monsters.forEach(monster => {
        monster.update(deltaTime);
        monster.draw();
    });

    requestAnimationFrame(gameLoop); // 다음 프레임 요청
}


let lastTime = 0;

spawnMonster(); // 최초 적군 생성
setInterval(spawnMonster, 1000); // 1초마다 적군 생성

// onCrash(player, object);
requestAnimationFrame(gameLoop); // 게임 루프 시작

