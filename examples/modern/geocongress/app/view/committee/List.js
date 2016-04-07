/**
 * A list of Committees
 */
Ext.define('GeoCon.view.committee.List', {
    extend: 'Ext.dataview.List',

    id: 'committeeList',

    config: {
        flex: 1,
        store: 'Committees',
        variableHeights: true,
        itemTpl: [
            '<div class="committee">{name}</div>'
        ]
    }
});
