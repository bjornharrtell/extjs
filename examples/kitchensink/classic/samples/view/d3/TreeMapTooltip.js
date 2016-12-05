/**
 * This example shows how one can show a tooltip when a 'd3-treemap' item is hovered.
 * Hovering a stock will show its day change, hovering a sector will list the full names
 * of all the companies in it.
 */
Ext.define('KitchenSink.view.d3.TreeMapTooltip', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-treemap-tooltip',
    controller: 'treemap-tooltip',

    requires: [
        'KitchenSink.view.d3.StocksViewModel',
        'Ext.d3.hierarchy.TreeMap'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/TreeMapTooltipController.js'
        },
        {
            type: 'Model',
            path: 'classic/samples/model/Stock.js'
        },
        {
            type: 'View Model',
            path: 'classic/samples/view/d3/StocksViewModel.js'
        },
        {
            type: 'Data',
            path: 'data/tree/tree.json'
        },
        {
            type: 'Styles',
            path: 'classic/sass/src/view/d3/TreeMapTooltip.scss'
        }
    ],
    // </example>

    width: 930,
    height: 600,
    layout: 'fit',

    viewModel: {
        type: 'stocks'
    },

    session: true,

    items: {
        xtype: 'd3-treemap',
        interactions: {
            type: 'panzoom',
            pan: {
                momentum: null
            },
            zoom: {
                doubleTap: false
            }
        },
        bind: {
            store: '{store}',
            selection: '{selection}'
        },
        rootVisible: false,
        selectEventName: null,
        expandEventName: null,
        nodeValue: function (node) {
            return node.data.cap;
        },
        tooltip: {
            cls: 'tip',
            ui: 'd3-treemap',
            trackMouse: true,
            renderer: 'onTooltip'
        },
        colorAxis: {
            scale: {
                type: 'linear',
                domain: [-5, 0, 5],
                range: ['#E45649', '#ECECEC', '#50A14F']
            },
            field: 'change',
            processor: function (axis, scale, node, field) {
                return node.isLeaf() ? scale(node.data[field]) : '#ececec';
            }
        }
    },

    parentTpl: [
        '<div class="tip-title">{data.name}</div>',
        '<tpl for="childNodes">',
        '<div><span class="tip-symbol">{data.name}</span><tpl if="data.description"> - {data.description}</tpl></div>',
        '<tpl if="xindex &gt; 10">...{% break; %}</tpl>',
        '</tpl>'
    ],

    leafTpl: [
        '<div class="tip-company">{data.description}</div>',
        '<div>Change:&nbsp;<tpl if="data.change &gt; 0">+</tpl>{data.change}%</div>'
    ]
});
