/**
 * This example shows options for using a proxy while dragging.
 */
Ext.define('KitchenSink.view.drag.Proxy', {
    extend: 'Ext.Component',
    xtype: 'drag-proxy',

    // <example>
    requires: ['KitchenSink.view.drag.ProxyController'],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/ProxyController.js'
    }],
    // </example>

    controller: 'drag-proxy',
    cls: 'stretch-html',
    padding: 5,
    html: '<div class="proxy-none proxy-source">No proxy</div>' + 
          '<div class="proxy-original proxy-source">Element as proxy with revert: true</div>' + 
          '<div class="proxy-placeholder proxy-source">Placeholder</div>'
});
