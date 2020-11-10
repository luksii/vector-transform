export class Matrix4f {
    constructor(elements) {
        this._N_ELEMENTS = 16;
        this._N_M_ = 4;
        this._N_N_ = 4;
        if (elements.length != this._N_ELEMENTS) {
            throw new Error(`Wrong size elements list for 4x4 matrix. Expected ${this._N_ELEMENTS}, got: ${elements.length}.`);
        }
        this.x0 = elements[0];
        this.y0 = elements[1];
        this.z0 = elements[2];
        this.w0 = elements[3];
        this.x1 = elements[4];
        this.y1 = elements[5];
        this.z1 = elements[6];
        this.w1 = elements[7];
        this.x2 = elements[8];
        this.y2 = elements[9];
        this.z2 = elements[10];
        this.w2 = elements[11];
        this.x3 = elements[12];
        this.y3 = elements[13];
        this.z3 = elements[14];
        this.w3 = elements[15];
    }
    Negate() {
        this.MultiplyScalar(-1);
        return this;
    }
    static Negate(m1) {
        return Matrix4f.MultiplyScalar(-1, m1);
    }
    Add(m1) {
        this.x0 += m1.x0;
        this.y0 += m1.y0;
        this.z0 += m1.z0;
        this.w0 += m1.w0;
        this.x1 += m1.x1;
        this.y1 += m1.y1;
        this.z1 += m1.z1;
        this.w1 += m1.w1;
        this.x2 += m1.x2;
        this.y2 += m1.y2;
        this.z2 += m1.z2;
        this.w2 += m1.w2;
        this.x3 += m1.x3;
        this.y3 += m1.y3;
        this.z3 += m1.z3;
        this.w3 += m1.w3;
        return this;
    }
    static Add(m1, m2) {
        let x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3;
        x0 = m1.x0 + m2.x0;
        y0 = m1.y0 + m2.y0;
        z0 = m1.z0 + m2.z0;
        w0 = m1.w0 + m2.w0;
        x1 = m1.x1 + m2.x1;
        y1 = m1.y1 + m2.y1;
        z1 = m1.z1 + m2.z1;
        w1 = m1.w1 + m2.w1;
        x2 = m1.x2 + m2.x2;
        y2 = m1.y2 + m2.y2;
        z2 = m1.z2 + m2.z2;
        w2 = m1.w2 + m2.w2;
        x3 = m1.x3 + m2.x3;
        y3 = m1.y3 + m2.y3;
        z3 = m1.z3 + m2.z3;
        w3 = m1.w3 + m2.w3;
        return new Matrix4f([x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3]);
    }
    MultiplyScalar(n) {
        this.x0 *= n;
        this.y0 *= n;
        this.x1 *= n;
        this.y1 *= n;
        return this;
    }
    static MultiplyScalar(n, m1) {
        let x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3;
        x0 = n * m1.x0;
        y0 = n * m1.y0;
        z0 = n * m1.z0;
        w0 = n * m1.w0;
        x1 = n * m1.x1;
        y1 = n * m1.y1;
        z1 = n * m1.z1;
        w1 = n * m1.w1;
        x2 = n * m1.x2;
        y2 = n * m1.y2;
        z2 = n * m1.z2;
        w2 = n * m1.w2;
        x3 = n * m1.x3;
        y3 = n * m1.y3;
        z3 = n * m1.z3;
        w3 = n * m1.w3;
        return new Matrix4f([x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3]);
    }
    Multiply(m1) {
        let matrix = new Array();
        let rows = this.GetRows();
        let columns = m1.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y, z, w;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                z = rows[i][2] * columns[j][2];
                w = rows[i][3] * columns[j][3];
                matrix.push(x + y + z + w);
            }
        }
        if (matrix.length != this._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${this._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        this.x0 = matrix[0];
        this.y0 = matrix[1];
        this.z0 = matrix[2];
        this.w0 = matrix[3];
        this.x1 = matrix[4];
        this.y1 = matrix[5];
        this.z1 = matrix[6];
        this.w1 = matrix[7];
        this.x2 = matrix[8];
        this.y2 = matrix[9];
        this.z2 = matrix[10];
        this.w2 = matrix[11];
        this.x3 = matrix[12];
        this.y3 = matrix[13];
        this.z3 = matrix[14];
        this.w3 = matrix[15];
        return this;
    }
    static Multiply(m1, m2) {
        let matrix = new Array();
        let rows = m1.GetRows();
        let columns = m2.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y, z, w;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                z = rows[i][2] * columns[j][2];
                w = rows[i][3] * columns[j][3];
                matrix.push(x + y + z + w);
            }
        }
        if (matrix.length != m1._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${m1._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        return new Matrix4f(matrix);
    }
    Transpose() {
        const matrix = this.GetColumns();
        this.x0 = matrix[0][0];
        this.y0 = matrix[0][1];
        this.z0 = matrix[0][2];
        this.w0 = matrix[0][3];
        this.x1 = matrix[1][0];
        this.y1 = matrix[1][1];
        this.z1 = matrix[1][2];
        this.w1 = matrix[1][3];
        this.x2 = matrix[2][0];
        this.y2 = matrix[2][1];
        this.z2 = matrix[2][2];
        this.w2 = matrix[2][3];
        this.x3 = matrix[3][0];
        this.y3 = matrix[3][1];
        this.z3 = matrix[3][2];
        this.w3 = matrix[3][3];
        return this;
    }
    static Transpose(m1) {
        const matrix = m1.GetColumns();
        let x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3;
        x0 = matrix[0][0];
        y0 = matrix[0][1];
        z0 = matrix[0][2];
        w0 = matrix[0][3];
        x1 = matrix[1][0];
        y1 = matrix[1][1];
        z1 = matrix[1][2];
        w1 = matrix[1][3];
        x2 = matrix[2][0];
        y2 = matrix[2][1];
        z2 = matrix[2][2];
        w2 = matrix[2][3];
        x3 = matrix[3][0];
        y3 = matrix[3][1];
        z3 = matrix[3][2];
        w3 = matrix[3][3];
        return new Matrix4f([x0, y0, z0, w0, x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3]);
    }
    GetRows() {
        return [
            [this.x0, this.y0, this.z0, this.w0],
            [this.x1, this.y1, this.z1, this.w1],
            [this.x2, this.y2, this.z2, this.w2],
            [this.x3, this.y3, this.z3, this.w3],
        ];
    }
    GetColumns() {
        return [
            [this.x0, this.x1, this.x2, this.x3],
            [this.y0, this.y1, this.y2, this.y3],
            [this.z0, this.z1, this.z2, this.z3],
            [this.w0, this.w1, this.w2, this.w3],
        ];
    }
    *[Symbol.iterator]() {
        yield this.x0;
        yield this.y0;
        yield this.z0;
        yield this.w0;
        yield this.x1;
        yield this.y1;
        yield this.z1;
        yield this.w1;
        yield this.x2;
        yield this.y2;
        yield this.z2;
        yield this.w2;
        yield this.x3;
        yield this.y3;
        yield this.z3;
        yield this.w3;
    }
}
