export class Matrix2f {
    constructor(elements) {
        this._N_ELEMENTS = 4;
        this._N_M_ = 2;
        this._N_N_ = 2;
        if (elements.length != this._N_ELEMENTS) {
            throw new Error(`Wrong size elements list for 2x2 matrix. Expected ${this._N_ELEMENTS}, got: ${elements.length}.`);
        }
        this.x0 = elements[0];
        this.y0 = elements[1];
        this.x1 = elements[2];
        this.y1 = elements[3];
    }
    Negate() {
        this.MultiplyScalar(-1);
        return this;
    }
    static Negate(m1) {
        return Matrix2f.MultiplyScalar(-1, m1);
    }
    Add(m1) {
        this.x0 += m1.x0;
        this.y0 += m1.y0;
        this.x1 += m1.x1;
        this.y1 += m1.y1;
        return this;
    }
    static Add(m1, m2) {
        let x0, y0, x1, y1;
        x0 = m1.x0 + m2.x0;
        y0 = m1.y0 + m2.y0;
        x1 = m1.x1 + m2.x1;
        y1 = m1.y1 + m2.y1;
        return new Matrix2f([x0, y0, x1, y1]);
    }
    MultiplyScalar(n) {
        this.x0 *= n;
        this.y0 *= n;
        this.x1 *= n;
        this.y1 *= n;
        return this;
    }
    static MultiplyScalar(n, m1) {
        let x0, y0, x1, y1;
        x0 = m1.x0 * n;
        y0 = m1.y0 * n;
        x1 = m1.x1 * n;
        y1 = m1.y1 * n;
        return new Matrix2f([x0, y0, x1, y1]);
    }
    Multiply(m1) {
        let matrix = new Array();
        let rows = this.GetRows();
        let columns = m1.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                matrix.push(x + y);
            }
        }
        if (matrix.length != this._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${this._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        this.x0 = matrix[0];
        this.y0 = matrix[1];
        this.x1 = matrix[2];
        this.y1 = matrix[3];
        return this;
    }
    static Multiply(m1, m2) {
        let matrix = new Array();
        let rows = m1.GetRows();
        let columns = m2.GetColumns();
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                let x, y;
                x = rows[i][0] * columns[j][0];
                y = rows[i][1] * columns[j][1];
                matrix.push(x + y);
            }
        }
        if (matrix.length != m1._N_ELEMENTS) {
            throw new Error(`Matrix multiplication error. Expected ${m1._N_ELEMENTS}, got this many elements: ${matrix.length}.`);
        }
        return new Matrix2f(matrix);
    }
    Transpose() {
        const matrix = this.GetColumns();
        this.x0 = matrix[0][0];
        this.y0 = matrix[0][1];
        this.x1 = matrix[1][0];
        this.y1 = matrix[1][1];
        return this;
    }
    static Transpose(m1) {
        const matrix = m1.GetColumns();
        let x0, y0, x1, y1;
        x0 = matrix[0][0];
        y0 = matrix[0][1];
        x1 = matrix[1][0];
        y1 = matrix[1][1];
        return new Matrix2f([x0, y0, x1, y1]);
    }
    GetRows() {
        return [
            [this.x0, this.y0],
            [this.x1, this.y1],
        ];
    }
    GetColumns() {
        return [
            [this.x0, this.x1],
            [this.y0, this.y1],
        ];
    }
    *[Symbol.iterator]() {
        yield this.x0;
        yield this.x1;
        yield this.y0;
        yield this.y1;
    }
}
