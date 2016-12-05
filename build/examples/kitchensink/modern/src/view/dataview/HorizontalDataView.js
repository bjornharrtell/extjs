Ext.define('KitchenSink.view.dataview.HorizontalDataView', {
    extend: 'Ext.Panel',
    requires: [
        'KitchenSink.model.Speaker',
        'Ext.dataview.plugin.ItemTip'
    ],

    // <example>
    otherContent: [{
        type: 'Model',
        path: 'modern/src/model/Speaker.js'
    }],
    // </example>
    
    layout: 'fit',
    cls: 'ks-basic',
    shadow: true,
    items: [{
        xtype: 'dataview',
        scrollable: 'horizontal',
        cls: 'dataview-horizontal',
        inline: {
            wrap: false
        },
        itemTpl: '<div class="img" style="background-image: url({photo});"></div><div class="name">{first_name}<br/>{last_name}</div>',
        store: 'Speakers',
        plugins: {
            width: 415,
            minWidth: 300,
            type: 'dataviewtip',
            delegate: '.img',
            allowOver: true,
            align: 't-b?',
            anchor: true,
            bind: '{record}',
            tpl: '<table style="border-spacing:3px;border-collapse:separate">' + 
                    '<tr><td>Affiliation: </td><td>{affiliation}</td></tr>' +
                    '<tr><td>Position:</td><td>{position}</td></tr>' + 
                    '<tr><td vAlign="top">Bio:</td><td><div style="max-height:100px;overflow:auto;padding:1px">{bio}</div></td></tr>'
        }
    }]
});
