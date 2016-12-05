/**
 * Demonstrates a tabbed form panel. This uses a tab panel with 3 tabs - Basic, Sliders and Toolbars - each of which is
 * defined below.
 *
 * See this in action at http://dev.sencha.com/deploy/sencha-touch-2-b3/examples/kitchensink/index.html#demo/forms
 */
Ext.define('KitchenSink.view.forms.Sliders', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.field.Slider',
        'Ext.field.Toggle'
    ],

    scrollable: true,
    shadow: true,
    cls: 'demo-solid-background',
    items: [
        {
            xtype: 'fieldset',
            defaults: {
                labelWidth: '35%',
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'sliderfield',
                    name: 'thumb',
                    value: 20,
                    label: 'Single Thumb'
                },
                {
                    xtype: 'sliderfield',
                    name: 'thumb',
                    value: 30,
                    disabled: true,
                    label: 'Disabled Single Thumb'
                },
                {
                    xtype: 'sliderfield',
                    name: 'multithumb',
                    label: 'Multiple Thumbs',
                    values: [10, 70]
                },
                {
                    xtype: 'togglefield',
                    name: 'toggle',
                    label: 'Toggle'
                }
            ]
        }
    ]
});
