Ext.define('KitchenSink.view.charts.pie.Pie3DController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pie-3d',

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    },

    onStyleToggle: function (segmentedButton, button, pressed) {
        var value = segmentedButton.getValue();

        this.setPieStyle({
            opacity: value === 0 ? 1 : 0.8
        });
    },

    onThemeSwitch: function () {
        var chart = this.lookupReference('chart'),
            currentThemeClass = Ext.getClassName(chart.getTheme()),
            themes = Ext.chart.theme,
            themeNames = [],
            currentIndex = 0,
            name;

        for (name in themes) {
            if (Ext.getClassName(themes[name]) === currentThemeClass) {
                currentIndex = themeNames.length;
            }
            if (name !== 'Base' && name.indexOf('Gradients') < 0) {
                themeNames.push(name);
            }
        }
        chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
        chart.redraw();
    },

    onThicknessChange: function (slider, value) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0];

        series.setThickness(value);
        chart.redraw();
    },

    onDistortionChange: function (slider, value) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0];

        series.setDistortion(value / 100);
        chart.redraw();
    },

    onBevelChange: function (slider, value) {
        this.setPieStyle({
            bevelWidth: value
        });
    },

    onDonutChange: function (slider, value) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0];

        series.setDonut(value);
        chart.redraw();
    },

    onColorSpreadChange: function (slider, value) {
        this.setPieStyle({
            colorSpread: value
        });
    },

    setPieStyle: function (style) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0];

        series.setStyle(style);
        chart.redraw();
    },

    onSliderDragStart: function () {
        var chart = this.lookupReference('chart');
        chart.suspendAnimation();
    },

    onSliderDragEnd: function () {
        var chart = this.lookupReference('chart');
        chart.resumeAnimation();
    }

});