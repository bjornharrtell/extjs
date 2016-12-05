Ext.define('KitchenSink.view.binding.TwoWayFormulaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding-twowayformula',

    formulas: {
        // The calls to correctFloat here are to preserve the stability
        // of the values, we don't want precision rounding to cause the
        // viewmodel to think the data is different.
        celcius: {
            get: function(get) {
                return Ext.Number.correctFloat(get('kelvin') - 273.15);
            },
            set: function(v) {
                this.set('kelvin', Ext.Number.correctFloat(v + 273.15));
            }
        },
        fahrenheit: {
            get: function(get) {
                return Ext.Number.correctFloat(get('celcius') * 1.8 + 32);
            },
            set: function(v) {
                this.set('celcius', Ext.Number.correctFloat((v - 32) / 1.8));
            }
        }
    },

    data: {
        kelvin: 300.1
    }
});
