Ext.define('TouchTomatoes.view.MoviesListView', {
    extend: 'Ext.Container',
    xtype: 'movieslistview',
    requires: [
        'Ext.dataview.DataView',
        'Ext.dataview.List',
        'TouchTomatoes.proxy.RottenTomatoes', 'TouchTomatoes.model.Movie'],
    config: {
        layout: "vbox",
        title: null,
        header: {
            iconCls: "fa fa-bars",
            ui: "plain",
            docked: "left"
        },
        menu: null,
        enablePaging: false,
        autoLoad: false,
        proxy: {}
    },
    _headerBar: null,
    _list: null,
    _store: null,
    _itemTemplate: null,

    initialize: function() {
        this.create();
    },

    create: function() {
        this.removeAll(false);
        this.add(this.getHeaderBar());
        this.add(this.getList());

        this.down("list").getStore().load();
    },


    getHeaderBar: function() {
        if (!this._headerBar) {
            this._headerBar = Ext.create("Ext.Toolbar", {
                xtype: "toolbar",
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                title: this.getTitle(),
                items: this.getHeader()
            });
        }
        return this._headerBar;
    },

    getList: function() {
        if (!this._list) {
            this._list = Ext.create("Ext.dataview.List", {
                flex: 1,
                emptyText: 'No movies found.',
                loadingText: "Loading Movies",
                cls: 'grid',
                plugins: this.getEnablePaging() ? {
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true
                } : null,
                mode: "simple",
                store: this.getStore(),
                itemTpl: this.getItemTemplate()
            });
        }
        return this._list;
    },

    getStore: function() {
        if (!this._store) {
            this._store = Ext.create("Ext.data.Store", {
                model: "TouchTomatoes.model.Movie",
                autoLoad: this.getAutoLoad() === true,
                remoteFilter: true,
                pageSize: 20,
                proxy: this.getProxy()
            });
        }
        return this._store;
    },

    getItemTemplate: function() {
        if (!this._itemTemplate) {
            this._itemTemplate = new Ext.XTemplate(
                '<div class="movie">',
                '<div class="title">{title}</div>',
                '<div class="img" style="background-image: url(\'{posters.detailed}\')"></div>',
                '<div class="ratings">',
                '<div class="user fa fa-user<tpl if=\"ratings.audience_score &gt; 60\"> success</tpl><tpl if=\"ratings.audience_score &lt; 0\"> unknown</tpl>"><tpl if=\"ratings.audience_score &gt;= 0\">{ratings.audience_score}<tpl else>&nbsp;</tpl></div>',
                '<div class="spacer"></div>',
                '<div class="critics fa fa-pencil<tpl if=\"ratings.critics_score &gt; 60\"> success</tpl><tpl if=\"ratings.critics_score &lt; 0\"> unknown</tpl>"><tpl if=\"ratings.critics_score &gt;= 0\">{ratings.critics_score}<tpl else>&nbsp;</tpl></div>',
                '</div>',
                '</div>'
            )
        }
        return this._itemTemplate;
    },

    applyProxy: function(config) {
        if (Ext.isSimpleObject(config)) {
            return Ext.factory(config, 'TouchTomatoes.proxy.RottenTomatoes')
        }
        return config;
    },

    updateProxy: function(value) {
        if (this._store) {
            this._store.setProxy(value);
            this._store.load();
        }
    },

    updateEnablePaging: function(currentValue, oldValue) {
        if (currentValue != oldValue && (currentValue != false && oldValue != undefined)) {
            this.create();
            this._store.load();
        }
        return currentValue;
    }
});
