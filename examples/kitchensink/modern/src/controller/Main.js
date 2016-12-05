/**
 * @class KitchenSink.controller.Main
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 *
 * We provide a default view source code behavior here that displays the source in a card that is animated into view.
 * The card fills the screen.  It optionally contains tabs for multiple source files for those demos that have them.
 */
Ext.define('KitchenSink.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.Deferred'
    ],

    stores: [
        'Thumbnails'
    ],

    refs: {
        cardPanel: '#cardPanel',
        sourceButton: 'button[action=viewSource]',
        closeSourceButton: 'button[action=closeSource]',
        burgerButton: 'button[action=burger]',
        materialThemeSettingsButton: 'button[action=material-theme-settings]',
        contentPanel: 'contentPanel',

        sourceOverlay: {
            selector: 'sourceoverlay',
            xtype: 'sourceoverlay',
            autoCreate: true
        }
    },

    control: {
        sourceButton: {
            tap: 'onSourceTap'
        },
        burgerButton: {
            tap: 'onBurgerTap'
        },
        materialThemeSettingsButton: {
            tap: 'onMaterialThemeSettingsTap'
        },
        closeSourceButton: {
            tap: 'onCloseSourceTap'
        }
    },

    /**
     * @cfg {Ext.data.Model} currentDemo The Demo that is currently loaded. This is set whenever a new demo
     * is shown and used to fetch the source code for the current demo.
     */
    currentDemo: undefined,

    updateDetails: function(node) {
        var me = this,
            description = node.get('description'),
            demo = me.currentDemo,
            view = me.activeView;

        if (description || !demo) {
            me.setOverlayContent([{
                xtype: 'panel',
                styleHtmlContent: true,
                bodyPadding: 8,
                title: 'Details',
                html: description
            }]);
        }
        else {
            me.loadOverlayContent(demo, view);
        }

    },


    changeProfile: function(profileName) {
        var me = this;

        me.burgerActions.hide();
        me.burgerActions = null;

        if (profileName !== undefined) {
            var search = window.location.search.split('&'),
                newSearch = [],
                found = false,
                i;

            for (i = 0; i < search.length; i++) {
                var item = search[i].split('=');
                if (item[0] === 'profile') {
                    if (profileName !== '') {
                        newSearch.push('profile=' + profileName);
                        found = true;
                    }
                }
                else {
                    newSearch.push(search[i]);
                }
            }
            if (!found && profileName !== '') {
                newSearch.push('profile=' + profileName);
            }
            var joined = newSearch.join('&');
            if (window.location.search === joined) {
                window.location.reload();
            }
            else {
                window.location.search = newSearch.join('&');
            }
        }
    },

    onBurgerTap: function() {
        var me = this,
            items = [
                {
                    text: 'Auto Detect Theme',
                    handler: function() {
                        me.changeProfile('');
                    }
                },
                {
                    text: 'Material Theme',
                    handler: function() {
                        me.changeProfile('material');
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
                        me.changeProfile('modern-triton');
                    }
                },
                {
                    text: 'Neptune Theme',
                    handler: function() {
                        me.changeProfile('modern-neptune');
                    }
                },
                {
                    text: 'Classic Kitchen Sink',
                    handler: function() {
                        window.location = location.pathname + '?classic';
                    }
                },
                {
                    text: 'Cancel',
                    ui: 'decline',
                    handler: function() {
                        me.changeProfile();
                    }
                }
            ];

        if (Ext.os.is.Phone && me.currentDemo) {
            items.unshift({
                text: 'View Source',
                ui: 'confirm',
                action: 'viewSource'
            });
        }
        if (!me.burgerActions) {
            me.burgerActions = Ext.create('Ext.ActionSheet', {
                items: items
            });
        }
        Ext.Viewport.add(me.burgerActions);
        me.burgerActions.show();
    },

    updateMaterialColors: function(base, accent) {
        var me = this;

        if (Fashion && Fashion.css) {
            Fashion.css.setVariables({
                'base-color-name': base,
                'accent-color-name': accent
            });

            if (Ext.theme.Material) {
                Ext.theme.Material.updateMetaThemeColor(base);
            }
        }
        me.hideMaterialThemeSettingsMenu();
    },

    getMaterialThemes: function() {
        var me = this;
        return [
            {
                text: 'America\'s Captain',
                handler: function() {
                    me.updateMaterialColors('red', 'blue');
                }
            },
            {
                text: 'Royal Appeal',
                handler: function() {
                    me.updateMaterialColors('deep-purple', 'indigo');
                }
            },
            {
                text: 'Creamsicle',
                handler: function() {
                    me.updateMaterialColors('deep-orange', 'grey');
                }
            },
            {
                text: 'Mocha Pop',
                handler: function() {
                    me.updateMaterialColors('brown', 'blue-grey');
                }
            },
            {
                text: 'Dry Shores',
                handler: function() {
                    me.updateMaterialColors('blue-grey', 'grey');
                }
            },
            {
                text: 'Bubble Gum',
                handler: function() {
                    me.updateMaterialColors('pink', 'light-blue');
                }
            },
            {
                text: '120° Compliments',
                handler: function() {
                    me.updateMaterialColors('green', 'deep-purple');
                }
            },
            {
                text: 'Roboto House',
                handler: function() {
                    me.updateMaterialColors('grey', 'blue-grey');
                }
            },
            {
                text: 'Daylight & Tungsten',
                handler: function() {
                    me.updateMaterialColors('light-blue', 'orange');
                }
            }
        ]
    },

    onMaterialThemeSettingsTap: function() {
        var me = this,
            items = me.getMaterialThemes();

        items.push({
                text: 'Cancel',
                ui: 'decline',
                handler: function() {
                    me.hideMaterialThemeSettingsMenu();
                }
            }
        );

        if (!me.themeSettingsActions) {
            me.themeSettingsActions = Ext.create('Ext.ActionSheet', {
                items: items
            });
        }
        Ext.Viewport.add(me.themeSettingsActions);
        me.themeSettingsActions.show();
    },

    hideMaterialThemeSettingsMenu: function() {
        var me = this;

        me.themeSettingsActions.hide();
        me.themeSettingsActions = null;
    },


    loadOverlayContent: function(demo, view) {
        var me = this,
            overlay = me.getSourceOverlay(),
            cls, files, content;

        if (view.self.prototype.$cachedContent) {
            me.setOverlayContent(view.$cachedContent);
            PR.prettyPrint();
        }
        else {
            overlay.setMasked({
                xtype: 'loadmask',
                message: 'Loading Source'
            });

            cls = demo.get('view') || demo.get('text');
            cls = cls.replace(/\./g, '/');

            files = [me.getFileContent({
                type: 'View',
                path: 'modern/src/view/' + cls + '.js'
            })];

            content = view.otherContent;
            if (content) {
                content.forEach(function(content) {
                    files.push(me.getFileContent(Ext.apply({}, content)));
                }, me);
            }

            Ext.Deferred.all(files).then(function(values) {
                values.forEach(function(item) {
                    item.title = item.type;
                    delete item.type;
                });
                me.setOverlayContent(values);
                overlay.unmask();
                PR.prettyPrint();

                view.self.prototype.$cachedContent = values;
            });
        }

    },

    /**
     * Shows the source code for the {@link #currentDemo} in an overlay
     */
    onSourceTap: function() {
        var me = this,
            overlay = me.getSourceOverlay(),
            demo = me.currentDemo;

        overlay.setOut(overlay.getHidden() ? false : !overlay.getOut());

        if (demo) {
            me.updateDetails(me.record);
        }
    },

    /**
     * Closes the source code view.
     */
    onCloseSourceTap: function() {
        var me = this,
            overlay = Ext.ComponentQuery.query('sourceoverlay')[0];

        if (overlay) {
            Ext.Viewport.animateActiveItem(me.getCardPanel(), {type: 'reveal', direction: 'down'});
        }
    },

    /**
     * Loads the sources into the overlay, optionally tabs for if the demo has multiple sources.
     */
    setOverlayContent: function(items) {
        var overlay = this.getSourceOverlay();

        overlay.setContent(items);
    },

    getFileContent: function(options) {
        var me = this;

        return Ext.Ajax.request({
            url: options.path
        }).then(function(response) {
            return {
                type: options.type,
                html: response.responseText
            };
        }, function() {
            return null;
        });
    },

    /**
     * @private
     * Returns the full class name of the view to construct for a given Demo
     * @param {KitchenSink.model.Demo} item The demo
     * @return {String} The full class name of the view
     */
    getViewName: function(item) {
        var name = item.get('view'),
            ns = 'KitchenSink.view.';

        if (!name) {
            return false;
        }
        if (name === 'TouchEvents') {
            if (this.getApplication().getCurrentProfile().getName() === 'Desktop') {
                return ns + 'tablet.' + name;
            } else if (this.getApplication().getCurrentProfile().getName() === 'Tablet') {
                return ns + 'tablet.' + name;
            } else {
                return ns + 'phone.' + name;
            }
        } else {
            return ns + name;
        }
    }
});
