Ext.define('KitchenSink.view.draw.CompositeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.draw-composite',

    animate: false,

    onMouseDown: function (e) {
        var draw = this.lookupReference('draw'),
            surface = draw.getSurface(),
            sprite = surface.get('protractor'),
            xy = surface.getEventXY(e);

        if (this.animate) {
            sprite.setAttributes({
                toX: xy[0],
                toY: xy[1]
            });
        } else {
            sprite.setAttributes({
                fromX: xy[0],
                fromY: xy[1]
            });
        }
        surface.renderFrame();
    },

    onMouseMove: function (e) {
        var draw = this.lookupReference('draw'),
            surface = draw.getSurface(),
            xy = surface.getEventXY(e);

        if (!this.animate) {
            surface.get('protractor').setAttributes({
                toX: xy[0],
                toY: xy[1]
            });
            surface.renderFrame();
        }
    },

    onToggle: function (segmentedButton, button, pressed) {
        var draw = this.lookupReference('draw'),
            surface = draw.getSurface(),
            sprite = surface.get('protractor'),
            value = segmentedButton.getValue();

        this.animate = value === 1;

        sprite.setAttributes({
            fromX: 325,
            fromY: 250,
            toX: 400,
            toY: 150
        });
        sprite.fx.setConfig({
            duration: this.animate ? 500 : 0,
            easing: 'easeInOut'
        });
        surface.renderFrame();
    }

});