/**
 * This example shows how data can be exchanged between
 * sources and targets.
 */
Ext.define('KitchenSink.view.drag.Data', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-data',
    controller: 'drag-data',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/DataController.js'
    }],
    //</example>

    title: 'Drag Data',
    width: 500,
    height: 300,
    bodyPadding: 5,

    html:
        '<div class="data-source">' +
            '<div data-days="2" class="handle">Overnight</div>' +
            '<div data-days="7" class="handle">Expedited</div>' +
            '<div data-days="21" class="handle">Standard</div>' +
        '</div>' +
        '<div class="data-target">Drop delivery option here</div>'
});
