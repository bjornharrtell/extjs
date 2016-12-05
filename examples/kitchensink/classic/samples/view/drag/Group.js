/**
 * This example shows drag groups.
 */
Ext.define('KitchenSink.view.drag.Group', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-group',
    controller: 'drag-group',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/GroupController.js'
    }],
    //</example>

    title: 'Drag Groups',
    width: 500,
    height: 400,
    bodyPadding: 5,

    html:
        '<div class="group-source-group1 group-source">group1</div>' +
        '<div class="group-source-group2 group-source">group2</div>' +
        '<div class="group-source-both group-source">group1, group2</div>' +

        '<div class="group-target-group1 group-target">group1</div>' +
        '<div class="group-target-group2 group-target">group2</div>' +
        '<div class="group-target-both group-target">group1, group2</div>'
});
