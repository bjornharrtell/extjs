Ext.define('Oreilly.controller.Speakers', {
	extend: 'Ext.app.Controller',

	stores: [
		'SpeakerSessions',
		'Speakers',
		'SessionSpeakers'
	],

	config: {
		refs: {
			speakerContainer: 'speakerContainer',
			speakers: 'speakerContainer speakers',
			speaker: 'speakerContainer speaker',
			speakerInfo: 'speakerContainer speakerInfo',
			sessions: 'speakerContainer speaker list'
		},
		control: {
			speakers: {
				itemtap: 'onSpeakerTap',
				activate: 'onSpeakersActivate'
			},
			sessions: {
				itemtap: 'onSessionTap'
			}
		}
	},

	onSpeakerTap: function(list, idx, el, record) {
		var sessionStore = Ext.getStore('SpeakerSessions'),
			sessionIds = record.get('sessionIds');

		sessionStore.clearFilter(true);
		sessionStore.filterBy(function(session) {
			return Ext.Array.contains(sessionIds, session.get('id'));
		});

		if (!this.speaker) {
			this.speaker = Ext.widget('speaker');
		}

		this.speaker.config.title = record.getFullName();
		this.getSpeakerContainer().push(this.speaker);
		this.getSpeakerInfo().setRecord(record);
	},

	onSessionTap: function(list, idx, el, record) {

		if (!this.sessionInfo) {
			this.sessionInfo = Ext.widget('sessionInfo');
		}

		this.sessionInfo.config.title = record.get('title');
		this.sessionInfo.setRecord(record);
		this.getSpeakerContainer().push(this.sessionInfo);
	},

	onSpeakersActivate: function() {
		if (this.speaker) {
			this.speaker.down('list').deselectAll();
		}
	}

});
