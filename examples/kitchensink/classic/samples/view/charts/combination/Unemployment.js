/**
 * The US Unemployment Infographic shows how to create what might seem like a distinct
 * type of chart, but in fact is only a fancy combination of standard features:
 * a polar chart with multiple 'pie' series and a cartesian chart.
 * The unique look is achieved by a heavy use of sprites and renderers
 * to style the chart, and the only custom component is the 'arctext' sprite that
 * is used to put a text along a curve.
 *
 * Credits: http://www.viewtific.com/concentric-circle-graphics/
 */
Ext.define('KitchenSink.view.charts.combination.Unemployment', {
    extend: 'Ext.panel.Panel',
    xtype: 'unemployment',
    controller: 'unemployment',

    requires: ['KitchenSink.view.ArcText'],

    layout: 'absolute',
    width: 990,
    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/combination/UnemploymentController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Unemployment.js'
    }, {
        type: 'Sprite',
        path: 'classic/samples/view/charts/combination/ArcText.js'
    }],
    // </example>

    items: [
        {
            xtype: 'polar',
            width: '100%',
            height: 1375,
            store: {
                type: 'unemployment'
            },
            insetPadding: '400 0 125 0',
            animation: false,
            background: 'white',
            // Custom sprites that are used to decorate the chart to give it the infographic look.
            sprites: [
                {
                    type: 'rect',
                    x: 50,
                    y: 40,
                    width: 890,
                    height: 100,
                    fillStyle: 'rgba(76, 76, 77, 1.0)'
                },
                {
                    type: 'text',
                    text: 'Changes in U.S. Unemployment',
                    font: 'bold 52px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'white',
                    x: 70,
                    y: 120
                },
                {
                    type: 'text',
                    text: '2007-2012',
                    font: 'normal 24px Verdana, "Droid Sans"',
                    fillStyle: 'white',
                    x: 730,
                    y: 76
                },
                {
                    type: 'path', // The stripe containing the 'SENCHA INFOGRAPHIC' text.
                    path: 'M0,0 L294,0 L302,8 L302,29.14 C302,29.14 0,29.5 0,29 C0,28.5 0,0 0,0 z',
                    translationX: 34,
                    translationY: 20,
                    fillStyle: '#DDDCD4'
                },
                {
                    type: 'path', // The edge twist of the stripe above.
                    path: 'M0,29.265 L13.5,29.265 L13.5,41.265 z',
                    translationX: 34,
                    translationY: 20,
                    fillStyle: '#9D9D9D'
                },
                {
                    type: 'text',
                    text: 'SENCHA',
                    font: 'normal 12px Verdana, "Droid Sans"',
                    fillStyle: 'rgba(148, 51, 57, 1.0)',
                    x: 60,
                    y: 42
                },
                {
                    type: 'text',
                    text: 'INFOGRAPHIC',
                    font: 'bold 12px Verdana, "Droid Sans"',
                    fillStyle: 'rgba(148, 51, 57, 1.0)',
                    x: 116,
                    y: 42
                },
                {
                    type: 'image', // Sencha leaf logo.
                    src: 'classic/resources/images/sencha.png',
                    x: 24,
                    y: 10,
                    width: 24,
                    height: 36.5
                },
                {
                    type: 'text',
                    text: 'Forty-three states and the District of Columbia added\n' +
                        'jobs in the past 12 months, but the US has 4.8\n' +
                        'million fewer jobs than it did in 2008. North Dakota\n' +
                        'led the pack with a 7.2 percent increase, but the\n' +
                        'national growth rate was only 1.1 percent. Seven\n' +
                        'states lost jobs.',
                    font: 'normal 20px Charter, Georgia, "Droid Serif"',
                    textBaseline: 'top',
                    fillStyle: 'black',
                    x: 75,
                    y: 165
                },
                {
                    type: 'text',
                    text: 'Unemployment',
                    font: 'bold 36px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(76, 76, 77, 1.0)',
                    textBaseline: 'top',
                    x: 632,
                    y: 165
                },
                {
                    type: 'path', // The legend's up arrow.
                    path: 'M0,6.5 L12.5,0 L25,6.5 L25,21.5 L0,21.5 z',
                    translationX: 748,
                    translationY: 214.5,
                    fillStyle: 'rgba(146, 50, 51, 1.0)'
                },
                {
                    type: 'rect',
                    x: 748,
                    y: 238,
                    width: 25,
                    height: 20,
                    fillStyle: 'rgba(179, 113, 114, 1.0)'
                },
                {
                    type: 'rect',
                    x: 748,
                    y: 260,
                    width: 25,
                    height: 20,
                    fillStyle: 'rgba(126, 135, 142, 1.0)'
                },
                {
                    type: 'rect',
                    x: 748,
                    y: 282,
                    width: 25,
                    height: 20,
                    fillStyle: 'rgba(194, 212, 221, 1.0)'
                },
                {
                    type: 'path', // The legend's down arrow.
                    path: 'M0,15 L12.5,21.5 L25,15 L25,0 L0,0 z',
                    translationX: 748,
                    translationY: 304,
                    fillStyle: 'rgba(114, 166, 185, 1.0)'
                },
                {
                    type: 'text',
                    text: 'rose by more than 1.5%',
                    textAlign: 'right',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 233
                },
                {
                    type: 'text',
                    text: 'rose by 0.5% to 1.5%',
                    textAlign: 'right',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 255
                },
                {
                    type: 'text',
                    text: 'rose by less than 0.5%',
                    textAlign: 'right',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 277
                },
                {
                    type: 'text',
                    text: 'fell by less than 0.5%',
                    textAlign: 'left',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 277
                },
                {
                    type: 'text',
                    text: 'fell by 0.5% to 1.5%',
                    textAlign: 'left',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 298
                },
                {
                    type: 'text',
                    text: 'fell by more than 1.5%',
                    textAlign: 'left',
                    font: 'normal 13px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 318
                },
                {
                    type: 'text',
                    text: 'Roll over a state to learn more.',
                    textAlign: 'center',
                    font: 'bold 17px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(77, 77, 78, 1.0)',
                    x: 495,
                    y: 370
                },
                {
                    type: 'text',
                    text: 'Percent change\nin unemployment',
                    textAlign: 'center',
                    font: 'bold 21px Charter, Georgia, "Droid Serif"',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 495,
                    y: 1020
                },
                {
                    type: 'rect', // The footer rectangle.
                    x: 50,
                    y: 1300,
                    width: 890,
                    height: 50,
                    fillStyle: 'rgba(76, 76, 77, 1.0)'
                },
                {
                    type: 'text',
                    text: 'Source: Bureau of Labor Statistics',
                    textBaseline: 'top',
                    font: 'normal 12px Tahoma, "Trebuchet MS", "Droid Sans"',
                    fillStyle: 'white',
                    x: 60,
                    y: 1310
                },
                {
                    type: 'text',
                    text: 'Sencha infographic by Vitaly Kravchenko\nupdated June 4, 2014',
                    textBaseline: 'top',
                    textAlign: 'right',
                    font: 'normal 12px Tahoma, "Trebuchet MS", "Droid Sans"',
                    fillStyle: 'white',
                    x: 930,
                    y: 1310
                },
                {
                    type: 'arctext',
                    text: 'Recession December 2007',
                    translationX: 495,
                    translationY: 829,
                    radius: 276,
                    angle: -90,
                    spacing: 3,
                    template: {
                        type: 'text',
                        fontWeight: 'normal',
                        fontSize: 13,
                        fillStyle: 'rgba(146, 50, 51, 1.0)'
                    }
                }
            ],
            series: [
                {
                    type: 'pie',
                    angleField: 'span',
                    donut: 93,
                    rotation: -Math.PI/60,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontWeight: 'bold',
                        fontSize: 13,
                        fontFamily: 'Tahoma, "Trebuchet MS", "Droid Sans"',
                        renderer: 'onLabelRender2012'
                    },
                    renderer: 'onSliceRender2012'
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 86,
                    radiusFactor: 93,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        renderer: 'onLabelRender2011'
                    },
                    renderer: 'onSliceRender2011'
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 79,
                    radiusFactor: 86,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                        renderer: 'onLabelRender2010'
                    },
                    renderer: 'onSliceRender2010'
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 73,
                    radiusFactor: 79,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                        renderer: 'onLabelRender2009'
                    },
                    renderer: 'onSliceRender2009'
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 67,
                    radiusFactor: 73,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                        renderer: 'onLabelRender2008'
                    },
                    renderer: 'onSliceRender2008'
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 57,
                    radiusFactor: 63,
                    subStyle: {
                        strokeStyle: 'white',
                        lineWidth: 1
                    },
                    label: {
                        field: 'label',
                        display: 'inside',
                        orientation: '',
                        fillStyle: 'white',
                        fontSize: 11,
                        fontWeight: 'bold',
                        renderer: 'onLabelRender2007'
                    },
                    renderer: 'onSliceRender2007'
                }
            ]
        },
        // To minimize redraw time we perform the highlighting in a separate chart,
        // so the larger portion of the infographic is only rendered once.
        {
            xtype: 'polar',
            width: '100%',
            height: 1375,
            store: {
                type: 'unemployment'
            },
            insetPadding: '400 0 125 0',
            interactions: ['itemhighlight'],
            animation: false,
            background: 'white',
            sprites: {
                id: 'stateName',
                type: 'text',
                fillStyle: 'black',
                text: '',
                textBaseline: 'top',
                textAlign: 'center',
                font: 'bold 30px Charter, Georgia, "Droid Serif"',
                x: 495,
                y: 650
            },
            series: [
                {
                    // Translucent dummy series used for highlighting only.
                    // Rendered on top of all the series used to show the data.
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'span',
                    donut: 57,
                    subStyle: {
                        fillStyle: 'none', // not visible unless highlighted
                        strokeStyle: 'none',
                        lineWidth: 1
                    },
                    // Instead of using the 'highlight' config,
                    // which uses the default highlight style of the series
                    // if set to 'true', or adds to the default highlight style
                    // if given an object, we override the default highlight
                    // style completely by providing our own 'highlightCfg'.
                    highlightCfg: {
                        fillStyle: 'rgba(0,0,0,0.2)',
                        margin: 0
                    },
                    // Could just as well say:
                    // highlight: {
                    //     fillStyle: 'rgba(0,0,0,0.2)',
                    //     margin: 0 // override the value of default highlight style
                    // },

                    renderer: 'onDummySliceRender'
                },
                {
                    // Dummy series used to render the white ring
                    // where the text "Recession December 2007" is shown.
                    // Displayed above all other series,
                    // including the series used for highlighting.
                    type: 'pie',
                    rotation: -Math.PI/60,
                    angleField: 'dummy',
                    donut: 63,
                    // Make a dummy store with a single record for this series
                    // so that only one pie sector (a donut ring) is created,
                    // intead of 50+ sectors (one for each state + separators).
                    store: Ext.create('Ext.data.Store', {
                        fields: ['dummy'],
                        data: [{
                            dummy: 1
                        }]
                    }),
                    radiusFactor: 67,
                    subStyle: {
                        fillStyle: 'white',
                        strokeStyle: 'none',
                        lineWidth: 1
                    }
                }
            ],
            listeners: {
                itemhighlight: 'onItemHighlight',
                afterrender: 'onAfterRender'
            }
        },
        {
            xtype: 'cartesian',
            reference: 'cartesian',
            x: 300,
            y: 700,
            width: 350,
            height: 250,
            animation: false,
            background: 'white',
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    title: {
                        text: 'percent',
                        fontSize: 16,
                        fillStyle: 'black',
                        fontFamily: 'Charter, Georgia, "Droid Serif"'
                    },
                    label: {
                        fillStyle: 'black'
                    },
                    style: {
                        strokeStyle: 'black'
                    },
                    titleMargin: 16,
                    minimum: -3,
                    maximum: 6
                },
                {
                    type: 'category',
                    position: 'bottom',
                    label: {
                        fillStyle: 'black'
                    },
                    style: {
                        strokeStyle: 'black'
                    },
                    floating: {
                        value: 0,
                        alongAxis: 0
                    }
                }
            ],
            series: {
                type: 'bar',
                xField: 'year',
                yField: 'percent',
                style: {
                    strokeStyle: 'none',
                    maxBarWidth: 34
                },
                renderer: 'onBarRender'
            }
        }
    ],

    listeners: {
        beforerender: 'onBeforeRender'
    }

});