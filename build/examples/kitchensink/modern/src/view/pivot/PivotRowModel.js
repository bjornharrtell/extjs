Ext.define('KitchenSink.view.pivot.PivotRowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pivot-row-model',

    formulas: {
        rowStyle: function(get){
            var isGrandTotal = get('record.isRowGrandTotal'),
                isHeader = get('record.isRowGroupHeader'),
                isFooter = get('record.isRowGroupTotal'),
                cls = '';

            if(isGrandTotal){
                cls = 'pivotRowGrandTotal';
            }else if(isHeader){
                cls = 'pivotRowHeader';
            }else if(isFooter){
                cls = 'pivotRowTotal';
            }
            return cls;
        }
    }
});
