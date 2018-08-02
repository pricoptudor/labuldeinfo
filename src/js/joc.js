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
let jucatorulAPierdut = false;
let mesajPierdere;
let otravuri;
let vieti = 3;
let textVieti;
let back;
let lava;
let coordonateMonede = [
  {X: 375, Y:400},
  {X: 450, Y:100},
  {X: 500, Y:100},
  {X: 550, Y:100},
  {X: 600, Y:100},
];

/*##########################################################
 ***                       Functii                       ***
 ###########################################################*/

/*************************
 * Adauga monede pe ecran
 * 
 * Coordante este un array de array'uri de 2 elemente
 *************************/

function aduagaMonede(coordanate) {
  obiecte = joc.add.physicsGroup();

  for(let index=0; index<5; index++) {
    if(coordanate[index].X === null || coordanate[index].Y == 'undefined') {
      console.log("adauagaMonede: eroare coordonate");
    } 
    initializeazaObiect(coordanate[index].X, coordanate[index].Y, 'moneda');
  }
}

/***************************
* Adauga platforme pe ecran
****************************/
function adaugaPlatforme() {
  platforme = joc.add.physicsGroup();

  platforme.create(450, 150, 'platforma');
  platforme.create(250, 450, 'platforma');
  platforme.create(150, 300, 'platforma');
  platforme.create(300, 150, 'platforma');

  platforme.setAll('body.immovable', true);
}

/***********************************************
 * Initializeaza obiecte si le adauga pe ecran *
 ***********************************************/
function initializeazaObiect( x, y, imagine) {
  let obiect = obiecte.create(x, y, imagine);
  let vitezaRotatie;

  // Atribuie obiectului proprietatea 'spin'(rotatie)
  obiect.animations.add('spin');
  vitezaRotatie = 10;

  obiect.animations.play('spin', vitezaRotatie, true);
}

/****************************************************
 * Initializeaza si adauga insigna victoriei pe ecran
 ***************************************************/
function adaugaInsignaVictorie() {
  insigne = joc.add.physicsGroup();
  let insigna = insigne.create(600, 400, 'insigna');
  insigna.animations.add('spins');
  insigna.animations.play('spin', 10, true);
}

/************************
* Adauga Otrava
************************/
function adaugaOtrava() {
  otravuri = joc.add.physicsGroup();
  let otrava1 = otravuri.create(250, 400, 'otrava'); //platforma
  let otrava2 = otravuri.create(150, 550, 'otrava'); //jos
  let otrava3 = otravuri.create(350, 100, 'otrava'); //sus
  // efectul il definim noi, la fel de bine se putea numi 'sticla'
  // atat timp cat cele doua proprietati ale animatitie sunt identice
  // pentru '.add' si '.play'
  otrava1.animations.add('bule');
  otrava1.animations.play('bule', 8, true);
  otrava2.animations.add('bule');
  otrava2.animations.play('bule', 8, true);
  otrava3.animations.add('bule');
  otrava3.animations.play('bule', 8, true);
}

/*********************
* Adauga lava pe ecran
**********************/
let lava1;
function adaugaLava() {
  lava = joc.add.physicsGroup();
  lava1 = lava.create(-50, 550, 'lava');

  lava1.body.gravity.x = 25;
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

/***************************************************
 * Manager - jucatorul a sarit in lava
 ***************************************************/

function managerLava(jucator) {
  vieti = 0;
  jucatorulAPierdut = 1;
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
    joc.load.image('platforma', 'src/img/platformaTip1.png');
    joc.load.image('bg', 'src/img/back.jpg');
    joc.load.spritesheet('jucator', 'src/img/jucator.png', 48, 62);
    joc.load.spritesheet('moneda', 'src/img/moneda.png', 36, 44);
    joc.load.spritesheet('insigna', 'src/img/insigna.png', 42, 54);
    joc.load.spritesheet('otrava', 'src/img/otrava.png', 32, 32); 
    joc.load.spritesheet('lava', 'src/img/lava.png');
  }

  /***************************************************
   * Starea initiala a jocului
   ***************************************************/
  function seteazaStareaInitialaSiActiunile() {
    // Fundal
    back = joc.add.tileSprite(0, 0, 1200, 600, 'bg');

    // Jucator
    jucator = joc.add.sprite(250, 400, 'jucator');
    jucator.animations.add('mers');
    jucator.anchor.setTo(0.5, 1);
    joc.physics.arcade.enable(jucator);
    jucator.body.collideWorldBounds = true;
    jucator.body.gravity.y = 500;

    // Obiecte
    aduagaMonede(coordonateMonede);
    adaugaPlatforme();
    adaugaOtrava();
    adaugaLava();

    // Interactiuni
    tasteNavigare = joc.input.keyboard.createCursorKeys();
    butonSaritura = joc.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = joc.add.text(16, 16, "SCOR: " + scor, { font: "24px Courier New", fill: "white" });
    textVieti = joc.add.text(16, 42, "VIETI: ", { font: "24px Courier New", fill: "white" });
    mesajVictorie = joc.add.text(joc.world.centerX, 275, "", { font: "48px Courier New", fill: "white" });
    mesajVictorie.anchor.setTo(0.5, 1);
    mesajPierdere = joc.add.text(joc.world.centerX, 275, "", { font: "48px Courier New", fill: "White"});
    mesajPierdere.anchor.setTo(0.5, 1);
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

    joc.physics.arcade.collide(jucator, platforme);
    joc.physics.arcade.overlap(jucator, obiecte, managerObiecte);
    joc.physics.arcade.overlap(jucator, insigne, managerInsignaVictorie);
    joc.physics.arcade.overlap(jucator, otravuri, managerOtrava);
    joc.physics.arcade.overlap(jucator, lava, managerLava);
    jucator.body.velocity.x = 0;

    if (lava1.x > 0) {
      lava1.body.velocity.x = -50;
    } else if (lava1.x < -50) {
      lava1.body.velocity.x = 50;
    }

    // Este sageata stanga apasata?
    if (tasteNavigare.left.isDown) {
      jucator.animations.play('mers', 10, true);
      jucator.body.velocity.x = -300;
      jucator.scale.x = - 1;
    }
    // Este sageata dreapta apasata?
    else if (tasteNavigare.right.isDown) {
      jucator.animations.play('mers', 10, true);
      jucator.body.velocity.x = 300;
      jucator.scale.x = 1;
    }
    // Jucatorul nu se misca
    else {
      jucator.animations.stop();
    }

    // Conditie saritura
    if (butonSaritura.isDown && (jucator.body.onFloor() || jucator.body.touching.down)) {
      jucator.body.velocity.y = -400;
    }

    // Conditie victorie
    if (jucatorulACastigat) {
      jucator.kill();
      mesajVictorie.text = "AI CASTIGAT!!!";
    }
    // Conditie Pierdere
    if (jucatorulAPierdut) {
      jucator.kill();
      mesajPierdere.text = "AI PIERDUT!";
    }
  }

  function randeaza() {
  }
}

