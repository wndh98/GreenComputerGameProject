// const canvas = document.getElementById("canvas"); //캔버스
// const ctx = canvas.getContext("2d"); //2d
// canvas.width = 800; //화면 넓이
// canvas.height = window.innerHeight; //화면 높이





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

