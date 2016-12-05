/**
 * Controls the exporter examples.
 */
Ext.define('KitchenSink.view.pivot.ExporterController', {
    extend: 'KitchenSink.view.pivot.PivotController',

    alias: 'controller.pivotexport',

    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

    events: ['beforedocumentsave', 'documentsave', 'dataready'],

    exportAllToXml: function(){
        this.doExport({
            type:       'excel03',
            title:      'Pivot grid export demo',
            fileName:   'ExportAll.xml'
        });
    },

    exportVisibleToXml: function(){
        this.doExport({
            type:               'excel03',
            title:              'Pivot grid export demo',
            fileName:           'ExportVisible.xml',
            onlyExpandedNodes:  true
        });
    },

    exportAllToCSV: function(){
        this.doExport({
            type:       'csv',
            title:      'Pivot grid export demo',
            fileName:   'ExportAll.csv'
        });
    },

    exportVisibleToCSV: function(){
        this.doExport({
            type:               'csv',
            title:              'Pivot grid export demo',
            fileName:           'ExportVisible.csv',
            onlyExpandedNodes:  true
        });
    },

    exportAllToTSV: function(){
        this.doExport({
            type:       'tsv',
            title:      'Pivot grid export demo',
            fileName:   'ExportAll.csv'
        });
    },

    exportVisibleToTSV: function(){
        this.doExport({
            type:               'tsv',
            title:              'Pivot grid export demo',
            fileName:           'ExportVisible.csv',
            onlyExpandedNodes:  true
        });
    },

    exportAllToHtml: function(){
        this.doExport({
            type:       'html',
            title:      'Pivot grid export demo',
            fileName:   'ExportAll.html'
        });
    },

    exportVisibleToHtml: function(){
        this.doExport({
            type:               'html',
            title:              'Pivot grid export demo',
            fileName:           'ExportVisible.html',
            onlyExpandedNodes:  true
        });
    },

    exportAllToXlsx: function(){
        this.doExport({
            type:       'excel07',
            title:      'Pivot grid export demo',
            fileName:   'ExportAll.xlsx'
        });
    },

    exportVisibleToXlsx: function(){
        this.doExport({
            type:               'excel07',
            title:              'Pivot grid export demo',
            fileName:           'ExportVisible.xlsx',
            onlyExpandedNodes:  true
        });
    },

    doExport: function(config){
        this.getView().saveDocumentAs(config).then(null, this.onError);
    },

    onError: function(error){
        Ext.Msg.alert('Error', typeof error === 'string' ? error : 'Unknown error');
    },

    onBeforeDocumentSave: function(view){
        view.mask('Document is prepared for export. Please wait ...');
    },

    onDocumentSave: function(view){
        view.unmask();
    }

});
