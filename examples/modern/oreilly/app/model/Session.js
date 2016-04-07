Ext.define('Oreilly.model.Session', {
    extend: 'Ext.data.Model',

    fields: [
        'id',
        'title',
        'room',
        {
            name: 'time',
            type: 'date',
            convert: function (value, record) {
                if (value) {
                    var dateArr = value.split(/[\-T:]/);
                    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3]);
                } else {
                    return new Date();
                }
            }
        },
        'speakerIds',
        'description',
        'proposal_type'
    ]
});


// "topics": [
//     "Conversation",
//     "Live Stream"
// ],
// "pretty_time": "2:00pm",
// "room": "Grand Ballroom",
// "end_time": "2010-11-16T14:25:00",
// "description": "TBD",
// "title": "A Conversation with Carol Bartz, CEO, Yahoo!",
// "url": "http://www.web2summit.com/web2010/public/schedule/detail/15362",
// "date": "11/16/2010",
// "speakers": []
// "id": 15362,
// "time": "2010-11-16T14:00:00",
// "proposal_type": "Plenary",
// "day": "Tuesday, 11/16/2010"
