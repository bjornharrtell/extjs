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
 * Private Container class used by the {@link Ext.grid.RowEditor} to hold its buttons.
 */
Ext.define('Ext.grid.RowEditorButtons', {
    extend: 'Ext.container.Container',
    alias: 'widget.roweditorbuttons',

    frame: true,

    constructor: function(config) {
        var rowEditor = config.rowEditor,
            cssPrefix = Ext.baseCSSPrefix,
            plugin = rowEditor.editingPlugin;

        config = Ext.apply({
            floating: {
                shadow: false
            },
            baseCls: cssPrefix + 'grid-row-editor-buttons',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                xtype: 'button',
                ui: rowEditor.buttonUI,
                scope: plugin,
                flex: 1,
                minWidth: Ext.panel.Panel.prototype.minButtonWidth
            },
            items: [{
                cls: cssPrefix + 'row-editor-update-button',
                itemId: 'update',
                handler: plugin.completeEdit,
                text: rowEditor.saveBtnText,
                disabled: rowEditor.updateButtonDisabled
            }, {
                cls: cssPrefix + 'row-editor-cancel-button',
                handler: plugin.cancelEdit,
                text: rowEditor.cancelBtnText
            }]
        }, config);
        this.callParent([config]);
    },

    getTargetEl: function() {
        return this.el;
    },

    // Work round position absolute 100% width bug in IEQuirks
    afterComponentLayout: function() {
        if (Ext.isIEQuirks && !this.componentLayoutCounter) {
            this.el.setWidth(this.width = this.layout.innerCt.getWidth() + this.getFrameInfo().width);
        }
        this.callParent(arguments);        
    }
});