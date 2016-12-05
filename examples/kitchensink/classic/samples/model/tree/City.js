Ext.define('KitchenSink.model.tree.City', {
    extend: 'KitchenSink.model.tree.Base',
    entityName: 'City',
    idProperty: 'name',
    glyph: 'xf19c@FontAwesome',
    fields: [{
        name: "name",
        convert: undefined
    }]
});