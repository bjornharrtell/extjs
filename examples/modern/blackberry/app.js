/**
 * This application demonstrates the Blackberry 10 components.
 */

//the first thing we do is define out application
Ext.application({
    name: 'Blackberry',

    //requires defines the Components/Classes that our application requires.
    requires: [
        'Ext.theme.blackberry.ActionOverFlowMenuButton',
        'Ext.theme.blackberry.ContextMenu',
        'Ext.theme.blackberry.TabMenuButton',
        'Ext.theme.blackberry.ApplicationMenu',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    launch: function() {
        // Remove the loading indicator
        var container = Ext.get('SpinnerContainer');
        if(container) {
            container. destroy();
        }

        // Application menu
        var applicationMenu = Ext.create('Ext.theme.blackberry.ApplicationMenu', {
            items: [{
                text: 'Settings',
                iconCls: 'settings-light'
            }]
        });

        Ext.Viewport.setMenu(applicationMenu, {
            side: 'top'
        });

        // Tab menu button
        var tabMenuButton = Ext.create('Ext.theme.blackberry.TabMenuButton', {
            text: 'All',
            docked: 'left',
            menuItems: [{
                text: 'All',
                iconCls: 'view_grid-light',
                scope: this,
                handler: function() {
                    this.container.setActiveItem(0);
                    this.getContactsStore().clearFilter();
                }
            }, {
                text: 'Favorites',
                iconCls: 'done-light',
                scope: this,
                handler: function() {
                    Ext.getCmp('searchBar').hide();
                    this.container.setActiveItem(0);
                    this.getContactsStore().clearFilter();
                    this.getContactsStore().filter('firstName', 'robert');
                }
            }, {
                text: 'BBM',
                iconCls: 'bbm-light',
                scope: this,
                handler: function() {
                    Ext.getCmp('searchBar').hide();
                    this.container.setActiveItem(1);
                    this.getBBMStore().clearFilter();
                }
            }]
        });

		// Action menu menu
		var actionMenuButton = Ext.create('Ext.theme.blackberry.ActionOverFlowMenuButton', {
		    docked: 'right',
		    menuItems: [{
		        text: 'All',
		        scope: this,
		        iconCls: 'view_grid-light',
		        handler: function() {
                    Ext.Viewport.hideMenu('right');
		            this.container.setActiveItem(0);
		            this.getContactsStore().clearFilter();
		        }
		    }, {
		        text: 'Favorites',
		        iconCls: 'done-light',
		        scope: this,
		        handler: function() {
                    Ext.Viewport.hideMenu('right');
		            Ext.getCmp('searchBar').hide();
		            this.container.setActiveItem(0);
		            this.getContactsStore().clearFilter();
		            this.getContactsStore().filter('firstName', 'robert');
		        }
		    }, {
		        text: 'BBM',
		        iconCls: 'bbm-light',
		        scope: this,
		        handler: function() {
                    Ext.Viewport.hideMenu('right');
		            Ext.getCmp('searchBar').hide();
		            this.container.setActiveItem(1);
		            this.getBBMStore().clearFilter();
		        }
		    }]
		});

        // Context menu
        var contextMenuHandler = function() {
            Ext.Viewport.hideMenu('right');
        };

        var contextMenu = Ext.create('Ext.theme.blackberry.ContextMenu', {
            width: 55,
            // no text 'text' values
            items: [
            {
                iconCls: 'favorite-light',
                scope: this,
                handler: contextMenuHandler
            }, {
                iconCls: 'copy-light',
                scope: this,
                handler: contextMenuHandler
            }, {
                xtype: 'button',
                iconCls: 'select_more-light',
                scope: this,
                handler: contextMenuHandler
            }]
        });

        var onItemTapHold = function(list, item) {
            Ext.Viewport.setMenu(contextMenu, {
                side: 'right'
            });

            Ext.Viewport.showMenu('right');
        };

        this.container = Ext.Viewport.add({
            layout: 'card',
            items: [
                // Bottom toolbar
                {
                    xtype: 'toolbar',
                    ui: 'dark',
                    docked: 'bottom',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        tabMenuButton,
                        {
                            text: 'Search',
                            iconCls: 'search',
                            handler: function() {
                                Ext.getCmp('searchBar').show();
                            }
                        },
                        {
                            text: 'Add',
                            iconCls: 'add_to_contacts'
                        },
                        {
                            text: 'Settings',
                            iconCls: 'settings',
                            handler: function() {
                                Ext.Viewport.showMenu('top');
                            }
                        },
                        actionMenuButton
                    ]
                },

                // Search bar
                {
                    xtype: 'toolbar',
                    id: 'searchBar',
                    docked: 'top',
                    ui: 'light',
                    hidden: true,
                    items: [{
                        xtype: 'textfield',
                        placeHolder: 'Search contacts',
                        flex: 1,
                        listeners: {
                            scope: this,
                            keyup: function(field) {
                                var value = field.getValue();

                                if (value && value.length) {
                                    var filter = [{
                                        filterFn: function(record) {
                                            var firstName = record.get('firstName').toLowerCase(),
                                                lastName = record.get('lastName').toLowerCase();

                                            if (firstName.match(value) || lastName.match(value)) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }];

                                    this.getContactsStore().filter(filter);
                                    this.getBBMStore().filter(filter);
                                }
                                else {
                                    this.getContactsStore().clearFilter();
                                    this.getBBMStore().clearFilter();
                                }
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        handler: function() {
                            Ext.getCmp('searchBar').hide();
                        }
                    }]
                },

                // Contacts list
                {
                    xtype: 'list',
                    store: this.getContactsStore(),
                    itemTpl: '{firstName} {lastName}',
                    listeners: {
                        scope: this,
                        itemtaphold: onItemTapHold
                    }
                },

                // BBM
                {
                    xtype: 'list',
                    store: this.getBBMStore(),
                    itemTpl: '{firstName} {lastName}',
                    listeners: {
                        scope: this,
                        itemtaphold: onItemTapHold
                    }
                }
            ]
        });
    },

    getContactsStore: function() {
        //create a store instance
        if (!this.$contactsStore) {
            this.$contactsStore = Ext.create('Ext.data.Store', {
                //give the store some fields
                fields: ['firstName', 'lastName'],

                //filter the data using the firstName field
                sorters: 'firstName',

                //autoload the data from the server
                autoLoad: true,

                //setup the grouping functionality to group by the first letter of the firstName field
                grouper: {
                    groupFn: function(record) {
                        return record.get('firstName')[0];
                    }
                },

                //setup the proxy for the store to use an ajax proxy and give it a url to load
                //the local contacts.json file
                proxy: {
                    type: 'ajax',
                    url: 'contacts.json'
                }
            });
        }

        return this.$contactsStore;
    },

    getBBMStore: function() {
        //create a store instance
        if (!this.$bbmStore) {
            this.$bbmStore = Ext.create('Ext.data.Store', {
                //give the store some fields
                fields: ['firstName', 'lastName'],

                //filter the data using the firstName field
                sorters: 'firstName',

                //autoload the data from the server
                autoLoad: true,

                //setup the grouping functionality to group by the first letter of the firstName field
                grouper: {
                    groupFn: function(record) {
                        return record.get('firstName')[0];
                    }
                },

                //setup the proxy for the store to use an ajax proxy and give it a url to load
                //the local contacts.json file
                proxy: {
                    type: 'ajax',
                    url: 'bbm.json'
                }
            });
        }

        return this.$bbmStore;
    }
});
