Ext.define('KitchenSink.view.pivot.PivotCellModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pivot-cell-model',

    formulas: {
        cellStyle: function (get) {
            var isGrandTotal = get('record.isRowGrandTotal') || get('column.isColGrandTotal'),
                isHeader = get('record.isRowGroupHeader') || get('column.isColGroupTotal'),
                isFooter = get('record.isRowGroupTotal'),
                value = get('value'),
                cls = get('column.topAxisColumn') ? (value >= 500 ? 'pivotCellAbove500' : 'pivotCellUnder500') : '';

            if(isGrandTotal){
                cls = 'pivotCellGrandTotal';
            }else if(isFooter){
                cls = 'pivotCellGroupFooter';
            }else if(isHeader){
                cls = 'pivotCellGroupHeader';
            }

            return cls;
        }
    }
});
