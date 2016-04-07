Ext.define('Admin.view.profile.Timeline', {
    extend: 'Ext.DataView',
    xtype: 'profiletimeline',

    cls: 'timeline-items-wrap',

    scrollable: false,

    bind: '{userTimeline}',

    itemSelector: '.timeline-item',

    itemTpl: [
        '<div class="timeline-item{userId:this.cls(values,parent[xindex-2],xindex-1,xcount)}">' +
            '{date:this.epoch(values,parent[xindex-2],xindex-1,xcount)}' +
            '<div class="profile-pic-wrap">' +
                '<img src="resources/images/user-profile/{userId}.png" alt="Smiley face">' +
                '<div>{date:this.elapsed} ago</div>' +
            '</div>' +
            '<tpl if="notificationType == \'image_sharing\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="shared-by"><a href="#">{name}</a> shared an image</div>' +
                        '<img src="resources/images/img2.jpg" class="shared-img" alt="Smiley face">' +
                    '</div>' +
                '</div>' +
            '<tpl elseif="notificationType == \'job_meeting\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="job-meeting"><a href="#">Job Meeting</a></div>' +
                        '<div>{content}</div>' +
                    '</div>' +
                '</div>' +
            '<tpl elseif="notificationType == \'comment_reply\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="shared-by"><a href="#">{name}</a> commented on The Article</div>' +
                        '<div class="article-comment"><span class="x-fa fa-quote-left"></span>{content}</div>' +
                    '</div>' +
                '</div>' +
            '<tpl elseif="notificationType == \'new_follower\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="followed-by">' +
                            '<img src="resources/images/user-profile/10.png" alt="Smiley face">' +
                            '<div class="followed-by-inner"><a href="#">{name}</a> followed you.</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '<tpl elseif="notificationType == \'comment\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="shared-by"><a href="#">Lorem ipsum dolor sit amet</a></div>' +
                        '<div>{content}</div>' +
                    '</div>' +
                '</div>' +
            '<tpl elseif="notificationType == \'like\'">' +
                '<div class="line-wrap">' +
                    '<div class="contents-wrap">' +
                        '<div class="followed-by">' +
                            '<img src="resources/images/user-profile/1.png" alt="Smiley face">' +
                            '<div class="followed-by-inner"><a href="#">{name}</a> Like The Article.</div>' +
                        '</div>' +
                    '</div>' +
            '</tpl>' +
        '</div>',
        {
            cls: function (value, record, previous, index, count) {
                var cls = '';

                if (!index) {
                    cls += ' timeline-item-first';
                }
                if (index + 1 === count) {
                    cls += ' timeline-item-last';
                }

                return cls;
            },

            elapsed: function (value) {
                var now = Date.now();
                now = +new Date('2015/08/23 21:15:00'); // 9:15 PM (For demo only)

                var seconds = Math.floor((now - value) / 1000),
                    minutes = Math.floor(seconds / 60),
                    hours = Math.floor(minutes / 60),
                    days = Math.floor(hours / 24),
                    weeks = Math.floor(days / 7),
                    months = Math.floor(days / 30),
                    years = Math.floor(days / 365),
                    ret;

                months %= 12;
                weeks %= 52;
                days %= 365;
                hours %= 24;
                minutes %= 60;
                seconds %= 60;

                if (years) {
                    ret = this.part(years, 'Year');
                    ret += this.part(months, 'Month', ' ');
                } else if (months) {
                    ret = this.part(months, 'Month');
                    ret += this.part(days, 'Day', ' ');
                } else if (weeks) {
                    ret = this.part(weeks, 'Week');
                    ret += this.part(days, 'Day', ' ');
                } else if (days) {
                    ret = this.part(days, 'Day');
                    ret += this.part(hours, 'Hour', ' ');
                } else if (hours) {
                    ret = this.part(hours, 'Hour');
                } else if (minutes) {
                    ret = this.part(minutes, ' Minute');
                } else {
                    ret = this.part(seconds, 'Second');
                }

                return ret;
            },

            epoch: function (value, record, previous, index, count) {
                var previousValue = previous &&
                            (previous.isModel ? previous.data : previous)['date'];

                // TODO use previousValue and value to determine "Yesterday", "Last week",
                // "Last month", etc...

                if (index === 4) {
                    return '<div class="timeline-epoch">Yesterday</div>';
                }

                return '';
            },

            part: function (value, type, gap) {
                var ret = value ? (gap || '') + value + ' ' + type : '';
                if (value > 1) {
                    ret += 's';
                }
                return ret;
            }
        }
    ]
});
