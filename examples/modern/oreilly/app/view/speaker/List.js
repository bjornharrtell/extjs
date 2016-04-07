Ext.define('Oreilly.view.speaker.List', {

	extend: 'Ext.List',
	xtype: 'speakers',

	config: {
		title: 'Speakers',
		itemCls: 'speaker',
        variableHeights: true,
		itemTpl: [
			'<div class="avatar" style="background-image: url({photo});"></div>',
			'<h3>{first_name} {last_name}</h3>',
			'<h4>{position}, {affiliation}</h4>'
		]
	}
});
