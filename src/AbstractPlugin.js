/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
/**
 * The AbstractPlugin class is the base class from which user-implemented plugins should inherit.
 *
 * This class defines the essential API of plugins as used by Components by defining the following methods:
 *
 *   - `init` : The plugin initialization method which the owning Component calls at Component initialization time.
 *
 *     The Component passes itself as the sole parameter.
 *
 *     Subclasses should set up bidirectional links between the plugin and its client Component here.
 *
 *   - `destroy` : The plugin cleanup method which the owning Component calls at Component destruction time.
 *
 *     Use this method to break links between the plugin and the Component and to free any allocated resources.
 *
 *   - `enable` : The base implementation just sets the plugin's `disabled` flag to `false`
 *
 *   - `disable` : The base implementation just sets the plugin's `disabled` flag to `true`
 */
Ext.define('Ext.AbstractPlugin', {
    disabled: false,

    /**
     * @property {Boolean} isPlugin
     * `true` in this class to identify an object as an instantiated Plugin, or subclass thereof.
     */
    isPlugin: true,

    constructor: function(config) {
        this.pluginConfig = config;
        Ext.apply(this, config);
    },

    clonePlugin: function(overrideCfg) {
        return new this.self(Ext.apply({}, overrideCfg, this.pluginConfig));
    },
    
    setCmp: function(cmp) {
        this.cmp = cmp;
    },

    getCmp: function() {
        return this.cmp;
    },

    /**
     * @cfg {String} pluginId
     * A name for the plugin that can be set at creation time to then retrieve the plugin
     * through {@link Ext.AbstractComponent#getPlugin getPlugin} method.  For example:
     *
     *     var grid = Ext.create('Ext.grid.Panel', {
     *         plugins: [{
     *             ptype: 'cellediting',
     *             clicksToEdit: 2,
     *             pluginId: 'cellplugin'
     *         }]
     *     });
     *
     *     // later on:
     *     var plugin = grid.getPlugin('cellplugin');
     */

    /**
     * @method
     * The init method is invoked after initComponent method has been run for the client Component.
     *
     * The supplied implementation is empty. Subclasses should perform plugin initialization, and set up bidirectional
     * links between the plugin and its client Component in their own implementation of this method.
     * @param {Ext.Component} client The client Component which owns this plugin.
     */
    init: Ext.emptyFn,

    /**
     * @method
     * The destroy method is invoked by the owning Component at the time the Component is being destroyed.
     *
     * The supplied implementation is empty. Subclasses should perform plugin cleanup in their own implementation of
     * this method.
     */
    destroy: Ext.emptyFn,

    /**
     * The base implementation just sets the plugin's `disabled` flag to `false`
     *
     * Plugin subclasses which need more complex processing may implement an overriding implementation.
     */
    enable: function() {
        this.disabled = false;
    },

    /**
     * The base implementation just sets the plugin's `disabled` flag to `true`
     *
     * Plugin subclasses which need more complex processing may implement an overriding implementation.
     */
    disable: function() {
        this.disabled = true;
    }
});