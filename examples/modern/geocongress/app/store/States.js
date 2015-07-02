/**
 * List of states, their abbreviations and the number of districts
 */
Ext.define('GeoCon.store.States', {
    extend  : 'Ext.data.Store',

    config: {
        fields: [
            { name: 'state',       type: 'string' },
            { name: 'abbr',        type: 'string' },
            { name: 'maxDistrict', type: 'number' }
        ],

        data: [
            { abbr: 'AL', state: 'Alabama',              maxDistrict: 10 },
            { abbr: 'AK', state: 'Alaska',               maxDistrict: 0 },
            { abbr: 'AZ', state: 'Arizona',              maxDistrict: 8 },
            { abbr: 'AR', state: 'Arkansas',             maxDistrict: 7 },
            { abbr: 'CA', state: 'California',           maxDistrict: 53 },
            { abbr: 'CO', state: 'Colorado',             maxDistrict: 7 },
            { abbr: 'CT', state: 'Connecticut',          maxDistrict: 6 },
            { abbr: 'DE', state: 'Delaware',             maxDistrict: 0 },
            { abbr: 'DC', state: 'District of Columbia', maxDistrict: 0 },
            { abbr: 'FL', state: 'Florida',              maxDistrict: 25 },
            { abbr: 'GA', state: 'Georgia',              maxDistrict: 13 },
            { abbr: 'HI', state: 'Hawaii',               maxDistrict: 2 },
            { abbr: 'ID', state: 'Idaho',                maxDistrict: 2 },
            { abbr: 'IL', state: 'Illinois',             maxDistrict: 19 },
            { abbr: 'IN', state: 'Indiana',              maxDistrict: 9 },
            { abbr: 'IA', state: 'Iowa',                 maxDistrict: 5 },
            { abbr: 'KS', state: 'Kansas',               maxDistrict: 4 },
            { abbr: 'KY', state: 'Kentucky',             maxDistrict: 6 },
            { abbr: 'LA', state: 'Louisiana',            maxDistrict: 7 },
            { abbr: 'ME', state: 'Maine',                maxDistrict: 2 },
            { abbr: 'MD', state: 'Maryland',             maxDistrict: 8 },
            { abbr: 'MA', state: 'Massachusetts',        maxDistrict: 10 },
            { abbr: 'MI', state: 'Michigan',             maxDistrict: 15 },
            { abbr: 'MN', state: 'Minnesota',            maxDistrict: 8 },
            { abbr: 'MS', state: 'Mississippi',          maxDistrict: 4 },
            { abbr: 'MO', state: 'Missouri',             maxDistrict: 9 },
            { abbr: 'MT', state: 'Montana',              maxDistrict: 0 },
            { abbr: 'NE', state: 'Nebraska',             maxDistrict: 3 },
            { abbr: 'NV', state: 'Nevada',               maxDistrict: 3 },
            { abbr: 'NH', state: 'New Hampshire',        maxDistrict: 2 },
            { abbr: 'NJ', state: 'New Jersey',           maxDistrict: 13 },
            { abbr: 'NM', state: 'New Mexico',           maxDistrict: 3 },
            { abbr: 'NY', state: 'New York',             maxDistrict: 29 },
            { abbr: 'NC', state: 'North Carolina',       maxDistrict: 13 },
            { abbr: 'ND', state: 'North Dakota',         maxDistrict: 0 },
            { abbr: 'OH', state: 'Ohio',                 maxDistrict: 18 },
            { abbr: 'OK', state: 'Oklahoma',             maxDistrict: 5 },
            { abbr: 'OR', state: 'Oregon',               maxDistrict: 0 },
            { abbr: 'PA', state: 'Pennsylvania',         maxDistrict: 19 },
            { abbr: 'RI', state: 'Rhode Island',         maxDistrict: 2 },
            { abbr: 'SC', state: 'South Carolina',       maxDistrict: 6 },
            { abbr: 'SD', state: 'South Dakota',         maxDistrict: 0 },
            { abbr: 'TN', state: 'Tennessee',            maxDistrict: 9 },
            { abbr: 'TX', state: 'Texas',                maxDistrict: 32 },
            { abbr: 'UT', state: 'Utah',                 maxDistrict: 3 },
            { abbr: 'VT', state: 'Vermont',              maxDistrict: 0 },
            { abbr: 'VA', state: 'Virginia',             maxDistrict: 11 },
            { abbr: 'WA', state: 'Washington',           maxDistrict: 9 },
            { abbr: 'WV', state: 'West Virginia',        maxDistrict: 3 },
            { abbr: 'WI', state: 'Wisconsin',            maxDistrict: 8 },
            { abbr: 'WY', state: 'Wyoming',              maxDistrict: 0 }
        ]
    }
});
