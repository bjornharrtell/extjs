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
/**
 * @private
 *
 * This class is used only by the grid's HeaderContainer docked child.
 *
 * It adds the ability to shrink the vertical size of the inner container element back if a grouped
 * column header has all its child columns dragged out, and the whole HeaderContainer needs to shrink back down.
 *
 * Also, after every layout, after all headers have attained their 'stretchmax' height, it goes through and calls
 * `setPadding` on the columns so that they lay out correctly.
 */
Ext.define('Ext.grid.ColumnLayout', {
    extend: 'Ext.layout.container.HBox',
    alias: 'layout.gridcolumn',
    type : 'gridcolumn',

    reserveOffset: false,

    firstHeaderCls: Ext.baseCSSPrefix + 'column-header-first',
    lastHeaderCls: Ext.baseCSSPrefix + 'column-header-last',

    initLayout: function() {
        this.grid = this.owner.up('[scrollerOwner]');
        this.callParent();
    },

    // Collect the height of the table of data upon layout begin
    beginLayout: function (ownerContext) {
        var me = this,
            owner = me.owner,
            grid = me.grid,
            view = grid.view,
            items = me.getVisibleItems(),
            len = items.length,
            firstCls = me.firstHeaderCls, 
            lastCls = me.lastHeaderCls,
            i, item;

        // If we are one side of a locking grid, then if we are on the "normal" side, we have to grab the normal view
        // for use in determining whether to subtract scrollbar width from available width.
        // The locked side does not have scrollbars, so it should not look at the view.
        if (grid.lockable) {
            if (owner.up('tablepanel') === view.normalGrid) {
                view = view.normalGrid.getView();
            } else {
                view = null;
            }
        }
        
        for (i = 0; i < len; i++) {
            item = items[i];
            item.removeCls([firstCls, lastCls]);
            if (i === 0) {
                item.addCls(firstCls);
            }
            
            if (i === len - 1) {
                item.addCls(lastCls);
            }
        }

        me.callParent(arguments);

        // If the owner is the grid's HeaderContainer, and the UI displays old fashioned scrollbars and there is a rendered View with data in it,
        // collect the View context to interrogate it for overflow, and possibly invalidate it if there is overflow
        if (!owner.isHeader && Ext.getScrollbarSize().width && !grid.collapsed && view &&
                view.rendered && (ownerContext.viewTable = view.body.dom)) {
            ownerContext.viewContext = ownerContext.context.getCmp(view);
        }
    },
    
    beginLayoutCycle: function(ownerContext) {
        this.callParent(arguments);
        
        var items = this.getVisibleItems(),
            len = items.length,
            i = 0, item;
             
         // Unstretch child items before the layout which stretches them.
        for (; i < len; i++) {
            item = items[i];
            item.el.setStyle({
                height: 'auto'
            });
            item.titleEl.setStyle({
                paddingTop: '',  // reset back to default padding of the style
                paddingBottom: ''
            });
        }
    },

    roundFlex: function(width) {
        return Math.floor(width);
    },

    calculate: function(ownerContext) {
        this.callParent(arguments);

        if (ownerContext.state.parallelDone) {
            ownerContext.setProp('columnWidthsDone', true);
        }

        // Collect the height of the data table if we need it to determine overflow
        if (ownerContext.viewContext) {
            ownerContext.state.tableHeight = ownerContext.viewTable.offsetHeight;
        }
    },

    completeLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            state = ownerContext.state;

        me.callParent(arguments);

        // If we have not been through this already, and the owning Container is configured
        // forceFit, is not a group column and and there is a valid width, then convert
        // widths to flexes, and loop back.
        if (!ownerContext.flexedItems.length && !state.flexesCalculated && owner.forceFit && !owner.isHeader) {

            // Recalculate based upon all columns now being flexed instead of sized.
            // Set flag, so that we do not do this infinitely
            if (me.convertWidthsToFlexes(ownerContext)) {
                me.cacheFlexes(ownerContext);
                ownerContext.invalidate({
                    state: {
                        flexesCalculated: true
                    }
                });
            }
        }
    },

    convertWidthsToFlexes: function(ownerContext) {
        var me = this,
            totalWidth = 0,
            calculated = me.sizeModels.calculated,
            childItems, len, i, childContext, item;

        childItems = ownerContext.childItems;
        len = childItems.length;

        for (i = 0; i < len; i++) {
            childContext = childItems[i];
            item = childContext.target;

            // For forceFit, just use allocated width as the flex value, and the proportions
            // will end up the same whatever HeaderContainer width they are being forced into.
            totalWidth += childContext.props.width;
            item.flex = ownerContext.childItems[i].flex = childContext.props.width;
            item.width = null;
            childContext.widthModel = calculated;
        }

        // Only need to loop back if the total column width is not already an exact fit
        return totalWidth !== ownerContext.props.width;
   },

    // Set up padding in items
    finalizeLayout: function(ownerContext) {
        var me = this,
            i = 0,
            items = me.getVisibleItems(),
            len = items.length,
            availHeight;

        // Total height of the container.
        availHeight = ownerContext.props.height;

        // If owning Container is a group header, available height does not include our own title element
        if (me.owner.isGroupHeader) {
            availHeight -= me.owner.titleEl.dom.offsetHeight;
        }

        for (; i < len; i++) {
            items[i].setPadding(ownerContext.childItems[i], availHeight);
        }
    },

    /**
     * @private
     * Local getContainerSize implementation accounts for vertical scrollbar in the view.
     */
    getContainerSize: function(ownerContext) {
        var me = this,
            result = me.callParent(arguments),
            viewContext = ownerContext.viewContext,
            viewHeight;

        // If we've collected a viewContext, we will also have the table height
        // If there's overflow, the View must be narrower to accomodate the scrollbar
        if (viewContext && !viewContext.heightModel.shrinkWrap &&
                viewContext.target.componentLayout.ownerContext) { // if (its layout is running)
            viewHeight = viewContext.getProp('height');
            if (isNaN(viewHeight)) {
                me.done = false;
            } else if (ownerContext.state.tableHeight > viewHeight) {
                result.width -= Ext.getScrollbarSize().width;
                ownerContext.state.parallelDone = false;
                viewContext.invalidate();
            }
        }

// TODO - flip the initial assumption to "we have a vscroll" to avoid the invalidate in most
// cases (and the expensive ones to boot)

        return result;
    },

    // FIX: when flexing we actually don't have enough space as we would
    // typically because of the scrollOffset on the GridView, must reserve this
    publishInnerCtSize: function(ownerContext) {
        var me = this,
            size = ownerContext.state.boxPlan.targetSize,
            cw = ownerContext.peek('contentWidth'),
            view;

        // Allow the other co-operating objects to know whether the columns overflow the available width.
        me.owner.tooNarrow = ownerContext.state.boxPlan.tooNarrow;

        // InnerCt MUST stretch to accommodate all columns so that left/right scrolling is enabled in the header container.
        if ((cw != null) && !me.owner.isHeader) {
            size.width = cw;

            // innerCt must also encompass any vertical scrollbar width if there may be one
            view = me.owner.ownerCt.view;
            if (view.scrollFlags.y) {
                size.width += Ext.getScrollbarSize().width;
            }
        }

        return me.callParent(arguments);
    }
});
