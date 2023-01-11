
import { LightningElement } from 'lwc';

const CLASS_1 = 'class1';
const CLASS_2 = 'class2';

export default class TestLWC extends LightningElement {

    static renderMode = 'light';
    
    _class = CLASS_1;

    get myClass() {
        return this._class;
    }

    changeClass(event) {
        console.log()
        if(this._class == CLASS_1) {
            this._class = CLASS_2;
        } else {
            this._class = CLASS_1;
        }
    }
}
