/**
 * @private
 */
Ext.define('Ext.selection.DataViewModel', {
    extend: 'Ext.selection.Model',

    requires: ['Ext.util.KeyNav'],

    deselectOnContainerClick: true,

    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the DataView.
     */
    enableKeyNav: true,

    /**
     * @event beforedeselect
     * Fired before a record is deselected. If any listener returns false, the
     * deselection is cancelled.
     * @param {Ext.selection.DataViewModel} this
     * @param {Ext.data.Model} record The deselected record
     */

    /**
     * @event beforeselect
     * Fired before a record is selected. If any listener returns false, the
     * selection is cancelled.
     * @param {Ext.selection.DataViewModel} this
     * @param {Ext.data.Model} record The selected record
     */

    /**
     * @event deselect
     * Fired after a record is deselected
     * @param {Ext.selection.DataViewModel} this
     * @param  {Ext.data.Model} record The deselected record
     */

    /**
     * @event select
     * Fired after a record is selected
     * @param {Ext.selection.DataViewModel} this
     * @param  {Ext.data.Model} record The selected record
     */

    bindComponent: function(view) {
        var me = this;

        me.view = view;
        me.navigationModel = view.getNavigationModel();
        view.on(me.getViewListeners());
        me.navigationModel.on({
            navigate: me.onNavigate,
            scope: me
        });
    },

    getViewListeners: function() {
        var me = this,
            view = me.view,
            eventListeners = {
                refresh: me.refresh,
                scope: me
            };

        eventListeners[view.triggerCtEvent] = me.onContainerClick;
        return eventListeners;
    },
    
    onUpdate: function(record){
        var view = this.view;
        if (view && this.isSelected(record)) {
            view.onItemSelect(record);
        }
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    // Allow the DataView to update the ui
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me = this,
            view = me.view,
            eventName = isSelected ? 'select' : 'deselect';

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record)) !== false &&
                commitFn() !== false) {

            if (view) {
                if (isSelected) {
                    view.onItemSelect(record);
                } else {
                    view.onItemDeselect(record);
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record);
            }
        }
    },
    
    destroy: function(){
        Ext.destroy(this.keyNav);
        this.callParent();
    }
});
