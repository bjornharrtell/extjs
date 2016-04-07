Ext.define('TouchTomatoes.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ["TouchTomatoes.view.MovieDetails", "Ext.util.InputBlocker"],

    config: {
        refs: {
            main: 'main',
            moviesList: 'moviesearch > list',
            searchField: 'moviesearch > toolbar > formpanel > searchfield'
        },

        control: {
            searchField: {
                action: 'onSearch'
            },

            'movieslistview > toolbar > button': {
                tap: function() {
                    Ext.Viewport.toggleMenu("left");
                }
            },

            'menu > button': {
                tap: function(btn) {
                    var newActiveItem = Ext.ComponentQuery.query("movieslistview[menu="+btn.getMenu()+"]"),
                        main = this.getMain();

                    newActiveItem = newActiveItem.length > 0 ? newActiveItem[0] : null;
                    if(newActiveItem) {
                        main.setActiveItem(newActiveItem);
                        Ext.Viewport.hideAllMenus();

                        Ext.Viewport.getTranslatable().on('animationend', function() {
                            var list = newActiveItem.down("list"),
                                store;
                            if(list) {
                                store = list.getStore();
                                if(!store.isLoaded()) {
                                    store.load();
                                }
                            }
                        }, this, {single:true});
                    }
                }
            },
            'moviedetails': {
                swipe: function(moviedetails, e) {
                    var target = Ext.fly(e.target);
                    if (target.findParent('.x-scroll-container', 10, true)) return;
                    if (e.direction === "up") {
                        moviedetails.hide();
                    }
                }
            },
            'moviedetails > button[action="close"]': {
                tap: function(button) {
                    var details = button.up("moviedetails");
                    details.hide();
                    Ext.util.InputBlocker.unblockInputs();
                }
            },
            'movieslistview > list': {
                itemtap: function(list, index, item, record, event) {
                    this._movieDetails = this.getMovieDetails();
                    this._movieDetails.setRecord(record);
                    Ext.Viewport.add(this._movieDetails);
                    Ext.util.InputBlocker.blockInputs();

                    this._movieDetails.on({
                        show: {
                            fn: function() {
                                list.deselectAll(true);
                            },
                            scope: this,
                            single: true
                        }
                    });

                    this._movieDetails.show();
                }
            }
        }
    },

    onSearch: function() {
        var searchField = this.getSearchField();
        this.fireAction('search', [searchField.getValue()], 'doSearch');
    },

    doSearch: function(search) {
        search = search.replace(/^\s+|\s+$/g, '');
        if (search.length <= 0) return;
        var moviesList = this.getMoviesList(),
            moviesStore = moviesList.getStore();
        moviesStore.currentPage = 1;
        moviesStore.filter('query', search);

        moviesList.setScrollToTopOnRefresh(true);
        moviesStore.load();
    },

    getMovieDetails: function() {
        if (!this._movieDetails) {
            this._movieDetails = Ext.create("TouchTomatoes.view.MovieDetails");
        }
        return this._movieDetails;
    }
});
