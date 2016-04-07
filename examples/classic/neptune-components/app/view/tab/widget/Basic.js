Ext.define('Neptune.view.tab.widget.Basic', {
    extend: 'Ext.tab.Panel',
    xtype: 'basicTabPanel',
    defaults: {
        icon: '../shared/icons/fam/feed_add.png'
    },
    items: [
        { title: 'Active Tab', closable: true, html: Neptune.DummyText.text },
        { title: 'Inactive Tab', closable: true, html: Neptune.DummyText.text },
        { title: 'Disabled Tab', closable: true, disabled: true, html: Neptune.DummyText.text }
    ]
});