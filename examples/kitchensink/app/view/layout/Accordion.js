Ext.define('KitchenSink.view.layout.Accordion', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.layout.container.Accordion',
        'Ext.grid.*',
        'KitchenSink.model.Company'
    ],
    xtype: 'layout-accordion',
    
    //<example>
    exampleTitle: 'Accordion Layout',
    exampleDescription: [
        '<p>Demonstrates usage of an accordion layout.</p>'
    ].join(''),
    
    themes: {
        classic: {
            colWidth: 75
        },
        
        neptune: {
            colWidth: 90
        }
    },
    //</example>
    
    layout: 'accordion',
    width: 500,
    height: 400,
    defaults: {
        bodyPadding: 10
    },
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                bodyPadding: 0,
                xtype: 'grid',
                title: 'Array Grid (Click header to collapse)',
                hideCollapseTool: true,
                columnLines: true,
                viewConfig: {
                    stripeRows: true
                },
                store: new Ext.data.Store({
                    model: KitchenSink.model.Company,
                    data: KitchenSink.data.DataSets.company
                }),
                columns: [{
                    text     : 'Company',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'company'
                }, {
                    text     : 'Price',
                    width    : 75,
                    sortable : true,
                    renderer : 'usMoney',
                    dataIndex: 'price'
                }, {
                    text     : 'Change',
                    width    : 75,
                    sortable : true,
                    renderer : this.changeRenderer,
                    dataIndex: 'change'
                }, {
                    text     : '% Change',
                    width    : 90,
                    sortable : true,
                    renderer : this.pctChangeRenderer,
                    dataIndex: 'pctChange'
                }]
            }, {
                title: 'Accordion Item 2',
                html: 'Empty'
            }, {
                title: 'Accordion Item 3',
                html: 'Empty'
            }, {
                title: 'Accordion Item 4',
                html: 'Empty'
            }, {
                title: 'Accordion Item 5',
                html: 'Empty'
            }]
        });
        this.callParent();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
})
