/**
 * This Controller handles initialization requests for the Ext Direct API
 * shared by different examples; in itself it is an example of dynamic
 * API manipulation.
 *
 * The primary reason to have a global Controller handling Ext Direct
 * is to keep Direct configuration centralized for the application,
 * as well as avoid binding transient ViewControlles to Provider
 * instances unless necessary.
 */

Ext.define('KitchenSink.controller.Direct', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.direct.RemotingProvider',
        'Ext.direct.Manager',
        'Ext.app.domain.Direct'
    ],
    
    id: 'Direct',
    
    config: {
        /**
         * @cfg {String} apiUrl
         * Default URL to use for Ext Direct service discovery requests.
         */
        apiUrl: 'data/direct/api.php',
        
        /**
         * @cfg {String} [varName="Ext.REMOTING_API"]
         * Default variable name to use for Ext Direct API declaration.
         */
        varName: 'Ext.REMOTING_API',
        
        listen: {
            controller: {
                // We're listening to these events from any Controller.
                // That includes ViewControllers, too.
                '*': {
                    directconnect: 'onDirectConnect',
                    directdisconnect: 'onDirectDisconnect',
                    directgetprovider: 'onDirectGetProvider'
                }
            }
        }
    },
    
    init: function() {
        this.providers = {};
    },
    
    destroy: function() {
        var providers = this.providers,
            url;
        
        for (url in providers) {
            providers[url].disconnect();
            providers[url] = null;
        }
        
        this.callParent();
    },
    
    /**
     * Request remote API from the server, and create a new Direct provider
     * when API declaration is received; alternatively create a new provider
     * if the caller provided a configuration blob for it.
     *
     * @param {Object} options Options to configure Provider request, and to
     * return to the caller in synchronous fashion.
     */
    onDirectConnect: function(options) {
        var me = this,
            providerCfg = options.providerCfg,
            url, provider, request;
        
        url = (providerCfg && providerCfg.url) || options.apiUrl  || me.getApiUrl();
        
        // The provider at that URI may have been initialized already
        provider = me.providers[url];
        
        // ViewController may not have specific API URL defined in its
        // configuration, which means we need to return the URL used.
        options.url = url;
        
        if (provider) {
            provider.connect();
            
            options.success = true;
            
            return;
        }
        
        request = Ext.apply({
            url: url,
            varName: options.varName || me.getVarName()
        }, providerCfg);
        
        // We may be passed a provider configuration object that contains
        // sufficient information to create a Provider instance. In that
        // case, loadProvider will add it and fire the callback immediately.
        Ext.direct.Manager.loadProvider(request, me.providerCallback, me);
    },
    
    /**
     * Request to disconnect a Direct provider. This event is fired
     * by ViewControllers being destroyed, to notify Direct controller
     * that they no longer need the specified provider.
     *
     * @param {String} url Service URL for a provider
     */
    onDirectDisconnect: function(url) {
        var provider = this.providers[url];
        
        if (provider) {
            provider.disconnect();
        }
    },
    
    /**
     * Return a provider by its URL to the caller.
     */
    onDirectGetProvider: function(options) {
        options.provider = this.providers[options.url];
    },
    
    providerCallback: function(apiUrl, provider) {
        var me = this;
        
        // Error message can be returned instead of provider
        if (Ext.isString(provider)) {
            me.fireEvent('providerfail', apiUrl, provider);
            
            return;
        }
        
        // We don't need to connect the provider as it was
        // connected automatically by the Direct Manager
        me.providers[apiUrl] = provider;
        
        me.fireEvent('providerinit', apiUrl);
    }
});
