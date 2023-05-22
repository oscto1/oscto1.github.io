'use strict';

export default class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "Bootloader"});
        
    }

    preload(){
        this.load.image("player1","./assets/kenney_tiny-ski/Tiles/tile_0070.png");
        this.load.image("player2","./assets/kenney_tiny-ski/Tiles/tile_0071.png");
        this.load.image("obstacle1","./assets/kenney_tiny-ski/Tiles/tile_0030.png");
        this.load.image("obstacle2","./assets/kenney_tiny-ski/Tiles/tile_0047.png");
        this.load.image("obstacle3","./assets/kenney_tiny-ski/Tiles/tile_01.png");
        this.load.image("obstacle4","./assets/kenney_tiny-ski/Tiles/tile_0081.png");
        this.load.image("obstacle5","./assets/kenney_tiny-ski/Tiles/tile_0031.png");
        this.load.image("answer1","./assets/kenney_tiny-ski/Tiles/tile_02.png");
        this.load.image("answer2","./assets/kenney_tiny-ski/Tiles/tile_03.png");
        this.load.image("trail", "./assets/kenney_tiny-ski/Tiles/tile_0059.png");
        this.load.image("heart", "./assets/Heart/heart.png");
        this.load.image("A","./assets/kenney_input-prompts/Tiles/tile_0120.png");
        this.load.image("D","./assets/kenney_input-prompts/Tiles/tile_0122.png");
        this.load.image("finger","./assets/kenney_input-prompts/Tiles/tile_0578.png");
        this.load.audio('bgMusic', './assets/audio/audio/Catwalk.ogg');
        this.load.audio('crash', './assets/audio/audio/crash.ogg');
        this.load.audio('wrong', './assets/audio/audio/wrong.mp3');
        this.load.audio('correct', './assets/audio/audio/correct.mp3');
        this.load.audio('GO', './assets/audio/audio/GO.mp3');
        WebFont.load({
            custom: {
                families: ['monogram'],
                urls: ["./src/styles.css"],
                
            },
            active: function () {
                console.log('Font loaded!');
            }
        });
    }

    init(){
        this.step = 1;
        this.scene.bringToTop();
    }

    create(){
        let graphics = this.add.graphics();
          
                this.step = 1;

                graphics.fillStyle(0x3fd0d4,1);

                graphics.fillRect(0,0,this.sys.game.config.width,this.sys.game.config.height);

                this.add.image(this.sys.game.config.width/2, 35, "player1").setScale(2.6);
                this.add.text(this.sys.game.config.width/2,100, "Math Slopes", {font: "60px monogram", fill:"#fffafa",stroke: '#000000',strokeThickness: 4}).setOrigin(0.5,0.5).setStyle({fontSmooth:"none",pixelArt:true});
                this.textmain = this.add.text(this.sys.game.config.width/2,250, "Solve simple math problems to earn points.", {font: "25px monogram", fill:"#000000", wordWrap: { width: this.sys.game.config.width - 40 }, align:"center"}).setOrigin(0.5,0.5).setStyle({fontSmooth:"none",pixelArt:true});
                this.textsec = this.add.text(this.sys.game.config.width/2,420, "Avoid the obstacles, or you will lose health.\n\nThe speed will increase as you score more points.", {font: "25px monogram", fill:"#000000", wordWrap: { width: this.sys.game.config.width - 40 }, align:"center"}).setOrigin(0.5,0.5);
                this.add.text(this.sys.game.config.width/2,this.sys.game.config.height - 50, "Press SPACE or touch the screen to continue", {font: "38px monogram", fill:"#fffafa", wordWrap: { width: this.sys.game.config.width - 40 }, align:"center"}).setOrigin(0.5,0.5);
                this.A = this.add.image((this.sys.game.config.width/2)-30, 200, "A").setScale(2.5);
                this.A.visible = false;
                this.D = this.add.image((this.sys.game.config.width/2)+30, 200, "D").setScale(2.5);
                this.D.visible = false;
                this.finger = this.add.image((this.sys.game.config.width/2)-30, 370, "finger").setScale(2.5);
                this.finger.visible = false;

                this.tweens.add({
                    targets: [this.A, this.D],
                    y: 195,
                    duration: 500,
                    ease: "Linear",
                    repeat:-1,
                    yoyo: true
                });

                this.tweens.add({
                    targets: this.finger,
                    x: (this.sys.game.config.width/2)+30,
                    duration: 500,
                    ease: "Linear",
                    repeat:-1,
                    yoyo: true
                });

                this.input.on('pointerdown',this.startGame , this);
                
                this.input.keyboard.on("keydown-SPACE",this.startGame, this);
        
  
    }


    startGame(){
        switch(this.step){
            case 1:
                this.A.visible = true;
                this.D.visible = true;
                this.finger.visible = true;
                this.textmain.text = "Use A and D on your keyboard to control the character";
                this.textsec.text = "Or, Swipe to control the character.";
                this.step = 2;
                break;
            case 2:
                this.scene.start("SceneB");
                break;
        }
    }
}