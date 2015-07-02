/**
 * This example shows how to use segmented buttons. Segmented buttons are just containers
 * with regular buttons inside, with some special styling and options added. By default,
 * all the child buttons will be part of a toggleGroup, but this behavior can be customized
 * using the `allowToggle` and `allowMultiple` config options.
 */
Ext.define('KitchenSink.view.button.SegmentedButtons', {
    extend: 'Ext.Container',
    xtype: 'segmented-buttons',
    //<example>
    profiles: {
        classic: {
            width: 420
        },
        neptune: {
            width: 475
        },
        'neptune-touch': {
            width: 585
        }
    },
    //</example>

    initComponent: function() {
        Ext.apply(this, {
            layout: 'form',
            width: this.profileInfo.width,
            defaultType: 'fieldcontainer',
            items: [{
                fieldLabel: 'Toggle Group',
                items: [{
                    xtype: 'segmentedbutton',
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two',
                        pressed: true
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'Multiple Toggle',
                items: [{
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    pressedButtons: [0, 2],
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two'
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'No Toggle',
                items: [{
                    xtype: 'segmentedbutton',
                    allowToggle: false,
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two'
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'Icons and Arrows',
                items: [{
                    xtype: 'segmentedbutton',
                    allowToggle: false,
                    items: [{
                        iconCls: 'button-home-small',
                        text: 'Button'
                    }, {
                        text: 'Menu Button',
                        menu: [
                            { text: 'Menu Item 1' },
                            { text: 'Menu Item 2' },
                            { text: 'Menu Item 3' }
                        ]
                    }, {
                        xtype: 'splitbutton',
                        text: 'Split Button',
                        menu: [
                            { text: 'Menu Item 1' },
                            { text: 'Menu Item 2' },
                            { text: 'Menu Item 3' }
                        ]
                    }]
                }]
            }]
        });
        this.callParent();
    }
});
