Ext.define('Admin.view.forms.Profile', {
    extend: 'Ext.form.Panel',
    xtype: 'profileform',
    cls: 'wizardform',

    requires: [
        'Ext.SegmentedButton',
        'Ext.field.Text'
    ],

    title: 'Profile',
    iconCls: 'x-fa fa-user',

    bodyPadding: '0 20 10 20',
    defaults: {
        margin: '0 0 10 0'
    },

    items: [{
        xtype: 'textfield',
        placeHolder: 'First Name'
    }, {
        xtype: 'textfield',
        placeHolder: 'Last Name'
    }, {
        xtype: 'textfield',
        placeHolder: 'Company'
    }, {
        xtype: 'component',
        html: 'Member Type'
    }, {
        xtype: 'segmentedbutton',
        defaults: {
            flex: 1
        },
        minWidth: '15em',

        platformConfig: {
            phone: {
                width: '100%'
            },
            '!phone': {
                width: '50%'
            }
        },

        items: [{
            text: 'Free',
            pressed: true
        }, {
            text: 'Personal',
            minWidth: '4em'
        }, {
            text: 'Gold'
        }]
    }]
});
