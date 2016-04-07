Ext.define('Admin.view.forms.SpecialOffer', {
    extend: 'Ext.Component',
    xtype: 'specialoffer',

    isSpecialOffer: true,

    cls: 'forms-specialoffer',
    minWidth: 200,

    html: '<div class="specialoffer-outer">' +
            '<div class="specialoffer-inner">' +
                '<h3>Register Today</h3>' +
                '<span class="specialoffer-icon-wrap circular">' +
                    '<i class="fa fa-gift fa-5x"></i>' +
                '</span>' +
                '<div class="specialoffer-text">' +
                    'Members get <span class="specialoffer-discount">50%</span> more points, ' +
                    'so register today and start earning points for savings on great rewards!' +
                '</div>' +
                '<a class="specialoffer-link fa fa-arrow-right" href="#faq">' +
                    'Learn More...</a>' +
            '</div>' +
        '</div>'
});
