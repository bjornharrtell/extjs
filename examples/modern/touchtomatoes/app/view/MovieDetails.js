Ext.define('TouchTomatoes.view.MovieDetails', {
    extend: 'Ext.Container',
    xtype: "moviedetails",

    requires: [],

    config: {
        fullscreen: true,
        tabBarPosition: "bottom",
        ui: 'light',
        cls: " moviedetails",
        record: null,
        layout: "vbox",
        hidden: true,
        showAnimation: {
            type: "slideIn",
            direction: "down",
            duration: 500
        },
        hideAnimation: {
            type: "slideOut",
            direction: "up",
            duration: 500
        }
    },

    initialize: function() {
        var me = this;
        this.element.on("swipe", function(e) {
            me.fireEvent("swipe", me, e);
        })
    },

    updateRecord: function() {
        this.removeAll(false);
        this.createView();
    },

    createView: function() {
        var record = this.getRecord();
        if (record) {
            var header = this.getHeader(),
                content = this.getContent(),
                data = record.data;

            header.setHtml(this.getHeaderTemplate().apply(data));
            content.setHtml(record.get("synopsis"));
            content.getScrollable().scrollTo(null, 0, false);

            this.add(this.getCloseButton());
            this.add(header);

            if (content.getHtml().length > 0) {
                this.add(content);
            }
        }
    },

    getHeader: function() {
        if (!this._header) {
            this._header = Ext.create("Ext.Container", {
                layout: "vbox"
            });
        }
        return this._header;
    },

    getContent: function() {
        if (!this._content) {
            this._content = Ext.create("Ext.Container", {
                scrollable: true,
                flex: 1,
                cls: "content"
            });
        }
        return this._content;
    },

    getHeaderTemplate: function() {
        if (!this._headerTemplate) {
            this._headerTemplate = new Ext.XTemplate(
                '<div class="title">{title}</div>',
                '<div class="img" style="background-image: url({posters.detailed})"></div>',
                '<div class="info">',
                '<div class="rating">Rated: {mpaa_rating}</div>',
                '<div class="spacer"></div>',
                '<div class="vbox">',
                '<div class="year">Year: {year}</div>',
                '<div class="runtime">Runtime {runtime} minutes</div>',
                '</div>',
                '</div>',
                '<tpl if="abridged_cast.length &gt; 0">',
                '<ul class="cast">',
                '<tpl for="abridged_cast">',
                '<li>{name}</li>',
                '</tpl>',
                '</ul>',
                '</tpl>'
            )
        }
        return this._headerTemplate;
    },
    getCloseButton: function() {
        if (!this._closeButton) {
            this._closeButton = Ext.create('Ext.Button', {
                text: "close",
                action: "close"
            })
        }

        return this._closeButton;
    }
});