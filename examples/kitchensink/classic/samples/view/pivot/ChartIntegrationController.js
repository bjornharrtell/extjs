/**
 * Controls the chart integration example.
 */
Ext.define('KitchenSink.view.pivot.ChartIntegrationController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chartintegration',

    onPivotDone: function(){
        var me = this,
            view = me.getView(),
            pivot = view.down('pivotgrid'),
            chart = view.down('chart');

        if(chart){
            view.remove(chart);
        }

        view.add({
            xtype: 'cartesian',
            region: 'south',
            flex: 1,
            legend: {
                docked: 'bottom'
            },
            store: pivot.getPivotStore(),
            axes: [{
                type: 'numeric',
                position: 'left',
                adjustByMajorUnit: true,
                fields: ['id'],
                renderer: function(v) {
                    return (v * 100).toFixed(0) + '%';
                },
                grid: true
            },{
                type: 'category',
                position: 'bottom',
                grid: true,
                fields: ['id'],
                renderer: Ext.bind(me.chartRenderer, pivot)
            }],
            series: [{
                type: 'bar',
                axis: 'left',
                title: me.getTitles(pivot),
                yField: me.getFields(pivot),
                xField: 'id',
                stacked: true
            }]
        });
    },

    chartRenderer: function(v){
        var matrix = this.getMatrix(),
            item = matrix.leftAxis.findTreeElement("key", v);

        return item ? item.node.name : (v == matrix.grandTotalKey ? matrix.textGrandTotalTpl : v);
    },

    getTitles: function(pivot){
        var data = [],
            cols = pivot.getColumns(),
            len = cols.length,
            i;

        for(i = 0; i < len; i++){
            if(cols[i].topAxis){
                data.push(Ext.util.Format.stripTags(cols[i].text));
            }
        }
        return data;
    },

    getFields: function(pivot){
        var data = [],
            cols = pivot.getColumns(),
            len = cols.length,
            i;

        for(i = 0; i < len; i++){
            if(cols[i].topAxis && !cols[i].grandTotal){
                data.push(cols[i].dataIndex);
            }
        }
        return data;
    }
});
