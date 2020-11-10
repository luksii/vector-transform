import { Vector2f } from "./Vector2f.js";
import { Vector3f } from "./Vector3f.js";
import { Vector4f } from "./Vector4f.js";

const NATIVE_TYPE = {
    VEC2: 0,
    VEC3: 1,
    VEC4: 2
};

export class PointManager {
    constructor(stdin) {
        this.stdin = stdin;
    }
    ReadInput() {
        const inputElementText = this.stdin.value;
        let inputElements = [];
        for (const row of inputElementText.split('\n')) {
            if (!(row === "") && !(row === undefined)) {
                inputElements.push(this.CreateElement(row));
            }
            else {
                console.warn(`PointManager::ReadInput::EmptyInput`);
            }
        }
        return this.CreateNativeEntities(inputElements);
    }
    CreateElement(row) {
        const rowElements = row.trim().split(' ');
        let rowElementsN = [];
        for (const rowElement of rowElements) {
            let element = Number.parseFloat(rowElement);
            if (typeof element !== undefined && typeof element !== 'string' && !isNaN(element)) {
                if (typeof element === 'number') {
                    rowElementsN.push(element);
                }
            }
        }
        if (rowElementsN.length < 3 || rowElementsN.length > 4) {
            throw new Error(`PointManager::CreateElement::ElementParseException\nExpected between 3 and 4 components per row, got: ${rowElementsN.length}.`);
        }
        let element = {
            type: 0,
            components: []
        };
        if (rowElementsN.length === 2) {
            // element.type = NATIVE_TYPE.VEC2;
            // element.components = [rowElementsN[0], rowElementsN[1]];
        }
        else if (rowElementsN.length === 3) {
            element.type = NATIVE_TYPE.VEC3;
            element.components = [rowElementsN[0], rowElementsN[1], rowElementsN[2]];
        }
        else if (rowElementsN.length === 4) {
            element.type = NATIVE_TYPE.VEC4;
            element.components = [rowElementsN[0], rowElementsN[1], rowElementsN[2], rowElementsN[3]];
        }
        return element;
    }
    CreateNativeEntities(inputElements) {
        let vectors = [];
        for (const inputElement of inputElements) {
            if (inputElement.type === NATIVE_TYPE.VEC2) {
                vectors.push(new Vector2f(inputElement.components[0], inputElement.components[1]));
            }
            else if (inputElement.type === NATIVE_TYPE.VEC3) {
                vectors.push(new Vector4f(inputElement.components[0], inputElement.components[1], inputElement.components[2], 1));
            }
            else if (inputElement.type === NATIVE_TYPE.VEC4) {
                vectors.push(new Vector4f(inputElement.components[0], inputElement.components[1], inputElement.components[2], 1));
            }
        }
        console.log(`%c PointManager::CreateNativeEntities::CreatedVectors\nCreated ${vectors.length} vectors.\n`, 'background: #34ebb1;');
        for (const vector of vectors) {
            console.log(`VEC${vector._N_COMPONENTS} | `, JSON.parse(JSON.stringify(vector)));
        }
        return vectors;
    }
}
