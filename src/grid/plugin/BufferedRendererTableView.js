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
 * A set of overrides required by the presence of the BufferedRenderer plugin.
 * 
 * These overrides of Ext.view.Table take into account the affect of a buffered renderer and
 * divert execution from the default course where necessary.
 */
Ext.define('Ext.grid.plugin.BufferedRendererTableView', {
    override: 'Ext.view.Table',

    // Listener function for the Store's add event
    onAdd: function(store, records, index) {
        var bufferedRenderer = this.bufferedRenderer,
            rows = this.all;

        // The newly added records will put us over the buffered view size, so we cannot just add as normal.
        if (bufferedRenderer && (rows.getCount() + records.length) > bufferedRenderer.viewSize) {

            // Index puts the new row(s) in the visible area, then we have to refresh the view
            if (index < rows.startIndex + bufferedRenderer.viewSize && (index + records.length) > rows.startIndex) {
                this.onDataRefresh();
            }
            // New rows outside of visible area, just ensure that the scroll range is updated
            else {
                bufferedRenderer.stretchView(this, bufferedRenderer.getScrollHeight());
            }
        }
        // No BufferedRenderer present
        // or
        // View has not yet reached the viewSize: we can add as normal.
        else {
            this.callParent([store, records, index]);
        }
    },

    // Listener function for the Store's bulkremove event
    onRemove: function(store, records, indices) {

        // If there's a BufferedRenderer, the view must refresh to keep the view correct
        if (this.bufferedRenderer) {
            this.onDataRefresh();
        }
        // No BufferedRenderer present
        // or
        // View has not yet reached the viewSize: we can add as normal.
        else {
            this.callParent([store, records, indices]);
        }
    }
});
