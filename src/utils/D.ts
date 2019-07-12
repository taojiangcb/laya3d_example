export class D {

    constructor() {}

    /**
     * 根据路径查找子集对象
     * @param targetObj 
     * @param path 
     */
    static findChildFromPath(targetObj:Laya.Node,path:string):Laya.Node {
        var paths:string[] = path.split(".");
        var findObj:Laya.Node = targetObj;
        for(var i = 0; i < paths.length; i++) {
            findObj = findObj.getChildByName(paths[i]);
            if(!findObj) {
                break;
            }
        }
        return findObj;
    }
}