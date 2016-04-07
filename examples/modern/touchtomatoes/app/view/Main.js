Ext.define('TouchTomatoes.view.Main', {
    extend: 'Ext.Panel',
    xtype: "main",

    requires: [
        'TouchTomatoes.view.MovieSearch',
        'TouchTomatoes.view.MoviesListView'
    ],

    config: {
        fullscreen: true,
        layout:"card",
        ui: 'light',
        items: [
            {
                title: 'Opening Movies',
                menu: "opening",
                xtype: 'movieslistview',
                autoLoad: true,
                proxy: {
                    service: "lists/movies/opening.json"
                }
            },
            {
                title: 'In Theatres Now',
                menu: "theatres",
                xtype: 'movieslistview',
                enablePaging: true,
                proxy: {
                    service: "lists/movies/in_theaters.json"
                }
            },
            {
                title: 'Upcoming Movies',
                menu: "upcoming",
                xtype: 'movieslistview',
                proxy: {
                    service: "lists/movies/upcoming.json"
                }
            },
            {
                title: 'Top Box Office',
                menu: "top",
                xtype: 'movieslistview',
                proxy: {
                    service: "lists/movies/box_office.json"
                }
            },
            {
                menu: "search",
                xtype: 'moviesearch'
            }
        ]
    }
});