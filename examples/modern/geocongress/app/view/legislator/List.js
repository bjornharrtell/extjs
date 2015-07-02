/**
 * Displays a list of legislators
 */
Ext.define('GeoCon.view.legislator.List', {
    extend: 'Ext.dataview.List',

    id: 'legislatorList',

    config: {
        store: 'Legislators',
        itemHeight: 89,
        emptyText: 'Loading list of Legislators...',
        itemTpl: [
            '<div class="legislator-list-item">',
                '<span class="legislator-pic" style="background-image: url(http://www.govtrack.us/data/photos/{govtrack_id}-50px.jpeg);"></span>',
                '{last_name}, {first_name} {middle_name}',
            '</div>'
        ]
    }
});
