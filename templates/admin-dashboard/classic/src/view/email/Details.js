Ext.define('Admin.view.email.Details', {
    extend: 'Ext.form.Panel',
    xtype: 'emaildetails',

    requires: [
        'Admin.view.email.DetailsViewModel',
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox'
    ],

    viewModel: {
        type: 'emaildetails'
    },

    cls: 'shadow',

    bodyPadding: 10,

    layout : {
        type : 'anchor',
        anchor : '100%'
    },

    listeners: {
        beforerender: 'beforeDetailsRender'
    },

    tbar: [
        // Default item type for toolbar is button, thus we can skip it's definition in
        // the array items
        {
            iconCls: 'x-fa fa-angle-left',
            listeners: {
                click: 'onBackBtnClick'
            }
        },
        {
            iconCls: 'x-fa fa-trash'
        },
        {
            iconCls: 'x-fa fa-exclamation-circle'
        },
        {
            iconCls:'x-fa fa-print'
        },
        {
            iconCls: 'x-fa fa-forward'
        }
    ],

    bbar: {
        cls: 'single-mail-action-button',
        defaults: {
            margin:'0 15 0 0'
        },
        items: [
            '->',
            {
                ui: 'gray',
                text: 'Save'
            },
            {
                ui: 'soft-green',
                text: 'Send'
            }
        ]
    },

    items: [
        {
            xtype: 'container',
            height: 82,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'image',
                    itemId: 'userImage',
                    cls: 'email-sender-img',
                    alt: 'profileImage',
                    height: 80,
                    width: 80
                },
                {
                    xtype: 'component',
                    flex: 1,
                    cls: 'single-mail-email-subject',
                    data: {},
                    itemId: 'emailSubjectContainer',
                    padding: 10,
                    tpl: [
                        '<div class="user-name">{from}</div>',
                        '<div class="user-info">{title}</div>'
                    ]
                }
            ]
        },
        {
            xtype: 'box',
            cls: 'mail-body',
            itemId: 'mailBody'
        },
        {
            xtype: 'box',
            itemId: 'attachments',
            cls:'attachment-container',
            data: null,
            tpl: [
                '<tpl for=".">',
                    '<img class="single-mail-attachment" src="resources/images/{.}" ',
                          'alt="profile image">',
                '</tpl>'
            ]
        },
        {
            xtype: 'htmleditor',
            height: 250,
            fieldLabel: 'Reply',
            labelAlign: 'top',
            labelSeparator: ''
        }
    ]
});
