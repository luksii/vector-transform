import { Vector4f } from "./Vector4f.js";
import { Transformation } from "./Transformation.js";
export class TransformPoints {
    constructor(stdout) {
        this.stdout = stdout;
        // Define the transformations
        // 1. translacja vzdolž osi x za 1.25
        const t1 = new Transformation().Translate(new Vector4f(1.25, 0, 0, 0));
        // 2. rotacija okoli osi z za kot pi/3
        const t2 = new Transformation().RotateZ(Math.PI / 3);
        // 3. translacija vzdolž osi z za 4.15
        const t3 = new Transformation().Translate(new Vector4f(0, 0, 4.15, 0));
        // 4. translacija vzdolž osi y za 3.14
        const t4 = new Transformation().Translate(new Vector4f(0, 3.14, 0, 0));
        // 5. skalacija vzdolž osi x in y za 1.12
        const t5 = new Transformation().Scale(new Vector4f(1.12, 1.12, 1, 0));
        // 6. rotacija okoli osi y za kot 5*pi/8
        const t6 = new Transformation().RotateY(5 * Math.PI / 8);
        this.transformations = [];
        this.transformations.push(t1);
        this.transformations.push(t2);
        this.transformations.push(t3);
        this.transformations.push(t4);
        this.transformations.push(t5);
        this.transformations.push(t6);
    }
    Transform(pm) {
        const inputVectors = pm.ReadInput();
        if (inputVectors.length == 0) {
            console.warn(`TransformPoints::ReadInput::EmptyInput`);
            return;
        }
        let outputVectors = [];
        for (const transformation of this.transformations) {
            for (const inputVector of inputVectors) {
                if (inputVector._N_COMPONENTS === 4) {
                    outputVectors.push(transformation.TransformPoint(inputVector));
                }
            }
        }
        this.PrintOutput(outputVectors);
    }
    PrintOutput(outputVectors) {
        let count = 0;
        this.stdout.innerHTML = "";
        for (const outputVector of outputVectors) {
            count++;
            // this.stdout.innerHTML += `(${outputVector.x.toFixed(3)}  ${outputVector.y.toFixed(3)}  ${outputVector.z.toFixed(3)}  ${outputVector.w.toFixed(3)})<br>`;
            this.stdout.innerHTML += `(${outputVector.x.toFixed(3)}  ${outputVector.y.toFixed(3)}  ${outputVector.z.toFixed(3)})<br>`;
            if (this.transformations.length === count) {
                this.stdout.innerHTML += '<center>--------------</center><br>';
                count = 0;
            }
        }
    }
}
