/**
 * This example shows how to align button text to the left. By default, buttons are sized
 * to the width of the text inside them, but this behavior can be overridden by giving the
 * button a fixed width. In such a case the alignment of the text can be controlled using
 * the `textAlign` config.
 */
Ext.define('KitchenSink.view.button.LeftTextButtons', {
    extend: 'Ext.Container',
    xtype: 'left-text-buttons',
    layout: 'vbox',

    initComponent: function() {
        Ext.apply(this, {
            width: 680,
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
                defaults: {
                    width: 150,
                    textAlign: 'left'
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
