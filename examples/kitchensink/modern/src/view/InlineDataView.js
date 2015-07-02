Ext.define('KitchenSink.view.InlineDataView', {
    extend: 'Ext.Container',
    requires: ['KitchenSink.model.Speaker'],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'dataview',
            scrollable: true,
            inline: true,
            cls: 'dataview-inline',
            itemTpl: '<div class="img" style="background-image: url({photo});"></div>',
            store: 'Speakers'
        }]
    }
});