Ext.require([
    'Ext.form.*',
    'Ext.window.Window'
]);

Ext.onReady(function() {
    
    var field = new Ext.form.field.Text({
        renderTo: document.body
    }), fieldHeight = field.getHeight(),
        padding = 5,
        remainingHeight;
    
    field.destroy();
    
    // Because the theme can be different, the remaining amount of height differs
    // because the field size can change, so we go ahead and calculate it here. This
    // type of layout would be better served by using an HBox layout.
    remainingHeight = padding + fieldHeight * 2;
    
    var form = new Ext.form.Panel({
        border: false,
        fieldDefaults: {
            labelWidth: 60
        },
        defaultType: 'textfield',
        bodyPadding: padding,

        items: [{
            fieldLabel: 'Send To',
            name: 'to',
            anchor:'100%'  // anchor width by percentage
        },{
            fieldLabel: 'Subject',
            name: 'subject',
            anchor: '100%'  // anchor width by percentage
        }, {
            xtype: 'textarea',
            hideLabel: true,
            name: 'msg',
            anchor: '100% -' + remainingHeight  // anchor width by percentage and height by raw adjustment
        }]
    });

    new Ext.window.Window({
        autoShow: true,
        title: 'Resize Me',
        width: 500,
        height:300,
        minWidth: 300,
        minHeight: 200,
        layout: 'fit',
        plain: true,
        items: form,

        buttons: [{
            text: 'Send'
        },{
            text: 'Cancel'
        }]
    });
});