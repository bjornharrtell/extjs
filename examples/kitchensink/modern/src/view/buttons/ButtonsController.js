Ext.define('KitchenSink.view.buttons.ButtonsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buttons',

    control: {
        'checkboxfield': {
            change: 'onCheckboxChange'
        }
    },
    
    uiConflicts: {
        '*': {
            decline: ['action', 'confirm'],
            confirm: ['action', 'decline'],
            action:  ['confirm', 'decline']
        },
        
        'iOS': {
            alt: ['confirm', 'decline'],
            confirm: ['alt', 'decline'],
            decline: ['alt', 'confirm']
        },
    
        'Material': {
            alt: ['confirm', 'decline'],
            confirm: ['alt', 'decline'],
            decline: ['alt', 'confirm']
        }
    },

    onCheckboxChange: function(checkbox, checked) {
        var me = this,
            button = me.lookupReference('button'),
            value = checkbox.getValue(),
            theme = Ext.theme.name,
            uiConflicts = me.uiConflicts['*'][value];
        
        // theme-specific conflicts
        if (me.uiConflicts[theme]) {
            uiConflicts = Ext.Array.merge(uiConflicts, me.uiConflicts[theme][value]);
        }
        uiConflicts = uiConflicts && Ext.Array.clean(uiConflicts);
        
        // ensure the ui does not conflict with other uis
        if (checked && uiConflicts) {
            me.removeUiConflicts(uiConflicts);
        }
        
        button[checked ? 'addUi' : 'removeUi'](value);
    },
    
    removeUiConflicts: function (uiConflicts) {
        var checkContainer = this.getView().getComponent('checkContainer'),
            i = 0,
            len = uiConflicts.length,
            uiCheckbox;
        
        for (; i < len; i++) {
            uiCheckbox = checkContainer.child('[value=' + uiConflicts[i] + ']');
            uiCheckbox && uiCheckbox.uncheck();
        }
    }
});
