/**
 * This example shows how to hit test a path sprite. Move the pointer or tap anywhere
 * on the draw surface. If there's a sprite underneath it will be highlighted.
 */
Ext.define('KitchenSink.view.draw.HitTest', {
    extend: 'Ext.panel.Panel',
    xtype: 'hit-test',

    requires: [
        'Ext.draw.Component',
        'KitchenSink.view.HitTestComponent'
    ],

    layout: 'fit',
    width: 650,

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Component',
        path: 'classic/samples/view/draw/HitTestComponent.js'
    }],
    // </example>

    items: [
        {
            xtype: 'hit-test-component',
            width: '100%',
            height: 500,

            sprites: [
                {
                    type: 'path',
                    path: 'M98.5,59.5 C147.5,10.5 193.5,46.5 248.5,43.5 C303.5,40.5 333.5,20.5 342.5,87.5 C351.5,154.5 190.5,74.5 217.5,126.5 C244.5,178.5 365.5,199.5 387.5,186.5 C447.209,151.217 414.5,265.5 336.5,238.5 C268.036,214.801 362.5,330.5 293.5,299.5 C224.5,268.5 139.5,393.5 143.5,333.5 C147.5,273.5 223.5,264.5 150.5,232.5 C77.5,200.5 67.783,273.177 51.5,217.5 C20.5,111.5 28.471,129.529 98.5,59.5 z',
                    scalingX: 0.8,
                    scalingY: 0.8,
                    translationX: -50,
                    translationY: -50,
                    strokeStyle: 'black',
                    lineWidth: 2
                },
                {
                    type: 'path',
                    path: 'M101.5,64.5 C90.5,-92.5 147.5,331.5 186.5,324.5 C225.5,317.5 218.918,71.535 331,73 C484,75 41.567,219.437 107,229 C237,248 455,239 246,277 C87.952,305.736 30.5,313.5 59.5,230.5 C88.5,147.5 307,-64 270,65 C234.647,188.257 182.604,55.554 91.5,83.5 C-71.5,133.5 112.5,221.5 101.5,64.5 z',
                    fillStyle: 'rgba(255,0,0,0.2)',
                    strokeStyle: 'black',
                    lineWidth: 2,
                    rotationRads: Math.PI / 4,
                    translationX: 250,
                    translationY: 130
                },
                {
                    type: 'path',
                    path: 'M20,450L300,200Z',
                    strokeStyle: 'black',
                    lineWidth: 2
                }
            ]
        }
    ]

});
