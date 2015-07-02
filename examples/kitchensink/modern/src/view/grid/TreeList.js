Ext.define('KitchenSink.view.grid.TreeList', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.list.Tree',
        'Ext.list.TreeItem'
    ],

    //<example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/grid/TreeListModel.js'
    }, {
        type: 'Controller',
        path: 'modern/src/view/grid/TreeListController.js'
    }],
    //</example>
    xtype: 'tree-list',
    title: 'TreeList',
    controller: 'tree-list',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        type: 'tree-list'
    },

    items: [{
        xtype: 'container',
        flex: 1,
        scrollable: 'y',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            border: false,
            items: [{
                xtype: 'segmentedbutton',
                allowMultiple: true,
                items: [{
                    text: 'Nav',
                    reference: 'navBtn'
                }, {
                    text: 'Micro'
                }],
                listeners: {
                    toggle: 'onModeToggle'
                }
            }]
        }, {
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{navItems}'
        }]
    }, {
        xtype: 'component',
        cls: 'treelist-log',
        padding: 10,
        height: 50,
        bind: {
            html: '{selectionText}'
        }
    }]
});