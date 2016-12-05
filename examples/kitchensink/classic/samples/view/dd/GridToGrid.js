/**
 * This example shows how to drag and drop from one Grid to another.
 */
Ext.define('KitchenSink.view.dd.GridToGrid', {
    extend: 'Ext.container.Container',
    xtype: 'dd-grid-to-grid',
    controller: 'dd-grid-to-grid',
    
    requires: [
        'Ext.grid.Panel',
        'Ext.layout.container.HBox'
    ],
    
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/dd/GridToGridController.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/dd/Simple.js'
    }],
    //</example>
    
    width: 650,
    height: 300,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'grid',
        title: 'First Grid',
        reference: 'grid1',
        
        flex: 1,
        
        multiSelect: true,
        margin: '0 5 0 0',
        
        tools: [{
            type: 'refresh',
            tooltip: 'Reset both grids',
            handler: 'onResetClick'
        }],

        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                containerScroll: true,
                dragGroup: 'dd-grid-to-grid-group1',
                dropGroup: 'dd-grid-to-grid-group2'
            },
            listeners: {
                drop: 'onDropGrid1'
            }
        },

        store: {
            model: 'KitchenSink.model.dd.Simple',
            data: [
                { name : 'Rec 0', column1 : '0', column2 : '0' },
                { name : 'Rec 1', column1 : '1', column2 : '1' },
                { name : 'Rec 2', column1 : '2', column2 : '2' },
                { name : 'Rec 3', column1 : '3', column2 : '3' },
                { name : 'Rec 4', column1 : '4', column2 : '4' },
                { name : 'Rec 5', column1 : '5', column2 : '5' },
                { name : 'Rec 6', column1 : '6', column2 : '6' },
                { name : 'Rec 7', column1 : '7', column2 : '7' },
                { name : 'Rec 8', column1 : '8', column2 : '8' },
                { name : 'Rec 9', column1 : '9', column2 : '9' }
            ]
        },

        columns: [{
            text: 'Record Name',
            dataIndex: 'name',

            flex: 1,
            sortable: true
        }, {
            text: 'column1',
            dataIndex: 'column1',

            width: 80,
            sortable: true
        }, {
            text: 'column2',
            dataIndex: 'column2',

            width: 80,
            sortable: true
        }]
    }, {
        xtype: 'grid',
        title: 'Second Grid',
        reference: 'grid2',

        flex: 1,
        stripeRows: true,

        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                containerScroll: true,
                dragGroup: 'dd-grid-to-grid-group2',
                dropGroup: 'dd-grid-to-grid-group1',

                // The right hand drop zone gets special styling
                // when dragging over it.
                dropZone: {
                    overClass: 'dd-over-gridview'
                }
            },

            listeners: {
                drop: 'onDropGrid2'
            }
        },

        store: {
            model: 'KitchenSink.model.dd.Simple'
        },

        columns: [{
            text: 'Record Name',
            dataIndex: 'name',

            flex: 1,
            sortable: true
        }, {
            text: 'column1',
            dataIndex: 'column1',

            width: 80,
            sortable: true
        }, {
            text: 'column2',
            dataIndex: 'column2',

            width: 80,
            sortable: true
        }]
    }]
});
