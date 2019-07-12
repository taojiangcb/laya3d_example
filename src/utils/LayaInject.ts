
export function LayaInject() {
    Laya.Vector3.prototype['valueToString'] = function() {
        return `x:${this.x},y:${this.y},z:${this.z}`;
    }
}