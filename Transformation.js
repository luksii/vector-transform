import { Matrix4f } from "./Matrix4f.js";
import { Vector4f } from "./Vector4f.js";
export class Transformation {
    constructor() {
        this._IDENTITY = new Matrix4f([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
        this._transformationMatrix = new Matrix4f([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }
    Translate(v1) {
        this._transformationMatrix.w0 = v1.x;
        this._transformationMatrix.w1 = v1.y;
        this._transformationMatrix.w2 = v1.z;
        return this;
    }
    Scale(v1) {
        this._transformationMatrix.x0 = v1.x;
        this._transformationMatrix.y1 = v1.y;
        this._transformationMatrix.z2 = v1.z;
        return this;
    }
    RotateX(phi) {
        this._transformationMatrix.y1 = Math.cos(phi);
        this._transformationMatrix.z1 = -Math.sin(phi);
        this._transformationMatrix.y2 = Math.sin(phi);
        this._transformationMatrix.z2 = Math.cos(phi);
        return this;
    }
    RotateY(phi) {
        this._transformationMatrix.x0 = Math.cos(phi);
        this._transformationMatrix.z0 = Math.sin(phi);
        this._transformationMatrix.x2 = -Math.sin(phi);
        this._transformationMatrix.z2 = Math.cos(phi);
        return this;
    }
    RotateZ(phi) {
        this._transformationMatrix.x0 = Math.cos(phi);
        this._transformationMatrix.y0 = -Math.sin(phi);
        this._transformationMatrix.x1 = Math.sin(phi);
        this._transformationMatrix.y1 = Math.cos(phi);
        return this;
    }
    TransformPoint(v1) {
        let transformedComponents = [];
        for (const row of this._transformationMatrix.GetRows()) {
            transformedComponents.push(Vector4f.DotProduct(new Vector4f(row[0], row[1], row[2], row[3]), v1));
        }
        let vector = new Vector4f(transformedComponents[0], transformedComponents[1], transformedComponents[2], transformedComponents[3]);
        console.log(`%c Transformation::TransformPoint::TransformedVector`, 'background: #34abeb;');
        console.log(`Transformation matrix: MAT${this._transformationMatrix._N_M_} | `, JSON.parse(JSON.stringify(this._transformationMatrix)));
        console.log(`VEC${vector._N_COMPONENTS} | `, JSON.parse(JSON.stringify(vector)));
        return vector;
    }
}
