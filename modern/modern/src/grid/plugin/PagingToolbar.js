/**
 */
Ext.define('Ext.grid.plugin.PagingToolbar', {
    extend: 'Ext.Component',
    alias: 'plugin.gridpagingtoolbar',
    mixins: ['Ext.mixin.Hookable'],

    requires: [
        'Ext.Toolbar'
    ],

    config: {
        grid: null,

        currentPage: 1,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,

        toolbar: {
            xtype: 'toolbar',
            docked: 'bottom',
            ui: 'gray',
            cls: Ext.baseCSSPrefix + 'grid-pagingtoolbar',
            items: [{
                xtype: 'button',
                ui: 'plain',
                iconCls: Ext.baseCSSPrefix + 'grid-pagingtoolbar-prev',
                action: 'previouspage'
            }, {
                xtype: 'component',
                role: 'currentpage',
                width: 20,
                cls: Ext.baseCSSPrefix + 'grid-pagingtoolbar-currentpage'
            }, {
                xtype: 'component',
                role: 'totalpages',
                width: 50,
                tpl: '&nbsp;/ {totalPages}'
            }, {
                xtype: 'singlesliderfield',
                value: 1,
                flex: 1,
                minValue: 1,
                role: 'pageslider'
            }, {
                xtype: 'button',
                ui: 'plain',
                iconCls: Ext.baseCSSPrefix + 'grid-pagingtoolbar-next',
                action: 'nextpage'
            }]
        }
    },

    init: function(grid) {
        var me = this;

        me.setGrid(grid);
        grid.container.add(me.getToolbar());
        if (grid.getStore().getCount()) {
            me.updatePageInfo(me.getCurrentPage());
        }
    },

    updateGrid: function(grid, oldGrid) {
        var me = this;

        if (oldGrid) {
            oldGrid.un({
                updatevisiblecount: 'onUpdateVisibleCount',
                scope: me
            });

            oldGrid.getStore().un({
                add: 'onTotalCountChange',
                remove: 'onTotalCountChange',
                refresh: 'onTotalCountChange',
                scope: me
            });

            me.unbindHook(grid, 'onScrollBinder', 'checkPageChange');
        }

        if (grid) {
            grid.on({
                updatevisiblecount: 'onUpdateVisibleCount',
                scope: me
            });

            grid.getStore().on({
                add: 'onTotalCountChange',
                remove: 'onTotalCountChange',
                refresh: 'onTotalCountChange',
                scope: me
            });

            me.bindHook(grid, 'onScrollBinder', 'checkPageChange');
        }
    },

    checkPageChange: function() {
        var me = this,
            grid = me.getGrid(),
            pageSize = me.getPageSize(),
            currentPage = me.getCurrentPage(),
            totalCount = me.getTotalCount(),
            topVisibleIndex = grid.topVisibleIndex,
            newPage = Math.floor(grid.topVisibleIndex / pageSize) + 1;

        if (topVisibleIndex && newPage !== currentPage) {
            me.preventGridScroll = true;
            me.setCurrentPage(newPage);
            me.preventGridScroll = false;
        }
    },

    applyToolbar: function(toolbar) {
        if (toolbar && !toolbar.isComponent) {
            toolbar = Ext.factory(toolbar, Ext.Toolbar);
        }

        return toolbar;
    },

    updateToolbar: function(toolbar) {
        var me = this;

        if (toolbar) {
            me.currentPage = toolbar.down('component[role=currentpage]');
            me.totalPages = toolbar.down('component[role=totalpages]');
            me.pageSlider = toolbar.down('sliderfield[role=pageslider]');

            me.nextPageButton = toolbar.down('button[action=nextpage]');
            me.previousPageButton = toolbar.down('button[action=previouspage]');

            me.pageSlider.on({
                change: 'onPageChange',
                drag: 'onPageSliderDrag',
                scope: me
            });

            me.nextPageButton.on({
                tap: 'onNextPageTap',
                scope: me
            });

            me.previousPageButton.on({
                tap: 'onPreviousPageTap',
                scope: me
            });

            me.currentPage.element.createChild({
                tag: 'span'
            });
        }
    },

    onPageChange: function(field, value) {
        this.setCurrentPage(value);
    },

    onPageSliderDrag: function(field, slider, value) {
        this.setCurrentPage(value);
    },

    onNextPageTap: function() {
        var nextPage = this.getCurrentPage() + 1;
        if (nextPage <= this.getTotalPages()) {
            this.setCurrentPage(nextPage);
        }
    },

    onPreviousPageTap: function() {
        var previousPage = this.getCurrentPage() - 1;
        if (previousPage > 0) {
            this.setCurrentPage(previousPage);
        }
    },

    onTotalCountChange: function(store) {
        this.setTotalCount(store.getCount());
    },

    onUpdateVisibleCount: function(grid, visibleCount) {
        visibleCount -= 1;

        var store = grid.getStore(),
            totalCount = store.getCount(),
            totalPages = Math.ceil(totalCount / visibleCount);

        this.setTotalPages(totalPages);
        this.setPageSize(visibleCount);
    },

    updateTotalPages: function(totalPages) {
        var me = this;

        // Ensure the references are set
        me.getToolbar();

        me.totalPages.setData({
            totalPages: totalPages
        });

        me.pageSlider.setMaxValue(totalPages || 1);

        me.updatePageInfo(me.getCurrentPage());
    },

    updateCurrentPage: function(currentPage) {
        this.updatePageInfo(currentPage);
    },

    updateTotalCount: function(totalCount) {
        var totalPages;

        if (totalCount !== null && totalCount !== undefined) {
            if (totalCount === 0) {
                totalPages = 1;
            } else {
                totalPages = Math.ceil(totalCount / this.getPageSize());
            }
            this.setTotalPages(totalPages);
        }
    },

    updatePageButtons: function() {
        var me = this,
            currentPage = me.getCurrentPage();

        me.previousPageButton.setDisabled(currentPage === me.getTotalPages());
        me.nextPageButton.enable(currentPage === 1);
    },

    getPageTopRecord: function(page) {
        var grid = this.getGrid(),
            store = grid && grid.getStore(),
            pageSize = this.getPageSize(),
            pageTopRecordIndex = (page - 1) * pageSize,
            pageTopRecord = store && store.getAt(pageTopRecordIndex);

        return pageTopRecord;
    },

    privates: {
        updatePageInfo: function(currentPage) {
            var me = this,
                grid = me.getGrid(),
                pageTopRecord;

            // Ensure the references are set
            me.getToolbar();

            // TODO: Calling setHtml causes a performance issue while live scrolling,
            // this might be worth looking into.
            me.currentPage.element.dom.lastChild.innerHTML = currentPage;

            me.pageSlider.setValue(currentPage);

            pageTopRecord = me.getPageTopRecord(currentPage);
            if (grid && !me.preventGridScroll && pageTopRecord) {
                grid.scrollToRecord(pageTopRecord);
            }

            me.updatePageButtons();
        }
    }
});