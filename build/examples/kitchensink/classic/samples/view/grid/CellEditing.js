/**
 * This example shows how to enable inline editing of grid cells.
 *
 * Note that cell editing is ideal for mouse/keyboard users and is not
 * recommended on touch devices.
 */
Ext.define('KitchenSink.view.grid.CellEditing', {
    extend: 'Ext.grid.Panel',
    xtype: 'cell-editing',
    controller: 'cell-editing',

    requires: [
        'Ext.selection.CellModel'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/CellEditingController.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/grid/Plant.js'
    }],
    profiles: {
        classic: {
            width: 600,
            height: 300,
            indoorWidth: 55,
            priceWidth: 70,
            availableWidth: 95
        },
        neptune: {
            width: 680,
            height: 350,
            indoorWidth: 90,
            priceWidth: 70,
            availableWidth: 95
        },
        'neptune-touch': {
            priceWidth: 115,
            availableWidth: 120
        }
    },
    //</example>

    title: 'Cell Editing Plants',
    width: '${width}',
    height: '${height}',

    autoLoad: true,
    frame: true,
    selModel: {
        type: 'cellmodel'
    },

    tbar: [{
        text: 'Add Plant',
        handler: 'onAddClick'
    }],

    bbar: {
        platformConfig: {
            '!Ext.supports.Touch': {
                hidden: true
            }
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: '<b>Not recommended on touch devices</b>',
            style: 'text-align: right;'
        }]
    },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    store: {
        model: 'KitchenSink.model.grid.Plant',

        proxy: {
            type: 'ajax',
            url: 'data/grid/plants.xml',

            reader: {
                type: 'xml',    // XmlReader since returned data is in XML
                record: 'plant' // records are in 'plant' tags
            }
        },

        sorters: [{
            property: 'common',
            direction:'ASC'
        }]
    },

    columns: [{
        header: 'Common Name',
        dataIndex: 'common',

        flex: 1,
        editor: {
            allowBlank: false
        }
    }, {
        header: 'Light',
        dataIndex: 'light',

        width: 130,
        editor: {
            xtype: 'combo',
            typeAhead: true,
            triggerAction: 'all',
            store: [
                ['Shade','Shade'],
                ['Mostly Shady','Mostly Shady'],
                ['Sun or Shade','Sun or Shade'],
                ['Mostly Sunny','Mostly Sunny'],
                ['Sunny','Sunny']
            ]
        }
    }, {
        header: 'Price',
        dataIndex: 'price',

        width: '${priceWidth}',
        align: 'right',
        formatter: 'usMoney',
        editor: {
            xtype: 'numberfield',

            allowBlank: false,
            minValue: 0,
            maxValue: 100000
        }
    }, {
        xtype: 'datecolumn',
        header: 'Available',
        dataIndex: 'availDate',

        width: '${availableWidth}',
        format: 'M d, Y',
        editor: {
            xtype: 'datefield',
            format: 'm/d/y',
            minValue: '01/01/06',
            disabledDays: [0, 6],
            disabledDaysText: 'Plants are not available on the weekends'
        }
    }, {
        xtype: 'checkcolumn',
        header: 'Indoor?',
        dataIndex: 'indoor',

        headerCheckbox: true,
        width: '${indoorWidth}',
        stopSelection: false
    }, {
        xtype: 'actioncolumn',

        width: 30,
        sortable: false,
        menuDisabled: true,
        items: [{
            iconCls: 'cell-editing-delete-row',
            tooltip: 'Delete Plant',
            handler: 'onRemoveClick'
        }]
    }]
});
