//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Logica {


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor(app, menus, gameplay) {

        this.app = app;
        this.gameplay = gameplay;
        this.menus = menus;


        //pantallas
        this.pan = new Pantalla(this.app);

        //rondas a jugar
        this.ronda = 1;

        //cursor
        this.cursorUno = this.app.loadImage("./data/Escenario/Iconos/cursorUno.png");
        this.cursorDos = this.app.loadImage("./data/Escenario/Iconos/cursorDos.png");

        //turno de poner 
        this.coger = false;
        this.jackpot = this.app.loadImage("./data/Escenario/Iconos/jackpot.png");
        this.objetos = [];
        this.poner = false;
        this.turnoCoger = 1;
        this.turnoPoner = 1;
        this.elementoUno = "";
        this.elementoDos = "";
        this.contadorCorrector = 0;


        //contador
        this.finalCountdown = false;
        this.cuenta = 4;
        this.conteoRegresivo = this.conteoRegresivo.bind(this);
        setInterval(this.conteoRegresivo, 1000);

        //suelo del spawn

        this.suelo = [];

        for (let i = 0; i < this.app.int(this.app.random(3, 5)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 600));
        }

        for (let i = 0; i < this.app.int(this.app.random(2, 5)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 500));
        }

        for (let i = 1; i < this.app.int(this.app.random(2, 4)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 400));
        }

        for (let i = 7; i < 11; i++) {
            this.suelo.push(new Suelo(this.app, 0, i * 100));
            this.suelo.push(new Suelo(this.app, 100, i * 100));
        }


        //suelo de la meta

        for (let j = 10; j > this.app.int(this.app.random(1, 6)); j--) {
            for (let i = 15; i > this.app.int(this.app.random(13, 15)); i--) {

                this.suelo.push(new Suelo(this.app, i * 100, j * 100));
            }
        }

        //audio
        this.chan = this.app.loadSound("./data/Audio/chan.mp3")
        this.beep = this.app.loadSound("./data/Audio/beep.mp3")

        //crea la cuadricula 

        this.cuadricula = [];

        for (let i = 5; i < 13; i++) {
            for (let j = 1; j < 8; j++) {

                this.cuadricula.push(new Cuadricula(this.app, i * 100, j * 100));
            }
        }

        //armas. trampas y plataformas

        this.elementos = [];

        //mouse del juego

        this.mouse = this.app.loadImage("./data/Escenario/Iconos/mouse.png");
        this.menus.play();

    } //cierra el constructor


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    pintar() {

        this.pan.pintar();
        console.log(this.pan.nivel);

        switch (this.pan.nivel) {

            //juego

            case "Juego":


                //nubes

                this.pan.nubesitas();



                //contador corrector

                if (this.poner) this.contadorCorrector += 1;

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                ////////////////////////aplica la camara a todo///////////////////////////

                this.app.push();
                this.camara();

                //pintar los suelos

                for (let i = 0; i < this.suelo.length; i++) {
                    this.suelo[i].pintar(this.suelo);
                }


                //pintar el letrero

                this.letrero.pintar(this.suelo);

                //pintar la bandera

                this.bandera.pintar(this.suelo);


                //pintar los elemento

                for (let i = 0; i < this.elementos.length; i++) {
                    this.elementos[i].pintar();
                }

                //pintar la cuadricula

                for (let i = 0; i < this.cuadricula.length; i++) {
                    if (this.poner && this.finalCountdown == false) this.cuadricula[i].pintar();
                }


                //pintar los jugadores

                this.jugadorUno.pintar(this.suelo, this.jugadorDos, this.elementos, this.poner, this.coger, this.bandera);
                this.jugadorDos.pintar(this.suelo, this.jugadorUno, this.elementos, this.poner, this.coger, this.bandera);

                this.jugadorUno = this.jugadorDos.adversario;
                this.jugadorDos = this.jugadorUno.adversario;



                if (this.poner && this.finalCountdown == false) {


                    //mouse
                    this.app.imageMode(this.app.CORNER);
                    this.app.image(this.mouse, this.app.mouseX / this.zoom - this.origenCam.x, this.app.mouseY / this.zoom - this.origenCam.y, this.mouse.width * 2, this.mouse.height * 2);
                    this.app.imageMode(this.app.CENTER);


                    if (this.turnoPoner == 1) this.app.image(this.cursorUno, this.app.mouseX / this.zoom - this.origenCam.x + 70, this.app.mouseY / this.zoom - this.origenCam.y + 70, this.cursorUno.width / 2, this.cursorUno.height / 2);
                    if (this.turnoPoner == 2) this.app.image(this.cursorDos, this.app.mouseX / this.zoom - this.origenCam.x + 70, this.app.mouseY / this.zoom - this.origenCam.y + 70, this.cursorDos.width / 2, this.cursorDos.height / 2);


                    // dibuja el hover de lo que va a poner cada jugador

                    if (this.mouseCam.x > 490 && this.mouseCam.x < 1300 && this.mouseCam.y > 95 && this.mouseCam.y < 800) {

                        if (this.turnoPoner == 1) {
                            this.app.image(this.elementoUno.hover, this.app.int(this.app.map(this.mouseCam.x, 490, 1300, 0, 8)) * 100 + 550, this.app.int(this.app.map(this.mouseCam.y, 95, 800, 0, 7)) * 100 + 150);
                        } else if (this.turnoPoner == 2) {
                            this.app.image(this.elementoDos.hover, this.app.int(this.app.map(this.mouseCam.x, 490, 1300, 0, 8)) * 100 + 550, this.app.int(this.app.map(this.mouseCam.y, 95, 800, 0, 7)) * 100 + 150);

                        }
                    }
                }


                //se cierra la camara             
                this.app.pop();

                //maquina de casino

                if (this.coger) this.app.image(this.jackpot, this.app.width / 2, this.app.height / 2 + 50);


                //pintar los elementos aleatorias

                for (let i = 0; i < this.objetos.length; i++) {
                    this.objetos[i].pintar();

                }

                if (this.coger) {
                    //mouse
                    this.app.imageMode(this.app.CORNER);
                    this.app.image(this.mouse, this.app.mouseX, this.app.mouseY, this.mouse.width * 2, this.mouse.height * 2);
                    this.app.imageMode(this.app.CENTER);

                    if (this.turnoCoger == 1) this.app.image(this.cursorUno, this.app.mouseX + 70, this.app.mouseY + 70, this.cursorUno.width / 2, this.cursorUno.height / 2);
                    if (this.turnoCoger == 2) this.app.image(this.cursorDos, this.app.mouseX + 70, this.app.mouseY + 70, this.cursorDos.width / 2, this.cursorDos.height / 2);

                }


                //pinta la cuenta regresiva
                if (this.finalCountdown) {
                    this.app.textAlign(this.app.CENTER, this.app.CENTER);
                    this.app.textSize(300);
                    this.app.text(this.cuenta - 1, this.app.width / 2, this.app.height / 2);
                }

                //pinta los puntajes parciales
                if ((this.jugadorUno.gano && this.jugadorDos.gano) || (this.jugadorUno.caido && this.jugadorDos.caido) ||
                    (this.jugadorUno.gano && this.jugadorDos.caido) || (this.jugadorUno.caido && this.jugadorDos.gano)) {

                    this.pan.puntajes(this.ronda, this.jugadorUno.gano, this.jugadorDos.gano);

                    //mouse
                    this.app.imageMode(this.app.CORNER);
                    this.app.image(this.mouse, this.app.mouseX, this.app.mouseY, this.mouse.width * 2, this.mouse.height * 2);
                    this.app.imageMode(this.app.CENTER);

                }


                //se acabo el nivel

                if (this.ronda == 11) this.pan.nivel = "Game Over";

                break;

            case "Game Over":

                this.app.image(this.pan.fondo, 0, 0);
                this.app.textSize(70);
                this.app.text("GAME OVER", this.app.width / 2, 100);

                this.app.textSize(80);
                if (this.jugadorUno.puntaje == this.jugadorDos.puntaje) {
                    this.app.text("EMPATE", this.app.width / 2, 200);

                    this.jugadorUno.estado = "Quieto ";
                    this.jugadorDos.estado = "Quieto ";
                }
                if (this.jugadorUno.puntaje > this.jugadorDos.puntaje) {
                    this.app.text("VICTORIA \n JUGADOR 1 ", this.app.width / 2, 250);
                    this.jugadorUno.estado = "Quieto ";
                    this.jugadorDos.estado = "Noqueado ";
                }
                if (this.jugadorDos.puntaje > this.jugadorUno.puntaje) {
                    this.app.text("VICTORIA \n JUGADOR 2 ", this.app.width / 2, 250);
                    this.jugadorUno.estado = "Noqueado ";
                    this.jugadorDos.estado = "Quieto ";
                }


                this.app.textSize(70);
                if (this.app.mouseX > 488 && this.app.mouseX < 711 && this.app.mouseY > 575 && this.app.mouseY < 625) this.app.textSize(90);

                this.app.text("Reiniciar", this.app.width / 2, 600);

                this.app.push();
                this.app.translate(125, -625);
                this.app.scale(3);
                this.jugadorUno.pintar();
                this.jugadorDos.pintar();
                this.app.pop();
                this.jugadorUno.gravedad = false;
                this.jugadorDos.gravedad = false;
                this.jugadorUno.perspectiva = "der";
                this.jugadorDos.perspectiva = "izq";
                this.jugadorUno.aplastado = false;
                this.jugadorUno.noqueado = false;
                this.jugadorDos.aplastado = false;
                this.jugadorUno.agachado = false;
                this.jugadorDos.agachado = false;
                this.jugadorDos.noqueado = false;
                this.jugadorUno.pos.x = 40;
                this.jugadorDos.pos.x = 275;
                this.jugadorUno.pos.y = this.app.height / 2;
                this.jugadorDos.pos.y = this.app.height / 2;

                this.app.textSize(50);
                this.app.text("Jugador 1", 250, 600);
                this.app.text("Jugador 2", 950, 600);
                this.app.text("Score: " + this.jugadorUno.puntaje, 250, 650);
                this.app.text("Score: " + this.jugadorDos.puntaje, 950, 650);


                //mouse
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.mouse, this.app.mouseX, this.app.mouseY, this.mouse.width * 1.5, this.mouse.height * 1.5);
                this.app.imageMode(this.app.CENTER);

                break;

            default:

                //mouse
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.mouse, this.app.mouseX, this.app.mouseY, this.mouse.width * 1.5, this.mouse.height * 1.5);
                this.app.imageMode(this.app.CENTER);
                break;

        } //cierra el switch de niveles


    } //cierra el metodo pintar


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    click() {

        switch (this.pan.nivel) {
            case "Main":

                //pasar del menu principal al juego

                if (this.app.mouseX > 289 && this.app.mouseX < 500 && this.app.mouseY > 505 && this.app.mouseY < 600) {
                    this.menus.stop();
                    this.pan.boton.play();
                    this.gameplay.play();

                    this.pan.nivel = "Juego";
                    this.coger = true;

                    //crea los objetos
                    this.objetos[0] = (new Pick(this.app, 430, this.app.height / 2 + 25));
                    this.objetos[1] = (new Pick(this.app, 560, this.app.height / 2 + 25));
                    this.objetos[2] = (new Pick(this.app, 690, this.app.height / 2 + 25));

                    //crea los jugadores
                    this.jugadorUno = new Jugador(this.app, "Uno", 150, -200);
                    this.jugadorDos = new Jugador(this.app, "Dos", 250, -200);


                    //crea la bandera
                    this.bandera = new Bandera(this.app, 1551, -100);
                    this.letrero = new Bandera(this.app, 40, -300);
                }

                //pasar del menu a instrucciones
                if (this.app.mouseX > 690 && this.app.mouseX < 900 && this.app.mouseY > 500 && this.app.mouseY < 600) {
                    this.pan.boton.play();
                    this.pan.nivel = "Help";
                }

                break;

            case "Help":

                //de las instrucciones al menu
                if (this.app.dist(this.app.mouseX, this.app.mouseY, 100, 600) < 150) {
                    this.pan.boton.play();
                    this.pan.nivel = "Main";
                }
                break;

            case "Juego":

                //coger un objeto

                for (let i = 0; i < this.objetos.length; i++) {
                    let obj = this.objetos[i];
                    if (this.app.mouseX > obj.x - obj.hover.width / 2 && this.app.mouseX < obj.x + obj.hover.width / 2 &&
                        this.app.mouseY > obj.y - obj.hover.height / 2 && this.app.mouseY < obj.y + obj.hover.height / 2) {
                        this.pan.boton.play();
                        if (this.turnoCoger == 1) {
                            this.elementoUno = obj;
                            this.objetos.splice(i, 1);
                            this.turnoCoger = 2;
                            break;
                        }

                        if (this.turnoCoger == 2) {
                            this.elementoDos = obj;
                            this.objetos = [];
                            this.coger = false;
                            this.poner = true;
                            break;
                        }
                    }

                }



                //pasa de ronda
                if (this.pan.aumento == 1) {
                    if (this.app.mouseX > 525 && this.app.mouseY > 588 && this.app.mouseX < 660 && this.app.mouseY < 615) {
                        this.pan.boton.play();

                        //crea los objetos
                        this.objetos[0] = (new Pick(this.app, 430, this.app.height / 2 + 25));
                        this.objetos[1] = (new Pick(this.app, 560, this.app.height / 2 + 25));
                        this.objetos[2] = (new Pick(this.app, 690, this.app.height / 2 + 25));
                        this.contadorCorrector = 0;
                        this.ronda += 1;
                        this.turnoCoger = 1;
                        this.turnoPoner = 1;
                        this.pan.aumento = 0;
                        this.jugadorUno.pos.x = 150;
                        this.jugadorUno.pos.y = -200;
                        this.jugadorUno.gravedad = true;
                        this.jugadorDos.gravedad = true;
                        this.jugadorUno.noqueado = false;
                        this.jugadorDos.noqueado = false;
                        this.jugadorDos.pos.x = 250;
                        this.jugadorDos.pos.y = -200;
                        this.pan.crecimiento = 0;
                        this.jugadorUno.caido = false;
                        this.jugadorDos.caido = false;
                        this.elementoUno = "";
                        this.elementoDos = "";
                        this.finalCountdown = false;
                        this.cuenta = 4;
                        this.coger = true;

                        for (let i = 0; i < this.elementos.length; i++) {
                            if (this.elementos[i].tipo == "Mina") this.elementos[i].activada = false;

                        }

                        if (this.jugadorUno.gano) {
                            this.jugadorUno.puntaje += 100;
                            this.pan.unoPuntaje = this.jugadorUno.puntaje;
                            this.jugadorUno.gano = false;
                        }
                        if (this.jugadorDos.gano) {
                            this.jugadorDos.puntaje += 100;
                            this.pan.dosPuntaje = this.jugadorDos.puntaje;
                            this.jugadorDos.gano = false;
                        }
                    }
                }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                //posicion relativa del mouse dentro de la camara


                for (let i = 0; i < this.cuadricula.length; i++) {
                    let cuadro = this.cuadricula[i];

                    if (this.mouseCam.x >= cuadro.pos.x && this.mouseCam.x <= cuadro.pos.x + cuadro.ancho && this.mouseCam.y >= cuadro.pos.y && this.mouseCam.y <= cuadro.pos.y + cuadro.alto && cuadro.ocupado == false) {

                        //crear arma, trampa o plataforma

                        if (this.poner && this.finalCountdown == false && this.contadorCorrector > 10) {
                            this.pan.boton.play();
                            if (this.turnoPoner == 1) {
                                if (this.elementoUno.tipo != "Suelo") this.elementos.push(new Elemento(this.app, cuadro.pos.x + cuadro.ancho / 2, cuadro.pos.y + cuadro.alto / 2, this.elementoUno.tipo));
                                if (this.elementoUno.tipo == "Suelo") this.suelo.push(new Suelo(this.app, cuadro.pos.x, cuadro.pos.y));
                                this.elementoUno = null;
                            }

                            if (this.turnoPoner == 2) {
                                if (this.elementoDos.tipo != "Suelo") this.elementos.push(new Elemento(this.app, cuadro.pos.x + cuadro.ancho / 2, cuadro.pos.y + cuadro.alto / 2, this.elementoDos.tipo));
                                if (this.elementoDos.tipo == "Suelo") this.suelo.push(new Suelo(this.app, cuadro.pos.x, cuadro.pos.y));
                                this.elementoDos = null;
                            }

                            this.cuadricula[i].ocupado = true;
                            if (this.turnoPoner == 1) {
                                this.turnoPoner = 2;
                                break;
                            }

                            if (this.turnoPoner == 2) {
                                this.finalCountdown = true;
                                this.contadorCorrector = 0;
                                this.turnoponer == 1;
                                break;
                            }
                        }
                    }
                }

                break;

            case "Game Over":
                //reset
                if (this.app.mouseX > 488 && this.app.mouseX < 711 && this.app.mouseY > 575 && this.app.mouseY < 625) {
                    this.reset();
                }

                break;

        } //cierra el switch de pantalla
    } //cierra el metodo click


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    camara() {

        //la camara se mueve respecto el punto medio entre los jugadores

        //si ambos siguen en tierra y vivos

        if (this.jugadorUno.caido == false && this.jugadorUno.noqueado == false && this.jugadorDos.caido == false && this.jugadorDos.noqueado == false) {
            this.origenCam = this.app.createVector(this.app.width / 2 - (this.jugadorUno.pos.x / 2 + this.jugadorDos.pos.x / 2), 0);
            this.origenCam.x = this.origenCam.x * this.zoom + this.zoom * 300;
        }

        //si uno de los jugadores se cae o muere

        //se cae  o muere el jugador uno

        if ((this.jugadorUno.pos.y - this.jugadorUno.alto) * this.zoom - this.origenCam.y > this.app.height / this.zoom - this.origenCam.y || this.jugadorUno.noqueado) {

            this.jugadorUno.caida.play();
            this.jugadorUno.pos.y = -2000;
            this.jugadorUno.gravedad = false;
            this.jugadorUno.caido = true;
            this.origenCam = this.app.createVector(this.app.width / 2 - (this.jugadorDos.pos.x / 2 + this.bandera.pos.x / 2), 0);
            this.origenCam.x = this.origenCam.x * this.zoom + this.zoom * 300;
        }

        //se cae o muere el jugador dos

        if ((this.jugadorDos.pos.y - this.jugadorDos.alto) * this.zoom - this.origenCam.y > this.app.height / this.zoom - this.origenCam.y || this.jugadorDos.noqueado) {
            this.jugadorDos.caida.play();
            this.jugadorDos.pos.y = -2000;
            this.jugadorDos.gravedad = false;
            this.jugadorDos.caido = true;
            this.origenCam = this.app.createVector(this.app.width / 2 - (this.jugadorUno.pos.x / 2 + this.bandera.pos.x / 2), 0);
            this.origenCam.x = this.origenCam.x * this.zoom + this.zoom * 300;
        }

        //ambos se cayeron o murieron

        if ((this.jugadorUno.caido || this.jugadorUno.noqueado) && (this.jugadorDos.caido || this.jugadorDos.noqueado)) {
            this.origenCam = this.app.createVector(this.app.width / 2, 0);
            this.origenCam.x = this.origenCam.x * this.zoom + this.zoom * 300;
        }


        //distancia de los jugadores
        this.distancia = this.app.abs(this.jugadorDos.pos.x - this.jugadorUno.pos.x);
        if (this.distancia >= 1650) this.distancia = 1650;


        //distancia de los jugadores a la bandera

        this.distanciaMetaUno = this.app.abs(this.jugadorUno.pos.x - this.bandera.pos.x);
        if (this.distanciaMetaUno >= 1600) this.distanciaMetaUno = 1600;


        this.distanciaMetaDos = this.app.abs(this.jugadorDos.pos.x - this.bandera.pos.x);
        if (this.distanciaMetaDos >= 1600) this.distanciaMetaDos = 1600;


        //la distancia entre los jugadores determina el zoom si ambos siguen en el mapa

        if (this.poner == false && this.coger == false) {
            if (this.jugadorUno.caido == false && this.jugadorUno.noqueado == false && this.jugadorDos.caido == false && this.jugadorDos.caido == false) {

                this.zoom = this.app.map(this.distancia, 0, 1650, 1, 0.67);

            }

            //el zoom varia dependiendo de cuantos jugadores se hayan caido

            if (this.jugadorUno.caido == false && this.jugadorUno.noqueado == false && (this.jugadorDos.caido || this.jugadorDos.noqueado)) {
                this.zoom = this.app.map(this.distanciaMetaUno, 0, 1600, 1, 0.70);
            }

            if ((this.jugadorUno.caido || this.jugadorUno.noqueado) && this.jugadorDos.caido == false && this.jugadorDos.caido == false) {
                this.zoom = this.app.map(this.distanciaMetaDos, 0, 1600, 1, 0.70);
            }

            if ((this.jugadorUno.caido || this.jugadorUno.noqueado) && (this.jugadorDos.caido || this.jugadorDos.noqueado)) {
                this.zoom = 0.70;
            }
        } else if ((this.poner || this.coger) && this.finalCountdown == false) this.zoom = 0.70;

        //se va acercando mientras termina la cuenta atras
        if (this.finalCountdown) {
            this.zoom += 0.0015;
        }


        //correciones y limites de la camara

        if (this.origenCam.x >= 50) this.origenCam.x = 50;

        //aplica el zoom

        this.app.scale(this.zoom);

        //aplica la posicion de la camara

        this.app.translate(this.origenCam.x, this.origenCam.y);

        //posicion del mouse al respecto
        this.mouseCam = this.app.createVector(this.app.mouseX / this.zoom - this.origenCam.x, this.app.mouseY / this.zoom - this.origenCam.y);

    } //cierra el metodo camara


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    conteoRegresivo() {
        if (this.finalCountdown) {
            this.chan.play();
            this.cuenta -= 1;
            if (this.cuenta == 0) {
                this.beep.play();
                this.cuenta = 4;
                this.finalCountdown = false;
                this.poner = false;
            }
        }
    } //cierra el hilo de conteo regresivo
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    reset() {

        //rondas a jugar
        this.ronda = 1;

        //turno de poner 
        this.coger = false;
        this.poner = false;
        this.turnoCoger = 1;
        this.turnoPoner = 1;
        this.elementoUno = "";
        this.elementoDos = "";
        this.contadorCorrector = 0;

        //contador
        this.finalCountdown = false;
        this.cuenta = 4;

        //suelo del spawn
        this.elementos = [];

        this.suelo = [];
        this.cuadricula = [];
        this.objetos = [];

        for (let i = 0; i < this.app.int(this.app.random(3, 5)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 600));
        }

        for (let i = 0; i < this.app.int(this.app.random(2, 5)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 500));
        }

        for (let i = 1; i < this.app.int(this.app.random(2, 4)); i++) {
            this.suelo.push(new Suelo(this.app, i * 100, 400));
        }

        for (let i = 7; i < 11; i++) {
            this.suelo.push(new Suelo(this.app, 0, i * 100));
            this.suelo.push(new Suelo(this.app, 100, i * 100));
        }

        //suelo de la meta

        for (let j = 10; j > this.app.int(this.app.random(1, 6)); j--) {
            for (let i = 15; i > this.app.int(this.app.random(13, 15)); i--) {

                this.suelo.push(new Suelo(this.app, i * 100, j * 100));
            }
        }



        for (let i = 5; i < 13; i++) {
            for (let j = 1; j < 8; j++) {

                this.cuadricula.push(new Cuadricula(this.app, i * 100, j * 100));
            }
        }

        //armas. trampas y plataformas


        this.pan.aumento = 0;
        this.pan.crecimiento = 0;
        this.pan.unoPuntaje = 0;
        this.pan.dosPuntaje = 0;

        this.pan.nivel = "Main";
    } //cierra la clase reset
} //cierra la clase logica