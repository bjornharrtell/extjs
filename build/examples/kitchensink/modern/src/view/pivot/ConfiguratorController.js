Ext.define('KitchenSink.view.pivot.ConfiguratorController', {
    extend: 'KitchenSink.view.pivot.PivotController',

    alias: 'controller.pivotconfig',

    events: [
        'beforemoveconfigfield', 'beforeshowconfigfieldsettings', 'showconfigfieldsettings',
        'beforeapplyconfigfieldsettings', 'applyconfigfieldsettings', 'beforeconfigchange',
        'configchange', 'showconfigpanel', 'hideconfigpanel'
    ],

    showConfigurator: function(){
        this.getView().showConfigurator();
    },

    coloredRenderer: function(v, record, dataIndex, cell, column){
        cell.setStyle( Ext.String.format('color: {0};', v > 500 ? 'green' : 'red') );
        return Ext.util.Format.number(v, '0,000.00');
    }
});
