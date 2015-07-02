Ext.define('Ext.draw.ContainerBase', {
    extend: 'Ext.Container',

    constructor: function(config) {
        this.callParent([config]);
        this.initAnimator();
    },

    initialize: function () {
        this.callParent();
        this.element.on('resize', 'onBodyResize', this);
    },

    getElementConfig: function () {
        return {
            reference: 'element',
            className: 'x-container',
            children: [
                {
                    reference: 'innerElement',
                    className: 'x-inner'
                }
            ]
        };
    },

    addElementListener: function() {
        var el = this.element;
        el.on.apply(el, arguments);
    },

    removeElementListener: function() {
        var el = this.element;
        el.un.apply(el, arguments);
    },

    preview: function () {
        Ext.Viewport.add({
            xtype: 'panel',
            layout: 'fit',
            modal: true,
            width: '90%',
            height: '90%',
            hideOnMaskTap: true,
            centered: true,
            scrollable: false,
            items: {
                xtype: 'image',
                mode: 'img',
                style: {
                    overflow: 'hidden'
                },
                src: this.getImage().data
            },
            listeners: {
                hide: function () {
                    Ext.Viewport.remove(this);
                }
            }
        }).show();
    }
});
