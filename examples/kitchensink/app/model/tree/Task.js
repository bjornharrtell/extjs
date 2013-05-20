Ext.define('KitchenSink.model.tree.Task', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'task',
        type: 'string'
    }, {
        name: 'user',
        type: 'string'
    }, {
        name: 'duration',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
}); 