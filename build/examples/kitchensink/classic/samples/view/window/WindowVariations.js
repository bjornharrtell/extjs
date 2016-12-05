/**
 * Demonstrates some variations on Windows.
 */
Ext.define('KitchenSink.view.window.WindowVariations', {
    extend: 'Ext.container.Container',
    xtype: 'window-variations',
    
    //<example>
    width: 10,
    height: 10,
    //</example>
    defaults: {
        width: 400,
        height: 250,
        bodyPadding: 10,
        autoShow: true
    },

    items: [{
        xtype: 'window',
        title: 'Left Header',
        headerPosition: 'left',
        collapsible: true,
        //<example>
        html: KitchenSink.DummyText.extraLongText,
        scrollable: true,
        //</example>
        x: -410, y: -250
    }, {
        xtype: 'window',
        title: 'Right Header',
        headerPosition: 'right',
        //<example>
        html: KitchenSink.DummyText.extraLongText,
        scrollable: true,
        //</example>
        x: 10, y: -250
    }, {
        xtype: 'window',
        title: 'Bottom Header',
        headerPosition: 'bottom',
        //<example>
        html: KitchenSink.DummyText.extraLongText,
        scrollable: true,
        //</example>
        x: -410, y: 10
    }, {
        xtype: 'window',
        title: 'Constraining Window',
        closable: false,
        collapsible: true,
        x: 10, y: 10,
        defaults: {
            width: 200,
            height: 100,
            autoShow: true
        },

        items: [{
            xtype: 'window',
            title: 'Constrained',
            // Force the Window to be within its parent
            constrain: true,

            x: 1000,  // will be limited by constrain
            y: 20
        }, {
            xtype: 'window',
            title: 'Header Constrained',
            closable: false,
            // Force the Header to be within its parent
            constrainHeader: true,

            x: 10,
            y: 1000  // will be limited by constrain
        }]
    }]
});