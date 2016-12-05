Ext.define('KitchenSink.data.calendar.Month', {
    requires: [
        'KitchenSink.data.Init',
        'KitchenSink.data.calendar.Util'
    ]
}, function() {
    var U = KitchenSink.data.calendar.Util,
        D = Ext.Date,
        firstCurrent = D.clearTime(D.getFirstDateOfMonth(new Date()), true),
        lastCurrent = D.clearTime(D.getLastDateOfMonth(firstCurrent), true),
        data = {
            work: (function() {
                var ret = [],
                    day = 2,
                    current = firstCurrent,
                    tues, d;

                // Scrums
                while (current <= lastCurrent) {
                    current = U.findNext(current, day);
                    tues = day === 2;

                    ret.push({
                        title: 'Scrum',
                        startDate: U.setHours(current, tues ? 9 : 15),
                        endDate: U.setHours(current, tues ? 10 : 16)
                    });
                    day = tues ? 4 : 2;
                }

                // Roadshows
                d = U.findNext(firstCurrent, 1);
                ret.push({
                    title: 'RoadShow Tokyo',
                    allDay: true,
                    startDate: d,
                    endDate: D.add(d, D.DAY, 2)
                });

                d = D.add(d, D.DAY, 8);
                ret.push({
                    title: 'RoadShow Melbourne',
                    allDay: true,
                    startDate: d,
                    endDate: D.add(d, D.DAY, 2)
                });

                d = D.add(d, D.DAY, 8);
                ret.push({
                    title: 'RoadShow London',
                    allDay: true,
                    startDate: d,
                    endDate: D.add(d, D.DAY, 2)
                });

                // Busy Day
                d = U.findNext(U.findNext(firstCurrent, 5), 5);
                ret.push({
                    title: 'Client A',
                    startDate: U.setHours(d, 10),
                    endDate: U.setHours(d, 10, 30)
                });

                ret.push({
                    title: 'Client B',
                    startDate: U.setHours(d, 11),
                    endDate: U.setHours(d, 11, 30)
                });

                ret.push({
                    title: 'Client C',
                    startDate: U.setHours(d, 12),
                    endDate: U.setHours(d, 12, 30)
                });

                ret.push({
                    title: 'Client D',
                    startDate: U.setHours(d, 15),
                    endDate: U.setHours(d, 15, 30)
                });

                return U.generateIds(ret, 100);
            })(),
            personal: (function() {
                var ret = [], 
                    d;


                d = U.setHours(U.findNext(firstCurrent, 5), 19, 0);
                ret.push({
                    title: 'Dinner w/ Tom',
                    startDate: d,
                    endDate: U.setHours(d, 22)
                });

                d = U.findNext(firstCurrent, 6);
                ret.push({
                    title: 'Golf Weekend',
                    allDay: true,
                    startDate: d,
                    endDate: D.add(d, D.DAY, 2)
                });

                // Busy Day
                d = U.findNext(U.findNext(firstCurrent, 5), 5);

                ret.push({
                    title: 'Go to Post Office',
                    allDay: true,
                    startDate: d,
                    endDate: D.add(d, D.DAY, 1)
                });

                ret.push({
                    title: 'Bike Ride',
                    startDate: U.setHours(d, 6),
                    endDate: U.setHours(d, 7)
                });

                ret.push({
                    title: 'Watch Show X',
                    startDate: U.setHours(d, 20),
                    endDate: U.setHours(d, 21)
                });

                ret.push({
                    title: 'Watch Show Y',
                    startDate: U.setHours(d, 22),
                    endDate: U.setHours(d, 23)
                });

                return U.generateIds(ret, 200);
            })()
        };

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarMonth': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarMonthEvents/1'
                    }
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarMonthEvents/2'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarMonthEvents/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        },
        '/KitchenSink/CalendarMonthEvents/2': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.personal, 2, ctx);
            }
        }
    });
});
