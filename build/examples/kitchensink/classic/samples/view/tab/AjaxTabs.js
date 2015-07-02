/**
 * This example shows how to use a Ext.ComponentLoader to lazily load raw HTML
 * into an item of a tab panel when a tab is activated.
 */
Ext.define('KitchenSink.view.tab.AjaxTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'ajax-tabs',

    //<example>
    exampleTitle: 'Ajax Tabs',
    //</example>
    width: 600,
    height: 400,

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    items: [{
        title: 'Normal Tab',
        html: "My content was added during construction."
    }, {
        title: 'Ajax Tab 1',
        loader: {
            url: 'data/tab/ajax1.htm',
            contentType: 'html',
            loadMask: true,
            loadOnRender: true
        }
    }, {
        title: 'Ajax Tab 2',
        loader: {
            url: 'data/tab/ajax2.htm',
            contentType: 'html',
            loadMask: true,
            loadOnRender: true
        }
    }]
});