Ext.define('KitchenSink.view.draw.SpriteEventsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sprite-events',

    onSpriteClick: function (item, event) {
        var sprite = item && item.sprite,
            color = Ext.draw.Color.create(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255
            );

        if (sprite) {
            sprite.setAttributes({
                fillStyle: color,
                strokeStyle: color
            });
            sprite.getSurface().renderFrame();
        }
    }

});