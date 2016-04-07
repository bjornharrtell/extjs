Ext.define('KitchenSink.data.LinearGeoData', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/LinearGeoData': {
            type: 'json',
            data: [{
                mtype: 'Territory',
                name: 'North America'
            }, {
                mtype: 'Country',
                name: 'USA',
                parentId: 'North America'
            }, {
                mtype: 'City',
                name: 'Redwood City',
                leaf: true,
                parentId: 'USA'
            }, {
                mtype: 'City',
                name: 'Frederick, MD',
                leaf: true,
                parentId: 'USA'
            }, {
                mtype: 'Country',
                name: 'Canada',
                parentId: 'North America'
            }, {
                mtype: 'City',
                name: 'Vancouver',
                leaf: true,
                parentId: 'Canada'
            }, {
                mtype: 'City',
                name: 'Toronto',
                leaf: true,
                parentId: 'Canada'
            }, {
                mtype: 'Country',
                name: 'Mexico',
                parentId: 'North America'
            }, {
                mtype: 'City',
                name: 'Mexico City',
                leaf: true,
                parentId: 'Mexico'
            }, {
                mtype: 'City',
                name: 'Chihuahua',
                leaf: true,
                parentId: 'Mexico'
            }, {
                mtype: 'Territory',
                name: 'Europe, ME, Africa'
            }, {
                mtype: 'Country',
                name: 'England',
                parentId: 'Europe, ME, Africa'
            }, {
                mtype: 'City',
                name: 'Nottingham',
                leaf: true,
                parentId: 'England'
            }, {
                mtype: 'City',
                name: 'London',
                leaf: true,
                parentId: 'England'
            }, {
                mtype: 'Country',
                name: 'Netherlands',
                parentId: 'Europe, ME, Africa'
            }, {
                mtype: 'City',
                name: 'Amsterdam',
                leaf: true,
                parentId: 'Netherlands'
            }, {
                mtype: 'City',
                name: 'Haaksbergen',
                leaf: true,
                parentId: 'Netherlands'
            }, {
                mtype: 'Country',
                name: 'Italy',
                parentId: 'Europe, ME, Africa'
            }, {
                mtype: 'City',
                name: 'Ferrara',
                leaf: true,
                parentId: 'Italy'
            }, {
                mtype: 'City',
                name: 'Milan',
                leaf: true,
                parentId: 'Italy'
            }, {
                mtype: 'Country',
                name: 'Kenya',
                parentId: 'Europe, ME, Africa'
            }, {
                mtype: 'City',
                name: 'Kampala',
                leaf: true,
                parentId: 'Kenya'
            }, {
                mtype: 'Country',
                name: 'Croatia',
                parentId: 'Europe, ME, Africa'
            }, {
                mtype: 'City',
                name: 'Split',
                leaf: true,
                parentId: 'Croatia'
            }, {
                mtype: 'City',
                name: 'Dubrovnik',
                leaf: true,
                parentId: 'Croatia'
            }, {
                mtype: 'Territory',
                name: 'South America, Caribbean'
            }, {
                mtype: 'Country',
                name: 'Brazil',
                parentId: 'South America, Caribbean'
            }, {
                mtype: 'City',
                name: 'Rio de Janeiro',
                leaf: true,
                parentId: 'Brazil'
            }, {
                mtype: 'City',
                name: 'Brasilia',
                leaf: true,
                parentId: 'Brazil'
            }, {
                mtype: 'Country',
                name: 'Argentina',
                parentId: 'South America, Caribbean'
            }, {
                mtype: 'City',
                name: 'Buenos Aires',
                leaf: true,
                parentId: 'Argentina'
            }, {
                mtype: 'Country',
                name: 'Chile',
                parentId: 'South America, Caribbean'
            }, {
                mtype: 'City',
                name: 'Santiago',
                leaf: true,
                parentId: 'Chile'
            }, {
                mtype: 'Territory',
                name: 'Central and South Asia'
            }, {
                mtype: 'Country',
                name: 'Russian Federation',
                parentId: 'Central and South Asia'
            }, {
                mtype: 'City',
                name: 'Moscow',
                leaf: true,
                parentId: 'Russian Federation'
            }, {
                mtype: 'City',
                name: 'Yekaterinburg',
                leaf: true,
                parentId: 'Russian Federation'
            }, {
                mtype: 'Country',
                name: 'India',
                parentId: 'Central and South Asia'
            }, {
                mtype: 'City',
                name: 'Mumbai',
                leaf: true,
                parentId: 'India'
            }, {
                mtype: 'City',
                name: 'Bangalore',
                leaf: true,
                parentId: 'India'
            }, {
                mtype: 'Country',
                name: 'Kazakhstan',
                parentId: 'Central and South Asia'
            }, {
                mtype: 'City',
                name: 'Astana',
                leaf: true,
                parentId: 'Kazakhstan'
            }, {
                mtype: 'Country',
                name: 'Turkmenistan',
                parentId: 'Central and South Asia'
            }, {
                mtype: 'City',
                name: 'Ashgabat',
                leaf: true,
                parentId: 'Turkmenistan'
            }, {
                mtype: 'Territory',
                name: 'East Asia and Pacific'
            }, {
                mtype: 'Country',
                name: 'Australia',
                parentId: 'East Asia and Pacific'
            }, {
                mtype: 'City',
                name: 'Sydney',
                leaf: true,
                parentId: 'Australia'
            }, {
                mtype: 'City',
                name: 'Canberra',
                leaf: true,
                parentId: 'Australia'
            }, {
                mtype: 'Country',
                name: 'China',
                parentId: 'East Asia and Pacific'
            }, {
                mtype: 'City',
                name: 'Beijing',
                leaf: true,
                parentId: 'China'
            }, {
                mtype: 'City',
                name: 'Chengdu',
                leaf: true,
                parentId: 'China'
            }, {
                mtype: 'Country',
                name: 'Japan',
                parentId: 'East Asia and Pacific'
            }, {
                mtype: 'City',
                name: 'Tokyo',
                leaf: true,
                parentId: 'Japan'
            }, {
                mtype: 'City',
                name: 'Osaka',
                leaf: true,
                parentId: 'Japan'
            }]
        }
    });
});