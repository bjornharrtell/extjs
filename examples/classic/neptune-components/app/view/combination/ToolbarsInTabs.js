Ext.define('Neptune.view.combination.ToolbarsInTabs', {
    extend: 'Ext.container.Container',
    xtype: 'toolbarsInTabs',
    id: 'toolbarsInTabs',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 400,
        height: 200
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    tbar: { xtype: 'basicToolbar' },
                    bbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        },
        {
            xtype: 'tabpanel',
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    tbar: { xtype: 'basicToolbar' },
                    bbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        },
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        },
        {
            xtype: 'tabpanel',
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        },
        {
            xtype: 'tabpanel',
            height: 300,
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    tbar: [ {xtype: 'complexButtonGroup' } ],
                    bbar: { xtype: 'basicToolbar' },
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        },
        {
            xtype: 'tabpanel',
            height: 300,
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: Neptune.DummyText.text,
                    tbar: [ {xtype: 'complexButtonGroup' } ],
                    bbar: { xtype: 'basicToolbar' },
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: Neptune.DummyText.text },
                { title: 'Disabled Tab', disabled: true, html: Neptune.DummyText.text }
            ]
        }
    ]
});