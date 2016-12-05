Ext.define('KitchenSink.view.panels.BasicPanel', {
    extend: 'Ext.Container',

    requires: 'Ext.layout.VBox',

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    margin: '0 10',
    defaults: {
        margin: '0 0 10 0',
        bodyPadding: 10
    },
    items: [
        {
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'stretch'
            },
            defaults: {
                flex: 1,
                bodyPadding: 10,
                html: KitchenSink.DummyText.mediumText
            },
            items: [
                {
                    xtype: 'panel',
                    margin: '0 5 0 0'
                },
                {
                    xtype: 'panel',
                    title: 'Title',
                    margin: '0 0 0 5'
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Built in Tools',
            html: 'Lorem ipsum',
            tools: [
                // <example>
                /*
                 { type: 'close'},
                 { type: 'minimize'},
                 { type: 'maximize'},
                 { type: 'restore'},
                 { type: 'toggle'},
                 { type: 'toggle'},
                 { type: 'gear'},
                 { type: 'prev'},
                 { type: 'next'},
                 { type: 'pin'},
                 { type: 'unpin'},
                 { type: 'right'},
                 { type: 'left'},
                 { type: 'down'},
                 { type: 'up'},
                 { type: 'refresh'},
                 { type: 'plus'},
                 { type: 'minus'},
                 { type: 'menu'},
                 { type: 'search'},
                 { type: 'save'},
                 { type: 'help'},
                 { type: 'print'},
                 { type: 'expand'},
                 { type: 'collapse'},
                 { type: 'resize'},
                 { type: 'move'}
                 */
                // </example>
                {type: 'minimize'},
                //</example>
                {type: 'refresh'},
                {type: 'search'},
                {type: 'save'},
                {type: 'menu'}
            ]
        },
        {
            xtype: 'panel',
            title: 'Custom Tools using iconCls',
            html: 'Lorem ipsum',
            tools: [
                {iconCls: 'x-fa fa-wrench'},
                {iconCls: 'x-fa fa-reply'},
                {iconCls: 'x-fa fa-reply-all'},
                {iconCls: 'x-fa fa-rocket'}
            ]
        }
    ]
});
