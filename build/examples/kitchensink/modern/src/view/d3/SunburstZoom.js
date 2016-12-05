Ext.define('KitchenSink.view.d3.SunburstZoom', {
    extend: 'Ext.Panel',
    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.partition.Sunburst'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/d3/SunburstZoomController.js'
    }, {
        type: 'ViewModel',
        path: 'modern/src/view/d3/TreeViewModel.js'
    }],
    // </example>
    
    controller: 'sunburst',

    viewModel: {
        type: 'tree'
    },

    session: true,

    cls: 'card1',
    layout: 'fit',
    shadow: true,
    items: [{
        xtype: 'd3-sunburst',
        reference: 'd3',
        padding: 20,
        bind: {
            store: '{store}'
        },
        tooltip: {
            renderer: 'onTooltip'
        },
        nodeChildren: function (node) {
            // Always render top 3 levels of nodes, whether or not they are expanded.
            return node.getDepth() < 2 ? node.childNodes : null;
        },
        nodeSelectTransition: false,
        listeners: {
            selectionchange: function (sunburst, node) {
                sunburst.zoomInNode(node);
            }
        }
    }]
});
