Ext.define('Ext.overrides.scroll.DomScroller', {
    override: 'Ext.scroll.DomScroller',
    _scrollerCls: Ext.baseCSSPrefix +  'domscroller',

    updateElement: function(element, oldElement) {
        element.addCls(this._scrollerCls);
        this.callParent([element, oldElement]);
    }
});