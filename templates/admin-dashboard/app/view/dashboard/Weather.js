Ext.define('Admin.view.dashboard.Weather', {
    extend: 'Ext.Component',
    xtype: 'weather',
    baseCls: 'weather-panel',

    border: false,
    height: 80,

    data: {
        icon: 'cloud-icon.png',
        forecast: 'Partly Cloudy',
        temperature: 25
    },

    tpl: '<div class="weather-image-container"><img src="resources/images/icons/{icon}" alt="{forecast}"/></div>'+
         '<div class="weather-details-container">' +
            '<div>{temperature}&#176;</div>' +
            '<div>{forecast}</div>' +
         '</div>'
});
