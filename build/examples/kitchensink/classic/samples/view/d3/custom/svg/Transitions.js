/**
 * This example shows how one can use staggered D3 transitions with various
 * easings to animate from one dataset to another. The datasets in this case
 * are real function values at fixed intervals. Try removing the transition
 * delay, thus eliminating stagger to see how the transition becomes a lot
 * less interesting.
 */
Ext.define('KitchenSink.view.d3.custom.svg.Transitions', {
    extend: 'Ext.panel.Panel',
    xtype: 'd3-view-transitions',
    controller: 'transitions',

    requires: [
        'Ext.d3.svg.Svg'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/custom/svg/TransitionsController.js'
        }
    ],
    // </example>

    width: 960,
    height: 500,

    layout: 'fit',

    items: {
        xtype: 'd3',
        listeners: {
            scenesetup: 'onSceneSetup'
        }
    }
});
