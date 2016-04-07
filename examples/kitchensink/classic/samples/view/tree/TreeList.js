/**
 * This example demonstrates the treelist widget.
 */
Ext.define('KitchenSink.view.tree.TreeList', {
    extend: 'Ext.panel.Panel',
    xtype: 'tree-list',
    width: 500,
    height: 450,
    //<example>
    requires: [
        'Ext.list.Tree',
        'Ext.list.TreeItem'
    ],
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/tree/TreeListController.js'
    }, {
        type: 'ViewModel',
        path: 'classic/samples/view/tree/TreeListModel.js'
    }, {
        type: 'Sass',
        path: 'classic/sass/src/view/tree/TreeList.scss'
    }],
    //</example>
    title: 'TreeList',
    controller: 'tree-list',

    iconCls: 'fa fa-gears',
    layout: 'border',

    viewModel: {
        type: 'tree-list'
    },

    header: {
        items: [{
            xtype: 'button',
            text: 'Options',
            menu: [{
                text: 'Expander Only',
                checked: true,
                handler: 'onToggleConfig',
                config: 'expanderOnly'
            }, {
                text: 'Single Expand',
                checked: false,
                handler: 'onToggleConfig',
                config: 'singleExpand'
            }]
        },{
            xtype: 'button',
            text: 'Nav',
            enableToggle: true,
            reference: 'navBtn',
            toggleHandler: 'onToggleNav'
        },{
            xtype: 'button',
            text: 'Micro',
            enableToggle: true,
            toggleHandler: 'onToggleMicro'
        }]
    },

    items: [{
        region: 'west',
        width: 250,
        split: true,
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{navItems}'
        }]
    }, {
        region: 'center',
        bodyPadding: 10,
        bind: {
            html: '{selectionText}'
        }
    }]
});
