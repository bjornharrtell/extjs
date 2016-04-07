Ext.define('Admin.view.phone.email.Inbox', {
    extend: 'Ext.dataview.DataView',
    // xtype is assigned by the phone profile

    itemTpl:
        '<div class="inbox-item">'+
            '<div class="inbox-inner-row inbox-{read:pick(\'unread\',\'read\')}">'+
                '<div class="list-cls inbox-from">{from}</div>'+
                '<div class="inbox-date">'+
                    '<tpl if="has_attachments">'+
                        '<span class="x-fa fa-paperclip inbox-attachment"></span>'+
                    '</tpl>'+
                    '{received_on:date("M d")}'+
                '</div>'+
            '</div>'+
            '<div class="inbox-inner-row">'+
                '<div class="inbox-summary">{title}</div>'+
                '<div class="inbox-favorite">'+
                    '<tpl if="favorite">'+
                        '<span class="x-fa fa-heart-o"></span>'+
                    '<tpl else>'+
                        '<span class="x-fa inbox-favorite-icon fa-heart"></span>'+
                    '</tpl>'+
                '</div>'+
            '</div>' +
        '</div>'
});
