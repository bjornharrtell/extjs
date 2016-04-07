/**
 * Displays a Legislators Bio, with a list of Committees they are a sponsor of underneath
 */
Ext.define('GeoCon.view.legislator.Info', {
    extend: 'Ext.Container',

    requires: ['GeoCon.view.legislator.Bio', 'GeoCon.view.committee.List'],

    id: 'legislatorInfo',

    config: {

        layout: 'vbox',

        items: [
            {
                xclass: 'GeoCon.view.legislator.Bio'
            },
            {
                xclass: 'GeoCon.view.committee.List'
            }
        ]
    }
});
