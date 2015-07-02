/**
 * Demonstrates a simple toolbar. Some of the buttons have menus attached.
 */
Ext.define('KitchenSink.view.toolbar.BasicToolbar', {
    extend: 'Ext.panel.Panel',
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    //<example>
    exampleTitle: 'Basic Toolbar',
    profiles: {
        classic: {
            width: 380,
            pasteIconCls: 'paste',
            cutIconCls: 'cut',
            copyIconCls: 'copy',
            formatIconCls: 'format',
            listIconCls: 'list'
        },
        neptune: {
            width: 500,
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

    height: 400,

    html: KitchenSink.DummyText.longText,
    bodyPadding: 20,

    initComponent: function() {
        this.width = this.profileInfo.width;

        this.tbar = [{
            xtype:'splitbutton',
            text:'Menu Button',
            iconCls: this.profileInfo.listIconCls,
            glyph: this.profileInfo.listGlyph,
            menu:[{
                text:'Menu Button 1'
            }]
        }, '-', {
            xtype:'splitbutton',
            text:'Cut',
            iconCls: this.profileInfo.cutIconCls,
            glyph: this.profileInfo.cutGlyph,
            menu: [{
                text:'Cut Menu Item'
            }]
        }, {
            iconCls: this.profileInfo.copyIconCls,
            glyph: this.profileInfo.copyGlyph,
            text:'Copy'
        }, {
            text:'Paste',
            iconCls: this.profileInfo.pasteIconCls,
            glyph: this.profileInfo.pasteGlyph,
            menu:[{
                text:'Paste Menu Item'
            }]
        }, '-', {
            iconCls: this.profileInfo.formatIconCls,
            glyph: this.profileInfo.formatGlyph,
            text:'Format'
        }];
        this.callParent();
    }
});