//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Jugador {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    constructor(app, idPlayer, x, y) {

        this.app = app;


        //numero de jugador

        this.idPlayer = idPlayer;


        //puntaje

        this.puntaje = 0;


        //posicion y movimiento

        this.pos = this.app.createVector(x, y);
        this.vel = this.app.createVector(0, 0);
        this.acel = this.app.createVector(0, 0);

        this.izq = false;
        this.der = false;
        this.cayendo = true;
        this.gano = false;
        this.agachado = false;
        this.saltando = false;
        this.puedeSaltar = false;
        this.arrastra = false;
        this.parado = false;
        this.aplastado = false;
        this.caido = false;
        this.noqueado = false;
        this.gravedad = true;


        this.aguante = 1;
        this.campanazoKO = 0;

        //dimensiones

        this.ancho = 40;
        this.alto = 70;

        //hilos

        this.fisicas = this.fisicas.bind(this);
        setInterval(this.fisicas, 17);

        this.mover = this.mover.bind(this);
        setInterval(this.mover, 1);

        this.recover = this.recover.bind(this);
        setInterval(this.recover, 1000);

        this.frameRate = this.frameRate.bind(this);
        setInterval(this.frameRate, 50);

        //audio

        this.caida = this.app.loadSound("./data/Audio/sheepfalls.mp3");
        this.kaboom = this.app.loadSound("./data/Audio/kaboom.mp3")


        //animaciones
        this.perspectiva = "der";
        this.estado = "";
        this.frames = 0;


        //imagenes
        this.quietoD = [2];
        this.quietoI = [2];
        this.corriendoD = [10];
        this.corriendoI = [10];
        this.estrellitas = [3];
        this.deslizandoI = [4];
        this.deslizandoD = [4];


        for (let i = 0; i < 10; i++) {
            if (i < 2) this.quietoD[i] = this.app.loadImage("./data/Jugadores/Oveja/quietoD" + (i + 1) + ".png");
            if (i < 2) this.quietoI[i] = this.app.loadImage("./data/Jugadores/Oveja/quietoI" + (i + 1) + ".png");
            if (i < 3) this.estrellitas[i] = this.app.loadImage("./data/Jugadores/Oveja/efectomuerto" + (i + 1) + ".png");
            if (i < 4) this.deslizandoD[i] = this.app.loadImage("./data/Jugadores/Oveja/deslizandoD" + (i + 1) + ".png");
            if (i < 4) this.deslizandoI[i] = this.app.loadImage("./data/Jugadores/Oveja/deslizandoI" + (i + 1) + ".png");
            if (i < 10) this.corriendoD[i] = this.app.loadImage("./data/Jugadores/Oveja/corriendoD" + (i + 1) + ".png");
            if (i < 10) this.corriendoI[i] = this.app.loadImage("./data/Jugadores/Oveja/corriendoI" + (i + 1) + ".png");
        }

        this.agachadoI = this.app.loadImage("./data/Jugadores/Oveja/agachadoI.png");
        this.agachadoD = this.app.loadImage("./data/Jugadores/Oveja/agachadoD.png");

        this.aplastadoI = this.app.loadImage("./data/Jugadores/Oveja/aplastadoI.png");
        this.aplastadoD = this.app.loadImage("./data/Jugadores/Oveja/aplastadoD.png");

        this.arrastrandoseI = this.app.loadImage("./data/Jugadores/Oveja/arrastrandoseI.png");
        this.arrastrandoseD = this.app.loadImage("./data/Jugadores/Oveja/arrastrandoseD.png");

        this.frenandoI = this.app.loadImage("./data/Jugadores/Oveja/frenandoI.png");
        this.frenandoD = this.app.loadImage("./data/Jugadores/Oveja/frenandoD.png");

        this.elevandoI = this.app.loadImage("./data/Jugadores/Oveja/elevandoI.png");
        this.elevandoD = this.app.loadImage("./data/Jugadores/Oveja/elevandoD.png");

        this.fallingI = this.app.loadImage("./data/Jugadores/Oveja/cayendoI.png");
        this.fallingD = this.app.loadImage("./data/Jugadores/Oveja/cayendoD.png");



    } //cierra el constructor


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    pintar(suelo, adversario, elementos, poner, coger, bandera) {

        this.suelo = suelo;
        this.adversario = adversario;
        this.elementos = elementos;
        this.poner = poner;
        this.coger = coger;
        this.bandera = bandera;

        this.sprites();

    } //cierra la clase pintar

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    mover() {

        if (this.poner == false && this.coger == false) {
            switch (this.idPlayer) {

                case "Uno":

                    if (this.app.keyIsDown(68) && this.aplastado == false) {
                        this.perspectiva = "der";
                        this.der = true;
                        this.izq = false;
                    } else this.der = false;

                    if (this.app.keyIsDown(65) && this.aplastado == false) {
                        this.perspectiva = "izq";
                        this.izq = true;
                        this.der = false;
                    } else this.izq = false;


                    if (this.app.keyIsDown(83) && this.arrastra == false && this.gano == false) {
                        this.agachado = true;
                        this.izq = false;
                        this.der = false;
                    } else this.agachado = false;


                    if (this.app.keyIsDown(87) && this.gano == false) {

                        if (this.puedeSaltar && this.cayendo == false && this.aplastado == false) {
                            if (this.agachado == false) this.vel.y = -10;
                            if (this.agachado) this.vel.y = -8;
                            this.puedeSaltar = false;
                            this.cayendo = true;
                            this.parado = false;
                            this.arrastra = false;
                        }

                        if (this.arrastra && this.cayendo == false) {
                            this.vel.y = -8;
                            this.vel.x = this.rebotePared;
                            this.arrastra = false;
                            this.cayendo = true;
                            this.parado = false;
                        }
                    } else this.cayendo = false;

                    break;

                case "Dos":

                    if (this.app.keyIsDown(this.app.RIGHT_ARROW) && this.aplastado == false) {
                        this.perspectiva = "der";
                        this.der = true;
                        this.izq = false;
                    } else this.der = false;

                    if (this.app.keyIsDown(this.app.LEFT_ARROW) && this.aplastado == false) {
                        this.perspectiva = "izq";
                        this.izq = true;
                        this.der = false;
                    } else this.izq = false;


                    if (this.app.keyIsDown(this.app.DOWN_ARROW) && this.arrastra == false && this.gano == false) {
                        this.agachado = true;
                        this.izq = false;
                        this.der = false;
                    } else this.agachado = false;


                    if (this.app.keyIsDown(this.app.UP_ARROW) && this.gano == false) {

                        if (this.puedeSaltar && this.cayendo == false && this.aplastado == false) {
                            if (this.agachado == false) this.vel.y = -10;
                            if (this.agachado) this.vel.y = -8;
                            this.puedeSaltar = false;
                            this.cayendo = true;
                            this.parado = false;
                            this.arrastra = false;
                        }

                        if (this.arrastra && this.cayendo == false) {
                            this.vel.y = -8;
                            this.vel.x = this.rebotePared;
                            this.arrastra = false;
                            this.cayendo = true;
                            this.parado = false;

                        }
                    } else this.cayendo = false;

                    break;
            } //cierra el switch de player
        }
    } //cierra el metodo mover


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    fisicas() {


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //el personaje reacciona a la fisica de su mundo

        //capa la posicion si se cae del mapa

        if (this.caido || this.aplastado || this.gano) {

            this.izq = false;
            this.der = false;
        }




        //aplica las aceleraciones a las velocidades
        this.vel.x += this.acel.x;
        this.vel.y += this.acel.y

        //aplica las fisicas a la posicion 
        this.pos.x += (this.app.int)(this.vel.x);
        this.pos.y += (this.app.int)(this.vel.y);


        //gravedad

        if (this.gravedad) {
            this.acel.y = 0.38;
        } else if (this.gravedad == false) {
            this.acel.y = 0;
            this.vel.y = 0;
        }

        //limite de gravedad para evitar bugs :V

        if (this.vel.y >= 10) this.vel.y = 10;


        //super noqueado

        if (this.noqueado) {

            this.aplastado = true;
        }

        //noqueado

        if (this.aplastado) {
            this.izq = false;
            this.der = false;
            this.agachado = true;
            this.acel.x = 0;
        }


        //aceleracion al correr

        if (this.agachado == false) {

            if (this.izq) {

                if (this.vel.x > -4) {
                    this.acel.x = -0.3;
                } else this.acel.x = 0;
            }
            if (this.der) {
                if (this.vel.x < 4) {
                    this.acel.x = 0.3;

                } else this.acel.x = 0;
            }
        }


        //desaceleracion, inercia y frenado.

        if (this.izq == false && this.der == false) {


            //frenado si está caminando

            if (this.agachado == false) {
                if (this.vel.x < 0) {
                    this.acel.x = 0.08;
                    if ((this.app.int)(this.vel.x) == 0) {
                        this.vel.x = 0;
                        this.acel.x = 0;
                    }
                }

                if (this.vel.x > 0) {
                    this.acel.x = -0.08;
                    if ((this.app.int)(this.vel.x) == 0) {
                        this.vel.x = 0;
                        this.acel.x = 0;
                    }
                }
            } else if (this.agachado) {

                //desliza si hace planchazo

                if (this.vel.x < 0) {
                    this.acel.x = 0.04;
                    if ((this.app.int)(this.vel.x) == 0) {
                        this.vel.x = 0;
                        this.acel.x = 0;
                    }
                }

                if (this.vel.x > 0) {
                    this.acel.x = -0.04;
                    if ((this.app.int)(this.vel.x) == 0) {
                        this.vel.x = 0;
                        this.acel.x = 0;
                    }
                }
            }
        }


        //se agacha

        if (this.agachado) {
            this.ancho = 80;
            this.alto = 30;
        } else if (this.agachado == false) {
            this.ancho = 40;
            this.alto = 70;

        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //el jugador interactua con las paredes y el suelo

        for (let i = 0; i < this.suelo.length; i++) {
            let sue = this.suelo[i];

            //el jugador está pisando suelo
            if (this.vel.y >= 0 && (this.app.int)(this.pos.y + this.alto / 2) > sue.pos.y && (this.app.int)(this.pos.y + this.alto / 2) < sue.pos.y + 30 && this.pos.x - this.ancho / 2 <= sue.pos.x + sue.ancho && this.pos.x + this.ancho / 2 >= sue.pos.x) {
                this.vel.y = 0;
                this.pos.y = sue.pos.y - this.alto / 2;
                this.puedeSaltar = true;
                this.arrastra = false;
                this.parado = true;
                if (this.gano) this.vel.y = -10;
            }

            //el jugador se da con el techo

            if (this.vel.y < 0 && (this.app.int)(this.pos.y - this.alto / 2) < sue.pos.y + sue.alto && (this.app.int)(this.pos.y - this.alto / 2) > sue.pos.y && this.pos.x - this.ancho / 2 <= sue.pos.x + sue.ancho && this.pos.x + this.ancho / 2 >= sue.pos.x) {
                this.vel.y *= -1;
            }


            //el jugador se da con las paredes y se aferra a ellas


            if (this.pos.y + this.alto / 2 > sue.pos.y + 10 && this.pos.y - this.alto / 2 < sue.pos.y + sue.alto) {

                if (this.vel.x > 0 && this.pos.x + this.ancho / 2 + this.vel.x >= sue.pos.x - 5 && this.pos.x - this.ancho / 2 < sue.pos.x) {
                    this.puedeSaltar = false;
                    this.arrastra = true;
                    this.parado = false;
                    this.vel.x = 0;
                    this.acel.y = 0.1;
                    this.rebotePared = -4;
                    break;
                }

                if (this.vel.x < 0 && this.pos.x - this.ancho / 2 + this.vel.x <= sue.pos.x + sue.ancho + 5 && this.pos.x + this.ancho / 2 > sue.pos.x + sue.ancho) {
                    this.puedeSaltar = false;
                    this.arrastra = true;
                    this.parado = false;
                    this.acel.y = 0.1;
                    this.vel.x = 0;
                    this.rebotePared = 4;
                    break;
                } else this.arrastra = false;
            }

        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //logica del 1 vs 1


        //empuja enemigo

        if (this.pos.y + this.alto / 2 > this.adversario.pos.y - this.adversario.alto / 2 + 10 && this.pos.y - this.alto / 2 < this.adversario.pos.y + this.adversario.alto / 2) {

            //rebote de fueezas contrarias

            if (this.vel.x > 0 && this.adversario.vel.x != 0 && this.pos.x + this.ancho / 2 + this.vel.x >= this.adversario.pos.x - this.adversario.ancho / 2 && this.pos.x - this.ancho / 2 < this.adversario.pos.x - this.adversario.ancho / 2) {
                this.vel.x = -3;
            }

            if (this.vel.x < 0 && this.adversario.vel.x != 0 && this.pos.x - this.ancho / 2 + this.vel.x <= this.adversario.pos.x + this.adversario.ancho / 2 && this.pos.x + this.ancho / 2 > this.adversario.pos.x + this.adversario.ancho / 2) {
                this.vel.x = 3;

            }

            //empuja si el adversario se quedó quieto

            if (this.vel.x > 0 && this.adversario.vel.x == 0 && this.pos.x + this.ancho / 2 + this.vel.x >= this.adversario.pos.x - this.adversario.ancho / 2 && this.pos.x - this.ancho / 2 < this.adversario.pos.x - this.adversario.ancho / 2) {
                this.adversario.vel.x = 4;
                this.adversario.perspectiva = "der";
                this.vel.x = 0;
            }

            if (this.vel.x < 0 && this.adversario.vel.x == 0 && this.pos.x - this.ancho / 2 + this.vel.x <= this.adversario.pos.x + this.adversario.ancho / 2 && this.pos.x + this.ancho / 2 > this.adversario.pos.x + this.adversario.ancho / 2) {
                this.adversario.perspectiva = "izq";
                this.adversario.vel.x = -4;
                this.vel.x = 0;

            }

        }

        //aplastó enemigo y sale disparado

        if (this.vel.y > 0 && this.agachado == false &&
            ((this.pos.x - this.ancho / 2 > this.adversario.pos.x - this.adversario.ancho / 2 && this.pos.x - this.ancho / 2 < this.adversario.pos.x + this.adversario.ancho / 2) || (this.pos.x + this.ancho / 2 > this.adversario.pos.x - this.adversario.ancho / 2 && this.pos.x + this.ancho / 2 < this.adversario.pos.x + this.adversario.ancho / 2)) &&
            this.pos.y + this.alto / 2 > this.adversario.pos.y - this.adversario.alto / 2 && this.pos.y + this.alto / 2 < this.adversario.pos.y) {
            this.adversario.vel.y += this.vel.y;
            this.vel.y = -8;
            this.parado = false;
            this.puedeSaltar = true;
            if (this.adversario.parado && this.adversario.agachado == false) this.adversario.aplastado = true;

        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //logica de la interaccion con armas, plataformas o trampas


        //el jugador está pisando una plataforma arma o trampa

        for (let i = 0; i < this.elementos.length; i++) {

            let ele = this.elementos[i];

            if (this.vel.y >= 0 && (this.app.int)(this.pos.y + this.alto / 2) > ele.pos.y - ele.alto / 2 && (this.app.int)(this.pos.y + this.alto / 2) < ele.pos.y + ele.alto / 2 && this.pos.x - this.ancho / 2 <= ele.pos.x + ele.ancho / 2 && this.pos.x + this.ancho / 2 >= ele.pos.x - ele.ancho / 2) {

                this.vel.y = 0;
                this.pos.y = (ele.pos.y - ele.alto / 2) - this.alto / 2;
                this.puedeSaltar = true;
                this.arrastra = false;
                this.parado = true;

                //activa la mina
                if (ele.tipo == "Mina" && ele.activada == false && this.noqueado == false && this.pos.x > ele.pos.x - 30 && this.pos.x < ele.pos.x + 30) {
                    
                    this.kaboom.play();
                    ele.explota = true;
                    ele.activada = true;
                    this.vel.x *= -1.5;
                    this.vel.y = -10;
                    this.noqueado = true;
                    if (this.perspectiva == "izq") {
                        this.perspectiva = "der";
                        break;
                    }
                    if (this.perspectiva == "der") {
                        this.perspectiva = "izq";
                        break;
                    }
                }

            }

            //el jugador golpea algunos elemnetos por debajo

            if (this.vel.y < 0 && ele.tipo != "Andamio" && (this.app.int)(this.pos.y - this.alto / 2) < ele.pos.y + ele.alto / 2 && (this.app.int)(this.pos.y - this.alto / 2) > ele.pos.y - ele.alto / 2 && this.pos.x - this.ancho / 2 <= ele.pos.x + ele.ancho / 2 && this.pos.x + this.ancho / 2 >= ele.pos.x - ele.ancho / 2) {
                this.vel.y *= -1;
            }


            //el jugador puede escalar algunos elementos

            if (ele.tipo != "Andamio" && this.pos.y + this.alto / 2 > ele.pos.y - ele.alto / 2 + 10 && this.pos.y - this.alto / 2 < ele.pos.y + ele.alto / 2) {

                if (this.vel.x > 0 && this.pos.x + this.ancho / 2 + this.vel.x >= ele.pos.x - ele.ancho / 2 - 5 && this.pos.x - this.ancho / 2 < ele.pos.x - ele.ancho / 2) {
                    this.puedeSaltar = false;
                    this.arrastra = true;
                    this.parado = false;
                    this.vel.x = 0;
                    this.acel.y = 0.1;
                    this.rebotePared = -4;
                    break;
                }

                if (this.vel.x < 0 && this.pos.x - this.ancho / 2 + this.vel.x <= ele.pos.x + ele.ancho / 2 + 5 && this.pos.x + this.ancho / 2 > ele.pos.x + ele.ancho / 2) {
                    this.puedeSaltar = false;
                    this.arrastra = true;
                    this.parado = false;
                    this.acel.y = 0.1;
                    this.vel.x = 0;
                    this.rebotePared = 4;
                    break;
                }
            }
        }



        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //evalua si el jugador ya llego a la meta

        if (this.app.dist(this.pos.x, this.pos.y, this.bandera.pos.x, this.bandera.pos.y) < 50) this.gano = true;


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //todos los estados del jugador

        if (this.gravedad) {

            if (this.agachado && this.aplastado == false) this.estado = "Agachado "
            if (this.vel.y == 0 && this.izq == false && this.der == false && this.vel.x == 0 && this.agachado == false) this.estado = "Quieto ";
            if (this.vel.y == 0 && (this.izq || this.der) && this.arrastra == false && this.agachado == false && (this.vel.x > 2 || this.vel.x < -2)) this.estado = "Caminando "
            if (this.arrastra) this.estado = "Arrastra "
            if (this.vel.y >= 1 && this.arrastra == false && this.agachado == false) this.estado = "Cayendo "
            if (this.vel.y < 0 && this.arrastra == false && this.agachado == false) this.estado = "Saltando "
            if (this.agachado && this.vel.x != 0 && this.aplastado == false && this.vel.y == 0) this.estado = "Deslizando ";
            if (this.aplastado) this.estado = "Noqueado "
            if (this.der == false && this.vel.y == 0 && this.izq == false && this.vel.x != 0 && this.agachado == false && (this.vel.x > 3 || this.vel.x < -3)) this.estado = "Frenando "
        }
    } //cierra el metodo fisicas

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //indica el tiempo que el jugador pasa noqueado

    recover() {

        if (this.noqueado == false) {
            if (this.aplastado) this.campanazoKO += 1;
            if (this.campanazoKO >= this.aguante) {
                this.aplastado = false;
                this.vel.y = -7;
                this.campanazoKO = 0;
                this.aguante += 0.5;
                if (this.aguante >= 5) this.aguante = 5;
            }
        }
    } //cierra el metodo recover

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    sprites() {

        //carga el sprite correspondiente para cada estado 

        this.app.imageMode(this.app.CENTER);
        switch (this.estado) {
            case "Quieto ":

                if (this.frames >= this.quietoD.length) this.frames = 0;
                if (this.perspectiva == "der") this.app.image(this.quietoD[this.app.int(this.frames)], this.pos.x + 6, this.pos.y - 5, this.ancho + 15, this.alto + 10);
                if (this.perspectiva == "izq") this.app.image(this.quietoI[this.app.int(this.frames)], this.pos.x - 6, this.pos.y - 5, this.ancho + 15, this.alto + 10);

                break;

            case "Caminando ":

                if (this.frames >= this.corriendoD.length) this.frames = 0;
                if (this.perspectiva == "der") this.app.image(this.corriendoD[this.app.int(this.frames)], this.pos.x, this.pos.y - 5, this.ancho + 50, this.alto + 10);
                if (this.perspectiva == "izq") this.app.image(this.corriendoI[this.app.int(this.frames)], this.pos.x, this.pos.y - 5, this.ancho + 50, this.alto + 10);
                break;


            case "Agachado ":
                if (this.perspectiva == "der") this.app.image(this.agachadoD, this.pos.x, this.pos.y, this.ancho + 50, this.alto + 40);
                if (this.perspectiva == "izq") this.app.image(this.agachadoI, this.pos.x, this.pos.y, this.ancho + 50, this.alto + 40);

                break;


            case "Noqueado ":

                if (this.frames >= this.estrellitas.length) this.frames = 0;

                if (this.perspectiva == "der") {
                    this.app.image(this.estrellitas[this.app.int(this.frames)], this.pos.x + this.ancho / 2, this.pos.y - 35, 50, 50);
                    this.app.image(this.aplastadoD, this.pos.x, this.pos.y - 5, this.ancho + 50, this.alto + 40);
                }


                if (this.perspectiva == "izq") {
                    this.app.image(this.estrellitas[this.app.int(this.frames)], this.pos.x - this.ancho / 2, this.pos.y - 35, 50, 50);
                    this.app.image(this.aplastadoI, this.pos.x, this.pos.y - 5, this.ancho + 50, this.alto + 40);
                }

                break;

            case "Deslizando ":
                if (this.frames >= this.deslizandoD.length) this.frames = 0;

                if (this.perspectiva == "der") {
                    this.app.image(this.deslizandoD[this.app.int(this.frames)], this.pos.x, this.pos.y - 8, this.ancho + 50, this.alto + 40);
                }

                if (this.perspectiva == "izq") {
                    this.app.image(this.deslizandoI[this.app.int(this.frames)], this.pos.x, this.pos.y - 8, this.ancho + 50, this.alto + 40);
                }

                break;

            case "Arrastra ":

                if (this.perspectiva == "der") {
                    this.app.image(this.arrastrandoseD, this.pos.x - 10, this.pos.y - 5, this.ancho + 30, this.alto + 5);
                }
                if (this.perspectiva == "izq") {
                    this.app.image(this.arrastrandoseI, this.pos.x + 10, this.pos.y - 5, this.ancho + 30, this.alto + 5);
                }
                break;

            case "Frenando ":
                if (this.perspectiva == "der") {
                    this.app.image(this.frenandoD, this.pos.x + 10, this.pos.y - 5, this.ancho + 50, this.alto + 50);
                }
                if (this.perspectiva == "izq") {
                    this.app.image(this.frenandoI, this.pos.x - 10, this.pos.y - 5, this.ancho + 50, this.alto + 50);
                }
                break;

            case "Cayendo ":

                if (this.perspectiva == "der") {
                    this.app.image(this.fallingD, this.pos.x + 10, this.pos.y - 5, this.ancho + 20, this.alto + 20);
                }
                if (this.perspectiva == "izq") {
                    this.app.image(this.fallingI, this.pos.x - 10, this.pos.y - 5, this.ancho + 20, this.alto + 20);
                }
                break;

            case "Saltando ":

                if (this.perspectiva == "der") {
                    this.app.image(this.elevandoD, this.pos.x + 10, this.pos.y - 5, this.ancho + 20, this.alto + 20);
                }
                if (this.perspectiva == "izq") {
                    this.app.image(this.elevandoI, this.pos.x - 10, this.pos.y - 5, this.ancho + 20, this.alto + 20);
                }
                break;



        } //cierra el switch de estado
    } //cierra el metodo sprites

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    frameRate() {

        //determina la velocidad de frame para cada sprite

        switch (this.estado) {
            case "Quieto ":

                if (this.frames < this.quietoD.length) {
                    this.frames += 0.2;
                }
                break;

            case "Caminando ":
                if (this.frames < this.corriendoD.length) {
                    this.frames += 1;
                }
                break;

            case "Noqueado ":
                if (this.frames < this.estrellitas.length) {
                    this.frames += 1;
                }
                break;

            case "Deslizando ":
                if (this.frames < this.deslizandoD.length) {
                    this.frames += 1;
                }
                break;

        } //cierra el switch de estado
    } //cierra el metodo frameRate
} //cierra la clase jugador