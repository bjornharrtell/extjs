Ext.define('KitchenSink.view.IntersectionsComponent', {
    extend: 'Ext.draw.Component',
    xtype: 'intersections-component',

    // Loading PathUtil is required to be able to hit test
    // and test for path intersections in sprites.
    requires: ['Ext.draw.PathUtil'],

    isDragging: false,
    startX: 0,
    startY: 0,
    translationX: 0,
    translationY: 0,
    target: null,

    listeners: {
        element: 'element',
        scope: 'this',
        mousedown: 'onMouseDown',
        mousemove: 'onMouseMove',
        mouseup: 'onMouseUp',
        mouseleave: 'onMouseUp'
    },

    findTarget: function (sprites, x, y) {
        var me = this,
            sprite,
            i, ln;

        if (me.target) {
            me.target.setAttributes({
                strokeStyle: 'black'
            });
        }
        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            if (sprite.isPath && sprite.isPointInPath(x, y)) {
                me.target = sprite;
                return sprite;
            }
        }
    },

    onMouseDown: function (e) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(),
            xy = surface.getEventXY(e),
            x = xy[0],
            y = xy[1],
            target;

        target = me.findTarget(sprites, x, y);

        if (target) {
            target.setAttributes({
                strokeStyle: 'red'
            });
            me.isDragging = true;
            me.startX = x;
            me.startY = y;
            me.translationX = target.attr.translationX;
            me.translationY = target.attr.translationY;
        }
    },

    onMouseMove: function (e) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(),
            xy = surface.getEventXY(e),
            intersections = [],
            x = xy[0],
            y = xy[1],
            deltaX, deltaY,
            sprite, target,
            points,
            i, ln;

        if (me.isDragging) {
            deltaX = x - me.startX;
            deltaY = y - me.startY;
            me.target.setAttributes({
                translationX: me.translationX + deltaX,
                translationY: me.translationY + deltaY
            });
            for (i = 0, ln = sprites.length; i < ln; i++) {
                sprite = sprites[i];
                if (sprite !== me.target) {
                    points = me.target.getIntersections(sprite);
                    intersections.push.apply(intersections, points);
                }
            }
            me.showIntersections(intersections);
        } else {
            target = me.findTarget(sprites, x, y);
            if (target) {
                target.setAttributes({
                    strokeStyle: 'red'
                });
            }
        }
        surface.renderFrame();
    },

    onMouseUp: function (e) {
        var me = this,
            surface = me.getSurface();

        me.isDragging = false;
        me.dots.clearAll();
        surface.renderFrame();
    },

    showIntersections: function (intersections) {
        var me = this,
            i, ln, point;
        me.dots.clearAll();
        for (i = 0, ln = intersections.length; i < ln; i++) {
            point = intersections[i];
            me.dots.createInstance({
                cx: point[0],
                cy: point[1]
            });
        }
    },

    initComponent: function () {
        var me = this,
            surface = me.getSurface();
        me.callParent(arguments);
        me.dots = Ext.create('Ext.draw.sprite.Instancing', {
            template: {
                type: 'circle',
                radius: 5,
                fillStyle: 'black'
            }
        });
        surface.add(me.dots);
    }

});