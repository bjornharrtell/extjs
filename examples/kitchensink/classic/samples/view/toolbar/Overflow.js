/**
 * This example demonstrates the Toolbar's two different modes of handling overflow:
 *
 * - "menu": buttons that don't fit on the toolbar are rendered into an overflow menu
 * - "scroller": scroller buttons are rendered on either side of the toolbar for scrolling
 * overflowing items into view.
 */
Ext.define('KitchenSink.view.toolbar.Overflow', {
    extend: 'Ext.panel.Panel',
    xtype: 'toolbar-overflow',
    id: 'toolbar-overflow',
    //<example>
    exampleTitle: 'Toolbar Overflow Handling',
    profiles: {
        classic: {
            width: 380,
            height: 190
        },
        neptune: {
            width: 475,
            height: 244
        },
        triton: {
            width: 555,
            height: 305
        },
        'neptune-touch': {
            width: 620,
            height: 305
        }
    },
    //</example>

    html: KitchenSink.DummyText.longText,
    bodyPadding: 20,

    initComponent: function() {
        var buttons = [{
            xtype: 'splitbutton',
            text: 'Menu',
            iconCls: 'toolbar-overflow-list',
            menu:[{
                text:'Menu Button 1'
            }]
        }, '-', {
            xtype: 'splitbutton',
            text: 'Cut',
            iconCls: 'toolbar-overflow-cut',
            menu: [{
                text:'Cut Menu Item'
            }]
        }, {
            iconCls: 'toolbar-overflow-copy',
            text:'Copy'
        }, {
            text: 'Paste',
            iconCls: 'toolbar-overflow-paste',
            menu:[{
                text:'Paste Menu Item'
            }]
        }, {
            iconCls: 'toolbar-overflow-format',
            text: 'Format'
        }, {
            iconCls: 'toolbar-overflow-bold',
            text: 'Bold'
        }, {
            iconCls: 'toolbar-overflow-underline',
            text: 'Underline',
            menu: [{
                text: 'Solid'
            }, {
                text: 'Dotted'
            }, {
                text: 'Dashed'
            }]
        }, {
            iconCls: 'toolbar-overflow-italic',
            text: 'Italic'
        }];

        this.width = this.profileInfo.width;
        this.height = this.profileInfo.height;

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            overflowHandler: 'menu',
            items: buttons
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            overflowHandler: 'scroller',
            items: buttons
        }, {
            xtype: 'toolbar',
            dock: 'right',
            overflowHandler: 'scroller',
            items: buttons
        }];

        this.callParent();
    }
});