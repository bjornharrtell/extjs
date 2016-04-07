Ext.define('TouchTomatoes.view.MovieSearch', {
    extend: 'TouchTomatoes.view.MoviesListView',
    xtype: 'moviesearch',
    requires: [
        'Ext.Toolbar', 'Ext.field.Text', 'Ext.field.Search', 'Ext.dataview.List',
        'Ext.form.Panel', 'Ext.plugin.ListPaging',
        'TouchTomatoes.proxy.RottenTomatoes', 'TouchTomatoes.model.Movie'],
    config: {
        enablePaging: true,
        autoLoad: false,
        cls: "moviesearch",
        header: [
            {
                iconCls: "fa fa-bars",
                ui: "plain",
                docked: "left"
            },
            {
                xtype: "formpanel",
                scrollable: null,
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Movie Search..'
                    }
                ]
            }
        ]
    },
    getStore: function() {
        if (!this._store) {
            this.callParent();
            this._store.setRemoteFilter(true);

            //Intercept the load function and short circuit it when there is no query
            this._store.load = Ext.Function.createInterceptor(this._store.load, function() {
                var filters = this.getFilters(),
                    len = filters.length,
                    filter;
                for (var i = 0; i < len; i++) {
                    filter = filters.getAt(i);
                    if (filter.getId() === "query" && filter.getValue().length > 0) return true;
                }
                return false;
            }, this._store)
        }
        return this._store;
    }
});
