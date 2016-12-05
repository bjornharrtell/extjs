Ext.define('KitchenSink.data.calendar.Week', {
    requires: [
        'KitchenSink.data.Init',
        'KitchenSink.data.calendar.Util'
    ]
}, function() {
    var U = KitchenSink.data.calendar.Util,
        D = Ext.Date,
        today = D.clearTime(new Date(), true),
        start = U.findPrevious(today, 0),
        data = {
            work: (function() {
                var sd = start.getDate(),
                    ret = [];

                ret.push({
                    title: 'Release Meeting',
                    startDate: U.setDate(start, sd + 1, 9, 30),
                    endDate: U.setDate(start, sd + 1, 11, 0)
                }, {
                    title: 'Ben Farewell Lunch',
                    startDate: U.setDate(start, sd + 2, 12, 0),
                    endDate: U.setDate(start, sd + 2, 14, 0)
                }, {
                    title: 'Client A Meeting',
                    startDate: U.setDate(start, sd + 3, 14, 0),
                    endDate: U.setDate(start, sd + 3, 16, 0)
                }, {
                    title: 'Client B Meeting',
                    startDate: U.setDate(start, sd + 4, 10, 0),
                    endDate: U.setDate(start, sd + 4, 11, 30)
                }, {
                    allDay: true,
                    title: 'Help Web Team',
                    startDate: U.setDate(start, sd + 4, 0, 0),
                    endDate: U.setDate(start, sd + 6, 0, 0)
                });

                return U.generateIds(ret, 100);
            })(),
            personal: (function() {
                var ret = [],
                    d;

                ret.push({
                    title: 'Mom Bday Party',
                    startDate: U.setHours(start, 11, 0),
                    endDate: U.setHours(start, 16, 0)
                });

                d = D.add(start, D.DAY, 3);

                ret.push({
                    title: 'Book Group',
                    startDate: U.setHours(d, 18, 30),
                    endDate: U.setHours(d, 19, 30)
                });

                return U.generateIds(ret, 200);
            })()
        };

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarWeek': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarWeekEvents/1'
                    }
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarWeekEvents/2'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarWeekEvents/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        },
        '/KitchenSink/CalendarWeekEvents/2': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.personal, 2, ctx);
            }
        }
    });
});
