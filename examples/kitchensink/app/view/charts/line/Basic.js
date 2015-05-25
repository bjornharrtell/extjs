/**
 * A basic line chart displays information as a series of data points connected through
 * straight lines. It is similar to scatter plot, except that the points are connected.
 * Line charts are often used to visualize trends in data over a period.
 */
Ext.define('KitchenSink.view.charts.line.Basic', {
    extend: 'Ext.Panel',
    xtype: 'line-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>

    width: 650,

    defaultListenerScope: true,

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        store: {
            type: 'browsers'
        },
        insetPadding: 40,
        innerPadding: {
            left: 40,
            right: 40
        },
        sprites: [{
            type: 'text',
            text: 'Line Charts - Basic Line',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 470
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 485
        }],
        axes: [{
            type: 'numeric',
            fields: 'data1',
            position: 'left',
            grid: true,
            minimum: 0,
            maximum: 24,
            renderer: function (v, layoutContext) {
                // Custom renderer overrides the native axis label renderer.
                // Since we don't want to do anything fancy with the value
                // ourselves except appending a '%' sign, but at the same time
                // don't want to loose the formatting done by the native renderer,
                // we let the native renderer process the value first.
                return layoutContext.renderer(v) + '%';
            }
        }, {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'month',
            yField: 'data1',
            style: {
                lineWidth: 4
            },
            marker: {
                radius: 4
            },
            label: {
                field: 'data1',
                display: 'over'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                }
            }
        }]
        //<example>
    }, {
        padding: '10 0 0 0',
        xtype: 'gridpanel',
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: '2012', dataIndex: 'month' },
                { text: 'IE', dataIndex: 'data1', renderer: function(v) { return v + '%'; } }
            ]
        },
        store: {
            type: 'browsers'
        },
        width: '100%'
        //</example>
    }],

    tbar: ['->', {
        text: 'Preview',
        handler: 'showPreview'
    }],

    showPreview: function() {
        this.down('cartesian').preview();
    }
});
