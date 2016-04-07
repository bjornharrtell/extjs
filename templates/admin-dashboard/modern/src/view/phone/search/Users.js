Ext.define('Admin.view.phone.search.Users', {
    extend: 'Ext.dataview.DataView',
    // xtype:'userssearch',  set by phone profile

    itemTpl:
        '<div class="search-user-item">'+
            '<div class="search-user-image">' +
                '<img src="resources/images/user-profile/{profile_pic}" class="circular" ' +
                    'width="50" height="50"/>' +
            '</div>'+
            '<div class="search-user-content">'+
                '<div class="search-user-title">{fullname}</div>'+
                '<div class="search-user-email">{email}</div>'+
                '<div class="search-user-date">{joinDate:date("M d")}</div>'+
            '</div>'+
        '</div>'
});
