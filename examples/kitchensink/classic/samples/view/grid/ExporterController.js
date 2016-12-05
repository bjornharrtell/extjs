/**
 * The Controller for the Exporter view.
 *
 * Provides logic which is referenced by listeners, handlers and renderers in the view which are configured
 * as strings. They are resolved to members of this class.
 *
 */
Ext.define('KitchenSink.view.grid.ExporterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-exporter',

    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

    exportToXml: function(){
        this.doExport({
            type:       'excel03',
            title:      'Grid export demo',
            fileName:   'GridExport.xml'
        });
    },

    exportToCSV: function(){
        this.doExport({
            type:       'csv',
            title:      'Grid export demo',
            fileName:   'GridExport.csv'
        });
    },

    exportToTSV: function(){
        this.doExport({
            type:       'tsv',
            title:      'Grid export demo',
            fileName:   'GridExport.csv'
        });
    },

    exportToHtml: function(){
        this.doExport({
            type:       'html',
            title:      'Grid export demo',
            fileName:   'GridExport.html'
        });
    },

    exportToXlsx: function(){
        this.doExport({
            type:       'excel07',
            title:      'Grid export demo',
            fileName:   'GridExport.xlsx'
        });
    },

    doExport: function(config){
        this.getView().saveDocumentAs(config);
    },

    onBeforeDocumentSave: function(view){
        view.mask('Document is prepared for export. Please wait ...');
    },

    onDocumentSave: function(view){
        view.unmask();
    },

    onDataReady: function(){
        Ext.log('"dataready" event fired!');
    }

});
