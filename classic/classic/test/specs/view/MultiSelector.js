describe("Ext.view.MultiSelector", function(){
    var Employee,
        panel,
        multiSelector;

    var firstNames = ['Ben', 'Don', 'Evan', 'Kevin', 'Nige', 'Phil', 'Ross', 'Ryan'],
        lastNames = ['Toll', 'Griffin', 'Trimboli', 'Krohe', 'White', 'Guerrant', 'Gerbasi', 'Smith'],
        data = [],
        rand = 37,
        map, i, j, k, s,
        sequence = 0;

    for (i = 0; i < lastNames.length; ++i) {
        map = {};
        data.push({
            id: ++sequence,
            forename: (s = firstNames[i]),
            surname: lastNames[i]
        });
        map[s] = 1;

        for (j = 0; j < 3; ++j) {
            do {
                k = rand % firstNames.length;
                rand = rand * 1664525 + 1013904223; // basic LCG but repeatable
                rand &= 0x7FFFFFFF;
            } while (map[s = firstNames[k]]);

            map[s] = 1;
            data.push({
                id: ++sequence,
                forename: s,
                surname: lastNames[i]
            });
        }
    }

    beforeEach(function() {
        MockAjaxManager.addMethods();
        Employee = Ext.define('spec.Employee', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id'
            }, {
                name: 'forename'
            }, {
                name: 'surname'
            }, {
                name: 'name',
                convert: function(v, rec) {
                    return rec.editing ? v : rec.get('forename') + ' ' + rec.get('surname');
                }
            }]
        });
    });

    afterEach(function() {
        MockAjaxManager.removeMethods();
        Ext.undefine('spec.Employee');
        Ext.data.Model.schema.clear();
        panel.destroy();
    });

    it('should select the records in the searcher which match by ID the records in the selector', function() {
        var searchStore;
        
        panel = new Ext.panel.Panel({
            renderTo: document.body,
            width: 400,
            height: 300,
            layout: 'fit',
            store: {
                model: 'spec.Employee',
                proxy: {
                    type: 'ajax',
                    url: 'foo'
                }
            },

            items: [{
                xtype: 'multiselector',
                title: 'Selected Employees',

                fieldName: 'name',

                viewConfig: {
                   deferEmptyText: false,
                   emptyText: 'No employees selected'
                },

                search: {
                    field: 'name',
                    store: {
                        model: 'spec.Employee',
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'bar'
                        }
                    }
                }
            }]
        }),
        multiSelector = panel.child('multiselector');

        // Load the multiSelector's store
        multiSelector.store.load();
        Ext.Ajax.mockComplete({
            status: 200,
            responseText: Ext.JSON.encode(data[0])
        });

        multiSelector.onShowSearch();

        // Wait for search grid's store to kick off a load
        waitsFor(function() {
            searchStore = multiSelector.searchPopup.child('gridpanel').store;

            return (searchStore instanceof Ext.data.Store) && searchStore.isLoading();
        }, 'searchStore to kick off a load');
        
        runs(function() {
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.JSON.encode(data)
            });
        });
        
        waitsFor(function() {
            return searchStore.getCount();
        }, 'searchStore to complete load');

        // Employee 0 must be selected in the search grid
        runs(function() {
            expect(multiSelector.down('gridpanel').selModel.getSelection()[0].get('name')).toBe(multiSelector.store.getAt(0).get('name'));
        });
    });

});