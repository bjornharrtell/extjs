/**
 * The 'd3-sunburst' component visualizes tree nodes as donut sectors,
 * with the root circle in the center. The angle and area of each sector corresponds
 * to its value. By default the same value is returned for each node, meaning that
 * siblings will span equal angles and occupy equal area.
 * This example visualizes the D3 directory structure, where the sizes of
 * files are of no interest, so each file slice takes up equal area. One could
 * modify the example, however, by setting the `nodeValue` config to 'size'
 * to make slices occupy areas proportional to file size.
 */
Ext.define('KitchenSink.view.d3.Sunburst', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-sunburst',
    controller: 'sunburst',

    requires: [
        'KitchenSink.view.d3.TreeViewModel',
        'Ext.d3.hierarchy.partition.Sunburst'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/SunburstController.js'
        },
        {
            type: 'Model',
            path: 'classic/samples/model/Tree.js'
        },
        {
            type: 'View Model',
            path: 'classic/samples/view/d3/TreeViewModel.js'
        },
        {
            type: 'Data',
            path: 'data/tree/tree.json'
        }
    ],
    // </example>

    width: 930,
    height: 600,

    layout: 'border',

    viewModel: {
        type: 'tree'
    },

    items: [
        {
            xtype: 'treepanel',

            region: 'west',
            split: true,
            splitterResize: false,
            collapsible: true,
            minWidth: 100,
            width: 230,

            title: 'Folders',
            useArrows: true,
            displayField: 'name',

            bind: {
                store: '{store}',
                selection: '{selection}',
                focused: '{selection}'
            }
        },
        {
            region: 'center',

            xtype: 'panel',
            layout: 'fit',

            items: {
                xtype: 'd3-sunburst',
                reference: 'd3',
                padding: 20,
                bind: {
                    store: '{store}',
                    selection: '{selection}'
                },
                tooltip: {
                    renderer: 'onTooltip'
                }
            }
        }
    ]
});
