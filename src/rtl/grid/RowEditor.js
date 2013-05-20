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
Ext.define('Ext.rtl.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    setButtonPosition: function(btnEl, left){
        if (this.getHierarchyState().rtl) {
            btnEl.rtlSetLocalXY(left, this.el.dom.offsetHeight - 1);
        } else {
            this.callParent(arguments);
        }
    },

    // Workaround for http://code.google.com/p/chromium/issues/detail?id=174656
    getLocalX: function() {
        var grid = this.editingPlugin.grid,
            view = grid.normalGrid ? grid.normalGrid.view : grid.view,
            viewSize = view.componentLayout.lastComponentSize,
            hasOverflow = viewSize.contentHeight > viewSize.height;

        // Only work back past the incorrect right origin if there is overflow, and we're not in a locking grid
        // (if we are, the RowEditor is rendered to the outer container) and we're in RTL mode and we have the
        // X origin bug.
        return hasOverflow && !grid.normalGrid && grid.getHierarchyState().rtl && Ext.supports.xOriginBug ? -Ext.getScrollbarSize().width : 0;
    }
});
