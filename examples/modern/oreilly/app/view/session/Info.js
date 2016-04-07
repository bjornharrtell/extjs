Ext.define('Oreilly.view.session.Info', {

	extend: 'Ext.Container',
	xtype: 'sessionInfo',

	config: {

		cls: 'sessionInfo',

		tpl: Ext.create('Ext.XTemplate',
			'<h3>{title} <small>{room}</small></h3>',
			'<h4>{proposal_type} at {[this.formatTime(values.time)]}</h4>',
			'<p>{description}</p>',
			{
				formatTime: function(time) {
					return ''; //Ext.Date.format(time, 'g:ia, m/d/Y')
				}
			}
		)
	}
});
