/**
 * This example shows options for using a proxy while dragging.
 */
Ext.define('KitchenSink.view.drag.Proxy', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-proxy',
    controller: 'drag-proxy',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/ProxyController.js'
    }],
    //</example>

    title: 'Drag Proxies',
    width: 600,
    height: 500,
    bodyPadding: 5,

    html:
        '<div class="proxy-none proxy-source">No proxy</div>' +
        '<div class="proxy-original proxy-source">Element as proxy with revert: true</div>' +
        '<div class="proxy-placeholder proxy-source">Placeholder</div>'
});
