Ext.define('Oreilly.controller.Tweets', {
	extend: 'Ext.app.Controller',
	stores: [
		'Tweets'
	],
	config: {
		refs: {
			title: 'tweets titlebar'
		},
		control: {
			tweets: {
				activate: 'onActivate'
			}
		}
	},

	onActivate: function() {
		if (!this.loadedTweets) {

			this.getTitle().setTitle(Oreilly.app.twitterSearch);

            /*
                Twitter has deprecated the public Search. This application will simulate tweet data
             */

			/*Ext.getStore('Tweets').getProxy().setExtraParams({
				q: Oreilly.app.twitterSearch
			});*/
			Ext.getStore('Tweets').load();

			this.loadedTweets = true;
		}
	}

});
