Ext.define('TouchTomatoes.model.Movie', {
    extend: 'Ext.data.Model',

    fields: [
        {name: "id", type: "string"},
        {name: "title", type: "string"},
        {name: "synopsis", type: "string"},
        {name: "year", type: "int"},
        {name: "mpaa_rating", type: "string"},
        {name: "runtime", type: "int"},
        {name: "posters"},
        {name: "abridged_cast"},
        {name: "ratings"}
    ]
});