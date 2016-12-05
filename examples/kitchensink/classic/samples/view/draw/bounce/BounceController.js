/**
 * This example shows off combined use of manual and automatic animations.
 * Ext.draw.Point helper class is used for basic vector geometry.
 */
Ext.define('KitchenSink.view.draw.bounce.BounceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.draw-bounce',

    requires: ['Ext.draw.Point'],

    logo: null,
    velocity: null,
    acceleration: null,
    deceleration: 0.95,
    surface: null,

    onAfterRender: function () {
        var me = this,
            draw = me.lookupReference('draw'),
            surface = draw.getSurface(),
            logo = surface.get('logo');

        me.surface = surface;
        me.logo = logo;

        // Initial vectors of velocity and acceleration.
        me.velocity = new Ext.draw.Point(5, -3);
        me.acceleration = new Ext.draw.Point(0, 0);
        // Initial position.
        me.position = new Ext.draw.Point(logo.attr);

        // The 'onRender' method is put into the animation queue
        // and is called on every frame. This is the method where
        // we want to update the logo sprite attributes to create an
        // illusion of motion.
        Ext.AnimationQueue.start(me.onRender, me);
    },

    getGhostConfig: function () {
        var me = this,
            config;

        if (!me.ghostConfig) {
            // Can't just use the logo config,
            // as this will result in two sprites
            // with the same ID.
            config = Ext.merge({}, me.logo.config);
            delete config.id;
            me.ghostConfig = config;
        }

        return me.ghostConfig;
    },

    onRender: function () {
        var me = this,
            rect = me.surface.getRect(),
            bbox = me.logo.getBBox(true),
            bounced = false,
            p, ghost;

        if (!rect) {
            return;
        }

        // Update current position based on velocity and acceleration.
        me.position = p = me.position.add(me.velocity).add(me.acceleration);

        if (p.x + bbox.width > rect[2] || p.x < rect[0]) {
            me.velocity.setX(-me.velocity.x);
            bounced = true;
        }
        if (p.y + bbox.height > rect[3] || p.y < rect[1]) {
            me.velocity.setY(-me.velocity.y);
            bounced = true;
        }

        if (bounced) {
            // A bounce gives the logo acceleration equal to velocity.
            me.acceleration.set(me.velocity);

            ghost = me.surface.add(me.getGhostConfig());
            // Set initial state of the ghost.
            // This change to attributes is instantaneous.
            ghost.setAttributes({
                x: me.logo.attr.x,
                y: me.logo.attr.y,
                opacity: 0.3
            });
            // Configure the animation modifier of the sprite.
            ghost.fx.setConfig({
                duration: 500,
                easing: 'easeOut'
            });
            // Set the target state of the ghost.
            // This change will happen over time.
            // The scale and opacity of the ghost will be updated on every frame
            // automatically using the specified easing function.
            ghost.setAttributes({
                scale: 2,
                opacity: 0
            });
            // Remove the sprite from the surface when the animation is done.
            ghost.fx.on('animationend', function () {
                ghost.remove();
            });
        } else {
            // Decrease the logo's acceleration on every move after a bounce.
            if (me.acceleration.length > 1) {
                me.acceleration = me.acceleration.mul(me.deceleration);
            } else {
                me.acceleration.set(0);
            }
        }

        // The logo sprite does not have its animation modifier configured
        // (animation duration defaults to zero) and so all changes to
        // sprite's attributes are instantaneous. But since position is
        // updated on every frame, the illusion of motion is created.
        me.logo.setAttributes({
            x: p.x,
            y: p.y
        });

        me.surface.renderFrame();

    },

    destroy: function () {
        Ext.AnimationQueue.stop(this.onRender, this);
        this.callParent();
    }

});