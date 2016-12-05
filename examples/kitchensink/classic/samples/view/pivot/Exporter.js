/**
 *
 * This example shows how to create a pivot grid and export the results to various Exporters.
 *
 */
Ext.define('KitchenSink.view.pivot.Exporter', {
    extend: 'Ext.pivot.Grid',
    xtype: 'exporter-pivot-grid',
    controller: 'pivotexport',

    requires: [
        'KitchenSink.view.pivot.ExporterController',
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.Exporter'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/ExporterController.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/pivot/Sale.js'
    },{
        type: 'Store',
        path: 'classic/samples/store/pivot/Sales.js'
    }],
    profiles: {
        classic: {
            width: 600
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    title: 'Pivot Grid with Exporter plugin',
    width: '${width}',
    height: 350,
    collapsible: true,
    multiSelect: true,

    selModel: {
        type: 'spreadsheet'
    },

    plugins: [{
        ptype: 'pivotexporter'
    }],

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum',
            exportStyle: [{
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            }, {
                type: 'html',
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                },
                font: {
                    bold: true,
                    italic: true
                }
            }]
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex: 'person',
            header: 'Person'
        }, {
            dataIndex: 'company',
            header: 'Company',
            sortable: false
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }, {
            dataIndex: 'country',
            header: 'Country'
        }]
    },

    listeners: {
        // this event notifies us when the document was saved
        documentsave: 'onDocumentSave',
        beforedocumentsave: 'onBeforeDocumentSave'
    },

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Export to ...',
            menu: {
                items: [{
                    text:   'Excel xlsx (all items)',
                    handler: 'exportAllToXlsx'
                },{
                    text:   'Excel xlsx (visible items)',
                    handler: 'exportVisibleToXlsx'
                },{
                    text: 'Excel xml (all items)',
                    handler: 'exportAllToXml'
                },{
                    text:   'Excel xml (visible items)',
                    handler: 'exportVisibleToXml'
                },{
                    text:   'CSV (all items)',
                    handler: 'exportAllToCSV'
                },{
                    text:   'CSV (visible items)',
                    handler: 'exportVisibleToCSV'
                },{
                    text:   'TSV (all items)',
                    handler: 'exportAllToTSV'
                },{
                    text:   'TSV (visible items)',
                    handler: 'exportVisibleToTSV'
                },{
                    text:   'HTML (all items)',
                    handler: 'exportAllToHtml'
                },{
                    text:   'HTML (visible items)',
                    handler: 'exportVisibleToHtml'
                }]
            }
        }]
    }
});
