/**
 * @class kitchensink.controller.tablet.main
 * @extends KitchenSink.controller.Main
 *
 * This is the Main controller subclass for the 'tablet' profile. 
 *
 * The table profile differs from the phone profile in that navigation is done via screens full of icons
 * instead of a nested list.
 */
Ext.define('KitchenSink.controller.tablet.Main', {
    extend: 'KitchenSink.controller.Main',

    refs: {
        toolbar: '#mainNavigationBar',
        burgerButton: 'button[action=burger]',
        contentPanel1: '#contentPanel1',
        contentPanel2: '#contentPanel2',
        cardPanel: '#cardPanel',
        icons: '#icons',
        icons2: '#icons2',
        breadcrumb: 'breadcrumb',
        breadcrumbButton: 'button[action=breadcrumb]',

        thumbnails1: {
            selector: '#thumbnails1>thumbnails',
            id: 'thumbnails1',
            xtype: 'thumbnails',
            flex: 1,
            autoCreate: true
        },
        thumbnails2: {
            selector: '#thumbnails2>thumbnails',
            id: 'thumbnails2',
            xtype: 'thumbnails',
            flex: 1,
            autoCreate: true
        }
    },

    control: {
        'burgerButton': {
            tap: 'onBurgerTap'
        },
        '#thumbnails1': {
            itemtap: 'onThumbnailClick'
        },
        '#thumbnails2': {
            itemtap: 'onThumbnailClick'
        },
        breadcrumbButton: {
            tap: 'onBreadcrumbTap'
        }
    },

    routes: {
        ':id': {
            action: 'handleRoute',
            before: 'beforeHandleRoute'
        }
    },

    /**
     * Set animnation for moving forward (right) through the navigation hierarchy.
     */
    animateForward: function() {
        var me = this;

        me.getCardPanel().getLayout().setAnimation({
            type: 'slide',
            direction: 'left',
            duration: 250
        });
        me.animateDirection = 'forward';
    },

    /**
     * Set animnation for moving backward (left) through the navigation hierarchy.
     */
    animateBackward: function() {
        var me = this;

        me.getCardPanel().getLayout().setAnimation({
            type: 'slide',
            direction: 'right',
            duration: 250
        });
        me.animateDirection = 'backward';
    },

    updateTitle: function(node) {
        var text = node.get('text'),
            title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text,
            toolbar = this.getToolbar();

        if (title === 'All') {
            title = 'Kitchen Sink';
        }
        document.title = document.title.split(' - ')[0] + ' - ' + text;
    },

    updateBreadcrumb: function(node) {
        var me = this,
            breadcrumb = me.getBreadcrumb(),
            path = [];

        do {
            path.push({ text: node.get('text'), value: node.get('id'), action: 'breadcrumb' });
            if (node.parentNode) {
                path.push({ xtype: 'component', html: '&nbsp;>&nbsp;'});
            }
            node = node.parentNode;
        } while (node);

        path = path.reverse();
        path.push.apply(path, breadcrumb.afterItems);

        breadcrumb.removeAll(true);
        breadcrumb.add(path);
    },

    onBreadcrumbTap: function(button) {
        var me = this;

        me.animateBackward();
        me.redirectTo(button.getValue());
    },

    handleRoute: function(id) {
        var me = this,
            store = Ext.StoreMgr.get('Navigation'),
            node = store.getNodeById(id),
            contentPanel1, contentPanel2,
            cardPanel = me.getCardPanel(),
            animation = cardPanel.getLayout().getAnimation(),
            activeCard = cardPanel.getActiveItem(),
            cp1 = activeCard.id === 'contentPanel2',
            thumbnails, thumbnails1, thumbnails2,
            icons = cp1 ? me.getIcons() : me.getIcons2(),
            cmp, thumbnailsStore, demoContent, tier;

        Ext.suspendLayouts();

        me.record = node;
        if (node.isLeaf()) {
            cmp = {
                xtype: 'contentPanel',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                items: {
                    xclass: me.getViewName(node)
                }
            };
                
            cmp = cardPanel.add(cmp);
            demoContent = cmp.getItems().items[0];
            if (demoContent.getWidth() === null) {
                demoContent.setWidth('90%');
                demoContent.setHeight('90%');
            }

            cardPanel.setActiveItem(cmp);
            me.updateTitle(node);
            me.currentDemo = node;
            me.activeView = cmp.items.items[0];
            me.updateDetails(node);
        } else {
            contentPanel1 = me.getContentPanel1();
            contentPanel2 = me.getContentPanel2();
            thumbnails1 = me.getThumbnails1();
            thumbnails2 = me.getThumbnails2();
            if (contentPanel1 && !me.thumbnailsAdded) {
                contentPanel1.add(thumbnails1);
                contentPanel2.add(thumbnails2);
                me.thumbnailsAdded = true;
            }
            thumbnails = cp1 ? thumbnails1 : thumbnails2;
            thumbnailsStore = thumbnails.getStore();
            if (!thumbnails.ownerCt) {
                if (icons) {
                    icons.removeAll(true);
                }
            }
            thumbnailsStore.removeAll();
            thumbnailsStore.loadRecords(node.childNodes);
            me.updateTitle(node);
           
            if (animation && me.currentDemo) {
                me.currentDemo = null;
                animation.on({
                    animationend: function() {
                        // titlebar, breadcrumb, cardPanel1, cardPanel2, demo (demo = 4)
                        if (cardPanel.items.items.length > 3) {
                            cardPanel.removeAt(3);
                        }
                    },
                    single: true
                });
            }
            cardPanel.setActiveItem(cp1 ? contentPanel1 : contentPanel2);
            me.updateDetails(node);
        }

        me.updateBreadcrumb(node);
        Ext.resumeLayouts(true);
    },

    beforeHandleRoute: function(id, action) {
        var me = this,
            node = Ext.StoreMgr.get('Navigation').getNodeById(id);

        me.animateDirection = me.animateDireciton || 'forward';
        if (node) {
            action.resume();
        } else {
            Ext.Msg.alert(
                'Route Failure',
                'The view for ' + id + ' could not be found. You will be taken to the application\'s start',
                function() {
                    me.redirectTo(me.getApplication().getDefaultToken());
                }
            );

            action.stop();
        }
    },

    onThumbnailClick: function(view, index, target, record, e, eOpts) {
        var me = this;

        me.record = record;
        me.animateForward();
        me.redirectTo(record.id);
    },

    onBackTap: function() {
        var me = this,
            node = me.record,
            parentId = node ? (node.parentNode ? node.parentNode.get('id') : 'all') : 'all';

        me.animateBackward();
        me.redirectTo(parentId);
    }
});
