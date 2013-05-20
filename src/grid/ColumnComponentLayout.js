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
 * Component layout for grid column headers which have a title element at the top followed by content.
 * @private
 */
Ext.define('Ext.grid.ColumnComponentLayout', {
    extend: 'Ext.layout.component.Auto',
    alias: 'layout.columncomponent',

    type: 'columncomponent',

    setWidthInDom: true,

    getContentHeight : function(ownerContext) {
        // If we are a group header return container layout's contentHeight, else default to AutoComponent's answer
        return this.owner.isGroupHeader ? ownerContext.getProp('contentHeight') : this.callParent(arguments);
    },

    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        var result = this.callParent(arguments);
        if (this.owner.isGroupHeader) {
            result += this.owner.titleEl.dom.offsetHeight;
        }
        return result;
    },
    
    getContentWidth : function(ownerContext) {
        // If we are a group header return container layout's contentHeight, else default to AutoComponent's answer
        return this.owner.isGroupHeader ? ownerContext.getProp('contentWidth') : this.callParent(arguments);
    },

    calculateOwnerWidthFromContentWidth: function (ownerContext, contentWidth) {
        return contentWidth + ownerContext.getPaddingInfo().width;
    }
});