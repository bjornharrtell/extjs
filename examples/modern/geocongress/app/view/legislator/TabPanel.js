/**
 * The container for a Legislator's Info, Sponsored Bills and Votes
 */
Ext.define('GeoCon.view.legislator.TabPanel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'GeoCon.view.legislator.Info',
        'GeoCon.view.bill.List',
        'GeoCon.view.vote.List'
    ],

    id: 'legislatorTabPanel',

    config: {
        tabBar: {
            layout: {
                pack: 'center'
            }
        },
        items: [
            {
                id: 'legislatorToolbar',
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back',
                        id: 'legislatorBackButton'
                    }
                ]
            },
            { title: 'Bio',   xclass: 'GeoCon.view.legislator.Info' },
            { title: 'Bills', xclass: 'GeoCon.view.bill.List' },
            { title: 'Votes', xclass: 'GeoCon.view.vote.List' }
        ]
    }
});
