Ext.define('Oreilly.view.about.HtmlPage', {

	extend: 'Ext.Container',
	xtype: 'htmlPage',

    config: {
        scrollable: 'vertical',
        cls: 'htmlPage'
    },

	initialize: function() {

		 Ext.Ajax.request({
            url: this.config.url,
            success: function(rs) {
                this.setHtml(rs.responseText);
            },
            scope: this
        });
	}
});
