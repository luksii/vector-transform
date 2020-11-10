export class Vector2f {
    constructor(x, y) {
        this._N_COMPONENTS = 2;
        this.x = x;
        this.y = y;
    }
    /**
     * Negates this vector.
     * @returns this vector negated
     */
    Negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * Negates an arbitrary vector.
     * @param v1 the vector to negate
     * @returns this vector negated
     */
    static Negate(v1) {
        let x, y;
        x = -v1.x;
        y = -v1.y;
        return new Vector2f(x, y);
    }
    /**
     * Adds another vector to this vector.
     * @param v1 the vector to add to this one
     * @returns this vector
     */
    Add(v1) {
        this.x += v1.x;
        this.y += v1.y;
        return this;
    }
    /**
     * Adds two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the addition result vector
     */
    static Add(v1, v2) {
        let x, y;
        x = v1.x + v2.x;
        y = v1.y + v2.y;
        return new Vector2f(x, y);
    }
    /**
     * Sets this vector to the scalar product of this vector and a scalar.
     * @param n the scalar to multiply with
     * @returns this vector
     */
    ScalarProduct(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    /**
     * Scalarly multiplies two arbitrary vectors
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the multiplication result vector
     */
    static ScalarProduct(n, v1) {
        let x, y;
        x = n * v1.x;
        y = n * v1.y;
        return new Vector2f(x, y);
    }
    /**
     * Dot multiplies this vector with another vector.
     * @param v1 the other vector
     * @returns the dot product
     */
    DotProduct(v1) {
        return (this.x * v1.x + this.y * v1.y);
    }
    /**
     * Dot multiplies two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the dot product
     */
    static DotProduct(v1, v2) {
        return (v1.x * v2.x + v1.y * v2.y);
    }
    /**
     * Cross multiplies this vector with another vector.
     * @param v1 the other vector
     * @returns the result vector
     */
    CrossProduct(v1) {
        let x, y;
        x = this.x * v1.y - this.y * v1.x;
        y = this.y * v1.x - this.x * v1.y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Cross multiplies two vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the result vector
     */
    static CrossProduct(v1, v2) {
        let x, y;
        x = v1.x * v2.y - v1.y * v2.x;
        y = v1.y * v2.x - v1.x * v2.y;
        return new Vector2f(x, y);
    }
    /**
     * Gets the length of this vector (2nd norm).
     * @returns the length
     */
    Length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    /**
     * Gets the length of an arbitrary vector (2nd norm).
     * @returns the length
     */
    static Length(v1) {
        return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
    }
    /**
     * Normalizes this vector.
     * @returns this vector normalized
     */
    Normalize() {
        this.x /= this.Length();
        this.y /= this.Length();
        return this;
    }
    /**
     * Normalizes an arbitrary vector.
     * @returns the vector normalized
     */
    static Normalize(v1) {
        v1.x /= v1.Length();
        v1.y /= v1.Length();
        return v1;
    }
    /**
     * Projects another vector onto this vector.
     * @param v1 the vector to project onto this one
     * @returns the projected vector
     */
    Project(v1) {
        let a = v1.Length() * Vector2f.CosPhi(v1, this);
        let x = a * Vector2f.Normalize(this).x;
        let y = a * Vector2f.Normalize(this).y;
        return new Vector2f(x, y);
    }
    /**
     * Projects vector v1 onto vector v2.
     * @param v1 the vector to project
     * @param v2 the vector to project onto
     * @returns the projected vector
     */
    static Project(v1, v2) {
        let a = v1.Length() * Vector2f.CosPhi(v1, v2);
        let x = a * Vector2f.Normalize(v2).x;
        let y = a * Vector2f.Normalize(v2).y;
        return new Vector2f(x, y);
    }
    /**
     * Gets the angle between this vector and another vector.
     * @param v1 the vector to get the angle between of
     * @returns the cosine of the angle between this and another vector
     */
    CosPhi(v1) {
        return (Vector2f.DotProduct(this, v1) / (this.Length() * v1.Length()));
    }
    /**
     * Gets the angle between two arbitrary vectors.
     * @param v1 the first vector
     * @param v2 the second vector
     * @returns the cosine of the angle between the first and second vector
     */
    static CosPhi(v1, v2) {
        return (Vector2f.DotProduct(v1, v2) / (v1.Length() * v2.Length()));
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
