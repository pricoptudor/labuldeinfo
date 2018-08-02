/*##########################################################
 ***                 Variabile globale                   ***
 ###########################################################*/
let joc;
let jucator;
let broasca;
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
let broascaMiscatoare;
let coordonateMonede = [
  {X: 375, Y:400},
  {X: 450, Y:100},
  {X: 500, Y:100},
  {X: 550, Y:100},
  {X: 600, Y:100},
];

let coordonateBroasca = {
  min: 300,
  max: 600
};

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
  platforme.create(150, 300, 'platforma' );
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
  vitezaRotatie = 15;

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
  let otrava = otravuri.create(250, 400, 'otrava');
  // efectul il definim noi, la fel de bine se putea numi 'sticla'
  // atat timp cat cele doua proprietati ale animatitie sunt identice
  // pentru '.add' si '.play'
  otrava.animations.add('bule');
  otrava.animations.play('bule', 8, true);
}

/******
 * Anti-Erou
 */
 
function adaugaBroasca() {
  broaste = joc.add.physicsGroup();
  broascaMiscatoare = broaste.create(400, 120, 'broasca');

  broascaMiscatoare.animations.add('mers');
  broascaMiscatoare.animations.play('mers', 6, true);
  broascaMiscatoare.body.collideWorldBounds = true;
  broascaMiscatoare.body.velocity.x = 50; 
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
  jucator.kill();
  jucatorulAPierdut = true;
}
/************************
 jucatorul atinge broasca
*************************/

function managerBroasca (jucator, broascaMiscatoare) {
  broascaMiscatoare.kill();
  jucator.kill();
  jucatorulAPierdut = true;
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

    // De ce 32, 32, uhm?...
    joc.load.spritesheet('otrava', 'src/img/otrava.png', 32, 32); 
    joc.load.spritesheet ('broasca','src/img/broasca.png' , 32,32);
  }

  /***************************************************
   * Starea initiala a jocului
   ***************************************************/
  function seteazaStareaInitialaSiActiunile() {

    // Jucator
    jucator = joc.add.sprite(50, 600, 'jucator');
    jucator.animations.add('mers');
    jucator.anchor.setTo(0.5, 1);
    joc.physics.arcade.enable(jucator);
    jucator.body.collideWorldBounds = true;
    jucator.body.gravity.y = 500;

    // Obiecte
    aduagaMonede(coordonateMonede);
    adaugaPlatforme();
    adaugaOtrava();
    adaugaBroasca();

  


    // Interactiuni
    tasteNavigare = joc.input.keyboard.createCursorKeys();
    butonSaritura = joc.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = joc.add.text(16, 16, "SCOR: " + scor, { font: "bold 24px Arial", fill: "white" });
    mesajVictorie = joc.add.text(joc.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    mesajVictorie.anchor.setTo(0.5, 1);
    mesajPierdere = joc.add.text(joc.world.centerX, 275, "", { font: "bold 48px Arial", fill: "White"});
    mesajPierdere.anchor.setTo(0.5, 1);
  }

  /********************************************************
   * Functie care updateaza starea jocului - in functie de
   * input'ul utilizatorului.
   *******************************************************/
  function updateazaJoc() {

    text.text = "SCOR: " + scor;
    joc.physics.arcade.collide(jucator, platforme);
    joc.physics.arcade.overlap(jucator, obiecte, managerObiecte);
    joc.physics.arcade.overlap(jucator, insigne, managerInsignaVictorie);
    joc.physics.arcade.overlap(jucator, otravuri, managerOtrava);
    joc.physics.arcade.overlap(jucator, broaste, managerBroasca);

    jucator.body.velocity.x = 0;
    
    //Broasca Stanga-dreapta

    if ( broascaMiscatoare.x > coordonateBroasca.max) {
      broascaMiscatoare.body.velocity.x = -50;
    }else if (broascaMiscatoare.x < coordonateBroasca.min){
      broascaMiscatoare.body.velocity.x = 50;
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
      mesajVictorie.text = "AI CASTIGAT!!!";
    }
    // Conditie Pierdere
    if (jucatorulAPierdut) {
      mesajPierdere.text = "AI PIERDUT!";
    }
  }

  function randeaza() {
  }
}

