Ext.define('KitchenSink.data.calendar.Timezone', {
    requires: [
        'KitchenSink.data.Init',
        'KitchenSink.data.calendar.Util'
    ]
}, function() {
    var U = KitchenSink.data.calendar.Util,
        D = Ext.Date,
        data = {
            work: (function() {
                var today = D.clearTime(new Date(), true),
                    tomorrow = D.add(today, D.DAY, 1),
                    ret = [];

                ret.push({
                    title: 'Write unit tests',
                    allDay: true,
                    startDate: U.setHours(today, 0, 0),
                    endDate: U.setHours(tomorrow, 0, 0)
                }, {
                    title: 'Paris Client Meeting',
                    startDate: U.setHours(today, 8, 30),
                    endDate: U.setHours(today, 9, 30)
                }, {
                    title: 'Sydney Team Meeting',
                    startDate: U.setHours(today, 21, 0),
                    endDate: U.setHours(today, 22, 0)
                });

                return U.generateIds(ret, 0);
            })()
        };

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarTimezone': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarTimezone/1'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarTimezone/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        }
    });
});
