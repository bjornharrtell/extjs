Ext.define('Admin.view.forms.Finish', {
    extend: 'Ext.Panel',
    xtype: 'finishform',
    cls: 'wizard-finish',

    title: 'Finish',
    iconCls: 'x-fa fa-heart',

    bodyPadding: '0 20 10 20',

    styleHtmlContent: true,
    html:
        '<div class="finish-form-title">Thank You</div>' +
        '<div class="finish-form-text">Lorem ipsum dolor sit amet, consectetuer adipiscing ' +
        'elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam ' +
        'erat volutpat.</div>' +
        '<div style="clear:both"></div>'
});
