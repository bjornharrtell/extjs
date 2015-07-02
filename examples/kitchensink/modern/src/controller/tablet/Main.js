/**
 * @class KitchenSink.controller.tablet.Main
 * @extends KitchenSink.controller.Main
 *
 * This is the Main controller subclass for the 'tablet' profile. Almost all of the functionality is implemented in the
 * superclass, here we just define showView, which is the function that is called whenever any view is navigated to via
 * the navigation NestedList or a url change.
 */
Ext.define('KitchenSink.controller.tablet.Main', {
    extend: 'KitchenSink.controller.Main',

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavLeafTap: function(nestedList, list, index, target, record, e) {
        this.redirectTo(record);
    },

    onNavTap: Ext.emptyFn,

    /**
     * For a given Demo model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'demo/:id', so is called automatically whenever the user navigates back or forward between demos.
     * @param {KitchenSink.model.Demo} item The Demo model instance for which we want to show a view
     */
    showView: function(item) {
        var nav  = this.getNav(),
            view = this.createView(item),
            main = this.getMain(),
            anim = item.get('animation'),
            layout  = main.getLayout(),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailContainer(main);
        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);
        nav.getActiveItem().select(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim.getInitialConfig());
            }, this, { single: true });
        }

        this.getToolbar().setTitle(item.get('text'));
        this.getSourceButton().setHidden(false);
    },

    showMenuById: function() {
        this.hideSheets();
    }
});