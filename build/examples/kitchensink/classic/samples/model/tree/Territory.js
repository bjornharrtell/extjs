Ext.define('KitchenSink.model.tree.Territory', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'Territory',
    idProperty: 'name',
    glyph: 'xf0ac@FontAwesome',
    fields: [{
        name: "name",
        convert: undefined
    }]
});