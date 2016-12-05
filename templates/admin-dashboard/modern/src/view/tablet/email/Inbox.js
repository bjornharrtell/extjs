Ext.define('Admin.view.tablet.email.Inbox', {
    extend: 'Ext.grid.Grid',
    // xtype is assigned by the tablet profile

    requires: [
        'Ext.grid.plugin.MultiSelection'
    ],

    itemConfig: {
        viewModel: true,
        bind: {
            userCls: 'inbox-{record.read:pick("unread","read")}'
        }
    },

    plugins: {
        type: 'multiselection',

        selectionColumn: {
            hidden: false,
            width: 40  // Change column width from the default of 60px
        }
    },

    rowLines: false,
    striped: false,

    columns: [
        {
            text: '<span class="x-fa fa-heart"></span>',
            menuDisabled: true,
            width: 36,
            dataIndex: 'favorite',
            userCls: 'inbox-favorite-icon',
            align: 'center',
            cell: {
                align: 'center',
                bind: {
                    innerCls: 'x-fa {record.favorite:pick("fa-heart-o", "fa-heart inbox-favorite-icon")}'
                }
            },
            renderer: function(){
                // Return nothing so the boolean value is not published
                // The column remains sortable, while still displaying the image
                return '';
            }
        },
        {
            text: 'From',
            dataIndex: 'from',
            width: 150,
            cell: {
                innerCls: 'inbox-from'
            }
        },
        {
            text: 'Title',
            dataIndex: 'title',
            flex: 1,
            cell: {
                innerCls: 'inbox-title'
            }
        },
        {
            text: '<span class="x-fa fa-paperclip"></span>',
            width: 40,
            align: 'center',
            dataIndex: 'has_attachments',
            cell: {
                align: 'center',
                bind: {
                    innerCls: 'x-fa {record.has_attachments:pick("", "fa-paperclip")}'
                }
            },
            renderer: function(){
                // Return nothing so the boolean value is not published
                // The column remains sortable, while still displaying the image
                return '';
            }
        },
        {
            text: 'Received',
            xtype: 'datecolumn',
            format:'Y-m-d',
            dataIndex: 'received_on',
            width: 90
        }
    ]
});
