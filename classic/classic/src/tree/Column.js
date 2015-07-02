/**
 * Provides indentation and folder structure markup for a Tree taking into account
 * depth and position within the tree hierarchy.
 */
Ext.define('Ext.tree.Column', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.treecolumn',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-treecolumn',

    autoLock: true,
    lockable: false,
    draggable: false,
    hideable: false,

    iconCls: Ext.baseCSSPrefix + 'tree-icon',
    checkboxCls: Ext.baseCSSPrefix + 'tree-checkbox',
    elbowCls: Ext.baseCSSPrefix + 'tree-elbow',
    expanderCls: Ext.baseCSSPrefix + 'tree-expander',
    textCls: Ext.baseCSSPrefix + 'tree-node-text',
    innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-treecolumn',
    customIconCls: Ext.baseCSSPrefix + 'tree-icon-custom',
    isTreeColumn: true,

    cellTpl: [
        '<tpl for="lines">',
            '<div class="{parent.childCls} {parent.elbowCls}-img ',
            '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
        '</tpl>',
        '<div class="{childCls} {elbowCls}-img {elbowCls}',
            '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
        '<tpl if="checked !== null">',
            '<div role="button" {ariaCellCheckboxAttr}',
                ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
        '</tpl>',
        '<tpl if="icon"><img src="{blankUrl}"<tpl else><div</tpl>',
            ' role="presentation" class="{childCls} {baseIconCls} {customIconCls} ',
            '{baseIconCls}-<tpl if="leaf">leaf<tpl else><tpl if="expanded">parent-expanded<tpl else>parent</tpl></tpl> {iconCls}" ',
            '<tpl if="icon">style="background-image:url({icon})"/><tpl else>></div></tpl>',
        '<tpl if="href">',
            '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
            '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>'
    ],

    initComponent: function() {
        var me = this;

        me.rendererScope = me.scope;
        me.setupRenderer();

        // This always uses its own renderer.
        // Any custom renderer is used as an inner renderer to produce the text node of a tree cell.
        me.innerRenderer = me.renderer;

        me.renderer = me.treeRenderer;

        me.callParent();

        me.scope = me;
        
        me.hasCustomRenderer = me.innerRenderer && me.innerRenderer.length > 1;
    },

    treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
        var me = this,
            cls = record.get('cls'),
            rendererData;

        // The initial render will inject the cls into the TD's attributes.
        // If cls is ever *changed*, then the full rendering path is followed.
        if (metaData && cls) {
            metaData.tdCls += ' ' + cls;
        }

        rendererData = me.initTemplateRendererData(value, metaData, record, rowIdx, colIdx, store, view);
        
        return me.getTpl('cellTpl').apply(rendererData);
    },
    
    initTemplateRendererData: function(value, metaData, record, rowIdx, colIdx, store, view) {
        var me = this,
            innerRenderer = me.innerRenderer,
            data = record.data,
            parent = record.parentNode,
            rootVisible = view.rootVisible,
            lines = [],
            parentData;
        
        while (parent && (rootVisible || parent.data.depth > 0)) {
            parentData = parent.data;
            lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                    parentData.isLast ? 0 : 1;
            parent = parent.parentNode;
        }
        
        return {
            record: record,
            baseIconCls: me.iconCls,
            customIconCls: (data.icon || data.iconCls) ? me.customIconCls : '',
            iconCls: data.iconCls,
            icon: data.icon,
            checkboxCls: me.checkboxCls,
            checked: data.checked,
            elbowCls: me.elbowCls,
            expanderCls: me.expanderCls,
            textCls: me.textCls,
            leaf: data.leaf,
            expandable: record.isExpandable(),
            expanded: data.expanded,
            isLast: record.isLastVisible(),
            blankUrl: Ext.BLANK_IMAGE_URL,
            href: data.href,
            hrefTarget: data.hrefTarget,
            lines: lines,
            metaData: metaData,
            // subclasses or overrides can implement a getChildCls() method, which can
            // return an extra class to add to all of the cell's child elements (icon,
            // expander, elbow, checkbox).  This is used by the rtl override to add the
            // "x-rtl" class to these elements.
            childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
            value: innerRenderer ? innerRenderer.apply(me.rendererScope, arguments) : value
        };
    }
});
