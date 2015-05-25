Ext.define('KitchenSink.view.charts.pie.Pie3DController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pie-3d',

    onRefresh: function () {
        var chart = this.lookupReference('chart'),
            store = chart.getStore();

        store.refreshData();
    },

    onStyleToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0],
            value = segmentedButton.getValue();

        series.setStyle({
            opacity: value === 0 ? 1 : 0.9
        });
        chart.redraw();
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
    }

});