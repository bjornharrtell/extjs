/**
 * Controls the layout view examples.
 */
Ext.define('KitchenSink.view.pivot.LayoutController', {
    extend: 'KitchenSink.view.pivot.PivotController',

    alias: 'controller.pivotlayout',

    subtotalsHandler: function(button, checked){
        if(!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowSubTotalsPosition: button.text.toLowerCase(),
            colSubTotalsPosition: button.text.toLowerCase()
        });
    },

    totalsHandler: function(button, checked){
        if(!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowGrandTotalsPosition: button.text.toLowerCase(),
            colGrandTotalsPosition: button.text.toLowerCase()
        });
    },

    onPivotGroupExpand: function(matrix, type, group){
        Ext.log( (group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group){
        Ext.log( (group ? 'Group "' + group.name + '" collapsed on ' : 'All groups expanded on ') + type);
    }

});
