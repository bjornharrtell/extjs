/**
 * Demonstrates a simple toolbar. Some of the buttons have menus attached.
 *
 * Also demonstrates use of the BoxReorderer plugin which is in the User Extensions
 * package which allows drag/drop reordering of a box layout container.
 */
Ext.define('KitchenSink.view.toolbar.BasicToolbar', {
    extend: 'Ext.panel.Panel',
    xtype: 'basic-toolbar',
    cls: 'basic-toolbar',

    requires: [
        'Ext.ux.BoxReorderer'
    ],

    //<example>
    profiles: {
        classic: {
            width: 380,
            pasteIconCls: 'paste',
            cutIconCls: 'cut',
            copyIconCls: 'copy',
            formatIconCls: 'format',
            listIconCls: 'list',
            pasteGlyph: null,
            cutGlyph: null,
            copyGlyph: null,
            formatGlyph: null,
            listGlyph: null
        },
        neptune: {
            width: 500,
            pasteIconCls: null,
            cutIconCls: null,
            copyIconCls: null,
            formatIconCls: null,
            listIconCls: null,
            pasteGlyph: 70,
            cutGlyph: 67,
            copyGlyph: 102,
            formatGlyph: 76,
            listGlyph: 61
        },
        triton: {
            width: 560
        },
        'neptune-touch': {
            width: 620
        }
    },
    //</example>

    width: '${width}',
    height: 400,
    bodyPadding: 20,
    html: KitchenSink.DummyText.longText,

    tbar: {
        plugins: 'boxreorderer',

        items: [{
            xtype:'splitbutton',
            text:'Menu Button',
            iconCls: '${listIconCls}',
            glyph: '${listGlyph}',
            menu:[{
                text:'Menu Button 1'
            }]
        }, {
            xtype:'splitbutton',
            text:'Cut',
            iconCls: '${cutIconCls}',
            glyph: '${cutGlyph}',
            menu: [{
                text:'Cut Menu Item'
            }]
        }, {
            iconCls: '${copyIconCls}',
            glyph: '${copyGlyph}',
            text:'Copy'
        }, {
            text:'Paste',
            iconCls: '${pasteIconCls}',
            glyph: '${pasteGlyph}',
            menu:[{
                text:'Paste Menu Item'
            }]
        }, {
            iconCls: '${formatIconCls}',
            glyph: '${formatGlyph}',
            text:'Format'
        }]
    }
});
