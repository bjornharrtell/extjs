/**
 * This example demonstrates the use of split buttons. A split button is similar to a menu
 * button, but its arrow can fire an event separately from the default click event of the
 * button.  This event would typically be used to display a dropdown menu, but can also be
 * used to attach a custom action.
 */
Ext.define('KitchenSink.view.button.SplitButtons', {
    extend: 'Ext.Container',
    xtype: 'split-buttons',
    controller: 'buttons',

    layout: 'vbox',
    width: '${width}',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/button/ButtonsController.js'
    }],
    profiles: {
        classic: {
            width: 470
        },
        neptune: {
            width: 590
        },
        triton: {
            width: 620
        },
        'neptune-touch': {
            width: 675
        }
    },
    //</example>

    items: [{
        xtype: 'checkbox',
        boxLabel: 'Disabled',
        margin: '0 0 0 10',
        listeners: {
            change: 'toggleDisabled'
        }
    }, {
        xtype: 'container',
        layout: {
            type: 'table',
            columns: 4,
            tdAttrs: { style: 'padding: 5px 10px;' }
        },
        defaults: {
            menu: [{
                text:'Menu Item 1'
            },{
                text:'Menu Item 2'
            },{
                text:'Menu Item 3'
            }]
        },

        items: [{
            xtype: 'component',
            html: 'Text Only'
        }, {
            xtype: 'splitbutton',
            text: 'Small'
        }, {
            xtype: 'splitbutton',
            text: 'Medium',
            scale: 'medium'
        }, {
            xtype: 'splitbutton',
            text: 'Large',
            scale: 'large'
        }, {
            xtype: 'component',
            html: 'Icon Only'
        }, {
            iconCls: 'button-home-small',
            xtype: 'splitbutton'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-medium',
            scale: 'medium'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-large',
            scale: 'large'
        }, {
            xtype: 'component',
            html: 'Icon and Text (left)'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-small',
            text: 'Small'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-medium',
            text: 'Medium',
            scale: 'medium'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-large',
            text: 'Large',
            scale: 'large'
        }, {
            xtype: 'component',
            html: 'Icon and Text (top)'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-small',
            text: 'Small',
            iconAlign: 'top'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-medium',
            text: 'Medium',
            scale: 'medium',
            iconAlign: 'top'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-large',
            text: 'Large',
            scale: 'large',
            iconAlign: 'top'
        }, {
            xtype: 'component',
            html: 'Icon and Text (right)'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-small',
            text: 'Small',
            iconAlign: 'right'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-medium',
            text: 'Medium',
            scale: 'medium',
            iconAlign: 'right'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-large',
            text: 'Large',
            scale: 'large',
            iconAlign: 'right'
        }, {
            xtype: 'component',
            html: 'Icon and Text (bottom)'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-small',
            text: 'Small',
            iconAlign: 'bottom'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-medium',
            text: 'Medium',
            scale: 'medium',
            iconAlign: 'bottom'
        }, {
            xtype: 'splitbutton',
            iconCls: 'button-home-large',
            text: 'Large',
            scale: 'large',
            iconAlign: 'bottom'
        }]
    }]
});
