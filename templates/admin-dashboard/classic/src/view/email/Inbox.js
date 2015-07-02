Ext.define('Admin.view.email.Inbox', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.emailinbox',

    cls: 'email-inbox-panel shadow-panel',

    viewModel: {
        type: 'emailinbox'
    },

    bind: {
        store: '{EmailInbox}'
    },

    viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true
    },

    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true,
        showHeaderCheckbox: true
    },

    listeners: {
        cellclick: 'onGridCellItemClick'
    },

    headerBorders: false,
    rowLines: false,

    columns: [
        {
            dataIndex: 'favorite',
            menuDisabled: true,
            text: '<span class="x-fa fa-heart"></span>',
            width: 40,
            renderer: function(value) {
                return '<span class="x-fa fa-heart'+ (value ? '' : '-o') +'"></span>';
            }
        },
        {
            dataIndex: 'from',
            text: 'From',
            width: 140
        },
        {
            dataIndex: 'title',
            text: 'Title',
            flex: 1
        },
        {
            dataIndex: 'has_attachments',
            text: '<span class="x-fa fa-paperclip"></span>',
            width: 40,
            renderer: function(value) {
                return value ? '<span class="x-fa fa-paperclip"></span>' : '';
            }
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'received_on',
            width: 90,
            text: 'Received'
        }
    ]
});
