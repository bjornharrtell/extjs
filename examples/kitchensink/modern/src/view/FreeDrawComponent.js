(function () {

    function smoothenList(points) {
        if (points.length < 3) {
            return ["M", points[0], points[1]];
        }
        var dx = [], dy = [], result = ['M'],
            i, ln = points.length;
        for (i = 0; i < ln; i += 2) {
            dx.push(points[i]);
            dy.push(points[i + 1]);
        }
        dx = Ext.draw.Draw.spline(dx);
        dy = Ext.draw.Draw.spline(dy);
        result.push(dx[0], dy[0], "C");
        for (i = 1, ln = dx.length; i < ln; i++) {
            result.push(dx[i], dy[i]);
        }
        return result;
    }

    var sprite, list = [], old1 = [0, 0], old2 = [0, 0];
    /**
     * Demonstrates smoothening and cubic bezier Curve rendering
     */
    Ext.define('KitchenSink.view.FreeDrawComponent', {
        extend: 'Ext.draw.Component',
        config: {
            background: 'white',
            listeners: {
                element: 'element',
                'drag': function (e) {
                    if (sprite) {
                        var me = this,
                            p = e.touches[0].point,
                            xy = me.element.getXY(),
                            x = p.x - xy[0],
                            y = p.y - xy[1],
                            dx = this.lastEventX - x,
                            dy = this.lastEventY - y,
                            D = 40;
                        if (dx * dx + dy * dy < D * D) {
                            list.length -= 2;
                            list.push(p.x - xy[0], p.y - xy[1]);
                        } else {
                            list.length -= 2;
                            list.push(this.lastEventX = p.x - xy[0], this.lastEventY = p.y - xy[1]);
                            list.push(this.lastEventX + 1, this.lastEventY + 1);
                        }

                        var path = smoothenList(list);
                        sprite.setAttributes({
                            path: path
                        });
                        if (Ext.os.is.Android) {
                            Ext.draw.Animator.schedule(function () {
                                this.getSurface('overlay').renderFrame();
                            }, me);
                        } else {
                            me.getSurface('overlay').renderFrame();
                        }
                    }
                },
                'touchstart': function (e) {
                    if (!sprite) {
                        var cmp = this,
                            p0 = cmp.element.getXY(),
                            p = [e.pageX - p0[0], e.pageY - p0[1]];
                        list = [p[0], p[1], p[0], p[1]];
                        this.lastEventX = p[0];
                        this.lastEventY = p[1];
                        cmp.getSurface('overlay').element.setStyle({zIndex: 1});
                        sprite = cmp.getSurface('overlay').add({
                            type: 'path',
                            path: ['M', list[0], list[1], 'L', list[0] + 1e-5, list[1] + 1e-5],
                            lineWidth: 30 * Math.random() + 10,
                            lineCap: 'round',
                            lineJoin: 'round',
                            strokeStyle: new Ext.draw.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
                        });
                        old1 = old2 = p;
                        cmp.getSurface('overlay').renderFrame();
                    }
                },
                'dragend': function (e) {
                    var cmp = this;
                    cmp.getSurface().add({
                        type: 'path',
                        path: sprite.attr.path,
                        lineWidth: sprite.attr.lineWidth,
                        lineCap: 'round',
                        lineJoin: 'round',
                        strokeStyle: sprite.attr.strokeStyle
                    });
                    cmp.getSurface().setDirty(true);
                    cmp.getSurface().renderFrame();
                    sprite.destroy();
                    cmp.getSurface('overlay').renderFrame();
                    sprite = null;
                }
            }
        },

        onResize: function () {
            var size = this.element.getSize();
            this.getSurface().setRect([0, 0, size.width, size.height]);
            this.getSurface('overlay').setRect([0, 0, size.width, size.height]);
            this.renderFrame();
        }
    });
})();