import { D } from "./utils/D";
import { CameraMoveScript } from "./common/CameraMoveScript";
import { ColliderScript } from "./common/ColliderScript";
import { DrawBoxColliderScript } from "./common/DrawBoxColliderScript";
import { LayaInject } from "./utils/LayaInject";
import { RoleMoveScript } from "./common/RoleMoveScript";
import { Laya3DPreLoadFish } from "./study/Laya3DPreLoadFish";

LayaInject();
new Laya3DPreLoadFish();

// // 程序入口
// class LayaAir3D {
//     constructor() {
//         //初始化引擎
//         Laya3D.init(0, 0, true);
//         //适配模式
//         Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
//         Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//         //开启统计信息
//         Laya.Stat.show();
//         //添加3D场景
//         var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
//         //添加照相机
//         var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
//         camera.transform.translate(new Laya.Vector3(0, 3, 3));
//         camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
//         camera.clearColor = null;
//         //添加方向光
//         var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
//         directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
//         directionLight.direction = new Laya.Vector3(1, -1, 0);
//         //添加自定义模型
//         var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
//         box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
//         var material: Laya.StandardMaterial = new Laya.StandardMaterial();
//         material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//         box.meshRender.material = material;
//     }
// }
// new LayaAir3D();

// class Laya3DLoad{
//     constructor(){
//          //初始化引擎
//         Laya3D.init(0, 0, true);
//         //适配模式
//         Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
//         Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//         Laya.Stat.show();
//         var stage = Laya.stage;
//         var scene:Laya.Scene = Laya.Scene.load('3D_Assets/LayaScene_LayaScene/LayaScene.ls');
//         stage.addChild(scene);   
//     }
// }
// new Laya3DLoad();




// class ColiderDemo {
//     /**键盘的上下左右控制猴子位移**/
// 		private scene:Laya.Scene;
//         private camera:Laya.Camera;
// 		private layaMonkey:Laya.Sprite3D;
// 		private layaMonkeyMeshSprite3D:Laya.SkinnedMeshSprite3D;
// 		private _tempUnitX1:Laya.Vector3 = new Laya.Vector3(0, 0, -0.1);
// 		private _tempUnitX2:Laya.Vector3 = new Laya.Vector3(0, 0, 0.1);
// 		private _tempUnitX3:Laya.Vector3 = new Laya.Vector3(-0.1, 0, 0);
// 		private _tempUnitX4:Laya.Vector3 = new Laya.Vector3(0.1, 0, 0);
// 		private collider:Laya.Sprite3D;
// 		private debug:Boolean = true;
//     constructor() {
//         Laya3D.init(0, 0, true);
//             Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
//             Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//             Laya.Stat.show();
			
// 			//预加载所有资源
// 			var resource:any = [
// 				{url: "threeDimen/scene/ColliderScene/ColliderDemo.ls", clas: Laya.Scene, priority: 1}, 
// 				{url: "threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", clas: Laya.Sprite3D, priority: 1}
// 			];
			
// 			Laya.loader.create(resource, Laya.Handler.create(this, this.onLoadFinish));
//     }
//     public onLoadFinish() : void {
// 			this.scene = Laya.stage.addChild(Laya.Scene.load("threeDimen/scene/ColliderScene/ColliderDemo.ls")) as Laya.Scene;
//             //初始化照相机
//             this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
//             this.camera.transform.translate(new Laya.Vector3(0, 6, 13));
//             this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
//             this.camera.addComponent(CameraMoveScript);
			
// 			//加载猴子
// 			this.layaMonkey = this.scene.addChild(Laya.Sprite3D.load("threeDimen/skinModel/LayaMonkey/LayaMonkey.lh")) as Laya.Sprite3D;
// 			this.layaMonkey.transform.position = new Laya.Vector3(0, 0, 1);
// 			this.layaMonkey.transform.scale = new Laya.Vector3(8, 8, 8);
			
// 			this.layaMonkeyMeshSprite3D = this.layaMonkey.getChildAt(0).getChildByName("LayaMonkey") as Laya.SkinnedMeshSprite3D;
// 			//添加盒型碰撞器
// 			var boxCollider:Laya.BoxCollider = this.layaMonkeyMeshSprite3D.addComponent(Laya.BoxCollider) as Laya.BoxCollider;
// 			boxCollider.setFromBoundBox(this.layaMonkeyMeshSprite3D.meshFilter.sharedMesh.boundingBox);
// 			(<any>this.layaMonkeyMeshSprite3D).camera = this.camera;
// 			//添加碰撞事件脚本
// 			this.layaMonkeyMeshSprite3D.addComponent(ColliderScript);
// 			//添加刚体组件
// 			this.layaMonkeyMeshSprite3D.addComponent(Laya.Rigidbody);
// 			//添加键盘事件
// 			Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
			
// 			this.collider = this.scene.getChildByName("Collider") as Laya.MeshSprite3D;
// 			this.collider.active = false;
			
// 			//是否开启debug模式
// 			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.drawCollider);
// 		}
		
// 		private onKeyDown(e:Laya.Event = null):void
// 		{
// 			if (e.keyCode == Laya.Keyboard.UP)
// 				this.layaMonkey.transform.translate(this._tempUnitX1);
// 			else if (e.keyCode == Laya.Keyboard.DOWN)
// 				this.layaMonkey.transform.translate(this._tempUnitX2);
// 			else if (e.keyCode == Laya.Keyboard.LEFT)
// 				this.layaMonkey.transform.translate(this._tempUnitX3);
// 			else if (e.keyCode == Laya.Keyboard.RIGHT)
// 				this.layaMonkey.transform.translate(this._tempUnitX4);
// 		}
		
// 		private drawCollider():void{
			
// 			if (!this.debug){
// 				this.collider.active = false;
// 				this.layaMonkeyMeshSprite3D.removeComponentByType(DrawBoxColliderScript);
// 				this.debug = true;
// 			}
// 			else{
// 				this.collider.active = true;
// 				this.layaMonkeyMeshSprite3D.addComponent(DrawBoxColliderScript);
// 				this.debug = false;
// 			}
// 		}
//     }
// new ColiderDemo();