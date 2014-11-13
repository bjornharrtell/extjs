/**
 * The US Unemployment Infographic shows how to create what might seem like a distinct
 * type of chart, but in fact is only a fancy combination of standard features:
 * a polar chart with multiple 'pie' series and a cartesian chart.
 * The unique look is achieved by a heavy use of sprites and renderers
 * to style the chart, and the only custom component is the 'arctext' sprite that
 * is used to put a text along a curve.
 *
 */
Ext.define('KitchenSink.view.charts.combination.Unemployment', {
    extend: 'Ext.panel.Panel',
    xtype: 'unemployment',

    requires: ['KitchenSink.view.ArcText'],

    layout: 'absolute',
    width: 990,

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
                    font: 'bold 54px Charter',
                    fillStyle: 'white',
                    x: 70,
                    y: 120
                },
                {
                    type: 'text',
                    text: '2007-2012',
                    font: '24px Verdana',
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
                    font: '12px Verdana',
                    fillStyle: 'rgba(148, 51, 57, 1.0)',
                    x: 60,
                    y: 42
                },
                {
                    type: 'text',
                    text: 'INFOGRAPHIC',
                    font: 'bold 12px Verdana',
                    fillStyle: 'rgba(148, 51, 57, 1.0)',
                    x: 116,
                    y: 42
                },
                {
                    type: 'image', // Sencha leaf logo.
                    src: 'resources/images/sencha.png',
                    x: 24,
                    y: 10
                },
                {
                    type: 'text',
                    text: 'Forty-three states and the District of Columbia added\n' +
                        'jobs in the past 12 months, but the US has 4.8\n' +
                        'million fewer jobs than it did in 2008. North Dakota\n' +
                        'led the pack with a 7.2 percent increase, but the\n' +
                        'national growth rate was only 1.1 percent. Seven\n' +
                        'states lost jobs.',
                    font: '20px Charter',
                    textBaseline: 'top',
                    x: 75,
                    y: 165
                },
                {
                    type: 'text',
                    text: 'Unemployment',
                    font: 'bold 36px Charter',
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
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 233
                },
                {
                    type: 'text',
                    text: 'rose by 0.5% to 1.5%',
                    textAlign: 'right',
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 255
                },
                {
                    type: 'text',
                    text: 'rose by less than 0.5%',
                    textAlign: 'right',
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 742,
                    y: 277
                },
                {
                    type: 'text',
                    text: 'fell by less than 0.5%',
                    textAlign: 'left',
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 277
                },
                {
                    type: 'text',
                    text: 'fell by 0.5% to 1.5%',
                    textAlign: 'left',
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 298
                },
                {
                    type: 'text',
                    text: 'fell by more than 1.5%',
                    textAlign: 'left',
                    font: '13px Charter',
                    fillStyle: 'rgba(56, 54, 54, 1.0)',
                    x: 778,
                    y: 318
                },
                {
                    type: 'text',
                    text: 'Roll over a state to learn more.',
                    textAlign: 'center',
                    font: 'bold 17px Charter',
                    fillStyle: 'rgba(77, 77, 78, 1.0)',
                    x: 495,
                    y: 370
                },
                {
                    type: 'text',
                    text: 'Percent change\nin unemployment',
                    textAlign: 'center',
                    font: 'bold 21px Charter',
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
                    font: '12px Tahoma',
                    fillStyle: 'white',
                    x: 60,
                    y: 1310
                },
                {
                    type: 'text',
                    text: 'Sencha infographic by Vitaly Kravchenko\nupdated June 4, 2014',
                    textBaseline: 'top',
                    textAlign: 'right',
                    font: '12px Tahoma',
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
                        fontSize: 13,
                        fillStyle: 'rgba(146, 50, 51, 1.0)'
                    }
                }
            ],
            series: [
                {
                    type: 'pie',
                    xField: 'span',
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
                        fontFamily: 'Tahoma',
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2012',
                                    font: 'bold 16px sans-serif'
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        // Please see the comments in the KitchenSink.store.Unemployment class
                        // for more info on the meaning of the record fields.
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            unemployment = record.get('y2012'),
                            spriteSurface = sprite.getSurface(),
                            chart = spriteSurface.ownerCt,
                            style = {};

                        if (label === '') { // a separating sector
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') { // a sector that shows a year
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else { // a sector that shows the change in unemployment with a color
                            if (!spriteSurface.getStateColor) {
                                // Add the 'getStateColor' method of the view to the 'series' surface
                                // of the pie chart for the ease of access inside a series renderer.
                                spriteSurface.getStateColor = chart.ownerCt.getStateColor;
                            }
                            style.fillStyle = spriteSurface.getStateColor(unemployment);
                        }
                        return style;
                    }
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
                    donut: 86,
                    radiusFactor: 93,
                    highlight: false,
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
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2011'
                                };
                            } else {
                                return {
                                    hidden: true
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            style = {};
                        if (label === '') {
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') {
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else {
                            style.fillStyle = sprite.getSurface().getStateColor(record.get('y2011'));
                        }
                        return style;
                    }
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
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
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2010'
                                };
                            } else {
                                return {
                                    hidden: true
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            style = {};
                        if (label === '') {
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') {
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else {
                            style.fillStyle = sprite.getSurface().getStateColor(record.get('y2010'));
                        }
                        return style;
                    }
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
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
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2009'
                                };
                            } else {
                                return {
                                    hidden: true
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            style = {};
                        if (label === '') {
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') {
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else {
                            style.fillStyle = sprite.getSurface().getStateColor(record.get('y2009'));
                        }
                        return style;
                    }
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
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
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2008'
                                };
                            } else {
                                return {
                                    hidden: true
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            style = {};
                        if (label === '') {
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') {
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else {
                            style.fillStyle = sprite.getSurface().getStateColor(record.get('y2008'));
                        }
                        return style;
                    }
                },
                {
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
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
                        renderer: function (text, sprite, config, data, index) {
                            if (text === 'year') {
                                return {
                                    text: '2007'
                                };
                            } else {
                                return {
                                    hidden: true
                                };
                            }
                        }
                    },
                    renderer: function (sprite, config, data, index) {
                        var record = data.store.getAt(index),
                            label = record.get('label'),
                            style = {};
                        if (label === '') {
                            style.fillStyle = 'none';
                            style.strokeStyle = 'none';
                        } else if (label === 'year') {
                            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
                        } else {
                            style.fillStyle = sprite.getSurface().getStateColor(record.get('y2007'));
                        }
                        return style;
                    }
                }
            ]
        },
        // To minimize redraw time for best perfomance we perform the highlighting in a separate chart,
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
            sprites: [
                {
                    id: 'stateName',
                    type: 'text',
                    text: '',
                    textBaseline: 'top',
                    textAlign: 'center',
                    font: 'bold 30px Charter',
                    x: 495,
                    y: 650
                }
            ],
            series: [
                {
                    // Semitransparent dummy series used for highlighting only.
                    // Rendered on top of all the series used to show the data.
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'span',
                    donut: 57,
                    radiusFactor: 100,
                    subStyle: {
                        fillStyle: 'none',
                        strokeStyle: 'none',
                        lineWidth: 1
                    },
                    highlightCfg: {
                        fillStyle: 'rgba(0,0,0,0.2)',
                        margin: 0
                    },
                    renderer: (function () { // The immidiately executed closure
                        // to create a scope with variables that will be used by the renderer function.

                        // State regions.
                        // A region line spans from the 'start' state through the 'end' state.
                        var regions = [{
                                name: 'Northeast Region',
                                start: 'CT',
                                end: 'VT'
                            }, {
                                name: 'Southeast Region',
                                start: 'AL',
                                end: 'VA'
                            }, {
                                name: 'Midwest Region',
                                start: 'WI',
                                end: 'AR'
                            }, {
                                name: 'Southwest Region',
                                start: 'AZ',
                                end: 'UT'
                            }, {
                                name: 'Northwest Region',
                                start: 'AK',
                                end: 'WY'
                            }],
                            ln = regions.length,
                            regionIndex = 0,
                            linePadding = 5,
                            tickSize = 10,
                            startAngle, endAngle,
                            region;

                        /**
                         * Adds ticks to the ends of a region line.
                         * @param surface The surface to put the ticks into.
                         * @param attr The style of the ticks.
                         * @param angles Array with angles to put the ticks at.
                         * @param sprites The array to add the created tick sprites to (for future reference).
                         */
                        function addTicks(surface, attr, angles, sprites) {
                            var i, ln, angle;
                            for (i = 0, ln = angles.length; i < ln; i++) {
                                angle = angles[i];
                                sprites.push(surface.add({
                                    type: 'line',
                                    translationX: attr.translationX,
                                    translationY: attr.translationY,
                                    fromX: attr.centerX + (attr.endRho + linePadding) * Math.cos(angle),
                                    fromY: attr.centerY + (attr.endRho + linePadding) * Math.sin(angle),
                                    toX: attr.centerX + (attr.endRho + linePadding + tickSize) * Math.cos(angle),
                                    toY: attr.centerY + (attr.endRho + linePadding + tickSize) * Math.sin(angle),
                                    strokeStyle: 'gray'
                                }));
                            }
                        }

                        // The renderer function itself.
                        // The renderer is executed only once for each pie sector sprite
                        // to create the region sprites, then the renderer is removed.
                        return function (sprite, config, data, index) {
                            // Please see the comments in the KitchenSink.store.Unemployment class
                            // for more info on the meaning of the record fields.
                            var record = data.store.getAt(index),
                                label = record.get('label'),
                                spriteSurface = sprite.getSurface(),
                                chart = spriteSurface.ownerCt,
                                overlaySurface = chart.getSurface('overlay'),
                                attr = sprite.attr;

                            // Because the regionIndex is declared and initialized in the closure
                            // that's only executed once (when the view is defined),
                            // we need to reset the regionIndex every time the example is shown.
                            if (chart.resetRegionIndex) {
                                regionIndex = 0;
                                delete chart.resetRegionIndex;
                            }

                            // If it's a sector that shows the change in unemployment with a color
                            if (label !== '' && label !== 'year') {

                                // If not all region sprites have been created yet.
                                if (regionIndex !== ln) {
                                    // Since the renderer function is called for all the sectors
                                    // of the 'pie' series sprite in the store record order,
                                    // we can create region sprites on the first 'swipe' through the sectors
                                    // when the pie series sprite is rendered for the first time,
                                    // and ignore this block afterward.
                                    region = regions[regionIndex];
                                    if (label === region.start) {
                                        startAngle = attr.startAngle;
                                        region.startIndex = index;
                                    } else if (label === region.end) {
                                        endAngle = attr.endAngle;
                                        region.endIndex = index;
                                        region.sprites = [];
                                        region.sprites.push(overlaySurface.add({
                                            type: 'arc',
                                            cx: attr.centerX,
                                            cy: attr.centerY,
                                            r: attr.endRho + linePadding,
                                            translationX: attr.translationX,
                                            translationY: attr.translationY,
                                            rotationRads: attr.rotationRads,
                                            strokeStyle: 'gray',
                                            startAngle: startAngle,
                                            endAngle: endAngle
                                        }));
                                        addTicks(overlaySurface, attr, [
                                                startAngle + attr.rotationRads,
                                                endAngle + attr.rotationRads
                                        ], region.sprites);
                                        // Label region lines with text sprites.
                                        region.sprites.push(overlaySurface.add({
                                            type: 'arctext',
                                            text: region.name,
                                            spacing: 2,
                                            centerX: attr.centerX,
                                            centerY: attr.centerY,
                                            radius: attr.endRho + linePadding * 2,
                                            angle: ((startAngle + endAngle) * 0.5 + attr.rotationRads) / Math.PI * 180,
                                            translationX: attr.translationX,
                                            translationY: attr.translationY,
                                            template: {
                                                type: 'text',
                                                fontSize: 13,
                                                fillStyle: 'rgba(76, 76, 77, 1.0)'

                                            }
                                        }));
                                        regionIndex++;
                                    }
                                    if (regionIndex === ln) {
                                        chart.$stateRegions = regions;
                                    }
                                }
                            }
                            this.attr.renderer = null;
                            return;
                        };
                    })()
                },
                {
                    // Dummy series used to render the white ring
                    // where the text "Recession December 2007" is shown.
                    // Displayed above all other series,
                    // including the series used for highlighting.
                    type: 'pie',
                    rotation: -Math.PI/60,
                    xField: 'dummy',
                    donut: 63,
                    // Make a dummy store with a single record for this series
                    // so that only one pie sector (a donut ring) is created.
                    store: Ext.create('Ext.data.Store', {
                        fields: ['span'],
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
                // Listen for highlight item changes.
                itemhighlight: function (item) {
                    if (item.series.getXField() === 'dummy') {
                        return;
                    }
                    var regions = this.$stateRegions,
                        label = item.record.get('label'),
                        cartesianChart = this.ownerCt.down('cartesian'),
                        data = item.record.data,
                        i, j, ik, jk, region, sprite;
                    if (!label) {
                        // Don't highlight the sectors that separate the regions.
                        item.series.setAttributesForItem(item, {
                            highlighted: false
                        });
                    } else if (label !== 'year') {
                        this.getSurface('chart').get('stateName').setAttributes({
                            text: item.record.get('state')
                        });
                        // Display unemployment changes for the highlighted state inside the cartesian chart.
                        cartesianChart.setStore({
                            fields: ['year', 'percent'],
                            data: [
                                {year: '2007', percent: data.y2007},
                                {year: '2008', percent: data.y2008},
                                {year: '2009', percent: data.y2009},
                                {year: '2010', percent: data.y2010},
                                {year: '2011', percent: data.y2011},
                                {year: '2012', percent: data.y2012}
                            ]
                        });
                    }
                    if (!regions) {
                        return;
                    }
                    // Find the region the highlighted state sector belongs to and highlight its sprites,
                    // while unhighlighting all other regions.
                    for (i = 0, ik = regions.length; i < ik; i++) {
                        region = regions[i];
                        if (item.index >= region.startIndex && item.index <= region.endIndex) {
                            if (!region.highlighted) {
                                for (j = 0, jk = region.sprites.length; j < jk; j++) {
                                    sprite = region.sprites[j];
                                    if (sprite.type === 'arctext') {
                                        sprite.getTemplate().setAttributes({
                                            fillStyle: 'red'
                                        });
                                    } else {
                                        sprite.setAttributes({
                                            strokeStyle: 'red',
                                            lineWidth: 1.5
                                        });
                                    }
                                }
                                region.highlighted = true;
                            }
                        } else if (region.highlighted) {
                            for (j = 0, jk = region.sprites.length; j < jk; j++) {
                                sprite = region.sprites[j];
                                if (sprite.type === 'arctext') {
                                    sprite.getTemplate().setAttributes({
                                        fillStyle: 'black'
                                    });
                                } else {
                                    sprite.setAttributes({
                                        strokeStyle: 'gray',
                                        lineWidth: 1
                                    });
                                }
                            }
                            region.highlighted = false;
                        }
                    }
                }
            }
        },
        {
            xtype: 'cartesian',
            x: 300,
            y: 700,
            width: 350,
            height: 250,
            animation: false,
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    title: {
                        text: 'percent',
                        fontSize: 16,
                        fontFamily: 'Charter'
                    },
                    titleMargin: 16,
                    minimum: -3,
                    maximum: 6
                },
                {
                    type: 'category',
                    position: 'bottom',
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
                renderer: function (sprite, config, data, index) {
                    var percent = data.store.getAt(index).get('percent'),
                        view = this.getSurface().ownerCt.ownerCt;
                    return {
                        fillStyle: view.getStateColor(percent)
                    };
                }
            }
        }
    ],

    initComponent: function () {
        // Returns color based on percentage change in unemployment.
        this.getStateColor = function (unemployment) {
            if (unemployment < -1.5) {
                return 'rgba(114, 166, 185, 1.0)';
            } else if (unemployment < -0.5) {
                return 'rgba(194, 212, 221, 1.0)';
            } else if (unemployment < 0.5) {
                return 'rgba(126, 135, 142, 1.0)';
            } else if (unemployment < 1.5) {
                return 'rgba(179, 113, 114, 1.0)';
            } else {
                return 'rgba(146, 50, 51, 1.0)';
            }
        };
        this.callParent(arguments);

        var chart = this.query('polar')[1], // the chart used for highlighting
            series = chart.getSeries()[0];

        chart.resetRegionIndex = true;
        chart.on({
            redraw: function () {
                // Highlight the Connecticut state by default.
                chart.setHighlightItem(series.getItemByIndex(1));
                // Re-render the overlay surface with the state region sprites
                // to make sure they are positioned correctly.
                chart.getSurface('overlay').renderFrame();
            },
            single: true
        });
    }

});