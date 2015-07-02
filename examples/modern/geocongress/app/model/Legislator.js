Ext.define('GeoCon.model.Legislator', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'website', type: 'string'},
        {name: 'fax', type: 'string'},
        {name: 'govtrack_id', type: 'string'},
        {name: 'first_name', type: 'string'},
        {name: 'chamber', type: 'string'},
        {name: 'middl_ename', type: 'string'},
        {name: 'last_name', type: 'string'},
        {name: 'congress_office', type: 'string'},
        {name: 'eventful_id', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'contact_form', type: 'string'},
        {name: 'youtube_id', type: 'string'},
        {name: 'twitter_id', type: 'string'},
        {name: 'nickname', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'district', type: 'string'},
        {name: 'title', type: 'string'},
        {
            // This field is used when we group Legislators on the Legislators List.
            // We expand 'Rep' to 'Representative' and 'Sen' to 'Senator'
            name: 'fullTitle',
            type: 'string',
            convert: function (v, record) {
                return record.data.title == 'Rep' ? 'Representatives' : 'Senators';
            }
        },
        {name: 'congresspedia_url', type: 'string'},
        {name: 'in_office', type: 'boolean'},
        {name: 'senate_class', type: 'string'},
        {name: 'name_suffix', type: 'string'},
        {name: 'twitter_id', type: 'string'},
        {name: 'birthdate', type: 'string'},
        {name: 'bioguide_id', type: 'string'},
        {name: 'fec_id', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'crp_id', type: 'string'},
        {name: 'official_rss', type: 'string'},
        {name: 'facebook_id', type: 'string'},
        {name: 'party', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'votesmart_id', type: 'string'}
    ]
});
