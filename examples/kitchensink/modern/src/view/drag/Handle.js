/**
 * This example shows how to specify handles. Only the child boxes inside
 * the main element can trigger a drag.
 */
Ext.define('KitchenSink.view.drag.Handle', {
    extend: 'Ext.Component',
    xtype: 'drag-handle',

    // <example>
    requires: ['KitchenSink.view.drag.HandleController'],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/HandleController.js'
    }],
    // </example>

    controller: 'drag-handle',
    cls: 'stretch-html',
    padding: 5,
    html: '<div class="handle-handles handle-source">' +
              '<div class="handle">Drag</div>' +
          '</div>' +
          '<div class="handle-repeat handle-source">' +
              '<div class="handle">Foo</div>' +
              '<div class="handle">Bar</div>' +
              '<div class="handle">Baz</div>' +
          '</div>'
});
