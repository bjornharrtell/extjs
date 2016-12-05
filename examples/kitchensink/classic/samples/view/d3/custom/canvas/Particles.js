/**
 * This is an example of a simple particle system that makes use of
 * D3 scales and timers and is rendered with the 'd3-canvas' component.
 */
Ext.define('KitchenSink.view.d3.custom.canvas.Particles', {
    extend: 'Ext.Panel',
    xtype: 'd3-view-particles',
    controller: 'particles',

    requires: [
        'Ext.d3.canvas.Canvas',
        'KitchenSink.view.d3.custom.canvas.ParticlesController'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [
        {
            type: 'Controller',
            path: 'classic/samples/view/d3/custom/canvas/ParticlesController.js'
        },
        {
            type: 'Particle',
            path: 'classic/samples/view/d3/custom/canvas/Particle.js'
        }
    ],
    // </example>

    width: 860,
    height: 500,

    layout: 'fit',

    items: {
        xtype: 'd3-canvas',
        // D3 is not an abstraction layer, however having crisp looking
        // Canvas visualizations on retina devices requires support for
        // resolution independence, which is provided by 'd3-canvas' component,
        // and is enabled by default.
        // Here though, we optimize for performance, because this particular
        // example won't gain much from higher resolution in terms of looks anyway.
        hdpi: false,
        listeners: {
            sceneresize: 'onSceneResize',
            mousemove: {
                fn: 'onMouseMove',
                element: 'element',
                scope: 'controller'
            }
        }
    }
});
