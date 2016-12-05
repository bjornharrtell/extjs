Ext.define('KitchenSink.view.pivot.ExporterController', {
    extend: 'KitchenSink.view.pivot.PivotController',

    alias: 'controller.kspivotexcelexport',

    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

    events: ['beforedocumentsave', 'documentsave', 'dataready'],

    exportTo: function(){
        var me = this;

        me.exportSheet = Ext.create('Ext.ActionSheet', {
            items: [{
                text:   'Excel xlsx (all items)',
                handler: me.exportAllToXlsx,
                scope:  me
            },{
                text:   'Excel xlsx (visible items)',
                handler: me.exportVisibleToXlsx,
                scope:  me
            },{
                text: 'Excel xml (all items)',
                handler: me.exportAllToXml,
                scope:  me
            },{
                text:   'Excel xml (visible items)',
                handler: me.exportVisibleToXml,
                scope:  me
            },{
                text:   'CSV (all items)',
                handler: me.exportAllToCSV,
                scope:  me
            },{
                text:   'CSV (visible items)',
                handler: me.exportVisibleToCSV,
                scope:  me
            },{
                text:   'TSV (all items)',
                handler: me.exportAllToTSV,
                scope:  me
            },{
                text:   'TSV (visible items)',
                handler: me.exportVisibleToTSV,
                scope:  me
            },{
                text:   'HTML (all items)',
                handler: me.exportAllToHtml,
                scope:  me
            },{
                text:   'HTML (visible items)',
                handler: me.exportVisibleToHtml,
                scope:  me
            },{
                text:   'Cancel',
                ui:     'confirm',
                handler: me.closeExportTo,
                scope:  me
            }]
        });
        Ext.Viewport.add(me.exportSheet);
        me.exportSheet.show();
    },

    closeExportTo: function(){
        this.exportSheet = Ext.destroy(this.exportSheet);
    },

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
        this.closeExportTo();
        this.getView().saveDocumentAs(config).then(null, this.onError);
    },

    onError: function(error){
        Ext.Msg.alert('Error', typeof error === 'string' ? error : 'Unknown error');
    },

    onBeforeDocumentSave: function(view){
        view.mask({
            xtype: 'loadmask',
            message: 'Document is prepared for export. Please wait ...'
        });
    },

    onDocumentSave: function(view){
        view.unmask();
    }
});
