/**
 * This is the default cell class for {@link Ext.grid.Grid grid} cells. Use this class if
 * you use the {@link Ext.grid.column.Column#renderer} or {@link Ext.grid.column.Column#tpl}
 * configs for a column.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */
Ext.define('Ext.grid.cell.Cell', {
    extend: 'Ext.grid.cell.Text',
    xtype: 'gridcell',

    updateRecord: function (record, oldRecord) {
        var me = this,
            column = me.getColumn(),
            dataIndex, tpl, renderer, raw, scope, setRaw, value;

        if (record && column) {
            tpl = column.getTpl();
            renderer = column.getRenderer();

            if (tpl) {
                raw = tpl.apply(record.getData(true));
                setRaw = true;
            } else if (renderer) {
                dataIndex = me.dataIndex;
                value = dataIndex ? record.get(dataIndex) : undefined;
                scope = column.getScope();

                if (typeof renderer === 'function') {
                    raw = renderer.call(scope || column, value, record, dataIndex, me, column);
                } else {
                    raw = Ext.callback(renderer, scope,
                            [value, record, dataIndex, me, column], 0, me);
                }
                setRaw = true;
            }

            if (setRaw) {
                me.setRawValue(raw);
                return;
            }
        }

        me.callParent([record, oldRecord]);
    }
});
