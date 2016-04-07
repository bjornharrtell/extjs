Ext.define('KitchenSink.view.ColorPatterns', {
    singleton: true,
    requires: ['Ext.draw.Color'],
    colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],

    getBaseColors: function (index) {
        if (index == null) {
            return this.colors.slice();
        } else {
            return this.colors[index];
        }
    },

    getAlteredBaseColorsHSL: function (deltaHSL) {
        deltaHSL = Ext.applyIf(deltaHSL || {}, {h: 0, s: 0, l: 0});
        var deltaH = deltaHSL.h,
            deltaS = deltaHSL.s,
            deltaL = deltaHSL.l,
            colors = [], i, hsl;
        for (i = 0; i < this.colors.length; i++) {
            hsl = Ext.draw.Color.create(this.colors[i]).getHSL();
            colors.push(Ext.draw.Color.fromHSL(hsl[0] + deltaH, hsl[1] + deltaS, hsl[2] + deltaL));
        }
        return colors;
    },

    getGradientColorsHSL: function (baseColor, from, to, number) {
        baseColor = Ext.draw.Color.create(baseColor);
        var hsl = baseColor.getHSL(),
            fromH = 'h' in from ? from.h : hsl[0],
            fromS = 's' in from ? from.s : hsl[1],
            fromL = 'l' in from ? from.l : hsl[2],
            toH = 'h' in to ? to.h : hsl[0],
            toS = 's' in to ? to.s : hsl[1],
            toL = 'l' in to ? to.l : hsl[2],
            i, colors = [],
            deltaH = (toH - fromH) / number,
            deltaS = (toS - fromS) / number,
            deltaL = (toL - fromL) / number;
        for (i = 0; i <= number; i++) {
            colors.push(Ext.draw.Color.fromHSL(
                fromH + deltaH * i,
                fromS + deltaS * i,
                fromL + deltaL * i
            ).toString());
        }
        return colors;
    },

    getGradientColors: function (fromColor, toColor, number) {
        var colors = [],
            temp = new Ext.draw.Color(),
            i;
        fromColor = Ext.draw.Color.create(fromColor);
        toColor = Ext.draw.Color.create(toColor);
        for (i = 0; i <= number; i++) {
            temp.r = fromColor.r * (1 - i / number) + toColor.r * i / number;
            temp.g = fromColor.g * (1 - i / number) + toColor.g * i / number;
            temp.b = fromColor.b * (1 - i / number) + toColor.b * i / number;
            temp.a = fromColor.a * (1 - i / number) + toColor.a * i / number;
            colors.push(temp.toString());
        }
        return colors;
    },

    getGradientColorsByBrightness: function (baseColor, fromBrightness, toBrightness, number) {
        baseColor = Ext.draw.Color.create(baseColor);
        var hsl = baseColor.getHSL(), colors = [], i;
        for (i = 0; i <= number; i++) {
            colors.push(Ext.draw.Color.fromHSL(hsl[0], hsl[1], fromBrightness * (1 - i / number) + toBrightness * i / number).toString());
        }
        return colors;
    }
});