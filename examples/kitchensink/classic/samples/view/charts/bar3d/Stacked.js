/**
 * Stacked 3D bars are 3D bar charts where categories are stacked next to each
 * other. This is typically done to visually represent the total of all categories for a
 * given period or value.
 */
Ext.define('KitchenSink.view.charts.bar3d.Stacked', {
    extend: 'Ext.Panel',
    xtype: 'bar-stacked-3d',
    controller: 'bar-stacked-3d',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/bar3d/StackedController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Browsers.js'
    }],
    // </example>
    width: 650,

    initComponent: function() {
        var me = this;
        //<example>
        me.tbar = [
            '->',
            {
                text: 'Preview',
                handler: 'onPreview'
            }
        ];
        //</example>
        me.items = [{
            xtype: 'cartesian',
            reference: 'chart',
            theme: 'muted',
            width: '100%',
            height: 500,
            legend: {
                docked: 'right'
            },
            store: {type: 'browsers'},
            insetPadding: 40,
            flipXY: true,
            animation: Ext.isIE8 ? false : {
                easing: 'backOut',
                duration: 500
            },
            sprites: [{
                type: 'text',
                text: 'Bar Charts - Stacked Bars',
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
                y: 480
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                fontSize: 10,
                x: 12,
                y: 495
            }],
            axes: [{
                type: 'numeric3d',
                position: 'bottom',
                adjustByMajorUnit: true,
                grid: true,
                renderer: 'onAxisLabelRender',
                minimum: 0
            }, {
                type: 'category3d',
                position: 'left',
                grid: true
            }],
            series: [{
                type: 'bar3d',
                title: [ 'IE', 'Firefox', 'Chrome', 'Safari' ],
                xField: 'month',
                yField: [ 'data1', 'data2', 'data3', 'data4' ],
                stacked: true,
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
        //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: 'onColumnRender'
                },
                items: [
                    { text: 'Month', dataIndex: 'month', renderer: Ext.identityFn },
                    { text: 'IE', dataIndex: 'data1' },
                    { text: 'Firefox', dataIndex: 'data2' },
                    { text: 'Chrome', dataIndex: 'data3' },
                    { text: 'Safari', dataIndex: 'data4' }
                ]
            },
            store: {type: 'browsers'},
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
