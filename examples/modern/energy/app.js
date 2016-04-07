Ext.application({
    name: 'EnergyApp',

    requires: [
        'Ext.draw.Color',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.interactions.ItemInfo',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.Legend'
    ],

    controllers: ['Main'],

    mainView: 'EnergyApp.view.Main',

    launch: function() {
        this.getController('Main').launch();
    },

    commify: function (nStr, x) {
        return(nStr / 1000000).toFixed(2);
    },

    loadPieAtYear: function (year) {
        EnergyApp.currentYear = year = year || EnergyApp.currentYear || 2009;
        var store = Ext.getStore("ChartStore"),
            record = store.getAt(store.find('year', year));
        Ext.getStore("YearStore").setData([
            {type: 'Coal', data: record.get('coal')},
            {type: 'Oil', data: record.get('crude-oil')},
            {type: 'Natural Gas', data: record.get('gas')},
            {type: 'Nuclear', data: record.get('nuclear')},
            {type: 'Renewable', data: record.get('renewable')}
        ]);
    },

    popup: function (item, panel) {
        var storeItem = item.record,
            commify = EnergyApp.app.commify;
        panel.setHtml([
            '<ul><li><span style="font-weight: bold">Year: </span>' + storeItem.get('year') + '</li>',
            '<li><span style="font-weight: bold">Coal: </span> ' + commify(storeItem.get('coal')) + '</li>',
            '<li><span style="font-weight: bold">Oil: </span> ' + commify(storeItem.get('crude-oil')) + '</li>',
            '<li><span style="font-weight: bold">Natural Gas: </span> ' + commify(storeItem.get('gas')) + '</li>',
            '<li><span style="font-weight: bold">Nuclear: </span> ' + commify(storeItem.get('nuclear')) + '</li>',
            '<li><span style="font-weight: bold">Renewable: </span> ' + commify(storeItem.get('renewable')) + '</li>',
            '</ul>'
        ].join(''));
    },

    popupYear: function (item, panel) {
        var storeItem = item.record,
            commify = EnergyApp.app.commify;
        panel.setHtml([
            '<ul><li><span style="font-weight: bold">Type: </span>' + storeItem.get('type') + '</li>',
            '<li><span style="font-weight: bold">BTUs: </span> ' + commify(storeItem.get('data')) + '</li>',
            '</ul>'
        ].join(''));
    }
});
