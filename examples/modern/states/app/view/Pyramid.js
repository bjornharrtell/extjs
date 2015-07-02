/**
 * Demographic pyramid.
 *
 */
Ext.define('States.view.Pyramid', {
    extend: 'Ext.chart.series.Cartesian',

    type: 'pyramid',
    alias: 'series.pyramid',
    seriesType: 'barSeries',

    config: {
        /**
         * @cfg style Style properties that will override the theming series styles.
         */

        /**
         * @cfg {Number} xPadding Padding between the left/right axes and the pyramids
         */
        xPadding: 0,

        /**
         * @cfg {Number} yPadding Padding between the top/bottom axes and the pyramids
         */
        yPadding: 10,

        y1Field: false,

        y2Field: false,

        colors: ['rgb(166, 206, 227)', 'rgb(31, 120, 180)'],

        flipXY: true,

        itemInstancing: {
            type: 'rect',
            fx: {
                customDuration: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    radius: 0
                }
            }
        }
    },

    fieldCategoryY: ['Y1', 'Y2'],

    coordinateY: function () {
        var me = this,
            store = me.getStore(),
            items = store.getData().items,
            range = {min: Infinity, max: -Infinity},
            data, style = {}, i,
            sprites = me.getSprites();

        if (sprites.length > 0) {
            data = me.coordinateData(items, this.getY1Field());
            for (i = 0; i < data.length; i++) {
                data[i] = -data[i];
            }
            me.getRangeOfData(data, range);
            style.dataY = data;
            sprites[0].setAttributes(style);


            data = me.coordinateData(items, this.getY2Field());
            me.getRangeOfData(data, range);
            style.dataY = data;
            sprites[1].setAttributes(style);
            me.dataRange[1] = range.min;
            me.dataRange[3] = range.max;
        }
    },

    getSprites: function () {
        var me = this,
            chart = this.getChart(),
            animation = chart && chart.getAnimation(),
            sprites = me.sprites;

        if (!chart) {
            return [];
        }

        if (sprites.length === 2) {
            me.getLabel().getTemplate().fx.setConfig(animation);
            sprites[0].fx.setConfig(animation);
            sprites[0].itemsMarker.getTemplate().fx.setConfig(animation);
            sprites[1].fx.setConfig(animation);
            sprites[1].itemsMarker.getTemplate().fx.setConfig(animation);
            return sprites;
        }

        me.createSprite();
        me.createSprite();
        me.setHidden([false, false]);
        return sprites;
    },

    provideLegendInfo: function (target) {
        var store = this.getStore();
        if (store) {
            var hidden = this.getHidden();
            for (var i = 0; i < 2; i++) {
                target.push({
                    name: ['Female', 'Male'][i],
                    mark: this.getStyleByIndex(i).fillStyle || this.getStyleByIndex(i).strokeStyle || 'black',
                    disabled: hidden[i],
                    series: this.getId(),
                    index: i
                });
            }
        }
    }
});

