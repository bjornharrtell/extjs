/**
 * A basic area chart is similar to the line chart, except the area between axis and line
 * is filled with colors to emphasize quantity.
 */
Ext.define('KitchenSink.view.charts.area.Basic', {
    extend: 'Ext.Panel',
    xtype: 'area-basic',

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
            xField: 'year',
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
                    this.setHtml(title + ' (' + storeItem.get('year') + '): ' + storeItem.get(field));
                }
            }
        };
    },

    initComponent: function() {
        var me = this;
        //<example>
        me.tbar = [
            '->',
            {
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }
        ];
        //</example>

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 600,
            store: {type: 'gdp'},
            legend: {docked: 'bottom'},
            insetPadding: '40 40 40 40',
            sprites: [{
                type: 'text',
                text: 'Economic Development in the USA, Japan and China',
                fontSize: 22,
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }, {
                type: 'text',
                text: 'Data: Gross domestic product based on purchasing-power-parity (PPP) valuation of country GDP. Figures for FY2014 are forecasts.',
                fontSize: 10,
                x: 12,
                y: 525
            }, {
                type: 'text',
                text: 'Source: http://www.imf.org/ World Economic Outlook Database October 2014.',
                fontSize: 10,
                x: 12,
                y: 540
            }],
            axes: [{
                type: 'numeric',
                position: 'left',
                title: 'GDP in billions of US Dollars',
                grid: true,
                fields: ['china', 'japan', 'usa'],
                renderer: function (v, layoutContext) {
                    // Custom renderer overrides the native axis label renderer.
                    // Since we don't want to do anything fancy with the value
                    // ourselves except adding a thousands separator, but at the same time
                    // don't want to loose the formatting done by the native renderer,
                    // we let the native renderer process the value first.
                    var value = layoutContext.renderer(v);
                    return value !== '0' ? (value / 1000 + ',000') : value;
                },
                minimum: 0,
                maximum: 20000,
                majorTickSteps: 10
            }, {
                type: 'category',
                position: 'bottom',
                fields: 'year',
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [
                me.getSeriesConfig('usa', 'USA'),
                me.getSeriesConfig('china', 'China'),
                me.getSeriesConfig('japan', 'Japan')
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
                    { text: 'Year', dataIndex: 'year' },
                    { text: 'China', dataIndex: 'china'},
                    { text: 'Japan', dataIndex: 'japan'},
                    { text: 'USA', dataIndex: 'usa'}
                ]
            },
            store: {type: 'gdp'},
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
