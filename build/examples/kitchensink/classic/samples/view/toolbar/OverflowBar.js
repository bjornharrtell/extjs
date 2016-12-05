Ext.define('KitchenSink.view.toolbar.OverflowBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'toolbar-overflowbar',

    items: [{
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
    }]
});
