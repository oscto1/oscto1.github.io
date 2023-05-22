
class Answer extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,type,ans){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);  
        this._ans = ans;
        this.text = scene.add.text(x,y, this._ans, {fontFamily: "monogram", color:"#ffffff", fontSize:"30px"});
        this.text.setOrigin(0.5,0);
        
        
    }
    
}

export default Answer;