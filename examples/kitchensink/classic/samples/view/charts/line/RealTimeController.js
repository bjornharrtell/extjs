Ext.define('KitchenSink.view.charts.line.RealTimeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.line-real-time',

    onTimeChartRendered: function (chart) {
        chart.getStore().removeAll();
        this.addNewTimeData();
        this.timeChartTask = Ext.TaskManager.start({
            run: this.addNewTimeData,
            interval: 1000,
            repeat: 120,
            scope: this
        });
    },

    onAxisLabelRender: function (axis, label, layoutContext) { // only render interger values
        return Math.abs(layoutContext.renderer(label) % 1) < 1e-5 ? Math.round(label) : '';
    },

    onTimeChartDestroy: function () {
        if (this.timeChartTask) {
            Ext.TaskManager.stop(this.timeChartTask);
        }
    },

    onNumberChartRendered: function (chart) {
        chart.getStore().removeAll();
        this.addNewNumberData();
        this.numberChartTask = Ext.TaskManager.start({
            run: this.addNewNumberData,
            interval: 500,
            repeat: 240,
            scope: this
        });
    },

    onNumberChartDestroy: function () {
        if (this.numberChartTask) {
            Ext.TaskManager.stop(this.numberChartTask);
        }
    },

    getNextValue: function (previousValue, min, max, delta) {
        delta = delta || 3;
        min = min || 0;
        max = max || 20;

        delta = Ext.Number.randomInt(-delta, delta);

        if (Ext.isNumber(previousValue)) {
            return Ext.Number.constrain(previousValue + delta, min, max);
        }
        return Ext.Number.randomInt(min, max);
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
            minY = 0,
            maxY = 100,
            deltaY = 5,
            xValue, lastRecord;

        if (count > 0) {
            lastRecord = store.getAt(count - 1);
            xValue = lastRecord.get('xValue') + 1;
            if (xValue > visibleRange) {
                xAxis.setMinimum(xValue - visibleRange);
                xAxis.setMaximum(xValue);
            }
            store.add({
                xValue: xValue,
                yValue: this.getNextValue(lastRecord.get('yValue'), minY, maxY, deltaY)
            });

        } else {
            chart.animationSuspended = true;
            xAxis.setMinimum(0);
            xAxis.setMaximum(visibleRange);

            store.add({
                xValue: 0,
                yValue: this.getNextValue((minY + maxY) / 2, minY, maxY)
            });
            chart.animationSuspended = false;
        }
    }

})