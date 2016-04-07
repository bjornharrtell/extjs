Ext.define('GeoCon.controller.SplashScreen', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.util.Geolocation'],

    stores: [
        'Bills',
        'Legislators',
        'Committees',
        'Votes',
        'States',
        'Districts'
    ],

    config: {
        control: {
            '#selectState': {
                change: 'onStateChange'
            },
            '#lookupBtn': {
                tap: 'onLookupTap'
            },
            '#settingsBtn': {
                tap: 'onSettingsTap'
            }
        }
    },

    init: function() {
        this.location = Ext.create('Ext.util.Geolocation', {
            autoUpdate: false,
            listeners: {
                locationupdate: 'onLocationUpdate',
                locationerror: 'onLocationError',
                scope: this
            }
        });
        this.location.updateLocation();
    },

    onSettingsTap: function() {
        if (!this.hasLocation) {
            this.onLocationError();
            return;
        }
        var splashScreen = Ext.getCmp('splashScreen');

        if (splashScreen.getActiveItem() == Ext.getCmp('settingsForm')) {
            splashScreen.setActiveItem(Ext.getCmp('legislatorList'));
        } else {
            splashScreen.setActiveItem(Ext.getCmp('settingsForm'));
        }
    },

    onLocationUpdate: function() {
        this.hasLocation = true;
        Ext.getStore('Districts').load({
            params: {
                latitude: this.location.getLatitude(),
                longitude: this.location.getLongitude()
            },
            callback: function(records) {
                var district = records && records[0];

                if (district) {
                    var store = Ext.getStore('States'),
                        idx = store.find('abbr', district.data.state),
                        state = store.getAt(idx);

                    this.currentDistrict = district.data.district;

                    if (state) {
                        this.currentState = state;
                        this.loadLegislators();
                        this.updateSettings();
                    }
                } else {
                    this.onLocationError();
                }
            },
            scope: this
        });
    },

    onLocationError: function() {
        this.hasLocation = true;
        var store = Ext.getStore('Districts');

        if (!store.isLoading()) {
            store.load({
                params: {
                    latitude: 37.381592,
                    longitude: -122.135672
                },
                callback: function (records) {
                    var district = records && records[0];

                    this.onSettingsTap();

                    if (district) {
                        var store = Ext.getStore('States'),
                            idx = store.find('abbr', district.data.state),
                            state = store.getAt(idx);

                        this.currentDistrict = district.data.district;

                        if (state) {
                            this.currentState = state;
                            this.loadLegislators();
                            this.updateSettings();
                        }
                    }
                    Ext.defer(function() {
                        Ext.Msg.alert('Geolocation Unavailable', 'Setting your default location to Sencha HQ');
                    }, 100);
                },
                scope: this
            });
        }
    },

    onStateChange: function(field) {
        var record = field.getRecord();
        if (record) {
            this.currentState = record;
        }
        if (Ext.getCmp('districtSpinner')) {
            this.updateDistrict();
        }
    },

    onLookupTap: function() {
        this.currentDistrict = Ext.getCmp('districtSpinner').getValue();
        this.loadLegislators();
        this.onSettingsTap();
    },

    updateSettings: function() {
        Ext.getCmp('selectState').setValue(this.currentState.data.abbr);
        this.updateDistrict();
    },

    updateDistrict: function() {
        Ext.getCmp('districtSpinner').setMaxValue(this.currentState.data.maxDistrict);
        Ext.getCmp('districtSpinner').setValue(this.currentDistrict || 0);
    },

    /**
     * Retrieves a list of Legislators for the given state and district. First loads
     * the Legislators for the state and district, then then Senators for the whole state.
     */
    loadLegislators: function() {
        var title, store, splashToolbar;
        
        // Might happen to be called to early when the state hasn't been chosen yet
        if (!this.currentState) {
            return;
        }
        
        title = this.currentState.data.abbr + ' District ' + this.currentDistrict;
        store = Ext.getStore('Legislators');
        splashToolbar = Ext.getCmp('splashToolbar');

        // If the current legislators are already loaded, don't re-load
        if (splashToolbar.getTitle() == title) {
            return;
        }

        splashToolbar.setTitle(title);

        store.removeAll();
        // First look up the Representative, then the senators for the state.
        // The current API doesn't support this in a single query
        store.load({
            params: {
                state: this.currentState.data.abbr,
                district: this.currentDistrict
            },
            callback: function() {
                store.load({
                    params: {
                        state: this.currentState.data.abbr,
                        title: 'Sen'
                    },
                    addRecords: true
                });
            },
            scope: this
        });
    }
});
