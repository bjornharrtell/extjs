Ext.define('KitchenSink.view.grid.BigData', {
    extend: 'Ext.grid.Grid',
    requires: [
        'Ext.grid.plugin.Editable',
        'Ext.grid.plugin.ViewOptions',
        'Ext.grid.plugin.PagingToolbar',
        'Ext.grid.plugin.SummaryRow',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.MultiSelection',
        'KitchenSink.view.grid.BigDataRowModel',
        'KitchenSink.view.grid.BigDataController'
    ],

    controller: 'grid-bigdata',

    grouped: true,
    store: {
        model: 'Contact',
        autoLoad: true,
        groupField: 'company',
        proxy: {
            type: 'ajax',
            url: 'data/bigdata.json',
            reader: {
                rootProperty: 'results'
            }
        }
    },

    plugins: [{
        type: 'grideditable'
    }, {
        type: 'gridviewoptions'
    }, {
        type: 'gridpagingtoolbar'
    }, {
        type: 'gridsummaryrow'
    }, {
        type: 'gridcolumnresizing'
    }],

    // Instruct rows to create view models so we can use data binding
    itemConfig: {
        viewModel: {
            type: 'grid-bigdata-row'
        }
    },

    columns: [{
        text: 'Name',
        dataIndex: 'fullName',
        width: 200,
        editable: true,
        summaryType: 'count',
        summaryRenderer: 'nameSummaryRenderer'
    }, {
        text: 'Identifiers',
        xtype: 'gridheadergroup',
        columns: [{
            text: 'Email',
            dataIndex: 'email',
            width: 300,
            editable: true,
            editor: {
                xtype: 'emailfield'
            }
        }, {
            text: 'Id',
            dataIndex: 'guid',
            width: 100
        }, {
            text: '',
            width: 200,
            cell: {
                xtype: 'widgetcell',
                widget: {
                    xtype: 'button',
                    ui: 'action',
                    bind: 'Verify {record.firstName}',
                    handler: 'onVerifyTap'
                }
            }
        }]
    }, {
        text: 'Miscellaneous',
        xtype: 'gridheadergroup',
        columns: [{
            text: 'Age',
            tpl: '{age} years',
            align: 'center',
            width: 110,
            dataIndex: 'age',
            summaryType: 'average',
            cell: {
                bind: {
                    innerCls: '{ageGroup:pick("under25","under30","under35","over35")}'
                }
            },

            summaryRenderer: 'ageSummaryRenderer'
        }, {
            text: 'Gender',
            dataIndex: 'gender',
            width: 120,
            align: 'center',
            editable: true,
            editor: {
                xtype: 'selectfield',
                options: [{
                    text: 'Male',
                    value: 'Male'
                }, {
                    text: 'Female',
                    value: 'Female'
                }]
            },

            summaryType: 'genderSummaryType'
        }]
    }, {
        text: 'Company',
        dataIndex: 'company',
        width: 200,
        cell: {
            xtype: 'textcell',
            bind: '{record.company}'
        }
    }, {
        text: 'Registered',
        dataIndex: 'registered',
        width: 120,
        xtype: 'datecolumn',
        format: 'd-m-Y'
    }]
});
