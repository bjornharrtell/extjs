/**
 * This class is a custom component with several configs used by the widgets panel. It
 * displays a picture centered in a larger box with a description below it and a styled
 * top-half banner area. Optionally a footer component can be provided.
 */
Ext.define('Admin.view.widgets.BioTile', {
    extend: 'Ext.Container',
    xtype: 'biotile',

    cls: 'bio-tile',

    requires: [
        'Ext.Img'
    ],

    layout: 'fit',

    config: {
        /**
         * @cfg {String/Object} banner
         * The configuration of the top-half of this tile. This can be a URL or a config
         * object.
         *
         *      tile.setBanner('url/to/image.png');
         *
         *      tile.setBanner({
         *          style: 'backgroundColor: blue'
         *      });
         */
        banner: null,

        /**
         * @cfg {Object/Ext.Component} footer
         * The component configuration to attach to the bottom of this tile.
         */
        footer: null,

        /**
         * @cfg {String} image
         * The URL for the picture to display in this tile.
         */
        image: null,

        /**
         * @cfg {String} description
         * The HTML text to display below the picture in this tile.
         */
        description: null
    },

    referenceHolder: true, // all logic is our updaters, we'll hold the refs (no controller)

    items: [{
        xtype: 'container',
        layout: 'vbox',
        width: '100%',
        height: '100%',

        items: [{
            xtype: 'image',
            reference: 'banner',
            userCls: 'bio-banner',
            width: '100%',
            height: '100%',
            flex: 1,
            html: '&#160;'
        }, {
            xtype: 'container',
            reference: 'bottomContainer',
            layout: 'vbox',
            flex: 1,

            items: [{
                xtype: 'component',
                reference: 'description',
                userCls: 'bio-description',
                flex: 1
            }]
        }]
    },{
        xtype: 'image',
        reference: 'image',
        left: '50%',
        top: '50%',
        userCls: 'bio-image'
    }],

    updateBanner: function (value) {
        this.configureImage('banner', value);
    },

    updateDescription: function (value) {
        var description = this.lookup('description');

        description.setHtml(value);
    },

    updateImage: function (value) {
        this.configureImage('image', value);
    },

    updateFooter: function (footer) {
        var container = this.lookup('bottomContainer'),
            items = container.getItems(),
            was = (items.length > 1) ? items.getAt(1) : null,
            now;

        now = Ext.factory(footer, null, was);

        if (now !== was) {
            if (now) {
                container.add(now);
            }
        }
    },

    privates: {
        configureImage: function (ref, config) {
            var image = this.lookup(ref),
                obj = config;

            if (typeof config === 'string') {
                obj = {
                    src: config
                };
            }

            image.setConfig(obj);
        }
    }
});
