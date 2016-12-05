/**
 * Demonstrates the {@link Ext.Menu} component
 */
Ext.define('KitchenSink.view.Menus', {
    extend: 'Ext.Panel',
    requires: ['Ext.Menu'],

    cls: 'demo-solid-background',
    shadow: true,
    padding: 20,
    scrollable: true,
    defaults: {
        xtype : 'button',
        cls   : 'demobtn',
        margin: '10 0'
    },
    items: [
        {
            xtype: 'component',
            styleHtmlContent: true,
            html: [
                '<b>Ext.Menu</b> is a component which allows you to easily display sliding',
                'menus from any side of the screen.<br /><br />You can show the menus by either tapping the buttons below,',
                'or by swiping from the edge of the screen.'
            ].join('')
        },
        {
            text: 'Toggle left menu (reveal)',
            handler: function() {
                Ext.Viewport.toggleMenu('left');
            }
        },
        {
            text: 'Toggle right menu (reveal)',
            handler: function() {
                Ext.Viewport.toggleMenu('right');
            }
        },
        {
            text: 'Toggle top menu (cover)',
            handler: function() {
                Ext.Viewport.toggleMenu('top');
            }
        },
        {
            text: 'Toggle bottom menu (slide)',
            handler: function() {
                Ext.Viewport.toggleMenu('bottom');
            }
        }
    ],

    initialize: function() {
        Ext.Viewport.setMenu(this.getMenuCfg('top'), {
            side: 'top'
        });

        Ext.Viewport.setMenu(this.getMenuCfg('bottom'), {
            side: 'bottom',
            cover: false
        });

        Ext.Viewport.setMenu(this.getMenuCfg('left'), {
            side: 'left',
            reveal: true
        });

        Ext.Viewport.setMenu(this.getMenuCfg('right'), {
            side: 'right',
            reveal: true
        });
    },

    doDestroy: function() {
        Ext.Viewport.removeMenu('left');
        Ext.Viewport.removeMenu('right');
        Ext.Viewport.removeMenu('bottom');
        Ext.Viewport.removeMenu('top');
        this.callParent();
    },

    getMenuCfg: function(side) {
        return {
            items: [{
                text: 'Settings',
                iconCls: 'x-fa fa-gear',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                }
            }, {
                text: 'New Item',
                iconCls: 'x-fa fa-pencil',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                }
            }, {
                xtype: 'button',
                text: 'Star',
                iconCls: 'x-fa fa-star',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                }
            }]
        };
    }
});
