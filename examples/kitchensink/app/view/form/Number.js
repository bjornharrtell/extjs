Ext.define('KitchenSink.view.form.Number', {
    extend: 'Ext.form.Panel',
    
    requires: [
        'Ext.form.field.Number'
    ],
    xtype: 'form-number',
    
    //<example>
    exampleTitle: 'Number Field',
    exampleDescription: '<p>This example shows how to use the number field.</p>',
    //</example>
    
    title: 'Number fields with spinner',
    bodyPadding: 5,
    frame: true,
    width: 340,
    defaultType: 'numberfield',
    
    initComponent: function(){
        Ext.apply(this, {
            fieldDefaults: {
                labelWidth: 110,
                anchor: '100%'
            },
            items: [{
                fieldLabel: 'Default',
                name: 'basic',
                value: 1,
                minValue: 1,
                maxValue: 125
            },{
                fieldLabel: 'With a step of 0.4',
                name: 'test',
                minValue: -100,
                maxValue: 100,
                allowDecimals: true,
                decimalPrecision: 1,
                step: 0.4
            },{
                hideTrigger: true,
                fieldLabel: 'Without spinner',
                name: 'without_spinner'
            }]
        });
        this.callParent();
    }
});
