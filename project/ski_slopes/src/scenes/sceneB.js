'use strict';

import Player from "../gameObjects/player.js";
import Obstacle from "../gameObjects/obstacle.js";
import Answer from "../gameObjects/answer.js";
import Utils from "../utils/utils.js";
import Mathe from "../utils/mathe.js";
import UIc from "./UI.js";

class SceneB extends Phaser.Scene {
    constructor(){
        super({key: "SceneB"});
        
    }

    init(){
        this.listObstacles = [];
        this.listAns = [];
        this.ques = this.question();
        this.points = 0;
        this.lifes = 3;
    }
    
    create(){
        // this.player = this.physics.add.image(50,50,"player");
        //Controller
        // this.scene.restart();


        try{
        let graphics = this.add.graphics();

        this.header = graphics.fillStyle(0xfffafa,1);

        graphics.fillRect(0,0,this.sys.game.config.width,this.sys.game.config.height);


        this.widthS = this.sys.game.config.width;
        this.heightS = this.sys.game.config.height;
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        
        // this.graphics = this.add.graphics();

        this.bgMusic = this.sound.add("bgMusic");

        this.bgMusic.play();
        this.bgMusic.setVolume(0.3);
        this.bgMusic.setLoop(true);

        this.crashSound = this.sound.add("crash");
        this.crashSound.setVolume(0.4);
        this.wrongSound = this.sound.add("wrong");
        this.wrongSound.setVolume(0.4);
        this.correctSound = this.sound.add("correct");
        this.correctSound.setVolume(0.4);

        this.utils = new Utils();
        this.mathe = new Mathe();
        // this.sceneUI = this.scene.add("UIc");

        // this.sceneUI = this.scene.add("UIc");
        // if(!(this.scene.get("UIc"))){
        //     this.scene.reload
        //     this.sceneUI = this.scene.add("UIc", new UIc());
        //     console.log("added");
        // }

        this.sceneUI = this.scene.launch("UIc", { question: this.ques, score: this.points });
        

        // console.log(this.operacion);

        //Game objects
        this.player = new Player(this, this.widthS/2, 35, "player1");
        this.player.setScale(2.6);
        this.player.body.setSize(this.player.width-4,this.player.height-5);
        this.player.body.setOffset(2, 5);
        this.trail = this.add.image(this.player.x, this.player.y, "trail");
        this.trail.setScale(2.6);
        this.trail.visible = false;
        this.trail.setOrigin(0.5,0);
        this.speed = 0.1;


        for(let i=0;i<=7;i++){
            let randimgA = "answer" + Math.round(this.utils.randomNumber(1,2));
            let answer = new Answer(this, this.utils.randomNumber(0, this.widthS), this.utils.randomNumber(this.heightS, this.heightS+1000), randimgA, Math.round(this.utils.randomNumber(0,20)));
            answer.setScale(2.5);
            answer.setOrigin(0.5,0);
            answer.body.setSize(answer.width - 5, answer.height - 4.5);
            
            this.physics.add.collider(this.player, answer, this.pCollisionA, null,this);
            this.listAns.push(answer);

            let randimg = "obstacle" + Math.round(this.utils.randomNumber(1,5));  
            let obstacle = this.obstacle = new Obstacle(this, this.utils.randomNumber(0, this.widthS), this.utils.randomNumber(this.heightS, this.heightS+1000), randimg);
            obstacle.setScale(2.5);
            obstacle.setOrigin(0,0); 
            obstacle.body.setSize(obstacle.width - 4.5, 11);
            obstacle.body.setOffset(1.8, obstacle.height-11);
            this.physics.add.collider(this.player, obstacle, this.pCollision, null,this);
            this.listObstacles.push(obstacle);
        }
        
        
        this.tweens.add({
            targets: this.player,
            y: 100,
            duration: 500,
            ease: 'Linear',
            onComplete: ()=>{
                this.player.setTexture("player2");
                this.trail.visible = true;
            }
        })

        this.cursor = this.input.on('pointermove',this.touchControl, this);
        // this.cursor = this.input.on('pointerup',this.touchControlUp, this);

        // Physics
        
        this.timer = this.time.addEvent({
            delay: 2000,
            callback: this.spawnObstacles,
            callbackScope: this,
            loop: true
        });
        // this.physics.add.collider(this.player, this.obstacle, this.pCollision, null,this);
    }catch(e){
        console.log(e);
    }

    }

    update(time,delta){
        try{

            if(this.player.x>=10){
                if(this.left.isDown){
                    this.player.x = this.player.x - 2;
                }
            }
            if(this.player.x<=this.widthS-10){
                if(this.right.isDown){
                    this.player.x = this.player.x + 2;
                }
            }
                
        
        this.trail.x = this.player.x;

        if(this.points >= 30 && this.points < 50){
            // this.timer.delay = 1000;
            this.speed = 0.2;
        }else if(this.points >= 50){
            this.timer.delay = 500;
            this.speed = 0.3;
        }

        console.log()
        for(let i=0; i<this.listObstacles.length; i++){
            this.listObstacles[i].y = this.listObstacles[i].y - this.speed * delta;
            if(this.listObstacles[i].y <= -30){
                let randimg = "obstacle" + Math.round(this.utils.randomNumber(1,5));  
                this.listObstacles[i].y = Math.round(this.utils.randomNumber(this.heightS, this.heightS+1000));
                this.listObstacles[i].x = Math.round(this.utils.randomNumber(0, this.widthS));
                this.listObstacles[i].setTexture(randimg);
                this.listObstacles[i].body.enable = true;
            }

            this.listAns[i].y = this.listAns[i].y - this.speed * delta;
            this.listAns[i].text.y = this.listAns[i].y;
            this.listAns[i].text.x = this.listAns[i].x;
            if(this.listAns[i].y <= -30){
                let randimgA = "answer" + Math.round(this.utils.randomNumber(1,2));  
                this.listAns[i].y = Math.round(this.utils.randomNumber(this.heightS, this.heightS+1000));
                this.listAns[i].x = Math.round(this.utils.randomNumber(0, this.widthS));
                this.listAns[i].setTexture(randimgA);
                let newAns = Math.floor(Math.random() * 21);
                this.listAns[i]._ans = newAns;
                this.listAns[i].text.text = newAns;
                this.listAns[i].body.enable = true;
            } 

            try{
                this.listAns[i].text.y = this.listAns[i].y;

            }catch(e){
                console.log(e);
            }
            // this.listAns[i].text.y = this.listAns[i].y;
            // this.listAns[i].text.x = this.listAns[i].x;
        }

    }catch(e){
        console.log(e);
    }
        
    }

    pCollision(object1, object2){

        try {
            this.player.setTint(0xf25b50);
            this.trail.setAlpha(0.4);
            this.speed = this.speed / 2;
            this.crashSound.play();
            object2.body.enable = false;

            this.time.delayedCall(2000, ()=>{
                this.player.setTint(this.player.tint);
                this.trail.setAlpha(1);
                this.speed = 0.1;
                if(this.points >= 30 && this.points < 50){
                    // this.timer.delay = 1000;
                    this.speed = 0.2;
                }else if(this.points >= 50){
                    this.timer.delay = 500;
                    this.speed = 0.3;
                }
                
            })

            this.lifes--;
            if(this.lifes == 0){
                this.bgMusic.stop();
                let data = {
                    score: this.points
                }
                this.events.emit("gameOver",this.points);
                this.sceneUI.setVisible(false);
            }

            let data = {
                lifes: this.lifes,
                score: this.points
            }

            this.events.emit("collisionPO",data);
        } catch (error) {
            console.log(error.error);
        }

    }

    pCollisionA(objeto1,objeto2){
        try {
            if(objeto2._ans == this.ques["answer"]){
                console.log("Bien");
                this.correctSound.play();
                this.ques = this.mathe.generateQuestion();
                this.points = this.points + 10;
                let data = {
                    question: this.ques,
                    score: this.points
                }
                this.events.emit("correctans",data);
            }else{
                console.log("Mal");
                this.wrongSound.play();
                if(this.points > 0){
                    this.points = this.points - 10;
                }
                let data = {
                    question: this.ques,
                    score: this.points
                }
                this.events.emit("correctans",data);
            }
            objeto2.body.enable = false;
        } catch (error) {
            console.log(error.error);
        }
        
    }


    question(){
        let ques = new Mathe().generateQuestion();
        return ques;
    }

    touchControl(pointer){

        this.player.x = pointer.x;

    }
}

export default SceneB;