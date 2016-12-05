Ext.define('KitchenSink.controller.Global', {
    extend: 'Ext.app.Controller',
    namespace: 'KitchenSink',
    requires: [
        'Ext.window.*'
    ],

    stores: [
        'Thumbnails'
    ],

    config: {
        control: {
            'navigation-tree': {
                selectionchange: 'onTreeNavSelectionChange'
            },
            'navigation-toolbar': {
                change: 'onBreadcrumbNavSelectionChange'
            },
            'thumbnails': {
                itemclick: 'onThumbnailClick',
                itemdblclick: 'onThumbnailClick'
            },
            '#codePreview tool[type=maximize]': {
                click: 'onMaximizeClick'
            },
            'tool[regionTool]': {
                click: 'onSetRegion'
            }
        },
        refs: {
            viewport: 'viewport',
            navigationTree: 'navigation-tree',
            navigationBreadcrumb: '#navigation-toolbar',
            contentPanel: 'contentPanel,#soloContent',
            descriptionPanel: 'descriptionPanel',
            codePreview: '#codePreview',
            thumbnails: {
                selector: 'thumbnails',
                xtype: 'thumbnails',
                autoCreate: true
            }
        },
        routes  : {
            ':id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },

    beforeHandleRoute: function(id, action) {
        var me = this,
            node = Ext.StoreMgr.get('navigation').getNodeById(id);

        if (node) {
            //resume action
            action.resume();
        } else {
            Ext.Msg.alert(
                'Route Failure',
                'The view for ' + id + ' could not be found. You will be taken to the application\'s start',
                function() {
                    me.redirectTo(me.getApplication().getDefaultToken());
                }
            );

            //stop action
            action.stop();
        }
    },

    handleRoute: function(id) {
        var me = this,
            navigationTree = me.getNavigationTree(),
            navigationBreadcrumb = me.getNavigationBreadcrumb(),
            store = Ext.StoreMgr.get('navigation'),
            node = store.getNodeById(id),
            contentPanel = me.getContentPanel(),
            thumbnails = me.getThumbnails(),
            codePreview = me.getCodePreview(),
            hasTree = navigationTree && navigationTree.isVisible(),
            className, cmp, ViewClass, thumbnailsStore, tier;

        Ext.suspendLayouts();

        if (node.isLeaf()) {
            if (thumbnails.ownerCt) {
                contentPanel.remove(thumbnails, false); // remove thumbnail view without destroying
            } else {
                contentPanel.removeAll(true);
            }

            // Normal region is a panel but we might be in solo mode:
            (contentPanel.body || contentPanel.el).addCls('kitchensink-example');

            className = Ext.ClassManager.getNameByAlias('widget.' + id);
            ViewClass = Ext.ClassManager.get(className);

            cmp = new ViewClass();

            contentPanel.add(cmp);
            this.setupPreview(ViewClass.prototype);

            this.updateTitle(node);

            if (cmp.floating) {
                Ext.resumeLayouts(true);
                cmp.show();
                Ext.suspendLayouts();
            }
        } else {
            thumbnailsStore = me.getThumbnailsStore();
            thumbnailsStore.removeAll();
            thumbnailsStore.add(node.childNodes);
            if (!thumbnails.ownerCt) {
                contentPanel.removeAll(true);
            }
            contentPanel.body.removeCls('kitchensink-example');
            contentPanel.add(thumbnails);
            codePreview.removeAll();
            codePreview.add({
                html: node.get('description') || ''
            });
            codePreview.tabBar.hide();
            this.updateTitle(node);
        }

        codePreview.removeCls(['in-tier-pro', 'in-tier-premium']);
        tier = node.get('tier');
        if (tier === 'pro' || tier === 'premium') {
            codePreview.addCls('in-tier-' + tier);
        }

        // Keep focus available and selections synchronized.
        // If navigation was through thumbnails, the view will have hidden and focus will go to document
        if (hasTree) {
            if (node.isRoot()) {
                navigationTree.ensureVisible(0, {
                    focus: true
                });
            } else {
                if (node.parentNode && !node.parentNode.isExpanded()) {
                    node.parentNode.expand();
                }
                navigationTree.ensureVisible(node, {
                    focus: true,
                    select: true
                });
            }
        } else if (navigationBreadcrumb) {
            navigationBreadcrumb.setSelection(node);
            navigationBreadcrumb.child(':last').focus();
        }
        Ext.resumeLayouts(true);
    },

    updateTitle: function(node) {
        var text = node.get('text'),
            title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text,
            contentPanel = this.getContentPanel();

        if (contentPanel.setTitle) {
            contentPanel.setTitle(title);
        }

        document.title = document.title.split(' - ')[0] + ' - ' + text;
    },

    setupPreview: function (clsProto) {
        var me = this,
            preview = me.getCodePreview(),
            otherContent = clsProto.otherContent,
            resources = [],
            codePreviewProcessed = clsProto.codePreviewProcessed;

        if (!preview) {
            return;
        }

        if (!codePreviewProcessed) {
            resources.push({
                type: 'View',
                path: clsProto.$className.replace(/\./g, '/')
                    .replace('KitchenSink', 'classic/samples') + '.js'
            });

            if (otherContent) {
                resources = resources.concat(otherContent);
            }

            // Clone everything, since we're about to hook up loaders
            codePreviewProcessed = clsProto.codePreviewProcessed = [];
            Ext.each(resources, function(resource) {
                resource.xtype = 'codeContent';
                resource.rtl = false;
                resource.title = resource.type;
                //resource.tabConfig = {
                //    tooltip: resource.path
                //};
                var clone = Ext.apply({}, resource);
                codePreviewProcessed.push(clone);
                resource.loader = {
                    url: resource.path,
                    autoLoad: true,
                    rendererScope: me,
                    renderer: me.renderCodeMarkup,
                    resource: clone,
                    profileInfo: clsProto.profileInfo
                };
            });
        } else {
            resources = codePreviewProcessed;
        }

        preview.removeAll();

        preview.add(resources);
        preview.setActiveTab(0);

        // Hide the Tab Panel if there's only one resource
        preview.tabBar.setVisible(resources.length > 1);

        preview.activeView = clsProto;
    },

    emptyLineRe: /^\s*$/,
    exampleRe: /^\s*\/\/\s*(\<\/?example\>)\s*$/,
    profileInfoRe: /this\.profileInfo\.(\w+)/g,
    profilePropRe: /'\$\{(\w+)\}'/g,
    profilePropsRe: /\$\{(\w+)\}/g,

    renderCodeMarkup: function(loader, response) {
        var code = this.processText(response.responseText, loader.profileInfo);
        // Passed in from the block above, we keep the proto cloned copy.
        loader.resource.html = code;
        loader.getTarget().setHtml(code);
        prettyPrint();
        return true;
    },

    processText: function (text, profileInfo) {
        var lines = text.split('\n'),
            removing = false,
            keepLines = [],
            len = lines.length,
            exampleRe = this.exampleRe,
            profileInfoRe = this.profileInfoRe,
            profilePropRe = this.profilePropRe,
            profilePropsRe = this.profilePropsRe,
            encodeTheme = function (text, match) {
                return Ext.encode(profileInfo[match]);
            },
            emptyLineRe = this.emptyLineRe,
            i, line, code, previous;

        for (i = 0; i < len; ++i) {
            line = lines[i];

            if (removing) {
                if (exampleRe.test(line)) {
                    removing = false;
                }
            } else if (exampleRe.test(line)) {
                removing = true;
            } else {
                // Replace "this.profileInfo.foo" with the value of "foo" properly encoded
                // for JavaScript (otherwise strings would not be quoted).
                line = line.replace(profileInfoRe, encodeTheme);
                line = line.replace(profilePropRe, encodeTheme);
                line = line.replace(profilePropsRe, encodeTheme);

                if (emptyLineRe.test(line)) {
                    line = '';
                    if (line === previous) {
                        continue; // collapse multiple blank lines down to one
                    }
                }

                keepLines.push(previous = line);
            }
        }

        code = keepLines.join('\n');
        code = Ext.htmlEncode(code);
        return '<pre class="prettyprint">' + code + '</pre>';
    },

    onSetRegion: function (tool) {
        var panel = tool.toolOwner;

        var regionMenu = panel.regionMenu || (panel.regionMenu =
            Ext.widget({
                xtype: 'menu',
                items: [{
                    text: 'North',
                    checked: panel.region === 'north',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('north');
                    }
                },{
                    text: 'South',
                    checked: panel.region === 'south',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('south');
                    }
                },{
                    text: 'East',
                    checked: panel.region === 'east',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('east');
                    }
                },{
                    text: 'West',
                    checked: panel.region === 'west',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('west');
                    }
                }]
            }));

        regionMenu.showBy(tool.el);
    },

    onTreeNavSelectionChange: function(selModel, records) {
        var record = records[0];

        // Ignore the initialize to the "all" node.
        if (record && !record.isRoot()) {
            this.redirectTo(record.getId());
        }
    },

    onBreadcrumbNavSelectionChange: function(breadcrumb, node) {
        if (node) {
            this.redirectTo(node.getId());
        }
    },

    onThumbnailClick: function(view, node, item, index, e) {
        // Update the selectedView in the ViewModel.
        // Both navigation views are bound to this, so whichever is visible, tree or breadcrumb
        // will fire its selectionchange.
        this.getViewport().getViewModel().set('selectedView', node);
    },

    onMaximizeClick: function(){
        var preview = this.getCodePreview(),
            activeView = preview.activeView,
            w = new Ext.window.Window({
                rtl: false,
                maximized: true,
                title: 'Code Preview',
                closable: true,
                layout: 'fit',
                defaultFocus: 'tab',
                items: {
                    xtype: 'codePreview',
                    activeTab: activeView ? preview.items.indexOf(preview.getActiveTab()) : 0,
                    tools: [],
                    showTitle: false,
                    items: activeView ? activeView.codePreviewProcessed : []
                },
                doClose: function() {
                    w.hide(preview, function() {
                        w.destroy();
                    });
                },
                onFocusLeave: function() {
                    this.close();
                }
            });

        w.show(preview);
    }
});
