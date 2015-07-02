Ext.define('Admin.view.profile.Notifications', {
    extend: 'Ext.grid.Panel',
    xtype: 'profilenotificationspanel',

    cls: 'timeline-items-wrap shadow-panel',

    bind: {
        store: '{userNotificationStore}'
    },

    hideHeaders: true,

    columns: [
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: '_id',
            renderer: function (value, metaData, record, rowIndex) {
                var page = "<table><tr><td rowspan='3'><img src='resources/images/user-profile/5.png' alt='Smiley face' height='50' width='50'></td><td><h4>" + record.data.name + "</h4></td></tr><tr><td><div width='200px'>" + record.data.content + "</div></td></tr></table>";
                switch (rowIndex) {
                    case 0:
                        page = '<div class="timeline-item">' +
                        "<div class='timeline-day now'>Now</div>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/6.png' alt='Smiley face'>" +
                        "<div>30 Min ago</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='shared-by'><a href='#'>" + record.data.name + "</a> shared an image</div>" +
                        "<img src='resources/images/img2.jpg' class='shared-img' alt='Smiley face'>" +
                        "</div>" +
                        "</div>";
                        break;

                    case 1:
                        page = "<div class='timeline-item'>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/7.png' alt='Smiley face'>" +
                        "<div>2 Hours ago</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='job-meeting'><a href='#'>Job Meeting</a></div>" +
                        "<div>" + record.data.content + "</div>" +
                        "</div>" +
                        "</div>";
                        break;
                    case 2:
                        page = "<div class='timeline-item'>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/8.png' alt='Smiley face'>" +
                        "<div>3 Hours ago</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='shared-by'><a href='#'>" + record.data.name + "</a> commented on The Article</div>" +
                        "<div class='article-comment'><span class='x-fa fa-quote-left'></span>" + record.data.content + "</div>" +
                        "</div>" +
                        "</div>";
                        break;
                    case 3:
                        page = "<div class='timeline-item'>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/9.png' alt='Smiley face'>" +
                        "<div>5 Hours ago</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='followed-by'><img src='resources/images/user-profile/10.png' alt='Smiley face'><div class='followed-by-inner'><a href='#'>" + record.data.name + "</a> followed you.</div></div>" +
                        "</div>" +
                        "</div>";
                        break;
                    case 4:
                        page = "<div class='timeline-item'>" +
                        "<div class='timeline-day yesterday'>Yesterday</div>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/12.png' alt='Smiley face'>" +
                        "<div>15:45</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='shared-by'><a href='#'>Lorem ipsum dolor sit amet</a></div>" +
                        "<div>" + record.data.content + "</div>" +
                        "</div>" +
                        "</div>";
                        break;
                    case 5:
                        page = "<div class='timeline-item'>" +
                        "<div class='profile-pic-wrap'>" +
                        "<img src='resources/images/user-profile/14.png' alt='Smiley face'>" +
                        "<div>13:27</div>" +
                        "</div>" +
                        "<div class='contents-wrap'><span class='vertical-line'></span><div class='followed-by'><img src='resources/images/user-profile/1.png' alt='Smiley face'><div class='followed-by-inner'><a href='#'>" + record.data.name + "</a> Like The Article.</div></div>" +
                        "</div>" +
                        "</div>";
                        break;
                }
                return page;
            }
        }
    ]
});
