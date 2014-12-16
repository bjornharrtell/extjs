/**
 * This abstract ViewController implements certain methods shared by
 * all ViewControllers in Ext Direct examples.
 */
Ext.define('KitchenSink.view.direct.DirectVC', {
    extend: 'Ext.app.ViewController',
    
    requires: [
        'Ext.window.MessageBox'
    ],
    
    config: {
        /**
         * @cfg {String} url
         * The URL to use for Ext Direct service discovery requests.
         */
        apiUrl: undefined,
        
        /**
         * @cfg {Object} [providerCfg]
         * Optional configuration object to apply to Provider declaration
         * before it is created.
         */
        providerCfg: undefined,
        
        listen: {
            controller: {
                // We're only listening to those events from the global
                // Direct controller, to avoid possible collisions.
                '#Direct': {
                    providerinit: 'onProviderInit',
                    providerfail: 'onProviderFail'
                }
            }
        }
    },
    
    init: function() {
        var me = this,
            options;
        
        me.providerUrls = [];
        
        options = {
            apiUrl: me.getApiUrl(),
            providerCfg: me.getProviderCfg()
        };
        
        // Make a synchronous request to the global Direct controller
        // to request Ext Direct API initialization. It may happen
        // that the API was already initalized, in which case Direct
        // controller will set `success` flag in the options object
        // we're passing and we can proceed immediately.
        me.fireEvent('directconnect', options);
        
        // Already have the API
        if (options.success) {
            me.onProviderInit(options.url, true);
        }
        
        // Need to wait for the `directproviderinit` event to fire
        // when the API has been initialized; Direct controller
        // will return the original request URL for us to catch,
        // along with the actual service URL for that provider.
        else {
            me.requestUrl = options.url;
        }
    },
    
    destroy: function() {
        var me = this,
            providerUrls = me.providerUrls,
            i, len, url;
        
        // Notify the Direct controller that we no longer need our provider(s)
        for (i = 0, len = providerUrls.length; i < len; i++) {
            url = providerUrls[i];
            
            me.fireEvent('directdisconnect', url);
        }
        
        me.providerUrls = null;
        
        me.callParent();
    },
    
    /**
     * This method will be called when Ext.Direct API is initialized;
     * derived ViewControllers should override it to finish initialization.
     * @template
     * @protected
     */
    finishInit: Ext.emptyFn,
    
    onProviderInit: function(requestUrl, hasProvider) {
        var me = this;
        
        // "Our" part of Ext.Direct API has been loaded and initialized
        if (hasProvider || requestUrl === me.requestUrl) {
            delete me.requestUrl;
            me.providerUrls.push(requestUrl);
            
            me.finishInit();
        }
    },
    
    onProviderFail: function(requestUrl, error) {
        Ext.Msg.alert('Ext.Direct init failure', error);
    },
    
    // Retrieve provider reference by its URL
    getProvider: function(url) {
        var options = { url: url };
        
        this.fireEvent('directgetprovider', options);
        
        return options.provider;
    }
});
