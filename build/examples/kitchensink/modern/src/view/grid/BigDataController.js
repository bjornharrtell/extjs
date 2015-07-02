Ext.define('KitchenSink.view.grid.BigDataController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.grid-bigdata',

    ageSummaryRenderer: function(value) {
        return value.toFixed(2) + ' years';
    },

    genderSummaryType: function(records, field) {
        var ln = records.length,
            femaleCount = 0,
            i, record, value;

        for (i = 0; i < ln; i++) {
            record = records[i];
            value = record.get(field);
            if (value.toLowerCase() === 'female') {
                femaleCount++;
            }
        }

        return (ln ? Math.round((femaleCount / ln) * 100) : 0) + '% female';
    },

    nameSummaryRenderer: function (value) {
        return value + ' Users';
    },

    onVerifyTap: function (btn) {
        var cell = btn.getParent(),
            record = cell.getRecord();

        Ext.Msg.alert('Verify', 'Verify ' + record.get('fullName'));
    }
});
