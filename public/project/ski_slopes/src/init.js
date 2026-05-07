'use strict';
import Phaser from 'phaser';
import Bootloader from './scenes/Bootloader.js';
import SceneB from './scenes/sceneB.js';
import UIc from './scenes/UI.js';
import GameOver from './scenes/sceneC.js';
console.log("Lol");
console.log(1);

const config = {
    width: 180*2,
    height: 320*2,
    parent: "container",
    type: Phaser.AUTO,
    backgroundColor: '#f0f0f0',
    scene: [
        Bootloader,SceneB,UIc, GameOver
    ],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            // debug: true
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight)
});


export var game = new Phaser.Game(config);
var canvas = game.canvas;
// canvas.willReadFrequently = true;

var sw = document.getElementById("switch");

sw.addEventListener("click",()=>{
    var snows = document.querySelectorAll('.snowflake');
    if(!sw.checked){
        snows.forEach(function(element){
            element.style.display = "none";
        });
    }else{
        snows.forEach(function(element){
            element.style.display = "block";
        });
    }
});


