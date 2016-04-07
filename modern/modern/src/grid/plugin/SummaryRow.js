/**
 */
Ext.define('Ext.grid.plugin.SummaryRow', {
    extend: 'Ext.grid.Row',
    alias: 'plugin.gridsummaryrow',

    mixins: [
        'Ext.mixin.Hookable'
    ],

    isSpecialRow: true,

    config: {
        grid: null,
        cls: Ext.baseCSSPrefix + 'grid-summaryrow',
        emptyText: '',
        emptyCls: Ext.baseCSSPrefix + 'grid-summaryrow-empty',
        docked: 'top',
        translatable: {
            translationMethod: 'csstransform'
        }
    },

    init: function(grid) {
        this.setGrid(grid);
    },

    updateGrid: function(grid, oldGrid) {
        var me  = this,
            columns, len, headerContainer, i;

        me.storeListeners = Ext.destroy(me.storeListeners);

        if (grid) {
            columns = grid.getColumns();
            len = columns.length;
            headerContainer = grid.getHeaderContainer();

            me.storeListeners = grid.getStore().onAfter({
                destroyable: true,
                scope: me,
                add: 'doUpdateSummary',
                remove: 'doUpdateSummary',
                update: 'doUpdateSummary',
                refresh: 'doUpdateSummary',
                clear: 'doUpdateSummary'
            });

            grid.getHeaderContainer().on({
                columnadd: 'onColumnAdd',
                columnmove: 'onColumnMove',
                columnremove: 'onColumnRemove',
                columnshow: 'onColumnShow',
                columnhide: 'onColumnHide',
                columnresize: 'onColumnResize',
                scope: me
            });

            if (grid.initialized) {
                grid.container.insertAfter(me, headerContainer);
            } else {
                grid.on('initialize', function() {
                    grid.container.insertAfter(me, headerContainer);
                }, me, {single: true});
            }

            grid.addCls(Ext.baseCSSPrefix + 'grid-hassummaryrow');

            for (i = 0; i < len; i++) {
                me.onColumnAdd(headerContainer, columns[i]);
            }

            me.bindHook(grid, 'onScrollBinder', 'onGridScroll');
        }
    },

    onGridScroll: function(x) {
        if (this.currentX !== x) {
            this.translate(x);
            this.currentX = x;
        }
    },

    onColumnAdd: function(container, column) {
        this.insertColumn(container.getColumns().indexOf(column), column);
        this.updateRowWidth();
    },

    onColumnMove: function(container, column, header, fromIdx, toIdx) {
        this.moveColumn(column, fromIdx, toIdx);
    },

    onColumnRemove: function(container, column) {
        this.removeColumn(column);
        this.updateRowWidth();
    },

    onColumnShow: function(container, column) {
        this.showColumn(column);
        this.updateRowWidth();
    },

    onColumnHide: function(container, column) {
        this.hideColumn(column);
        this.updateRowWidth();
    },

    onColumnResize: function(container, column, width) {
        this.setColumnWidth(column, width);
        this.updateRowWidth();
    },

    updateRowWidth: function() {
        this.setWidth(this.getGrid().getTotalColumnWidth());
    },

    doUpdateSummary: function() {
        var me = this,
            grid = me.getGrid(),
            store = grid.getStore(),
            columns = grid.getColumns(),
            ln = columns.length,
            emptyText = me.getEmptyText(),
            emptyCls = me.getEmptyCls(),
            i, column, type, renderer, cell, value, field;

        for (i = 0; i < ln; i++) {
            column = columns[i];
            type = column.getSummaryType();
            cell = me.getCellByColumn(column);

            if (!column.getIgnore() && type !== null) {
                field = column.getDataIndex();
                renderer = column.getSummaryRenderer();

                if (Ext.isFunction(type)) {
                    value = type.call(store, store.data.items.slice(), field);
                } else {
                    switch (type) {
                        case 'sum':
                        case 'average':
                        case 'min':
                        case 'max':
                            value = store[type](column.getDataIndex());
                            break;

                        case 'count':
                            value = store.getCount();
                            break;
                        default:
                            value = Ext.callback(type, null, [
                                    store.data.items.slice(), field, store
                                ], 0, me);

                            break;
                    }
                }

                if (renderer !== null) {
                    type = typeof renderer;
                    if (type === 'function') {
                        value = renderer.call(store, value, store, field, cell);
                    } else if (type === 'string') {
                        value = Ext.callback(renderer, null, [value, store, field, cell], 0, me);
                    }
                }

                cell.element.removeCls(emptyCls);
                cell.setValue(value);
            } else {
                cell.element.addCls(emptyCls);
                cell.setValue(emptyText);
            }
        }
    },

    destroy: function() {
        this.setGrid(null);
        this.callParent();
    },

    privates: {
        // Don't create a viewmodel from defaults like a normal row might
        applyViewModel: function() {
            return undefined;
        },

        // Prevent summary row from binding like regular cells do.
        getCellCfg: function(column) {
            var cfg = Ext.apply({}, this.callParent([column]));
            delete cfg.bind;
            return cfg;
        }
    }
});
