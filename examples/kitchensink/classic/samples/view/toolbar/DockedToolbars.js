/**
 * Demonstrates a the docking of toolbars in each dimension on a panel.
 */
Ext.define('KitchenSink.view.toolbar.DockedToolbars', {
    extend: 'Ext.container.Container',
    xtype: 'docked-toolbars',
    cls: 'docked-toolbars',
    
    //<example>
    profiles: {
        classic: {
            listCls: 'list',
            closeCls: 'close',
            pasteCls: 'paste',
            editCls: 'edit',
            listGlyph: null,
            closeGlyph: null,
            pasteGlyph: null,
            editGlyph: null
        },
        neptune: {
            listCls: null,
            closeCls: null,
            pasteCls: null,
            editCls: null,
            listGlyph: 61,
            closeGlyph: 88,
            pasteGlyph: 70,
            editGlyph: 47
        }
    },
    //</example>

    width: 480,
    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 10px;' }
    },

    defaults: {
        xtype: 'panel',
        height: 220,
        width: 220,
        bodyPadding: 10
    },

    items: [{
        title: 'Top',
        xtype: 'panel',
        html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',

            items: [{
                iconCls: '${listCls}',
                glyph: '${listGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${closeCls}',
                glyph: '${closeGlyph}',
                xtype: 'button'
            }, {
                iconCls: '${pasteCls}',
                glyph: '${pasteGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${editCls}',
                glyph: '${editGlyph}',
                xtype: 'button'
            }]
        }]
    }, {
        title: 'Right',
        xtype: 'panel',
        html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'right',

            items: [{
                iconCls: '${listCls}',
                glyph: '${listGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${closeCls}',
                glyph: '${closeGlyph}',
                xtype: 'button'
            }, {
                iconCls: '${pasteCls}',
                glyph: '${pasteGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${editCls}',
                glyph: '${editGlyph}',
                xtype: 'button'
            }]
        }]
    }, {
        title: 'Left',
        xtype: 'panel',
        html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'left',

            items: [{
                iconCls: '${listCls}',
                glyph: '${listGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${closeCls}',
                glyph: '${closeGlyph}',
                xtype: 'button'
            }, {
                iconCls: '${pasteCls}',
                glyph: '${pasteGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${editCls}',
                glyph: '${editGlyph}',
                xtype: 'button'
            }]
        }]
    }, {
        title: 'Bottom',
        xtype: 'panel',
        html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',

            items: [{
                iconCls: '${listCls}',
                glyph: '${listGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${closeCls}',
                glyph: '${closeGlyph}',
                xtype: 'button'
            }, {
                iconCls: '${pasteCls}',
                glyph: '${pasteGlyph}',
                xtype: 'button'
            }, '-', {
                iconCls: '${editCls}',
                glyph: '${editGlyph}',
                xtype: 'button'
            }]
        }]
    }]
});
