class Mbullet {
    constructor(monster) {
        this.width = 10;
        this.height = 10;
        this.x = monster.x + monster.width / 2; // 몬스터의 x 좌표 중심에 위치
        this.y = monster.y + monster.height; // 몬스터의 바로 아래에서 생성
        this.speed = 500; // 총알의 속도
        this.attack = 1;
    }

    draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime; // 총알을 아래로 이동

        // 총알이 화면을 벗어나면 제거
        if (this.y > canvas.height) {
            this.remove();
        }
    }

    remove() {
        // 총알을 배열에서 제거
        mbullets.splice(mbullets.indexOf(this), 1);
    }
}

const mbullets = []; // 총알 배열

function spawnMbullet(monster) {
    const mbullet = new Mbullet(monster);
    mbullets.push(mbullet);
}

class Monster {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height / 2; // 화면 상단 중앙에 위치
        this.speed = Math.random() * 2 + 100;
        this.lastShootTime = 0; // 마지막 총알 발사 시간
        this.shootInterval =  1000; // 총알 발사 간격 (2초)
        this.hp = 1;
        this.attack = 1;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height); // 몬스터를 캔버스에 그림
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime; // 적군을 아래로 이동

        // 일정 시간마다 총알 발사
        const currentTime = performance.now();
        if (currentTime - this.lastShootTime > this.shootInterval) {
            this.shoot();
            this.lastShootTime = currentTime;
        }

        // 화면 아래로 벗어난 경우 재생성
        if (this.y > canvas.height) {
            this.y = -this.height / 2; // 화면 상단 중앙에 위치
            this.x = Math.random() * (canvas.width - this.width);
            this.speed = Math.random() * 2 + 100;
        }
    }

    shoot() {
        spawnMbullet(this);
    }
}

// 적군 업데이트 및 그리기 함수 추가
function updateMbullets(deltaTime) {
    mbullets.forEach(mbullet => {
        mbullet.update(deltaTime);
        mbullet.draw();
    });
}

// 충돌 감지 및 처리 함수
function onCrash(player, object) {
    let player_x = player.x + player.width;
    let object_x = object.x + object.width;
    let player_y = player.y + player.height;
    let object_y = object.y + object.height;
    if (player.x < object_x && player_x > object.x) {
        // 플레이러와 오브젝트가 충돌한 경우
        if (player.y < object_y && player_y > object.y) {
            // 오브젝트가 몬스터인 경우
            if (object instanceof Monster) {
                player.hp -= object.attack;
                //플레이어의 무적 상태 설정 및 해제
                invincibility = true;
               setTimeout(() => { invincibility = false; }, 1000);
            }
            // 오브젝트가 mbullet인 경우
            else if (object instanceof Mbullet) {
                player.hp -= object.attack;
                // mbullet 제거
                object.remove();
                // 플레이어의 무적 상태 설정 및 해제
                invincibility = true;
                setTimeout(() => { invincibility = false; }, 1000);
            }
        }
    }
}

// 게임 루프에서 적군 생성 및 업데이트
const monsters = []; // 적군 배열

function spawnMonster() {
    if (monsters.length < 10) { // 몬스터 최대 생성 갯수가 10개 이하일 때만 새로운 몬스터 생성
        const monster = new Monster();
        monsters.push(monster);
    }
}

// 게임 루프에서 총알 업데이트 호출 추가
function updateMbullets(deltaTime) {
    mbullets.forEach(mbullet => {
        mbullet.update(deltaTime);
        mbullet.draw();
    });
}




// 게임 루프 함수
function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000; // 이전 프레임에서 현재 프레임까지의 시간 간격 계산
    lastTime = timestamp;

    // 적군 업데이트 및 그리기
    monsters.forEach(monster => {
        monster.update(deltaTime);
        monster.draw();
    });

    // 총알 업데이트 및 그리기
    updateMbullets(deltaTime);

    // 플레이어와 몬스터의 충돌 감지 및 처리
    monsters.forEach(monster => {
        if (!invincibility) {
            onCrash(player, monster);
        }
    });
   
    animatinoFrame=requestAnimationFrame(gameLoop); // 다음 프레임 요청
}


//1프레임당 1번 실행
//

// 게임 루프 시작
let lastTime = 0;
let animatinoFrame;
spawnMonster(); // 최초 적군 생성
setInterval(spawnMonster, 1000); // 1초마다 적군 생성
requestAnimationFrame(gameLoop); // 게임 루프 시작