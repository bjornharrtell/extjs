Ext.define('KitchenSink.view.d3.Pack', {
    extend: 'Ext.Panel',
    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.Pack'
    ],
    
    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/d3/PackController.js'
    }, {
        type: 'ViewModel',
        path: 'modern/src/view/d3/TreeViewModel.js'
    }],
    // </example>
    
    controller: 'pack',

    viewModel: {
        type: 'tree'
    },

    session: true,

    cls: 'card1',
    layout: 'fit',
    shadow: true,

    items: [{
        xtype: 'd3-pack',
        padding: 20,
        bind: {
            store: '{store}'
        },
        tooltip: {
            renderer: 'onTooltip'
        }
    }]
});
