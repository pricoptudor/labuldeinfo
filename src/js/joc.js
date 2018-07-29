/*##########################################################
 ***                 Variabile globale                   ***
 ###########################################################*/
let joc;
let jucator;
let platforme;
let jucatorulACastigat = false;
let scor = 0;
let scorVictorie = 100;
let insigna;
let obiecte;
let tasteNavigare;
let butonSaritura;
let text;
let mesajVictorie;
let variabile;

/*##########################################################
 ***                       Functii                       ***
 ###########################################################*/

/*************************
 * Adauga monezi pe ecran
 *************************/
function aduagaMonede() {
  obiecte = joc.add.physicsGroup();

  initializeazaObiect(375, 400, 'moneda');


  initializeazaObiect(450, 100, 'moneda');
  initializeazaObiect(500, 100, 'moneda');
  initializeazaObiect(550, 100, 'moneda');
  initializeazaObiect(600, 100, 'moneda');
}

/***************************
* Adauga platforme pe ecran
****************************/
function adaugaPlatforme() {
  platforme = joc.add.physicsGroup();
  platforme.create(450, 150, 'platforma');

  /*
  * Task 1: Adauga o platforma astfel incat
  * sa colectezi o moneda. - 10 puncte.
  *
  *
  * Task 2: Colecteaza restul de monede. - 5 puncte.
  *
  * Introdu codul tau aici
  * Indiciu: linia de mai sus
  * */


  platforme.setAll('body.immovable', true);
}

/***********************************************
 * Initializeaza obiecte si le adauga pe ecran
 *
 * Task 3: 10 puncte
 *
 * Modifica functia pentru a putea decide viteza
 * cu care obiectul adaugat se invarte folosindu-te
 * de un parametru
 ***********************************************/
function initializeazaObiect(x, y, imagine) {
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
  insigna = joc.add.physicsGroup();
  let insigna = insigna.create(750, 400, 'insigna');
  insigna.animations.add('spin');
  insigna.animations.play('spin', 10, true);
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
 * Functia principala a jocului
 ***************************************************/
function initializeazaJoc() {
  joc = new Phaser.Game(800, 600, Phaser.AUTO, '',
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
    // Seteaza culoarea de fundal
    joc.stage.backgroundColor = '#af2345';

    // Incarca artefacte
    joc.load.image('platforma', 'src/img/platformaTip1.png');
    joc.load.spritesheet('jucator', 'src/img/jucator.png', 48, 62);
    joc.load.spritesheet('moneda', 'src/img/moneda.png', 36, 44);
    joc.load.spritesheet('insigna', 'src/img/insigna.png', 42, 54);
  }

  /***************************************************
   * Starea initiala a jocului
   ***************************************************/
  function seteazaStareaInitialaSiActiunile() {

    // Jucator
    jucator = joc.add.sprite(50, 600, 'jucator');
    jucator.animations.add('walk');
    jucator.anchor.setTo(0.5, 1);
    joc.physics.arcade.enable(jucator);
    jucator.body.collideWorldBounds = true;
    jucator.body.gravity.y = 500;

    // Obiecte
    aduagaMonede();
    adaugaPlatforme();

    // Interactiuni
    tasteNavigare = joc.input.keyboard.createCursorKeys();
    butonSaritura = joc.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = joc.add.text(16, 16, "SCOR: " + scor, { font: "bold 24px Arial", fill: "white" });
    mesajVictorie = joc.add.text(joc.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    mesajVictorie.anchor.setTo(0.5, 1);
  }

  /********************************************************
   * Functie care updateaza starea jocului - in functie de
   * input'ul utilizatorului.
   *******************************************************/
  function updateazaJoc() {

    text.text = "SCOR: " + scor;
    joc.physics.arcade.collide(jucator, platforme);
    joc.physics.arcade.overlap(jucator, obiecte, managerObiecte);
    joc.physics.arcade.overlap(jucator, insigna, managerInsignaVictorie);

    jucator.body.velocity.x = 0;

    // Este sageata stanga apasata?
    if (tasteNavigare.left.isDown) {
      jucator.animations.play('walk', 10, true);
      jucator.body.velocity.x = -300;
      jucator.scale.x = - 1;
    }
    // Este sageata dreapta apasata?
    else if (tasteNavigare.right.isDown) {
      jucator.animations.play('walk', 10, true);
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
      mesajVictorie.text = "AI CASTIGAT!!!";
    }
  }

  function randeaza() {
  }
}

window.onload = initializeazaJoc();
