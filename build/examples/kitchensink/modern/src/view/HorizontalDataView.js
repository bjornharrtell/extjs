Ext.define('KitchenSink.view.HorizontalDataView', {
    extend: 'Ext.Container',
    requires: ['KitchenSink.model.Speaker'],
    config: {
        layout: 'fit',
        cls: 'ks-basic',
        items: [{
            xtype: 'dataview',
            scrollable: 'horizontal',
            cls: 'dataview-horizontal',
            inline: {
                wrap: false
            },
            itemTpl: '<div class="img" style="background-image: url({photo});"></div><div class="name">{first_name}<br/>{last_name}</div>',
            store: 'Speakers'
        }]
    }
});