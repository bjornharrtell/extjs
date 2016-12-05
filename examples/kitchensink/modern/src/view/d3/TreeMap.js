Ext.define('KitchenSink.view.d3.TreeMap', {
    extend: 'Ext.Panel',
    requires: [
        'KitchenSink.view.d3.StocksViewModel',
        'Ext.d3.hierarchy.TreeMap'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/d3/TreeMapController.js'
    }, {
        type: 'ViewModel',
        path: 'modern/src/view/d3/StocksViewModel.js'
    }],
    // </example>
    
    viewModel: {
        type: 'stocks'
    },
    controller: 'treemap',

    session: true,

    cls: 'card1',
    layout: 'fit',
    shadow: true,

    items: {
        xtype: 'd3-treemap',
        interactions: {
            type: 'panzoom',
            zoom: {
                doubleTap: false
            }
        },
        bind: {
            store: '{store}'
        },
        tooltip: {
            cls: 'tip',
            renderer: 'onTooltip'
        },
        rootVisible: false,
        nodeValue: function (node) {
            return node.data.cap;
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
    }
});
