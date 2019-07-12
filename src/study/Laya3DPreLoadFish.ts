export class Laya3DPreLoadFish {
    
    resources:string[] = [ 
        'threeDimen/scene/TerrainScene/XunLongShi.ls',
        "threeDimen/skinModel/LayaMonkey/LayaMonkey.lh",
		"threeDimen/scene/TerrainScene/Assets/HeightMap.png", 
		"threeDimen/scene/TerrainScene/Assets/AStarMap.png",
    ];

    private scene:Laya.Scene;
    private camera:Laya.Camera;

    constructor(){
        Laya3D.init(0, 0);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        Laya.loader.create(this.resources.concat(),Laya.Handler.create(this,this.onPreloadFinish));
    }
    
    onPreloadFinish():void {
        var stage = Laya.stage;
        this.scene = Laya.Loader.getRes(this.resources[0]);
        if(this.scene) {  stage.addChild(this.scene);  }

        this.camera = D.findChildFromPath(this.scene,'Scenes.Main Camera') as Laya.Camera;
        if(this.camera) { 
            this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            var skyBox = new Laya.SkyBox();
            skyBox.textureCube = Laya.TextureCube.load("threeDimen/skyBox/skyBox2/skyCube.ltc");
            this.camera.sky = skyBox;
            // this.camera.addComponent(CameraMoveScript);
        };

        this.addMonkey();
    }

    private addMonkey():void {
        var monkeySprite3d:Laya.SkinnedMeshSprite3D = Laya.loader.getRes('threeDimen/skinModel/LayaMonkey/LayaMonkey.lh');
        this.scene.addChild(monkeySprite3d);
        monkeySprite3d.transform.position = new Laya.Vector3(7, 7, -13);
        monkeySprite3d.transform.scale = new Laya.Vector3(3, 3, 3);

        monkeySprite3d.addComponent(RoleMoveScript);

        this.camera.transform.position = new Laya.Vector3(7,9,-17);
        this.camera.transform.lookAt(monkeySprite3d.transform.position,new Laya.Vector3(0,1,0),false);

        //var forward:Laya.Vector3 = this.camera.transform.position.clone();
        //monkeySprite3d.transform.position = forward;
    }
}
new Laya3DPreLoadFish();