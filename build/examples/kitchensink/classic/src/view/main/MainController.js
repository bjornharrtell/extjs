Ext.define('KitchenSink.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    applyState: function(state) {
        var refs = this.getReferences();

        if (state.hasTreeNav) {
            this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            }, refs.contentPanel);

            refs['navigation-toolbar'].hide();
            refs.contentPanel.header.hidden = false;
            this._hasTreeNav = true;
        } else {
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },

    showBreadcrumbNav: function() {
        var refs = this.getReferences(),
            navToolbar = refs['navigation-toolbar'],
            treeNav = refs.tree;

        Ext.suspendLayouts();

        if (navToolbar) {
            navToolbar.show();
        } else {
            refs.contentPanel.addDocked({
                xtype: 'navigation-toolbar'
            });
        }

        treeNav.hide();
        refs.contentPanel.getHeader().hide();

        this._hasTreeNav = false;
        this.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure focus is not lost when treeNav panel is hidden
        refs.breadcrumb.child(':last').focus();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            navToolbar = refs['navigation-toolbar'],
            selection = refs.breadcrumb.getSelection();

        Ext.suspendLayouts();

        if (treeNav) {
            treeNav.show();
        } else {
            treeNav = this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            }, refs.contentPanel);
        }


        navToolbar.hide();
        refs.contentPanel.getHeader().show();

        this._hasTreeNav = true;
        this.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure NavTree scrolls to show the selection and that focus is not lost
        if (selection) {
            treeNav.ensureVisible(selection.isRoot() ? treeNav.store.getAt(0) : selection, {
                focus: true
            });
        }
    },

    treeNavNodeRenderer: function(value) {
        return this.rendererRegExp ? value.replace(this.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },

    onNavFilterFieldChange: function(field, value) {
        var me = this,
            tree = me.getReferences().tree;

        if (value) {
            me.preFilterSelection = me.getViewModel().get('selectedView');
            me.rendererRegExp = new RegExp( '(' + value + ')', "gi");
            field.getTrigger('clear').show();
            me.filterStore(value);
        } else {
            me.rendererRegExp = null;
            tree.store.clearFilter();
            field.getTrigger('clear').hide();

            // Ensure selection is still selected.
            // It may have been evicted by the filter
            if (me.preFilterSelection) {
                    tree.ensureVisible(me.preFilterSelection, {
                    select: true
                });
            }
        }
    },

    onNavFilterClearTriggerClick: function() {
        this.getReferences().navtreeFilter.setValue();
    },

    onNavFilterSearchTriggerClick: function() {
        var field = this.getReferences().navtreeFilter;

        this.onNavFilterFieldChange(field, field.getValue());
    },

    filterStore: function(value) {
        var me = this,
            tree = me.getReferences().tree,
            store = tree.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get('text')),
                    i;

                // If the current node does NOT match the search condition
                // specified by the user...
                if ( !visible ) {

                    // Check to see if any of the child nodes of this node
                    // match the search condition.  If they do then we will
                    // mark the current node as visible as well.
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                }

                else { // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }

                }

                return visible;
            }, v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    }
});
