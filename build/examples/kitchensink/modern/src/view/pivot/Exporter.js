/**
 *
 * This example shows how to create a pivot grid and export the results to Excel.
 *
 */
Ext.define('KitchenSink.view.pivot.Exporter', {
    extend: 'Ext.pivot.Grid',

    requires: [
        'KitchenSink.view.pivot.ExporterController',
        'KitchenSink.store.Sales',
        'Ext.pivot.plugin.Exporter'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/pivot/ExporterController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Sales.js'
    }],
    // </example>
    
    controller: 'kspivotexcelexport',

    plugins: [{
        type: 'pivotexporter'
    }],

    cls: 'demo-solid-background',

    shadow: true,

    matrix: {
        type: 'local',
        store: {
            type: 'sales'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Total',
            aggregator: 'sum',
            width:      120,
            exportStyle: [{
                // no type key is defined here which means that this is the default style
                // that will be used by all exporters
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            },{
                // the type key means that this style will only be used by the html exporter
                // and for all others the default one, defined above, will be used
                type: 'html',
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                },
                font: {
                    italic: true,
                    bold: true
                }
            }]
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person',
            width:      120
        },{
            dataIndex:  'company',
            header:     'Company',
            sortable:   false
        }],

        /**
         * Configure the top axis dimensions that will be used to generate the columns.
         * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
         * are defined then each top axis result will have in the end a column header with children
         * columns for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex:  'year',
            header:     'Year'
        }, {
            dataIndex:  'country',
            header:     'Country'
        }]
    },

    listeners: {
        // this event notifies us when the document was saved
        documentsave: 'onDocumentSave',
        beforedocumentsave: 'onBeforeDocumentSave'
    },

    items: [{
        docked: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Export to ...',
            handler: 'exportTo'
        }]
    }]
});
