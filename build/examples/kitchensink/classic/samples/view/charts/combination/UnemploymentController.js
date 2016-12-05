Ext.define('KitchenSink.view.charts.combination.UnemploymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.unemployment',

    // State regions.
    // A region line spans from the 'start' state through the 'end' state.
    regions: [{
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

    regionIndex: 0,
    linePadding: 5,
    tickSize: 10,
    startAngle: 0,
    endAngle: 0,
    region: null,

    /**
     * Adds ticks to the ends of a region line.
     * @param surface The surface to put the ticks into.
     * @param attr The style of the ticks.
     * @param angles Array with angles to put the ticks at.
     * @param sprites The array to add the created tick sprites to (for future reference).
     */
    addTicks: function (surface, attr, angles, sprites) {
        var linePadding = this.linePadding,
            tickSize = this.tickSize,
            i, ln, angle;

        for (i = 0, ln = angles.length; i < ln; i++) {
            angle = angles[i] + attr.rotationRads;
            sprites.push(surface.add({
                type: 'line',
                strokeStyle: 'gray',

                translationX: attr.translationX,
                translationY: attr.translationY,

                fromX: attr.centerX + (attr.endRho + linePadding) * Math.cos(angle),
                fromY: attr.centerY + (attr.endRho + linePadding) * Math.sin(angle),

                toX: attr.centerX + (attr.endRho + linePadding + tickSize) * Math.cos(angle),
                toY: attr.centerY + (attr.endRho + linePadding + tickSize) * Math.sin(angle)
            }));
        }
    },

    // This renderer is called for each pie slice of the series only once
    // on initial chart render. The renderer doesn't actually change
    // the style of the series sprites. Its only job is to create
    // and position the region sprites in the chart.
    onDummySliceRender: function (sprite, config, data, index) {
        // Please see the comments in the KitchenSink.store.Unemployment class
        // for more info on the meaning of the record fields.
        var me = this,
            ln = me.regions.length,
            record = data.store.getAt(index),
            label = record.get('label'),
            spriteSurface = sprite.getSurface(), // 'series' surface
            chart = spriteSurface.ownerCt,
            overlaySurface = chart.getSurface('overlay'),
            attr = sprite.attr,
            region;

        // Because the regionIndex is declared and initialized in the closure
        // that's only executed once (when the view is defined),
        // we need to reset the regionIndex every time the example is shown.
        if (chart.resetRegionIndex) {
            me.regionIndex = 0;
            delete chart.resetRegionIndex;
        }

        // If it's a sector that shows the change in unemployment with a color
        if (label !== '' && label !== 'year') {

            // If not all region sprites have been created yet.
            if (me.regionIndex !== ln) {
                // Since the renderer function is called for all the sectors
                // of the 'pie' series sprite in the store record order,
                // we can create region sprites on the first 'swipe' through the sectors
                // when the pie series sprite is rendered for the first time,
                // and remove the renderer afterwards.
                me.region = region = me.regions[me.regionIndex];

                if (label === region.start) {

                    me.startAngle = attr.startAngle;
                    region.startIndex = index;

                } else if (label === region.end) {

                    me.endAngle = attr.endAngle;
                    region.endIndex = index;

                    region.sprites = [];

                    region.sprites.push(overlaySurface.add({
                        type: 'arc',
                        strokeStyle: 'gray',

                        cx: attr.centerX,
                        cy: attr.centerY,

                        r: attr.endRho + me.linePadding,

                        translationX: attr.translationX,
                        translationY: attr.translationY,
                        rotationRads: attr.rotationRads,

                        startAngle: me.startAngle,
                        endAngle: me.endAngle
                    }));

                    me.addTicks(overlaySurface, attr, [me.startAngle, me.endAngle], region.sprites);

                    // Label region lines with text sprites.
                    region.sprites.push(overlaySurface.add({
                        type: 'arctext',
                        text: region.name,
                        spacing: 2,
                        centerX: attr.centerX,
                        centerY: attr.centerY,
                        radius: attr.endRho + me.linePadding * 2,
                        angle: ((me.startAngle + me.endAngle) * 0.5 + attr.rotationRads) / Math.PI * 180,
                        translationX: attr.translationX,
                        translationY: attr.translationY,
                        template: {
                            type: 'text',
                            fontSize: 13,
                            fontWeight: 'normal',
                            fillStyle: 'gray'

                        }
                    }));
                    me.regionIndex++;
                }

            }
        }

        sprite.attr.renderer = null;
    },

    onSliceRender2012: function (sprite, config, data, index) {
        // Please see the comments in the KitchenSink.store.Unemployment class
        // for more info on the meaning of the record fields.
        var record = data.store.getAt(index),
            label = record.get('label'),
            unemployment = record.get('y2012'),
            style = {};

        if (label === '') { // a separating sector
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') { // a sector that shows a year
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else { // a sector that shows the change in unemployment with a color
            style.fillStyle = this.getStateColor(unemployment);
        }
        return style;
    },

    onLabelRender2012: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2012',
                font: 'bold 16px sans-serif'
            };
        }
    },

    onSliceRender2011: function (sprite, config, data, index) {
        var record = data.store.getAt(index),
            label = record.get('label'),
            style = {};

        if (label === '') {
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') {
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else {
            style.fillStyle = this.getStateColor(record.get('y2011'));
        }
        return style;
    },

    onLabelRender2011: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2011'
            };
        } else {
            return {
                hidden: true
            };
        }
    },

    onSliceRender2010: function (sprite, config, data, index) {
        var record = data.store.getAt(index),
            label = record.get('label'),
            style = {};

        if (label === '') {
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') {
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else {
            style.fillStyle = this.getStateColor(record.get('y2010'));
        }
        return style;
    },

    onLabelRender2010: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2010'
            };
        } else {
            return {
                hidden: true
            };
        }
    },

    onSliceRender2009: function (sprite, config, data, index) {
        var record = data.store.getAt(index),
            label = record.get('label'),
            style = {};

        if (label === '') {
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') {
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else {
            style.fillStyle = this.getStateColor(record.get('y2009'));
        }
        return style;
    },

    onLabelRender2009: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2009'
            };
        } else {
            return {
                hidden: true
            };
        }
    },

    onSliceRender2008: function (sprite, config, data, index) {
        var record = data.store.getAt(index),
            label = record.get('label'),
            style = {};

        if (label === '') {
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') {
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else {
            style.fillStyle = this.getStateColor(record.get('y2008'));
        }
        return style;
    },

    onLabelRender2008: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2008'
            };
        } else {
            return {
                hidden: true
            };
        }
    },

    onSliceRender2007: function (sprite, config, data, index) {
        var record = data.store.getAt(index),
            label = record.get('label'),
            style = {};

        if (label === '') {
            style.fillStyle = 'none';
            style.strokeStyle = 'none';
        } else if (label === 'year') {
            style.fillStyle = 'rgba(70, 70, 69, 1.0)';
        } else {
            style.fillStyle = this.getStateColor(record.get('y2007'));
        }
        return style;
    },

    onLabelRender2007: function (text, sprite, config, data, index) {
        if (text === 'year') {
            return {
                text: '2007'
            };
        } else {
            return {
                hidden: true
            };
        }
    },

    onItemHighlight: function (chart, item) {
        // The 'item' parameter here is an object that holds information
        // about the highlighted item, like its 'index', the 'series' it belongs to,
        // the associated store 'record' and its 'field'.

        var regions = this.regions,
            label = item.record.get('label'),
            cartesianChart = this.lookupReference('cartesian'),
            data = item.record.data,
            i, j, ik, jk, region, sprite;

        if (!label || label === 'year') {
            // Don't highlight the sectors that separate the regions
            // and the sector that shows the year.
            item.series.setAttributesForItem(item, {
                highlighted: false
            });
        } else {
            chart.getSurface('chart').get('stateName').setAttributes({
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

        if (!Ext.is.Desktop) {
            chart.redraw();
        }
    },

    onBarRender: function (sprite, config, data, index) {
        var percent = data.store.getAt(index).get('percent');

        return {
            fillStyle: this.getStateColor(percent)
        };
    },

    // Returns color based on percentage change in unemployment.
    getStateColor: function (unemployment) {
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
    },

    onAfterRender: function (chart) {
        // Get the series used for highlighting (belong to a separate chart,
        // that uses 'itemhighlight' interaction).
        var series = chart.getSeries()[0],
            store = chart.getStore(),
            index = store.find('label', 'CA');

        chart.resetRegionIndex = true;
        chart.on({
            redraw: function () {
                // Highlight the California state by default.
                chart.setHighlightItem(series.getItemByIndex(index, 'sprites'));
                // Re-render the overlay surface with the state region sprites
                // to make sure they are positioned correctly.
                chart.getSurface('overlay').renderFrame();
            },
            single: true
        });
    },

    onBeforeRender: function () {
        // Make Ext.draw.TextMeasurer use the Ext.util.TextMetrics to measure text,
        // which is a more precise but much slower solution.
        // For this example it shouldn't be a noticable performace hit,
        // since we made optimizations elsewhere.
        Ext.draw.TextMeasurer.precise = true;
    },

    destroy: function () {
        var regions = this.regions,
            i, region;

        for (i = 0; i < regions.length; i++) {
            region = regions[i];
            delete region.sprites;
        }

        this.regionIndex = 0;

        Ext.draw.TextMeasurer.precise = false;

        this.callParent();
    }

});