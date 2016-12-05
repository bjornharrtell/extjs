Ext.define('KitchenSink.view.dataview.MultiSortController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dataview-multisort',

    ready: false,

    beforeRender: function () {
        this.ready = true; // skips updateSorters from button initialization
        
        this.updateStoreSorters();
    },

    /**
     * Returns the array of Ext.util.Sorters defined by the current toolbar button order
     * @return {Array} The sorters
     */
    getSorters: function() {
        var view = this.getView(),
            buttons = view.query('dataview-multisort-sortbutton'),
            sorters = [];

        Ext.each(buttons, function (button) {
            sorters.push({
                property : button.getDataIndex(),
                direction: button.getDirection()
            });
        });

        return sorters;
    },

    /**
     * @private
     * Updates the DataView's Store's sorters based on the current Toolbar button configuration
     */
    updateStoreSorters: function() {
        if (this.ready) {
            var sorters = this.getSorters(),
                view = this.lookup('dataview');

            view.store.sort(sorters);
        }
    }
});
