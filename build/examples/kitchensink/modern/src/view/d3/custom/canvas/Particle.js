/**
 * This class describes a particle that has two forces (velocity and gravity)
 * affecting its position.
 */
Ext.define('KitchenSink.view.d3.custom.canvas.Particle', {
    constructor: function (x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;

        this.updateCount = 0;
        this.maxUpdates = 250;
    },

    setVelocity: function (vx, vy) {
        this.vx = vx;
        this.vy = vy;
    },

    setGravity: function (gx, gy) {
        this.gx = gx;
        this.gy = gy;
    },

    updatePosition: function () {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += this.gx;
        this.vy += this.gy;

        this.updateCount++;
        if (this.updateCount >= this.maxUpdates) {
            this.isDead = true;
        }
    },

    render: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
});
