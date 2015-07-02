/**
 * This class displays a numeric value in a {@link Ext.grid.Grid grid} cell. This cell type
 * is typically used by specifying {@link Ext.grid.column.Number} column type.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */
Ext.define('Ext.grid.cell.Number', {
    extend: 'Ext.grid.cell.Text',
    xtype: 'numbercell',

    requires: ['Ext.util.Format'],

    config: {
        /**
         * @cfg {String} format
         * A format string as used by {@link Ext.util.Format#number} to format values for
         * this column.
         */
        format: '0,000.00'
    },

    updateColumn: function (column, oldColumn) {
        this.callParent([column, oldColumn]);
        if (column) {
            var format = column.getFormat();
            if (format !== null) {
                this.setFormat(format);
            }
        }
    },

    updateFormat: function (format) {
        if (!this.isConfiguring) {
            this.writeValue();
        }
    },

    writeValue: function () {
        var value = this.getValue(),
            hasValue = value || value === 0;

        this.setRawValue(hasValue ? Ext.util.Format.number(value, this.getFormat()) : null);
    }
});
