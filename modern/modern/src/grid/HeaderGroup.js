/**
 * @private
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
         * @cfg {Object[]} columns
         * The columns in this group.
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
        hidden: true,

        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            classList: ['x-container', 'x-unsized'],
            children: [{
                reference: 'textElement',
                className: 'x-grid-headergroup-text'
            }, {
                reference: 'innerElement',
                className: 'x-inner'
            }]
        };
    },

    applyItems: function(items, collection) {
        if (!items) {
            items = this.getColumns();
        }
        this.callParent([items, collection]);
    },

    updateText: function(text) {
        this.textElement.setHtml(text);
    },

    initialize: function() {
        var me = this;

        me.on({
            add: 'doVisibilityCheck',
            remove: 'doVisibilityCheck',
            show: 'onColumnShow',
            hide: 'onColumnHide',
            delegate: '> column',
            scope: 'this'
        });
        
        me.on({
            show: 'onShow',
            scope: 'this'
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

    onShow: function() {
        var toShow;

        // No visible subcolumns, then show the first child.
        if (!this.getVisibleCount()) {
            toShow = this.getComponent(0);
            if (toShow) {
                toShow.show();
            }
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
                        me.show();
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
