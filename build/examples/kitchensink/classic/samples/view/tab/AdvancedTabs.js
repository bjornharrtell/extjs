/**
 * This example demonstrates some of the more advanced features of tabs, including:
 *
 * - Side and bottom docking
 * - Tab rotation
 * - Closable tabs
 * - Dynamically adding and removing tabs
 * - Dynamically switching the position and rotation of tab bars
 */
Ext.define('KitchenSink.view.tab.AdvancedTabs', {
    extend: 'Ext.panel.Panel',
    xtype: 'advanced-tabs',
    controller: 'advanced-tabs',

    //<example>
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/tab/AdvancedTabsController.js'
    }],
    exampleTitle: 'Advanced Tabs',
    profiles: {
        classic: {
            icon1: 'classic/resources/images/icons/fam/cog.gif',
            icon2: 'classic/resources/images/icons/fam/user.gif',
            icon3: 'classic/resources/images/icons/fam/accept.gif',
            iconAdd: 'classic/resources/images/icons/fam/add.gif',
            buttonUI: 'default',
            width: 580
        },
        neptune: {
            glyph1: 42,
            glyph2: 70,
            glyph3: 86,
            glyphAdd: 43,
            buttonUI: 'default-toolbar',
            width: 620
        },
        'neptune-touch': {
            width: 740
        },
        triton: {
            width: 700
        }
    },
    //</example>

    height: 400,
    layout: 'fit',
    viewModel: true,

    initComponent: function() {
        Ext.apply(this, {
            width: this.profileInfo.width,
            tbar: [
                {
                    xtype: 'label',
                    text: 'Position:',
                    padding: '0 0 0 5'
                },
                {
                    xtype: 'segmentedbutton',
                    reference: 'positionBtn',
                    value: 'top',
                    defaultUI: this.profileInfo.buttonUI,
                    items: [{
                        text: 'Top',
                        value: 'top'
                    }, {
                        text: 'Right',
                        value: 'right'
                    }, {
                        text: 'Bottom',
                        value: 'bottom'
                    }, {
                        text: 'Left',
                        value: 'left'
                    }]
                },
                {
                    xtype: 'label',
                    text: 'Rotation:',
                    padding: '0 0 0 5'
                },
                {
                    xtype: 'segmentedbutton',
                    reference: 'rotationBtn',
                    value: 'default',
                    defaultUI: this.profileInfo.buttonUI,
                    items: [{
                        text: 'Default',
                        value: 'default'
                    }, {
                        text: 'None',
                        value: 0
                    }, {
                        text: '90deg',
                        value: 1
                    }, {
                        text: '270deg',
                        value: 2
                    }]
                },
                {
                    xtype: 'button',
                    icon: this.profileInfo.iconAdd,
                    glyph: this.profileInfo.glyphAdd,
                    tooltip: 'Add Tab',
                    listeners: {
                        click: 'onAddTabClick'
                    }
                },
                {
                    xtype: 'button',
                    enableToggle: true,
                    tooltip: 'Auto Cycle!',
                    listeners: {
                        toggle: 'onAutoCycleToggle'
                    },
                    glyph: 109
                }
            ],
            items: [{
                xtype: 'tabpanel',
                reference: 'tabpanel',
                border: false,
                defaults: {
                    bodyPadding: 10,
                    scrollable: true,
                    closable: true,
                    border: false
                },
                bind: {
                    tabPosition: '{positionBtn.value}',
                    tabRotation: '{rotationBtn.value}'
                },
                items: [{
                    title: 'Tab 1',
                    icon: this.profileInfo.icon1,
                    glyph: this.profileInfo.glyph1,
                    html: KitchenSink.DummyText.longText
                }, {
                    title: 'Tab 2',
                    icon: this.profileInfo.icon2,
                    glyph: this.profileInfo.glyph2,
                    html: KitchenSink.DummyText.extraLongText
                }, {
                    title: 'Tab 3',
                    icon: this.profileInfo.icon3,
                    glyph: this.profileInfo.glyph3,
                    html: KitchenSink.DummyText.longText
                }]
            }]
        });

        this.callParent();
    }
});