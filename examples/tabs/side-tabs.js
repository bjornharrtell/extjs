Ext.require([
    'Ext.tab.Panel'
]);

Ext.onReady(function() {

    Ext.create('Ext.tab.Panel', {
        renderTo: 'left-tabs',
        tabPosition: 'left',
        height: 360,
        width: 300,
        defaults: {
            bodyPadding: 10
        },
        items: [
            { title: 'Tab 1', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 2', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 3', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true }
        ]
    });

    Ext.create('Ext.tab.Panel', {
        renderTo: 'right-tabs',
        tabPosition: 'right',
        height: 360,
        width: 300,
        defaults: {
            bodyPadding: 10
        },
        items: [
            { title: 'Tab 1', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 2', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 3', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true }
        ]
    });

    Ext.create('Ext.tab.Panel', {
        renderTo: 'left-scroll-tabs',
        tabPosition: 'left',
        height: 300,
        width: 300,
        defaults: {
            bodyPadding: 10
        },
        items: [
            { title: 'Tab 1', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 2', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 3', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true },
            { title: 'Tab 4', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 5', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 6', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true }
        ]
    });

    Ext.create('Ext.tab.Panel', {
        renderTo: 'right-scroll-tabs',
        tabPosition: 'right',
        height: 300,
        width: 300,
        defaults: {
            bodyPadding: 10
        },
        items: [
            { title: 'Tab 1', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 2', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 3', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true },
            { title: 'Tab 4', html: Ext.example.bogusMarkup, iconCls: 'tab-icon' },
            { title: 'Tab 5', html: Ext.example.bogusMarkup, closable: true },
            { title: 'Tab 6', html: Ext.example.bogusMarkup },
            { title: 'Disabled', html: Ext.example.bogusMarkup, iconCls: 'tab-icon', closable: true, disabled: true }
        ]
    });

});