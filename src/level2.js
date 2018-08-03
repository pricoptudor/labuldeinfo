//ideile noi din joc nu sunt ale mele, ci ale echipei mele
//eu doar le-am implementat

/*##########################################################
 ***                 Variabile globale                   ***
 ###########################################################*/
let joc;
let jucator;
let platforme;
let jucatorulACastigat = false;
let scor = 0;
let scorVictorie = 50;
let insigne;
let obiecte;
let tasteNavigare;
let butonSaritura;
let text;
let mesajVictorie;
let variabile;
let textCounter;
let jucatorulAPierdut = false;
let mesajPierdere;
let otravuri;
let vieti = 3;
let textVieti;
let back;
let lava;
let lave;
let mus;
let pal;
let palGrea;
let monedaGrea;
let palGrea2;
let palAlph = false;
let monedaGrea2;
let started = false;
let stea;
let counter = 0;
let god = false;
let coordonateMonede = [
  {X: 25, Y:145}, //
  {X: 500, Y:305}, //
  {X: 765, Y:100}, //
  {X: 270, Y:400}, //
  {X: 535, Y:180}, //
];

/*##########################################################
 ***                       Functii                       ***
 ###########################################################*/

/*************************
 * Adauga monede pe ecran
 * 
 * Coordante este un array de array'uri de 2 elemente
 *************************/

let moneda1, moneda2, moneda3;
function aduagaMonede(coordonate) {
  obiecte = joc.add.physicsGroup();

  monedaGrea2 = obiecte.create(coordonate[4].X, coordonate[4].Y, 'moneda');
  monedaGrea2.animations.add('spin');
  monedaGrea2.animations.play('spin', 10, true);
  
  moneda1 = obiecte.create(coordonate[0].X, coordonate[0].Y, 'moneda');
  moneda1.animations.add('spin');
  moneda1.animations.play('spin', 10, true);

  moneda2 = obiecte.create(coordonate[2].X, coordonate[2].Y, 'moneda');
  moneda2.animations.add('spin');
  moneda2.animations.play('spin', 10, true);

  moneda3 = obiecte.create(coordonate[3].X, coordonate[3].Y, 'moneda');
  moneda3.animations.add('spin');
  moneda3.animations.play('spin', 10, true);

  monedaGrea = obiecte.create(coordonate[1].X, coordonate[1].Y, 'moneda');
  monedaGrea.animations.add('spin');
  monedaGrea.animations.play('spin', 10, true);
  monedaGrea.body.gravity.x = 0;
  monedaGrea.body.velocity.x = 300;
}

/***************************
* Adauga platforme pe ecran
****************************/

let pal1, pal2, pal3, pal4;
function adaugaPlatforme() {
  platforme = joc.add.physicsGroup();
  
  pal1 = platforme.create(250, 450, 'platforma'); //jos init
  pal2 = platforme.create(100, 250, 'platforma'); //stanga max
  pal3 = platforme.create(1125, 100, 'platforma'); //finish
  pal4 = platforme.create(860, 200, 'platforma'); //comentariu 

  palGrea = platforme.create(350, 350, 'platforma');
  palGrea.body.gravity.x = 0;
  palGrea.body.velocity.x = 300;

  palGrea2 = platforme.create(500, 235, 'platforma');

  pal = platforme.create(0, 500, 'platformaInceput');

  platforme.setAll('body.immovable', true);
}

/*************
* Adauga stea
*************/
let steluta;
function adaugaSteluta() {
  stea = joc.add.physicsGroup();
  steluta = stea.create(1150, 530, 'stea');
  steluta.animations.add('spin');
  steluta.animations.play('spin', 8, true);
}

/****************************************************
 * Initializeaza si adauga insigna victoriei pe ecran
 ***************************************************/
let insigna;
 function adaugaInsignaVictorie() {
  insigne = joc.add.physicsGroup();
  insigna = insigne.create(1150, 25, 'insigna');
  insigna.animations.add('spin');
  insigna.animations.play('spin', 8, true);
}

/************************
* Adauga Otrava
************************/
let otrava1, otrava2, otrava3, otrava4, otrava5;
function adaugaOtrava() {
  otravuri = joc.add.physicsGroup();
  otrava1 = otravuri.create(400, 400, 'otrava'); //platforma init
  otrava2 = otravuri.create(190, 205, 'otrava'); //platforma stanga max
  otrava3 = otravuri.create(725, 228, 'otrava'); //sus
  otrava4 = otravuri.create(225, 450, 'otrava');
  otrava5 = otravuri.create(478, 355, 'otrava');
  // efectul il definim noi, la fel de bine se putea numi 'sticla'
  // atat timp cat cele doua proprietati ale animatitie sunt identice
  // pentru '.add'' si .play'
  otrava1.animations.add('bule');
  otrava1.animations.play('bule', 8, true);
  otrava2.animations.add('bule');
  otrava2.animations.play('bule', 8, true);
  otrava3.animations.add('bule');
  otrava3.animations.play('bule', 8, true);
  otrava4.animations.add('bule');
  otrava4.animations.play('bule', 8, true);
  otrava5.animations.add('bule');
  otrava5.animations.play('bule', 8, true);
}

/**********************
* Adauga lava pe ecran
***********************/

function adaugaLava() {
  lava = joc.add.physicsGroup();
  lave = lava.create(-50, 550, 'lava');

  lave.body.gravity.x = 10;
}

/****************************************************
 * Primeste un obiect ca parametru, modifica scor
 ****************************************************/
function managerObiecte(jucator, obiect) {
  obiect.kill();
  scor = scor + 10;
  if (scor >= scorVictorie) {
      adaugaInsignaVictorie();
  }
}

/***************************************************
 * Manager - jucatorul a colectat insigna victoriei
 ***************************************************/
function managerInsignaVictorie(jucator, insigna) {
  insigna.kill();
  jucatorulACastigat = true;
}

/***************************************************
 * Manager - jucatorul a fost otravit
 ***************************************************/
function managerOtrava (jucator, otrava) {
  otrava.kill();
  vieti--;
  if (vieti == 0)
    jucatorulAPierdut = 1;
}

/**************************************
 * Manager - jucatorul a sarit in lava
 **************************************/
function managerLava(jucator) {
  vieti = 0;
  jucatorulAPierdut = 1;
}

/*****************
 * Manager - stea
 *****************/
function managerStea(jucator, steluta) {
  steluta.kill();
  god = true;
}


/***************************************************
 * Functia principala a jocului
 ***************************************************/
function initializeazaJoc() {
  joc = new Phaser.Game(1200, 600, Phaser.AUTO, '',
    {
      preload: incarcaTexturi,
      create:  seteazaStareaInitialaSiActiunile,
      update:  updateazaJoc,
      render:  randeaza
    }
  );

  /***************************************************
   * Incarca imaginile si seteaza dimensiunile acestora
   ***************************************************/
  function incarcaTexturi() {
    // Incarca artefacte
    joc.load.image('platformaInceput', 'img/platformaTip1.png');
    joc.load.image('platforma', 'img/platformaTip3.png');
    joc.load.image('bg', 'img/back.jpg');
    joc.load.spritesheet('jucator', 'img/jucator.png', 48, 62);
    joc.load.spritesheet('moneda', 'img/moneda.png', 36, 44);
    joc.load.spritesheet('insigna', 'img/insigna.png', 42, 54);
    joc.load.spritesheet('otrava', 'img/otrava.png', 32, 32); 
    joc.load.spritesheet('lava', 'img/lava.png');
    joc.load.spritesheet('stea', 'img/stea.png', 32, 32);
    joc.load.audio('song', 'misc/8bit-song.mp3');
  }

  /***************************************************
   * Starea initiala a jocului
   ***************************************************/
  function seteazaStareaInitialaSiActiunile() {
    // Fundal
    back = joc.add.tileSprite(0, 0, 1210, 600, 'bg');

    // Muzica
    mus = joc.add.audio('song');
    mus.play();

    // Jucator
    jucator = joc.add.sprite(115, 500, 'jucator');
    jucator.animations.add('mers');
    jucator.anchor.setTo(0.5, 1);
    joc.physics.arcade.enable(jucator);
    jucator.body.collideWorldBounds = true;
    jucator.body.gravity.y = 750;

    // Obiecte
    aduagaMonede(coordonateMonede);
    adaugaPlatforme();
    adaugaOtrava();
    adaugaLava();
    adaugaSteluta();

    // Interactiuni
    tasteNavigare = joc.input.keyboard.createCursorKeys();
    butonSaritura = joc.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = joc.add.text(580, 16, "SCOR: " + scor, { font: "24px Courier New", fill: "white" });
    textVieti = joc.add.text(535, 42, "VIETI: ", { font: "24px Courier New", fill: "white" });
    textCounter = joc.add.text(575, 42 + 28, "TIMP: " + counter + " sec", { font: "24px Courier New", fill: "white" });
    mesajVictorie = joc.add.text(joc.world.centerX, 275, "", { font: "48px Courier New", fill: "white" });
    mesajVictorie.anchor.setTo(0.5, 1);
    mesajPierdere = joc.add.text(joc.world.centerX, 275, "", { font: "48px Courier New", fill: "White"});
    mesajPierdere.anchor.setTo(0.5, 1);

    joc.time.events.loop(Phaser.Timer.SECOND, timp, this);
  }


  function timp() {
    counter++;
  }

  /********************************************************
   * Functie care updateaza starea jocului - in functie de
   * input'ul utilizatorului.
   *******************************************************/
  function updateazaJoc() {

    back.tilePosition.x += 1;

    text.text = "SCOR: " + scor;
    if (vieti == 0)
      textVieti.text = "VIETI:";
    else if (vieti == 1)
      textVieti.text = "VIETI: ♥";
    else if (vieti == 2)
      textVieti.text = "VIETI: ♥ ♥";
    else
      textVieti.text = "VIETI: ♥ ♥ ♥";
    textCounter.text = "TIMP: " + counter;

    joc.physics.arcade.collide(jucator, platforme);
    joc.physics.arcade.collide(jucator, pal);
    joc.physics.arcade.overlap(jucator, obiecte, managerObiecte);
    joc.physics.arcade.overlap(jucator, insigne, managerInsignaVictorie);
    joc.physics.arcade.overlap(jucator, otravuri, managerOtrava);
    joc.physics.arcade.overlap(jucator, lava, managerLava);
    joc.physics.arcade.overlap(jucator, stea, managerStea);
    jucator.body.velocity.x = 0;


    if (!palAlph) {
      if (palGrea2.alpha > 0) {
        palGrea2.alpha -= 0.005;
        monedaGrea2.alpha -= 0.005;
      } else {
        palAlph = true;
      }
    } else {
      if (palGrea2.alpha < 1) {
        palGrea2.alpha += 0.005;
        monedaGrea2.alpha += 0.005;
      }
    else
      palAlph = false;
    }

    if (started) {
      if (pal.alpha <= 0) {
        pal.kill();
        otrava4.kill();
      } else {
        pal.alpha -= 0.025;
        otrava4.alpha -= 0.025;
      }
    }

    if (lave.x > 0) {
      lave.body.velocity.x = -50;
    } else if (lave.x < -50) {
      lave.body.velocity.x = 50;
    }

    if (palGrea.x < 350) {
      palGrea.body.velocity.x = 100;
      monedaGrea.body.velocity.x = 100;
    }
    else if(palGrea.x > 1300) {
      palGrea.body.velocity.x = -100;
      monedaGrea.body.velocity.x = -100;
    }

    // Este sageata stanga apasata?
    if (tasteNavigare.left.isDown) {
      jucator.animations.play('mers', 10, true);
      jucator.body.velocity.x = -300;
      jucator.scale.x = - 1;
      started = true;
    }
    // Este sageata dreapta apasata?
    else if (tasteNavigare.right.isDown) {
      jucator.animations.play('mers', 10, true);
      jucator.body.velocity.x = 300;
      jucator.scale.x = 1;
      started = true;
    }
    // Jucatorul nu se misca
    else {
      jucator.animations.stop();
    }
    // Conditie saritura
    if ((butonSaritura.isDown || tasteNavigare.up.isDown) && (jucator.body.onFloor() || jucator.body.touching.down)) {
      jucator.body.velocity.y = -400;
      started = true;
    }

    if (god) {
      lave.kill();
      otrava1.kill();
      otrava2.kill();
      otrava3.kill();
      otrava4.kill();
      otrava5.kill();
      jucator.body.gravity.x = 0;
      jucator.body.gravity.y = 0;

      if (butonSaritura.isDown || tasteNavigare.up.isDown)
        jucator.body.y -= 5;

      if (tasteNavigare.down.isDown)
        jucator.body.y += 5;  
    }
    
    if (tasteNavigare.up.isDown)
      console.log(jucator.x + '\n' + jucator.y);

    // Conditie victorie
    if (jucatorulACastigat) {
      jucator.kill();
      document.location.reload();

      //mesajVictorie.text = "AI CASTIGAT!";
    }
    // Conditie Pierdere
    if (jucatorulAPierdut) {
      jucator.kill();
      document.location.reload();
      
      //mesajPierdere.text = "AI PIERDUT!";
    }
  }

  function randeaza() {
  }
}

