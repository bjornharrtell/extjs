/**
 * A helper class to facilitate common operations on points and vectors.
 */
Ext.define('Ext.draw.Point', {

    requires: [
        'Ext.draw.Draw',
        'Ext.draw.Matrix'
    ],

    isPoint: true,

    x: 0,
    y: 0,

    length: 0,
    angle: 0,

    angleUnits: 'degrees',

    statics: {
        /**
         * @static
         * Creates a flyweight Ext.draw.Point instance.
         * Takes the same parameters as the {@link Ext.draw.Point#constructor}.
         * Do not hold the instance of the flyweight point.
         *
         * @param point {Number/Number[]/Object/Ext.draw.Point}
         * @return {Ext.draw.Point}
         */
        fly: (function () {
            var point = null;
            return function (x, y) {
                if (!point) {
                    point = new Ext.draw.Point();
                }
                point.constructor(x, y);
                return point;
            }
        })()
    },

    /**
     * Creates a point.
     *
     *     new Ext.draw.Point(3, 4);
     *     new Ext.draw.Point(3); // both x and y equal 3
     *     new Ext.draw.Point([3, 4]);
     *     new Ext.draw.Point({x: 3, y: 4});
     *     new Ext.draw.Point(p); // where `p` is a Ext.draw.Point instance.
     *
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     */
    constructor: function (x, y) {
        var me = this;

        if (typeof x === 'number') {
            me.x = x;
            if (typeof y === 'number') {
                me.y = y;
            } else {
                me.y = x;
            }
        } else if (Ext.isArray(x)) {
            me.x = x[0];
            me.y = x[1];
        } else if (x) {
            me.x = x.x;
            me.y = x.y;
        }

        me.calculatePolar();
    },

    calculateCartesian: function () {
        var me = this,
            length = me.length,
            angle = me.angle;

        if (me.angleUnits === 'degrees') {
            angle = Ext.draw.Draw.rad(angle);
        }
        me.x = Math.cos(angle) * length;
        me.y = Math.sin(angle) * length;
    },

    calculatePolar: function () {
        var me = this,
            x = me.x,
            y = me.y;

        me.length = Math.sqrt(x * x + y * y);
        me.angle = Math.atan2(y, x);
        if (me.angleUnits === 'degrees') {
            me.angle = Ext.draw.Draw.degrees(me.angle);
        }
    },

    /**
     * Sets the x-coordinate of the point.
     * @param x {Number}
     */
    setX: function (x) {
        this.x = x;
        this.calculatePolar();
    },

    /**
     * Sets the y-coordinate of the point.
     * @param y {Number}
     */
    setY: function (y) {
        this.y = y;
        this.calculatePolar();
    },

    /**
     * Sets coordinates of the point.
     * Takes the same parameters as the {@link #constructor}.
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     */
    set: function (x, y) {
        this.constructor(x, y);
    },

    /**
     * Sets the angle of the vector (measured from the x-axis to the vector)
     * without changing its length.
     * @param angle {Number}
     */
    setAngle: function (angle) {
        this.angle = angle;
        this.calculateCartesian();
    },

    /**
     * Sets the length of the vector without changing its angle.
     * @param length {Number}
     */
    setLength: function (length) {
        this.length = length;
        this.calculateCartesian();
    },

    /**
     * Sets both the angle and the length of the vector.
     * A point can be thought of as a vector pointing from the origin to the point's location.
     * This can also be interpreted as setting coordinates of a point in the polar
     * coordinate system.
     * @param angle {Number}
     * @param length {Number}
     */
    setPolar: function (angle, length) {
        this.angle = angle;
        this.length = length;
        this.calculateCartesian();
    },

    /**
     * Returns a copy of the point.
     * @return {Ext.draw.Point}
     */
    clone: function () {
        return new Ext.draw.Point(this.x, this.y);
    },

    /**
     * Adds another vector to this one and returns the resulting vector
     * without changing this vector.
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     * @return {Ext.draw.Point}
     */
    add: function (x, y) {
        var fly = Ext.draw.Point.fly(x, y);
        return new Ext.draw.Point(this.x + fly.x, this.y + fly.y);
    },

    /**
     * Subtracts another vector from this one and returns the resulting vector
     * without changing this vector.
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     * @return {Ext.draw.Point}
     */
    sub: function (x, y) {
        var fly = Ext.draw.Point.fly(x, y);
        return new Ext.draw.Point(this.x - fly.x, this.y - fly.y);
    },

    /**
     * Returns the result of scalar multiplication of this vector by the given factor.
     * This vector is not modified.
     * @param n {Number} The factor.
     * @return {Ext.draw.Point}
     */
    mul: function (n) {
        return new Ext.draw.Point(this.x * n, this.y * n);
    },

    /**
     * Returns a vector which coordinates are the result of division of this vector's
     * coordinates by the given number. This vector is not modified.
     * This vector is not modified.
     * @param n {Number} The denominator.
     * @return {Ext.draw.Point}
     */
    div: function (n) {
        return new Ext.draw.Point(this.x / n, this.y / n);
    },

    /**
     * Returns the dot product of this vector and the given vector.
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     * @return {Number}
     */
    dot: function (x, y) {
        var fly = Ext.draw.Point.fly(x, y);
        return this.x * fly.x + this.y * fly.y;
    },

    /**
     * Checks whether coordinates of the point match those of the point provided.
     * @param point {Number/Number[]/Object/Ext.draw.Point}
     * @return {Boolean}
     */
    equals: function (x, y) {
        var fly = Ext.draw.Point.fly(x, y);
        return this.x === fly.x && this.y === fly.y;
    },

    /**
     * Rotates the point by the given angle. This point is not modified.
     * @param angle {Number} The rotation angle.
     * @param center {Ext.draw.Point} The center of rotation (optional). Defaults to origin.
     * @return {Ext.draw.Point} The rotated point.
     */
    rotate: function (angle, center) {
        var sin, cos,
            cx, cy,
            point;

        if (this.angleUnits === 'degrees') {
            angle = Ext.draw.Draw.rad(angle);
            sin = Math.sin(angle);
            cos = Math.cos(angle);
        }
        if (center) {
            cx = center.x;
            cy = center.y;
        } else {
            cx = 0;
            cy = 0;
        }
        point = Ext.draw.Matrix.fly([
            cos, sin,
            -sin, cos,
            cx - cos * cx + cy * sin,
            cy - cos * cy + cx * -sin
        ]).transformPoint(this);

        return new Ext.draw.Point(point);
    },

    /**
     * Transforms the point from one coordinate system to another
     * using the transformation matrix provided. This point is not modified.
     * @param matrix {Ext.draw.Matrix/Number[]} A trasformation matrix or its elements.
     * @return {Ext.draw.Point}
     */
    transform: function (matrix) {
        if (matrix && matrix.isMatrix) {
            return new Ext.draw.Point(matrix.transformPoint(this));
        } else if (arguments.length === 6) {
            return new Ext.draw.Point(Ext.draw.Matrix.fly(arguments).transformPoint(this));
        } else {
            Ext.raise("Invalid parameters.");
        }
    },

    /**
     * Returns a new point with rounded x and y values. This point is not modified.
     * @return {Ext.draw.Point}
     */
    round: function () {
        return new Ext.draw.Point(
            Math.round(this.x),
            Math.round(this.y)
        );
    },

    /**
     * Returns a new point with ceiled x and y values. This point is not modified.
     * @return {Ext.draw.Point}
     */
    ceil: function () {
        return new Ext.draw.Point(
            Math.ceil(this.x),
            Math.ceil(this.y)
        );
    },

    /**
     * Returns a new point with floored x and y values. This point is not modified.
     * @return {Ext.draw.Point}
     */
    floor: function () {
        return new Ext.draw.Point(
            Math.floor(this.x),
            Math.floor(this.y)
        );
    },

    /**
     * Returns a new point with absolute values of the x and y values of this point.
     * This point is not modified.
     * @return {Ext.draw.Point}
     */
    abs: function (x, y) {
        return new Ext.draw.Point(
            Math.abs(this.x),
            Math.abs(this.y)
        );
    },

    /**
     * Normalizes the vector by changing its length to 1 without changing its angle.
     * The returned result is a normalized vector. This vector is not modified.
     * @param length {Number=1} The length of the normalized vector. Defaults to 1.
     * @return {Ext.draw.Point}
     */
    normalize: function (length) {
        var x = this.x,
            y = this.y,
            nx, ny, tg;

        length = length || 1;

        if (x === 0) {
            nx = 0;
            ny = length * Ext.Number.sign(y);
        } else {
            tg = y/x;
            nx = length / Math.sqrt(1 + tg * tg);
            ny = nx * tg;
        }
        return new Ext.draw.Point(nx, ny);
    },

    /**
     * Returns the vector from the point perpendicular to the line (shortest distance).
     * Where line is specified using two points or the coordinates of those points.
     * @param p1 {Ext.draw.Point}
     * @param p2 {Ext.draw.Point}
     * @return {Ext.draw.Point}
     */
    getDistanceToLine: function (p1, p2) {
        if (arguments.length === 4) {
            p1 = new Ext.draw.Point(arguments[0], arguments[1]);
            p2 = new Ext.draw.Point(arguments[2], arguments[3]);
        }
        // See http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Vector_formulation
        var n = p2.sub(p1).normalize(),
            pp1 = p1.sub(this);
        return pp1.sub(n.mul(pp1.dot(n)));
    },

    /**
     * Checks if both x and y coordinates of the point are zero.
     * @return {Boolean}
     */
    isZero: function () {
        return this.x === 0 && this.y === 0;
    },

    /**
     * Checks if both x and y coordinates of the point are valid numbers.
     * @return {Boolean}
     */
    isNumber: function () {
        return Ext.isNumber(this.x + this.y);
    }

});