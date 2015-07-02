Ext.define("StockApp.sprite.RangeMask", {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'sprite.rangemask',
    inheritableStatics: {
        def: {
            processors: {
                visibleRange: 'data',
                handlerOpacity: 'number'
            },
            defaults: {
                lineWidth: 1,
                miterLimit: 1,
                strokeStyle: 'black',
                visibleRange: [0, 1, 0, 1],
                handlerOpacity: 0
            }
        }
    },

    getBBox: function (isWithoutTransform) {
        this.attr.bbox.plain = {x: 0, y: 0, width: 1, height: 1};
        if (isWithoutTransform) {
            return this.attr.bbox.plain;
        }
        return this.attr.bbox.transform || (this.attr.bbox.transform = this.attr.matrix.transformBBox(this.attr.bbox.plain));
    },

    renderHandlerImage: function (surface, ctx, x, y) {
        var me = this,
            attr = me.attr;
        if (!me.roundRect) {
            me.roundRect = new Ext.draw.sprite.Rect({
                x: -9.5,
                y: -9.5,
                width: 19,
                height: 19,
                radius: 4,
                lineWidth: 1,
                fillStyle: {
                    type: 'linear',
                    degrees: 90,
                    stops: [
                        {
                            offset: 0,
                            color: '#EEE'
                        },
                        {
                            offset: 1,
                            color: '#FFF'
                        }
                    ]
                },
                strokeStyle: '#999'
            });
            me.bump = new Ext.draw.sprite.Path({
                path: 'M -4, -5, -4, 5 M 0, -5, 0, 5 M 4, -5, 4, 5',
                strokeStyle: {
                    type: 'linear',
                    degrees: 90,
                    stops: [
                        {
                            offset: 0,
                            color: '#CCC'
                        },
                        {
                            offset: 1,
                            color: '#BBB'
                        }
                    ]
                },
                lineWidth: 2
            });
        }
        ctx.save();
        me.roundRect.setAttributes({translation: {x: x, y: y}, opacity: attr.globalAlpha * attr.handlerOpacity});
        me.roundRect.applyTransformations();
        me.bump.setAttributes({translation: {x: x, y: y}, opacity: attr.globalAlpha * attr.handlerOpacity});
        me.bump.applyTransformations();
        me.roundRect.useAttributes(ctx);
        me.roundRect.render(surface, ctx);
        me.bump.useAttributes(ctx);
        me.bump.render(surface, ctx);
        ctx.restore();
    },

    render: function (surface, ctx) {
        var me = this,
            attr = me.attr,
            matrix = attr.matrix.elements,
            xx = matrix[0],
            yy = matrix[3],
            dx = matrix[4],
            dy = matrix[5],
            lineWidth = attr.lineWidth || 2,
            halfLineWidth = lineWidth / 2,
            visibleRange = attr.visibleRange;
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.lineTo(xx + dx, dy);
        ctx.lineTo(xx + dx, yy + dy);
        ctx.lineTo(dx, yy + dy);
        ctx.lineTo(dx, dy);
        ctx.moveTo(visibleRange[0] * xx + dx, dy);
        ctx.lineTo(visibleRange[0] * xx + dx, yy + dy);
        ctx.lineTo(visibleRange[1] * xx + dx, yy + dy);
        ctx.lineTo(visibleRange[1] * xx + dx, dy);
        ctx.lineTo(visibleRange[0] * xx + dx, dy);
        ctx.fill();

        var colors = ['#ddd', '#bbb', '#aaa'];
        for (var i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.strokeStyle = colors[i];
            ctx.moveTo(dx, dy + halfLineWidth);
            ctx.lineTo(surface.roundPixel(visibleRange[0] * xx + dx) - halfLineWidth + 2 * lineWidth, dy + halfLineWidth);
            ctx.lineTo(surface.roundPixel(visibleRange[0] * xx + dx) - halfLineWidth + 2 * lineWidth, yy + dy + halfLineWidth - 3 * lineWidth);
            ctx.lineTo(surface.roundPixel(visibleRange[1] * xx + dx) + halfLineWidth - 2 * lineWidth, yy + dy + halfLineWidth - 3 * lineWidth);
            ctx.lineTo(surface.roundPixel(visibleRange[1] * xx + dx) + halfLineWidth - 2 * lineWidth, dy + halfLineWidth);
            ctx.lineTo(xx + dx, dy + halfLineWidth);
            ctx.stroke();
            halfLineWidth += lineWidth;
        }

        if (attr.handlerOpacity) {
            me.renderHandlerImage(surface, ctx, Math.round(visibleRange[0] * xx + dx), Math.round(0.5 * yy + dy));
            me.renderHandlerImage(surface, ctx, Math.round(visibleRange[1] * xx + dx), Math.round(0.5 * yy + dy));
        }
    }
});