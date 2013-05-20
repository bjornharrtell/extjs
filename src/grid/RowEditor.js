/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
// Currently has the following issues:
// - Does not handle postEditValue
// - Fields without editors need to sync with their values in Store
// - starting to edit another record while already editing and dirty should probably prevent it
// - aggregating validation messages
// - tabIndex is not managed bc we leave elements in dom, and simply move via positioning
// - layout issues when changing sizes/width while hidden (layout bug)

/**
 * Internal utility class used to provide row editing functionality. For developers, they should use
 * the RowEditing plugin to use this functionality with a grid.
 *
 * @private
 */
Ext.define('Ext.grid.RowEditor', {
    extend: 'Ext.form.Panel',
    alias: 'widget.roweditor',
    requires: [
        'Ext.tip.ToolTip',
        'Ext.util.HashMap',
        'Ext.util.KeyNav',
        'Ext.grid.RowEditorButtons'
    ],

    //<locale>
    saveBtnText  : 'Update',
    //</locale>
    //<locale>
    cancelBtnText: 'Cancel',
    //</locale>
    //<locale>
    errorsText: 'Errors',
    //</locale>
    //<locale>
    dirtyText: 'You need to commit or cancel your changes',
    //</locale>

    lastScrollLeft: 0,
    lastScrollTop: 0,

    border: false,
    
    buttonUI: 'default',
    
    // Change the hideMode to offsets so that we get accurate measurements when
    // the roweditor is hidden for laying out things like a TriggerField.
    hideMode: 'offsets',

    initComponent: function() {
        var me = this,
            form;

        me.cls = Ext.baseCSSPrefix + 'grid-editor ' + Ext.baseCSSPrefix + 'grid-row-editor';

        me.layout = {
            type: 'hbox',
            align: 'middle'
        };

        // Maintain field-to-column mapping
        // It's easy to get a field from a column, but not vice versa
        me.columns = new Ext.util.HashMap();
        me.columns.getKey = function(columnHeader) {
            var f;
            if (columnHeader.getEditor) {
                f = columnHeader.getEditor();
                if (f) {
                    return f.id;
                }
            }
            return columnHeader.id;
        };
        me.mon(me.columns, {
            add: me.doColumnAdd,
            remove: me.doColumnRemove,
            replace: me.onColumnReplace,
            scope: me
        });

        me.callParent(arguments);

        if (me.fields) {
            me.setField(me.fields, true);
            delete me.fields;
        }
        
        me.mon(me.hierarchyEventSource, {
            scope: me,
            show: me.repositionIfVisible
        });
        
        // Ensure that the editor width always matches the total header width
        me.mon(me.view.headerCt, 'afterlayout', me.correctWidth, me);

        form = me.getForm();
        form.trackResetOnLoad = true;
    },
    
    onFieldRender: function(field){
        var me = this,
            margins = me.getEditorMargins(field),
            column = me.columns.get(field.id),
            fn;
            
        field.setMargin('0 ' + margins.right + ' 0 ' + margins.left, true);
        if (column.isVisible()) {
            me.setFieldWidth(column, field);
        } else if (!column.rendered) {
            // column is pending a layout, so we can't set the width until it does
            fn = Ext.Function.bind(me.setFieldWidth, me, [column, field]);
            me.mon(me.view.headerCt, 'afterlayout', fn, me, {
                single: true
            })
        }
    },
    
    setFieldWidth: function(column, field) {
        var margins = this.getEditorMargins(field);
        field.setWidth(column.getWidth() - margins.width);
    },
    
    setupMargin: function(field) {
        var me = this,
            cellPadding = me.cellPadding,
            view = me.view,
            fieldPadLeft = 0,
            fieldPadRight = 0,
            offset = 1,
            inputEl, margins,
            cell;
        
        // Get cell padding styles, only need to do this for the first time for this editor
        if (!cellPadding) {
            cell = view.el.down(view.cellSelector + ' ' + view.innerSelector);
            if (cell) {
                cellPadding = {
                    left: cell.getPadding('l'),
                    right: cell.getPadding('r'),
                    top: cell.getPadding('t'),
                    bottom: cell.getPadding('b')
                };
            } else {
                // Trying to edit with no rows, need to fall back to 0/0.
                cellPadding = {
                    left: 0,
                    right: 0    
                };
            }
            me.cellPadding = cellPadding;
        }
        
        // Only need to setup margins on a per field basis
        inputEl = field.inputEl;
        if (inputEl) {
            fieldPadLeft = inputEl.getPadding('l');
            fieldPadRight = inputEl.getPadding('r'); 
        }
        
        if (field.isXType('textfield')) {
            offset = 1;
        }
        
        // Ensure we get at 1px of margin on each side so they arent flush against the edge
        margins = {
            left: Math.max(1, cellPadding.left - (fieldPadLeft + offset)),
            right: Math.max(1, cellPadding.right - (fieldPadRight + offset)),
            top: cellPadding.top,
            bottom: cellPadding.bottom
        };
        margins.width = margins.left + margins.right;
        field.editorMargin = margins;
        return margins;
    },
    
    getEditorMargins: function(field) {
        var margins = field.editorMargin;

        // Cell inner padding is fixed.
        if (!margins) {
            margins = this.setupMargin(field);
        }
        return margins;
    },

    onFieldChange: function() {
        var me = this,
            form = me.getForm(),
            valid = form.isValid();
        if (me.errorSummary && me.isVisible()) {
            me[valid ? 'hideToolTip' : 'showToolTip']();
        }
        me.updateButton(valid);
        me.isValid = valid;
    },

    updateButton: function(valid){
        var buttons = this.floatingButtons; 
        if (buttons) {
            buttons.child('#update').setDisabled(!valid);
        } else {
            // set flag so we can disabled when created if needed
            this.updateButtonDisabled = !valid;
        }
    },

    afterRender: function() {
        var me = this,
            plugin = me.editingPlugin,
            grid = plugin.grid,
            field, margins;

        me.callParent(arguments);
        me.mon(me.container, 'scroll', me.onCtScroll, me, { buffer: 10 });

        if (grid.lockable) {
            grid.normalGrid.view.mon(grid.normalGrid.view.el, 'scroll', me.onNormalViewScroll, me, { buffer: 10 });
        }

        // Prevent from bubbling click events to the grid view
        me.mon(me.el, {
            click: Ext.emptyFn,
            stopPropagation: true
        });

        me.el.swallowEvent([
            'keypress',
            'keydown'
        ]);

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: plugin.completeEdit,
            esc: plugin.onEscKey,
            scope: plugin
        });

        me.mon(plugin.view, {
            beforerefresh: me.onBeforeViewRefresh,
            refresh: me.onViewRefresh,
            itemremove: me.onViewItemRemove,
            scope: me
        });
        
        // Prevent trying to reposition while we set everything up
        me.preventReposition = true;
        me.columns.each(function(fieldId, column) {
            field = column.getEditor();
            margins = me.getEditorMargins(field);
            column.getEditor().setMargin('0 ' + margins.right + ' 0 ' + margins.left, true);
            if (column.isVisible()) {
                me.onColumnShow(column);
            }
        }, me);
        delete me.preventReposition;
    },

    onBeforeViewRefresh: function(view) {
        var me = this,
            viewDom = view.el.dom;

        if (me.el.dom.parentNode === viewDom) {
            viewDom.removeChild(me.el.dom);
        }
    },

    onViewRefresh: function(view) {
        var me = this,
            context = me.context,
            idx;

        me.container.dom.appendChild(me.el.dom);

        // Recover our row node after a view refresh
        if (context && (idx = context.store.indexOf(context.record)) >= 0) {
            context.row = view.getNode(idx);
            me.reposition();
            if (me.tooltip && me.tooltip.isVisible()) {
                me.tooltip.setTarget(context.row);
            }
        } else {
            me.editingPlugin.cancelEdit();
        }
    },

    onViewItemRemove: function(record, index) {
        var context = this.context;
        if (context && record === context.record) {
            // if the record being edited was removed, cancel editing
            this.editingPlugin.cancelEdit();
        }
    },

    onCtScroll: function(e, target) {
        var me = this,
            scrollTop  = target.scrollTop,
            scrollLeft = Ext.fly(target).getScrollLeft();

        if (scrollTop !== me.lastScrollTop) {
            me.lastScrollTop = scrollTop;
            if ((me.tooltip && me.tooltip.isVisible()) || me.hiddenTip) {
                me.repositionTip();
            }
        }
        if (scrollLeft !== me.lastScrollLeft) {
            me.lastScrollLeft = scrollLeft;
            me.reposition();
        }
    },

    onNormalViewScroll: function(e, target) {
        if (this.ignoreScroll) {
            this.ignoreScroll = false;
            return;
        }
        var me = this,
            scrollTop  = target.scrollTop;

        if (scrollTop !== me.lastScrollTop) {
            me.lastScrollTop = scrollTop;
            if ((me.tooltip && me.tooltip.isVisible()) || me.hiddenTip) {
                me.repositionTip();
            }
        }
        this.reposition(null, true);
    },

    onColumnResize: function(column, width) {
        var field;

        if (!column.isGroupHeader && this.rendered) {
            field = column.getEditor();
            field.setWidth(width - this.getEditorMargins(field).width);
            this.repositionIfVisible();
        }
    },

    onColumnHide: function(column) {
        if (!column.isGroupHeader) {
            column.getEditor().hide();
            this.repositionIfVisible();
        }
    },

    onColumnShow: function(column) {
        var me = this,
            field;

        if (!column.isGroupHeader) {
            field = column.getEditor();
            field.show();
            if (me.rendered) {
                field.setWidth(column.getWidth() - me.getEditorMargins(field).width);
                if (!me.preventReposition) {
                    this.repositionIfVisible();
                }
            }
        }
    },

    onColumnMove: function(column, fromIdx, toIdx) {
        var grid = this.editingPlugin.grid,
            lockedColCount;

        // If moving within the normal (rightmost) grid, adjust the to/from positions
        // so that they are correct in our unified field collection
        if (grid.lockable && grid.normalGrid.headerCt.contains(column, true)) {
            lockedColCount = grid.lockedGrid.view.getGridColumns().length;
            fromIdx += lockedColCount;
            toIdx += lockedColCount;
        }

        if (!column.isGroupHeader) {
            var field = column.getEditor();
            if (this.items.indexOf(field) != toIdx) {
                this.move(fromIdx, toIdx);
            }
        }
    },

    onColumnAdd: function(column) {
        this.doColumnAdd(this.columns, column.getEditor().id, column);
        if (!column.isGroupHeader) {
            this.setField(column);
        }
    },
    
    doColumnAdd: function(map, fieldId, column){
        var me = this,
            colIdx,
            field;

        if (!column.isGroupHeader) {
            colIdx = me.editingPlugin.grid.headerCt.getHeaderIndex(column);
            field = column.getEditor({ xtype: 'displayfield' });
            me.insert(colIdx, field);
        }
    },

    onColumnRemove: function(column) {
        this.doColumnRemove(this.columns, column.getEditor().id, column);
        this.columns.remove(column);
    },
    
    doColumnRemove: function(map, fieldId, column){
        var me = this,
            field;

        if (!column.isGroupHeader) {
            field = column.getEditor();
            me.remove(field, false);
        }
    },

    onColumnReplace: function(map, fieldId, column, oldColumn) {
        this.onColumnRemove(map, fieldId, oldColumn);
    },

    clearFields: function() {
        var map = this.columns,
            key;

        for (key in map) {
            if (map.hasOwnProperty(key)) {
                map.removeAtKey(key);
            }
        }
    },

    getFloatingButtons: function() {
        var me = this;

        if (!me.floatingButtons) {
            me.floatingButtons = new Ext.grid.RowEditorButtons({
                rowEditor: me,
                renderTo: me.el
            });
        }
        return me.floatingButtons;
    },

    repositionIfVisible: function(c){
        var me = this,
            view = me.view;

        // If we're showing ourselves, jump out
        // If the component we're showing doesn't contain the view
        if (c && (c == me || !c.el.isAncestor(view.el))) {
            return;
        }

        if (me.isVisible() && view.isVisible(true)) {
            me.reposition();
        }
    },

    getRefOwner: function() {
        return this.editingPlugin.grid;
    },

    reposition: function(animateConfig, doNotScroll) {
        var me = this,
            context = me.context,
            row = context && Ext.get(context.row),
            btns = me.getFloatingButtons(),
            btnEl = btns.el,
            grid = me.editingPlugin.grid,
            viewEl = grid.lockable ? grid.normalGrid.view.el : grid.view.el,

            // always get data from ColumnModel as its what drives
            // the GridView's sizing
            mainBodyWidth = grid.headerCt.getFullWidth(),
            scrollerWidth = grid.getWidth(),

            // use the minimum as the columns may not fill up the entire grid
            // width
            width = Math.min(mainBodyWidth, scrollerWidth),
            scrollLeft = Ext.fly(grid.view.el.dom).getScrollLeft(),
            btnWidth = btns.getWidth(),
            left = (width - btnWidth) / 2 + scrollLeft,
            localX = me.getLocalX(),
            scrollDistance,

            invalidateScroller = function() {
                if (!doNotScroll) {

                    // If the buttons are out of view...
                    if ((scrollDistance = (btnEl.getRegion().bottom - grid.el.getRegion().bottom)) > 0) {

                        // Make some extra scroll space to enable them to scroll into view
                        if (grid.lockable) {
                            grid.normalGrid.view.body.dom.style.marginBottom =
                            grid.lockedGrid.view.body.dom.style.marginBottom = btnEl.getHeight() + 'px';
                        }

                        // Scroll the normal view ensuring we don't recurse
                        me.ignoreScroll = true;
                        viewEl.dom.scrollTop += scrollDistance;

                        // If grid is lockable, the editor will not have moved because it's rendered to the top grid
                        if (grid.lockable) {
                            me.setLocalY(me.getLocalY() - scrollDistance);
                        }
                    }
                }
                if (animateConfig && animateConfig.callback) {
                    animateConfig.callback.call(animateConfig.scope || me);
                }
            },

            animObj;

        // If on a Lockable, align to the normal side
        if (grid.lockable) {
            // We may not need the extra scrollable space - that's decided in the invalidateScroller callback
            grid.normalGrid.view.body.dom.style.marginBottom =
            grid.lockedGrid.view.body.dom.style.marginBottom = '';
            localX += grid.normalGrid.view.el.dom.scrollLeft * (me.rtl ? 1 : -1);
        }

         // need to set both top/left
        if (row && Ext.isElement(row.dom)) {
            // Bring our row into view if necessary, so a row editor that's already
            // visible and animated to the row will appear smooth

            if (!doNotScroll) {
                row.scrollIntoView(viewEl, false);
            }

            // Get the y position of the row relative to its top-most static parent.
            // offsetTop will be relative to the table, and is incorrect
            // when mixed with certain grid features (e.g., grouping).
            me.setLocalX(localX);

            if (animateConfig) {
                animObj = {
                    to: {
                        y: row.getXY()[1] - me.body.getBorderPadding().beforeY
                    },
                    duration: animateConfig.duration || 125,
                    listeners: {
                        afteranimate: function() {
                            me.setButtonPosition(btnEl, left);
                            invalidateScroller();
                        }
                    }
                };
                me.animate(animObj);
            } else {
                me.setLocalY((grid.lockable ? row.getOffsetsTo(grid.body)[1] : row.dom.offsetTop) - me.body.getBorderPadding().beforeY);
                me.setButtonPosition(btnEl, left);
                invalidateScroller();
            }
        }
        me.correctWidth();
    },

    // Private called when the owning grid header container lays out
    correctWidth: function() {
        var me = this,
            mainBodyWidth;

        // Do nothing if not rendered, or hidden, or if a refresh has kicked us out of the View's DOM
        if (me.rendered && me.isVisible() && me.el.dom.parentNode) {
            mainBodyWidth = me.editingPlugin.grid.headerCt.getFullWidth();
            if (me.getWidth() != mainBodyWidth) {
                me.setWidth(mainBodyWidth);
            }
        }
    },

    getLocalX: function() {
        return 0;
    },

    setButtonPosition: function(btnEl, left){
        btnEl.setLocalXY(left, this.el.dom.offsetHeight - 1);
    },

    getEditor: function(fieldInfo) {
        var me = this;

        if (Ext.isNumber(fieldInfo)) {
            // Query only form fields. This just future-proofs us in case we add
            // other components to RowEditor later on.  Don't want to mess with
            // indices.
            return me.query('>[isFormField]')[fieldInfo];
        } else if (fieldInfo.isHeader && !fieldInfo.isGroupHeader) {
            return fieldInfo.getEditor();
        }
    },

    removeField: function(field) {
        var me = this;

        // Incase we pass a column instead, which is fine
        field = me.getEditor(field);
        me.mun(field, 'validitychange', me.onValidityChange, me);

        // Remove field/column from our mapping, which will fire the event to
        // remove the field from our container
        me.columns.removeAtKey(field.id);
        Ext.destroy(field);
    },

    setField: function(column, initial) {
        var me = this,
            i,
            length, field;

        if (Ext.isArray(column)) {
            length = column.length;

            for (i = 0; i < length; i++) {
                me.setField(column[i], initial);
            }

            return;
        }

        // Get a default display field if necessary
        field = column.getEditor(null, {
            xtype: 'displayfield',
            // Override Field's implementation so that the default display fields will not return values. This is done because
            // the display field will pick up column renderers from the grid.
            getModelData: function() {
                return null;
            }
        });
        
        me.mon(field, 'change', me.onFieldChange, me);
        if (me.rendered) {
            // Only setup the margins if we're already rendered, otherwise this
            // will be handled automatically when the editor renders
            me.mon(field, 'afterrender', me.onFieldRender, me, {
                single: true
            });
        }
        
        if (me.isVisible() && me.context) {
            if (field.is('displayfield')) {
                me.renderColumnData(field, me.context.record, column);
            } else {
                field.suspendEvents();
                field.setValue(me.context.record.get(column.dataIndex));
                field.resumeEvents();
            }
        }

        // Maintain mapping of fields-to-columns
        // This will fire events that maintain our container items

        me.columns.add(field.id, column);
        if (column.hidden) {
            me.onColumnHide(column);
        } else if (column.rendered && !initial) {
            // Setting after initial render
            me.onColumnShow(column);
        }
    },

    loadRecord: function(record) {
        var me     = this,
            form   = me.getForm(),
            fields = form.getFields(),
            items  = fields.items,
            length = items.length,
            i, displayFields,
            isValid;

        // temporarily suspend events on form fields before loading record to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            items[i].suspendEvents();
        }

        form.loadRecord(record);

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }

        isValid = form.isValid();
        if (me.errorSummary) {
            if (isValid) {
                me.hideToolTip();
            } else {
                me.showToolTip();
            }
        }

        me.updateButton(isValid);

        // render display fields so they honor the column renderer/template
        displayFields = me.query('>displayfield');
        length = displayFields.length;

        for (i = 0; i < length; i++) {
            me.renderColumnData(displayFields[i], record);
        }
    },

    renderColumnData: function(field, record, activeColumn) {
        var me = this,
            grid = me.editingPlugin.grid,
            headerCt = grid.headerCt,
            view = grid.view,
            store = view.store,
            column = activeColumn || me.columns.get(field.id),
            value = record.get(column.dataIndex),
            renderer = column.editRenderer || column.renderer,
            metaData,
            rowIdx,
            colIdx;

        // honor our column's renderer (TemplateHeader sets renderer for us!)
        if (renderer) {
            metaData = { tdCls: '', style: '' };
            rowIdx = store.indexOf(record);
            colIdx = headerCt.getHeaderIndex(column);

            value = renderer.call(
                column.scope || headerCt.ownerCt,
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store,
                view
            );
        }

        field.setRawValue(value);
        field.resetOriginalValue();
    },

    beforeEdit: function() {
        var me = this;

        if (me.isVisible() && me.errorSummary && !me.autoCancel && me.isDirty()) {
            me.showToolTip();
            return false;
        }
    },

    /**
     * Start editing the specified grid at the specified position.
     * @param {Ext.data.Model} record The Store data record which backs the row to be edited.
     * @param {Ext.data.Model} columnHeader The Column object defining the column to be edited.
     */
    startEdit: function(record, columnHeader) {
        var me = this,
            grid = me.editingPlugin.grid,
            store = grid.store,
            view = grid.getView(),
            context = me.context = Ext.apply(me.editingPlugin.context, {
                view: view,
                store: store
            });

        if (!me.rendered) {
            me.render(view.el);
        }
        // make sure our row is selected before editing
        context.grid.getSelectionModel().select(record);

        // Reload the record data
        me.loadRecord(record);

        if (!me.isVisible()) {
            me.show();
        }
        me.reposition({
            callback: this.focusContextCell
        });
    },

    // Focus the cell on start edit based upon the current context
    focusContextCell: function() {
        var field = this.getEditor(this.context.colIdx);
        if (field && field.focus) {
            field.focus();
        }
    },

    cancelEdit: function() {
        var me     = this,
            form   = me.getForm(),
            fields = form.getFields(),
            items  = fields.items,
            length = items.length,
            i;

        me.hide();
        form.clearInvalid();

        // temporarily suspend events on form fields before reseting the form to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            items[i].suspendEvents();
        }

        form.reset();

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }
    },

    completeEdit: function() {
        var me = this,
            form = me.getForm();

        if (!form.isValid()) {
            return;
        }

        form.updateRecord(me.context.record);
        me.hide();
        return true;
    },

    onShow: function() {
        this.callParent(arguments);
        this.reposition();
    },

    onHide: function() {
        var me = this;
        me.callParent(arguments);
        if (me.tooltip) {
            me.hideToolTip();
        }
        if (me.context) {
            me.context.view.focus();
            me.context = null;
        }
    },

    isDirty: function() {
        var me = this,
            form = me.getForm();
        return form.isDirty();
    },

    getToolTip: function() {
        return this.tooltip || (this.tooltip = new Ext.tip.ToolTip({
            cls: Ext.baseCSSPrefix + 'grid-row-editor-errors',
            title: this.errorsText,
            autoHide: false,
            closable: true,
            closeAction: 'disable',
            anchor: 'left',
            anchorToTarget: false
        }));
    },

    hideToolTip: function() {
        var me = this,
            tip = me.getToolTip();
        if (tip.rendered) {
            tip.disable();
        }
        me.hiddenTip = false;
    },

    showToolTip: function() {
        var me = this,
            tip = me.getToolTip();

        tip.showAt([0, 0]);
        tip.update(me.getErrors());
        me.repositionTip();
        tip.enable();
    },

    repositionTip: function() {
        var me = this,
            tip = me.getToolTip(),
            context = me.context,
            row = Ext.get(context.row),
            viewEl = context.grid.view.el,
            viewHeight = viewEl.getHeight(),
            viewTop = me.lastScrollTop,
            viewBottom = viewTop + viewHeight,
            rowHeight = row.getHeight(),
            rowTop = row.dom.offsetTop,
            rowBottom = rowTop + rowHeight;

        if (rowBottom > viewTop && rowTop < viewBottom) {
            tip.showAt(tip.getAlignToXY(viewEl, 'tl-tr', [15, row.getOffsetsTo(viewEl)[1]]));
            me.hiddenTip = false;
        } else {
            tip.hide();
            me.hiddenTip = true;
        }
    },

    getErrors: function() {
        var me        = this,
            dirtyText = !me.autoCancel && me.isDirty() ? me.dirtyText + '<br />' : '',
            errors    = [],
            fields    = me.query('>[isFormField]'),
            length    = fields.length,
            i;

        for (i = 0; i < length; i++) {
            errors = errors.concat(
                Ext.Array.map(fields[i].getErrors(), me.createListItem)
            );
        }

        return dirtyText + '<ul class="' + Ext.plainListCls + '">' + errors.join('') + '</ul>';
    },
    
    createListItem: function(e) {
        return '<li>' + e + '</li>'; 
    },
    
    beforeDestroy: function(){
        Ext.destroy(this.floatingButtons, this.tooltip);
        this.callParent();    
    }
});