/**
 * An area chart with negative values.
 */
Ext.define('KitchenSink.view.charts.area.Negative', {
    extend: 'Ext.Panel',
    xtype: 'area-negative',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>

    width: 650,

    getSeriesConfig: function (field, title) {
        return {
            type: 'area',
            title: title,
            xField: 'quarter',
            yField: field,
            style: {
                opacity: 0.60
            },
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #fff',
                renderer: function(storeItem, item) {
                    this.setHtml(title + ' (' + storeItem.get('quarter') + '): ' + storeItem.get(field));
                }
            }
        };
    },

    initComponent: function() {
        var me = this;

        me.tbar = [
            '->',
            {
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }
        ];

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
            store: {type: 'earnings'},
            legend: {docked: 'bottom'},
            insetPadding: '40 40 10 40',
            sprites: [{
                type: 'text',
                text: 'Profits and Losses (per product category)',
                fontSize: 22,
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                grid: true,
                fields: ['consumer', 'gaming', 'phone', 'corporate']
            }, {
                type: 'category',
                position: 'bottom',
                fields: 'quarter',
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [
                me.getSeriesConfig('phone', 'Phone Hardware'),
                me.getSeriesConfig('consumer', 'Consumer Licensing'),
                me.getSeriesConfig('gaming', 'Gaming Hardware'),
                me.getSeriesConfig('corporate', 'Corporate and Other')
            ]
            //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: 'Quarter', dataIndex: 'quarter' },
                    { text: 'Consumer', dataIndex: 'consumer'},
                    { text: 'Gaming', dataIndex: 'gaming'},
                    { text: 'Phone', dataIndex: 'phone'},
                    { text: 'Corporate', dataIndex: 'corporate'}
                ]
            },
            store: {type: 'earnings'},
            width: '100%'
            //</example>
        }];

        this.callParent();
    }
});
