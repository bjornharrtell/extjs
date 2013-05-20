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
 * Provides indentation and folder structure markup for a Tree taking into account
 * depth and position within the tree hierarchy.
 *
 * @private
 */
Ext.define('Ext.tree.Column', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.treecolumn',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-treecolumn',

    autoLock: true,
    lockable: false,
    draggable: false,
    hideable: false,

    treePrefix: Ext.baseCSSPrefix + 'tree-',
    elbowPrefix: Ext.baseCSSPrefix + 'tree-elbow-',
    expanderCls: Ext.baseCSSPrefix + 'tree-expander',
    imgText: '<img src="{1}" class="{0}" />',
    checkboxText: '<input type="button" role="checkbox" class="{0}" {1} />',

    initComponent: function() {
        var me = this;

        me.origRenderer = me.renderer || me.defaultRenderer;
        me.origScope = me.scope || window;

        me.renderer = me.treeRenderer;
        me.scope = me;

        me.callParent();
    },

    treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
        var me = this,
            buf = [],
            format = Ext.String.format,
            depth = record.getDepth(),
            treePrefix  = me.treePrefix,
            elbowPrefix = me.elbowPrefix,
            expanderCls = me.expanderCls,
            imgText     = me.imgText,
            checkboxText= me.checkboxText,
            formattedValue = me.origRenderer.apply(me.origScope, arguments),
            blank = Ext.BLANK_IMAGE_URL,
            href = record.get('href'),
            target = record.get('hrefTarget'),
            cls = record.get('cls'),
            // subclasses or overrides can implement a getChildCls() method, which can
            // return an extra class to add to all of the cell's child elements (icon,
            // expander, elbow, checkbox).  This is used by the rtl override to add the
            // "x-rtl" class to these elements.
            childCls = me.getChildCls ? me.getChildCls() + ' ' : '';

        while (record) {
            if (!record.isRoot() || (record.isRoot() && view.rootVisible)) {
                if (record.getDepth() === depth) {
                    buf.unshift(format(imgText,
                        childCls +
                        treePrefix + 'icon ' +
                        treePrefix + 'icon' + (record.get('icon') ? '-inline ' : (record.isLeaf() ? '-leaf ' : '-parent ')) +
                        (record.get('iconCls') || ''),
                        record.get('icon') || blank
                    ));
                    if (record.get('checked') !== null) {
                        buf.unshift(format(
                            checkboxText,
                            childCls + (treePrefix + 'checkbox') + (record.get('checked') ? ' ' + treePrefix + 'checkbox-checked' : ''),
                            record.get('checked') ? 'aria-checked="true"' : ''
                        ));
                        if (record.get('checked')) {
                            metaData.tdCls += (' ' + treePrefix + 'checked');
                        }
                    }
                    if (record.isLast()) {
                        if (record.isExpandable()) {
                            buf.unshift(format(imgText, (childCls + elbowPrefix + 'end-plus ' + expanderCls), blank));
                        } else {
                            buf.unshift(format(imgText, (childCls + elbowPrefix + 'end'), blank));
                        }

                    } else {
                        if (record.isExpandable()) {
                            buf.unshift(format(imgText, (childCls + elbowPrefix + 'plus ' + expanderCls), blank));
                        } else {
                            buf.unshift(format(imgText, (childCls + treePrefix + 'elbow'), blank));
                        }
                    }
                } else {
                    if (record.isLast() || record.getDepth() === 0) {
                        buf.unshift(format(imgText, (childCls + elbowPrefix + 'empty'), blank));
                    } else if (record.getDepth() !== 0) {
                        buf.unshift(format(imgText, (childCls + elbowPrefix + 'line'), blank));
                    }
                }
            }
            record = record.parentNode;
        }
        if (href) {
            buf.push('<a class="' + Ext.baseCSSPrefix + 'tree-node-text" href="', href, '" target="', target, '">');
        } else {
            buf.push('<span class="' + Ext.baseCSSPrefix + 'tree-node-text">');
        }
        buf.push(formattedValue);
        if (href) {
            buf.push('</a>');
        } else {
            buf.push('</span>');
        }
        if (cls) {
            metaData.tdCls += ' ' + cls;
        }
        return buf.join('');
    },

    defaultRenderer: Ext.identityFn
});
