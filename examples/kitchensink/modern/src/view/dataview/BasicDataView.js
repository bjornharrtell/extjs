Ext.define('KitchenSink.view.dataview.BasicDataView', {
    extend: 'Ext.Container',
    requires: [
        'KitchenSink.model.Speaker',
        'Ext.dataview.plugin.ItemTip',
        'Ext.plugin.Responsive'
    ],

    // <example>
    otherContent: [{
        type: 'Model',
        path: 'modern/src/model/Speaker.js'
    }],
    // </example>
    
    layout: 'fit',
    cls: 'ks-basic demo-solid-background',
    shadow: true,
    items: [{
        xtype: 'dataview',
        scrollable: 'y',
        cls: 'dataview-basic',
        itemTpl: '<div class="img" style="background-image: url({photo});"></div><div class="content"><div class="name">{first_name} {last_name}</div><div class="affiliation">{affiliation}</div></div>',
        store: 'Speakers',
        plugins: {
            type: 'dataviewtip',
            align: 'l-r?',
            plugins: 'responsive',
            
            // On small form factor, display below.
            responsiveConfig: {
                "width < 600": {
                    align: 'tl-bl?'
                }
            },
            width: 600,
            minWidth: 300,
            delegate: '.img',
            allowOver: true,
            anchor: true,
            bind: '{record}',
            tpl: '<table style="border-spacing:3px;border-collapse:separate">' + 
                    '<tr><td>Affiliation: </td><td>{affiliation}</td></tr>' +
                    '<tr><td>Position:</td><td>{position}</td></tr>' + 
                    '<tr><td vAlign="top">Bio:</td><td><div style="max-height:100px;overflow:auto;padding:1px">{bio}</div></td></tr>'
        }
    }]
});
