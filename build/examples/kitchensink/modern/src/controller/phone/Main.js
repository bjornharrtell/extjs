/**
 * @class KitchenSink.controller.phone.Main
 * @extends KitchenSink.controller.Main
 *
 * This is the Main controller subclass for the 'phone' profile. Most of the functionality required for this controller
 * is provided by the KitchenSink.controller.Main superclass, but we do need to add a couple of refs and control
 * statements to provide the  different behavior for the phone.
 *
 * This provides a couple of capabilities that we need. Firstly it sets up a listener on the main
 * navigation NestedList and redirects to the appropriate url for each view. For example, tapping on the 'Forms' item
 * in the list will redirect to the url 'forms'.
 *
 * Secondly, we set up a route that listens for urls in the form above and calls the controller's showView function
 * whenever one is detected. The showView function then just shows the appropriate view on the screen.
 *
 */
Ext.define('KitchenSink.controller.phone.Main', {
    extend: 'KitchenSink.controller.Main',

    /**
     * @private
     */
    viewCache: [],

    refs: {
        toolbar: '#mainNavigationBar',
        nav: '#cardPanel',
        touchEvents: 'touchevents',
        consoleButton: 'button[action=showConsole]'
    },

    control: {
        nav: {
            itemtap: 'onNavTap',
            leafitemtap: 'onNavLeafTap',
            back: 'onBackTap'
        },
        consoleButton: {
            tap: 'showTouchEventConsole'
        }
    },
    routes: {
        ':id' : 'showById'
    },

    /**
     * This method is executed when the NestedList for navigation has been initialized.  We want to 
     * check the hash on the URL and go to the correct list or leaf, accordingly.
     */
    showById: function(id) {
        var me = this,
            nav = me.getNav(),
            store = Ext.StoreMgr.get('Navigation'),
            hash = (window.location.hash || '').substr(1),
            node = hash.length ? store.getNodeById(hash) : store.getNodeById('All');
            
        if (node !== null) {
            me.record = node;
            if (node.isLeaf()) {
                me.showView(node);
            }
            else {
                // go to the proper sublist
                nav.goToNode(node);
            }
        }
    },

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index, target, record, e) {
        // this just changes the hash on the URL
        this.redirectTo(record.get('id'));
    },

    /**
     * This is called whenever the user taps on a leaf item in the main navigation NestedList
     */
    onNavLeafTap: function(nestedList, list, index, target, record, e) {
        var me = this;

        me.record = record;
        me.showView(record, true);
    },

    /**
     * @private
     * We implement onSourceTap for Phone profile because the source view covers the entire screen.
     */
    onSourceTap: function() {
        var me = this,
            overlay = me.getSourceOverlay(),
            demo = me.currentDemo,
            view = me.activeView,
            cls, files, content;

        me.burgerActions.destroy();
        me.burgerActions = null;

        if (demo) {
            Ext.Viewport.animateActiveItem(overlay, { type: 'cover', direction: 'up'});
            me.updateDetails(me.record);
            //me.loadOverlayContent(demo, view);
        }
    },

    /**
     * @private
     * In the kitchen sink we have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     * @param {String} name The full class name of the view to create (e.g. "KitchenSink.view.Forms")
     * @return {Ext.Component} The component, which may be from the cache
     */
    createView: function (item) {
        var me = this,
            name = me.getViewName(item),
            cache = me.viewCache,
            ln = cache.length,
            limit = item.get('limit') || 20,
            view, i = 0, j, oldView;

        for (; i < ln; i++) {
            view = cache[i];
            if (view.viewName === name) {
                me.activeView = view;
                return view;
            }
        }

        if (ln >= limit) {
            for (i = 0, j = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                } else {
                    cache[j++] = oldView;
                }
            }
            cache.length = j;
        }

        view = Ext.create(name);
        view.viewName = name;
        cache.push(view);
        me.viewCache = cache;

        me.activeView = view;

        return view;
    },

    /**
     * For a given Demo model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'demo/:id', so is called automatically whenever the user navigates back or forward between demos.
     * @param {KitchenSink.model.Demo} item The Demo model instance for which we want to show a view
     */
    showView: function(item, direct) {
        var me = this,
            nav    = me.getNav(),
            title  = item.get('text'),
            view   = me.createView(item),
            layout = nav.getLayout(),
            anim   = item.get('animation'),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (nav.getDetailCard() !== view) {
            if (anim) {
                layout.setAnimation(anim);
                newAnim = layout.getAnimation();
            }
            me.currentDemo = item;
            nav.setDetailCard(view);
            if (!direct) {
                nav.goToLeaf(item);
            }

            if (newAnim) {
                newAnim.on('animationend', function() {
                    layout.setAnimation(initialAnim);
                }, me, { single: true });
            }
        }

        me.getToolbar().setTitle(title);
    },

    /**
     * This is called whenever the user hits the Back button on the main navigation NestedList. It hides the
     * "View Source" button as we do no want to see that when we are in the NestedList itself
     */
    onBackTap: function(nestedList, node) {
        this.redirectTo(node.parentNode.get('id'));
    },

    /**
     * This is called whenever the user hits the 'Console' button on the TouchEvents view. It just makes sure
     * that the view is showing the console card.
     */
    showTouchEventConsole: function(button) {
        this.getTouchEvents().showConsole();
    }
});
