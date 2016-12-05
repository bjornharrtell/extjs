Ext.define('Calendar.util.Remote', {
    singleton: true,

    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    constructor: function() {
        Ext.ux.ajax.SimManager.init({
            defaultSimlet: null
        });
    },

    filter: function(data, start, end) {
        var R = Ext.calendar.date.Range,
            range = new R(start, end);

        return Ext.Array.filter(data, function(event) {
            return range.overlaps(R.fly(event.startDate, event.endDate));
        });
    },

    find: function(base, d, incr) {
        var D = Ext.Date;

        base = D.clone(base);

        while (base.getDay() !== d) {
            base = D.add(base, D.DAY, incr);
        }
        return base;
    },

    findNext: function(base, d) {
        return this.find(base, d, 1);
    },

    findPrevious: function(base, d) {
        return this.find(base, d, -1);
    },

    generateIds: function(data, start) {
        Ext.Array.forEach(data, function(event) {
            event.id = ++start;
        });
        return data;
    },

    generateOutput: function(data, calendarId, ctx) {
        var filtered = this.filter(data, ctx.params.startDate, ctx.params.endDate);
        return this.prepare(filtered, calendarId);
    },

    prepare: function(data, calendarId) {
        var D = Ext.Date;

        return Ext.Array.map(data, function(event) {
            event = Ext.apply({}, event);
            event.calendarId = calendarId;
            if (event.allDay) {
                event.startDate = D.localToUtc(event.startDate);
                event.endDate = D.localToUtc(event.endDate);
            }
            event.startDate = D.format(event.startDate, 'C');
            event.endDate = D.format(event.endDate, 'C');
            return event;
        });
    },

    setDate: function(base, d, h, m) {
        var ret = Ext.Date.clone(base);
        if (d !== undefined) {
            ret.setDate(d);
        }

        if (h !== undefined) {
            ret.setHours(h);
        }

        if (m !== undefined) {
            ret.setMinutes(m);
        }
        return ret;
    },

    setHours: function(base, h, m) {
        return this.setDate(base, undefined, h, m);
    }

}, function(U) {

    function halfhour() {
        return Math.random() < 0.5 ? 30 : 0;
    }

    function getRandom(arr) {
        var n = N.randomInt(0, arr.length - 1);
        return arr[n];
    }

    function getStaticWorkData() {
        var ret = [],
            day = 2,
            firstCurrent = D.clearTime(D.getFirstDateOfMonth(new Date()), true),
            lastCurrent = D.clearTime(D.getLastDateOfMonth(firstCurrent), true),
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
    }

    function getDynamicWorkData() {
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
    }

    function getStaticPersonalData() {
        var ret = [], 
            firstCurrent = D.clearTime(D.getFirstDateOfMonth(new Date()), true),
            lastCurrent = D.clearTime(D.getLastDateOfMonth(firstCurrent), true),
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
    }

    function getDynamicPersonalData() {
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
    }

    function getStaticProjectData() {
        return [];
    }

    function getDynamicProjectData() {
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
    }

    var places = ['London', 'Paris', 'Munich', 'Amsterdam', 'Rome'],
        people = ['Louis', 'Mitch', 'Ava', 'Shelly', 'Vicki', 'Stefanie', 'Jason', 'Elena', 'Randy', 'Fred', 'Debbie'],
        teams1 = ['Release', 'QA', 'Development', 'PM', 'R&D'],
        teams2 = ['Marketing', 'Sales'],
        clients1 = ['Client A', 'Client B', 'Client C', 'Client D'],
        clients2 = ['Client E', 'Client F', 'Client G', 'Client H'],
        workActions = ['Meet', 'Call', 'Review'],
        leisure = ['Hike', 'Gallery', 'Gaming', 'Theatre', 'Bowling', 'Concert'];

    var emptyData = window.location.search.toLowerCase().indexOf('nodata') > -1,
        staticData = window.location.search.toLowerCase().indexOf('staticdata') > -1,
        D = Ext.Date,
        N = Ext.Number,
        now = D.clearTime(new Date()),
        start = D.subtract(D.subtract(now, D.YEAR, 1), D.DAY, 15),
        end = D.add(D.add(now, D.YEAR, 1), D.DAY, 15),
        data = {
            work: emptyData ? [] : (staticData ? getStaticWorkData() : getDynamicWorkData()),
            personal: emptyData ? [] : (staticData ? getStaticPersonalData() : getDynamicPersonalData()),
            projectZeus: emptyData ? [] : (staticData ? getStaticProjectData() : getDynamicProjectData())
        };

    Ext.ux.ajax.SimManager.register({
        '/Calendars': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work Calendar',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/Calendars/1'
                    }
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/Calendars/2'
                    }
                }
            }, {
                id: 3,
                title: 'Project Zeus',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/Calendars/3'
                    }
                }
            }]
        },
        '/Calendars/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        },
        '/Calendars/2': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.personal, 2, ctx);
            }
        },
        '/Calendars/3': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.projectZeus, 3, ctx);
            }
        }
    });
});

