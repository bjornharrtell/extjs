Ext.define('Admin.view.profile.Notifications', {
    extend: 'Ext.DataView',
    xtype: 'profilenotifications',

    cls: 'user-notifications',

    scrollable: false,

    bind: {
        store: '{userSharedItems}'
    },

    itemSelector: 'div.timeline-item',

    itemTpl: [
        "<div class='comments {[values._id !== values.parent_id ? 'sub-comments' : '']}'>",
           "<img src='resources/images/user-profile/15.png' alt='Smiley face' class='profile-icon'>",
           "<div class='content-wrap'>",
               "<div>",
                   "<h4 class='profilenotifications-username'>{name}<span class='x-fa fa-mobile'></span></h4>",
                   "<span class='from-now'><span class='x-fa fa-clock-o'></span>3 Hours Ago</span>",
               "</div>",
               "<div class='content'>{content}</div>",
               "<div class='like-comment-btn-wrap'>",
                   "<button type='button' class='x-fa fa-thumbs-up' onclick=''></button>",
                   "<button type='button' class='x-fa fa-thumbs-down' onclick=''></button>",
                   "<button type='button' onclick='' class='x-fa fa-comments'></button>",
               "</div>",
           "</div>",
       "</div>"
    ]
});
