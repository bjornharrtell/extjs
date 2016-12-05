/**
 * Example data shows concurrent user sessions over time,
 * taken from a development environment.
 * Original: http://bl.ocks.org/tjdecke/5558084
 */
Ext.define('KitchenSink.view.d3.custom.svg.DayHourHeatMap', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-day-hour-heatmap',
    controller: 'day-hour-heatmap',

    requires: [
        'Ext.d3.svg.Svg'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/custom/svg/DayHourHeatMapController.js'
        },
        {
            type: 'Styles',
            path: 'classic/sass/src/view/d3/custom/svg/DayHourHeatMap.scss'
        }
    ],
    // </example>

    width: 960,
    height: 500,

    layout: 'fit',

    tbar: [
        '->',
        {
            text: 'Dataset #1',
            handler: 'onDataset1'
        },
        {
            text: 'Dataset #2',
            handler: 'onDataset2'
        }
    ],

    items: {
        xtype: 'd3',
        padding: '50 0 100 30',
        listeners: {
            sceneresize: 'onSceneResize'
        }
    }
});
