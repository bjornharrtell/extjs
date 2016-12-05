/**
 * This example shows how to receive an HTML5 File Drop.
 */
Ext.define('KitchenSink.view.drag.File', {
    extend: 'Ext.Panel',
    xtype: 'drag-file',
    
    // <example>
    requires: [
        'KitchenSink.view.drag.FileController',
        'Ext.layout.Fit'
    ],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/FileController.js'
    }],
    // </example>

    controller: 'drag-file',
    cls: 'stretch-html',
    bodyPadding: 5,
    layout: 'fit',

    html: '<div class="drag-file-label">Drag your files here</div><div class="drag-file-icon"></div>'
});
