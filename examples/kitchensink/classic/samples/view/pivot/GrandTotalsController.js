/**
 * Controls the grand totals example.
 */
Ext.define('KitchenSink.view.pivot.GrandTotalsController', {
    extend: 'KitchenSink.view.pivot.PivotController',

    alias: 'controller.pivotgrandtotals',

    /**
     * `pivotbuildtotals` event handler
     *
     * @param matrix
     * @param totals
     */
    onCreatePivotTotals: function(matrix, totals){
        // `totals` is an array of objects
        // Each object has a `title` and a `values` object.
        // Each key of the `values` object should map to the generated pivot store model

        var fnUS = this.getFnByCountry('United States'),
            fnUK = this.getFnByCountry('United Kingdom'),
            dataUS = {},
            dataUK = {},
            model = matrix.getColumns(),
            length = model.length,
            i, result, agg, field;

        for(i = 0; i < length; i++){
            field = model[i];

            // we populate values only on the model fields that have columns attached
            if(field.col && field.agg){
                agg = matrix.aggregate.getByKey(field.agg);
                result = matrix.results.get(matrix.grandTotalKey, field.col);
                if(result && agg){
                    dataUS[field.name] = result.calculateByFn('totalUS', agg.dataIndex, fnUS);
                    dataUK[field.name] = result.calculateByFn('totalUK', agg.dataIndex, fnUK);
                }
            }
        }

        totals.push({
            title:  'Grand total (US)',
            values: dataUS
        },{
            title:  'Grand total (UK)',
            values: dataUK
        });

        // It is possible to remove the default grand total calculated
        // Just uncomment the next line to remove the first element in `totals`
        //Ext.Array.removeAt(totals, 0, 1);

    },

    /**
     * Returns an aggregate function that calculates the sum for the specified country
     *
     * @param country
     * @returns {Function}
     */
    getFnByCountry: function(country){
        return function(records, measure, matrix, rowGroupKey, colGroupKey){
            var length = records.length,
                total  = 0,
                i;

            for (i = 0; i < length; i++) {
                if(records[i].get('country') == country) {
                    total += Ext.Number.from(records[i].get(measure), 0);
                }
            }

            return total;
        }
    }
});