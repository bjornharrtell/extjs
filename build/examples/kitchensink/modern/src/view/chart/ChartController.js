Ext.define('KitchenSink.view.chart.ChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chart',

    defaultVisibleRange: null,
    rangeAxis: ['top', 'bottom'],

    requires: [
        'Ext.chart.theme.Blue',
        'Ext.chart.theme.Green',
        'Ext.chart.theme.Muted',
        'Ext.chart.theme.Red',
        'Ext.chart.theme.Sky',
        'Ext.chart.theme.Yellow'
    ],

    themes: [
        'default',
        'blue',
        'green',
        'midnight',
        'muted',
        'red',
        'sky',
        'yellow'
    ],

    currentTheme: 0,

    getChart: function() {
        return this.getView().down('[isChart]');
    },

    onThemeChange: function() {
        var themes = this.themes,
            idx = ++this.currentTheme;

        if (idx === themes.length) {
            this.currentTheme = idx = 0;
        }
        this.getChart().setTheme(themes[idx]);
    },

    onRefresh: function() {
        var store = this.getChart().getStore();
        store.generateData(store.getNumRecords());
    }

});
