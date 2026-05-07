'use strict';

class UIc extends Phaser.Scene{
    constructor(){
        super({key: "UIc"});
    }

    init(data) {
        this.lifes = 3;
        this.score = 0;
    }

    create(data){
        // this.scene.setVisible(true);
        let graphics = this.add.graphics();
        this.widthS = this.sys.game.config.width;
        this.GOSound = this.sound.add("GO");
        this.GOSound.setVolume(0.4);

        graphics.fillStyle(0x3fd0d4,1);
        this.header = graphics.fillRect(0,0,this.widthS,50);

        this.h1 = this.add.image(this.widthS - 20, 25, "heart");
        this.h2 = this.add.image(this.widthS - 43, 25, "heart");
        this.h3 = this.add.image(this.widthS - 66, 25, "heart");


            this.question = this.add.text(this.widthS/2,20, data.question.question, {font: "40px monogram", fill:"#000000"});
            this.add.text(10,2, "Score", {font: "20px monogram", fill:"#000000"});
            this.score = this.add.text(10,20, data.score, {font: "20px monogram", fill:"#000000"});
            this.question.setOrigin(0.5);
        
        
        
        // this.question = data.question.question;
        this.scene.get("SceneB").events.on("collisionPO",(e)=>{
            this.lifes = e.lifes;
            switch(this.lifes){
                case 2:
                    this.h3.visible = false;
                    break;
                case 1:
                    this.h2.visible = false;
                    break;
                case 0:
                    //TODO
                    
                    this.GOSound.play();
                    this.scene.setVisible(false,"SceneB");
                    this.scene.setVisible(false,"UIc");
                    this.goscene = this.scene.launch("GameOver", {score: this.score._text });
                    this.goscene.start();
                    this.scene.setActive(false,"SceneB");                
                    
                    this.h1.visible = false;
                    break;
            }
        })
        
        this.scene.get("SceneB").events.on("correctans",(e)=>{
            this.question.text = e.question.question;
            this.score.text = e.score;
        }, this);
        
    }

    // update(data){
    //     // this.question = data.question.question;
    // }

}

export default UIc;