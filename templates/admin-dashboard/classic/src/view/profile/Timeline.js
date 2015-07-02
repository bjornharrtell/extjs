Ext.define('Admin.view.profile.Timeline', {
    extend: 'Ext.grid.Panel',
    xtype: 'profiletimelinepanel',

    cls:'timeline-items-wrap shadow-panel',

    hideHeaders: true,

    bind: {
        store: '{userSharedItemsStore}'
    },

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            flex: 1,

            renderer: function (value, metaData, record) {
                if (record.data._id !== record.data.parent_id) {
                    return "<div class='comments sub-comments'>"+
                                "<img src='resources/images/user-profile/1.png' alt='Smiley face' class='profile-icon'>"+
                                "<div class='content-wrap'>"+
                                    "<div>"+
                                        "<span class='from-now'><span class='x-fa fa-clock-o'></span>3 Hours Ago</span>"+
                                        "<h4>" + record.data.name + "<span class='x-fa fa-mobile'></span></h4>"+
                                    "</div>"+
                                    "<div class='content'>" + record.data.content + "</div>"+
                                    "<div class='like-comment-btn-wrap'>"+
                                        "<button type='button' class='x-fa fa-thumbs-up' onclick=''></button>"+
                                        "<button type='button' class='x-fa fa-thumbs-down' onclick=''></button>"+
                                        "<button type='button' onclick='' class='x-fa fa-comments'></button>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
                }

                return "<div class='comments'>"+
                            "<img src='resources/images/user-profile/15.png' alt='Smiley face' class='profile-icon'>"+
                            "<div class='content-wrap'>"+
                                "<div>"+
                                    "<span class='from-now'><span class='x-fa fa-clock-o'></span>3 Hours Ago</span>"+
                                    "<h4>" + record.data.name + "<span class='x-fa fa-mobile'></span></h4>"+
                                "</div>"+
                                "<div class='content'>" + record.data.content + "</div>"+
                                "<div class='like-comment-btn-wrap'>"+
                                    "<button type='button' class='x-fa fa-thumbs-up' onclick=''></button>"+
                                    "<button type='button' class='x-fa fa-thumbs-down' onclick=''></button>"+
                                    "<button type='button' onclick='' class='x-fa fa-comments'></button>"+
                                "</div>"+
                            "</div>"+
                        "</div>";
            }
        }
    ]
});
