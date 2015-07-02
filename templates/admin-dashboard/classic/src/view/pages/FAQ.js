Ext.define('Admin.view.pages.FAQ', {
    extend: 'Ext.container.Container',
    xtype: 'faq',

    requires: [
        'Ext.panel.Panel',
        'Ext.plugin.Responsive',
        'Ext.button.Button',
        'Ext.layout.container.Accordion'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    padding: 10,

    items: [
        {
            xtype: 'panel',
            cls: 'faq-left-sidebar shadow-panel',
            margin: 10,
            header: false,
            ui: 'light',
            responsiveConfig: {
                'width < 1000': {
                    width: 0,
                    visible: false
                },
                'width >= 1000 && width < 1600': {
                    width: 230,
                    visible: true
                },
                'width >= 1600': {
                    width: 300,
                    visible: true
                }
            },

            items: [
                {
                    xtype: 'panel',
                    title: 'Useful Tips',
                    ui: 'light',
                    cls: 'shadow-panel pages-faq-container',
                    iconCls: 'x-fa fa-lightbulb-o',
                    html: '<p>We have created the following list of tips for our users. We hope that they will help you get the most of this website.</p> \n<ul class=\'faq-tips-list\'><li class=\'pointone\'>Point One</li><li class=\'pointtwo\'>Point Two</li><li class=\'pointthree\'>Point Three</li>\n<li class=\'pointfour\'>Point Four</li></ul>',
                    bodyPadding: 15
                },
                {
                    xtype: 'panel',
                    bodyPadding: 20,
                    ui: 'light',
                    cls: 'shadow-panel pages-faq-container',
                    iconCls: 'x-fa fa-question',
                    title: 'Can\'t find the answer?',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'box',
                            html: '<p>Help is just an email or a phone call away. If you cannot find what you are looking for on this page, our customer service representatives will be happy to help you.</p><br>'
                        },
                        {
                            xtype: 'button',
                            ui:'soft-blue',
                            margin: '20 20 20 20',
                            text: 'Contact Us'
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: 'responsive'
                }
            ]
        },
        {
            xtype: 'panel',
            ui: 'light',
            margin: 10,
            flex: 1,
            cls: 'pages-faq-container shadow-panel',

            iconCls: 'x-fa fa-question-circle',
            title: 'FAQs',
            bodyPadding: 15,
            items: [
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'General',
                    height: 340,
                    ui: 'light',
                    items: [
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'How can I access high resolution images?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'Can I download the application on my PC?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'How often does the database get updated?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'Can I use the downloaded images on a commercial website?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Account',
                    height: 340,
                    bodyPadding: 10,
                    ui: 'light',
                    items: [
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'What are the different membership plans?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'Can I change my plan in between?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'How can I deactivate my account?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'Can I transfer my account to another user?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Payment',
                    height: 300,
                    bodyPadding: 10,
                    ui: 'light',
                    items: [
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'What are the payment methods you accept?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'What is the refund policy?',
                            iconCls:'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                            title: 'How long does it take to process my payment?',
                            iconCls:'x-fa fa-caret-down'
                        }
                    ]
                }
            ]
        }
    ]
});
