Ext.define('KitchenSink.view.grid.BigData', {
    extend: 'Ext.grid.Grid',
    requires: [
        'Ext.grid.plugin.Editable',
        'Ext.grid.plugin.ViewOptions',
        'Ext.grid.plugin.PagingToolbar',
        'Ext.grid.plugin.SummaryRow',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.MultiSelection',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.Exporter',
        'KitchenSink.view.grid.BigDataRowModel',
        'KitchenSink.view.grid.BigDataController',
        'KitchenSink.model.Employee'
    ],

    cls: 'demo-solid-background',

    shadow: true, 

    controller: 'grid-bigdata',

    grouped: true,

    rowLines: true,

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'modern/src/view/grid/BigDataController.js'
        },
        {
            type: 'RowModel',
            path: 'modern/src/view/grid/BigDataRowModel.js'
        },
        {
            type: 'Model',
            path: 'modern/src/model/Employee.js'
        }
    ],
    // </example>
    store: {
        model: 'Employee',
        autoLoad: true,
        groupField: 'department',
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/BigData'
        }
    },

    plugins: [{
        type: 'grideditable'
    }, {
        type: 'gridviewoptions'
    }, {
        type: 'pagingtoolbar'
    }, {
        type: 'summaryrow'
    }, {
        type: 'columnresizing'
    }, {
        type: 'rowexpander'
    },{
        type: 'gridexporter'
    }],

    listeners: {
        documentsave: 'onDocumentSave',
        beforedocumentsave: 'onBeforeDocumentSave'
    },

    items: [{
        docked: 'top',
        xtype: 'toolbar',
        shadow: false,
        items: [{
            xtype: 'button',
            text: 'Export to ...',
            handler: 'exportTo'
        }]
    }],

    // Instruct rows to create view models so we can use data binding
    itemConfig: {
        viewModel: {
            type: 'grid-bigdata-row'
        },
        body: {
            tpl: '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
        }
    },

    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Id',
            dataIndex: 'employeeNo',
            flex: 1,
            minWidth: 100,
            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        },
        {
            text: 'Name',
            dataIndex: 'fullName',
            minWidth: 150
        },
        {
            xtype: 'checkcolumn',
            headerCheckbox: true,
            dataIndex: 'verified',
            text: 'Verified'
        },
        {
            xtype: 'gridheadergroup',
            text: 'Ratings',
            columns: [{
                text: 'Avg',
                xtype: 'numbercolumn',
                dataIndex: 'averageRating',
                width: 75,
                cell: {
                    cls: 'big-data-ratings-cell',
                    bind: {
                        innerCls: '{ratingGroup:pick("under4","under5","under6","over6")}'
                    }
                }
            }, {
                text: 'All',
                dataIndex: 'rating',
                ignoreExport: true,
                cell: {
                    xtype: 'widgetcell',
                    forceWidth: true,
                    widget: {
                        xtype: 'sparklineline'
                    }
                }
            }]
        },
        {
            text: 'Date of Birth',
            dataIndex: 'dob',
            editable: true,
            xtype: 'datecolumn',
            format: 'd-m-Y',
            // you can define an export style for a column
            // you can set alignment, format etc
            exportStyle: [{
                // no type key is defined here which means that this is the default style
                // that will be used by all exporters
                format: 'Medium Date',
                alignment: {
                    horizontal: 'Right'
                }
            },{
                // the type key means that this style will only be used by the csv exporter
                // and for all others the default one, defined above, will be used
                type: 'csv',
                format: 'Short Date'
            }]
        },
        {
            text: '',
            width: 100,
            ignoreExport: true,
            cell: {
                xtype: 'widgetcell',
                widget: {
                    xtype: 'button',
                    ui: 'action',
                    bind: 'Verify {record.firstName}',
                    handler: 'onVerifyTap'
                }
            }
        },
        {
            text: 'Join Date',
            dataIndex: 'joinDate',
            editable: true,
            xtype: 'datecolumn',
            format: 'd-m-Y',
            exportStyle: {
                format: 'Medium Date',
                alignment: {
                    horizontal: 'Right'
                }
            }
        },
        {
            text: 'Notice Period',
            dataIndex: 'noticePeriod',
            editable: true
        },
        {
            text: 'Email',
            dataIndex: 'email',
            editable: true,
            editor: {
                xtype: 'emailfield'
            },
            width: 250
        },
        {
            text: 'Absences',
            xtype: 'headergroup',
            columns: [{
                text: 'Illness',
                dataIndex: 'sickDays',
                align: 'center',
                summaryType: 'sum'
            }, {
                text: 'Holidays',
                dataIndex: 'holidayDays',
                align: 'center',
                summaryType: 'sum'
            }, {
                text: 'Holiday Allowance',
                dataIndex: 'holidayAllowance',
                align: 'center',
                summaryType: 'sum',
                summaryFormatter: 'number("0.00")',
                formatter: 'number("0.00")'
            }]
        },
        {
            text: 'Salary',
            dataIndex: 'salary',
            renderer: Ext.util.Format.usMoney,
            editable: true,
            width: 150,
            summaryType: 'sum',
            summaryRenderer: 'salarySummaryRenderer',
            exportStyle: {
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }
    ]
});
