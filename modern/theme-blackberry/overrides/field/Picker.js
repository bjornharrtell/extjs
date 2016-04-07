Ext.define('Ext.theme.blackberry.field.Picker', {
    override: 'Ext.field.Picker',

    initialize: function() {
        this.callParent();
        this.label.on({
            scope: this,
            tap: 'onFocus'
        });
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            className: Ext.baseCSSPrefix + 'container',
            children: [{
                reference: 'innerElement',
                cls: Ext.baseCSSPrefix + 'component-outer',
                children: [{
                    reference: 'label',
                    cls: Ext.baseCSSPrefix + 'form-label',
                    children: [{
                        reference: 'labelspan',
                        tag: 'span'
                    }]
                }]
            }]
        };
    },

    updateLabelWidth: function() {
        return;
    },

    updateLabelAlign: function() {
        return;
    }
});