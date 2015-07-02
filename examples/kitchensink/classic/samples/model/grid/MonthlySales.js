Ext.define('KitchenSink.model.grid.MonthlySales', {
    extend: 'KitchenSink.model.Base',

    fields: [
        { name: 'year', type: 'int' },

        { name: 'jan', type: 'int', allowNull: true },
        { name: 'feb', type: 'int', allowNull: true },
        { name: 'mar', type: 'int', allowNull: true },
        { name: 'apr', type: 'int', allowNull: true },
        { name: 'may', type: 'int', allowNull: true },
        { name: 'jun', type: 'int', allowNull: true },
        { name: 'jul', type: 'int', allowNull: true },
        { name: 'aug', type: 'int', allowNull: true },
        { name: 'sep', type: 'int', allowNull: true },
        { name: 'oct', type: 'int', allowNull: true },
        { name: 'nov', type: 'int', allowNull: true },
        { name: 'dec', type: 'int', allowNull: true }
    ]
});
