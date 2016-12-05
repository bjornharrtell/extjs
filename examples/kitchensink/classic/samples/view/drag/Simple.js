/**
 * This example shows how to setup a simple drag for an element.
 */
Ext.define('KitchenSink.view.drag.Simple', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-simple',
    controller: 'drag-simple',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/SimpleController.js'
    }],
    //</example>

    width: 800,
    height: 500,
    title: 'Simple Drag',
    bodyPadding: 5,

    html: '<div class="simple-source">Drag Me!</div>'
});
