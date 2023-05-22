'use strict';

class GameOver extends Phaser.Scene{
    constructor(){
        super({key:"GameOver"});
    }


    create(data){

        if(this.scene.get("UIc")){
            // var scc = this.scene.get("UIc");
            this.scene.setActive(false,"UIc");
        }

        let graphics = this.add.graphics();

        graphics.fillStyle(0x3fd0d4,1);

        graphics.fillRect(0,0,this.sys.game.config.width,this.sys.game.config.height);

        this.add.text(this.sys.game.config.width/2,(this.sys.game.config.height/2)-50, "Game Over", {font: "80px monogram", fill:"#000000"}).setOrigin(0.5,0.5);
        let score = parseInt(data["score"]);
        this.add.text(this.sys.game.config.width/2,(this.sys.game.config.height/2), "Score: " + score, {font: "40px monogram", fill:"#fffafa",stroke: '#000000',strokeThickness: 4}).setOrigin(0.5,0.5);
        this.add.text(this.sys.game.config.width/2,this.sys.game.config.height - 50, "Press SPACE or touch the screen to start again", {font: "30px monogram", fill:"#000000", wordWrap: { width: this.sys.game.config.width - 40 }, align:"center"}).setOrigin(0.5,0.5);
        

        this.input.keyboard.on("keydown-SPACE",this.startAgain,this);
        this.input.on("pointerdown", this.startAgain,this);

    }

    startAgain(){
        this.scene.start("Bootloader");
        
    }
}

export default GameOver;