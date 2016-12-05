Ext.define('KitchenSink.view.grid.BigDataController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.grid-bigdata',

    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

    salarySummaryRenderer: function(value) {
        return Ext.util.Format.usMoney(value);
    },

    onVerifyTap: function (btn) {
        var cell = btn.getParent(),
            record = cell.getRecord();

        record.set('verified', true);
        Ext.Msg.alert('Verify', 'Verify ' + record.get('forename') + ' ' + record.get('surname'));
    },

    exportTo: function(){
        var me = this;

        me.exportSheet = Ext.create('Ext.ActionSheet', {
            items: [{
                text:   'Excel xlsx (all items)',
                handler: me.exportToXlsx,
                scope:  me
            },{
                text: 'Excel xml (all items)',
                handler: me.exportToXml,
                scope:  me
            },{
                text:   'CSV (all items)',
                handler: me.exportToCSV,
                scope:  me
            },{
                text:   'TSV (all items)',
                handler: me.exportToTSV,
                scope:  me
            },{
                text:   'HTML (all items)',
                handler: me.exportToHtml,
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

    exportToXml: function(){
        this.doExport({
            type:       'excel03',
            title:      'Pivot grid export demo',
            fileName:   'GridExport.xml'
        });
    },

    exportToCSV: function(){
        this.doExport({
            type:       'csv',
            title:      'Pivot grid export demo',
            fileName:   'GridExport.csv'
        });
    },

    exportToTSV: function(){
        this.doExport({
            type:       'tsv',
            title:      'Pivot grid export demo',
            fileName:   'GridExport.csv'
        });
    },

    exportToHtml: function(){
        this.doExport({
            type:       'html',
            title:      'Pivot grid export demo',
            fileName:   'GridExport.html'
        });
    },

    exportToXlsx: function(){
        this.doExport({
            type:       'excel07',
            title:      'Pivot grid export demo',
            fileName:   'GridExport.xlsx'
        });
    },

    doExport: function(config){
        this.closeExportTo();
        this.getView().saveDocumentAs(config);
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
