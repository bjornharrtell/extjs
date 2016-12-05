/**
 * @class kitchensink.controller.desktop.main
 * @extends KitchenSink.controller.Main
 *
 * This is the Main controller subclass for the 'desktop' profile. The desktop profile operates similar to the 
 * tablet profile with a few exceptions.  The hamburger menu is implemented as a Viewport style menu instead
 * of as an action sheet.  The source view is displayed split screen (horizontally), below the demo.  The
 * show source menu option toggles between show and hide depending on if the source panel is shown.
 */
Ext.define('KitchenSink.controller.desktop.Main', {
    extend: 'KitchenSink.controller.tablet.Main',
    
    refs: {
        cardPanel: '#cardPanel',
        burgerButton: 'button[action=burger]'
    },

    control: {
        burgerButton: {
            tap: 'onBurgerTap'
        }
    },

    hideBurgerMenu: function() {
        var me = this,
            cardPanel = me.getCardPanel();
        
            cardPanel.setMasked(false);
        if (me.burgerActions) {
            me.burgerActions.hide();
            me.burgerActions = null;
        }
    },

    onBurgerTap: function() {
        var me = this,
            cardPanel = me.getCardPanel(),
            items;

        if (me.burgerActions) {
            me.hideBurgerMenu();
            return;
        }

        if (me.themeSettingsActions) {
            me.hideMaterialThemeSettingsMenu();
        }

        items = [
            {
                text: 'Auto Detect Theme',
                handler: function() {
                    me.changeProfile('', true);
                }
            }, 
            {
                text: 'Material Theme',
                handler: function() {
                    me.changeProfile('material', true);
                }
            }, 
            {
                text: 'iOS Theme',
                handler: function() {
                    me.changeProfile('ios', true);
                }
            }, 
            {
                text: 'Triton Theme',
                handler: function() {
                    me.changeProfile('modern-triton', true);
                }
            }, 
            {
                text: 'Neptune Theme',
                handler: function() {
                    me.changeProfile('modern-neptune', true);
                }
            }, 
            {
                text: 'Classic Kitchen Sink',
                handler: function() {
                    window.location = location.pathname + '?classic';
                }
            }
        ];

        me.burgerActions = Ext.create('Ext.Panel', {
            border: true,
            shadow: true,
            floated: true,
            defaultType: 'button',
            layout: 'vbox',
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            items:items
        });

        cardPanel.setMasked({ xtype: 'mask', transparent: true });
        cardPanel.getMasked().on('tap', function() {
            me.hideBurgerMenu();
        });
        me.burgerActions.showBy(me.getBurgerButton(), 'tr-br');
    },

    onMaterialThemeSettingsTap: function() {
        var me = this,
            cardPanel = me.getCardPanel(),
            items;

        if (me.burgerActions) {
            me.hideBurgerMenu();
        }

        if (me.themeSettingsActions) {
            me.hideMaterialThemeSettingsMenu();
            return;
        }

        items = me.getMaterialThemes();

        me.themeSettingsActions = Ext.create('Ext.Panel', {
            border: true,
            shadow: true,
            floated: true,
            defaultType: 'button',
            layout: 'vbox',
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            items:items
        });

        cardPanel.setMasked({ xtype: 'mask', transparent: true });
        cardPanel.getMasked().on('tap', function() {
            me.hideMaterialThemeSettingsMenu();
        });
        me.themeSettingsActions.showBy(me.getMaterialThemeSettingsButton(), 'tr-br');
    },

    hideMaterialThemeSettingsMenu: function() {
        var me = this,
            cardPanel = me.getCardPanel();

        cardPanel.setMasked(false);
        if (me.themeSettingsActions) {
            me.themeSettingsActions.hide();
            me.themeSettingsActions = null;
        }
    }
});

