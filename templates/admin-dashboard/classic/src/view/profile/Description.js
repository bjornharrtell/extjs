Ext.define('Admin.view.profile.Description', {
    extend: 'Ext.container.Container',
    xtype: 'profiledescriptionpanel',

    height: 300,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    cls:'timeline-items-wrap user-profile-desc shadow-panel',

    items: [
        {
            xtype: 'box',
            componentCls: 'x-fa fa-home',
            html: 'San Jose, CA',
            padding: '0 0 12 0'
        },
        {
            xtype: 'box',
            componentCls: 'x-fa fa-clock-o',
            html: 'Member since 1 years ago',
            padding: '0 0 12 0'
        },
        {
            xtype: 'box',
            componentCls: 'x-fa fa-globe',
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
            layout : {
                type : 'hbox',
                pack : 'center'
            },
            items:[
                {
                    xtype: 'box',
                    cls: 'large-icon icon-padding',
                    componentCls:'x-fa fa-thumbs-up',
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
                            xtype: 'label',
                            cls: 'likes-value',
                            text: '523'
                        },
                        {
                            xtype: 'label',
                            cls: 'likes-label',
                            text: 'Likes'
                        }
                    ]
                },

                {
                    xtype: 'box',
                    cls: 'icon-padding',
                    componentCls:'x-fa fa-ellipsis-v',
                    padding: '8 0 8 0'
                },

                {
                    xtype: 'box',
                    cls: 'large-icon icon-padding',
                    componentCls:'x-fa fa-user-plus',
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
                            xtype: 'label',
                            cls: 'friends-value',
                            text: '734'
                        },
                        {
                            xtype: 'label',
                            cls: 'friends-label',
                            text: 'Friends'
                        }
                    ]
                }
            ]
        }
    ]
});
