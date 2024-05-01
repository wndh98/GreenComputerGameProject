////////////////////////////////////게임 화면 설정//////////////////////////////////
const canvas = document.getElementById("canvas"); //캔버스
const ctx = canvas.getContext("2d"); //2d
canvas.width = 800; //화면 넓이
canvas.height = window.innerHeight; //화면 높이

/////////////////////////////////////변수 선언////////////////////////////////////////////////
////델타타임
let deltaTime;
let previousTime = performance.now();
/////플레이어
let player = new Player(); //플레이어 객체
let move_x = 0; //플레이어 x축 이동방향
let move_y = 0; // 플레이어 y축 이동방향
let bulletArr = []; // 플레이어 탄환 관리
let widthLimit = canvas.width - player.width; //플레이어 이동가능 가로 최대값
let heightLimit = canvas.height - player.height; // 플레이어 이동가능 세로 최대값
let invincibility = false; //무적시간
////////몬스터///////////////////////////
const mbullets = []; // 몬스터 총알 배열
// 게임 루프에서 적군 생성 및 업데이트
const monsters = []; // 적군 배열


///////아이템///////////////////////
// const
//requestanimationFrame 담을 변수
let aniFrame;




/********************************************실제반복실행****************************************************** */
function update(currentTime) {
  createDeltaTime(); // 델타타임 생성
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 한번 클리어
  ///////////////////////////플레이어//////////////////////
  player.draw(); // 플레이어 그리기
  for (let i = 0; i < player.hp; i++) {
    player.drawHp(i, 40); // 플레이어 체력 그리기
  }
  bulletArr.forEach((bullet,i) => {
    bullet.move(); // 플레이어 총알
    monsters.forEach((monster,j) => {
        if(onCrash(bullet, monster)){
            onHit(monster,bullet);
            bulletArr.splice(i,1);
            if(monster.hp<=0){
                monsters.splice(j,1);
            }
        }
    });
  });
  playerMove();
  ///////////////////////////플레이어//////////////////////
  ////////////////////////////몬스터//////////////////////

  // 적군 업데이트 및 그리기
  monsters.forEach((monster,idx) => {
    monster.update(deltaTime);
    monster.draw();
    //충돌감지
    if(onCrash(player, monster)){
        onHit(monster,player)
        //monster.onHit(player);
        if(monster.hp<=0){
            monsters.splice(idx,1);
        }
    }

  });
  // 총알 업데이트 및 그리기

  updateMbullets(deltaTime);
  mbullets.forEach((mbullet,idx)=>{
    if(onCrash(player, mbullet)){
        onHit(mbullet,player)
        mbullets.splice(idx,1);
    }
  });

  ///////////////////////////몬스터//////////////////////

  aniFrame = requestAnimationFrame(update);
  if (player.hp <= 0) {
    gameOver();
  }
}
/********************************************실제반복실행****************************************************** */


//////////////////////////////함수 실행
requestAnimationFrame(update);
spawnMonster(); // 최초 적군 생성
setInterval(spawnMonster, 1000); // 1초마다 적군 생성

