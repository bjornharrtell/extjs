Ext.define('Ext.overrides.app.Application', {
    override: 'Ext.app.Application',
    requires: ['Ext.viewport.Viewport'],

    initMainView: function() {
        var me = this,
            viewport,
            mainView;

        me.viewport = viewport = Ext.Viewport;

        me.callParent();

        mainView = me.getMainView();

        // Ensure the viewport is ready by the time launch is called
        viewport.onAppLaunch();

        if (mainView) {
            viewport.add(mainView);
        }
    }
});