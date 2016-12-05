/**
 * This illustrates how a DragZone can manage an arbitrary number of drag
 * sources, and how a DropZone can manage an arbitrary number of targets.
 *
 * Fields are editable. Drag the fields into the grid using the label as
 * the handle.
 *
 * This example assumes prior knowledge of using a GridPanel.
 */
Ext.define('KitchenSink.view.dd.FieldToGrid', {
    extend: 'Ext.container.Container',
    xtype: 'dd-field-to-grid',
    controller: 'dd-field-to-grid',

    requires: [
        'Ext.ux.dd.CellFieldDropZone',
        'Ext.ux.dd.PanelFieldDragZone',
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.layout.container.VBox'
    ],

    width: 700,
    height: 450,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    signTpl: '<span style="' +
            'color:{value:sign(\'${red}\',\'${green}\')}"' +
        '>{text}</span>',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/dd/FieldToGridController.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    },{
        type: 'Data',
        path: 'classic/samples/data/DataSets.js'
    }],
    profiles: {
        classic: {
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            green: 'green',
            red: 'red'
        },
        neptune: {
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    items: [{
        xtype: 'gridpanel',
        title: 'Target Grid',
        reference: 'companyGrid',
        stripeRows: true,
        flex: 1,
        store: {
            type: 'companies'
        },
        plugins: {
            ptype: 'ux-cellfielddropzone',
            ddGroup: 'dd-field-to-grid',
            onCellDrop: 'onCellDrop'
        },

        columns: [{
            id:'company',
            header: 'Company',
            sortable: true,
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Price',
            width: 75,
            sortable: true,
            formatter: 'usMoney',
            dataIndex: 'price'
        }, {
            header: 'Change',
            dataIndex: 'change',
            width: 80,
            sortable: true,
            renderer: 'renderChange'
        }, {
            header: '% Change',
            dataIndex: 'pctChange',
            width: '${percentChangeColumnWidth}',
            sortable: true,
            renderer: 'renderPercent'
        }, {
            header: 'Last Updated',
            width: '${lastUpdatedColumnWidth}',
            sortable: true,
            formatter: 'date("m/d/Y")',
            dataIndex: 'lastChange'
        }]
    }, {
        title: 'Source Form',
        margin: '10 0 0 0',
        bodyPadding: 5,
        plugins: {
            ptype: 'ux-panelfielddragzone',
            ddGroup: 'dd-field-to-grid'
        },
        defaults: {
            labelWidth: 150
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Drag this text',
            value: 'test'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Drag this number',
            value: 3.14
        },{
            xtype: 'datefield',
            fieldLabel: 'Drag this date',
            value: new Date(2016, 4, 20)
        }]
    }]
});
