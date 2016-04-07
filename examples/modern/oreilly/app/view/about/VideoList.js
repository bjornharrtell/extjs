Ext.define('Oreilly.view.about.VideoList', {

	extend: 'Ext.List',
	xtype: 'videoList',

	config: {

		disableSelection: true,

		itemCls: 'video',
        store: 'Videos'
	},

	initialize: function() {

		this.setItemTpl([
			'<div class="thumb" style="background-image: url({thumbnail.sqDefault})"></div>',
			'<span class="name">{[values.title.replace("' + this.config.hideText + '","")]}</span>'
		]);

		this.callParent();

		this.getStore().load({
			url: 'http://gdata.youtube.com/feeds/api/playlists/' + this.config.playlistId + '?v=2&alt=jsonc'
		});
	}
});
