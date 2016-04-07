Ext.define('Admin.view.pages.ErrorBase', {
    extend: 'Ext.Container',

    requires: [
        'Ext.layout.VBox'
    ],

    layout: {
        type:'vbox',
        align: 'center',
        pack: 'center'
    },

    cls: 'error-page-container',

    defaults:{
        xtype: 'label'
    }
});