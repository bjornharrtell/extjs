/**
 * The 'd3-pack' component visualizes tree nodes as circles, where parent circles
 * contain the child ones. Circle packing is not as space efficient as TreeMap,
 * but it's easier to see the hierarchy.
 * This particular example shows the most frequently encountered words in
 * the 'Treasurer Island' novel by Robert Louis Stevenson. When a word is hovered,
 * the words that follow it are highlighted - their circles get a thicker stroke
 * and a pinkish fill. The more often the word follows the howevered word, the deeper
 * the shade of pink.
 */
Ext.define('KitchenSink.view.d3.Pack', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-pack',
    controller: 'pack',

    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.Pack'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/PackController.js'
        }
    ],
    // </example>

    width: 930,
    height: 900,
    layout: 'fit',

    viewModel: {
        type: 'tree'
    },

    items: {
        xtype: 'd3-pack',
        padding: 20,
        bind: {
            store: '{store}'
        },
        tooltip: {
            renderer: 'onTooltip'
        }
    }

});
