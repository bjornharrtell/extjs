Ext.define('Admin.view.email.EmailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.email',

    init: function() {
        this.setCurrentView('emailinbox');
    },

    onBackBtnClick: function() {
        this.setCurrentView('emailinbox');
    },

    onMenuClick: function(menu, item){
        if(item) {
            this.setCurrentView(item.routeId, item.params);
        }
    },

    setCurrentView: function(view, params) {
        var contentPanel = this.getView().down('#contentPanel');

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)){
            return false;
        }

        if (params && params.openWindow) {
            var cfg = Ext.apply({
                xtype: 'emailwindow',
                items: [
                    Ext.apply({
                        xtype: view
                    }, params.targetCfg)
                ]
            }, params.windowCfg);

            Ext.create(cfg);
        } else {
            Ext.suspendLayouts();

            contentPanel.removeAll(true);
            contentPanel.add(
                Ext.apply({
                    xtype: view
                }, params)
            );

            Ext.resumeLayouts(true);
        }
    },

    onGridCellItemClick: function(view, td, cellIndex, record){
        if(cellIndex > 1){
            this.setCurrentView('emaildetails', {record: record});
        } else if (cellIndex === 1) {
            //Invert selection
            record.set('favorite', !record.get('favorite'));
        }
    },

    beforeDetailsRender: function(view) {
        var record = view.record ? view.record : {};

        view.down('#mailBody').setHtml(record.get('contents'));
        view.down('#attachments').setData(record.get('attachments'));
        view.down('#emailSubjectContainer').setData(record.data? record.data: {});
        view.down('#userImage').setSrc('resources/images/user-profile/'+ record.get('user_id') + '.png');
    }
});
