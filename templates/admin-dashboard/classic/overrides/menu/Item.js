// IE8 has an odd bug with handling font icons in pseudo elements;
// it will render the icon once and not update it when something
// like text color is changed via style addition or removal.
// We have to force icon repaint by adding a style with forced empty
// pseudo element content, (x-sync-repaint) and removing it back to work
// around this issue.
// See this: https://github.com/FortAwesome/Font-Awesome/issues/954
// and this: https://github.com/twbs/bootstrap/issues/13863
Ext.define('Admin.override.menu.Item', {
    override: 'Ext.menu.Item',
    
    compatibility: 'IE@8', // only activate this override on IE8
    
    onFocus: function(e) {
        this.callParent([e]);
        this.repaintFontIcons();
    },
    
    onFocusLeave: function(e) {
        this.callParent([e]);
        this.repaintFontIcons();
    },
    
    privates: {
        repaintFontIcons: function() {
            var itemEl = this.itemEl,
                textEl = this.textEl,
                fly;

            // This application uses font icons on some elements that the framework
            // does not expect, so we have to extend its normal IE8 workarounds

            if (itemEl && this.el.hasCls('font-icon')) {
                itemEl.syncRepaint();
            }
            
            if (textEl) {
                fly = Ext.fly(textEl.dom.firstChild);
                
                if (fly && fly.hasCls(Ext.baseCSSPrefix + 'fa')) {
                    fly.syncRepaint();
                }
            }
        }
    }
});
