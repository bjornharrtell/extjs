Ext.define('Admin.view.widgets.WidgetsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgets',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Field',
        'Ext.app.bind.Formula'
    ],

    stores: {
        widgetsFirstRowdataStore: {
            data: [
                {
                    content: [
                        {
                            _id: 964,
                            numbers: 840,
                            content: 'Sales',
                            fa_image: 'x-fa fa-shopping-cart',
                            container_color: 'cornflower-blue '
                        },
                        {
                            _id: 837,
                            numbers: 611,
                            content: 'Messages',
                            fa_image: 'x-fa fa-envelope',
                            container_color: 'green'
                        },
                        {
                            _id: 758,
                            numbers: 792,
                            content: 'Lines of Code',
                            fa_image: 'x-fa fa-code',
                            container_color: 'magenta '
                        },
                        {
                            _id: 75,
                            numbers: 244,
                            content: 'Files',
                            fa_image: 'x-fa fa-file-text',
                            container_color: 'pink'
                        },
                        {
                            _id: 482,
                            numbers: 637,
                            content: 'Users',
                            fa_image: 'x-fa fa-plus-circle',
                            container_color: 'orange'
                        },
                        {
                            _id: 948,
                            numbers: 112,
                            content: 'Servers',
                            fa_image: 'x-fa fa-tasks',
                            container_color: 'blue'
                        }
                    ]
                }
            ],
            fields: [
                {
                    name: 'content'
                }
            ]
        }
    }
});
