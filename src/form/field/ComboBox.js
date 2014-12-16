/**
 * A combobox control with support for autocomplete, remote loading, and many other features.
 *
 * A ComboBox is like a combination of a traditional HTML text `<input>` field and a `<select>`
 * field; the user is able to type freely into the field, and/or pick values from a dropdown selection
 * list. The user can input any value by default, even if it does not appear in the selection list;
 * to prevent free-form values and restrict them to items in the list, set {@link #forceSelection} to `true`.
 *
 * The selection list's options are populated from any {@link Ext.data.Store}, including remote
 * stores. The data items in the store are mapped to each option's displayed text and backing value via
 * the {@link #valueField} and {@link #displayField} configurations, respectively.
 *
 * If your store is not remote, i.e. it depends only on local data and is loaded up front, you should be
 * sure to set the {@link #queryMode} to `'local'`, as this will improve responsiveness for the user.
 *
 * # Example usage:
 *
 *     @example
 *     // The data store containing the list of states
 *     var states = Ext.create('Ext.data.Store', {
 *         fields: ['abbr', 'name'],
 *         data : [
 *             {"abbr":"AL", "name":"Alabama"},
 *             {"abbr":"AK", "name":"Alaska"},
 *             {"abbr":"AZ", "name":"Arizona"}
 *             //...
 *         ]
 *     });
 *
 *     // Create the combo box, attached to the states data store
 *     Ext.create('Ext.form.ComboBox', {
 *         fieldLabel: 'Choose State',
 *         store: states,
 *         queryMode: 'local',
 *         displayField: 'name',
 *         valueField: 'abbr',
 *         renderTo: Ext.getBody()
 *     });
 *
 * # Events
 *
 * To do something when something in ComboBox is selected, configure the select event:
 *
 *     var cb = Ext.create('Ext.form.ComboBox', {
 *         // all of your config options
 *         listeners:{
 *              scope: yourScope,
 *              'select': yourFunction
 *         }
 *     });
 *
 *     // Alternatively, you can assign events after the object is created:
 *     var cb = new Ext.form.field.ComboBox(yourOptions);
 *     cb.on('select', yourFunction, yourScope);
 *
 * # Multiple Selection
 *
 * ComboBox also allows selection of multiple items from the list; to enable multi-selection set the
 * {@link #multiSelect} config to `true`.
 *
 * # Filtered Stores
 *
 * If you have a local store that is already filtered, you can use the {@link #lastQuery} config option
 * to prevent the store from having the filter being cleared on first expand.
 *
 * ## Customized combobox
 *
 * Both the text shown in dropdown menu and text field can be easily customized:
 *
 *     @example
 *     var states = Ext.create('Ext.data.Store', {
 *         fields: ['abbr', 'name'],
 *         data : [
 *             {"abbr":"AL", "name":"Alabama"},
 *             {"abbr":"AK", "name":"Alaska"},
 *             {"abbr":"AZ", "name":"Arizona"}
 *         ]
 *     });
 *
 *     Ext.create('Ext.form.ComboBox', {
 *         fieldLabel: 'Choose State',
 *         store: states,
 *         queryMode: 'local',
 *         valueField: 'abbr',
 *         renderTo: Ext.getBody(),
 *         // Template for the dropdown menu.
 *         // Note the use of "x-boundlist-item" class,
 *         // this is required to make the items selectable.
 *         tpl: Ext.create('Ext.XTemplate',
 *             '<tpl for=".">',
 *                 '<div class="x-boundlist-item">{abbr} - {name}</div>',
 *             '</tpl>'
 *         ),
 *         // template for the content inside text field
 *         displayTpl: Ext.create('Ext.XTemplate',
 *             '<tpl for=".">',
 *                 '{abbr} - {name}',
 *             '</tpl>'
 *         )
 *     });
 *
 * See also the {@link #listConfig} option for additional configuration of the dropdown.
 *
 */
Ext.define('Ext.form.field.ComboBox', {
    extend:'Ext.form.field.Picker',
    requires: [
        'Ext.util.DelayedTask',
        'Ext.view.BoundList',
        'Ext.data.StoreManager'
    ],
    alternateClassName: 'Ext.form.ComboBox',
    alias: ['widget.combobox', 'widget.combo'],
    mixins: [
        'Ext.util.StoreHolder'
    ],

    config: {
        filters: null,

        /**
         * @cfg {Ext.data.Model} selection
         * The selected model. Typically used with {@link #bind binding}.
         */
        selection: null,

        /**
         * @cfg {String} [valueNotFoundText]
         * When using a name/value combo, if the value passed to setValue is not found in the store, valueNotFoundText will
         * be displayed as the field text if defined. If this default text is used, it means there
         * is no value set and no validation will occur on this field.
         */
        valueNotFoundText: null

    },

    publishes: ['selection'],
    twoWayBindable: ['selection'],

    /**
     * @cfg {String/String[]/Ext.XTemplate} displayTpl
     * The template to be used to display selected records inside the text field. An array of the selected records' data
     * will be passed to the template. Defaults to:
     *
     *     '<tpl for=".">' +
     *         '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
     *         '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
     *     '</tpl>'
     */

    /**
     * @cfg {String} [triggerCls='x-form-arrow-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link Ext.form.trigger.Trigger#baseCls}
     * by default and `triggerCls` will be **appended** if specified.
     */
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    /**
     * @cfg {String} [hiddenName=""]
     * The name of an underlying hidden field which will be synchronized with the underlying value of the combo.
     * This option is useful if the combo is part of a form element doing a regular form post. The hidden field
     * will not be created unless a hiddenName is specified.
     */
    hiddenName: '',

    /**
     * @cfg {Boolean} [pinList=true]
     * Has no effect if {@link #multiSelect} is `false`
     *
     * Configure as `false` to automatically collapse the pick list after a selection is made.
     * @deprecated 5.1.0 Use {@link #collapseOnSelect}
     */
    
    /**
     * @cfg {Boolean} [collapseOnSelect=false]
     * Has no effect if {@link #multiSelect} is `false`
     *
     * Configure as true to automatically collapse the pick list after a selection is made.
     */
    collapseOnSelect: false,

    /**
     * @property {Ext.dom.Element} hiddenDataEl
     * @private
     */

    /**
     * @private
     * @cfg {String}
     * CSS class used to find the {@link #hiddenDataEl}
     */
    hiddenDataCls: Ext.baseCSSPrefix + 'hidden-display ' + Ext.baseCSSPrefix + 'form-data-hidden',
    
    ariaRole: 'combobox',

    childEls: {
        'hiddenDataEl': true
    },

    /**
     * @property {Boolean} filtered
     * True if there are extra `filters` appllied to this component.
     * @private
     * @readonly
     * @since 5.0.0
     */
    filtered: false,

    afterRender: function(){
        var me = this;
        me.callParent(arguments);
        me.setHiddenValue(me.value);
    },

    /**
     * @cfg {Ext.data.Store/String/Array} store
     * The data source to which this combo is bound. Acceptable values for this property are:
     *
     *   - **any {@link Ext.data.Store Store} subclass**
     *   - **an {@link Ext.data.Store#storeId ID of a store}**
     *   - **an Array** : Arrays will be converted to a {@link Ext.data.Store} internally, automatically generating
     *     {@link Ext.data.Field#name field names} to work with all data components.
     *
     *     - **1-dimensional array** : (e.g., `['Foo','Bar']`)
     *
     *       A 1-dimensional array will automatically be expanded (each array item will be used for both the combo
     *       {@link #valueField} and {@link #displayField})
     *
     *     - **2-dimensional array** : (e.g., `[['f','Foo'],['b','Bar']]`)
     *
     *       For a multi-dimensional array, the value in index 0 of each item will be assumed to be the combo
     *       {@link #valueField}, while the value at index 1 is assumed to be the combo {@link #displayField}.
     *
     * See also {@link #queryMode}.
     */

    /**
     * @cfg {Boolean} multiSelect
     * If set to `true`, allows the combo field to hold more than one value at a time, and allows selecting multiple
     * items from the dropdown list. The combo's text field will show all selected values separated by the
     * {@link #delimiter}.
     * @deprecated 5.1.0 Use {@link Ext.form.field.Tag} or {@link Ext.view.MultiSelector}
     */
    multiSelect: false,

    //<locale>
    /**
     * @cfg {String} delimiter
     * The character(s) used to separate the {@link #displayField display values} of multiple selected items when
     * `{@link #multiSelect} = true`.
     */
    delimiter: ', ',
    //</locale>

    /**
     * @cfg {String} displayField
     * The underlying {@link Ext.data.Field#name data field name} to bind to this ComboBox.
     *
     * See also `{@link #valueField}`.
     */
    displayField: 'text',

    /**
     * @cfg {String} valueField (required)
     * The underlying {@link Ext.data.Field#name data value name} to bind to this ComboBox.
     *
     * **Note**: use of a `valueField` requires the user to make a selection in order for a value to be mapped. See also
     * `{@link #displayField}`.
     *
     * Defaults to match the value of the {@link #displayField} config.
     */

    /**
     * @cfg {String} triggerAction
     * The action to execute when the trigger is clicked.
     *
     *   - **`'all'`** :
     *
     *     {@link #doQuery run the query} specified by the `{@link #allQuery}` config option
     *
     *   - **`'last'`** :
     *
     *     {@link #doQuery run the query} using the `{@link #lastQuery last query value}`.
     *
     *   - **`'query'`** :
     *
     *     {@link #doQuery run the query} using the {@link Ext.form.field.Base#getRawValue raw value}.
     *
     * See also `{@link #queryParam}`.
     */
    triggerAction: 'all',

    /**
     * @cfg {String} allQuery
     * The text query to send to the server to return all records for the list with no filtering
     */
    allQuery: '',

    /**
     * @cfg {String} queryParam
     * Name of the parameter used by the Store to pass the typed string when the ComboBox is configured with
     * `{@link #queryMode}: 'remote'`. If explicitly set to a falsy value it will not be sent.
     */
    queryParam: 'query',

    /**
     * @cfg {String} queryMode
     * The mode in which the ComboBox uses the configured Store. Acceptable values are:
     *
     *   - **`'remote'`** :
     *
     *     In `queryMode: 'remote'`, the ComboBox loads its Store dynamically based upon user interaction.
     *
     *     This is typically used for "autocomplete" type inputs, and after the user finishes typing, the Store is {@link
     *     Ext.data.Store#method-load load}ed.
     *
     *     A parameter containing the typed string is sent in the load request. The default parameter name for the input
     *     string is `query`, but this can be configured using the {@link #queryParam} config.
     *
     *     In `queryMode: 'remote'`, the Store may be configured with `{@link Ext.data.Store#remoteFilter remoteFilter}:
     *     true`, and further filters may be _programatically_ added to the Store which are then passed with every load
     *     request which allows the server to further refine the returned dataset.
     *
     *     Typically, in an autocomplete situation, {@link #hideTrigger} is configured `true` because it has no meaning for
     *     autocomplete.
     *
     *   - **`'local'`** :
     *
     *     ComboBox loads local data
     *
     *         var combo = new Ext.form.field.ComboBox({
     *             renderTo: document.body,
     *             queryMode: 'local',
     *             store: new Ext.data.ArrayStore({
     *                 id: 0,
     *                 fields: [
     *                     'myId',  // numeric value is the key
     *                     'displayText'
     *                 ],
     *                 data: [[1, 'item1'], [2, 'item2']]  // data is local
     *             }),
     *             valueField: 'myId',
     *             displayField: 'displayText',
     *             triggerAction: 'all'
     *         });
     */
    queryMode: 'remote',

    /**
     * @cfg {Boolean} [queryCaching=true]
     * When true, this prevents the combo from re-querying (either locally or remotely) when the current query
     * is the same as the previous query.
     */
    queryCaching: true,
    
    /**
     * @cfg {Boolean} autoLoadOnValue
     * This option controls whether to *initially* load the store when a value is set so that
     * the display value can be determined from the appropriate record.
     * The store will only be loaded in a limited set of circumstances:
     * - The store is not currently loading.
     * - The store does not have a pending {@link Ext.data.Store#autoLoad}.
     * - The store has not been loaded before.
     */
    autoLoadOnValue: false,

    /**
     * @cfg {Number} pageSize
     * If greater than `0`, a {@link Ext.toolbar.Paging} is displayed in the footer of the dropdown list and the
     * {@link #doQuery filter queries} will execute with page start and {@link Ext.view.BoundList#pageSize limit}
     * parameters. Only applies when `{@link #queryMode} = 'remote'`.
     */
    pageSize: 0,

    /**
     * @cfg {Number} queryDelay
     * The length of time in milliseconds to delay between the start of typing and sending the query to filter the
     * dropdown list.
     *
     * Defaults to `500` if `{@link #queryMode} = 'remote'` or `10` if `{@link #queryMode} = 'local'`
     */

    /**
     * @cfg {Number} minChars
     * The minimum number of characters the user must type before autocomplete and {@link #typeAhead} activate.
     *
     * Defaults to `4` if `{@link #queryMode} = 'remote'` or `0` if `{@link #queryMode} = 'local'`,
     * does not apply if `{@link Ext.form.field.Trigger#editable editable} = false`.
     */

    /**
     * @cfg {Boolean} [anyMatch=false]
     * Configure as `true` to allow matching of the typed characters at any position in the {@link #valueField}'s value.
     */
    anyMatch: false,

    /**
     * @cfg {Boolean} [caseSensitive=false]
     * Configure as `true` to make the filtering match with exact case matching
     */
    caseSensitive: false,

    /**
     * @cfg {Boolean} autoSelect
     * `true` to automatically highlight the first result gathered by the data store in the dropdown list when it is
     * opened. A false value would cause nothing in the list to be highlighted automatically, so
     * the user would have to manually highlight an item before pressing the enter or {@link #selectOnTab tab} key to
     * select it (unless the value of ({@link #typeAhead}) were true), or use the mouse to select a value.
     */
    autoSelect: true,

    /**
     * @cfg {Boolean} typeAhead
     * `true` to populate and autoselect the remainder of the text being typed after a configurable delay
     * ({@link #typeAheadDelay}) if it matches a known value.
     */
    typeAhead: false,

    /**
     * @cfg {Number} typeAheadDelay
     * The length of time in milliseconds to wait until the typeahead text is displayed if `{@link #typeAhead} = true`
     */
    typeAheadDelay: 250,

    /**
     * @cfg {Boolean} selectOnTab
     * Whether the Tab key should select the currently highlighted item.
     */
    selectOnTab: true,

    /**
     * @cfg {Boolean} forceSelection
     * `true` to restrict the selected value to one of the values in the list, `false` to allow the user to set
     * arbitrary text into the field.
     */
    forceSelection: false,

    /**
     * @cfg {Boolean} growToLongestValue
     * `false` to not allow the component to resize itself when its data changes
     * (and its {@link #grow} property is `true`)
     */
    growToLongestValue: true,

    /**
     * @cfg {Boolean} clearFilterOnBlur
     * *When {@link #queryMode} is `'local'` only*
     * 
     * As text is entered, the underlying store is filtered to match the value. When this option is `true`,
     * any filtering applied by this field will be cleared when focus is removed & reinstated on focus. 
     * If `false`, the filters will be left in place.
     */
    clearFilterOnBlur: true,
    
    /**
     * @cfg {Boolean} enableRegEx
     * *When {@link #queryMode} is `'local'` only*
     *
     * Set to `true` to have the ComboBox use the typed value as a RegExp source to filter the store to get possible matches.
     */

    /**
     * @property {String} lastQuery
     * The value of the match string used to filter the store. Delete this property to force a requery. Example use:
     *
     *     var combo = new Ext.form.field.ComboBox({
     *         ...
     *         queryMode: 'remote',
     *         listeners: {
     *             // delete the previous query in the beforequery event or set
     *             // combo.lastQuery = null (this will reload the store the next time it expands)
     *             beforequery: function(qe){
     *                 delete qe.combo.lastQuery;
     *             }
     *         }
     *     });
     *
     * To make sure the filter in the store is not cleared the first time the ComboBox trigger is used configure the
     * combo with `lastQuery=''`. Example use:
     *
     *     var combo = new Ext.form.field.ComboBox({
     *         ...
     *         queryMode: 'local',
     *         triggerAction: 'all',
     *         lastQuery: ''
     *     });
     */

    /**
     * @cfg {Object} defaultListConfig
     * Set of options that will be used as defaults for the user-configured {@link #listConfig} object.
     */
    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 300,
        shadow: 'sides'
    },

    /**
     * @cfg {String/HTMLElement/Ext.dom.Element} transform
     * The id, DOM node or {@link Ext.dom.Element} of an existing HTML `<select>` element to convert into a ComboBox. The
     * target select's options will be used to build the options in the ComboBox dropdown; a configured {@link #store}
     * will take precedence over this.
     */
    
    /**
     * @cfg {Boolean} transformInPlace
     * `true` to automatically render this combo box in place of the select element that is being 
     * {@link #transform transformed}. If `false`, this combo will be rendered using the normal rendering,
     * either as part of a layout, or using {@link #renderTo} or {@link #method-render}.
     */
    transformInPlace: true,

    /**
     * @cfg {Object} listConfig
     * An optional set of configuration properties that will be passed to the {@link Ext.view.BoundList}'s constructor.
     * Any configuration that is valid for BoundList can be included. Some of the more useful ones are:
     *
     *   - {@link Ext.view.BoundList#cls cls} - defaults to empty
     *   - {@link Ext.view.BoundList#emptyText emptyText} - defaults to empty string
     *   - {@link Ext.view.BoundList#itemSelector itemSelector} - defaults to the value defined in BoundList
     *   - {@link Ext.view.BoundList#loadingText loadingText} - defaults to `'Loading...'`
     *   - {@link Ext.view.BoundList#minWidth minWidth} - defaults to `70`
     *   - {@link Ext.view.BoundList#maxWidth maxWidth} - defaults to `undefined`
     *   - {@link Ext.view.BoundList#maxHeight maxHeight} - defaults to `300`
     *   - {@link Ext.view.BoundList#resizable resizable} - defaults to `false`
     *   - {@link Ext.view.BoundList#shadow shadow} - defaults to `'sides'`
     *   - {@link Ext.view.BoundList#width width} - defaults to `undefined` (automatically set to the width of the ComboBox
     *     field if {@link #matchFieldWidth} is true)
     *   - {@link Ext.view.BoundList#getInnerTpl getInnerTpl} A function which returns a template string which renders
     *     the ComboBox's {@link #displayField} value in the dropdown. This defaults to just outputting the raw value,
     *     but may use any {@link Ext.XTemplate XTemplate} methods to produce output.
     *
     *     The running template is configured with some extra properties that provide some context:
     *         - field {@link Ext.form.field.ComboBox ComboBox} This combobox
     *         - store {@link Ext.data.Store Store} This combobox's data store
     */

    getGrowWidth: function () {
        var me = this,
            value = me.inputEl.dom.value,
            field, store, dataLn, currentLongestLength,
            i, item, itemLn;

        if (me.growToLongestValue) {
            field = me.displayField;
            store = me.store;
            dataLn = store.data.length;
            currentLongestLength = 0;

            for (i = 0; i < dataLn; i++) {
                item = store.getAt(i).data[field];
                itemLn = item.length;

                // Compare the current item's length with the current longest length and store the value.
                if (itemLn > currentLongestLength) {
                    currentLongestLength = itemLn;
                    value = item;
                }
            }
        }

        return value;
    },

    /**
     * @event beforequery
     * Fires before all queries are processed. Return false to cancel the query or set the queryPlan's cancel
     * property to true.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {Ext.form.field.ComboBox} queryPlan.combo A reference to this ComboBox.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     */

    /**
     * @event select
     * Fires when at least one list item is selected.
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Model/Ext.data.Model[]} record With {@link #multiSelect} `false`, the value will be
     * a single record. With {@link #multiSelect} `true`, the value will be an array of records.
     */

    /**
     * @event beforeselect
     * Fires before the selected item is added to the collection
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Record} record The selected record
     * @param {Number} index The index of the selected record
     */

    /**
     * @event beforedeselect
     * Fires before the deselected item is removed from the collection
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Record} record The deselected record
     * @param {Number} index The index of the deselected record
     */

    initComponent: function() {
        var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            displayTpl = me.displayTpl,
            transformSelect,
            isLocalMode;

        //<debug>
        if (me.typeAhead && me.multiSelect) {
            Ext.Error.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
        }
        if (me.typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        if (me.selectOnFocus && !me.editable) {
            Ext.Error.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
        }
        //</debug>

        // Check for presence of deprecated pinList config, and convert it to collapseOnSelect
        if ('pinList' in me) {
            me.collapseOnSelect = !me.pinList;
        }

        // Build store from 'transform' HTML select element's options
        if (transform) {
            transformSelect = Ext.getDom(transform);
            if (transformSelect) {
                if (!me.store) {
                    store = Ext.Array.map(Ext.Array.from(transformSelect.options), function(option){
                        return [option.value, option.text];
                    });
                }
                if (!me.name) {
                    me.name = transformSelect.name;
                }
                if (!('value' in me)) {
                    me.value = transformSelect.value;
                }
            }
        }

        me.bindStore(store || 'ext-empty-store', true, true);

        if (!displayTpl) {
            me.displayTpl = new Ext.XTemplate(
                '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
                    '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
                '</tpl>'
            );
        } else if (!displayTpl.isTemplate) {
            me.displayTpl = new Ext.XTemplate(displayTpl);
        }

        isLocalMode = me.queryMode === 'local';
        if (!isDefined(me.queryDelay)) {
            me.queryDelay = isLocalMode ? 10 : 500;
        }
        if (!isDefined(me.minChars)) {
            me.minChars = isLocalMode ? 0 : 4;
        }

        me.callParent();

        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);

        // render in place of 'transform' select
        if (transformSelect) {
            if (me.transformInPlace) {
                me.render(transformSelect.parentNode, transformSelect);
                delete me.renderTo;
            }
            Ext.removeNode(transformSelect);
        }
    },

    getSubTplMarkup: function(fieldData) {
        var me = this,
            hiddenDataElMarkup = '',
            markup = me.callParent(arguments);

        if (me.hiddenName) {
            hiddenDataElMarkup = '<div id="' + fieldData.id + '-hiddenDataEl" data-ref="hiddenDataEl" class="' + me.hiddenDataCls + '" role="presentation"></div>';
        }

        return hiddenDataElMarkup + markup;
    },

    applyFilters: function (filters, collection) {
        var me = this;
        if (filters === null || filters.isFilterCollection) {
            return filters;
        }

        if (filters) {
            if (!collection) {
                collection = this.getFilters();
            }

            collection.beginUpdate();
            collection.splice(0, collection.length, filters);
            collection.each(function (filter) {
                filter.ownerId = me.id;
            });
            collection.endUpdate();
        }

        return collection;
    },
    
    applyValueNotFoundText: function(v) {
        var me = this,
            valueNotFoundRecord = me.valueNotFoundRecord || (me.valueNotFoundRecord = new Ext.data.Model());

        valueNotFoundRecord.set(me.displayField, v);
        if (me.valueField && me.displayField !== me.valueField) {
            valueNotFoundRecord.set(me.valueField, v);
        }

        return v;
    },

    /**
     * Returns the `Ext.util.FilterCollection`. Unless `autoCreate` is explicitly passed
     * as `false` this collection will be automatically created if it does not yet exist.
     * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
     * @return {Ext.util.FilterCollection} The collection of filters.
     */
    getFilters: function (autoCreate) {
        var ret = this.filters;

        if (!ret && autoCreate !== false) {
            ret = new Ext.util.FilterCollection();
            this.setFilters(ret);
        }

        return ret;
    },

    updateFilters: function (newFilters, oldFilters) {
        var me = this;

        if (oldFilters) {
            oldFilters.un('endupdate', 'onEndUpdateFilters', me);
        }

        if (newFilters) {
            newFilters.on('endupdate', 'onEndUpdateFilters', me);
        }

        me.onEndUpdateFilters(newFilters);
    },

    onEndUpdateFilters: function (filters) {
        var me = this,
            was = me.filtered,
            is = !!filters && (filters.length > 0), // booleanize filters
            old, storeFilters;

        if (was || is) {
            me.filtered = is;
            old = [];
            storeFilters = me.store.getFilters();

            storeFilters.each(function (filter) {
                if (filter.ownerId === me.id && !filters.contains(filter)) {
                    old.push(filter);
                }
            });

            storeFilters.splice(0, old, filters.items);
        }
    },

    /**
     * Returns the store associated with this ComboBox.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    completeEdit: function(e) {
        var me = this,
            filter = me.queryFilter;
            
        me.doQueryTask.cancel();
        me.assertValue();
        
        if (filter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            me.getStore().getFilters().remove(filter);
        }
    },
    
    onFocus: function(e) {
        var me = this;
        
        me.callParent([e]);    
        if (me.triggerAction !== 'all' && me.queryFilter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            delete me.lastQuery;
            me.doRawQuery();
        }
    },

    // private
    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            rec, currentValue,
            displayValue = me.getDisplayValue();

        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== displayValue) {
                    me.setRawValue(displayValue);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    currentValue = me.value;
                    // Prevent an issue where we have duplicate display values with
                    // different underlying values.
                    if (!me.findRecordByValue(currentValue)) {
                        me.select(rec, true);
                    }
                } else if (me.lastSelection) {
                    me.setRawValue(displayValue);
                }
            }
        }
        me.collapse();
    },

    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            boundList = me.getPicker(),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;

            boundList.highlightItem(boundList.getNode(record));

            if (selStart !== 0 && selStart !== len) {
                me.setRawValue(newValue);
                me.selectText(selStart, newValue.length);
            }
        }
    },

    // invoked when a different store is bound to this combo
    // than the original
    resetToDefault: Ext.emptyFn,

    beforeReset: function() {
        var filter = this.queryFilter;
        
        this.callParent();

        if (filter) {
            this.getStore().getFilters().remove(filter);
        }
    },

    onUnbindStore: function() {
        var me = this,
            picker = me.picker,
            filter = me.queryFilter;

        // If we'd added a local filter, remove it
        if (filter && !me.store.isDestroyed) {
            me.changingFilters = true;
            me.getStore().getFilters().remove(filter);
            me.changingFilters = false;
        }
        me.pickerSelectionModel.destroy();
        if (picker) {
            picker.bindStore(null);
        }
    },

    onBindStore: function(store, initial) {
        var me = this,
            picker = me.picker,
            extraKeySpec,
            valueCollectionConfig;

        // We're being bound, not unbound...
        if (store) {
            // If store was created from a 2 dimensional array with generated field names 'field1' and 'field2'
            if (store.autoCreated) {
                me.queryMode = 'local';
                me.valueField = me.displayField = 'field1';
                if (!store.expanded) {
                    me.displayField = 'field2';
                }
            }
            if (!Ext.isDefined(me.valueField)) {
                me.valueField = me.displayField;
            }

            // Add a byValue index to the store so that we can efficiently look up records by the value field
            // when setValue passes string value(s).
            // The two indices (Ext.util.CollectionKeys) are configured unique: false, so that if duplicate keys
            // are found, they are all returned by the get call.
            // This is so that findByText and findByValue are able to return the *FIRST* matching value. By default,
            // if unique is true, CollectionKey keeps the *last* matching value.
            extraKeySpec = {
                byValue: {
                    rootProperty: 'data',
                    unique: false
                }
            };
            extraKeySpec.byValue.property = me.valueField;
            store.setExtraKeys(extraKeySpec);

            if (me.displayField === me.valueField) {
                store.byText = store.byValue;
            } else {
                extraKeySpec.byText = {
                    rootProperty: 'data',
                    unique: false
                };
                extraKeySpec.byText.property = me.displayField;
                store.setExtraKeys(extraKeySpec);
            }

            // We hold a collection of the values which have been selected, keyed by this field's valueField.
            // This collection also functions as the selected items collection for the BoundList's selection model
            valueCollectionConfig = {
                rootProperty: 'data',
                extraKeys: {
                    byInternalId: {
                        property: 'internalId'
                    },
                    byValue: {
                        property: '', // Set below. This is the name of our valueField
                        rootProperty: 'data'
                    }
                },
                // Whenever this collection is changed by anyone, whether by this field adding to it,
                // or the BoundList operating, we must refresh our value.
                listeners: {
                    beginupdate: me.onValueCollectionBeginUpdate,
                    endupdate: me.onValueCollectionEndUpdate,
                    scope: me
                }
            };
            valueCollectionConfig.extraKeys.byValue.property = me.valueField;

            // This becomes our collection of selected records for the Field.
            me.valueCollection = new Ext.util.Collection(valueCollectionConfig);

            // This is the selection model we configure into the dropdown BoundList.
            // We use the selected Collection as our value collection and the basis
            // for rendering the tag list.
            me.pickerSelectionModel = new Ext.selection.DataViewModel({
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE',
                enableInitialSelection: false,
                pruneRemoved: false,
                selected: me.valueCollection,
                store: store
            });

            if (!initial) {
                me.resetToDefault();
            }

            if (picker) {
                picker.setSelectionModel(me.pickerSelectionModel);
                if (picker.getStore() !== store) {
                    picker.bindStore(store);
                }
            }
        }
    },
    
    /**
     * Binds a store to this instance.
     * @param {Ext.data.AbstractStore/String} [store] The store to bind or ID of the store.
     * When no store given (or when `null` or `undefined` passed), unbinds the existing store.
     * @param {Boolean} [preventFilter] `true` to prevent any active filter from being activated
     * on the newly bound store. This is only valid when used with {@link #queryMode} `'local'`.
     */
    bindStore: function(store, preventFilter, /* private */ initial) {
        var me = this,
            filter = me.queryFilter;
            
        me.mixins.storeholder.bindStore.call(me, store, initial);
        store = me.getStore();
        if (store && filter && !preventFilter) {
            store.getFilters().add(filter);
        }
        if (!initial && store) {
            me.setValueOnData();
        }
    },

    getStoreListeners: function() {
        var me = this;

        return {
            datachanged: me.onDataChanged,
            load: me.onLoad,
            exception: me.onException,
            update: me.onStoreUpdate,
            remove: me.checkValueOnChange,
            filterchange: me.checkValueOnChange
        };
    },

    onDataChanged: function() {
        var me = this;

        if (me.grow && me.growToLongestValue) {
            me.autoSize();
        }
    },

    checkValueOnChange: function() {
        var me = this;

        // If multiselecting and the base store is modified, we may have to remove records from the valueCollection
        // if they have gone from the base store, or update the rawValue if selected records are mutated.
        // TODO: 5.1.1: Use a ChainedStore for multiSelect so that selected records are not filtered out of the
        // base store and are able to be removed.
        // See https://sencha.jira.com/browse/EXTJS-16096
        if (me.multiSelect) {
            // TODO: Implement in 5.1.1 when selected records are available for modification and not filtered out.
            // valueCollection must be in sync with what's available in the base store, and rendered rawValue/tags
            // must match any updated data.
        }
        else {
            if (me.forceSelection && !me.changingFilters && !me.findRecordByValue(me.value)) {
                me.setValue(null);
            }
        }
    },

    onStoreUpdate: function(store, record) {
        if (record.get(this.valueField) === this.value) {
            this.setValue(record);
        }
    },

    onException: function() {
        this.collapse();
    },

    onLoad: function(store, records, success) {
        // If not returning from a query, we can attempt to set the value.
        if (success && !(store.lastOptions && 'rawQuery' in store.lastOptions)) {
            this.setValueOnData();
        }
    },

    setValueOnData: function() {
        var me = this;

        // There's no value.
        if (me.value == null) {
            // Highlight the first item in the list if autoSelect: true
            if (me.getStore().getCount()) {
                me.doAutoSelect();
            } else {
                // assign whatever empty value we have to prevent change from firing
                me.setValue(me.value);
            }
        } else {
            me.setValue(me.value);
        }
    },

    /**
     * @private
     * Execute the query with the raw contents within the textfield.
     */
    doRawQuery: function() {
        var me = this,
            rawValue = me.inputEl.dom.value;

        // Use final bit after comma as query value if multiselecting
        if (me.multiSelect) {
            rawValue = rawValue.split(me.delimiter).pop();
        }

        me.doQuery(rawValue, false, true);
    },

    /**
     * Executes a query to filter the dropdown list. Fires the {@link #beforequery} event prior to performing the query
     * allowing the query action to be canceled if needed.
     *
     * @param {String} queryString The string to use to filter available items by matching against the configured {@link #valueField}.
     * @param {Boolean} [forceAll=false] `true` to force the query to execute even if there are currently fewer characters in
     * the field than the minimum specified by the `{@link #minChars}` config option. It also clears any filter
     * previously saved in the current store.
     * @param {Boolean} [rawQuery=false] Pass as true if the raw typed value is being used as the query string. This causes the
     * resulting store load to leave the raw value undisturbed.
     * @return {Boolean} true if the query was permitted to run, false if it was cancelled by a {@link #beforequery}
     * handler.
     */
    doQuery: function(queryString, forceAll, rawQuery) {
        var me = this,

            // Decide if, and how we are going to query the store
            queryPlan = me.beforeQuery({
                query: queryString || '',
                rawQuery: rawQuery,
                forceAll: forceAll,
                combo: me,
                cancel: false
            });

        // Allow veto.
        if (queryPlan !== false && !queryPlan.cancel) {

            // If they're using the same value as last time (and not being asked to query all), just show the dropdown
            if (me.queryCaching && queryPlan.query === me.lastQuery) {
                me.expand();
                if (me.queryMode === 'local') {
                    me.doAutoSelect();
                }
            }

            // Otherwise filter or load the store
            else {
                me.lastQuery = queryPlan.query;

                if (me.queryMode === 'local') {
                    me.doLocalQuery(queryPlan);

                } else {
                    me.doRemoteQuery(queryPlan);
                }
            }
        }

        return true;
    },

    /**
     * @template
     * A method which may modify aspects of how the store is to be filtered (if {@link #queryMode} is `"local"`)
     * of loaded (if {@link #queryMode} is `"remote"`).
     *
     * This is called by the {@link #doQuery method, and may be overridden in subclasses to modify
     * the default behaviour.
     *
     * This method is passed an object containing information about the upcoming query operation which it may modify
     * before returning.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     * the input field value should **not** be overwritten.
     *
     */
    beforeQuery: function(queryPlan) {
        var me = this;

        // Allow beforequery event to veto by returning false
        if (me.fireEvent('beforequery', queryPlan) === false) {
            queryPlan.cancel = true;
        }

        // Allow beforequery event to veto by returning setting the cancel flag
        else if (!queryPlan.cancel) {

            // If the minChars threshold has not been met, and we're not forcing an "all" query, cancel the query
            if (queryPlan.query.length < me.minChars && !queryPlan.forceAll) {
                queryPlan.cancel = true;
            }
        }
        return queryPlan;
    },

    doLocalQuery: function(queryPlan) {
        var me = this,
            queryString = queryPlan.query,
            filters = me.getStore().getFilters(),
            filter = me.queryFilter;

        me.queryFilter = null;
        me.changingFilters = true;
        filters.beginUpdate();
        if (filter) {
            filters.remove(filter);
        }

        // Querying by a string...
        if (queryString) {
            filter = me.queryFilter = new Ext.util.Filter({
                id: me.id + '-filter',
                anyMatch: me.anyMatch,
                caseSensitive: me.caseSensitive,
                root: 'data',
                property: me.displayField,
                value: me.enableRegEx ? new RegExp(queryString) : queryString
            });
            filters.add(filter);
        }
        filters.endUpdate();
        me.changingFilters = false;

        // Expand after adjusting the filter if there are records or if emptyText is configured.
        if (me.store.getCount() || me.getPicker().emptyText) {
            me.expand();
        } else {
            me.collapse();
        }

        me.afterQuery(queryPlan);
    },

    doRemoteQuery: function(queryPlan) {
        var me = this,
            loadCallback = function() {
                if (!me.isDestroyed) {
                    me.afterQuery(queryPlan);
                }
            };

        // expand before loading so LoadMask can position itself correctly
        me.expand();

        // In queryMode: 'remote', we assume Store filters are added by the developer as remote filters,
        // and these are automatically passed as params with every load call, so we do *not* call clearFilter.
        if (me.pageSize) {
            // if we're paging, we've changed the query so start at page 1.
            me.loadPage(1, {
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        } else {
            me.store.load({
                params: me.getParams(queryPlan.query),
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        }
    },

    /**
     * @template
     * A method called when the filtering caused by the {@link #doQuery} call is complete and the store has been
     * either filtered locally (if {@link #queryMode} is `"local"`), or has been loaded using the specified filtering.
     *
     * @param {Object} queryPlan An object containing details about the query was executed.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     * the input field value should **not** be overwritten.
     *
     */
    afterQuery: function(queryPlan) {
        var me = this;

        if (me.store.getCount()) {
            if (me.typeAhead) {
                me.doTypeAhead();
            }

            if (queryPlan.rawQuery) {
                if (me.picker && !me.picker.getSelectionModel().hasSelection()) {
                    me.doAutoSelect();
                }
            } else {
                me.doAutoSelect();
            }
        }

        // doQuery is called upon field mutation, so check for change after the query has done its thing
        me.checkChange();
    },

    loadPage: function(pageNum, options) {
        this.store.loadPage(pageNum, Ext.apply({
            params: this.getParams(this.lastQuery)
        }, options));
    },

    onPageChange: function(toolbar, newPage){
        /*
         * Return false here so we can call load ourselves and inject the query param.
         * We don't want to do this for every store load since the developer may load
         * the store through some other means so we won't add the query param.
         */
        this.loadPage(newPage);
        return false;
    },

    // private
    getParams: function(queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = queryString;
        }
        return params;
    },

    /**
     * @private
     * If the autoSelect config is true, and the picker is open, highlights the first item.
     */
    doAutoSelect: function() {
        var me = this,
            picker = me.picker;

        if (picker && me.autoSelect && me.store.getCount() > 0) {
            // Highlight the last selected item and scroll it into view
            picker.getNavigationModel().setPosition(me.picker.getSelectionModel().lastSelected || 0);
        }
    },

    doTypeAhead: function() {
        var me = this,
            Event = Ext.event.Event;
        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }
        if (me.lastKey !== Event.BACKSPACE && me.lastKey !== Event.DELETE) {
            me.typeAheadTask.delay(me.typeAheadDelay);
        }
    },

    onTriggerClick: function() {
        var me = this;

        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                if (me.triggerAction === 'all') {
                    me.doQuery(me.allQuery, true);
                } else if (me.triggerAction === 'last') {
                    me.doQuery(me.lastQuery, true);
                } else {
                    me.doQuery(me.getRawValue(), false, true);
                }
            }
        }
    },

    onFieldMutation: function(e) {
        var me = this,
            key = e.getKey(),
            isDelete = key === e.BACKSPACE || key === e.DELETE,
            rawValue = me.inputEl.dom.value,
            len = rawValue.length;

        // Do not process two events for the same mutation.
        // For example an input event followed by the keyup that caused it.
        // We must process delete keyups.
        // Also, do not process TAB event which fires on arrival.
        if ((rawValue !== me.lastMutatedValue || isDelete) && key !== e.TAB) {
            me.lastMutatedValue = rawValue;
            me.lastKey = key;
            if (len && (e.type !== 'keyup' || (!e.isSpecialKey() || isDelete))) {
                me.doQueryTask.delay(me.queryDelay);
            } else {
                // We have *erased* back to empty if key is a delete, or it is a non-key event (cut/copy)
                if (!len && (!key || isDelete)) {
                    // Essentially a silent setValue.
                    // Clear our value, and the tplData used to construct a mathing raw value.
                    if (!me.multiSelect) {
                        me.value = null;
                        me.displayTplData = undefined;
                    }
                    // Just erased back to empty. Hide the dropdown.
                    me.collapse();

                    // There may have been a local filter if we were querying locally.
                    // Clear the query filter and suppress the consequences (we do not want a list refresh).
                    if (me.queryFilter) {
                        me.changingFilters = true;
                        me.store.removeFilter(me.queryFilter, true);
                        me.changingFilters = false;
                    }
                }
                me.callParent([e]);
            }
        }
    },

    onDestroy: function() {
        var me = this;

        me.doQueryTask.cancel();
        if (me.typeAheadTask) {
            me.typeAheadTask.cancel();
            me.typeAheadTask = null;
        }

        me.bindStore(null);
        me.valueCollection = Ext.destroy(me.valueCollection);
        me.callParent();
    },

    // The picker (the dropdown) must have its zIndex managed by the same ZIndexManager which is
    // providing the zIndex of our Container.
    onAdded: function() {
        var me = this;
        me.callParent(arguments);
        if (me.picker) {
            me.picker.ownerCt = me.up('[floating]');
            me.picker.registerWithOwnerCt();
        }
    },

    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'boundlist',
                pickerField: me,
                selectionModel: me.pickerSelectionModel,
                floating: true,
                hidden: true,
                store: me.getPickerStore(),
                displayField: me.displayField,
                preserveScrollOnRefresh: true,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        // We limit the height of the picker to fit in the space above
        // or below this field unless the picker has its own ideas about that.
        if (!picker.initialConfig.maxHeight) {
            picker.on({
                beforeshow: me.onBeforePickerShow,
                scope: me
            });
        }
        picker.getSelectionModel().on({
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            scope: me
        });

        picker.getNavigationModel().navigateOnSpace = false;

        return picker;
    },

    getPickerStore: function() {
        return this.store;
    },

    onBeforePickerShow: function(picker) {
    // Just before we show the picker, set its maxHeight so it fits
    // either above or below, it will flip to the side where it fits
        var me = this,
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewportHeight() - heightAbove - me.getHeight();

        // Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
        picker.maxHeight = Math.max(heightAbove, heightBelow) - 5; // have some leeway so we aren't flush against the window edge
    },

    onBeforeSelect: function(list, record, recordIndex) {
        return this.fireEvent('beforeselect', this, record, recordIndex);
    },

    onBeforeDeselect: function(list, record, recordIndex) {
        return this.fireEvent('beforedeselect', this, record, recordIndex);
    },

    getSelection: function() {
        var selModel = this.getPicker().getSelectionModel(),
            selection = selModel.getSelection();

        return selection.length ? selModel.getLastSelected() : null;
    },

    updateSelection: function(selection) {
        var me = this,
            sm;

        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            sm = me.getPicker().getSelectionModel();
            if (selection) {
                sm.select(selection);
            } else {
                sm.deselectAll();
            }
            me.ignoreNextSelection = false;
        }
    },

    updateBindSelection: function(selModel, selection) {
        var me = this,
            selected = null;

        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            if (selection.length) {
                selected = selModel.getLastSelected();
                me.hasHadSelection = true;
            }
            if (me.hasHadSelection) {
                me.setSelection(selected);
            }
            me.ignoreNextSelection = false;
        }
    },

    onValueCollectionBeginUpdate: Ext.emptyFn,

    onValueCollectionEndUpdate: function() {
        var me = this,
            store = me.store,
            selectedRecords = me.valueCollection.getRange(),
            selectedRecord = selectedRecords[0],
            selectionCount = selectedRecords.length;

        me.updateBindSelection(me.pickerSelectionModel, selectedRecords);

        if (me.isSelectionUpdating()) {
            return;
        }

        Ext.suspendLayouts();

        me.updateValue();

        // If we have selected a value, and it's not possible to select any more values
        // or, we are configured to hide the picker each time, then collapse the picker.
        if (selectionCount && ((!me.multiSelect && store.contains(selectedRecord)) || me.collapseOnSelect || !store.getCount())) {
            me.updatingValue = true;
            me.collapse();
            me.updatingValue = false;
        }
        Ext.resumeLayouts(true);
        if (selectionCount && !me.suspendCheckChange) {
            if (!me.multiSelect) {
                selectedRecords = selectedRecord;
            }
            me.fireEvent('select', me, selectedRecords);
        }
    },

    isSelectionUpdating: function() {
        var selModel = this.pickerSelectionModel;
        return selModel.deselectingDuringSelect || selModel.refreshing;
    },

    /**
     * @private
     * Enables the key navs for the BoundList when it is expanded.
     */
    onExpand: function() {
        var keyNav = this.getPicker().getNavigationModel();
        if (keyNav) {
            keyNav.enable();
        }
    },

    /**
     * @private
     * Disables the key navs for the BoundList when it is collapsed.
     */
    onCollapse: function() {
        var keyNav = this.getPicker().getNavigationModel();
        if (keyNav) {
            keyNav.disable();
        }
        if (this.updatingValue) {
            this.doQueryTask.cancel();
        }
    },

    /**
     * Selects an item by a {@link Ext.data.Model Model}, or by a key value.
     * @param {Object} r
     */
    select: function(r, /* private */ assert) {
        var me = this,
            picker = me.picker,
            fireSelect;

        if (r && r.isModel && assert === true && picker) {
            fireSelect = !picker.getSelectionModel().isSelected(r);
        }

        if (!fireSelect) {
            me.suspendEvent('select');
        }
        me.setValue(r);
        me.resumeEvent('select');
    },

    /**
     * Finds the record by searching for a specific field/value combination.
     * @param {String} field The name of the field to test.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecord: function(field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },
    
    getSelectedRecord: function() {
        return this.findRecordByValue(this.value) || null;
    },

    /**
     * Finds the record by searching values in the {@link #valueField}.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecordByValue: function(value) {
        var result = this.store.byValue.get(value);

        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            return result[0] || result;
        }
    },

    /**
     * Finds the record by searching values in the {@link #displayField}.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecordByDisplay: function(value) {
        var result = this.store.byText.get(value);

        // If there are duplicate keys, tested behaviour is to return the *first* match.
        if (result) {
            return result[0] || result;
        }
    },

    /**
     * Adds a value or values to the current value of the field
     * @param {Mixed} value The value or values to add to the current value, see {@link #setValue}
     */
    addValue: function(value) {
        return this.doSetValue(value, true);
    },

    /**
     * Sets the specified value(s) into the field. For each value, if a record is found in the {@link #store} that
     * matches based on the {@link #valueField}, then that record's {@link #displayField} will be displayed in the
     * field. If no match is found, and the {@link #valueNotFoundText} config option is defined, then that will be
     * displayed as the default field text. Otherwise a blank value will be shown, although the value will still be set.
     * @param {String/String[]} value The value(s) to be set. Can be either a single String or {@link Ext.data.Model},
     * or an Array of Strings or Models.
     * @return {Ext.form.field.Field} this
     */
    setValue: function(value) {
        return this.doSetValue(value);
    },

    // private implementation to set or add a value/values
    doSetValue: function(value /* private for use by addValue */, add) {
        var me = this,
            store = me.getStore(),
            Model = store.getModel(),
            matchedRecords = [],
            valueArray = [],
            key,
            autoLoadOnValue = me.autoLoadOnValue,
            isLoaded = store.getCount() > 0 || store.isLoaded(),
            pendingLoad = store.hasPendingLoad(),
            unloaded = autoLoadOnValue && !isLoaded && !pendingLoad,
            forceSelection = me.forceSelection,
            selModel = me.pickerSelectionModel,
            displayTplData = me.displayTplData || (me.displayTplData = []),
            displayIsValue = me.displayField === me.valueField,
            i, len, record, dataObj, raw;

        //<debug>
        if (add && !me.multiSelect) {
            Ext.Error.raise('Cannot add values to non muiltiSelect ComboBox');
        }
        //</debug>

        // Called while the Store is loading or we don't have the real store bound yet.
        // Ensure it is processed by the onLoad/bindStore. If displayField === valueField, then
        // there is no point entering this branch because whatever we're setting will be "correct" when
        // the store loads.
        if (value != null && !displayIsValue && (pendingLoad || unloaded || !isLoaded || store.isEmptyStore)) {
            if (value.isModel) {
                displayTplData.length = 0;
                displayTplData.push(value.data);
                raw = me.getDisplayValue();
            }
            
            if (add) {
                me.value = Ext.Array.from(me.value).concat(value);
            } else {
                if (value.isModel) {
                    value = value.get(me.valueField);
                }
                me.value = value;
            }

            me.setHiddenValue(me.value);
            // If we have a model, show the display value from that, otherwise we can't
            // know what it will be, so empty it out
            me.setRawValue(raw || '');

            if (unloaded && store.getProxy().isRemote) {
                store.load();
            }

            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = add ? Ext.Array.from(me.value).concat(value) : Ext.Array.from(value);

        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];

            // Set value was a key, look up in the store by that key
            if (!record || !record.isModel) {
                record = me.findRecordByValue(key = record);

                // The value might be in a new record created from an unknown value (if !me.forceSelection).
                // Or it could be a picked record which is filtered out of the main store.
                if (!record) {
                    record = me.valueCollection.find(me.valueField, key);
                }
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            if (!record) {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a new record to push as a display value for use by the displayTpl
                if (!forceSelection) {
                    if (!record) {
                        dataObj = {};
                        dataObj[me.displayField] = value[i];
                        if (me.valueField && me.displayField !== me.valueField) {
                            dataObj[me.valueField] = value[i];
                        }
                        record = new Model(dataObj);
                    }
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (me.valueNotFoundRecord) {
                    record = me.valueNotFoundRecord;
                }
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                valueArray.push(record.get(me.valueField));
            }
        }

        me.lastSelection = matchedRecords;

        // beginUpdate which means we only want to notify this.onValueCollectionEndUpdate after it's all changed.
        me.suspendEvent('select');
        me.valueCollection.beginUpdate();
        if (matchedRecords.length) {
            selModel.select(matchedRecords, false);
        } else {
            selModel.deselectAll();
        }
        me.valueCollection.endUpdate();
        me.resumeEvent('select');

        return me;
    },

    // Private internal setting of value when records are added to the valueCollection
    // setValue itself adds to the valueCollection.
    updateValue: function() {
        var me = this,
            selectedRecords = me.valueCollection.getRange(),
            len = selectedRecords.length,
            valueArray = [],
            displayTplData = me.displayTplData || (me.displayTplData = []),
            inputEl = me.inputEl,
            i, record;

        // Loop through values, matching each from the Store, and collecting matched records
        displayTplData.length = 0;
        for (i = 0; i < len; i++) {
            record = selectedRecords[i];
            displayTplData.push(record.data);

            // There might be the bogus "value not found" record if forceSelect was set. Do not include this in the value.
            if (record !== me.valueNotFoundRecord) {
                valueArray.push(record.get(me.valueField));
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(valueArray);
        me.value = me.multiSelect ? valueArray : valueArray[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method

        if (inputEl && me.emptyText && !Ext.isEmpty(me.value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        me.applyEmptyText();
    },

    /**
     * @private
     * Set the value of {@link #hiddenDataEl}
     * Dynamically adds and removes input[type=hidden] elements
     */
    setHiddenValue: function(values){
        var me = this,
            name = me.hiddenName,
            i,
            dom, childNodes, input, valueCount, childrenCount;

        if (!me.hiddenDataEl || !name) {
            return;
        }
        values = Ext.Array.from(values);
        dom = me.hiddenDataEl.dom;
        childNodes = dom.childNodes;
        input = childNodes[0];
        valueCount = values.length;
        childrenCount = childNodes.length;

        if (!input && valueCount > 0) {
            me.hiddenDataEl.setHtml(Ext.DomHelper.markup({
                tag: 'input',
                type: 'hidden',
                name: name
            }));
            childrenCount = 1;
            input = dom.firstChild;
        }
        while (childrenCount > valueCount) {
            dom.removeChild(childNodes[0]);
            -- childrenCount;
        }
        while (childrenCount < valueCount) {
            dom.appendChild(input.cloneNode(true));
            ++ childrenCount;
        }
        for (i = 0; i < valueCount; i++) {
            childNodes[i].value = values[i];
        }
    },

    /**
     * @private Generates the string value to be displayed in the text field for the currently stored value
     */
    getDisplayValue: function() {
        return this.displayTpl.apply(this.displayTplData);
    },

    getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

        if (me.getDisplayValue() !== rawValue) {
            me.displayTplData = undefined;
            if (picker) {
                // We do not need to hear about this clearing out of the value collection,
                // so suspend events.
                me.valueCollection.suspendEvents();
                picker.getSelectionModel().deselectAll();
                me.valueCollection.resumeEvents();
            }
            // If the raw input value gets out of sync in a multiple ComboBox, then we have to give up.
            // Multiple is not designed for typing *and* displaying the comma separated result of selection.
            // Same in the case of forceSelection.
            if (me.multiSelect || me.forceSelection) {
                value = me.value = undefined;
            } else {
                value = me.value = rawValue;
            }
        }

        // Return null if value is undefined/null, not falsy.
        me.value = value == null ? null : value;
        return me.value;
    },

    getSubmitValue: function() {
        var value = this.getValue();
        // If the value is null/undefined, we still return an empty string. If we
        // don't, the field will never get posted to the server since nulls are ignored.
        if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },

    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            i, len;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for(i = 0; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }

        return true;
    },

    /**
     * Clears any value currently set in the ComboBox.
     */
    clearValue: function() {
        this.setValue([]);
    },

    onEditorTab: function(e){
        var keyNav = this.getPicker().getNavigationModel();

        if (this.selectOnTab && keyNav && this.isExpanded) {
            keyNav.selectHighlighted(e);
        }
    }
});
