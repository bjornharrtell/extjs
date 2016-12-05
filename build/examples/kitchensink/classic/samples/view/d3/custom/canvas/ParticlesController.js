Ext.define('KitchenSink.view.d3.custom.canvas.ParticlesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.particles',

    requires: [
        'KitchenSink.view.d3.custom.canvas.Particle'
    ],

    onSceneResize: function (component, canvas) {
        // Do setup on first resize (we expect no more).
        var me = this,
            view = me.getView(),
            width = view.getWidth(),
            height = view.getHeight(),
            list = me.list = [];

        me.view = me.getView();
        me.x = width / 2;
        me.y = height / 2;

        me.color = d3.scale.linear()
            .domain([0, 0.2, 0.4, 0.6, 0.8, 1])
            .range(['red', 'orange', 'yellow', 'green', 'blue', 'violet']);

        var context = canvas.getContext('2d');
        context.lineWidth = 4;

        d3.timer(function() {
            // There is no other way to stop a D3 timer
            // other than returning 'true' from a callback.
            if (component.isDestroyed) {
                return true;
            }

            context.save();
            context.globalCompositeOperation = 'lighter';
            for (var i = list.length - 1; i >= 0; i--) {
                var p = list[i];
                p.updatePosition();
                p.render(context);
                if (p.isDead) {
                    list.splice(i, 1);
                }
            }
            context.restore();

            list.push(me.createParticle(me.x, me.y));

            context.fillStyle = 'rgba(0,0,0,0.2)';
            context.fillRect(0, 0, width, height);
        });
    },

    createParticle: function (x, y) {
        var raduis = 2 + Math.random() * 3,
            color = this.color(Math.random()),
            p = new KitchenSink.view.d3.custom.canvas.Particle(x, y, raduis, color);

        p.setVelocity(Math.random() * 4 - 2, -3 - Math.random() * 2);
        p.setGravity(0, 0.1);

        return p;
    },

    onMouseMove: function (e) {
        var me = this,
            view = me.view,
            viewXY = view.getXY(),
            isRtl = view.getInherited().rtl,
            pageXY = e.getXY();

        me.x = pageXY[0] - viewXY[0];
        me.y = pageXY[1] - viewXY[1];

        if (isRtl) {
            me.x = view.getSize().width - me.x;
        }
    }

});