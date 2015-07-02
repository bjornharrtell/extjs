Ext.define('KitchenSink.model.Demo', {
    extend: 'KitchenSink.model.Base',
    
    fields: [
        {name: 'id',          type: 'string'},
        {name: 'text',        type: 'string'},
        {name: 'source',      type: 'string'},
        {name: 'animation',   type: 'auto'},
        {name: 'limit',       type: 'auto'},
        {name: 'preventHide', type: 'boolean'},
        {name: 'view',        type: 'string'}
    ]
});
