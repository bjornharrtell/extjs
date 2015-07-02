Ext.define('Admin.view.forms.WizardOne', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.formswizardone',
    requires: [
        'Ext.form.field.Radio'
    ],

    cls: 'wizardone shadow-panel',

    plugins: 'responsive',

    responsiveConfig: {
        'width >= 1000': {
            layout: {
                type: 'box',
                align: 'stretch',
                vertical: false
            }
        },

        'width < 1000': {
            layout: {
                type: 'box',
                align: 'stretch',
                vertical: true
            }
        }
    },

    items: [
        {
            xtype: 'box',
            minWidth: 200,
            flex: 1,
            cls: 'bg-primary',
            html: '<div class="eq-box-md text-center bg-primary pad-all"><div class="box-vmiddle pad-all"><h3 class="text-thin">Register Today</h3><span class="icon-wrap icon-wrap-lg icon-circle bg-trans-light"><i class="fa fa-gift fa-5x text-primary"></i></span>' +
            '<p>Members get <span class="text-lg text-bold">50%</span> more points, so register today and start earning points for savings on great rewards!</p>' +
            '<a class="btn btn-lg btn-primary btn-labeled fa fa-arrow-right" href="#faq"> Learn More...</a></div></div>'
        },
        {
            xtype: 'wizardform',
            cls: 'wizardone',
            colorScheme: 'blue',
            flex: 1
        }
    ]
});
