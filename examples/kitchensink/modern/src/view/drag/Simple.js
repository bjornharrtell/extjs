/**
 * This example shows how to setup a simple drag for an element.
 */
Ext.define('KitchenSink.view.drag.Simple', {
    extend: 'Ext.Component',
    xtype: 'drag-simple',

    // <example>
    requires: ['KitchenSink.view.drag.SimpleController'],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/SimpleController.js'
    }],
    // </example>

    controller: 'drag-simple',
    cls: 'stretch-html',
    padding: 5,
    html: '<div class="simple-source">Drag Me!</div>'
});
