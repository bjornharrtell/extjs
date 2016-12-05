/**
 * This example shows how to specify handles. Only the child boxes inside
 * the main element can trigger a drag.
 */
Ext.define('KitchenSink.view.drag.Handle', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-handle',
    controller: 'drag-handle',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/HandleController.js'
    }],
    //</example>

    title: 'Drag Handles',
    width: 600,
    height: 400,
    bodyPadding: 5,

    html:
        '<div class="handle-handles handle-source">' +
            '<div class="handle">Drag</div>' +
        '</div>' +
        '<div class="handle-repeat handle-source">' +
            '<div class="handle">Foo</div>' +
            '<div class="handle">Bar</div>' +
            '<div class="handle">Baz</div>' +
        '</div>'
});
