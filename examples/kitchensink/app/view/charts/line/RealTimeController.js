Ext.define('KitchenSink.view.charts.line.RealTimeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-real-time',

    onTimeChartRendered: function (chart) {
        chart.getStore().removeAll();
        this.timeChartTask = Ext.TaskManager.start({
            run: this.addNewTimeData,
            interval: 1000,
            repeat: 120,
            scope: this
        });
    },

    onTimeChartDestroy: function () {
        if (this.timeChartTask) {
            Ext.TaskManager.stop(this.timeChartTask);
        }
    },

    onNumberChartRendered: function (chart) {
        chart.getStore().removeAll();
        this.numberChartTask = Ext.TaskManager.start({
            run: this.addNewNumberData,
            interval: 1000,
            repeat: 120,
            scope: this
        });
    },

    onNumberChartDestroy: function () {
        if (this.numberChartTask) {
            Ext.TaskManager.stop(this.numberChartTask);
        }
    },

    getNextValue: function (previousValue) {
        var delta = Ext.Number.randomInt(-3, 3);
        if (Ext.isNumber(previousValue)) {
            return Ext.Number.constrain(previousValue + delta, 0, 20);
        }
        return Ext.Number.randomInt(0, 20);
    },

    addNewTimeData: function() {
        var me = this,
            chart = me.lookupReference('time-chart'),
            store = chart.getStore(),
            count = store.getCount(),
            xAxis = chart.getAxes()[1],
            visibleRange = 10000,
            second = 1000,
            xValue, lastRecord;

        if (count > 0) {
            lastRecord = store.getAt(count - 1);
            xValue = lastRecord.get('xValue') + second;
            if (xValue - me.startTime > visibleRange) {
                me.startTime = xValue - visibleRange;
                xAxis.setMinimum(this.startTime);
                xAxis.setMaximum(xValue);
            }
            store.add({
                xValue: xValue,
                metric1: me.getNextValue(lastRecord.get('metric1')),
                metric2: me.getNextValue(lastRecord.get('metric2'))
            });

        } else {
            chart.animationSuspended = true;
            me.startTime = Math.floor(Ext.Date.now() / second) * second;
            xAxis.setMinimum(me.startTime);
            xAxis.setMaximum(me.startTime + visibleRange);

            store.add({
                xValue: this.startTime,
                metric1: me.getNextValue(),
                metric2: me.getNextValue()
            });
            chart.animationSuspended = false;
        }
    },

    addNewNumberData: function() {
        var chart = this.lookupReference('number-chart'),
            store = chart.getStore(),
            count = store.getCount(),
            xAxis = chart.getAxes()[1],
            visibleRange = 20,
            xValue;

        if (count > 0) {
            xValue = store.getAt(count - 1).get('xValue') + 1;
            if (xValue > visibleRange) {
                xAxis.setMinimum(xValue - visibleRange);
                xAxis.setMaximum(xValue);
            }
            store.add({
                xValue: xValue,
                yValue: this.getNextValue()
            });

        } else {
            chart.animationSuspended = true;
            xAxis.setMinimum(0);
            xAxis.setMaximum(visibleRange);

            store.add({
                xValue: 0,
                yValue: this.getNextValue()
            });
            chart.animationSuspended = false;
        }
    }

})