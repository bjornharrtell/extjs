/**
 * This example shows how to detect path sprite intersections.
 * Click and drag a path or shape and move it over another path
 * or shape to see the points where paths intersect.
 */
Ext.define('KitchenSink.view.draw.Intersections', {
    extend: 'Ext.panel.Panel',
    xtype: 'intersections',

    requires: [
        'Ext.draw.Component',
        'KitchenSink.view.IntersectionsComponent'
    ],

    layout: 'fit',
    width: 650,

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Component',
        path: 'classic/samples/view/draw/IntersectionsComponent.js'
    }],
    // </example>

    items: [
        {
            xtype: 'intersections-component',
            width: '100%',
            height: 500,

            sprites: [
                {
                    type: 'path',
                    path: 'M50,50C100,1000 150,-500, 200,450',
                    strokeStyle: 'black',
                    translationY: -50,
                    lineWidth: 2
                },
                {
                    type: 'path',
                    path: 'M10,100C1000,150 -500,200, 500,250',
                    strokeStyle: 'black',
                    lineWidth: 2
                },
                {
                    type: 'rect',
                    x: 400,
                    y: 20,
                    width: 200,
                    height: 200,
                    fillStyle: 'rgba(255,0,0,0.2)',
                    strokeStyle: 'black',
                    lineWidth: 2
                },
                {
                    type: 'path',
                    path: 'M98.5,59.5 C147.5,10.5 193.5,46.5 248.5,43.5 C303.5,40.5 333.5,20.5 342.5,87.5 C351.5,154.5 190.5,74.5 217.5,126.5 C244.5,178.5 365.5,199.5 387.5,186.5 C447.209,151.217 414.5,265.5 336.5,238.5 C268.036,214.801 362.5,330.5 293.5,299.5 C224.5,268.5 139.5,393.5 143.5,333.5 C147.5,273.5 223.5,264.5 150.5,232.5 C77.5,200.5 67.783,273.177 51.5,217.5 C20.5,111.5 28.471,129.529 98.5,59.5 z',
                    scalingX: 0.8,
                    scalingY: 0.8,
                    translationX: 250,
                    translationY: 200,
                    fillStyle: 'rgba(255,0,0,0.2)',
                    strokeStyle: 'black',
                    lineWidth: 2
                },
                {
                    type: 'path',
                    path: 'M0,350L200,500Z',
                    strokeStyle: 'black',
                    lineWidth: 2,
                    translationX: 20,
                    translationY: -20
                }
            ]
        }
    ]

});
