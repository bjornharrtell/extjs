Ext.define('Calendar.view.calendar.Panel', {
    extend: 'Ext.calendar.panel.Panel',
    xtype: 'app-calendar',

    config: {
        calendarList: {
            padding: 8
        },
        sideBar: {
            ui: 'default',
            bodyPadding: 0,
            title: 'Ext JS Calendar'
        },
        sheet: {
            title: 'Ext JS Calendar',
            ui: 'default'
        },
        sideBarHeader: {
            weight: -1,
            margin: '0 0 3em 0'
        }
    },

    privates: {
        attachHeader: function(c) {
            // we need to initialize the header within the panel scope (instead of
            // the sheet one) to ensure that bindings are correctly resolved.
            c.items.unshift(this.getSideBarHeader());
            return c;
        },

        createSheet: function() {
            return this.attachHeader(this.callParent());
        },
        createSideBar: function() {
            return this.attachHeader(this.callParent());
        }
    }
});
