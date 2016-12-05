Ext.define('KitchenSink.view.grid.Tree', {
    extend: 'Ext.grid.Tree',
    requires: [
        'Ext.grid.plugin.MultiSelection'
    ],

    // <example>
    otherContent: [{
        type: 'ViewModel',
        path: 'modern/src/view/grid/TreeListModel.js'
    }],
    // </example>
    
    cls: 'demo-solid-background',
    shadow: true,

    viewModel: {
        type: 'tree-list'
    },

    bind: '{navItems}'
});
