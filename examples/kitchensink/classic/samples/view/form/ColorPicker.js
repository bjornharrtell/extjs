/**
 * This example shows how to use the three types of Color Picker.
 *
 * The "colorbutton" is a small color swatch in the panel header.
 * This displays the color as a small swatch and on click shows the
 * "colorselector". This window also has the "colorselector" as a
 * hidden item that is revealed by pressing the "More" button.
 *
 * The "colorfield" is a combobox-like picker that shows the color
 * as a swatch and hex value.
 */
Ext.define('KitchenSink.view.form.ColorPicker', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-color-picker',
    controller: 'form-color-picker',
    //<example>
    requires: [
        'Ext.ux.colorpick.*'
    ],
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/form/ColorPickerController.js'
    }],
    
    exampleTitle: 'Color Picker',
    //</example>
    
    title: 'Color Picker Components',
    bodyPadding: 5,
    frame: true,
    resizable: true,
    width: 600,
    minWidth: 550,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        data: {
            color: '#0f0',
            full: false
        }
    },

    header: {
        items: [{
            xtype: 'component',
            cls: 'x-panel-header-title-default-framed',
            html: 'colorbutton &#8680;'
        },{
            xtype: 'colorbutton',
            bind: '{color}',
            width: 15,
            height: 15,
            listeners: {
                change: 'onChange'
            }
        }]
    },

    items: [{
        xtype: 'colorfield',
        fieldLabel: 'Color Field',
        labelWidth: 75,
        bind: '{color}',
        listeners: {
            change: 'onChange'
        }
    },{
        xtype: 'colorselector',
        hidden: true,
        flex: 1,
        bind: {
            value: '{color}',
            visible: '{full}'
        }
    }],

    buttons: [{
        text: 'Show colorselector &gt;&gt;',
        bind: {
            visible: '{!full}'
        },
        value: true,
        listeners: {
            click: 'onShowMoreLess'
        }
    },{
        text: 'Hide colorselector &lt;&lt;',
        bind: {
            visible: '{full}'
        },
        value: false,
        listeners: {
            click: 'onShowMoreLess'
        }
    }]
});
