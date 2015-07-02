Ext.define('Aria.view.Buttons', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mysimplebuttons',
    
    requires: [
        'Ext.container.ButtonGroup'
    ],
    
    title: 'Buttons',
    
    defaults: {
        margin: 6
    },

    layout: 'vbox',
    defaultType: 'button',
    
    items: [{
        xtype: 'buttongroup',
        title: 'Button group',
        columns: 2,
        
        items: [{
            text: 'Click me',
            handler: function() {
                Aria.app.msg('Button Click', 'You clicked the "{0}" button.', this.text);
            }
        }, {
            text: 'Toggle me',
            enableToggle: true
        }, {
            text: 'Ordinary items',
            menu: {
                items: [
                    { text: 'Item 1' },
                    {
                        text: 'Item 2',
                        menu: {
                            plain: true,
                        
                            defaults: {
                                plain: true
                            },
                        
                            items: [
                                { text: 'Plain item 1' },
                                { text: 'Plain item 2' },
                                { text: 'Plain item 3' }
                            ]
                        }
                    },
                    { text: 'Item 3' }
                ]
            }
        }, {
            text: 'Checkbox items',
            menu: {
                defaults: {
                    xtype: 'menucheckitem'
                },
            
                items: [
                    { text: 'Check item 1' },
                    {
                        text: 'Check item 2',
                        menu: {
                            defaults: {
                                xtype: 'menucheckitem'
                            },
                        
                            items: [
                                { text: 'Check sub-item 1' },
                                { text: 'Check sub-item 2' },
                                { text: 'Check sub-item 3' }
                            ]
                        }
                    },
                    { text: 'Check item 3' }
                ]
            }
        }]
    }]
});
