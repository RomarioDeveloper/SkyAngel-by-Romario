var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var plane = new Image();
var crushed_plane = new Image();
var bird = new Image();
var star = new Image();
var bg = new Image();
var obl1 = new Image();
var obl2 = new Image();
var obl3 = new Image();
var star_iconf = new Image();
var gasf = new Image();
var starf = new Image();
var parf = new Image();

var bg_sound = new Audio();
var hit_sound = new Audio();
var star_sound = new Audio();
var finish_sound = new Audio();

var volume = document.getElementById("volume");
var volume_muted = document.getElementById("volume_muted");
var font = document.getElementById("font_size");
var pause = document.getElementById("pause");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var main_menu = document.getElementById("main_menu");
var kak_igrat = document.getElementById("kak_igrat");
var back_k = document.getElementById("back_k");

var timer = 0;
var star_score = 0;
var gas_score = 10;

var xPlane = 70;
var yPlane = 280;

var up = false,
  down = false,
  left = false,
  right = false;

var birdc = [];
birdc[0] = {x: 1024, y: 200, animX: 0, animY: 0};
var birdf = [];
birdf[0] = {x: 1024, y: 400, animX: 0, animY: 0};

var ob1 = [];
ob1[0] = {x: 1024, y: 160};
var ob2 = [];
ob2[0] = {x: 1224, y: 60};
var ob3 = [];
ob3[0] = {x: 1524, y: 230};

var star = [];
star[0] = {x: 700, y: -80, del: 0};
var par = [];
par[0] = {x: 600, y: -80, del: 0};

plane.src = "mediaFiles/plane2.png";
crushed_plane.src = "mediaFiles/crushed_plane.png";
bird.src = "mediaFiles/bird_33.png";
bg.src = "mediaFiles/fon.png";
obl1.src = "mediaFiles/ob1.png";
obl2.src = "mediaFiles/ob2.png";
obl3.src = "mediaFiles/ob3.png";
star_iconf.src = "mediaFiles/star-icon.png";
gasf.src = "mediaFiles/gas.png";
starf.src = "mediaFiles/star.png";
parf.src = "mediaFiles/parachute.png";

bg_sound.src = "mediaFiles/background.mp3";
hit_sound.src = "mediaFiles/hit.mp3";
star_sound.src = "mediaFiles/star.mp3";
finish_sound.src = "mediaFiles/finish.mp3";

(main_menu.onload = draw), gas_and_timer;

function gas_and_timer() {
  if (paused == false) {
    gas_score--;
    timer++;
  }
  if (game_over == true) {
    clearInterval(timer_s);
  }
}
var timer_s = setInterval(gas_and_timer, 1000);

var tmr = 0;
var vol = true;
var font_size = 2;
var game_over = false;

var paused = true;
pause.onclick = pausefun;

volume.onclick = function () {
  volume.style.display = "none";
  volume_muted.style.display = "block";
  vol = false;
};
volume_muted.onclick = function () {
  volume_muted.style.display = "none";
  volume.style.display = "block";
  vol = true;
};

btn1.onclick = function () {
  main_menu.style.display = "none";
  paused = false;
  draw();
};
btn2.onclick = function () {
  kak_igrat.style.transform = "translateX(0)";
};
back_k.onclick = function () {
  kak_igrat.style.transform = "translateX(-455px)";
};
back_menu.onclick = function () {
  location.reload();
};
document.getElementById("back_menu_over").onclick = () => {
  location.reload();
};

font.onclick = function () {
  if (font_size == 2) {
    font_size = 3;
  } else if (font_size == 3) {
    font_size = 1;
  } else if (font_size == 1) {
    font_size = 2;
  }
};

function pausefun() {
  if (paused == false) {
    paused = true;
    pause.className = "paused";
    pause_wrapper.style.display = "block";
    pause_text.style.display = "block";
    back_menu.style.display = "block";
    probel.style.display = "block";
  } else if (paused == true) {
    paused = false;
    draw();
    pause.className = "pause";
  }
}

function game_over_wrapper() {
  setTimeout(() => {
    document.getElementById("game_over_text").innerHTML = "Продержались " + timer + " секунд<br/>" + "Набрали " + star_score + " звезд";
    document.getElementById("game_over_wrapper").style.display = "flex";
  }, 1500);
}

function draw() {
  ctx.drawImage(bg, 0, 0);

  bg_sound.play();

  if (paused == true) {
    pause.className = "paused";
  }
  if (paused == false) {
    pause.className = "pause";
  }

  if (paused == false) {
    pause_wrapper.style.display = "none";
    pause_text.style.display = "none";
    back_menu.style.display = "none";
    probel.style.display = "none";
  }

  if (vol == true) {
    bg_sound.volume = 0.1;
    hit_sound.volume = 0.06;
    star_sound.volume = 0.1;
    finish_sound.volume = 0.1;
  }

  if (vol == false) {
    bg_sound.volume = 0;
    hit_sound.volume = 0;
    star_sound.volume = 0;
    finish_sound.volume = 0;
  }

  tmr++;

  if (gas_score <= 0) {
    gas_score = 0;
  }
  if (gas_score == 0) {
    game_over = true;
    game_over_wrapper();
  }

  for (var i = 0; i < ob1.length; i++) {
    ctx.drawImage(obl1, ob1[i].x, ob1[i].y, 140, 60);

    ob1[i].x -= 2.5;

    if (ob1[i].x <= 500 && ob1[i].x >= 499) {
      ob1.push({
        x: 1024,
        y: 160,
      });
    }
  }
  for (var i = 0; i < ob2.length; i++) {
    ctx.drawImage(obl2, ob2[i].x, ob2[i].y, 180, 90);

    ob2[i].x -= 3;

    if (ob2[i].x <= 600 && ob2[i].x >= 599) {
      ob2.push({
        x: 1224,
        y: 60,
      });
    }
  }
  for (var i = 0; i < ob3.length; i++) {
    ctx.drawImage(obl3, ob3[i].x, ob3[i].y, 240, 130);

    ob3[i].x -= 4.5;

    if (ob3[i].x <= 750 && ob3[i].x >= 749) {
      ob3.push({
        x: 1524,
        y: 230,
      });
    }
  }

  for (var i = 0; i < star.length; i++) {
    ctx.drawImage(starf, star[i].x, star[i].y, 55, 52);

    star[i].x -= 3;
    star[i].y += 3;

    if (xPlane + 150 >= star[i].x && xPlane <= star[i].x + 50 && yPlane + 60 >= star[i].y && yPlane <= star[i].y + 50) {
      star_score++;
      star[i].del = 1;
      star_sound.play();
    }
    if (star[i].del == 1) {
      star.splice(i, 1);
      star[i]--;
    }
  }
  if (tmr % 300 == 0) {
    star.push({
      x: Math.floor(Math.random() * 680) + 450,
      y: -80,
    });
  }

  for (var i = 0; i < par.length; i++) {
    ctx.drawImage(parf, par[i].x, par[i].y, 45, 70);

    par[i].x -= 3;
    par[i].y += 3;

    if (xPlane + 150 >= par[i].x && xPlane <= par[i].x + 50 && yPlane + 60 >= par[i].y && yPlane <= par[i].y + 50) {
      gas_score = 10;
      par[i].del = 1;
      star_sound.play();
    }

    if (par[i].del == 1) {
      par.splice(i, 1);
      par[i]--;
    }
  }
  if (tmr % 420 == 0) {
    par.push({
      x: Math.floor(Math.random() * 680) + 450,
      y: -80,
    });
  }

  for (i in birdc) {
    birdc[i].animX += 0.2;
    if (birdc[i].animX > 4) {
      birdc[i].animX = 0;
    }
  }

  for (var i = 0; i < birdc.length; i++) {
    //ctx.drawImage(bird, birdc[i].x, birdc[i].y, 93, 48);
    ctx.drawImage(bird, 843 * Math.floor(birdc[i].animX), 580 * Math.floor(birdc[i].animY), 843, 580, birdc[i].x, birdc[i].y, 93, 54);

    birdc[i].x -= 8;

    if ((birdc[i].x <= 1024, birdc[i].x >= 600)) {
      birdc[i].y -= 0.9;
    } else if ((birdc[i].x <= 599, birdc[i].x >= 200)) {
      birdc[i].y += 1.2;
    } else if ((birdc[i].x <= 199, birdc[i].x >= 0)) {
      birdc[i].y -= 0.9;
    }

    if (birdc[i].x == 208) {
      birdc.push({
        x: 1024,
        y: Math.floor(Math.random() * 550) + 50,
        animX: 0,
        animY: 0,
      });
    }

    if (xPlane + 150 >= birdc[i].x && xPlane <= birdc[i].x + 80 && yPlane + 60 >= birdc[i].y && yPlane <= birdc[i].y + 40) {
      hit_sound.play();
      game_over = true;
      game_over_wrapper();
    }
  }

  for (i in birdf) {
    birdf[i].animX += 0.2;
    if (birdf[i].animX > 4) {
      birdf[i].animX = 0;
    }
  }

  for (var i = 0; i < birdf.length; i++) {
    //ctx.drawImage(bird, birdf[i].x, birdf[i].y, 65, 35);
    ctx.drawImage(bird, 843 * Math.floor(birdf[i].animX), 580 * Math.floor(birdf[i].animY), 843, 580, birdf[i].x, birdf[i].y, 65, 39);

    birdf[i].x -= 6;

    if ((birdf[i].x <= 1024, birdf[i].x >= 600)) {
      birdf[i].y -= 0.9;
    } else if ((birdf[i].x <= 599, birdf[i].x >= 200)) {
      birdf[i].y += 1.2;
    } else if ((birdf[i].x <= 199, birdf[i].x >= 0)) {
      birdf[i].y -= 0.9;
    }

    if (birdf[i].x == 352) {
      birdf.push({
        x: 1024,
        y: Math.floor(Math.random() * 550) + 50,
        animX: 0,
        animY: 0,
      });
    }

    if (xPlane + 150 >= birdf[i].x && xPlane <= birdf[i].x + 55 && yPlane + 60 >= birdf[i].y && yPlane <= birdf[i].y + 30) {
      hit_sound.play();
      game_over = true;
      game_over_wrapper();
    }
  }

  if (up == true) {
    yPlane -= 3.5;
  }
  if (left == true) {
    xPlane -= 3.5;
  }
  if (right == true) {
    xPlane += 3.5;
  }
  if (down == true) {
    yPlane += 3.5;
  }

  if (xPlane >= 850) {
    xPlane -= 3.5;
  }
  if (xPlane <= 0) {
    xPlane += 3.5;
  }
  if (yPlane <= 0) {
    yPlane += 3.5;
  }
  if (yPlane >= 540 && game_over == false) {
    yPlane -= 3.5;
  }

  if (game_over == false) {
    ctx.drawImage(plane, xPlane, yPlane, 150, 60);
  } else {
    ctx.drawImage(crushed_plane, xPlane, yPlane, 140, 95);
  }

  ctx.drawImage(star_iconf, 30, 30, 55, 50);
  ctx.drawImage(gasf, 33, 110, 55, 55);

  ctx.fillStyle = "#000";
  if (font_size == 1) {
    ctx.font = "26px Tahoma";
  }
  if (font_size == 2) {
    ctx.font = "30px Tahoma";
  }
  if (font_size == 3) {
    ctx.font = "34px Tahoma";
  }
  ctx.fillText(star_score, 110, 75);
  ctx.fillText(gas_score, 110, 152);
  ctx.fillText("Таймер: " + timer + " c", 420, 50);

  if (game_over == true) {
    yPlane += 6;
    document.removeEventListener("keydown", keydownmove);
    document.removeEventListener("keyup", keyupmove);
    up = false;
    down = false;
    left = false;
    right = false;
  }

  if (paused == false) {
    requestAnimationFrame(draw);
  }
}

document.addEventListener("keydown", keydownmove);
document.addEventListener("keyup", keyupmove);

function keydownmove(e) {
  if (e.keyCode == 37) {
    left = true;
  }
  if (e.keyCode == 38) {
    up = true;
  }
  if (e.keyCode == 39) {
    right = true;
  }
  if (e.keyCode == 40) {
    down = true;
  }
  if (e.keyCode == 32) {
    pausefun();
  }
}

function keyupmove(e) {
  if (e.keyCode == 37) {
    left = false;
  }
  if (e.keyCode == 38) {
    up = false;
  }
  if (e.keyCode == 39) {
    right = false;
  }
  if (e.keyCode == 40) {
    down = false;
  }
}
