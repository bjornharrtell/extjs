Ext.define('KitchenSink.data.calendar.Validation', {
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
                    title: 'Not draggable',
                    startDate: U.setHours(today, 9),
                    endDate: U.setHours(today, 10)
                }, {
                    title: 'Not draggable/resizable',
                    startDate: U.setHours(today, 13),
                    endDate: U.setHours(today, 14)
                }, {
                    title: 'Not resizable',
                    startDate: U.setHours(tomorrow, 9),
                    endDate: U.setHours(tomorrow, 10)
                }, {
                    title: 'Unrestricted',
                    startDate: U.setHours(tomorrow, 13),
                    endDate: U.setHours(tomorrow, 14)
                });

                return U.generateIds(ret, 0);
            })()
        };

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CalendarValidation': {
            type: 'json',
            data: [{
                id: 1,
                title: 'Work',
                eventStore: {
                    proxy: {
                        type: 'ajax',
                        url: '/KitchenSink/CalendarValidation/1'
                    }
                }
            }]
        },
        '/KitchenSink/CalendarValidation/1': {
            type: 'json',
            data: function(ctx) {
                return U.generateOutput(data.work, 1, ctx);
            }
        }
    });
});
