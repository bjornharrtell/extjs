describe('Ext.data.BufferedStore', function() {
    var bufferedStore;

    function getData(start, limit) {
        var end = start + limit,
            recs = [],
            i;

        for (i = start; i < end; ++i) {
            recs.push({
                id: i,
                title: 'Title' + i
            });
        }
        return recs;
    }

    function satisfyRequests(total) {
        var requests = Ext.Ajax.mockGetAllRequests(),
            request, params, data;

        while (requests.length) {
            request = requests[0];

            params = request.options.params;
            data = getData(params.start, params.limit);

            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode({
                    total: total || 5000,
                    data: data
                })
            });

            requests = Ext.Ajax.mockGetAllRequests()
        }
    }

    function createStore(cfg) {
        bufferedStore = new Ext.data.BufferedStore(Ext.apply({
            model: 'spec.ForumThread',
            pageSize: 100,
            proxy: {
                type: 'ajax',
                url: 'fakeUrl',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }, cfg));
    }

    beforeEach(function() {
        Ext.define('spec.ForumThread', {
            extend: 'Ext.data.Model',
            fields: [
                'title', 'forumtitle', 'forumid', 'username', {
                    name: 'replycount',
                    type: 'int'
                }, {
                    name: 'lastpost',
                    mapping: 'lastpost',
                    type: 'date',
                    dateFormat: 'timestamp'
                },
                'lastposter', 'excerpt', 'threadid'
            ],
            idProperty: 'threadid'
        });

        MockAjaxManager.addMethods();
    });
    
    afterEach(function(){
        MockAjaxManager.removeMethods();
        bufferedStore.destroy();
        bufferedStore = null;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.ForumThread');
    });
    
    it('should be able to start from any page', function() {
        createStore();
        bufferedStore.loadPage(10);

        satisfyRequests();

        expect(bufferedStore.currentPage).toBe(10);
        var page10 = bufferedStore.getRange(900, 999);
        expect(page10.length).toBe(100);

        // Page 10 contains records 900 to 999.
        expect(page10[0].get('title')).toBe('Title900');
        expect(page10[99].get('title')).toBe('Title999');
    });

    it('should be able to find records in a buffered store', function() {
        createStore();
        bufferedStore.load();

        satisfyRequests();

        expect(bufferedStore.findBy(function(rec) {
            return rec.get('title') === 'Title10';
        })).toBe(10);

        expect(bufferedStore.findExact('title', 'Title10')).toBe(10);

        expect(bufferedStore.find('title', 'title10')).toBe(10);
    });

    it("should clear the data when calling sort with parameters when remote sorting", function() {
        createStore();
        bufferedStore.load();

        satisfyRequests();

        bufferedStore.sort();
        expect(bufferedStore.data.getCount()).toBe(0);
        satisfyRequests();
        expect(bufferedStore.data.getCount()).toBe(300);
    });

    it('should load the store when filtered', function() {
        var spy = jasmine.createSpy();

        createStore({
            listeners: {
                load: spy
            }
        });

        // Filter mutation shuold trigger a load
        bufferedStore.filter('title', 'panel');
        satisfyRequests();
        expect(spy).toHaveBeenCalled();
   });

    it('should load the store when sorted', function() {
         var spy = jasmine.createSpy();

        createStore({
            listeners: {
                load: spy
            }
        });

        // Sorter mutation shuold trigger a load
        bufferedStore.sort('title', 'ASC');
        satisfyRequests();
        expect(spy).toHaveBeenCalled();
   });

    it("should update the sorters when sorting by an existing key", function() {
        createStore({
            sorters: [{
                property: 'title'
            }]
        });

        bufferedStore.sort('title', 'DESC');
        var sorter = bufferedStore.getSorters().getAt(0);
        expect(sorter.getProperty()).toBe('title');
        expect(sorter.getDirection()).toBe('DESC');
    });

    // Test for https://sencha.jira.com/browse/EXTJSIV-10338
    // purgePageCount ensured that the viewSize could never be satisfied
    // by small pages because they would keep being pruned.
    it('should load the requested range when the pageSize is small', function() {
        var spy = jasmine.createSpy();
        createStore({
            pageSize: 5,
            listeners: {
                load: spy
            }
        });

        bufferedStore.load();

        satisfyRequests();
        expect(spy).toHaveBeenCalled();
    });

    describe('load', function () {
        it("should pass the records loaded, the operation & success to the callback", function() {
            var spy = jasmine.createSpy(),
                args;

            createStore();

            bufferedStore.load({
                // Called after first prefetch and first page has been added.
                callback: spy
            });
            satisfyRequests();

            args = spy.mostRecentCall.args;
            expect(Ext.isArray(args[0])).toBe(true);
            expect(args[0][0].isModel).toBe(true);

            expect(args[1].getAction()).toBe('read');
            expect(args[1].$className).toBe('Ext.data.operation.Read');

            expect(args[2]).toBe(true);

        });

        describe('should assign dataset index numbers to the records in the Store dependent upon configured pageSize', function () {
            var endIndex;

            it('should not exceed 100 records', function () {
                createStore();

                var spy = jasmine.createSpy();
                bufferedStore.load({
                    // Called after first prefetch and first page has been added.
                    callback: spy
                });

                satisfyRequests();

                expect(spy).toHaveBeenCalled();
                expect(bufferedStore.getAt(0).index).toBe(0);
                expect(bufferedStore.getAt(99).index).toBe(99);
                expect(spy.mostRecentCall.args[0].length).toBe(100);
            });

            it('should not exceed 50 records', function () {
                createStore({
                    pageSize: 50
                });

                var spy = jasmine.createSpy();
                bufferedStore.load({
                    // Called after first prefetch and first page has been added.
                    callback: spy
                });

                satisfyRequests(50);
                expect(spy).toHaveBeenCalled();

                expect(bufferedStore.getAt(0).index).toBe(0);
                expect(bufferedStore.getAt(49).index).toBe(49);
                expect(spy.mostRecentCall.args[0].length).toBe(50);
            });
        });
    });

    describe('reload', function () {
        it('should not increase the number of pages when reloading', function () {
            createStore();
            bufferedStore.load();

            satisfyRequests();

            bufferedStore.reload();
            satisfyRequests();

            var count = bufferedStore.getData().getCount();

            bufferedStore.reload();
            satisfyRequests();

            expect(bufferedStore.getData().getCount()).toBe(count);
        });
    });
});