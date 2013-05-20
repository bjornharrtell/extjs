Ext.define('KitchenSink.view.grid.GroupedHeaderGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'grouped-header-grid',
    store: 'Companies',
    columnLines: true,
    height: 350,
    title: 'Grouped Header Grid',
    viewConfig: {
        stripeRows: true
    },
    //<example>
    exampleDescription: [
        '<p>This example shows how to create a grid with column headers which are nested within category headers.</p>',
        '<p>Category headers do not reference Model fields via a <code>dataIndex</code>, rather they contain ',
        'child header definitions (which may themselves either contain a <code>dataIndex</code> or more levels of headers).</p>'
    ],
    themes: {
        classic: {
            width: 600,
            lastUpdatedColumnWidth: 85,
            percentChangeColumnWidth: 75
        },
        neptune: {
            width: 675,
            lastUpdatedColumnWidth: 115,
            percentChangeColumnWidth: 100
        }
    },
    //</example>

    initComponent: function () {
        this.width = this.themeInfo.width;
        this.columns = [{
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'company'
            }, {
                text: 'Stock Price',
                columns: [{
                    text     : 'Price',
                    width    : 75,
                    sortable : true,
                    renderer : 'usMoney',
                    dataIndex: 'price'
                }, {
                    text     : 'Change',
                    width    : 80,
                    sortable : true,
                    renderer :  function(val) {
                        if (val > 0) {
                            return '<span style="color:green;">' + val + '</span>';
                        } else if (val < 0) {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    },
                    dataIndex: 'change'
                }, {
                    text     : '% Change',
                    width    : this.themeInfo.percentChangeColumnWidth,
                    sortable : true,
                    renderer : function(val) {
                        if (val > 0) {
                            return '<span style="color:green;">' + val + '</span>';
                        } else if (val < 0) {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    },
                    dataIndex: 'pctChange'
                }]
            }, {
                text     : 'Last Updated',
                width    : this.themeInfo.lastUpdatedColumnWidth,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            }];

        this.callParent();
    }
});
