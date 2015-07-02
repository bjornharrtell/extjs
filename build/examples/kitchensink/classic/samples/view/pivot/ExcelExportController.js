/**
 * Controls the layout view examples.
 */
Ext.define('KitchenSink.view.pivot.ExcelExportController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pivotexport',

    exportToExcel: function(){
        this.getView().saveDocumentAs({
            title:      'Pivot grid export demo',
            fileName:   'excelExport.xml'
        });
    }

});
