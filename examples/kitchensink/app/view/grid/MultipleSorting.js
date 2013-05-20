Ext.define('KitchenSink.view.grid.MultipleSorting', {
    extend: 'Ext.grid.Panel',
    xtype: 'multi-sort-grid',
    title : 'Multiple Sort Grid',

    //<example>
    exampleDescription: [
        '<p>This example shows how to sort a grid by more than a single field.</p>',
        '<p>The store is initially sorted by Rating DESC then by Salary ASC, as indicated in the toolbar.</p>',
        '<p>Click a button to change sorting direction, drag buttons to reorder them.</p>',
        '<p>This example also uses the <tt>Ext.ux.ToolbarDroppable</tt> plugin to allow column headers to be dropped onto the toolbar. Try it with',
        'Name column header. Each column is only allowed one button, so Rating and Salary cannot be dropped in this example.</p>'
    ],
    //</example>
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.*',
        'Ext.ux.ToolbarDroppable',
        'Ext.ux.BoxReorderer'
    ],

    columns: [{
        text: 'Name',
        flex:1 ,
        sortable: false,
        dataIndex: 'name'
    }, {
        text: 'Rating',
        width: 125,
        sortable: false,
        dataIndex: 'rating'
    }, {
        text: 'Salary',
        width: 125,
        sortable: false,
        dataIndex: 'salary',
        align: 'right',
        renderer: Ext.util.Format.usMoney
    }],
    stripeRows: true,
    height: 350,
    width : 600,

    initComponent: function () {
        var me = this;

        me.on({
            // wait for the first layout to access the headerCt (we only want this once):
            single: true,
            // tell the toolbar's droppable plugin that it accepts items from the columns' dragdrop group
            afterlayout: function(grid) {
                var headerCt = grid.child("headercontainer");
                droppable.addDDGroup(headerCt.reorderer.dragZone.ddGroup);
                me.doSort();
            }
        });

        var store = Ext.create('Ext.data.Store', {
            fields: [
               {name: 'rating', type: 'int'},
               {name: 'salary', type: 'float'},
               {name: 'name'}
            ],
            proxy: {
                type: 'memory',
                data: me.createFakeData(25),
                reader: {
                    type: 'array'
                }
            },
            autoLoad: true
        });
        this.store = store;

        var reorderer = Ext.create('Ext.ux.BoxReorderer', {
            listeners: {
                Drop: function(r, c, button) { //update sort direction when button is dropped
                    me.changeSortDirection(button, false);
                }
            }
        });

        var droppable = Ext.create('Ext.ux.ToolbarDroppable', {
            /**
             * Creates the new toolbar item from the drop event
             */
            createItem: function(data) {
                var header = data.header,
                    headerCt = header.ownerCt,
                    reorderer = headerCt.reorderer;

                // Hide the drop indicators of the standard HeaderDropZone
                // in case user had a pending valid drop in 
                if (reorderer) {
                    reorderer.dropZone.invalidateDrop();
                }

                return me.createSorterButtonConfig({
                    text: header.text,
                    sortData: {
                        property: header.dataIndex,
                        direction: "ASC"
                    }
                });
            },

            /**
             * Custom canDrop implementation which returns true if a column can be added to the toolbar
             * @param {Object} data Arbitrary data from the drag source. For a HeaderContainer, it will
             * contain a header property which is the Header being dragged.
             * @return {Boolean} True if the drop is allowed
             */
            canDrop: function(dragSource, event, data) {
                var sorters = me.getSorters(),
                    header  = data.header,
                    length = sorters.length,
                    entryIndex = this.calculateEntryIndex(event),
                    targetItem = this.toolbar.getComponent(entryIndex),
                    i;

                // Group columns have no dataIndex and therefore cannot be sorted
                // If target isn't reorderable it could not be replaced
                if (!header.dataIndex || (targetItem && targetItem.reorderable === false)) {
                    return false;
                }

                for (i = 0; i < length; i++) {
                    if (sorters[i].property == header.dataIndex) {
                        return false;
                    }
                }
                return true;
            },

            afterLayout: function () {
                me.doSort();
            }
        });

        //create the toolbar with the 2 plugins
        this.tbar = {
            itemId: 'tbar',
            items  : [{
                xtype: 'tbtext',
                text: 'Sorting order:',
                reorderable: false
            }, me.createSorterButtonConfig({
                text: 'Rating',
                sortData: {
                    property: 'rating',
                    direction: 'DESC'
                }
            }), me.createSorterButtonConfig({
                text: 'Salary',
                sortData: {
                    property: 'salary',
                    direction: 'ASC'
                }
            })],
            plugins: [reorderer, droppable]
        };

        this.callParent();
    },

    /**
     * Callback handler used when a sorter button is clicked or reordered
     * @param {Ext.Button} button The button that was clicked
     * @param {Boolean} changeDirection True to change direction (default). Set to false for reorder
     * operations as we wish to preserve ordering there
     */
    changeSortDirection: function (button, changeDirection) {
        var sortData = button.sortData,
            iconCls  = button.iconCls;
        
        if (sortData) {
            if (changeDirection !== false) {
                button.sortData.direction = Ext.String.toggle(button.sortData.direction, "ASC", "DESC");
                button.setIconCls(Ext.String.toggle(iconCls, "sort-direction-asc", "sort-direction-desc"));
            }
            this.store.clearFilter();
            this.doSort();
        }
    },

    doSort: function () {
        this.store.sort(this.getSorters());
    },

    /**
     * Returns an array of sortData from the sorter buttons
     * @return {Array} Ordered sort data from each of the sorter buttons
     */
    getSorters: function () {
        var sorters = [];
        var tbar = this.down('#tbar');
 
        Ext.each(tbar.query('button'), function(button) {
            sorters.push(button.sortData);
        }, this);

        return sorters;
    },

    /**
     * Convenience function for creating Toolbar Buttons that are tied to sorters
     * @param {Object} config Optional config object
     * @return {Object} The new Button configuration
     */
    createSorterButtonConfig: function (config) {
        var me = this;
        config = config || {};
        Ext.applyIf(config, {
            listeners: {
                click: function(button, e) {
                    me.changeSortDirection(button, true);
                }
            },
            iconCls: 'sort-direction-' + config.sortData.direction.toLowerCase(),
            reorderable: true,
            xtype: 'button'
        });
        return config;
    },

    /**
     * Returns an array of fake data
     * @param {Number} count The number of fake rows to create data for
     * @return {Array} The fake record data, suitable for usage with an ArrayReader
     */
    createFakeData: function (count) {
        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Don', 'Evan', 'Phil', 'Nicolas', 'Nige'],
            lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Griffin', 'Trimboli', 'Guerrant', 'Ferrero', 'White'],
            ratings      = [1, 2, 3, 4, 5],
            salaries     = [100, 400, 900, 1500, 1000000];

        var data = [];
        for (var i = 0; i < (count || 25); i++) {
            var ratingId    = Math.floor(Math.random() * ratings.length),
                salaryId    = Math.floor(Math.random() * salaries.length),
                firstNameId = Math.floor(Math.random() * firstNames.length),
                lastNameId  = Math.floor(Math.random() * lastNames.length),

                rating      = ratings[ratingId],
                salary      = salaries[salaryId],
                name        = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);

            data.push([rating, salary, name]);
        }
        return data;
    }
});
