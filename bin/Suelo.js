//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Suelo {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor(app, x, y) {

        this.app = app;
        this.x = x;
        this.y = y;
        this.pos = this.app.createVector(this.x, this.y);
        this.ancho = 100;
        this.alto = 100;
        this.tierra = this.app.loadImage("./data/Escenario/Suelo/tierra.png");
        this.cesped = this.app.loadImage("./data/Escenario/Suelo/cesped.png");
        this.piedra = this.app.loadImage("./data/Escenario/Suelo/piedra.png");
        this.pasto = this.app.loadImage("./data/Escenario/Suelo/pasto.png");

        //decoracion del bloque de suelo

        this.poblacionPasto = this.app.int(this.app.random(1, 7));
        this.pastoX = [];

        for (let i = 0; i < this.poblacionPasto; i++) {
            this.pastoX[i] = this.app.int(this.app.random(this.pos.x, this.pos.x + this.ancho));
        }

        this.poblacionPiedra = this.app.int(this.app.random(5, 10));
        this.piedraPos = [];
        this.piedraTam = [];

        for (let i = 0; i < this.poblacionPiedra; i++) {
            this.piedraPos[i] = this.app.createVector(this.app.int(this.app.random(this.pos.x + 5, this.pos.x + this.ancho - 5)), this.app.int(this.app.random(this.pos.y + 5, this.pos.y + this.alto - 5)));
            this.piedraTam[i] = this.app.createVector(this.app.int(this.app.random(5, 15)), this.app.int(this.app.random(5, 15)));
        }


        this.fertil = true;


    } //cierra el constructor

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    pintar(suelo) {

        this.suelo = suelo;

        this.app.imageMode(this.app.CORNER);
        this.app.image(this.tierra, this.pos.x - 2, this.pos.y - 2, this.ancho + 2, this.alto + 2);


        //decora el bloque con piedras 
        this.app.imageMode(this.app.CENTER);

        for (let i = 0; i < this.poblacionPiedra; i++) {
            this.app.image(this.piedra, this.piedraPos[i].x, this.piedraPos[i].y, this.piedraTam[i].x, this.piedraTam[i].y);
        }

        //decora el bloque con pasto

        for (let i = 0; i < this.poblacionPasto; i++) {
            if (this.fertil) this.app.image(this.pasto, this.pastoX[i], this.pos.y - 5, 14, 15);
        }


        //detecta si puede poner cesped en el bloque o no
        this.app.imageMode(this.app.CORNER);

        for (let i = 0; i < this.suelo.length; i++) {
            let sue = this.suelo[i];
            if (this.pos.y == sue.pos.y + sue.alto && this.pos.x == sue.pos.x) this.fertil = false;
        }

        //pone el cesped

        if (this.fertil) this.app.image(this.cesped, this.pos.x - 1, this.pos.y - 1, this.ancho + 1, 40);


    } //cirra el metodo pintar
} //cierra la clase suelo