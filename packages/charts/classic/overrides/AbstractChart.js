/**
 * @class Ext.chart.overrides.AbstractChart
 */
Ext.define('Ext.chart.overrides.AbstractChart', {
    override: 'Ext.chart.AbstractChart',

    updateLegend: function (legend, oldLegend) {
        var dock;
        this.callParent([legend, oldLegend]);
        if (legend) {
            dock = legend.docked;
            this.addDocked({
                dock: dock,
                xtype: 'panel',
                shrinkWrap: true,
                scrollable: true,
                layout: {
                    type: dock === 'top' || dock === 'bottom' ? 'hbox' : 'vbox',
                    pack: 'center'
                },
                items: legend,
                cls: Ext.baseCSSPrefix + 'legend-panel'
            });
        }
    },

    performLayout: function() {
        if (this.isVisible(true)) {
            return this.callParent();
        }
        this.cancelChartLayout();
        return false;
    },

    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        this.callParent([width, height, oldWidth, oldHeight]);
        this.scheduleLayout();
    },

    allowSchedule: function() {
        return this.rendered;
    },

    onDestroy: function () {
        this.destroyChart();
        this.callParent(arguments);
    }

});