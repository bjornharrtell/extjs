Ext.define('KitchenSink.view.pivot.PivotController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pivot',

    yearLabelRenderer: function(value){
        return 'Year ' + value;
    },

    monthLabelRenderer: function(value){
        return Ext.Date.monthNames[value];
    },

    expandAll: function(){
        this.getView().expandAll();
    },

    collapseAll: function(){
        this.getView().collapseAll();
    },

    onPivotBeforeUpdate: function(){
        Ext.log('Event "pivotbeforeupdate" fired');
    },

    onPivotUpdate: function(){
        Ext.log('Event "pivotupdate" fired');
    },

    onPivotGroupExpand: function(matrix, type, group){
        Ext.log( (group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group){
        Ext.log( (group ? 'Group "' + group.name + '" collapsed on ' : 'All groups expanded on ') + type);
    }
});
