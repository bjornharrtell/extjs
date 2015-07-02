Ext.define('Oreilly.view.speaker.Detail', {

	extend: 'Ext.Container',
	xtype: 'speaker',

	config: {

		layout: 'vbox',
		items: [
			{
                flex: 1,
                scrollable: 'vertical',
				xtype: 'speakerInfo'
			},
            {
                xtype: 'component',
                cls: 'dark',
                html: 'Speakers'
            },
			{
                flex: 2,
				xtype: 'list',
				store: 'SpeakerSessions',
				itemTpl: [
					'{title}'
				]
			}
		]

	}
});
