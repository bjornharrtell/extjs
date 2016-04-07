Ext.define('KitchenSink.view.charts.scatter.CustomIconsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scatter-custom-icons',

    onRefresh: function () {
        var chart = this.lookupReference('chart'),
            store = chart.getStore();

        store.setData(store.generateData(25));
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

    onAfterRender: function () {
        this.onRefresh();
    }

});