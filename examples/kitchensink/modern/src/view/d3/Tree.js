Ext.define('KitchenSink.view.d3.Tree', {
    extend: 'Ext.Panel',
    controller: 'tree',

    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.tree.HorizontalTree',
        'Ext.d3.interaction.PanZoom',
        'Ext.tip.ToolTip'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'modern/src/view/d3/TreeController.js'
        },
        {
            type: 'VM',
            path: 'modern/src/view/d3/SalaryViewModel.js'
        },
        {
            type: 'Model',
            path: 'modern/src/model/Salary.js'
        }
    ],
    // </example>

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/d3/TreeController.js'
    }, {
        type: 'ViewModel',
        path: 'modern/src/view/d3/TreeViewModel.js'
    }],
    // </example>
    
    viewModel: {
        type: 'salary'
    },

    session: true,

    cls: 'card1',
    layout: 'fit',
    shadow: true,
    items: [{
        xtype: 'd3-tree',
        bind: {
            store: '{store}'
        },
        colorAxis: {
            field: 'id'
        },
        interactions: {
            type: 'panzoom',
            zoom: {
                extent: [0.3, 3],
                doubleTap: false
            }
        },
        nodeSize: [30, 250],
        nodeRadius: 10,
        nodeText: function (tree, node) {
            var text = node.data.text;

            if (node.depth > 1) {
                text += ' (' + Ext.util.Format.currency(node.data.salary, '$', 0) + ')';
            }

            return text;
        },
        tooltip: {
            renderer: 'onTooltip'
        },
        platformConfig: {
            desktop: {
                nodeSize: [20, 250],
                nodeRadius: 5
            }
        }
    }]
});
