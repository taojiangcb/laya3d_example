import { D } from "../utils/D";
import { Vector } from "../../libs/matter";

export class RoleMoveScript extends Laya.Script {

    /**角色 */
    private role:Laya.SkinnedMeshSprite3D;
    /**场景 */
    private scene:Laya.Scene;
    /**摄像头 */
    private camera:Laya.Camera;

    private lookDist:number = 5;

    private cameraUpPos:Laya.Vector3;

    private isMouseDown:boolean = false;

    protected yawPitchRoll = new Laya.Vector3();

    protected rotaionSpeed: number = 0.000007;

    protected lastMouseX: number;
    protected lastMouseY: number;

    private roleAni:Laya.Animator;

    constructor() {super()}

    _initialize(onwer:Laya.Sprite3D):void {
        super._initialize(onwer);
        this.role = onwer as Laya.SkinnedMeshSprite3D;
        this.scene = this.role.scene;
        this.camera = D.findChildFromPath(this.scene,'Scenes.Main Camera') as Laya.Camera;
        this.cameraUpPos = new Laya.Vector3(0,1,0);
        this.followerCamera(true);

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);

        this.roleAni = this.role.getComponentByType(Laya.Animator) as Laya.Animator;
    }

    protected mouseDown(e: Laya.Event): void {
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }

    protected mouseUp(e: Laya.Event): void {
        this.isMouseDown = false;
    }

    protected mouseOut(e: Laya.Event): void {
        this.isMouseDown = false;
    }

    _update(state:Laya.RenderState):void {
        super._update(state);
        this.updateRole(state.elapsedTime);
    }

    protected updateRole(elapsedTime:number):void {
        if(Laya.KeyBoardManager.hasKeyDown(87)) {       //w
            var mv:number = 0.002 * elapsedTime;
            this.roleMove(mv,elapsedTime);
        } 
        if(Laya.KeyBoardManager.hasKeyDown(83)) {       //s
            var mv:number = 0.002 * elapsedTime;
            this.roleMove(-mv,elapsedTime);
        }
        if(Laya.KeyBoardManager.hasKeyDown(65)) {       //a
            var mv:number = 0.002 * elapsedTime;
            this.rotationRole(mv); 
        }
        if(Laya.KeyBoardManager.hasKeyDown(68)) {       //d
            var mv:number = 0.002 * elapsedTime;
            this.rotationRole(-mv); 
        }

        // this.followerCamera(false);

        if (this.isMouseDown) {
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;  
            
            var yprElem: Float32Array = this.yawPitchRoll.elements;
            yprElem[0] += offsetX * this.rotaionSpeed * elapsedTime;
            yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
            this.rotationCamera();
        }
    }    

    protected rotationRole(rotation:number):void {
        this.role.transform.rotate(new Laya.Vector3(0,rotation,0),false);
    }

    private roleMove(mv:number,elapsedTime):void {
        // var dist:Laya.Vector3 = new Laya.Vector3();
        // Laya.Vector3.subtract(this.camera.transform.position,this.role.transform.position,dist);
        
        this.role.transform.translate(new Laya.Vector3(0,0,mv),true);
        
        // var cameraPos:Laya.Vector3 = new Laya.Vector3();
        // Laya.Vector3.add(dist,this.role.transform.position,cameraPos);
        // this.camera.transform.position = cameraPos;
        // var rolePos = this.role.transform.position;
        // this.camera.transform.lookAt(rolePos,this.cameraUpPos);

        var pos:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.lerp(this.camera.transform.position,this.role.transform.position,elapsedTime * 1,pos);
        this.camera.transform.position = pos;
    }

    private beginAngine:number = 0;
    private followerCamera(isLookAt:boolean = false):void {
        var rolePos = this.role.transform.position;
        if(isLookAt) {
            var pos:Laya.Vector3 = new Laya.Vector3(rolePos.x,rolePos.y + this.lookDist,rolePos.z-this.lookDist);
            this.camera.transform.position = pos;
            this.camera.transform.lookAt(rolePos,this.cameraUpPos);

            var distVector = new Laya.Vector3();
            Laya.Vector3.subtract(this.camera.transform.position,this.role.transform.position,distVector);
            this.beginAngine = Math.atan2(distVector.z,distVector.x);

        }
    }

    protected rotationCamera(): void {

        var yprElem: Float32Array = this.yawPitchRoll.elements;
        var rounder = this.camera.transform;
        var center = this.role.transform;

        var angle:number = yprElem[0];
        var x1:number = center.position.x + Math.cos(this.beginAngine+angle) * this.lookDist
        var y1:number = rounder.position.y;
        var z1:number = center.position.z + Math.sin(this.beginAngine+angle) * this.lookDist;
        var add:Laya.Vector3 = new Laya.Vector3(x1,y1,z1);
        rounder.position = add;
        var rolePos = this.role.transform.position;
        rounder.lookAt(rolePos,this.cameraUpPos);

    }

}