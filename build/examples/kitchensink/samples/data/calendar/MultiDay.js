Ext.define('KitchenSink.data.calendar.Days', {
    requires: [
        'KitchenSink.data.Init',
        'KitchenSink.data.calendar.Util'
    ]
}, function() {
    var U = KitchenSink.data.calendar.Util,
        D = Ext.Date,
        today = D.clearTime(new Date(), true),
        tomorrow = D.add(today, D.DAY, 1),
        data = {
            work: (function() {
                var ret = [];

                ret.push({
                    title: 'All Day',
                    allDay: true,
                    startDate: U.setHours(today, 0, 0),
                    endDate: U.setHours(tomorrow, 0, 0)
                });

                ret.push({
                    title: 'Daily Stand Up',
                    startDate: U.setHours(today, 8, 30),
                    endDate: U.setHours(today, 9, 0)
                }, {
                    title: 'Client A Meeting',
                    startDate: U.setHours(today, 10, 0),
                    endDate: U.setHours(today, 11, 30)
                }, {
                    title: 'Team Lunch',
                    startDate: U.setHours(today, 12, 30),
                    endDate: U.setHours(today, 13, 30)
                }, {
                    title: 'Dev Meeting',
                    startDate: U.setHours(today, 14, 0),
                    endDate: U.setHours(today, 15, 0)
                }, {
                    title: 'PM Meeting',
                    startDate: U.setHours(today, 14, 30),
                    endDate: U.setHours(today, 15, 30)
                }, {
                    title: 'QA Meeting',
                    startDate: U.setHours(today, 15, 0),
                    endDate: U.setHours(today, 16, 30)
                });

                ret.push({
                    title: 'Hackathon',
                    startDate: U.setHours(tomorrow, 9, 30),
                    endDate: U.setHours(tomorrow, 16, 30)
                }, {
                    title: 'QA Meeting',
                    startDate: U.setHours(tomorrow, 11, 0),
                    endDate: U.setHours(tomorrow, 11, 30)
                }, {
                    title: 'Client B Meeting',
                    startDate: U.setHours(tomorrow, 11, 30),
                    endDate: U.setHours(tomorrow, 13, 0)
                }, {
                    title: 'Review Design Concepts',
                    startDate: U.setHours(tomorrow, 15, 30),
                    endDate: U.setHours(tomorrow, 17, 0)
                });

                return U.generateIds(ret, 100);
            })(),
            personal: (function() {
                var ret = [];

                ret.push({
                    title: 'Call Accountant',
                    startDate: U.setHours(today, 8, 0),
                    endDate: U.setHours(today, 8, 30)
                }, {
                    title: 'Gym',
                    startDate: U.setHours(today, 17, 30),
                    endDate: U.setHours(today, 18, 30)
                }, {
                    title: 'Dinner with Susan',
                    startDate: U.setHours(today, 19, 0),
                    endDate: U.setHours(today, 21, 30)
                });

                ret.push({
                    title: 'Gym',
                    startDate: U.setHours(tomorrow, 7, 30),
                    endDate: U.setHours(tomorrow, 8, 30)
                }, {
                    title: 'Weekly pickup game',
                    startDate: U.setHours(tomorrow, 18, 0),
                    endDate: U.setHours(tomorrow, 19, 30)
                });

                return U.generateIds(ret, 200);
            })()
        };

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarDays': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarDaysEvents/1'
                    }
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarDaysEvents/2'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarDaysEvents/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        },
        '/KitchenSink/CalendarDaysEvents/2': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.personal, 2, ctx);   
            }
        }
    });
});
