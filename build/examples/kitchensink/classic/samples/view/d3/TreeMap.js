/**
 * The 'd3-treemap' component visualizes tree nodes as rectangles, where parent rectangles
 * contain the child ones. This makes a more efficient use of space than 'd3-pack',
 * but at the expense of some visual clarity.
 * In this example the component is used to show the day performance of the SP500 stocks
 * categorized by market sector. It's very easy to see the stocks and sectors that are doing
 * well and those that are not.
 */
Ext.define('KitchenSink.view.d3.TreeMap', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-treemap',
    controller: 'treemap',

    requires: [
        'KitchenSink.view.d3.StocksViewModel',
        'Ext.d3.hierarchy.TreeMap'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/TreeMapController.js'
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
        }
    ],
    // </example>

    width: 930,
    height: 600,

    layout: 'border',

    viewModel: {
        type: 'stocks'
    },

    session: true,

    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            title: 'Companies',
            split: true,
            splitterResize: false,
            collapsible: true,
            minWidth: 100,
            width: 215,
            rootVisible: false,
            useArrows: true,
            displayField: 'name',
            bind: {
                store: '{store}',
                selection: '{selection}',
                focused: '{selection}'
            },
            tbar: {
                xtype: 'segmentedbutton',
                width: '100%',
                items: [
                    {
                        text: 'Market Cap',
                        pressed: true
                    },
                    {
                        text: 'Uniform'
                    }
                ],
                listeners: {
                    toggle: 'onNodeValueToggle'
                }
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            layout: 'fit',
            items: {
                xtype: 'd3-treemap',
                reference: 'treemap',
                interactions: {
                    type: 'panzoom',
                    zoom: {
                        doubleTap: false
                    }
                },
                bind: {
                    store: '{store}',
                    selection: '{selection}'
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
        }
    ]
});
