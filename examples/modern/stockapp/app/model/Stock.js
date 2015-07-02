Ext.define("StockApp.model.Stock", {
    extend: 'Ext.data.Model',
    fields: [
        'date',
        "open",
        "high",
        "low",
        "close",
        "volume",
        "adjClose"
    ]
});
