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
  drawHp(i, margin) {
    // i는 갯수 margin 는 그림 사이의 거리

    ctx.fillStyle = "pink";
    ctx.fillRect(10 + i * margin, 10, 30, 30);
  }
}

class Bullet {
  constructor(player) {
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

  move() {
    if (this.y < 0) {
      bulletArr.shift();
      return;
    }
    this.y -= this.speed * deltaTime;
    this.draw();
    if (!invincibility) {
      onCrash(player, this);
    }
  }
}

class Monster {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = -this.height / 2; // 화면 상단 중앙에 위치
    this.speed = Math.random() * 2 + 20;
    this.lastShootTime = 0; // 마지막 총알 발사 시간
    this.shootInterval = 1000; // 총알 발사 간격 (2초)
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
      this.speed = Math.random() * 10 + 20;
    }
  }

  shoot() {
    spawnMbullet(this);
  }

}

class Mbullet {
  constructor(monster) {
    this.width = 10;
    this.height = 10;
    this.x = monster.x + monster.width / 2; // 몬스터의 x 좌표 중심에 위치
    this.y = monster.y + monster.height; // 몬스터의 바로 아래에서 생성
    this.speed = 100; // 총알의 속도
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

class Item {
  constructor(monster){
    this.width = 50;
    this.height = 50;
    this.x = monster.x;
    this.y = monster.y;
    this.speed = 50;
    this.hp = 1;
    this.directionX = Math.random() < 0.5 ? -1 : 1; // 랜덤한 가로 방향 설정 (-1 또는 1)
    this.directionY = Math.random() < 0.5 ? -1 : 1; // 랜덤한 세로 방향 설정 (-1 또는 1)
  }

  draw() {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime) {
    // 가로 방향으로 이동
    this.x += this.speed * this.directionX * deltaTime;
    // 세로 방향으로 이동
    this.y += this.speed * this.directionY * deltaTime;

    // 가로 경계 검사
    if (this.x < 0 || this.x + this.width > canvas.width) {
      this.directionX *= -1; // 방향 반전
    }
    // 세로 경계 검사
    if (this.y < 0 || this.y + this.height > canvas.height) {
      this.directionY *= -1; // 방향 반전
    }
  }
}
