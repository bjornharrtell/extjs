/**
 * This example shows how to create buttons.
 *
 * Buttons can contain text and an icon, and the icon can be aligned to any side of the
 * button using the `iconAlign` config.
 */
Ext.define('KitchenSink.view.button.BasicButtons', {
    extend: 'Ext.Container',
    xtype: 'basic-buttons',
    cls: 'button-view',
    layout: 'vbox',
    //<example>
    profiles: {
        classic: {
            width: 420
        },
        neptune: {
            width: 475
        },
        triton: {
            width: 500
        },
        'neptune-touch': {
            width: 585
        }
    },
    //</example>

    initComponent: function() {
        Ext.apply(this, {
            width: this.profileInfo.width,
            items: [{
                xtype: 'checkbox',
                boxLabel: 'disabled',
                margin: '0 0 0 10',
                listeners: {
                    change: this.toggleDisabled,
                    scope: this
                }
            }, {
                xtype: 'container',
                layout: {
                    type: 'table',
                    columns: 4,
                    tdAttrs: { style: 'padding: 5px 10px;' }
                },
               
                items: [{
                    xtype: 'component',
                    html: 'Text Only'
                }, {
                    xtype: 'button',
                    text: 'Small'
                }, {
                    xtype: 'button',
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon Only'
                }, {
                    iconCls: 'button-home-small',
                    xtype: 'button'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-medium',
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (left)'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-small',
                    text: 'Small'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-medium',
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-large',
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (top)'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-small',
                    text: 'Small',
                    iconAlign: 'top'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-medium',
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'top'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-large',
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'top'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (right)'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-small',
                    text: 'Small',
                    iconAlign: 'right'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-medium',
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'right'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-large',
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'right'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (bottom)'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-small',
                    text: 'Small',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-medium',
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'button',
                    iconCls: 'button-home-large',
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'bottom'
                }]
            }]
        });
        this.callParent();
    },

    toggleDisabled: function(checkbox, newValue, oldValue) {
        var toggleFn = newValue ? 'disable' : 'enable';

        Ext.each(this.query('button'), function(item) {
            item[toggleFn]();
        });
    }

});
