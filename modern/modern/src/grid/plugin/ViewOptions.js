/**
 * The Modern Grid's ViewOptions plugin produces a menu that slides in from the right (by default)
 * when you drag your finger or cursor right-to-left over the grid's column headers. The
 * menu displays the column header names which represents the order of the grid's columns.
 * This allows users to easily reorder the grid's columns by reordering the rows. Items may
 * be dragged by grabbing the furthest left side of the row and moving the item vertically.
 *
 * Once the columns are ordered to your liking, you may then close the menu by tapping the
 * "Done" button.
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *        fields: ['name', 'email', 'phone'],
 *        data: [
 *            { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
 *            { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
 *            { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
 *            { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
 *        ]
 *     );
 *
 *     Ext.create('Ext.grid.Grid', {
 *        store: store,
 *        plugins: [{
 *            type: 'gridviewoptions'
 *        }],
 *        columns: [
 *            { text: 'Name',  dataIndex: 'name', width: 200},
 *            { text: 'Email', dataIndex: 'email', width: 250},
 *            { text: 'Phone', dataIndex: 'phone', width: 120}
 *        ],
 *        height: 200,
 *        layout: 'fit',
 *        fullscreen: true
 *     );
 *
 * Developers may modify the menu and its contents by overriding {@link #sheet} and
 * {@link #columnList} respectively.
 *
 */
Ext.define('Ext.grid.plugin.ViewOptions', {
    extend: 'Ext.Component',
    alias: 'plugin.gridviewoptions' ,

    requires: [
        'Ext.field.Toggle',
        'Ext.dataview.NestedList',
        'Ext.plugin.SortableList'
    ],

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * The width of the menu
         */
        sheetWidth: 320,

        /**
         * The configuration of the menu
         */
        sheet: {
            baseCls: Ext.baseCSSPrefix + 'grid-viewoptions',
            xtype: 'sheet',
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Customize',
                items: {
                    xtype: 'button',
                    text: 'Done',
                    ui: 'action',
                    align: 'right',
                    role: 'donebutton'
                }
            }],
            hideOnMaskTap: false,
            enter: 'right',
            exit: 'right',
            modal: false,
            translatable: {
                translationMethod: 'csstransform'
            },
            right: 0,
            layout: 'fit',
            stretchY: true
        },

        /**
         * The column's configuration
         */
        columnList: {
            xtype: 'nestedlist',
            title: 'Column',
            listConfig: {
                plugins: [{
                    type: 'sortablelist',
                    handleSelector: '.' + Ext.baseCSSPrefix + 'column-options-sortablehandle'
                }],
                mode: 'MULTI',
                infinite: true,
                itemTpl: [
                    '<div class="' + Ext.baseCSSPrefix + 'column-options-itemwrap<tpl if="hidden"> {hiddenCls}</tpl>',
                            '<tpl if="grouped"> {groupedCls}</tpl>">',
                        '<div class="' + Ext.baseCSSPrefix + 'column-options-sortablehandle"></div>',
                        '<tpl if="header">',
                            '<div class="' + Ext.baseCSSPrefix + 'column-options-folder"></div>',
                        '<tpl else>',
                            '<div class="' + Ext.baseCSSPrefix + 'column-options-leaf"></div>',
                        '</tpl>',
                        '<div class="' + Ext.baseCSSPrefix + 'column-options-text">{text}</div>',
                        '<tpl if="groupable && dataIndex">',
                            '<div class="' + Ext.baseCSSPrefix + 'column-options-groupindicator"></div>',
                        '</tpl>',
                        '<div class="' + Ext.baseCSSPrefix + 'column-options-visibleindicator"></div>',
                    '</div>'
                ],
                triggerEvent: null,
                bufferSize: 1,
                minimumBufferSize: 1
            },
            store: {
                type: 'tree',
                fields: [
                    'id',
                    'text',
                    'dataIndex',
                    'header',
                    'hidden',
                    'hiddenCls',
                    'grouped',
                    'groupedCls',
                    'groupable'
                ],
                root: {
                    text: 'Columns'
                }
            },
            clearSelectionOnListChange: false
        },

        /**
         * The CSS class responsible for displaying the visibility indicator.
         */
        visibleIndicatorSelector: '.' + Ext.baseCSSPrefix + 'column-options-visibleindicator',

        /**
         * The CSS class responsible for displaying the grouping indicator.
         */
        groupIndicatorSelector: '.' + Ext.baseCSSPrefix + 'column-options-groupindicator'
    },

    /**
     * @private
     */
    _hiddenColumnCls:  Ext.baseCSSPrefix + 'column-options-hidden',

    /**
     * @private
     */
    _groupedColumnCls: Ext.baseCSSPrefix + 'column-options-grouped',

    /**
     * Determines the menu's visibility when the grid is loaded.
     */
    sheetVisible: false,

    init: function(grid) {
        this.setGrid(grid);
        grid.add(this.getSheet());
        this.getSheet().translate(this.getSheetWidth());

        this.getSheet().down('button[role=donebutton]').on({
            tap: 'onDoneButtonTap',
            scope: this
        });
    },

    updateGrid: function(grid, oldGrid) {
        if (oldGrid) {
            oldGrid.getHeaderContainer().renderElement.un({
                dragstart: 'onDragStart',
                drag: 'onDrag',
                dragend: 'onDragEnd',
                longpress: 'onHeaderLongPress',
                scope: this
            });
            oldGrid.getHeaderContainer().un({
                columnadd: 'onColumnAdd',
                columnmove: 'onColumnMove',
                columnremove: 'onColumnRemove',
                scope: this
            });
        }

        if (grid) {
            grid.getHeaderContainer().renderElement.on({
                dragstart: 'onDragStart',
                drag: 'onDrag',
                dragend: 'onDragEnd',
                longpress: 'onHeaderLongPress',
                scope: this
            });
            grid.getHeaderContainer().on({
                columnadd: 'onColumnAdd',
                columnmove: 'onColumnMove',
                columnremove: 'onColumnRemove',
                columnhide: 'onColumnHide',
                columnshow: 'onColumnShow',
                scope: this
            });
        }
    },

    applySheet: function(sheet) {
        if (sheet && !sheet.isComponent) {
            sheet = Ext.factory(sheet, Ext.Sheet);
        }

        return sheet;
    },

    applyColumnList: function(list) {
        if (list && !list.isComponent) {
            list = Ext.factory(list, Ext.Container);
        }
        return list;
    },

    updateColumnList: function(list) {
        if (list) {
            list.on({
                listchange: 'onListChange',
                scope: this
            });

            list.on({
                dragsort: 'onColumnReorder',
                delegate: '> list',
                scope: this
            });

            this.attachTapListeners();
        }
    },

    updateSheet: function(sheet) {
        var sheetWidth = this.getSheetWidth();
        sheet.setWidth(sheetWidth);
        sheet.translate(sheetWidth);

        sheet.add(this.getColumnList());
    },

    onDoneButtonTap: function() {
        this.hideViewOptions();
    },

    onColumnReorder: function(list, row, newIndex) {
        var column = Ext.getCmp(row.getRecord().get('id')),
            parent = column.getParent(),
            siblings = parent.getInnerItems(),
            i, ln, sibling;

        for (i = 0, ln = newIndex; i < ln; i++) {
            sibling = siblings[i];
            if (!sibling.isHeaderGroup && sibling.getIgnore()) {
                newIndex += 1;
            }
        }

        this.isMoving = true;
        parent.insert(newIndex, column);
        this.isMoving = false;
    },

    attachTapListeners: function() {
        var activeList = this.getColumnList().getActiveItem();
        if (!activeList.hasAttachedTapListeners) {
            activeList.onBefore({
                itemtap: 'onListItemTap',
                scope: this
            });
            activeList.hasAttachedTapListeners = true;
        }
    },

    onListChange: function(nestedList, list) {
        var store = list.getStore(),
            activeNode = store.getNode(),
            records = activeNode.childNodes,
            ln = records.length,
            i, column, record;

        for (i = 0; i < ln; i++) {
            record = records[i];
            column = Ext.getCmp(record.getId());

            record.set('hidden', column.isHidden());
        }

        this.attachTapListeners();
    },

    onListItemTap: function(list, index, row, record, e) {
        var me = this,
            handled = false;

        if (Ext.fly(e.target).is(me.getVisibleIndicatorSelector())) {
            me.onVisibleIndicatorTap(row, record, index);
            handled = true;
        } else if (Ext.fly(e.target).is(me.getGroupIndicatorSelector())) {
            me.onGroupIndicatorTap(row, record, index);
            handled = true;
        }

        return !handled;
    },

    onVisibleIndicatorTap: function(row, record) {
        var hidden = !record.get('hidden'),
            column = Ext.getCmp(record.get('id'));

        if (hidden) {
            column.hide();
            record.set('hidden', true);
        } else {
            column.show();
            record.set('hidden', false);
        }
    },

    onGroupIndicatorTap: function(row, record) {
        var me = this,
            grouped = !record.get('grouped'),
            store = me.getGrid().getStore(),
            groupedRecord = me._groupedRecord;

        if (groupedRecord) {
            groupedRecord.set('grouped', false);
        }

        if (grouped) {
            store.setGrouper({
                property: record.get('dataIndex')
            });
            me._groupedRecord = record;
            record.set('grouped', true);
        } else {
            store.setGrouper(null);
            me._groupedRecord = null;
            record.set('grouped', false);
        }
    },

    onColumnHide: function(headerContainer, column) {
        var nestedList = this.getColumnList(),
            activeList = nestedList.getActiveItem(),
            store = activeList.getStore(),
            record = store.getById(column.getId());

        if (record) {
            record.set('hidden', true);
        }
    },

    onColumnShow: function(headerContainer, column) {
        var nestedList = this.getColumnList(),
            activeList = nestedList.getActiveItem(),
            store = activeList.getStore(),
            record = store.getById(column.getId());

        if (record) {
            record.set('hidden', false);
        }
    },

    onColumnAdd: function(headerContainer, column, header) {
        if (column.getIgnore() || this.isMoving) {
            return;
        }

        var me = this,
            nestedList = me.getColumnList(),
            store = nestedList.getStore(),
            parentNode = store.getRoot(),
            hiddenCls = me._hiddenColumnCls,
            grid = me.getGrid(),
            isGridGrouped = grid.getGrouped(),
            grouper = grid.getStore().getGrouper(),
            dataIndex = column.getDataIndex(),
            data = {
                id: column.getId(),
                text: column.getText(),
                groupable: isGridGrouped && column.getGroupable(),
                hidden: column.isHidden(),
                hiddenCls: hiddenCls,
                grouped: !!(isGridGrouped && grouper && grouper.getProperty() === dataIndex),
                groupedCls: me._groupedColumnCls,
                dataIndex: column.getDataIndex(),
                leaf: true
            }, idx, headerNode;

        if (header) {
            headerNode = parentNode.findChild('id', header.getId());
            if (!headerNode) {
                idx = header.getParent().indexOf(header);
                headerNode = parentNode.insertChild(idx, {
                    header: true,
                    hidden: header.isHidden(),
                    hiddenCls: hiddenCls,
                    id: header.getId(),
                    text: header.getText()
                });
            }
            idx = header.indexOf(column);
            parentNode = headerNode;
        } else {
            idx = headerContainer.indexOf(column);
        }

        parentNode.insertChild(idx, data);
    },

    onColumnMove: function(headerContainer, column, header) {
        this.onColumnRemove(headerContainer, column);
        this.onColumnAdd(headerContainer, column, header);
    },

    onColumnRemove: function(headerContainer, column) {
        if (column.getIgnore() || this.isMoving) {
            return;
        }

        var root = this.getColumnList().getStore().getRoot(),
            record = root.findChild('id', column.getId(), true);

        if (record) {
            record.parentNode.removeChild(record, true);
        }
    },

    onDragStart: function() {
        var sheetWidth = this.getSheetWidth(),
            sheet = this.getSheet();

        if (!this.sheetVisible) {
            sheet.translate(sheetWidth);
            this.startTranslate = sheetWidth;
        } else {
            sheet.translate(0);
            this.startTranslate = 0;
        }
    },

    onDrag: function(e) {
        this.getSheet().translate(Math.max(this.startTranslate + e.deltaX, 0));
    },

    onDragEnd: function(e) {
        var me = this;
        if (e.flick.velocity.x > 0.1) {
            me.hideViewOptions();
        } else {
            me.showViewOptions();
        }
    },

    onHeaderLongPress: function(e) {
        if (!this.sheetVisible) {
            this.showViewOptions();
        }
    },

    hideViewOptions: function() {
        var sheet = this.getSheet();

        this.getGrid().getHeaderContainer().setSortable(true);

        sheet.translate(this.getSheetWidth(), 0, {duration: 100});
        sheet.getTranslatable().on('animationend', function() {
            if (sheet.getModal()) {
                sheet.getModal().destroy();
                sheet.setModal(null);
            }
            sheet.hide();
        }, this, {single: true});

        this.sheetVisible = false;
    },

    showViewOptions: function() {
        var me = this,
            sheet = me.getSheet(),
            modal = null;

        if (!me.sheetVisible) {
            // Since we may have shown the header in response to a longpress we don't
            // want the succeeeding "tap" to trigger column sorting, so we temporarily
            // disable sort-on-tap while the ViewOptions are shown
            me.getGrid().getHeaderContainer().setSortable(false);

            me.updateListInfo();

            sheet.show();

            sheet.translate(0, 0, {duration: 100});
            sheet.getTranslatable().on('animationend', function() {
                sheet.setModal(true);

                modal = sheet.getModal();
                modal.element.onBefore({
                    tap: 'hideViewOptions',
                    dragstart: 'onDragStart',
                    drag: 'onDrag',
                    dragend: 'onDragEnd',
                    scope: me
                });
            }, me, {single: true});

            me.sheetVisible = true;
        }
    },

    privates: {
        updateListInfo: function() {
            var grid = this.getGrid(),
                store = grid.getStore(),
                grouper = store.getGrouper(),
                grouperProp = grouper && grouper.getProperty(),
                headerContainer = grid.getHeaderContainer();

            this.getColumnList().getStore().getRoot().cascadeBy(function(node) {
                var dataIndex = node.get('dataIndex');
                node.set('grouped', dataIndex && dataIndex === grouperProp);
            });
        }
    }
});