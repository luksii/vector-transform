export class Matrix3f {
    constructor(elements) {
        this._N_ELEMENTS = 9;
        this._N_M_ = 3;
        this._N_N_ = 3;
        if (elements.length != this._N_ELEMENTS) {
            throw new Error(`Wrong size elements list for 3x3 matrix. Expected ${this._N_ELEMENTS}, got: ${elements.length}.`);
        }
        this.x0 = elements[0];
        this.y0 = elements[1];
        this.z0 = elements[2];
        this.x1 = elements[3];
        this.y1 = elements[4];
        this.z1 = elements[5];
        this.x2 = elements[6];
        this.y2 = elements[7];
        this.z2 = elements[8];
    }
    Negate() {
        this.MultiplyScalar(-1);
        return this;
    }
    static Negate(m1) {
        return Matrix3f.MultiplyScalar(-1, m1);
    }
    Add(m1) {
        this.x0 += m1.x0;
        this.y0 += m1.y0;
        this.z0 += m1.z0;
        this.x1 += m1.x1;
        this.y1 += m1.y1;
        this.z1 += m1.z1;
        this.x2 += m1.x2;
        this.y2 += m1.y2;
        this.z2 += m1.z2;
        return this;
    }
    static Add(m1, m2) {
        let x0, y0, z0, x1, y1, z1, x2, y2, z2;
        x0 = m1.x0 + m2.x0;
        y0 = m1.y0 + m2.y0;
        z0 = m1.z0 + m2.z0;
        x1 = m1.x1 + m2.x1;
        y1 = m1.y1 + m2.y1;
        z1 = m1.z1 + m2.z1;
        x2 = m1.x2 + m2.x2;
        y2 = m1.y2 + m2.y2;
        z2 = m1.z2 + m2.z2;
        return new Matrix3f([x0, y0, z0, x1, y1, z1, x2, y2, z2]);
    }
    MultiplyScalar(n) {
        this.x0 *= n;
        this.y0 *= n;
        this.x1 *= n;
        this.y1 *= n;
        return this;
    }
    static MultiplyScalar(n, m1) {
        let x0, y0, z0, x1, y1, z1, x2, y2, z2;
        x0 = m1.x0 * n;
        y0 = m1.y0 * n;
        z0 = m1.z0 * n;
        x1 = m1.x1 * n;
        y1 = m1.y1 * n;
        z1 = m1.z1 * n;
        x2 = m1.x2 * n;
        y2 = m1.y2 * n;
        z2 = m1.z2 * n;
        return new Matrix3f([x0, y0, z0, x1, y1, z1, x2, y2, z2]);
    }
    Multiply(m1) {
        let matrix = new Array();
        let rows = this.GetRows();
        let columns = m1.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y, z;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                z = rows[i][2] * columns[j][2];
                matrix.push(x + y + z);
            }
        }
        if (matrix.length != this._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${this._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        this.x0 = matrix[0];
        this.y0 = matrix[1];
        this.z0 = matrix[2];
        this.x1 = matrix[3];
        this.y1 = matrix[4];
        this.z1 = matrix[5];
        this.x2 = matrix[6];
        this.y2 = matrix[7];
        this.z2 = matrix[8];
        return this;
    }
    static Multiply(m1, m2) {
        let matrix = new Array();
        let rows = m1.GetRows();
        let columns = m2.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y, z;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                z = rows[i][2] * columns[j][2];
                matrix.push(x + y + z);
            }
        }
        if (matrix.length != m1._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${m1._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        return new Matrix3f(matrix);
    }
    Transpose() {
        const matrix = this.GetColumns();
        this.x0 = matrix[0][0];
        this.y0 = matrix[0][1];
        this.z0 = matrix[0][2];
        this.x1 = matrix[1][0];
        this.y1 = matrix[1][1];
        this.z1 = matrix[1][2];
        this.x2 = matrix[2][0];
        this.y2 = matrix[2][1];
        this.z2 = matrix[2][2];
        return this;
    }
    static Transpose(m1) {
        const matrix = m1.GetColumns();
        let x0, y0, z0, x1, y1, z1, x2, y2, z2;
        x0 = matrix[0][0];
        y0 = matrix[0][1];
        z0 = matrix[0][2];
        x1 = matrix[1][0];
        y1 = matrix[1][1];
        z1 = matrix[1][2];
        x2 = matrix[2][0];
        y2 = matrix[2][1];
        z2 = matrix[2][2];
        return new Matrix3f([x0, y0, z0, x1, y1, z1, x2, y2, z2]);
    }
    GetRows() {
        return [
            [this.x0, this.y0, this.z0],
            [this.x1, this.y1, this.z1],
            [this.x2, this.y2, this.z2],
        ];
    }
    GetColumns() {
        return [
            [this.x0, this.x1, this.x2],
            [this.y0, this.y1, this.y2],
            [this.z0, this.z1, this.z2],
        ];
    }
    *[Symbol.iterator]() {
        yield this.x0;
        yield this.y0;
        yield this.z0;
        yield this.x1;
        yield this.y1;
        yield this.z1;
        yield this.x2;
        yield this.y2;
        yield this.z2;
    }
}
