Ext.define('Calendar.view.calendar.Panel', {
    extend: 'Ext.calendar.panel.Panel',
    xtype: 'app-calendar',

    config: {
        createButton: {
            margin: '10 0 0 0'
        },
        sideBar: {
            bodyPadding: 0,
            ui: 'default',
            title: 'Ext JS Calendar'
        },
        sideBarHeader: {
            weight: -1,
            margin: '0 0 10px 0'
        }
    },

    privates: {
        createSideBar: function() {
            var result = this.callParent();
            result.items.unshift(this.getSideBarHeader());
            return result;
        }
    }
});
