let tratorX = -100;
let stickers = [];
let pontos = 0;
let objetivo = 10;
let jogoVencido = false;
let fase = 1; // começa no dia
let somColeta;

function preload() {
  somColeta = loadSound('Wood-Snap_66fb0a7767c5c9.07580340.mp3'); // som online leve
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  drawCenario();

  // Texto decorativo
  fill(255);
  textSize(24);
  text(`Fase ${fase}: Colete os stickers para conectar campo e cidade!`, width / 2, 50);

  // Exibe pontuação
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Pontos: ${pontos}`, 20, 20);
  textAlign(CENTER, CENTER);

  if (!jogoVencido) {
    // Anima trator
    drawTrator(tratorX, height / 2 + 50);
    tratorX += 2 + fase; // aumenta a velocidade conforme a fase
    if (tratorX > width) {
      tratorX = -100;
    }

    // Em tempos aleatórios, gera stickers saindo do trator
    if (frameCount % int(random(30, 90)) === 0) {
      let tipoSorteado = random(["coracao", "estrela", "emoji"]);
      let dirX = random(-1, 1);
      let dirY = random(-1, -3);
      stickers.push({ x: tratorX + 40, y: height / 2 + 50, tipo: tipoSorteado, dx: dirX, dy: dirY });
    }

    // Desenha e move stickers
    for (let i = stickers.length - 1; i >= 0; i--) {
      stickers[i].x += stickers[i].dx;
      stickers[i].y += stickers[i].dy;

      textSize(30);
      if (stickers[i].tipo === "coracao") {
        fill(255, 105, 180);
        text("❤", stickers[i].x, stickers[i].y);
      } else if (stickers[i].tipo === "estrela") {
        fill(255, 223, 0);
        text("⭐", stickers[i].x, stickers[i].y);
      } else if (stickers[i].tipo === "emoji") {
        fill(255);
        text("🎉", stickers[i].x, stickers[i].y);
      }

      if (stickers[i].y < 0 || stickers[i].y > height || stickers[i].x < 0 || stickers[i].x > width) {
        stickers.splice(i, 1);
      }
    }
  } else {
    fill(0, 200, 0);
    textSize(32);
    text(`Parabéns! Você venceu a Fase ${fase}!`, width / 2, height / 2);
    textSize(20);
    text("Pressione 'N' para a próxima fase ou 'R' para reiniciar.", width / 2, height / 2 + 40);
  }
}

function drawCenario() {
  if (fase === 1) {
    background(135, 206, 235); // dia (azul claro)
  } else if (fase === 2) {
    background(255, 140, 0); // pôr do sol (alaranjado)
  } else if (fase === 3) {
    background(25, 25, 112); // noite (azul escuro)
  }

  // Campo
  fill(34, 139, 34);
  rect(0, height / 2, width / 2, height / 2);
  for (let i = 50; i < width / 2; i += 100) {
    fill(139, 69, 19);
    rect(i, height / 2 - 40, 10, 40);
    fill(34, 139, 34);
    ellipse(i + 5, height / 2 - 40, 40);
  }

  // Cidade
  fill(169, 169, 169);
  rect(width / 2, height / 2, width / 2, height / 2);
  for (let i = width / 2 + 50; i < width; i += 80) {
    fill(100);
    rect(i, height / 2 - 100, 40, 100);
    fill(255);
    rect(i + 10, height / 2 - 90, 10, 10);
    rect(i + 10, height / 2 - 70, 10, 10);
    rect(i + 10, height / 2 - 50, 10, 10);
  }

  // Estrada
  fill(50);
  rect(0, height / 2 + 90, width, 20);
  for (let i = 0; i < width; i += 40) {
    fill(255, 255, 0);
    rect(i, height / 2 + 98, 20, 4);
  }
}

function drawTrator(x, y) {
  fill(255, 165, 0);
  rect(x, y, 80, 40);
  fill(0);
  ellipse(x + 15, y + 40, 30);
  ellipse(x + 65, y + 40, 30);
}

function mousePressed() {
  for (let i = stickers.length - 1; i >= 0; i--) {
    if (dist(mouseX, mouseY, stickers[i].x, stickers[i].y) < 30) {
      pontos++;
      somColeta.play();
      stickers.splice(i, 1);
      if (pontos >= objetivo) {
        jogoVencido = true;
      }
      break;
    }
  }
}

function keyPressed() {
  if (jogoVencido && key === 'n') {
    pontos = 0;
    jogoVencido = false;
    stickers = [];
    fase++;
    if (fase > 3) fase = 1; // volta ao início após a terceira fase
  }
  if (jogoVencido && key === 'r') {
    pontos = 0;
    jogoVencido = false;
    stickers = [];
    fase = 1;
  }
}
