Ext.define('KitchenSink.data.calendar.Full', {
    requires: [
        'KitchenSink.data.Init',
        'KitchenSink.data.calendar.Util'
    ]
}, function() {

    function halfhour() {
        return Math.random() < 0.5 ? 30 : 0;
    }

    function getRandom(arr) {
        var n = N.randomInt(0, arr.length - 1);
        return arr[n];
    }

    var places = ['London', 'Paris', 'Munich', 'Amsterdam', 'Rome'],
        people = ['Louis', 'Mitch', 'Ava', 'Shelly', 'Vicki', 'Stefanie', 'Jason', 'Elena', 'Randy', 'Fred', 'Debbie'],
        teams1 = ['Release', 'QA', 'Development', 'PM', 'R&D'],
        teams2 = ['Marketing', 'Sales'],
        clients1 = ['Client A', 'Client B', 'Client C', 'Client D'], 
        clients2 = ['Client E', 'Client F', 'Client G', 'Client H'],
        workActions = ['Meet', 'Call', 'Review'],
        leisure = ['Hike', 'Gallery', 'Gaming', 'Theatre', 'Bowling', 'Concert'];
    
    var U = KitchenSink.data.calendar.Util,
        D = Ext.Date,
        N = Ext.Number,
        now = D.clearTime(new Date(), true),
        start = D.subtract(D.subtract(now, D.YEAR, 1), D.DAY, 15),
        end = D.add(D.add(now, D.YEAR, 1), D.DAY, 15),
        data = {
            work: (function() {
                var current = D.clone(start),
                    data = [],
                    incr, r, n;

                while (current < end) {
                    incr = 1;
                    o = null;

                    if (!D.isWeekend(current)) {
                        r = Math.random();
                        if (r > 0.25) {
                            // Morning event
                            if (Math.random() < 0.5) {
                                n = N.randomInt(8, 12);
                                data.push({
                                    title: getRandom(workActions) + ' with ' + getRandom(teams1),
                                    startDate: U.setDate(current, undefined, n, halfhour()),
                                    endDate: U.setDate(current, undefined, N.randomInt(n + 1, 13), halfhour())
                                });
                            }

                            // Afternoon event
                            if (Math.random() > 0.5) {
                                n = N.randomInt(14, 18);
                                data.push({
                                    title: getRandom(workActions) + ' with ' + getRandom(teams1),
                                    startDate: U.setDate(current, undefined, n, halfhour()),
                                    endDate: U.setDate(current, undefined, N.randomInt(n + 1, 18), halfhour())
                                });
                            }
                        } else if (r > 0.2) {
                            incr = D.FRIDAY - current.getDay() + 1;
                            data.push({
                                title: 'In ' + getRandom(places) + ' office',
                                startDate: current,
                                endDate: D.add(current, D.DAY, incr),
                                allDay: true
                            });

                        }
                    }
                    current = D.add(current, D.DAY, incr);
                }
                return U.generateIds(data, 3000);
            })(),
            personal: (function() {
                var current = D.clone(start),
                    data = [],
                    incr, r, n;

                while (current < end) {
                    incr = 1;

                    if (D.isWeekend(current)) {
                        r = Math.random();
                        if (current.getDay() === D.SATURDAY && r < 0.1) {
                            data.push({
                                title: 'Weekend away in ' + getRandom(places),
                                startDate: current,
                                endDate: D.add(current, D.DAY, 2),
                                allDay: true
                            });
                            incr = 2;
                        } else if (r < 0.3) {
                            data.push({
                                title: getRandom(leisure) + ' with ' + getRandom(people),
                                startDate: current,
                                endDate: D.add(current, D.DAY, 1),
                                allDay: true
                            });
                        } else if (r < 0.7) {
                            n = N.randomInt(9, 18);
                            data.push({
                                title: getRandom(leisure) + ' with ' + getRandom(people),
                                startDate: U.setDate(current, undefined, n, halfhour()),
                                endDate: U.setDate(current, undefined, N.randomInt(n + 1, 21), halfhour())
                            });
                        }
                    } else {
                        if (Math.random() > 0.7) {
                            data.push({
                                title: 'Dinner with ' + getRandom(people),
                                startDate: U.setDate(current, undefined, 19, 30),
                                endDate: U.setDate(current, undefined, 22)
                            });
                        }
                    }
                    current = D.add(current, D.DAY, incr);
                }

                return U.generateIds(data, 6000);
            })(),
            projectZeus: (function() {
                var current = D.clone(start),
                    data = [],
                    deliverables = 0,
                    incr, r, n;

                while (current < end) {
                    incr = 1;
                    o = null;

                    if (!D.isWeekend(current)) {
                        if (current.getDay() === D.TUESDAY || current.getDay() === D.THURSDAY) {
                            data.push({
                                title: 'Scrum',
                                startDate: U.setDate(current, undefined, 9),
                                endDate: U.setDate(current, undefined, 9, 30)
                            });
                        }

                        r = Math.random();
                        if (r > 0.6) {
                            n = N.randomInt(11, 15);
                            data.push({
                                title: getRandom(workActions) + ' with ' + getRandom(teams2),
                                startDate: U.setDate(current, undefined, n, halfhour()),
                                endDate: U.setDate(current, undefined, N.randomInt(n + 1, 17), halfhour())
                            });
                            if (r > 0.9) {
                                ++deliverables;
                                data.push({
                                    title: 'Deliverable ' + deliverables + ' Due',
                                    allDay: true,
                                    startDate: current,
                                    endDate: D.add(current, D.DAY, 1)
                                });
                            }
                        }
                    }

                    current = D.add(current, D.DAY, incr);
                }

                return U.generateIds(data, 9000);
            })()
        };

    

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarFull': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work Calendar',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarFullEvents/1'
                    }
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarFullEvents/2'
                    }
                }
            }, {
                id: 3,
                title: 'Project Zeus',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarFullEvents/3'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarFullEvents/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        },
        '/KitchenSink/CalendarFullEvents/2': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.personal, 2, ctx);
            }
        },
        '/KitchenSink/CalendarFullEvents/3': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.projectZeus, 3, ctx);
            }
        }
    });
});
