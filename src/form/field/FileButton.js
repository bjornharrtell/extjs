/**
 *
 */
Ext.define('Ext.form.field.FileButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.filebutton',
    
    childEls: [
        'fileInputEl'
    ],
    
    inputCls: Ext.baseCSSPrefix + 'form-file-input',
    
    cls: Ext.baseCSSPrefix + 'form-file-btn',
    
    preventDefault: false,
    
    // Button element *looks* focused but it should never really receive focus itself,
    // and with it being a <div> we don't need to render tabindex attribute at all
    tabIndex: null,

    autoEl: {
        tag: 'div',
        unselectable: 'on'
    },
    
    /*
     * This <input type="file"/> element is placed above the button element to intercept
     * mouse clicks, as well as receive focus. This is the only way to make browser file input
     * dialog open on user action, and populate the file input value when file(s) are selected.
     * The tabIndex value here comes from the template arguments generated in getTemplateArgs
     * method below; it is copied from the owner FileInput's tabIndex property.
     */
    afterTpl: [
        '<input id="{id}-fileInputEl" data-ref="fileInputEl" class="{childElCls} {inputCls}" ',
            'type="file" size="1" name="{inputName}" role="{role}" ',
            '<tpl if="tabIndex != null">tabindex="{tabIndex}"</tpl>',
        '>'
    ],

    // private
    getAfterMarkup: function(values) {
        return this.getTpl('afterTpl').apply(values);
    },
    
    getTemplateArgs: function(){
        var args = this.callParent();
        args.inputCls = this.inputCls;
        args.inputName = this.inputName;
        args.tabIndex = this.ownerCt.tabIndex;
        return args;
    },
    
    afterRender: function(){
        var me = this;
        
        me.callParent(arguments);
        
        // We place focus and blur listeners on fileInputEl to activate Button's
        // focus and blur style treatment
        me.fileInputEl.on({
            scope: me,
            change: me.fireChange,
            focus: me.onFocus,
            blur: me.onBlur
        });
    },
    
    fireChange: function(e){
        this.fireEvent('change', this, e, this.fileInputEl.dom.value);
    },
    
    /**
     * @private
     * Creates the file input element. It is inserted into the trigger button component, made
     * invisible, and floated on top of the button's other content so that it will receive the
     * button's clicks.
     */
    createFileInput : function(isTemporary) {
        var me = this;
        me.fileInputEl = me.el.createChild({
            name: me.inputName,
            id: !isTemporary ? me.id + '-fileInputEl' : undefined,
            cls: me.inputCls,
            tag: 'input',
            type: 'file',
            size: 1,
            role: 'button'
        });
        
        // We place focus and blur listeners on fileInputEl to activate Button's
        // focus and blur style treatment
        me.fileInputEl.on({
            scope: me,
            change: me.fireChange,
            focus: me.onFocus,
            blur: me.onBlur
        });
    },
    
    reset: function(remove){
        if (remove) {
            this.fileInputEl.destroy();
        }
        this.createFileInput(!remove);
    },
    
    restoreInput: function(el){
        this.fileInputEl.destroy();
        el = Ext.get(el);
        this.el.appendChild(el);
        this.fileInputEl = el;
    },
    
    onDisable: function(){
        this.callParent();
        this.fileInputEl.dom.disabled = true;
    },

    onEnable : function() {
        this.callParent();
        this.fileInputEl.dom.disabled = false;
    },
    
    privates: {
        getFocusEl: function() {
            return this.fileInputEl;
        },
        
        getFocusClsEl: function() {
            return this.el;
        }
    }
});
