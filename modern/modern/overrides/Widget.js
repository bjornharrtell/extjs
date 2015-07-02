/**
 *
 */
Ext.define('Ext.overrides.Widget', {
    override: 'Ext.Widget',
    
    mixins: [
        'Ext.mixin.Traversable'
    ],

    config: {
        /**
         * @cfg {Number} flex
         * The flex of this item *if* this item item is inside a {@link Ext.layout.HBox} or {@link Ext.layout.VBox}
         * layout.
         *
         * You can also update the flex of a component dynamically using the {@link Ext.layout.FlexBox#setItemFlex}
         * method.
         */
        flex: {
            evented: true,
            $value: null
        },

        /**
         * @cfg {String} id
         * The **unique id of this component instance.**
         *
         * It should not be necessary to use this configuration except for singleton objects in your application. Components
         * created with an id may be accessed globally using {@link Ext#getCmp Ext.getCmp}.
         *
         * Instead of using assigned ids, use the {@link #itemId} config, and {@link Ext.ComponentQuery ComponentQuery}
         * which provides selector-based searching for Sencha Components analogous to DOM querying. The
         * {@link Ext.Container} class contains {@link Ext.Container#down shortcut methods} to query
         * its descendant Components by selector.
         *
         * Note that this id will also be used as the element id for the containing HTML element that is rendered to the
         * page for this component. This allows you to write id-based CSS rules to style the specific instance of this
         * component uniquely, and also to select sub-elements using this component's id as the parent.
         *
         * **Note**: to avoid complications imposed by a unique id also see `{@link #itemId}`.
         *
         * Defaults to an auto-assigned id.
         */

        /**
         * @cfg {String} itemId
         * An itemId can be used as an alternative way to get a reference to a component when no object reference is
         * available. Instead of using an `{@link #id}` with {@link Ext#getCmp}, use `itemId` with
         * {@link Ext.Container#getComponent} which will retrieve `itemId`'s or {@link #id}'s. Since `itemId`'s are an
         * index to the container's internal MixedCollection, the `itemId` is scoped locally to the container - avoiding
         * potential conflicts with {@link Ext.ComponentManager} which requires a **unique** `{@link #id}`.
         *
         * Also see {@link #id}, {@link Ext.Container#query}, {@link Ext.Container#down} and {@link Ext.Container#child}.
         *
         * @accessor
         */
        itemId: undefined
    },

    constructor: function(config) {
        this.callParent([config]);
        this.initBindable();
    },

    applyFlex: function(flex) {
        if (flex) {
            flex = Number(flex);

            if (isNaN(flex)) {
                flex = null;
            }
        }
        else {
            flex = null;
        }

        return flex;
    },

    applyItemId: function(itemId) {
        return itemId || this.getId();
    },

    render: function(container, insertBeforeElement) {
        this.renderTo(container, insertBeforeElement);
    },

    renderTo: function(container, insertBeforeElement) {
        var dom = this.renderElement.dom,
            containerDom = Ext.getDom(container),
            insertBeforeChildDom;

        if (Ext.isNumber(insertBeforeChildDom)) {
            insertBeforeElement = containerDom.childNodes[insertBeforeElement];
        }
        insertBeforeChildDom = Ext.getDom(insertBeforeElement);

        if (containerDom) {
            if (insertBeforeChildDom) {
                containerDom.insertBefore(dom, insertBeforeChildDom);
            }
            else {
                containerDom.appendChild(dom);
            }

            this.setRendered(Boolean(dom.offsetParent));
        }
    },

    destroy: function() {
        var me = this,
            parent = me.getParent();

        if (parent && parent.remove) {
            parent.remove(me, false);
        }

        me.callParent();
    },
    
    isInnerItem: function() {
        return true;
    },
    
    isCentered: function() {
        return false;
    },

    isDocked: function() {
        return Boolean(this.getDocked());
    },
    
    isFloating: function() {
        return false;
    },
    
    getDocked: function() {
        return this._docked;
    },

    /**
     * @private
     */
    onAdded: function(parent, instanced) {
        var me = this,
            inheritedState = me.inheritedState,
            currentParent = me.parent;

        if (currentParent && currentParent !== parent) {
            currentParent.remove(me, false);
        }

        me.parent = parent;

        me.onInheritedAdd(parent, instanced);
    },

    onRemoved: function(destroying) {
        if (!destroying) {
            this.removeBindings();
        }

        this.onInheritedRemove(destroying);

        this.parent = null;
    },

    setLayoutSizeFlags: Ext.emptyFn,

    /**
     * @private
     * @param {Boolean} rendered
     */
    setRendered: function(rendered) {
        var wasRendered = this.rendered;

        if (rendered !== wasRendered) {
            this.rendered = rendered;

            return true;
        }

        return false;
    },

    updateLayout: function() {
        // If size monitoring for widgets has improvements to not
        // need to do this anymore, core/Widget will need this to be
        // declared as an emptyFn to preserve toolkit compat
        var parent = this.getParent(),
            scrollable;

        if (parent) {
            scrollable = parent.getScrollable();
            if (scrollable) {
                scrollable.refresh();
            }
        }
    }
});