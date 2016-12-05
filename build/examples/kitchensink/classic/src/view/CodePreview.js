Ext.define('KitchenSink.view.CodePreview', {
    extend: 'Ext.tab.Panel',
    requires: [
        'KitchenSink.view.CodeContent'
    ],

    xtype: 'codePreview',

    // The code must be read in LTR
    bodyPadding: 5,
    bodyStyle: 'direction: ltr;',

    tools: [{
        type: 'maximize',
        tooltip: 'Maximize example code content'
    }],
    showTitle: true,

    initComponent: function() {
        var me = this;

        if (me.showTitle) {
            me.title = 'Details' +
                '<div class="tier tier-premium" ' +
                    'data-qtip="Uses features that require Ext JS Premium">Premium</div>' +
                '<div class="tier tier-pro" ' +
                    'data-qtip="Uses features that require Ext JS Professional">Pro</div>';
        }

        me.callParent();
    }
});
