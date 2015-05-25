describe("Ext.view.NodeCache", function () {

    var grid, store;

    beforeEach(function () {
        store = Ext.create('Ext.data.Store', {
            fields      : ['name'],
            autoDestroy : true,

            data : {
                'items' : [
                    { 'name' : 'Lisa' },
                    { 'name' : 'Bart' },
                    { 'name' : 'Homer' },
                    { 'name' : 'Marge' }
                ]
            },

            proxy : {
                type   : 'memory',
                reader : {
                    type : 'json',
                    rootProperty: 'items'
                }
            }
        });

        grid = Ext.create('Ext.grid.Panel', {
            store    : store,
            height   : 100,
            width    : 100,
            renderTo : Ext.getBody(),
            columns  : [
                {
                    text      : 'Name',
                    dataIndex : 'name'
                }
            ]
        });
    });

    afterEach(function () {
        grid.destroy();
    });

    //EXTJSIV-9765
    it("Store rejectChanges() should not break NodeCache insert()", function () {
        //have to create a scoped function that because Jasmine expect() changes our scope.
        var scopedFn = function() {
            store.rejectChanges();
        };

        var count = store.getCount();

        store.removeAt(count-1);
        store.removeAt(count-2);

        expect(scopedFn).not.toThrow();

        expect(store.getAt(3).get('name')).toBe('Marge');
        expect(store.getAt(2).get('name')).toBe('Homer');
    });

});