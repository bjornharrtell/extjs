Ext.define('Admin.view.search.Results', {
    extend: 'Ext.tab.Panel',
    xtype: 'searchresults',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],

    controller: 'searchresults',
    viewModel: {
        type: 'searchresults'
    },

    cls: 'shadow',
    activeTab: 0,
    margin: 20,

    items: [
        {
            xtype: 'gridpanel',
            cls: 'allRecordsCls',
            scrollable: false,
            hideHeaders: true,
            border: false,
            title: 'All',
            routeId: 'all',
            bind: '{allResults}',
            viewConfig: {
                preserveScrollOnRefresh: true,
                stripeRows: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex) {
                        var page = "<div class='resultsItemCls'><div class='resultsTitleCls'>"+record.data.title+"</div><div class='resultsUrlCls'><a href='#'>"+record.data.url+"</a></div><div class='resultsContentCls'>"+record.data.content+"</div></div>";
                        if (rowIndex === 3) {
                            page = "<div class='imageRowCls'>" +
                                "<img src='resources/images/img1.jpg' alt='Dandelion' " +
                                    "class='search-result-attachment'>" +
                                "<img src='resources/images/img2.jpg' alt='Landscape' " +
                                    "class='search-result-attachment'>" +
                                "</div>";
                        }
                        return page;
                    },
                    dataIndex: 'content',
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    bind: '{allResults}'
                }
            ]
        },

        {
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: 'User Results',
            routeId: 'user',
            bind: '{usersResults}',
            scrollable: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 40,
                    dataIndex: 'identifier',
                    text: '#'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value) {
                        return "<img src='resources/images/user-profile/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                    },
                    width: 75,
                    dataIndex: 'profile_pic',
                    text: 'User'
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'fullname',
                    text: 'Name',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'email',
                    text: 'Email',
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    cls: 'content-column',
                    width: 120,
                    dataIndex: 'joinDate',
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    dataIndex: 'subscription',
                    text: 'Subscription',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-pencil'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-close'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-ban'
                        }
                    ],

                    cls: 'content-column',
                    width: 120,
                    dataIndex: 'bool',
                    text: 'Actions',
                    tooltip: 'edit '
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'userPaginationToolbar',
                    displayInfo: true,
                    bind: '{usersResults}'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'email-inbox-panel',
            itemId: 'messagesGrid',
            hideHeaders: true,
            title: 'Messages',
            routeId: 'messages',
            bind: '{inboxResults}',
            scrollable: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value) {
                        if(value) {
                            return '<span class="x-fa fa-heart"></span>';
                        }
                        return '<span class="x-fa fa-heart-o"></span>';

                    },
                    width: 45,
                    dataIndex: 'favorite'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'from',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'title',
                    flex: 2
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value) {
                        return value ? '<span class="x-fa fa-paperclip"></span>' : '';
                    },
                    dataIndex: 'has_attachments'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'received_on'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'pagingToolbar',
                    prependButtons: true,
                    bind: '{inboxResults}'
                }
            ]
        }
    ]
});
