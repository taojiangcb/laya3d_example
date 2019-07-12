(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D_1 = require("./utils/D");
var LayaInject_1 = require("./utils/LayaInject");
var RoleMoveScript_1 = require("./common/RoleMoveScript");
LayaInject_1.LayaInject();
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
var Laya3DLoad = /** @class */ (function () {
    function Laya3DLoad() {
        //初始化引擎
        Laya3D.init(0, 0, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        var stage = Laya.stage;
        var scene = Laya.Scene.load('3D_Assets/LayaScene_LayaScene/LayaScene.ls');
        stage.addChild(scene);
    }
    return Laya3DLoad;
}());
new Laya3DLoad();
var Laya3DPreLoadFish = /** @class */ (function () {
    function Laya3DPreLoadFish() {
        this.resources = [
            'threeDimen/scene/TerrainScene/XunLongShi.ls',
            "threeDimen/skinModel/LayaMonkey/LayaMonkey.lh",
            "threeDimen/scene/TerrainScene/Assets/HeightMap.png",
            "threeDimen/scene/TerrainScene/Assets/AStarMap.png",
        ];
        Laya3D.init(0, 0);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        Laya.loader.create(this.resources.concat(), Laya.Handler.create(this, this.onPreloadFinish));
    }
    Laya3DPreLoadFish.prototype.onPreloadFinish = function () {
        var stage = Laya.stage;
        this.scene = Laya.Loader.getRes(this.resources[0]);
        if (this.scene) {
            stage.addChild(this.scene);
        }
        this.camera = D_1.D.findChildFromPath(this.scene, 'Scenes.Main Camera');
        if (this.camera) {
            this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            var skyBox = new Laya.SkyBox();
            skyBox.textureCube = Laya.TextureCube.load("threeDimen/skyBox/skyBox2/skyCube.ltc");
            this.camera.sky = skyBox;
            // this.camera.addComponent(CameraMoveScript);
        }
        ;
        this.addMonkey();
    };
    Laya3DPreLoadFish.prototype.addMonkey = function () {
        var monkeySprite3d = Laya.loader.getRes('threeDimen/skinModel/LayaMonkey/LayaMonkey.lh');
        this.scene.addChild(monkeySprite3d);
        monkeySprite3d.transform.position = new Laya.Vector3(7, 7, -13);
        monkeySprite3d.transform.scale = new Laya.Vector3(3, 3, 3);
        monkeySprite3d.addComponent(RoleMoveScript_1.RoleMoveScript);
        this.camera.transform.position = new Laya.Vector3(7, 9, -17);
        this.camera.transform.lookAt(monkeySprite3d.transform.position, new Laya.Vector3(0, 1, 0), false);
        //var forward:Laya.Vector3 = this.camera.transform.position.clone();
        //monkeySprite3d.transform.position = forward;
    };
    return Laya3DPreLoadFish;
}());
new Laya3DPreLoadFish();
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

},{"./common/RoleMoveScript":2,"./utils/D":3,"./utils/LayaInject":4}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var D_1 = require("../utils/D");
var RoleMoveScript = /** @class */ (function (_super) {
    __extends(RoleMoveScript, _super);
    function RoleMoveScript() {
        var _this = _super.call(this) || this;
        _this.lookDist = 5;
        _this.isMouseDown = false;
        _this.yawPitchRoll = new Laya.Vector3();
        _this.rotaionSpeed = 0.000007;
        _this.beginAngine = 0;
        return _this;
    }
    RoleMoveScript.prototype._initialize = function (onwer) {
        _super.prototype._initialize.call(this, onwer);
        this.role = onwer;
        this.scene = this.role.scene;
        this.camera = D_1.D.findChildFromPath(this.scene, 'Scenes.Main Camera');
        this.cameraUpPos = new Laya.Vector3(0, 1, 0);
        this.followerCamera(true);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        this.roleAni = this.role.getComponentByType(Laya.Animator);
    };
    RoleMoveScript.prototype.mouseDown = function (e) {
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    };
    RoleMoveScript.prototype.mouseUp = function (e) {
        this.isMouseDown = false;
    };
    RoleMoveScript.prototype.mouseOut = function (e) {
        this.isMouseDown = false;
    };
    RoleMoveScript.prototype._update = function (state) {
        _super.prototype._update.call(this, state);
        this.updateRole(state.elapsedTime);
    };
    RoleMoveScript.prototype.updateRole = function (elapsedTime) {
        if (Laya.KeyBoardManager.hasKeyDown(87)) { //w
            var mv = 0.002 * elapsedTime;
            this.roleMove(mv, elapsedTime);
        }
        if (Laya.KeyBoardManager.hasKeyDown(83)) { //s
            var mv = 0.002 * elapsedTime;
            this.roleMove(-mv, elapsedTime);
        }
        if (Laya.KeyBoardManager.hasKeyDown(65)) { //a
            var mv = 0.002 * elapsedTime;
            this.rotationRole(mv);
        }
        if (Laya.KeyBoardManager.hasKeyDown(68)) { //d
            var mv = 0.002 * elapsedTime;
            this.rotationRole(-mv);
        }
        // this.followerCamera(false);
        if (this.isMouseDown) {
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;
            var yprElem = this.yawPitchRoll.elements;
            yprElem[0] += offsetX * this.rotaionSpeed * elapsedTime;
            yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
            this.rotationCamera();
        }
    };
    RoleMoveScript.prototype.rotationRole = function (rotation) {
        this.role.transform.rotate(new Laya.Vector3(0, rotation, 0), false);
    };
    RoleMoveScript.prototype.roleMove = function (mv, elapsedTime) {
        // var dist:Laya.Vector3 = new Laya.Vector3();
        // Laya.Vector3.subtract(this.camera.transform.position,this.role.transform.position,dist);
        this.role.transform.translate(new Laya.Vector3(0, 0, mv), true);
        // var cameraPos:Laya.Vector3 = new Laya.Vector3();
        // Laya.Vector3.add(dist,this.role.transform.position,cameraPos);
        // this.camera.transform.position = cameraPos;
        // var rolePos = this.role.transform.position;
        // this.camera.transform.lookAt(rolePos,this.cameraUpPos);
        var pos = new Laya.Vector3();
        Laya.Vector3.lerp(this.camera.transform.position, this.role.transform.position, elapsedTime * 1, pos);
        this.camera.transform.position = pos;
    };
    RoleMoveScript.prototype.followerCamera = function (isLookAt) {
        if (isLookAt === void 0) { isLookAt = false; }
        var rolePos = this.role.transform.position;
        if (isLookAt) {
            var pos = new Laya.Vector3(rolePos.x, rolePos.y + this.lookDist, rolePos.z - this.lookDist);
            this.camera.transform.position = pos;
            this.camera.transform.lookAt(rolePos, this.cameraUpPos);
            var distVector = new Laya.Vector3();
            Laya.Vector3.subtract(this.camera.transform.position, this.role.transform.position, distVector);
            this.beginAngine = Math.atan2(distVector.z, distVector.x);
        }
    };
    RoleMoveScript.prototype.rotationCamera = function () {
        var yprElem = this.yawPitchRoll.elements;
        var rounder = this.camera.transform;
        var center = this.role.transform;
        var angle = yprElem[0];
        var x1 = center.position.x + Math.cos(this.beginAngine + angle) * this.lookDist;
        var y1 = rounder.position.y;
        var z1 = center.position.z + Math.sin(this.beginAngine + angle) * this.lookDist;
        var add = new Laya.Vector3(x1, y1, z1);
        rounder.position = add;
        var rolePos = this.role.transform.position;
        rounder.lookAt(rolePos, this.cameraUpPos);
    };
    return RoleMoveScript;
}(Laya.Script));
exports.RoleMoveScript = RoleMoveScript;

},{"../utils/D":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D = /** @class */ (function () {
    function D() {
    }
    /**
     * 根据路径查找子集对象
     * @param targetObj
     * @param path
     */
    D.findChildFromPath = function (targetObj, path) {
        var paths = path.split(".");
        var findObj = targetObj;
        for (var i = 0; i < paths.length; i++) {
            findObj = findObj.getChildByName(paths[i]);
            if (!findObj) {
                break;
            }
        }
        return findObj;
    };
    return D;
}());
exports.D = D;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LayaInject() {
    Laya.Vector3.prototype['valueToString'] = function () {
        return "x:" + this.x + ",y:" + this.y + ",z:" + this.z;
    };
}
exports.LayaInject = LayaInject;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTGF5YUFpcjNELnRzIiwic3JjL2NvbW1vbi9Sb2xlTW92ZVNjcmlwdC50cyIsInNyYy91dGlscy9ELnRzIiwic3JjL3V0aWxzL0xheWFJbmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLCtCQUE4QjtBQUk5QixpREFBZ0Q7QUFDaEQsMERBQXlEO0FBR3pELHVCQUFVLEVBQUUsQ0FBQztBQUViLFVBQVU7QUFDVixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixtQ0FBbUM7QUFDbkMsaUJBQWlCO0FBQ2pCLHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFDMUQsbUJBQW1CO0FBQ25CLDRCQUE0QjtBQUM1QixtQkFBbUI7QUFDbkIsdUZBQXVGO0FBQ3ZGLGtCQUFrQjtBQUNsQixtR0FBbUc7QUFDbkcsaUVBQWlFO0FBQ2pFLDZFQUE2RTtBQUM3RSxvQ0FBb0M7QUFDcEMsa0JBQWtCO0FBQ2xCLHNIQUFzSDtBQUN0SCxrRUFBa0U7QUFDbEUsaUVBQWlFO0FBQ2pFLG9CQUFvQjtBQUNwQiw4SEFBOEg7QUFDOUgsMEVBQTBFO0FBQzFFLDZFQUE2RTtBQUM3RSw0RUFBNEU7QUFDNUUsOENBQThDO0FBQzlDLFFBQVE7QUFDUixJQUFJO0FBQ0osbUJBQW1CO0FBRW5CO0lBQ0k7UUFDSyxPQUFPO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hCLE1BQU07UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLElB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TyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNULE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLFFBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBcEJZLGNBQUM7Ozs7O0FDQ2QsU0FBZ0IsVUFBVTtJQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRztRQUN0QyxPQUFPLE9BQUssSUFBSSxDQUFDLENBQUMsV0FBTSxJQUFJLENBQUMsQ0FBQyxXQUFNLElBQUksQ0FBQyxDQUFHLENBQUM7SUFDakQsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUpELGdDQUlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgRCB9IGZyb20gXCIuL3V0aWxzL0RcIjtcclxuaW1wb3J0IHsgQ2FtZXJhTW92ZVNjcmlwdCB9IGZyb20gXCIuL2NvbW1vbi9DYW1lcmFNb3ZlU2NyaXB0XCI7XHJcbmltcG9ydCB7IENvbGxpZGVyU2NyaXB0IH0gZnJvbSBcIi4vY29tbW9uL0NvbGxpZGVyU2NyaXB0XCI7XHJcbmltcG9ydCB7IERyYXdCb3hDb2xsaWRlclNjcmlwdCB9IGZyb20gXCIuL2NvbW1vbi9EcmF3Qm94Q29sbGlkZXJTY3JpcHRcIjtcclxuaW1wb3J0IHsgTGF5YUluamVjdCB9IGZyb20gXCIuL3V0aWxzL0xheWFJbmplY3RcIjtcclxuaW1wb3J0IHsgUm9sZU1vdmVTY3JpcHQgfSBmcm9tIFwiLi9jb21tb24vUm9sZU1vdmVTY3JpcHRcIjtcclxuXHJcblxyXG5MYXlhSW5qZWN0KCk7XHJcblxyXG4vLyAvLyDnqIvluo/lhaXlj6NcclxuLy8gY2xhc3MgTGF5YUFpcjNEIHtcclxuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xyXG4vLyAgICAgICAgIC8v5Yid5aeL5YyW5byV5pOOXHJcbi8vICAgICAgICAgTGF5YTNELmluaXQoMCwgMCwgdHJ1ZSk7XHJcbi8vICAgICAgICAgLy/pgILphY3mqKHlvI9cclxuLy8gICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuLy8gICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9OT05FO1xyXG4vLyAgICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcbi8vICAgICAgICAgTGF5YS5TdGF0LnNob3coKTtcclxuLy8gICAgICAgICAvL+a3u+WKoDNE5Zy65pmvXHJcbi8vICAgICAgICAgdmFyIHNjZW5lOiBMYXlhLlNjZW5lID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TY2VuZSgpKSBhcyBMYXlhLlNjZW5lO1xyXG4vLyAgICAgICAgIC8v5re75Yqg54Wn55u45py6XHJcbi8vICAgICAgICAgdmFyIGNhbWVyYTogTGF5YS5DYW1lcmEgPSAoc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMTAwKSkpIGFzIExheWEuQ2FtZXJhO1xyXG4vLyAgICAgICAgIGNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMywgMykpO1xyXG4vLyAgICAgICAgIGNhbWVyYS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTMwLCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG4vLyAgICAgICAgIGNhbWVyYS5jbGVhckNvbG9yID0gbnVsbDtcclxuLy8gICAgICAgICAvL+a3u+WKoOaWueWQkeWFiVxyXG4vLyAgICAgICAgIHZhciBkaXJlY3Rpb25MaWdodDogTGF5YS5EaXJlY3Rpb25MaWdodCA9IHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCkpIGFzIExheWEuRGlyZWN0aW9uTGlnaHQ7XHJcbi8vICAgICAgICAgZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDAuNiwgMC42LCAwLjYpO1xyXG4vLyAgICAgICAgIGRpcmVjdGlvbkxpZ2h0LmRpcmVjdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgLTEsIDApO1xyXG4vLyAgICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbi8vICAgICAgICAgdmFyIGJveDogTGF5YS5NZXNoU3ByaXRlM0QgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QobmV3IExheWEuQm94TWVzaCgxLCAxLCAxKSkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4vLyAgICAgICAgIGJveC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4vLyAgICAgICAgIHZhciBtYXRlcmlhbDogTGF5YS5TdGFuZGFyZE1hdGVyaWFsID0gbmV3IExheWEuU3RhbmRhcmRNYXRlcmlhbCgpO1xyXG4vLyAgICAgICAgIG1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gTGF5YS5UZXh0dXJlMkQubG9hZChcInJlcy9sYXlhYm94LnBuZ1wiKTtcclxuLy8gICAgICAgICBib3gubWVzaFJlbmRlci5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIG5ldyBMYXlhQWlyM0QoKTtcclxuXHJcbmNsYXNzIExheWEzRExvYWR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgICAvL+WIneWni+WMluW8leaTjlxyXG4gICAgICAgIExheWEzRC5pbml0KDAsIDAsIHRydWUpO1xyXG4gICAgICAgIC8v6YCC6YWN5qih5byPXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fTk9ORTtcclxuICAgICAgICBMYXlhLlN0YXQuc2hvdygpO1xyXG4gICAgICAgIHZhciBzdGFnZSA9IExheWEuc3RhZ2U7XHJcbiAgICAgICAgdmFyIHNjZW5lOkxheWEuU2NlbmUgPSBMYXlhLlNjZW5lLmxvYWQoJzNEX0Fzc2V0cy9MYXlhU2NlbmVfTGF5YVNjZW5lL0xheWFTY2VuZS5scycpO1xyXG4gICAgICAgIHN0YWdlLmFkZENoaWxkKHNjZW5lKTsgICBcclxuICAgIH1cclxufVxyXG5uZXcgTGF5YTNETG9hZCgpO1xyXG5cclxuY2xhc3MgTGF5YTNEUHJlTG9hZEZpc2gge1xyXG4gICAgXHJcbiAgICByZXNvdXJjZXM6c3RyaW5nW10gPSBbIFxyXG4gICAgICAgICd0aHJlZURpbWVuL3NjZW5lL1RlcnJhaW5TY2VuZS9YdW5Mb25nU2hpLmxzJyxcclxuICAgICAgICBcInRocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvTGF5YU1vbmtleS5saFwiLFxyXG5cdFx0XCJ0aHJlZURpbWVuL3NjZW5lL1RlcnJhaW5TY2VuZS9Bc3NldHMvSGVpZ2h0TWFwLnBuZ1wiLCBcclxuXHRcdFwidGhyZWVEaW1lbi9zY2VuZS9UZXJyYWluU2NlbmUvQXNzZXRzL0FTdGFyTWFwLnBuZ1wiLFxyXG4gICAgXTtcclxuXHJcbiAgICBwcml2YXRlIHNjZW5lOkxheWEuU2NlbmU7XHJcbiAgICBwcml2YXRlIGNhbWVyYTpMYXlhLkNhbWVyYTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsIDApO1xyXG4gICAgICAgIC8v6YCC6YWN5qih5byPXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fTk9ORTtcclxuICAgICAgICAvL+W8gOWQr+e7n+iuoeS/oeaBr1xyXG4gICAgICAgIExheWEuU3RhdC5zaG93KCk7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKHRoaXMucmVzb3VyY2VzLmNvbmNhdCgpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uUHJlbG9hZEZpbmlzaCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblByZWxvYWRGaW5pc2goKTp2b2lkIHtcclxuICAgICAgICB2YXIgc3RhZ2UgPSBMYXlhLnN0YWdlO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBMYXlhLkxvYWRlci5nZXRSZXModGhpcy5yZXNvdXJjZXNbMF0pO1xyXG4gICAgICAgIGlmKHRoaXMuc2NlbmUpIHsgIHN0YWdlLmFkZENoaWxkKHRoaXMuc2NlbmUpOyAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IEQuZmluZENoaWxkRnJvbVBhdGgodGhpcy5zY2VuZSwnU2NlbmVzLk1haW4gQ2FtZXJhJykgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgaWYodGhpcy5jYW1lcmEpIHsgXHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgICAgICB2YXIgc2t5Qm94ID0gbmV3IExheWEuU2t5Qm94KCk7XHJcbiAgICAgICAgICAgIHNreUJveC50ZXh0dXJlQ3ViZSA9IExheWEuVGV4dHVyZUN1YmUubG9hZChcInRocmVlRGltZW4vc2t5Qm94L3NreUJveDIvc2t5Q3ViZS5sdGNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnNreSA9IHNreUJveDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jYW1lcmEuYWRkQ29tcG9uZW50KENhbWVyYU1vdmVTY3JpcHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkTW9ua2V5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNb25rZXkoKTp2b2lkIHtcclxuICAgICAgICB2YXIgbW9ua2V5U3ByaXRlM2Q6TGF5YS5Ta2lubmVkTWVzaFNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKCd0aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0xheWFNb25rZXkubGgnKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZENoaWxkKG1vbmtleVNwcml0ZTNkKTtcclxuICAgICAgICBtb25rZXlTcHJpdGUzZC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDcsIDcsIC0xMyk7XHJcbiAgICAgICAgbW9ua2V5U3ByaXRlM2QudHJhbnNmb3JtLnNjYWxlID0gbmV3IExheWEuVmVjdG9yMygzLCAzLCAzKTtcclxuXHJcbiAgICAgICAgbW9ua2V5U3ByaXRlM2QuYWRkQ29tcG9uZW50KFJvbGVNb3ZlU2NyaXB0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyg3LDksLTE3KTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9va0F0KG1vbmtleVNwcml0ZTNkLnRyYW5zZm9ybS5wb3NpdGlvbixuZXcgTGF5YS5WZWN0b3IzKDAsMSwwKSxmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vdmFyIGZvcndhcmQ6TGF5YS5WZWN0b3IzID0gdGhpcy5jYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgLy9tb25rZXlTcHJpdGUzZC50cmFuc2Zvcm0ucG9zaXRpb24gPSBmb3J3YXJkO1xyXG4gICAgfVxyXG59XHJcbm5ldyBMYXlhM0RQcmVMb2FkRmlzaCgpO1xyXG5cclxuXHJcbi8vIGNsYXNzIENvbGlkZXJEZW1vIHtcclxuLy8gICAgIC8qKumUruebmOeahOS4iuS4i+W3puWPs+aOp+WItueMtOWtkOS9jeenuyoqL1xyXG4vLyBcdFx0cHJpdmF0ZSBzY2VuZTpMYXlhLlNjZW5lO1xyXG4vLyAgICAgICAgIHByaXZhdGUgY2FtZXJhOkxheWEuQ2FtZXJhO1xyXG4vLyBcdFx0cHJpdmF0ZSBsYXlhTW9ua2V5OkxheWEuU3ByaXRlM0Q7XHJcbi8vIFx0XHRwcml2YXRlIGxheWFNb25rZXlNZXNoU3ByaXRlM0Q6TGF5YS5Ta2lubmVkTWVzaFNwcml0ZTNEO1xyXG4vLyBcdFx0cHJpdmF0ZSBfdGVtcFVuaXRYMTpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIC0wLjEpO1xyXG4vLyBcdFx0cHJpdmF0ZSBfdGVtcFVuaXRYMjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDAuMSk7XHJcbi8vIFx0XHRwcml2YXRlIF90ZW1wVW5pdFgzOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoLTAuMSwgMCwgMCk7XHJcbi8vIFx0XHRwcml2YXRlIF90ZW1wVW5pdFg0OkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMC4xLCAwLCAwKTtcclxuLy8gXHRcdHByaXZhdGUgY29sbGlkZXI6TGF5YS5TcHJpdGUzRDtcclxuLy8gXHRcdHByaXZhdGUgZGVidWc6Qm9vbGVhbiA9IHRydWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcigpIHtcclxuLy8gICAgICAgICBMYXlhM0QuaW5pdCgwLCAwLCB0cnVlKTtcclxuLy8gICAgICAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbi8vICAgICAgICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX05PTkU7XHJcbi8vICAgICAgICAgICAgIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRcdFxyXG4vLyBcdFx0XHQvL+mihOWKoOi9veaJgOaciei1hOa6kFxyXG4vLyBcdFx0XHR2YXIgcmVzb3VyY2U6YW55ID0gW1xyXG4vLyBcdFx0XHRcdHt1cmw6IFwidGhyZWVEaW1lbi9zY2VuZS9Db2xsaWRlclNjZW5lL0NvbGxpZGVyRGVtby5sc1wiLCBjbGFzOiBMYXlhLlNjZW5lLCBwcmlvcml0eTogMX0sIFxyXG4vLyBcdFx0XHRcdHt1cmw6IFwidGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCIsIGNsYXM6IExheWEuU3ByaXRlM0QsIHByaW9yaXR5OiAxfVxyXG4vLyBcdFx0XHRdO1xyXG5cdFx0XHRcclxuLy8gXHRcdFx0TGF5YS5sb2FkZXIuY3JlYXRlKHJlc291cmNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkRmluaXNoKSk7XHJcbi8vICAgICB9XHJcbi8vICAgICBwdWJsaWMgb25Mb2FkRmluaXNoKCkgOiB2b2lkIHtcclxuLy8gXHRcdFx0dGhpcy5zY2VuZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQoTGF5YS5TY2VuZS5sb2FkKFwidGhyZWVEaW1lbi9zY2VuZS9Db2xsaWRlclNjZW5lL0NvbGxpZGVyRGVtby5sc1wiKSkgYXMgTGF5YS5TY2VuZTtcclxuLy8gICAgICAgICAgICAgLy/liJ3lp4vljJbnhafnm7jmnLpcclxuLy8gICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSB0aGlzLnNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLkNhbWVyYSgwLCAwLjEsIDEwMCkpIGFzIExheWEuQ2FtZXJhO1xyXG4vLyAgICAgICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNiwgMTMpKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0xNSwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5jYW1lcmEuYWRkQ29tcG9uZW50KENhbWVyYU1vdmVTY3JpcHQpO1xyXG5cdFx0XHRcclxuLy8gXHRcdFx0Ly/liqDovb3njLTlrZBcclxuLy8gXHRcdFx0dGhpcy5sYXlhTW9ua2V5ID0gdGhpcy5zY2VuZS5hZGRDaGlsZChMYXlhLlNwcml0ZTNELmxvYWQoXCJ0aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0xheWFNb25rZXkubGhcIikpIGFzIExheWEuU3ByaXRlM0Q7XHJcbi8vIFx0XHRcdHRoaXMubGF5YU1vbmtleS50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDEpO1xyXG4vLyBcdFx0XHR0aGlzLmxheWFNb25rZXkudHJhbnNmb3JtLnNjYWxlID0gbmV3IExheWEuVmVjdG9yMyg4LCA4LCA4KTtcclxuXHRcdFx0XHJcbi8vIFx0XHRcdHRoaXMubGF5YU1vbmtleU1lc2hTcHJpdGUzRCA9IHRoaXMubGF5YU1vbmtleS5nZXRDaGlsZEF0KDApLmdldENoaWxkQnlOYW1lKFwiTGF5YU1vbmtleVwiKSBhcyBMYXlhLlNraW5uZWRNZXNoU3ByaXRlM0Q7XHJcbi8vIFx0XHRcdC8v5re75Yqg55uS5Z6L56Kw5pKe5ZmoXHJcbi8vIFx0XHRcdHZhciBib3hDb2xsaWRlcjpMYXlhLkJveENvbGxpZGVyID0gdGhpcy5sYXlhTW9ua2V5TWVzaFNwcml0ZTNELmFkZENvbXBvbmVudChMYXlhLkJveENvbGxpZGVyKSBhcyBMYXlhLkJveENvbGxpZGVyO1xyXG4vLyBcdFx0XHRib3hDb2xsaWRlci5zZXRGcm9tQm91bmRCb3godGhpcy5sYXlhTW9ua2V5TWVzaFNwcml0ZTNELm1lc2hGaWx0ZXIuc2hhcmVkTWVzaC5ib3VuZGluZ0JveCk7XHJcbi8vIFx0XHRcdCg8YW55PnRoaXMubGF5YU1vbmtleU1lc2hTcHJpdGUzRCkuY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcbi8vIFx0XHRcdC8v5re75Yqg56Kw5pKe5LqL5Lu26ISa5pysXHJcbi8vIFx0XHRcdHRoaXMubGF5YU1vbmtleU1lc2hTcHJpdGUzRC5hZGRDb21wb25lbnQoQ29sbGlkZXJTY3JpcHQpO1xyXG4vLyBcdFx0XHQvL+a3u+WKoOWImuS9k+e7hOS7tlxyXG4vLyBcdFx0XHR0aGlzLmxheWFNb25rZXlNZXNoU3ByaXRlM0QuYWRkQ29tcG9uZW50KExheWEuUmlnaWRib2R5KTtcclxuLy8gXHRcdFx0Ly/mt7vliqDplK7nm5jkuovku7ZcclxuLy8gXHRcdFx0TGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LktFWV9ET1dOLCB0aGlzLCB0aGlzLm9uS2V5RG93bik7XHJcblx0XHRcdFxyXG4vLyBcdFx0XHR0aGlzLmNvbGxpZGVyID0gdGhpcy5zY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkNvbGxpZGVyXCIpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4vLyBcdFx0XHR0aGlzLmNvbGxpZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcclxuLy8gXHRcdFx0Ly/mmK/lkKblvIDlkK9kZWJ1Z+aooeW8j1xyXG4vLyBcdFx0XHRMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMuZHJhd0NvbGxpZGVyKTtcclxuLy8gXHRcdH1cclxuXHRcdFxyXG4vLyBcdFx0cHJpdmF0ZSBvbktleURvd24oZTpMYXlhLkV2ZW50ID0gbnVsbCk6dm9pZFxyXG4vLyBcdFx0e1xyXG4vLyBcdFx0XHRpZiAoZS5rZXlDb2RlID09IExheWEuS2V5Ym9hcmQuVVApXHJcbi8vIFx0XHRcdFx0dGhpcy5sYXlhTW9ua2V5LnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFVuaXRYMSk7XHJcbi8vIFx0XHRcdGVsc2UgaWYgKGUua2V5Q29kZSA9PSBMYXlhLktleWJvYXJkLkRPV04pXHJcbi8vIFx0XHRcdFx0dGhpcy5sYXlhTW9ua2V5LnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFVuaXRYMik7XHJcbi8vIFx0XHRcdGVsc2UgaWYgKGUua2V5Q29kZSA9PSBMYXlhLktleWJvYXJkLkxFRlQpXHJcbi8vIFx0XHRcdFx0dGhpcy5sYXlhTW9ua2V5LnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFVuaXRYMyk7XHJcbi8vIFx0XHRcdGVsc2UgaWYgKGUua2V5Q29kZSA9PSBMYXlhLktleWJvYXJkLlJJR0hUKVxyXG4vLyBcdFx0XHRcdHRoaXMubGF5YU1vbmtleS50cmFuc2Zvcm0udHJhbnNsYXRlKHRoaXMuX3RlbXBVbml0WDQpO1xyXG4vLyBcdFx0fVxyXG5cdFx0XHJcbi8vIFx0XHRwcml2YXRlIGRyYXdDb2xsaWRlcigpOnZvaWR7XHJcblx0XHRcdFxyXG4vLyBcdFx0XHRpZiAoIXRoaXMuZGVidWcpe1xyXG4vLyBcdFx0XHRcdHRoaXMuY29sbGlkZXIuYWN0aXZlID0gZmFsc2U7XHJcbi8vIFx0XHRcdFx0dGhpcy5sYXlhTW9ua2V5TWVzaFNwcml0ZTNELnJlbW92ZUNvbXBvbmVudEJ5VHlwZShEcmF3Qm94Q29sbGlkZXJTY3JpcHQpO1xyXG4vLyBcdFx0XHRcdHRoaXMuZGVidWcgPSB0cnVlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHRcdGVsc2V7XHJcbi8vIFx0XHRcdFx0dGhpcy5jb2xsaWRlci5hY3RpdmUgPSB0cnVlO1xyXG4vLyBcdFx0XHRcdHRoaXMubGF5YU1vbmtleU1lc2hTcHJpdGUzRC5hZGRDb21wb25lbnQoRHJhd0JveENvbGxpZGVyU2NyaXB0KTtcclxuLy8gXHRcdFx0XHR0aGlzLmRlYnVnID0gZmFsc2U7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH1cclxuLy8gICAgIH1cclxuLy8gbmV3IENvbGlkZXJEZW1vKCk7IiwiaW1wb3J0IHsgRCB9IGZyb20gXCIuLi91dGlscy9EXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vLi4vbGlicy9tYXR0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFJvbGVNb3ZlU2NyaXB0IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xuXG4gICAgLyoq6KeS6ImyICovXG4gICAgcHJpdmF0ZSByb2xlOkxheWEuU2tpbm5lZE1lc2hTcHJpdGUzRDtcbiAgICAvKirlnLrmma8gKi9cbiAgICBwcml2YXRlIHNjZW5lOkxheWEuU2NlbmU7XG4gICAgLyoq5pGE5YOP5aS0ICovXG4gICAgcHJpdmF0ZSBjYW1lcmE6TGF5YS5DYW1lcmE7XG5cbiAgICBwcml2YXRlIGxvb2tEaXN0Om51bWJlciA9IDU7XG5cbiAgICBwcml2YXRlIGNhbWVyYVVwUG9zOkxheWEuVmVjdG9yMztcblxuICAgIHByaXZhdGUgaXNNb3VzZURvd246Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIHlhd1BpdGNoUm9sbCA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcblxuICAgIHByb3RlY3RlZCByb3RhaW9uU3BlZWQ6IG51bWJlciA9IDAuMDAwMDA3O1xuXG4gICAgcHJvdGVjdGVkIGxhc3RNb3VzZVg6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgbGFzdE1vdXNlWTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSByb2xlQW5pOkxheWEuQW5pbWF0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtzdXBlcigpfVxuXG4gICAgX2luaXRpYWxpemUob253ZXI6TGF5YS5TcHJpdGUzRCk6dm9pZCB7XG4gICAgICAgIHN1cGVyLl9pbml0aWFsaXplKG9ud2VyKTtcbiAgICAgICAgdGhpcy5yb2xlID0gb253ZXIgYXMgTGF5YS5Ta2lubmVkTWVzaFNwcml0ZTNEO1xuICAgICAgICB0aGlzLnNjZW5lID0gdGhpcy5yb2xlLnNjZW5lO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IEQuZmluZENoaWxkRnJvbVBhdGgodGhpcy5zY2VuZSwnU2NlbmVzLk1haW4gQ2FtZXJhJykgYXMgTGF5YS5DYW1lcmE7XG4gICAgICAgIHRoaXMuY2FtZXJhVXBQb3MgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMSwwKTtcbiAgICAgICAgdGhpcy5mb2xsb3dlckNhbWVyYSh0cnVlKTtcblxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5tb3VzZURvd24pO1xuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9PVVQsIHRoaXMsIHRoaXMubW91c2VPdXQpO1xuXG4gICAgICAgIHRoaXMucm9sZUFuaSA9IHRoaXMucm9sZS5nZXRDb21wb25lbnRCeVR5cGUoTGF5YS5BbmltYXRvcikgYXMgTGF5YS5BbmltYXRvcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbW91c2VEb3duKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XG4gICAgICAgIHRoaXMubGFzdE1vdXNlWSA9IExheWEuc3RhZ2UubW91c2VZO1xuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbW91c2VVcChlOiBMYXlhLkV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbW91c2VPdXQoZTogTGF5YS5FdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgX3VwZGF0ZShzdGF0ZTpMYXlhLlJlbmRlclN0YXRlKTp2b2lkIHtcbiAgICAgICAgc3VwZXIuX3VwZGF0ZShzdGF0ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlUm9sZShzdGF0ZS5lbGFwc2VkVGltZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVJvbGUoZWxhcHNlZFRpbWU6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgaWYoTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big4NykpIHsgICAgICAgLy93XG4gICAgICAgICAgICB2YXIgbXY6bnVtYmVyID0gMC4wMDIgKiBlbGFwc2VkVGltZTtcbiAgICAgICAgICAgIHRoaXMucm9sZU1vdmUobXYsZWxhcHNlZFRpbWUpO1xuICAgICAgICB9IFxuICAgICAgICBpZihMYXlhLktleUJvYXJkTWFuYWdlci5oYXNLZXlEb3duKDgzKSkgeyAgICAgICAvL3NcbiAgICAgICAgICAgIHZhciBtdjpudW1iZXIgPSAwLjAwMiAqIGVsYXBzZWRUaW1lO1xuICAgICAgICAgICAgdGhpcy5yb2xlTW92ZSgtbXYsZWxhcHNlZFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjUpKSB7ICAgICAgIC8vYVxuICAgICAgICAgICAgdmFyIG12Om51bWJlciA9IDAuMDAyICogZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uUm9sZShtdik7IFxuICAgICAgICB9XG4gICAgICAgIGlmKExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjgpKSB7ICAgICAgIC8vZFxuICAgICAgICAgICAgdmFyIG12Om51bWJlciA9IDAuMDAyICogZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uUm9sZSgtbXYpOyBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMuZm9sbG93ZXJDYW1lcmEoZmFsc2UpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTW91c2VEb3duKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5sYXN0TW91c2VYO1xuICAgICAgICAgICAgdmFyIG9mZnNldFkgPSBMYXlhLnN0YWdlLm1vdXNlWSAtIHRoaXMubGFzdE1vdXNlWTsgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgeXByRWxlbTogRmxvYXQzMkFycmF5ID0gdGhpcy55YXdQaXRjaFJvbGwuZWxlbWVudHM7XG4gICAgICAgICAgICB5cHJFbGVtWzBdICs9IG9mZnNldFggKiB0aGlzLnJvdGFpb25TcGVlZCAqIGVsYXBzZWRUaW1lO1xuICAgICAgICAgICAgeXByRWxlbVsxXSAtPSBvZmZzZXRZICogdGhpcy5yb3RhaW9uU3BlZWQgKiBlbGFwc2VkVGltZTtcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25DYW1lcmEoKTtcbiAgICAgICAgfVxuICAgIH0gICAgXG5cbiAgICBwcm90ZWN0ZWQgcm90YXRpb25Sb2xlKHJvdGF0aW9uOm51bWJlcik6dm9pZCB7XG4gICAgICAgIHRoaXMucm9sZS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCxyb3RhdGlvbiwwKSxmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByb2xlTW92ZShtdjpudW1iZXIsZWxhcHNlZFRpbWUpOnZvaWQge1xuICAgICAgICAvLyB2YXIgZGlzdDpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XG4gICAgICAgIC8vIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucG9zaXRpb24sdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbixkaXN0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucm9sZS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwwLG12KSx0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHZhciBjYW1lcmFQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xuICAgICAgICAvLyBMYXlhLlZlY3RvcjMuYWRkKGRpc3QsdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbixjYW1lcmFQb3MpO1xuICAgICAgICAvLyB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucG9zaXRpb24gPSBjYW1lcmFQb3M7XG4gICAgICAgIC8vIHZhciByb2xlUG9zID0gdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbjtcbiAgICAgICAgLy8gdGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvb2tBdChyb2xlUG9zLHRoaXMuY2FtZXJhVXBQb3MpO1xuXG4gICAgICAgIHZhciBwb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xuICAgICAgICBMYXlhLlZlY3RvcjMubGVycCh0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucG9zaXRpb24sdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbixlbGFwc2VkVGltZSAqIDEscG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYmVnaW5BbmdpbmU6bnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGZvbGxvd2VyQ2FtZXJhKGlzTG9va0F0OmJvb2xlYW4gPSBmYWxzZSk6dm9pZCB7XG4gICAgICAgIHZhciByb2xlUG9zID0gdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbjtcbiAgICAgICAgaWYoaXNMb29rQXQpIHtcbiAgICAgICAgICAgIHZhciBwb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMyhyb2xlUG9zLngscm9sZVBvcy55ICsgdGhpcy5sb29rRGlzdCxyb2xlUG9zLnotdGhpcy5sb29rRGlzdCk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucG9zaXRpb24gPSBwb3M7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9va0F0KHJvbGVQb3MsdGhpcy5jYW1lcmFVcFBvcyk7XG5cbiAgICAgICAgICAgIHZhciBkaXN0VmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygpO1xuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5wb3NpdGlvbix0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uLGRpc3RWZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5iZWdpbkFuZ2luZSA9IE1hdGguYXRhbjIoZGlzdFZlY3Rvci56LGRpc3RWZWN0b3IueCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3RhdGlvbkNhbWVyYSgpOiB2b2lkIHtcblxuICAgICAgICB2YXIgeXByRWxlbTogRmxvYXQzMkFycmF5ID0gdGhpcy55YXdQaXRjaFJvbGwuZWxlbWVudHM7XG4gICAgICAgIHZhciByb3VuZGVyID0gdGhpcy5jYW1lcmEudHJhbnNmb3JtO1xuICAgICAgICB2YXIgY2VudGVyID0gdGhpcy5yb2xlLnRyYW5zZm9ybTtcblxuICAgICAgICB2YXIgYW5nbGU6bnVtYmVyID0geXByRWxlbVswXTtcbiAgICAgICAgdmFyIHgxOm51bWJlciA9IGNlbnRlci5wb3NpdGlvbi54ICsgTWF0aC5jb3ModGhpcy5iZWdpbkFuZ2luZSthbmdsZSkgKiB0aGlzLmxvb2tEaXN0XG4gICAgICAgIHZhciB5MTpudW1iZXIgPSByb3VuZGVyLnBvc2l0aW9uLnk7XG4gICAgICAgIHZhciB6MTpudW1iZXIgPSBjZW50ZXIucG9zaXRpb24ueiArIE1hdGguc2luKHRoaXMuYmVnaW5BbmdpbmUrYW5nbGUpICogdGhpcy5sb29rRGlzdDtcbiAgICAgICAgdmFyIGFkZDpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKHgxLHkxLHoxKTtcbiAgICAgICAgcm91bmRlci5wb3NpdGlvbiA9IGFkZDtcbiAgICAgICAgdmFyIHJvbGVQb3MgPSB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uO1xuICAgICAgICByb3VuZGVyLmxvb2tBdChyb2xlUG9zLHRoaXMuY2FtZXJhVXBQb3MpO1xuXG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIEQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICog5qC55o2u6Lev5b6E5p+l5om+5a2Q6ZuG5a+56LGhXG4gICAgICogQHBhcmFtIHRhcmdldE9iaiBcbiAgICAgKiBAcGFyYW0gcGF0aCBcbiAgICAgKi9cbiAgICBzdGF0aWMgZmluZENoaWxkRnJvbVBhdGgodGFyZ2V0T2JqOkxheWEuTm9kZSxwYXRoOnN0cmluZyk6TGF5YS5Ob2RlIHtcbiAgICAgICAgdmFyIHBhdGhzOnN0cmluZ1tdID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgICAgIHZhciBmaW5kT2JqOkxheWEuTm9kZSA9IHRhcmdldE9iajtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaW5kT2JqID0gZmluZE9iai5nZXRDaGlsZEJ5TmFtZShwYXRoc1tpXSk7XG4gICAgICAgICAgICBpZighZmluZE9iaikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5kT2JqO1xuICAgIH1cbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBMYXlhSW5qZWN0KCkge1xuICAgIExheWEuVmVjdG9yMy5wcm90b3R5cGVbJ3ZhbHVlVG9TdHJpbmcnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYHg6JHt0aGlzLnh9LHk6JHt0aGlzLnl9LHo6JHt0aGlzLnp9YDtcbiAgICB9XG59Il19
