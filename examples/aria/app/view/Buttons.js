Ext.define('Aria.view.Buttons', {
    extend:'Ext.container.Container',
    alias:'widget.mysimplebuttons',
    title:'Buttons',
    
    defaults: {
        margin: 6
    },

    layout: 'hbox',

    initComponent:function () {
        var me = this;

        Ext.apply(me, {
            items:[
                {
                    xtype:'button',
                    text:'Click Me',
                    handler:function () {
                        Aria.app.msg('Button Click', 'You clicked the "{0}" button.', this.displayText || this.text);

                    }
                },
                {
                    xtype:'button',
                    text:'Toggle Me',
                    enableToggle:true
                },
                {
                    xtype:'button',
                    text:'Menu Button',
                    menu:this.makeMenu(5)
                }
            ]
        });

        me.callParent(arguments);
    },

    makeMenu:function (numItems) {
        var items = [];
        for (var i = 0; i < numItems; i++) {
            items.push({
                text:'Item ' + (i + 1),
                handler:this.menuHandler
            });
        }
        return new Ext.menu.Menu({items:items});
    },

    menuHandler:function (item) {
        Aria.app.msg('Menu Click', 'You clicked the "{0}" menu.', item.text);

    }
});