export class Vector4f {
    constructor(x, y, z, w) {
        this._N_COMPONENTS = 4;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /**
     * Negates this vector.
     * @returns this vector negated
     */
    Negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = this.w;
        return this;
    }
    /**
     * Negates an arbitrary vector.
     * @param v1 the vector to negate
     * @returns this vector negated
     */
    static Negate(v1) {
        let x, y, z, w;
        x = -v1.x;
        y = -v1.y;
        z = -v1.z;
        w = 1.0;
        return new Vector4f(x, y, z, w);
    }
    /**
     * Adds another vector to this vector.
     * @param v1 the vector to add to this one
     * @returns this vector
     */
    Add(v1) {
        this.x += v1.x;
        this.y += v1.y;
        this.z += v1.z;
        this.w = 1.0;
        return this;
    }
    /**
     * Adds two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the addition result vector
     */
    static Add(v1, v2) {
        let x, y, z, w;
        x = v1.x + v2.x;
        y = v1.y + v2.y;
        z = v1.z + v2.z;
        w = 1.0;
        return new Vector4f(x, y, z, w);
    }
    /**
     * Sets this vector to the scalar product of this vector and a scalar.
     * @param n the scalar to multiply with
     * @returns this vector
     */
    ScalarProduct(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        this.w *= n;
        return this;
    }
    /**
     * Scalarly multiplies two arbitrary vectors
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the multiplication result vector
     */
    static ScalarProduct(n, v1) {
        let x, y, z, w;
        x = n * v1.x;
        y = n * v1.y;
        z = n * v1.z;
        w = n * v1.w;
        return new Vector4f(x, y, z, w);
    }
    /**
     * Dot multiplies this vector with another vector.
     * @param v1 the other vector
     * @returns the dot product
     */
    DotProduct(v1) {
        return (this.x * v1.x + this.y * v1.y + this.z * v1.z + this.w * v1.w);
    }
    /**
     * Dot multiplies two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the dot product
     */
    static DotProduct(v1, v2) {
        return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w);
    }
    /**
     * Cross multiplies this vector with another vector.
     * @param v1 the other vector
     * @returns the result vector
     */
    CrossProduct(v1) {
        let x, y, z, w;
        x = this.x * v1.y - this.y * v1.x;
        y = this.y * v1.z - this.z * v1.y;
        z = this.z * v1.x - this.x * v1.z;
        w = 0.0;
        return new Vector4f(x, y, z, w);
    }
    /**
     * Cross multiplies two vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the result vector
     */
    static CrossProduct(v1, v2) {
        let x, y, z, w;
        x = v1.x * v2.y - v1.y * v2.x;
        y = v1.y * v2.z - v1.z * v2.y;
        z = v1.z * v2.x - v1.x * v2.z;
        w = 0.0;
        return new Vector4f(x, y, z, w);
    }
    /**
     * Gets the length of this vector (2nd norm).
     * @returns the length
     */
    Length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    /**
    * Gets the length of an arbitrary vector (2nd norm).
    * @returns the length
    */
    static Length(v1) {
        return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2) + Math.pow(v1.z, 2));
    }
    /**
    * Normalizes this vector.
    * @returns this vector normalized
    */
    Normalize() {
        this.x /= this.Length();
        this.y /= this.Length();
        this.z /= this.Length();
        this.w = this.w;
        return this;
    }
    /**
     * Normalizes an arbitrary vector.
     * @returns the vector normalized
     */
    static Normalize(v1) {
        v1.x /= v1.Length();
        v1.y /= v1.Length();
        v1.z /= v1.Length();
        v1.w = v1.w;
        return v1;
    }
    /**
    * Project the vector v1 onto this vector.
    * Equation: w = proj_v(u) = c*v = ((v.u) / (||v||^2)) * v
    * https://www.math.usm.edu/lambers/mat169/fall09/lecture22.pdf
    * @param v1 the vector to project onto this one
    * @returns the projected vector
    */
    Project(v1) {
        let c = Vector4f.DotProduct(v1, this) / Math.pow(v1.Length(), 2);
        return Vector4f.ScalarProduct(c, v1);
    }
    /**
     * Project the vector v1 onto this vector.
     * Equation: w = proj_v(u) = c*v = ((v.u) / (||v||^2)) * v
     * https://www.math.usm.edu/lambers/mat169/fall09/lecture22.pdf
     * @param v1 the vector to project
     * @param v2 the vector to project onto
     * @returns the projected vector
     */
    static Project(v1, v2) {
        let c = Vector4f.DotProduct(v1, v2) / Math.pow(v1.Length(), 2);
        return Vector4f.ScalarProduct(c, v1);
    }
    /**
     * Gets the angle between this vector and another vector.
     * @param v1 the vector to get the angle between of
     * @returns the cosine of the angle between this and another vector
     */
    CosPhi(v1) {
        return (Vector4f.DotProduct(this, v1) / (this.Length() * v1.Length()));
    }
    /**
     * Gets the angle between two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the cosine of the angle between the first and second vector
     */
    static CosPhi(v1, v2) {
        return (Vector4f.DotProduct(v1, v2) / (v1.Length() * v2.Length()));
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.y;
    }
}
