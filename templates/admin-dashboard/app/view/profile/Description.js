Ext.define('Admin.view.profile.Description', {
    extend: 'Ext.Panel',
    xtype: 'profiledescription',

    requires: [
        'Ext.Button',
        'Ext.Img'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    cls: 'timeline-items-wrap user-profile-desc',

    height: 320,

    items: [
        {
            xtype: 'component',
            baseCls: 'box x-fa fa-home',
            html: 'San Jose, CA',
            padding: '0 0 12 0'
        },
        {
            xtype: 'component',
            baseCls: 'box x-fa fa-clock-o',
            html: 'Member since 1 years ago',
            padding: '0 0 12 0'
        },
        {
            xtype: 'component',
            baseCls: 'box x-fa fa-globe',
            html: '<a href="#"\'>http://www.sencha-dash.com/</a>',
            padding: '0 0 12 0'
        },
        {
            xtype: 'container',
            flex: 1,
            cls: 'about-me-wrap',
            html: '<h3 class="x-fa fa-user">About Me</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>'
        },
        {
            xtype:'toolbar',
            ui: 'plain',
            layout : {
                type : 'hbox',
                pack : 'center'
            },
            userCls: 'profiledescription-social-toolbar',
            items:[
                {
                    xtype: 'component',
                    cls: 'large-icon icon-padding',
                    baseCls:'x-fa fa-thumbs-up',
                    padding: '8 0 8 0'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'component',
                            cls: 'likes-value',
                            html: '523'
                        },
                        {
                            xtype: 'component',
                            cls: 'likes-label',
                            html: 'Likes'
                        }
                    ]
                },

                {
                    xtype: 'component',
                    cls: 'icon-padding',
                    baseCls:'x-fa fa-ellipsis-v',
                    padding: '8 0 8 0'
                },

                {
                    xtype: 'component',
                    cls: 'large-icon icon-padding',
                    baseCls:'x-fa fa-user-plus',
                    padding: '8 0 8 0'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'component',
                            cls: 'friends-value',
                            html: '734'
                        },
                        {
                            xtype: 'component',
                            cls: 'friends-label',
                            html: 'Friends'
                        }
                    ]
                }
            ]
        }
    ]
});
