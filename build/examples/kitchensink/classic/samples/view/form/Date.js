/**
 * This example shows how to use the date/month pickers.
 */
Ext.define('KitchenSink.view.form.Date', {
    extend: 'Ext.container.Container',
    xtype: 'form-date',
    controller: 'form-date',

    requires: [
        'Ext.panel.Panel',
        'Ext.picker.Date',
        'Ext.picker.Month',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/form/DateController.js'
    }],
    profiles: {
        classic: {
            width: 400
        },
        neptune: {
            width: 465
        },
        'neptune-touch': {
            width: 600
        },
        'triton': {
            width: 750
        }
    },
    //</example>

    width: '${width}',
    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [{
        xtype: 'container',
        layout: 'hbox',
        margin: '0 0 20 0',
        items: [{
            title: 'Date Picker',
            margin: '0 20 0 0',
            items: {
                xtype: 'datepicker',
                handler: 'onDatePicked'
            }
        }, {
            title: 'Month Picker',
            items: {
                xtype: 'monthpicker',
                handler: 'onMonthPicked'
            }
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            title: 'Date Picker (no today)',
            margin: '0 20 0 0',
            items: {
                xtype: 'datepicker',
                showToday: false,
                handler: 'onDatePicked'
            }
        }, {
            title: 'Month Picker (no buttons)',
            items: {
                xtype: 'monthpicker',
                showButtons: false,
                handler: 'onMonthPicked'
            }
        }]
    }]
});
