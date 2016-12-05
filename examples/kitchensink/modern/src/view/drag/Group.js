/**
 * This example shows drag groups.
 */
Ext.define('KitchenSink.view.drag.Group', {
    extend: 'Ext.Component',
    xtype: 'drag-group',

    // <example>
    requires: ['KitchenSink.view.drag.GroupController'],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/GroupController.js'
    }],
    // </example>

    controller: 'drag-group',
    cls: 'stretch-html',
    padding: 5,
    html: '<div class="group-source-group1 group-source">group1</div>' +
          '<div class="group-source-group2 group-source">group2</div>' +
          '<div class="group-source-both group-source">group1, group2</div>' +

          '<div class="group-target-group1 group-target">group1</div>' +
          '<div class="group-target-group2 group-target">group2</div>' +
          '<div class="group-target-both group-target">group1, group2</div>'
});
