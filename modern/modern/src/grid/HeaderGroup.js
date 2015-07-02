/**
 * @class Ext.grid.HeaderGroup
 * @extends Ext.Container
 * Description
 */
Ext.define('Ext.grid.HeaderGroup', {
    extend: 'Ext.Container',
    alias: 'widget.gridheadergroup',
    isHeaderGroup: true,

    config: {
        /**
         * @cfg {String} text
         * The header text to be used as innerHTML (html tags are accepted) to display in the Grid.
         */
        text: '&nbsp;',

        /**
         * [columns description]
         * @type {[type]}
         */
        columns: null,

        // Default items to undefined here so that we get processed initially, allows
        // us to check the columns config.
        items: undefined,

        defaultType: 'column',
        baseCls: Ext.baseCSSPrefix + 'grid-headergroup',

        /**
         * We hide the HeaderGroup by default, and show it when any columns are added to it.
         * @hide
         */
        hidden: true
    },

    applyItems: function(items, collection) {
        if (!items) {
            items = this.getColumns();
        }
        this.callParent([items, collection]);
    },

    updateText: function(text) {
        this.setHtml(text);
    },

    initialize: function() {
        var me = this;

        me.on({
            add: 'doVisibilityCheck',
            remove: 'doVisibilityCheck'
        });

        me.on({
            show: 'onColumnShow',
            hide: 'onColumnHide',
            delegate: '> column'
        });

        me.callParent();

        me.doVisibilityCheck();
    },

    onColumnShow: function(column) {
        if (this.getVisibleCount() === this.getInnerItems().length) {
            this.show();
        }
    },

    onColumnHide: function(column) {
        if (this.getVisibleCount() === 0) {
            this.hide();
        }
    },

    doVisibilityCheck: function() {
        var me = this,
            columns = me.getInnerItems(),
            ln = columns.length,
            i, column;

        for (i = 0; i < ln; i++) {
            column = columns[i];
            if (!column.isHidden()) {
                if (me.isHidden()) {
                    if (me.initialized) {
                        this.show();
                    } else {
                        me.setHidden(false);
                    }
                }
                return;
            }
        }

        me.hide();
    },

    destroy: function() {
        this.setColumns(null);
        this.callParent();
    },

    privates: {
        getVisibleCount: function() {
            var columns = this.getInnerItems(),
                len = columns.length,
                count = 0,
                i;

            for (i = 0; i < len; ++i) {
                count += columns[i].isHidden() ? 0 : 1;
            }

            return count;
        }
    }
});