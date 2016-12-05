Ext.define('KitchenSink.view.navigation.Tree', {
    extend: 'Ext.tree.Panel',

    xtype: 'navigation-tree',
    id: 'navigation-tree',

    title: 'Examples',
    rootVisible: false,
    lines: false,
    useArrows: true,
    hideHeaders: true,
    collapseFirst: false,
    width: 250,
    minWidth: 100,
    height: 200,
    split: true,
    stateful: true,
    stateId: 'mainnav.west',
    collapsible: true,
    enableColumnResize: false,
    enableColumnMove: false,
    
    bufferedRenderer: !Ext.platformTags.test,

    tools: [{
        type: 'up',
        tooltip: 'Switch to Breadcrumb View \u2325N',
        listeners: {
            click: 'showBreadcrumbNav'
        }
    }],

    columns: [{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text',
        scope: 'controller',
        renderer: 'treeNavNodeRenderer'
    }],
    bind: {
        selection: '{selectedView}'
    },

    viewConfig: {
        selectionModel: {
            type: 'treemodel',
            pruneRemoved: false
        }
    },

    keyMap: {
        "ALT+N": 'showBreadcrumbNav',
        scope: 'controller'
    },

    store: 'navigation',

    dockedItems: [{
        xtype: 'textfield',
        reference: 'navtreeFilter',
        dock: 'top',
        emptyText: 'Search',

        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: 'onNavFilterClearTriggerClick',
                hidden: true,
                scope: 'controller'
            },
            search: {
                cls: 'x-form-search-trigger',
                weight: 1,
                handler: 'onNavFilterSearchTriggerClick',
                scope: 'controller'
            }
        },

        listeners: {
            change: 'onNavFilterFieldChange',
            buffer: 300
        }
    }]
});
