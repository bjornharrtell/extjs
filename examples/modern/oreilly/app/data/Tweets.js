Ext.define('Oreilly.data.Tweets', {
    singleton: true,

    requires: [
        'Ext.ux.ajax.*'
    ],

    constructor: function() {
        Ext.ux.ajax.SimManager.init({
            defaultSimlet: null
        });
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            url: '/tweets',
            data: [
                {
                    "id": "cb4c0490-d150-43cd-8c42-37376967dde7",
                    "from_user": "Jaan",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "She had to remain standing with the MPs, until Lorne asked them to be seated.",
                    "created_at": "1972-12-22T04:18:18.392Z"
                },
                {
                    "id": "c7fbee2e-29d9-45a3-bb41-4b08f170106a",
                    "from_user": "Shivaji",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Vancouver has a large gay community focused on the West End neighbourhood lining a certain stretch of Davie Street, recently officially designated as Davie Village, though the gay community is omnipresent throughout West End and Yaletown areas.",
                    "created_at": "1984-07-14T01:35:04.337Z"
                },
                {
                    "id": "e4eda83c-0685-4d8f-819e-00a41fbb9940",
                    "from_user": "Triple",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "In 1673 James Davenant, a Fellow since 1661, complained to William Fuller, then Bishop of Lincoln, about Provost Say's conduct in the election of Thomas Twitty to a Fellowship.",
                    "created_at": "1994-02-19T23:04:26.016Z"
                },
                {
                    "id": "338baa8d-ba60-48f5-b8bf-14b5b9dd17e7",
                    "from_user": "Buzz",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "During this time, Whittle was re-promoted to the rank of sergeant.",
                    "created_at": "2008-05-14T21:40:20.353Z"
                },
                {
                    "id": "2b0145e1-0508-436a-b1b2-d5ebaaf643af",
                    "from_user": "Michail",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "This demanded the death penalty, but only where harm had been caused; lesser offences were punishable by a term of imprisonment.",
                    "created_at": "1970-07-20T22:37:48.126Z"
                },
                {
                    "id": "5c48c675-48d4-463c-9395-5ffced9aaee8",
                    "from_user": "Prince",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "He served as Chief of the Air Staff from 1954 to 1957.",
                    "created_at": "1974-11-03T14:23:58.846Z"
                },
                {
                    "id": "bc8fbab1-b4c5-415b-83e0-fbfab6a8de1f",
                    "from_user": "Merle",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Mating typically occurs during September and October, although there are reports of its occurring as late as December, and can be highly conspicuous.",
                    "created_at": "1989-12-03T11:40:41.945Z"
                },
                {
                    "id": "049e60db-77c4-4436-9d56-7e8ebd5e03b3",
                    "from_user": "Friedrich",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Ultimately, he declined the position; by the next year the situation in England had sufficiently changed, and Charles II was proclaimed King.",
                    "created_at": "1982-10-01T22:28:30.819Z"
                },
                {
                    "id": "17d5d61f-fb77-4e7c-a45d-a804e76a0267",
                    "from_user": "Zlatko",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Wulfhere's marriage to Eormenhild of Kent would have brought Mercia into close contact with the Christian kingdoms of Kent and Merovingian Gaul, which were connected by kinship and trade.",
                    "created_at": "1988-12-03T04:37:07.859Z"
                },
                {
                    "id": "a566007b-81b6-4e90-ad35-ab1988f045e8",
                    "from_user": "Stéphane",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "It was superseded in 1861 by Benjamin Thorpe's Rolls edition, which printed six versions in columns, labelled A to F, thus giving the manuscripts the letters which are now used to refer to them.",
                    "created_at": "2009-05-19T02:12:42.955Z"
                },
                {
                    "id": "7e303faa-f16d-462b-ba8f-2ac103404e7b",
                    "from_user": "Chris",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Also in 2010, a print by Wintjiya was selected for inclusion in the annual Fremantle Arts Centre's Print Award.",
                    "created_at": "1999-03-01T10:30:18.139Z"
                },
                {
                    "id": "ac8253fb-49ef-4195-b59b-4e150a892d39",
                    "from_user": "Curly",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "Burnley's Moorhouse's produces a beer called Pendle Witches Brew, and there is a Pendle Witch Trail running from Pendle Heritage Centre to Lancaster Castle, where the accused witches were held before their trial.",
                    "created_at": "1987-09-11T18:55:36.255Z"
                },
                {
                    "id": "103b097c-b5a8-48f3-98bc-642c9bc43937",
                    "from_user": "Henri",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "The United States Army sent two relief teams equipped with serum and blood plasma.",
                    "created_at": "2007-10-18T15:11:37.282Z"
                },
                {
                    "id": "9dd28f9b-0712-4aec-ae6b-1b4820b5744e",
                    "from_user": "Jacques",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "In other regions, populations are stable or fluctuating.",
                    "created_at": "1981-06-15T18:44:14.455Z"
                },
                {
                    "id": "5dcb8633-8ad1-4a50-ba78-ef25126b235f",
                    "from_user": "John",
                    "profile_image_url": "http://placehold.it/50x50",
                    "text": "McCauley instigated the redevelopment of RAAF Base Darwin in the Northern Territory as the first stage of a forward defence strategy.",
                    "created_at": "1989-05-14T19:52:01.618Z"
                }
            ]
        });
    }
});
