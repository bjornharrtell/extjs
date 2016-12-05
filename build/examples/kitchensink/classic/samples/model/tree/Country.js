Ext.define('KitchenSink.model.tree.Country', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'Country',
    idProperty: 'name',
    glyph: 'xf024@FontAwesome',
    fields: [{
        name: "name",
        convert: undefined
    }]
});