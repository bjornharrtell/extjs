/**
 * This example shows how to receive an HTML5 File Drop.
 */
Ext.define('KitchenSink.view.drag.File', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-file',
    controller: 'drag-file',

    requires: [
        'Ext.layout.container.Fit'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/FileController.js'
    }],
    //</example>

    title: 'File Drag',
    width: 500,
    height: 300,
    bodyPadding: 5,
    layout: 'fit',

    bodyCls: 'drag-file-ct',

    html:
        '<div class="drag-file-label">' +
            'Drop some files here' +
        '</div>' +
        '<div class="drag-file-icon"></div>'
});
