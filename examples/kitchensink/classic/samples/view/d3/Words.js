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
Ext.define('KitchenSink.view.d3.Words', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-words',
    controller: 'words',

    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.Pack'
    ],
    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/WordsController.js'
        },
        // { Too much to handle for mobile devices.
        //     type: 'Data',
        //     path: 'data/treasure_island.txt'
        // },
        {
            type: 'Styles',
            path: 'classic/sass/src/view/d3/Words.scss'
        }
    ],
    // </example>

    width: 930,
    height: 900,

    layout: 'fit',
    title: '"Treasure Island"\'s most used words',

    items: {
        xtype: 'd3-pack',
        reference: 'pack',
        padding: 0,
        nodeText: 'word',
        nodeValue: function (node) {
            // Instead of using `nodeValue: 'count'` as a config,
            // take a qubic root of the 'count' to downplay
            // differences in the relative size of nodes.
            return Math.pow(node.data.count, 1/3);
        },
        colorAxis: {
            // For this example, we want all nodes to have the same color.
            scale: {
                type: 'ordinal',
                range: ['white']
            }
        },
        rootVisible: false,
        textPadding: [-8, 0],
        selectEventName: 'mouseenter',
        tooltip: {
            renderer: 'onTooltip'
        }
    },

    listeners: {
        afterrender: 'onAfterRender'
    }
});
