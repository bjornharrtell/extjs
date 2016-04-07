/**
 * Represents a Bill
 *
 * Field documentation is available here:
 * http://services.sunlightlabs.com/docs/Real_Time_Congress_API/bills/
 */
Ext.define('GeoCon.model.Bill', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'abbreviated', type: 'boolean'},
        {name: 'actions'},
        {name: 'awaiting_signature', type: 'boolean'},
        {name: 'bill_id', type: 'string'},
        {name: 'bill_type', type: 'string'},
        {name: 'chamber', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'committees'},
        {name: 'cosponsor_ids'},
        {name: 'cosponsors'},
        {name: 'cosponsors_count', type: 'number'},
        {name: 'enacted', type: 'boolean'},
        {name: 'introduced_at', type: 'date'},
        {name: 'keywords'},
        {name: 'last_action'},
        {name: 'last_action_at', type: 'date'},
        {
            name: 'last_action_str',
            type: 'string',
            convert: function (v, record) {
                return Ext.Date.format(record.data.last_action_at, 'F j, Y');
            }
        },
        {name: 'last_passage_vote_at', type: 'date'},
        {name: 'last_version'},
        {name: 'last_version_on', type: 'string'},
        {name: 'number', type: 'number'},
        {name: 'official_title', type: 'string'},
        {name: 'passage_votes'},
        {name: 'passage_votes_count', type: 'number'},
        {name: 'popular_title', type: 'string'},
        {name: 'related_bills'},
        {name: 'session', type: 'number'},
        {name: 'short_title', type: 'string'},
        {name: 'sponsor'},
        {name: 'sponsor_id', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'summary', type: 'string'},
        {name: 'titles'},
        {name: 'short_title', type: 'string'},
        {name: 'version_codes'},
        {name: 'version_info'},
        {name: 'versions_count', type: 'number'},
        {name: 'vetoed', type: 'boolean'}
    ]
});
