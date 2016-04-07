Ext.define(null, {
    override: 'Ext.event.publisher.Focus',
    
    compatibility: Ext.isIE10m,
    
    doDelegatedEvent: function(e, invokeAfter) {
        var body = document.body,
            el = Ext.synchronouslyFocusing;
        
        // This horrid hack is necessary to work around the issue with input elements
        // in IE10m that can fail to focus under certain conditions. See comment in
        // Ext.dom.Element override.
        if (el &&
            ((e.type === 'focusout' && e.srcElement === el && e.toElement === body) ||
             (e.type === 'focusin' && e.srcElement === body && e.fromElement === el &&
              e.toElement === null)))
        {
            return;
        };
        
        return this.callParent([e, invokeAfter]);
    }
});
