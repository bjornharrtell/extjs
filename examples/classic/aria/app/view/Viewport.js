Ext.define('Aria.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    requires: [
        'Ext.Img',
        'Ext.layout.container.Border',
        'Ext.layout.container.Accordion',
        'Ext.tab.Panel',
        'Ext.form.Panel'
    ],

    layout: 'border',

    initComponent: function() {
        var me = this,
            num = 1;

        me.items = [{
            xtype: 'container',
            region: 'north',
            padding: '6 12',
            height: 40,
            
            ariaRole: 'banner',
            
            layout: {
                align: 'stretch',
                type: 'hbox'
            },
            
            items: [{
                xtype: 'image',
                alt: 'Sencha logo',
                src: 'resources/images/sencha-logo.png',
                width: 19,
                height: 28,
                style: {
                    'margin-right': '10px'
                }
            }, {
                xtype: 'component',
                ariaRole: 'heading',
                html: 'Ext JS Accessibility Demo',
                ariaAttributes: {
                    // Some screen readers will announce document contents upfront.
                    // In that case the region header component's html may be read
                    // twice: first as north container's aria-labelledby element,
                    // and then by itself as a div with a text node.
                    // The attribute below will instruct screen readers to skip
                    // the div text; it will be announced only as a region heading.
                    'aria-hidden': true
                }
            }, {
                xtype: 'component',
                flex: 3
            }]
        }, {
            xtype: 'panel',
            region: 'west',
            
            title: 'Accordion panels',
            collapsible: true,
            split: true,
            minWidth: 320,
            
            layout: {
                type: 'accordion',
                animate: true
            },
            
            tools: [{
                type: 'pin',
                tooltip: 'Pin the panel'
            }, {
                type: 'help',
                tooltip: 'Get panel help'
            }],
            
            items: [{
                xtype: 'mysimplebuttons',
                closable: true
            }, {
                xtype: 'panel',
                title: 'Closable panel',
                closable: true,
                html: 'This is an example of a closable panel'
            }, {
                xtype: 'mysimpleform',
                title: 'Personal data form',
                closable: true
            }]
        }, {
            xtype: 'tabpanel',
            title: 'Center tab panel',
            region: 'center',
            ariaRole: 'main',
            header: false,
            split: true,
            layout: 'fit',
            bodyStyle: 'background:white',
            defaults: {
                padding: 12,
                bodyStyle: 'background:white'
            },
            
            items: [{
                xtype: 'mysimplegrid'
            }, {
                xtype: 'mysimplepanel'
            }, {
                xtype: 'mysimplelist'
            }, {
                xtype: 'container',
                title: 'Window',
                items: [{
                    xtype: 'button',
                    text: 'Open Window',
                    handler: function() {
                        var win = this.up('container').add(Ext.widget('mysimplewindow', {
                            title:'ARIA Window ' + num++
                        }));
                        
                        win.showBy(this, 'tr', [num*20, num*20]);
                    }
                }]
            }, {
                xtype: 'mysimpleitemselector'
//             }, {
//                 xtype: 'mysimpledatepicker'
            }, {
                xtype: 'mysimpletoolbar'
            }, {
                xtype: 'mysimplewizard'
            }, {
                xtype: 'container',
                title: 'Image',
                closable: true,
                
                items: [{
                    xtype: 'mysimpleimage'
                }]
            }]
        }];

        me.callParent();
    }
});
