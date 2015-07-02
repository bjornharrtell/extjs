Ext.define('GeoCon.model.Committee', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'chamber', type: 'string'},
        {name: 'committee_id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'subcommittees', type: 'string'}
    ]
});
