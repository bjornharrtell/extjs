// here, the extra check for window['Ext'] is needed for use with cmd-test
// code injection.  we need to make that this file will sync up with page global
// scope to avoid duplicate Ext.Boot state.  That check is after the initial Ext check
// to allow the sandboxing template to inject an appropriate Ext var and prevent the
// global detection.
var Ext = Ext || window['Ext'] || {};


//<editor-fold desc="Microloader">
/**
 * @Class Ext.Microloader
 * @singleton
 */
Ext.Microloader = Ext.Microloader || (function () {
    var Boot = Ext.Boot,
        _listeners = [],
        _loaded = false,
        _tags = Boot.platformTags,
        Microloader = {

            /**
             * the global map of tags used
             */
            platformTags: _tags,

            detectPlatformTags: function () {
                if (Ext.beforeLoad) {
                    Ext.beforeLoad(_tags);
                }
            },

            initPlatformTags: function () {
                Microloader.detectPlatformTags();
            },

            getPlatformTags: function () {
                return Boot.platformTags;
            },

            filterPlatform: function (platform) {
                return Boot.filterPlatform(platform);
            },

            init: function () {
                Microloader.initPlatformTags();
            },

            initManifest: function (manifest) {
                Microloader.init();
                var tmpManifest = manifest || Ext.manifest;

                if (typeof tmpManifest === "string") {
                    var extension = ".json",
                        url = tmpManifest.indexOf(extension) === tmpManifest.length - extension.length
                            ? Boot.baseUrl + tmpManifest
                            : Boot.baseUrl + tmpManifest + ".json",
                        content = Boot.fetchSync(url);
                    tmpManifest = JSON.parse(content.content);
                }

                Ext.manifest = tmpManifest;
                return tmpManifest;
            },

            /**
             *
             * @param manifestDef
             */
            load: function (manifestDef) {
                var manifest = Microloader.initManifest(manifestDef),
                    loadOrder = manifest.loadOrder,
                    loadOrderMap = (loadOrder) ? Boot.createLoadOrderMap(loadOrder) : null,
                    urls = [],
                    js = manifest.js || [],
                    css = manifest.css || [],
                    resource, i, len, include,
                    loadedFn = function () {
                        _loaded = true;
                        Microloader.notify();
                    },
                    loadResources = function(resources, addLoadedFn){
                        for (len = resources.length, i = 0; i < len; i++) {
                            resource = resources[i];
                            include = true;
                            if (resource.platform && !Boot.filterPlatform(resource.platform)) {
                                include = false;
                            }
                            if (include) {
                                urls.push(resource.path);
                            }
                        }

                        if(!addLoadedFn) {
                            Boot.loadSync({
                                url: urls,
                                loadOrder: loadOrder,
                                loadOrderMap: loadOrderMap
                            });
                        } else {
                            Boot.load({
                                url: urls,
                                loadOrder: loadOrder,
                                loadOrderMap: loadOrderMap,
                                sequential: true,
                                success: loadedFn,
                                failure:  loadedFn
                            });
                        }
                    };

                if (loadOrder) {
                    manifest.loadOrderMap = loadOrderMap;
                }

                loadResources(css.concat(js), true);
            },

            onMicroloaderReady: function (listener) {
                if (_loaded) {
                    listener();
                } else {
                    _listeners.push(listener);
                }
            },

            /**
             * @private
             */
            notify: function () {
                //<debug>
                Boot.debug("notifying microloader ready listeners...");
                //</debug>
                var listener;
                while((listener = _listeners.shift())) {
                    listener();
                }
            }
        };

    return Microloader;
}());

//</editor-fold>

/**
 * the current application manifest
 *
 *
 * {
 *  name: 'name',
 *  version: <checksum>,
 *  debug: {
 *      hooks: {
 *          "*": true
 *      }
 *  },
 *  localStorage: false,
 *  mode: production,
 *  js: [
 *      ...
 *      {
 *          path: '../boo/baz.js',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      {
 *          path: 'http://some.domain.com/api.js',
 *          remote: true
 *      },
 *      ...
 *  ],
 *  css: [
 *      ...
 *      {
 *          path: '../boo/baz.css',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      ...
 *  ],
 *  localStorage: false,
 *  paths: {...},
 *  loadOrder: [
 *      ...
 *      {
 *          path: '../foo/bar.js",
 *          idx: 158,
 *          requires; [1,2,3,...,145,157],
 *          uses: [182, 193]
 *      },
 *      ...
 *  ],
 *  classes: {
 *      ...
 *      'Ext.panel.Panel': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *      },
 *      'Ext.rtl.util.Renderable': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *          override: 'Ext.util.Renderable'
 *      },
 *      ...
 *  },
 *  packages: {
 *      ...
 *      "sencha-core": {
 *          version: '1.2.3.4',
 *          requires: []
 *      },
 *      "ext": {
 *          version: '5.0.0.0',
 *          requires: ["sencha-core"]
 *      }.
 *      ...
 *  }
 * }
 *
 *
 * @type {String/Object}
 */
Ext.manifest = Ext.manifest || "bootstrap";

Ext.Microloader.load();