Ext.define('Ext.overrides.plugin.Abstract', {
    override: 'Ext.plugin.Abstract',

    $configStrict: false,
    $configPrefixed: false,

    disabled: false,

    /**
     * @cfg {String|Array} stateEvents
     * The configured list of stateEvents used to (optionally) participate in Owner Component's state management.
     */

    /**
     * @method
     * The getState method is invoked by the client Component's State mixin when one or more of the the specified {@link #stateEvents} are raised.
     *
     * The supplied implementation is empty. If plugin Subclasses are to (optionally) participate in the client Component's
     * state management, implementers should provide a suitable method which returns a state object.
     * @return {Object} state
     */
    getState: null,

    /**
     * @method
     * The applyState method is invoked by the client Component's State mixin after initComponent method has been run for the client.
     *
     * The supplied implementation is empty. If plugin Subclasses are to (optionally) participate in the client Component's
     * state management, implementers should provide a suitable method to utilize it.
     * @param {Object} state The current plugin state object to be applied.
     * @param {Object} allState The current aggregate state of the Component and all plugins.
     */
    applyState: null,

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
