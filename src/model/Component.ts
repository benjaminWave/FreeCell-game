import { Vector2 } from "./Vector2";


export abstract class Component {

    public abstract setPosition(newPosition:Vector2):void;
    public abstract getPosition():Vector2;
    public getHead():Component {
        return this;
    }
}
