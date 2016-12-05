Ext.define('FeedViewer.view.entry.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'entrylist',
    controller: 'entrylist',

    requires: [
        'Ext.ux.PreviewPlugin'
    ],

    cls: 'entry-grid',

    viewConfig: {
        itemId: 'view',
        plugins: [{
            id: 'preview',
            ptype: 'preview',
            bodyField: 'contentSnippet',
            expanded: true
        }]
    },

    listeners: {
        reconfigure: 'onReconfigure',
        rowdblclick: 'onRowDblClick'
    },

    hideHeaders: true,
    columns: [{
        text: 'Title',
        dataIndex: 'title',
        flex: 1,
        renderer: 'formatTitle'
    }, {
        text: 'Author',
        dataIndex: 'author',
        hidden: true,
        flex: 1
    }, {
        text: 'Date',
        xtype: 'datecolumn',
        dataIndex: 'publishedDate',
        dateFormat: 'Y/m/d g:i a',
        hidden: true,
        renderer: 'formatDate',
        width: 120
    }],

    tbar: [
        {
            iconCls: 'open-all x-fa fa-files-o',
            text: 'Open All',
            action: 'openAll'
        },
        {
            xtype: 'cycle',
            text: 'Reading Pane',
            reference: 'regionCycler',
            action: 'cyclePreview',
            prependText: 'Preview: ',
            showText: true,
            listeners: {
                change: 'onRegionCycleChange'
            },
            menu: {
                id: 'reading-menu',
                items: [{
                    text: 'Bottom',
                    cycleRegion: 'south',
                    iconCls: 'preview-bottom x-fa fa-toggle-down'
                }, {
                    text: 'Right',
                    cycleRegion: 'east',
                    iconCls: 'preview-right x-fa fa-toggle-right'
                }, {
                    text: 'Hidden',
                    cycleRegion: 'hidden',
                    checked: true,
                    iconCls: 'preview-hide x-fa fa-square-o'
                }]
            }
        },
        {
            text: 'Summary',
            iconCls: 'summary x-fa fa-bars',
            enableToggle: true,
            pressed: true,
            toggleHandler: 'onSummaryToggle'
        }
    ]
});
