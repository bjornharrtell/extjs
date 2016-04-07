Ext.define('Admin.view.pages.Error500', {
    extend: 'Admin.view.pages.ErrorBase',
    xtype:'page500',

    items:[{
        cls: 'error-page-top-text',
        html: '500'
    },{
        cls: 'error-page-desc',
        html: '<p>Something went wrong and server could not process your request.</p>' +
        '<p>Try going back to our <a href="#dashboard"> Home page </a></p>'
    }]
});
