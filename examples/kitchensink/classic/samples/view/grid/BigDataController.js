/**
 * The Controller for the BigData view.
 *
 * Provides logic which is referenced by listeners, handlers and renderers in the view which are configured
 * as strings. They are resolved to members of this class.
 * 
 */
Ext.define('KitchenSink.view.grid.BigDataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bigdata',

    // Used as a column renderer by BigData: resolved using defaultListenerScope
    concatNames: function(v, cellValues, rec) {
        return rec.get('forename') + ' ' + rec.get('surname');
    },

    // Used as an editRenderer by BigData to display an uneditable field in the RowEditor
    bold: function(v) {
        return "<b>" + v + "</b>";
    },

    onNameFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('nameFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'nameFilter',
                property      : 'name',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },

    exportToExcel: function(){
        this.getView().saveDocumentAs({
            title:      'Grid export demo',
            fileName:   'excelExport.xml'
        });
    },

    init: function() {
        // RowEditing not appropriate for touch devices
        if (!Ext.supports.Touch) {
            // Plugins are instantiated at this time, we must add an instantiated Plugin, not a config
            this.getView().getPlugins().push(Ext.create({
                xclass: 'Ext.grid.plugin.RowEditing',
                clicksToMoveEditor: 1,
                autoCancel: false
            }));
        }
    },

    // This method is called as a listener to the grid's headermenucreated event.
    // This is a useful way to inject extra options into the grid's header menu.
    onHeaderMenuCreate: function(grid, menu) {
        menu.insert(menu.items.indexOfKey('columnItem') + 1, {
            text: 'Header Borders',
            xtype: 'menucheckitem',
            checked: grid.headerBorders,
            checkHandler: this.onShowHeadersToggle,
            scope: this
        });
    },

    onShowHeadersToggle: function(checkItem, checked) {
        this.getView().setHeaderBorders(checked);
    }
});
