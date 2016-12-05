Ext.define('KitchenSink.view.grid.PropertyGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.property-grid',

    beforeRender: function () {
        this.setData('primary');
    },

    onPrimary: function () {
        this.setData('primary');
    },
    
    onAlternate: function(){
        this.setData('alternate');
    },
    
    renderColor: function (v) {
        v = v || '';
        
        var lower = v.toLowerCase();
        return Ext.String.format('<span style="color: {0};">{1}</span>', lower, v);
    },

    setData: function (name) {
        var grid = this.lookup('propGrid'),
            view = this.getView(),
            data = view.extra[name],
            vm = this.getViewModel();

        grid.setSource(data.source, data.config);
        vm.set({
            nowShowing: name
        });
    }
});
