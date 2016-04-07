/**
 * Most of the visual classes you interact with are Components. Every Component is a
 * subclass of Ext.Component, which means they can all:
 *
 * * Render themselves onto the page using a template
 * * Show and hide themselves at any time
 * * Center themselves on the screen
 * * Enable and disable themselves
 *
 * They can also do a few more advanced things:
 *
 * * Float above other components (windows, message boxes and overlays)
 * * Change size and position on the screen with animation
 * * Dock other Components inside themselves (useful for toolbars)
 * * Align to other components, allow themselves to be dragged around, make their content scrollable & more
 *
 * ## Available Components
 *
 * There are many components.  They are separated into 4 main groups:
 *
 * ### Navigation components
 * * {@link Ext.Toolbar}
 * * {@link Ext.Button}
 * * {@link Ext.TitleBar}
 * * {@link Ext.SegmentedButton}
 * * {@link Ext.Title}
 * * {@link Ext.Spacer}
 *
 * ### Store-bound components
 * * {@link Ext.dataview.DataView}
 * * {@link Ext.Carousel}
 * * {@link Ext.List}
 * * {@link Ext.NestedList}
 *
 * ### Form components
 * * {@link Ext.form.Panel}
 * * {@link Ext.form.FieldSet}
 * * {@link Ext.field.Checkbox}
 * * {@link Ext.field.Hidden}
 * * {@link Ext.field.Slider}
 * * {@link Ext.field.Text}
 * * {@link Ext.picker.Picker}
 * * {@link Ext.picker.Date}
 *
 * ### General components
 * * {@link Ext.Panel}
 * * {@link Ext.tab.Panel}
 * * {@link Ext.Viewport Ext.Viewport}
 * * {@link Ext.Img}
 * * {@link Ext.Map}
 * * {@link Ext.Audio}
 * * {@link Ext.Video}
 * * {@link Ext.Sheet}
 * * {@link Ext.ActionSheet}
 * * {@link Ext.MessageBox}
 *
 *
 * ## Instantiating Components
 *
 * Components are created the same way as all other classes - using Ext.create. Here's how we can
 * create a Text field:
 *
 *     var panel = Ext.create('Ext.Panel', {
 *         html: 'This is my panel'
 *     });
 *
 * This will create a {@link Ext.Panel Panel} instance, configured with some basic HTML content. A Panel is just a
 * simple Component that can render HTML and also contain other items. In this case we've created a Panel instance but
 * it won't show up on the screen yet because items are not rendered immediately after being instantiated. This allows
 * us to create some components and move them around before rendering and laying them out, which is a good deal faster
 * than moving them after rendering.
 *
 * To show this panel on the screen now we can simply add it to the global Viewport:
 *
 *     Ext.Viewport.add(panel);
 *
 * Panels are also Containers, which means they can contain other Components, arranged by a layout. Let's revisit the
 * above example now, this time creating a panel with two child Components and a hbox layout:
 *
 *     @example
 *     var panel = Ext.create('Ext.Panel', {
 *         layout: 'hbox',
 *
 *         items: [
 *             {
 *                 xtype: 'panel',
 *                 flex: 1,
 *                 html: 'Left Panel, 1/3rd of total size',
 *                  style: 'background-color: #5E99CC;'
 *             },
 *             {
 *                 xtype: 'panel',
 *                 flex: 2,
 *                 html: 'Right Panel, 2/3rds of total size',
 *                  style: 'background-color: #759E60;'
 *             }
 *         ]
 *     });
 *
 *     Ext.Viewport.add(panel);
 *
 * This time we created 3 Panels - the first one is created just as before but the inner two are declared inline using
 * an xtype. Xtype is a convenient way of creating Components without having to go through the process of using
 * Ext.create and specifying the full class name, instead you can just provide the xtype for the class inside an object
 * and the framework will create the components for you.
 *
 * We also specified a layout for the top level panel - in this case hbox, which splits the horizontal width of the
 * parent panel based on the 'flex' of each child. For example, if the parent Panel above is 300px wide then the first
 * child will be flexed to 100px wide and the second to 200px because the first one was given `flex: 1` and the second
 * `flex: 2`.
 *
 * ## Using xtype
 *
 * xtype is an easy way to create Components without using the full class name. This is especially useful when creating
 * a {@link Ext.Container Container} that contains child Components. An xtype is simply a shorthand way of specifying a
 * Component - for example you can use `xtype: 'panel'` instead of typing out Ext.panel.Panel.
 *
 * Sample usage:
 *
 *     @example miniphone
 *     Ext.create('Ext.Container', {
 *         fullscreen: true,
 *         layout: 'fit',
 *
 *         items: [
 *             {
 *                 xtype: 'panel',
 *                 html: 'This panel is created by xtype'
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 title: 'So is the toolbar',
 *                 docked: 'top'
 *             }
 *         ]
 *     });
 *
 *
 * ### Common xtypes
 *
 * <pre>
 xtype                   Class
 -----------------       ---------------------
 actionsheet             Ext.ActionSheet
 audio                   Ext.Audio
 button                  Ext.Button
 image                   Ext.Img
 label                   Ext.Label
 loadmask                Ext.LoadMask
 map                     Ext.Map
 panel                   Ext.Panel
 segmentedbutton         Ext.SegmentedButton
 sheet                   Ext.Sheet
 spacer                  Ext.Spacer
 titlebar                Ext.TitleBar
 toolbar                 Ext.Toolbar
 video                   Ext.Video
 carousel                Ext.carousel.Carousel
 navigationview          Ext.navigation.View
 datepicker              Ext.picker.Date
 picker                  Ext.picker.Picker
 slider                  Ext.slider.Slider
 thumb                   Ext.slider.Thumb
 tabpanel                Ext.tab.Panel
 viewport                Ext.viewport.Default

 DataView Components
 ---------------------------------------------
 dataview                Ext.dataview.DataView
 list                    Ext.dataview.List
 nestedlist              Ext.dataview.NestedList

 Form Components
 ---------------------------------------------
 checkboxfield           Ext.field.Checkbox
 datepickerfield         Ext.field.DatePicker
 emailfield              Ext.field.Email
 hiddenfield             Ext.field.Hidden
 numberfield             Ext.field.Number
 passwordfield           Ext.field.Password
 radiofield              Ext.field.Radio
 searchfield             Ext.field.Search
 selectfield             Ext.field.Select
 sliderfield             Ext.field.Slider
 spinnerfield            Ext.field.Spinner
 textfield               Ext.field.Text
 textareafield           Ext.field.TextArea
 togglefield             Ext.field.Toggle
 urlfield                Ext.field.Url
 fieldset                Ext.form.FieldSet
 formpanel               Ext.form.Panel
 * </pre>
 *
 * ## Configuring Components
 *
 * Whenever you create a new Component you can pass in configuration options. All of the configurations for a given
 * Component are listed in the "Config options" section of its class docs page. You can pass in any number of
 * configuration options when you instantiate the Component, and modify any of them at any point later. For example, we
 * can easily modify the {@link Ext.Panel#html html content} of a Panel after creating it:
 *
 *     @example miniphone
 *     // we can configure the HTML when we instantiate the Component
 *     var panel = Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *         html: 'This is a Panel'
 *     });
 *
 *     // we can update the HTML later using the setHtml method:
 *     panel.setHtml('Some new HTML');
 *
 *     // we can retrieve the current HTML using the getHtml method:
 *     Ext.Msg.alert(panel.getHtml()); // displays "Some new HTML"
 *
 * Every config has a getter method and a setter method - these are automatically generated and always follow the same
 * pattern. For example, a config called `html` will receive `getHtml` and `setHtml` methods, a config called `defaultType`
 * will receive `getDefaultType` and `setDefaultType` methods, and so on.
 */
Ext.define('Ext.Component', {
    extend: 'Ext.Widget',

    alternateClassName: 'Ext.lib.Component',

    mixins: [
        'Ext.mixin.Traversable'
    ],

    requires: [
        'Ext.ComponentManager',
        'Ext.ComponentQuery',
        'Ext.XTemplate',
        'Ext.scroll.Scroller',
        'Ext.scroll.TouchScroller',
        'Ext.scroll.DomScroller',
        'Ext.behavior.Translatable',
        'Ext.behavior.Draggable'
    ],

    /**
     * @cfg {String} xtype
     * The `xtype` configuration option can be used to optimize Component creation and rendering. It serves as a
     * shortcut to the full component name. For example, the component `Ext.button.Button` has an xtype of `button`.
     *
     * You can define your own xtype on a custom {@link Ext.Component component} by specifying the
     * {@link Ext.Class#alias alias} config option with a prefix of `widget`. For example:
     *
     *     Ext.define('PressMeButton', {
     *         extend: 'Ext.button.Button',
     *         alias: 'widget.pressmebutton',
     *         text: 'Press Me'
     *     });
     *
     * Any Component can be created implicitly as an object config with an xtype specified, allowing it to be
     * declared and passed into the rendering pipeline without actually being instantiated as an object. Not only is
     * rendering deferred, but the actual creation of the object itself is also deferred, saving memory and resources
     * until they are actually needed. In complex, nested layouts containing many Components, this can make a
     * noticeable improvement in performance.
     *
     *     // Explicit creation of contained Components:
     *     var panel = new Ext.Panel({
     *        // ...
     *        items: [
     *           Ext.create('Ext.button.Button', {
     *              text: 'OK'
     *           })
     *        ]
     *     });
     *
     *     // Implicit creation using xtype:
     *     var panel = new Ext.Panel({
     *        // ...
     *        items: [{
     *           xtype: 'button',
     *           text: 'OK'
     *        }]
     *     });
     *
     * In the first example, the button will always be created immediately during the panel's initialization. With
     * many added Components, this approach could potentially slow the rendering of the page. In the second example,
     * the button will not be created or rendered until the panel is actually displayed in the browser. If the panel
     * is never displayed (for example, if it is a tab that remains hidden) then the button will never be created and
     * will never consume any resources whatsoever.
     */
    xtype: 'component',

    cachedConfig: {
        /**
         * @cfg {String} baseCls
         * The base CSS class to apply to this component's element. This will also be prepended to
         * other elements within this component. To add specific styling for sub-classes, use the {@link #cls} config.
         * @accessor
         */
        baseCls: null,

        /**
         * @cfg {String/String[]} cls The CSS class to add to this component's element, in
         * addition to the {@link #baseCls}. In many cases, this property will be specified
         * by the derived component class. See {@link #userCls} for adding additional CSS
         * classes to component instances (such as items in a {@link Ext.Container}).
         * @accessor
         */
        cls: null,

        /**
         * @cfg {String} [floatingCls="x-floating"] The CSS class to add to this component when it is floatable.
         * @accessor
         */
        floatingCls: Ext.baseCSSPrefix + 'floating',

        /**
         * @cfg {String} [hiddenCls="x-item-hidden"] The CSS class to add to the component when it is hidden
         * @accessor
         */
        hiddenCls: Ext.baseCSSPrefix + 'item-hidden',

        /**
         * @cfg {String} ui The ui to be used on this Component
         */
        ui: null,

        /**
         * @cfg {Number/String} margin The margin to use on this Component. Can be specified as a number (in which case
         * all edges get the same margin) or a CSS string like '5 10 10 10'
         * @accessor
         */
        margin: null,

        /**
         * @cfg {Number/String} padding The padding to use on this Component. Can be specified as a number (in which
         * case all edges get the same padding) or a CSS string like '5 10 10 10'
         * @accessor
         */
        padding: null,

        /**
         * @cfg {Boolean} border Enables or disables bordering on this component.
         * The following values are accepted:
         *
         * - `null` or `true (default): Do nothing and allow the border to be specified by the theme.
         * - `false`: suppress the default border provided by the theme.
         *
         * Please note that enabling bordering via this config will not add a `border-color`
         * or `border-style` CSS property to the component; you provide the `border-color`
         * and `border-style` via CSS rule or {@link #style} configuration
         * (if not already provide by the theme).
         *
         * ## Using {@link #style}:
         *
         *     Ext.Viewport.add({
         *         centered: true,
         *         width: 100,
         *         height: 100,
         *
         *         style: 'border: 1px solid blue;'
         *         // ...
         *     });
         *
         * ## Using CSS:
         *
         *     Ext.Viewport.add({
         *         centered: true,
         *         width: 100,
         *         height: 100,
         *
         *         cls: 'my-component'
         *         // ...
         *     });
         *
         * And your CSS file:
         *
         *     .my-component {
         *         border: 1px solid red;
         *     }
         *
         * @accessor
         */
        border: null,

        /**
         * @cfg {String} [styleHtmlCls="x-html"]
         * The class that is added to the content target when you set `styleHtmlContent` to `true`.
         * @accessor
         */
        styleHtmlCls: Ext.baseCSSPrefix + 'html',

        /**
         * @cfg {Boolean} [styleHtmlContent=false]
         * `true` to automatically style the HTML inside the content target of this component (body for panels).
         * @accessor
         */
        styleHtmlContent: null
    },

    eventedConfig: {
        /**
         * @cfg {Number/String} left
         * The absolute left position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'floating', which means its layout will no
         * longer be affected by the Container that it resides in.
         * @accessor
         * @evented
         */
        left: null,

        /**
         * @cfg {Number/String} top
         * The absolute top position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'floating', which means its layout will no
         * longer be affected by the Container that it resides in.
         * @accessor
         * @evented
         */
        top: null,

        /**
         * @cfg {Number/String} right
         * The absolute right position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'floating', which means its layout will no
         * longer be affected by the Container that it resides in.
         * @accessor
         * @evented
         */
        right: null,

        /**
         * @cfg {Number/String} bottom
         * The absolute bottom position of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * Explicitly setting this value will make this Component become 'floating', which means its layout will no
         * longer be affected by the Container that it resides in.
         * @accessor
         * @evented
         */
        bottom: null,

        /**
         * @cfg {Number/String} minWidth
         * The minimum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        minWidth: null,

        /**
         * @cfg {Number/String} minHeight
         * The minimum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * @accessor
         * @evented
         */
        minHeight: null,

        /**
         * @cfg {Number/String} maxWidth
         * The maximum width of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * Note that this config will not apply if the Component is 'floating' (absolutely positioned or centered)
         * @accessor
         * @evented
         */
        maxWidth: null,

        /**
         * @cfg {Number/String} maxHeight
         * The maximum height of this Component; must be a valid CSS length value, e.g: `300`, `100px`, `30%`, etc.
         * If set to `auto`, it will set the width to `null` meaning it will have its own natural size.
         * Note that this config will not apply if the Component is 'floating' (absolutely positioned or centered)
         * @accessor
         * @evented
         */
        maxHeight: null,

        /**
         * @cfg {Boolean/String/Object} scrollable
         * Configuration options to make this Component scrollable. Acceptable values are:
         *
         * - `true` to enable auto scrolling.
         * - `false` (or `null`) to disable scrolling - this is the default.
         * - `x` or `horizontal` to enable horizontal scrolling only
         * - `y` or `vertical` to enable vertical scrolling only
         *
         * Also accepts a configuration object for a `{@link Ext.scroll.Scroller}` if
         * if advanced configuration is needed.
         *
         * The getter for this config returns the {@link Ext.scroll.Scroller Scroller}
         * instance.  You can use the Scroller API to read or manipulate the scroll position:
         *
         *     // scrolls the component to 5 on the x axis and 10 on the y axis
         *     component.getScrollable().scrollTo(5, 10);
         *
         * @accessor
         * @evented
         */
        scrollable: null,

        /**
         * @cfg {String} docked
         * The dock position of this component in its container. Can be `left`, `top`, `right` or `bottom`.
         *
         * __Notes__
         *
         * You must use a HTML5 doctype for {@link #docked} `bottom` to work. To do this, simply add the following code to the HTML file:
         *
         *     <!doctype html>
         *
         * So your index.html file should look a little like this:
         *
         *     <!doctype html>
         *     <html>
         *         <head>
         *             <title>MY application title</title>
         *             ...
         *
         * @accessor
         * @evented
         */
        docked: null,

        /**
         * @cfg {Boolean} centered
         * Whether or not this Component is absolutely centered inside its Container
         * @accessor
         * @evented
         */
        centered: null,

        /**
         * @cfg {Boolean} hidden
         * Whether or not this Component is hidden (its CSS `display` property is set to `none`)
         * @accessor
         * @evented
         */
        hidden: null,

        /**
         * @cfg {Boolean} disabled
         * Whether or not this component is disabled
         * @accessor
         * @evented
         */
        disabled: null
    },

    config: {
        /**
         * @cfg {String/Ext.Element/HTMLElement} html Optional HTML content to render inside this Component, or a reference
         * to an existing element on the page.
         * @accessor
         */
        html: null,

        /**
         * @cfg {Object} draggable Configuration options to make this Component draggable
         * @accessor
         */
        draggable: null,

        /**
         * @cfg {Object} translatable
         * @private
         * @accessor
         */
        translatable: null,

        /**
         * @cfg {Ext.Element} renderTo Optional element to render this Component to. Usually this is not needed because
         * a Component is normally full screen or automatically rendered inside another {@link Ext.Container Container}
         * @accessor
         */
        renderTo: null,

        /**
         * @cfg {Number} zIndex The z-index to give this Component when it is rendered
         * @accessor
         */
        zIndex: null,

        /**
         * @cfg {String/String[]/Ext.Template/Ext.XTemplate[]} tpl
         * A {@link String}, {@link Ext.Template}, {@link Ext.XTemplate} or an {@link Array} of strings to form an {@link Ext.XTemplate}.
         * Used in conjunction with the {@link #data} and {@link #tplWriteMode} configurations.
         *
         * __Note__
         * The {@link #data} configuration _must_ be set for any content to be shown in the component when using this configuration.
         * @accessor
         */
        tpl: null,

        /**
         * @cfg {String/Mixed} enterAnimation
         * Animation effect to apply when the Component is being shown.  Typically you want to use an
         * inbound animation type such as 'fadeIn' or 'slideIn'.
         * @deprecated 2.0.0 Please use {@link #showAnimation} instead.
         * @accessor
         */
        enterAnimation: null,

        /**
         * @cfg {String/Mixed} exitAnimation
         * Animation effect to apply when the Component is being hidden.
         * @deprecated 2.0.0 Please use {@link #hideAnimation} instead.  Typically you want to use an
         * outbound animation type such as 'fadeOut' or 'slideOut'.
         * @accessor
         */
        exitAnimation: null,

        /**
         * @cfg {String/Mixed} showAnimation
         * Animation effect to apply when the Component is being shown.  Typically you want to use an
         * inbound animation type such as 'fadeIn' or 'slideIn'. For more animations, check the {@link Ext.fx.Animation#type} config.
         * @accessor
         */
        showAnimation: null,

        /**
         * @cfg {String/Mixed} hideAnimation
         * Animation effect to apply when the Component is being hidden.  Typically you want to use an
         * outbound animation type such as 'fadeOut' or 'slideOut'. For more animations, check the {@link Ext.fx.Animation#type} config.
         * @accessor
         */
        hideAnimation: null,

        /**
         * @cfg {String} tplWriteMode The Ext.(X)Template method to use when
         * updating the content area of the Component.
         * Valid modes are:
         *
         * - append
         * - insertAfter
         * - insertBefore
         * - insertFirst
         * - overwrite
         * @accessor
         */
        tplWriteMode: 'overwrite',

        /**
         * @cfg {Object} data
         * The initial set of data to apply to the `{@link #tpl}` to
         * update the content area of the Component.
         * @accessor
         */
        data: null,

        /**
         * @cfg {String} [disabledCls="x-item-disabled"] The CSS class to add to the component when it is disabled
         * @accessor
         */
        disabledCls: Ext.baseCSSPrefix + 'item-disabled',

        /**
         * @cfg {Ext.Element/HTMLElement/String} contentEl The configured element will automatically be
         * added as the content of this component. When you pass a string, we expect it to be an element id.
         * If the content element is hidden, we will automatically show it.
         * @accessor
         */
        contentEl: null,

        /**
         * @cfg {Ext.data.Model} record A model instance which updates the Component's html based on it's tpl. Similar to the data
         * configuration, but tied to to a record to make allow dynamic updates.  This must be a model
         * instance and not a configuration of one.
         * @accessor
         */
        record: null,

        /**
         * @cfg {Object/Array} plugins
         * @accessor
         * An object or array of objects that will provide custom functionality for this component.  The only
         * requirement for a valid plugin is that it contain an init method that accepts a reference of type Ext.Component.
         *
         * When a component is created, if any plugins are available, the component will call the init method on each
         * plugin, passing a reference to itself.  Each plugin can then call methods or respond to events on the
         * component as needed to provide its functionality.
         *
         * For examples of plugins, see Ext.plugin.PullRefresh and Ext.plugin.ListPaging
         *
         * ## Example code
         *
         * A plugin by alias:
         *
         *     Ext.create('Ext.dataview.List', {
         *         config: {
         *             plugins: 'listpaging',
         *             itemTpl: '<div class="item">{title}</div>',
         *             store: 'Items'
         *         }
         *     });
         *
         * Multiple plugins by alias:
         *
         *     Ext.create('Ext.dataview.List', {
         *         config: {
         *             plugins: ['listpaging', 'pullrefresh'],
         *             itemTpl: '<div class="item">{title}</div>',
         *             store: 'Items'
         *         }
         *     });
         *
         * Single plugin by class name with config options:
         *
         *     Ext.create('Ext.dataview.List', {
         *         config: {
         *             plugins: {
         *                 xclass: 'Ext.plugin.ListPaging', // Reference plugin by class
         *                 autoPaging: true
         *             },
         *
         *             itemTpl: '<div class="item">{title}</div>',
         *             store: 'Items'
         *         }
         *     });
         *
         * Multiple plugins by class name with config options:
         *
         *     Ext.create('Ext.dataview.List', {
         *         config: {
         *             plugins: [
         *                 {
         *                     xclass: 'Ext.plugin.PullRefresh',
         *                     pullRefreshText: 'Pull to refresh...'
         *                 },
         *                 {
         *                     xclass: 'Ext.plugin.ListPaging',
         *                     autoPaging: true
         *                 }
         *             ],
         *
         *             itemTpl: '<div class="item">{title}</div>',
         *             store: 'Items'
         *         }
         *     });
         *
         */
        plugins: null,

        /**
         * @private
         */
        useBodyElement: null
    },

    /**
     * @event show
     * Fires whenever the Component is shown
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event hide
     * Fires whenever the Component is hidden
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event fullscreen
     * Fires whenever a Component with the fullscreen config is instantiated
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event floatingchange
     * Fires whenever there is a change in the floating status of a component
     * @param {Ext.Component} this The component instance
     * @param {Boolean} floating The component's new floating state
     */

    /**
     * @event destroy
     * Fires when the component is destroyed
     */

    /**
     * @event beforeorientationchange
     * Fires before orientation changes.
     * @removed 2.0.0 This event is now only available `onBefore` the Viewport's {@link Ext.Viewport#orientationchange}
     */

    /**
     * @event orientationchange
     * Fires when orientation changes.
     * @removed 2.0.0 This event is now only available on the Viewport's {@link Ext.Viewport#orientationchange}
     */

    /**
     * @event initialize
     * Fires when the component has been initialized
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event painted
     * @inheritdoc Ext.dom.Element#painted
     * @param {Ext.Element} element The component's outer element (this.element)
     */

    /**
     * @event erased
     * Fires when the component is no longer displayed in the DOM.  Listening to this event will
     * degrade performance not recommend for general use.
     * @param {Ext.Component} this The component instance
     */

    /**
     * @event resize
     * @inheritdoc Ext.dom.Element#resize
     * @param {Ext.Element} element The component's outer element (this.element)
     */

    /**
     * @event added
     * Fires after a Component had been added to a Container.
     * @param {Ext.Component} this
     * @param {Ext.Container} container Parent Container
     * @param {Number} index The index of the item within the Container.
     */

    /**
     * @event removed
     * Fires when a component is removed from a Container
     * @param {Ext.Component} this
     * @param {Ext.Container} container Container which holds the component
     * @param {Number} index The index of the item that was removed.
     */

    /**
     * @event moved
     * Fires when a component si moved within its Container.
     * @param {Ext.Component} this
     * @param {Ext.Container} container Container which holds the component
     * @param {Number} toIndex The new index of the item.
     * @param {Number} fromIndex The old index of the item.
     */
    
    /**
     * @inheritdoc
     */
    defaultBindProperty: 'html',

    /**
     * @private
     */
    alignmentRegex: /^([a-z]+)-([a-z]+)(\?)?$/,

    /**
     * @private
     */
    isComponent: true,

    /**
     * @private
     */
    floating: false,

    /**
     * @private
     */
    rendered: false,

    /**
     * @private
     */
    isInner: true,

    /**
     * @private
     */
    activeAnimation: null,

    /**
     * @readonly
     * @private
     */
    dockPositions: {
        top: true,
        right: true,
        bottom: true,
        left: true
    },

    innerElement: null,

    element: {
        reference: 'element',
        classList: ['x-unsized']
    },

    widthLayoutSized: false,

    heightLayoutSized: false,

    layoutStretched: false,

    sizeState: false,

    sizeFlags: 0x0,

    LAYOUT_WIDTH: 0x1,

    LAYOUT_HEIGHT: 0x2,

    LAYOUT_BOTH: 0x3,

    LAYOUT_STRETCHED: 0x4,

    _scrollableCfg: {
        x: {
            x: true,
            y: false
        },
        y: {
            x: false,
            y: true
        },
        horizontal: {
            x: true,
            y: false
        },
        vertical: {
            x: false,
            y: true
        },
        both: {
            x: true,
            y: true
        },
        'true': {
            x: true,
            y: true
        }
    },

    statics: {
        /**
         * Find the Widget or Component to which the given Element belongs.
         *
         * @param {Ext.dom.Element/HTMLElement} el The element from which to start to find an owning Component.
         * @param {Ext.dom.Element/HTMLElement} [limit] The element at which to stop upward searching for an
         * owning Component, or the number of Components to traverse before giving up.
         * Defaults to the document's HTML element.
         * @param {String} [selector] An optional {@link Ext.ComponentQuery} selector to filter the target.
         * @return {Ext.Component/null} Component, or null
         *
         * @since 6.0.1
         */
        fromElement: function(node, limit, selector) {
            return Ext.ComponentManager.fromElement(node, limit, selector);
        }
    },

    initialConfig: null,
    $initParent: null,

    /**
     * Creates new Component.
     * @param {Object} config The standard configuration object.
     */
    constructor: function(config) {
        var me = this,
            plugins = config && config.plugins,
            responsive = 'responsive',
            i, p;

        me.onInitializedListeners = [];

        if (config) {
            me.initialConfig = config;
            // We need to copy this over here and not rely on initConfig to do so since
            // configs (esp cached configs like "ui") can be set() prior to copying of
            // such properties.
            me.$initParent = config.$initParent;
        }

        // The Responsive plugin must be created before initConfig runs in order to
        // process the initial responsiveConfig block. The simplest and safest solution
        // is to accelerate the creation of this plugin here and leave the timing as it
        // has always been for other plugins.
        if (plugins) {
            plugins = Ext.Array.from(plugins);

            for (i = plugins.length; i-- > 0; ) {
                p = plugins[i];

                if (p === responsive || p.type === responsive) {
                    me.initialConfig = config = Ext.apply({}, config);
                    config.plugins = plugins = plugins.slice(0);

                    // Put the instance in the plugins array so it will be included in
                    // the applyPlugins loop for normal processing of plugins.
                    plugins[i] = me.createPlugin(p);

                    config = me.initialConfig;
                    break;
                }
            }
        }

        me.callParent([ config ]);

        me.refreshSizeState = me.doRefreshSizeState;
        me.refreshFloating = me.doRefreshFloating;

        if (me.refreshSizeStateOnInitialized) {
            me.refreshSizeState();
        }

        if (me.refreshFloatingOnInitialized) {
            me.refreshFloating();
        }

        me.initialize();

        me.triggerInitialized();

        /**
         * Force the component to take up 100% width and height available, by adding it
         * to {@link Ext.Viewport}.
         * @cfg {Boolean} fullscreen
         */
        if (me.fullscreen) {
            me.fireEvent('fullscreen', me);
        }

        me.fireEvent('initialize', me);
    },

    beforeInitConfig: function (config) {
        this.beforeInitialize.apply(this, arguments);
    },

    /**
     * @private
     */
    beforeInitialize: Ext.emptyFn,

    /**
     * @method
     * Allows addition of behavior to the rendering phase.
     * @protected
     * @template
     */
    initialize: Ext.emptyFn,

    /**
     * Invoked when a scroll is initiated on this component via its {@link #scrollable scroller}.
     * @method onScrollStart
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * Invoked when this component is scrolled via its {@link #scrollable scroller}.
     * @method onScrollMove
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * Invoked when a scroll operation is completed via this component's {@link #scrollable scroller}.
     * @method onScrollEnd
     * @param {Number} x The current x position
     * @param {Number} y The current y position
     * @template
     * @protected
     */

    /**
     * @private
     */
    triggerInitialized: function() {
        var listeners = this.onInitializedListeners,
            ln = listeners.length,
            listener, fn, scope, args, i;

        if (!this.initialized) {
            this.initialized = true;

            if (ln > 0) {
                for (i = 0; i < ln; i++) {
                    listener = listeners[i];
                    fn = listener.fn;
                    scope = listener.scope;
                    args = listener.args;

                    if (typeof fn == 'string') {
                        scope[fn].apply(scope, args);
                    }
                    else {
                        fn.apply(scope, args);
                    }
                }

                listeners.length = 0;
            }
        }
    },

    /**
     * @private
     */
    onInitialized: function(fn, scope, args) {
        var listeners = this.onInitializedListeners;

        if (!scope) {
            scope = this;
        }

        if (this.initialized) {
            if (typeof fn == 'string') {
                scope[fn].apply(scope, args);
            }
            else {
                fn.apply(scope, args);
            }
        }
        else {
            listeners.push({
                fn: fn,
                scope: scope,
                args: args
            });
        }
    },

    initElement: function() {
        var me = this;

        me.callParent();

        if (!me.innerElement) {
            me.innerElement = me.element;
        }

        if (!me.bodyElement) {
            me.bodyElement = me.innerElement;
        }
    },

    applyPlugins: function(plugins) {
        var me = this,
            config, ln, i, plugin;

        if (!plugins) {
            return plugins;
        }

        plugins = [].concat(plugins);

        for (i = 0, ln = plugins.length; i < ln; i++) {
            plugins[i] = me.createPlugin(plugins[i]);
        }

        return plugins;
    },

    createPlugin: function (config) {
        if (typeof config === 'string') {
            config = {
                type: config
            };
        }

        var ret = config;

        if (!config.isInstance) {
            // The owner may be needed by plugin's initConfig so provide it:
            config.cmp = this;

            ret = Ext.factory(config, null, null, 'plugin');

            // Cleanup the user's config object:
            delete config.cmp;
        }

        if (ret.setCmp) {
            ret.setCmp(this);
        }

        return ret;
    },

    updatePlugins: function(newPlugins, oldPlugins) {
        var ln, i;

        if (newPlugins) {
            for (i = 0, ln = newPlugins.length; i < ln; i++) {
                newPlugins[i].init(this);
            }
        }

        if (oldPlugins) {
            for (i = 0, ln = oldPlugins.length; i < ln; i++) {
                Ext.destroy(oldPlugins[i]);
            }
        }
    },

    applyScrollable: function(scrollable, oldScrollable) {
        var me = this,
            bodyElement, touchScroll, x, y, scrollableCfg;

        if (scrollable) {
            if (scrollable === true || typeof scrollable === 'string') {
                scrollableCfg = me._scrollableCfg[scrollable];

                //<debug>
                if (!scrollableCfg) {
                    Ext.raise("'" + scrollable + "'is not a valid value for 'scrollable'");
                }
                //</debug>

                scrollable = scrollableCfg;
            }

            if (oldScrollable) {
                oldScrollable.setConfig(scrollable);
                scrollable = oldScrollable;
            } else {
                touchScroll = Ext.supports.touchScroll;

                if (touchScroll && !scrollable.translatable) {
                    scrollable.translatable = {
                        translationMethod: (touchScroll === 1) ? 'scrollparent' : 'csstransform'
                    };
                }

                if (touchScroll === 1) {
                    // running in a browser that uses the touch scroller to control naturally
                    // overflowing elements.
                    scrollable = Ext.Object.chain(scrollable); // don't mutate the config

                    // We'll have native scrollbars, so no indicators are needed
                    scrollable.indicators = false;
                }

                scrollable = Ext.scroll.Scroller.create(scrollable);
                scrollable.component = me;

                me.setUseBodyElement(true);
                bodyElement = me.bodyElement;

                if (touchScroll === 2) {
                    scrollable.setInnerElement(me.innerElement);
                    scrollable.setElement(bodyElement);
                } else {
                    if (touchScroll === 1) {
                        // In browsers that use native browser overflow, but also have a
                        // touch screen 2 setup steps are required by the scroller:
                        // 1. init dom overflow styles.
                        // 2. disable scrolling when triggered by touch so that the scroller
                        // can take over
                        x = scrollable.getX();
                        y = scrollable.getY();

                        bodyElement.setStyle({
                            overflowX: x === true ? 'auto' : !x ? 'hidden' : x,
                            overflowY: y === true ? 'auto' : !y ? 'hidden' : y
                        });

                        bodyElement.disableTouchScroll();
                    }
                    scrollable.setElement(bodyElement);
                }

                if (me.isPainted()) {
                    me.onPainted();
                }

                me.on('painted', 'onPainted', me);
            }
        }

        return scrollable;
    },

    onPainted: function() {
        var scrollable = this.getScrollable();

        if (scrollable && scrollable.isTouchScroller && scrollable.getAutoRefresh()) {
            scrollable.refresh();
        }
    },

    updateRenderTo: function(newContainer) {
        this.renderTo(newContainer);
    },

    updateBorder: function(border) {
        this.element.setStyle('border-width', border ? '' : '0');
    },

    updatePadding: function(padding) {
       this.innerElement.setPadding(padding);
    },

    updateMargin: function(margin) {
        this.element.setMargin(margin);
    },

    updateUi: function(newUi, oldUi) {
        var baseCls = this.getBaseCls(),
            element = this.element,
            currentUi = this.currentUi;

        if (baseCls) {
            if (oldUi) {
                if (currentUi) {
                    element.removeCls(currentUi);
                }
                else {
                    element.removeCls(baseCls + '-' + oldUi);
                }
            }

            if (newUi) {
                element.addCls(newUi, baseCls);
                this.currentUi = baseCls + '-' + newUi;

                // The first instance gets stored on the proptotype
                if (!this.self.prototype.currentUi) {
                    this.self.prototype.currentUi = this.currentUi;
                }
            }
        }
    },

    applyBaseCls: function(baseCls) {
        return baseCls || Ext.baseCSSPrefix + this.xtype;
    },

    updateBaseCls: function(newBaseCls, oldBaseCls) {
        var me = this,
            ui = me.getUi();


        if (oldBaseCls) {
            this.element.removeCls(oldBaseCls);

            if (ui) {
                this.element.removeCls(this.currentUi);
            }
        }

        if (newBaseCls) {
            this.element.addCls(newBaseCls);

            if (ui) {
                this.element.addCls(newBaseCls, null, ui);
                this.currentUi = newBaseCls + '-' + ui;
            }
        }
    },

    /**
     * Adds a CSS class (or classes) to this Component's rendered element.
     * @param {String} cls The CSS class to add.
     * @param {String} [prefix=""] Optional prefix to add to each class.
     * @param {String} [suffix=""] Optional suffix to add to each class.
     */
    addCls: function(cls, prefix, suffix) {
        var oldCls = this.getCls(),
            newCls = (oldCls) ? oldCls.slice() : [],
            ln, i, cachedCls;

        prefix = prefix || '';
        suffix = suffix || '';

        if (typeof cls == "string") {
            cls = [cls];
        }

        ln = cls.length;

        //check if there is currently nothing in the array and we don't need to add a prefix or a suffix.
        //if true, we can just set the newCls value to the cls property, because that is what the value will be
        //if false, we need to loop through each and add them to the newCls array
        if (!newCls.length && prefix === '' && suffix === '') {
            newCls = cls;
        } else {
            for (i = 0; i < ln; i++) {
                cachedCls = prefix + cls[i] + suffix;
                if (newCls.indexOf(cachedCls) == -1) {
                    newCls.push(cachedCls);
                }
            }
        }

        this.setCls(newCls);
    },

    /**
     * Removes the given CSS class(es) from this Component's rendered element.
     * @param {String} cls The class(es) to remove.
     * @param {String} [prefix=""] Optional prefix to prepend before each class.
     * @param {String} [suffix=""] Optional suffix to append to each class.
     */
    removeCls: function(cls, prefix, suffix) {
        var oldCls = this.getCls(),
            newCls = (oldCls) ? oldCls.slice() : [],
            ln, i;

        prefix = prefix || '';
        suffix = suffix || '';

        if (typeof cls == "string") {
            newCls = Ext.Array.remove(newCls, prefix + cls + suffix);
        } else {
            ln = cls.length;
            for (i = 0; i < ln; i++) {
                newCls = Ext.Array.remove(newCls, prefix + cls[i] + suffix);
            }
        }

        this.setCls(newCls);
    },

    /**
     * Replaces specified classes with the newly specified classes.
     * It uses the {@link #addCls} and {@link #removeCls} methods, so if the class(es) you are removing don't exist, it will
     * still add the new classes.
     * @param {String} oldCls The class(es) to remove.
     * @param {String} newCls The class(es) to add.
     * @param {String} [prefix=""] Optional prefix to prepend before each class.
     * @param {String} [suffix=""] Optional suffix to append to each class.
     */
    replaceCls: function(oldCls, newCls, prefix, suffix) {
        // We could have just called {@link #removeCls} and {@link #addCls}, but that would mean {@link #updateCls}
        // would get called twice, which would have performance implications because it will update the dom.

        var cls = this.getCls(),
            array = (cls) ? cls.slice() : [],
            ln, i, cachedCls;

        prefix = prefix || '';
        suffix = suffix || '';

        //remove all oldCls
        if (typeof oldCls == "string") {
            array = Ext.Array.remove(array, prefix + oldCls + suffix);
        } else if (oldCls) {
            ln = oldCls.length;
            for (i = 0; i < ln; i++) {
                array = Ext.Array.remove(array, prefix + oldCls[i] + suffix);
            }
        }

        //add all newCls
        if (typeof newCls == "string") {
            array.push(prefix + newCls + suffix);
        } else if (newCls) {
            ln = newCls.length;

            //check if there is currently nothing in the array and we don't need to add a prefix or a suffix.
            //if true, we can just set the array value to the newCls property, because that is what the value will be
            //if false, we need to loop through each and add them to the array
            if (!array.length && prefix === '' && suffix === '') {
                array = newCls;
            } else {
                for (i = 0; i < ln; i++) {
                    cachedCls = prefix + newCls[i] + suffix;
                    if (array.indexOf(cachedCls) == -1) {
                        array.push(cachedCls);
                    }
                }
            }
        }

        this.setCls(array);
    },

    /**
     * Add or removes a class based on if the class is already added to the Component.
     *
     * @param {String} className The class to toggle.
     * @param {Boolean} [state] If specified as `true`, causes the class to be added. If specified as `false`, causes
     * the class to be removed.
     * @chainable
     */
    toggleCls: function(className, /* private */ state) {
        var oldCls = this.getCls(),
            newCls = oldCls ? oldCls.slice() : [];

        if (typeof state !== 'boolean') {
            state = newCls.indexOf(className) === -1;
        }

        if (state) {
            Ext.Array.include(newCls, className);
        } else {
            Ext.Array.remove(newCls, className);
        }

        this.setCls(newCls);

        return this;
    },

    /**
     * @private
     * Checks if the `cls` is a string. If it is, changed it into an array.
     * @param {String/Array} cls
     * @return {Array/null}
     */
    applyCls: function(cls) {
        if (typeof cls == "string") {
            cls = [cls];
        }

        //reset it back to null if there is nothing.
        if (!cls || !cls.length) {
            cls = null;
        }

        return cls;
    },

    /**
     * @private
     * All cls methods directly report to the {@link #cls} configuration, so anytime it changes, {@link #updateCls} will be called
     */
    updateCls: function (newCls, oldCls) {
        var el = this.element;

        if (el && ((newCls && !oldCls) || (!newCls && oldCls) || newCls.length != oldCls.length || Ext.Array.difference(newCls,
            oldCls).length > 0)) {
            el.replaceCls(oldCls, newCls);
        }
    },

    /**
     * Updates the {@link #styleHtmlCls} configuration
     */
    updateStyleHtmlCls: function(newHtmlCls, oldHtmlCls) {
        var innerHtmlElement = this.innerHtmlElement,
            innerElement = this.innerElement;

        if (this.getStyleHtmlContent() && oldHtmlCls) {
            if (innerHtmlElement) {
                innerHtmlElement.replaceCls(oldHtmlCls, newHtmlCls);
            } else {
                innerElement.replaceCls(oldHtmlCls, newHtmlCls);
            }
        }
    },

    applyStyleHtmlContent: function(config) {
        return Boolean(config);
    },

    updateStyleHtmlContent: function(styleHtmlContent) {
        var htmlCls = this.getStyleHtmlCls(),
            innerElement = this.innerElement,
            innerHtmlElement = this.innerHtmlElement;

        if (styleHtmlContent) {
            if (innerHtmlElement) {
                innerHtmlElement.addCls(htmlCls);
            } else {
                innerElement.addCls(htmlCls);
            }
        } else {
            if (innerHtmlElement) {
                innerHtmlElement.removeCls(htmlCls);
            } else {
                innerElement.addCls(htmlCls);
            }
        }
    },

    applyContentEl: function(contentEl) {
        if (contentEl) {
            return Ext.get(contentEl);
        }
    },

    updateContentEl: function(newContentEl, oldContentEl) {
        if (oldContentEl) {
            oldContentEl.hide();
            Ext.getBody().append(oldContentEl);
        }

        if (newContentEl) {
            this.setHtml(newContentEl.dom);
            newContentEl.show();
        }
    },

    updateUseBodyElement: function(useBodyElement) {
        if (useBodyElement) {
            this.link('bodyElement', this.innerElement.wrap({
                cls: 'x-body'
            }));
        }
    },

    /**
     * @private
     * @return {Boolean}
     */
    isCentered: function() {
        return Boolean(this.getCentered());
    },

    isFloating: function() {
        return this.floating;
    },

    isDocked: function() {
        return Boolean(this.getDocked());
    },

    isInnerItem: function() {
        return this.isInner;
    },

    setIsInner: function(isInner) {
        if (isInner !== this.isInner) {
            this.isInner = isInner;

            if (this.initialized) {
                this.fireEvent('innerstatechange', this, isInner);
            }
        }
    },

    applyTop: function(top) {
        return this.filterLengthValue(top);
    },

    applyRight: function(right) {
        return this.filterLengthValue(right);
    },

    applyBottom: function(bottom) {
        return this.filterLengthValue(bottom);
    },

    applyLeft: function(left) {
        return this.filterLengthValue(left);
    },

    applyMinWidth: function(width) {
        return this.filterLengthValue(width);
    },

    applyMinHeight: function(height) {
        return this.filterLengthValue(height);
    },

    applyMaxWidth: function(width) {
        return this.filterLengthValue(width);
    },

    applyMaxHeight: function(height) {
        return this.filterLengthValue(height);
    },

    updateTop: function(top) {
        this.element.setTop(top);
        this.refreshFloating();
    },

    updateRight: function(right) {
        this.element.setRight(right);
        this.refreshFloating();
    },

    updateBottom: function(bottom) {
        this.element.setBottom(bottom);
        this.refreshFloating();
    },

    updateLeft: function(left) {
        this.element.setLeft(left);
        this.refreshFloating();
    },

    updateWidth: function(width) {
        this.element.setWidth(width);
        this.refreshSizeState();
    },

    updateHeight: function(height) {
        this.element.setHeight(height);
        this.refreshSizeState();
    },

    updateFlex: Ext.emptyFn,

    refreshSizeState: function() {
        this.refreshSizeStateOnInitialized = true;
    },

    doRefreshSizeState: function() {
        var hasWidth = this.getWidth() !== null || this.widthLayoutSized || (this.getLeft() !== null && this.getRight() !== null),
            hasHeight = this.getHeight() !== null || this.heightLayoutSized || (this.getTop() !== null && this.getBottom() !== null),
            stretched = this.layoutStretched || this.hasCSSMinHeight || (!hasHeight && this.getMinHeight() !== null),
            state = hasWidth && hasHeight,
            flags = (hasWidth && this.LAYOUT_WIDTH) | (hasHeight && this.LAYOUT_HEIGHT) | (stretched && this.LAYOUT_STRETCHED);

        if (!state && stretched) {
            state = null;
        }

        this.setSizeState(state);
        this.setSizeFlags(flags);
    },

    setLayoutSizeFlags: function(flags) {
        this.layoutStretched = !!(flags & this.LAYOUT_STRETCHED);
        this.widthLayoutSized = !!(flags & this.LAYOUT_WIDTH);
        this.heightLayoutSized = !!(flags & this.LAYOUT_HEIGHT);

        this.refreshSizeState();
    },

    setSizeFlags: function(flags) {
        var me = this,
            el = me.element,
            hasWidth, hasHeight, stretched;

        if (flags !== this.sizeFlags) {
            me.sizeFlags = flags;

            hasWidth = !!(flags & this.LAYOUT_WIDTH);
            hasHeight = !!(flags & this.LAYOUT_HEIGHT);
            stretched = !!(flags & this.LAYOUT_STRETCHED);


            el.toggleCls(Ext.baseCSSPrefix + 'has-width', hasWidth && !stretched && !hasHeight);
            el.toggleCls(Ext.baseCSSPrefix + 'has-height', hasHeight && !stretched && !hasWidth);

            if (me.initialized) {
                me.fireEvent('sizeflagschange', me, flags);
            }
        }
    },

    getSizeFlags: function() {
        if (!this.initialized) {
            this.doRefreshSizeState();
        }

        return this.sizeFlags;
    },

    setSizeState: function(state) {
        if (state !== this.sizeState) {
            this.sizeState = state;

            this.element.setSizeState(state);

            if (this.initialized) {
                this.fireEvent('sizestatechange', this, state);
            }
        }
    },

    getSizeState: function() {
        if (!this.initialized) {
            this.doRefreshSizeState();
        }

        return this.sizeState;
    },


    updateMinWidth: function(width) {
        this.element.setMinWidth(width);
    },

    updateMinHeight: function(height) {
        this.element.setMinHeight(height);
        this.refreshSizeState();
    },

    updateMaxWidth: function(width) {
        this.element.setMaxWidth(width);
    },

    updateMaxHeight: function(height) {
        this.element.setMaxHeight(height);
    },

    /**
     * @private
     * @param {Boolean} centered
     * @return {Boolean}
     */
    applyCentered: function(centered) {
        centered = Boolean(centered);

        if (centered) {
            this.refreshInnerState = Ext.emptyFn;

            if (this.isFloating()) {
                this.resetFloating();
            }

            if (this.isDocked()) {
                this.setDocked(false);
            }

            this.setIsInner(false);
            delete this.refreshInnerState;
        }

        return centered;
    },

    updateCentered: function(centered) {
        this.toggleCls(this.getFloatingCls(), centered);

        if (!centered) {
            this.refreshInnerState();
        }
    },

    applyDocked: function(docked) {
        if (!docked) {
            return null;
        }

        //<debug>
        if (!/^(top|right|bottom|left)$/.test(docked)) {
            Ext.Logger.error("Invalid docking position of '" + docked.position + "', must be either 'top', 'right', 'bottom', " +
                "'left' or `null` (for no docking)", this);
            return;
        }
        //</debug>

        this.refreshInnerState = Ext.emptyFn;

        if (this.isFloating()) {
            this.resetFloating();
        }

        if (this.isCentered()) {
            this.setCentered(false);
        }

        this.setIsInner(false);

        delete this.refreshInnerState;

        return docked;
    },

    updateDocked: function(docked, oldDocked) {
        this.fireEvent('afterdockedchange', this, docked, oldDocked);
        if (!docked) {
            this.refreshInnerState();
        }
    },

    /**
     * Resets {@link #top}, {@link #right}, {@link #bottom} and {@link #left} configurations to `null`, which
     * will un-float this component.
     */
    resetFloating: function() {
        this.setTop(null);
        this.setRight(null);
        this.setBottom(null);
        this.setLeft(null);
    },


    refreshInnerState: function() {
        this.setIsInner(!this.isCentered() && !this.isFloating() && !this.isDocked());
    },

    refreshFloating: function() {
        this.refreshFloatingOnInitialized = true;
    },

    doRefreshFloating: function() {
        var me = this,
            floating = true,
            floatingCls = this.getFloatingCls();

        if (me.getTop() === null && me.getBottom() === null &&
            me.getRight() === null && me.getLeft() === null) {
            floating = false;
        } else {
            me.refreshSizeState();
        }

        if (floating !== this.floating) {
            me.floating = floating;

            if (floating) {
                me.refreshInnerState = Ext.emptyFn;

                if (me.isCentered()) {
                    me.setCentered(false);
                }

                if (me.isDocked()) {
                    me.setDocked(false);
                }

                me.setIsInner(false);

                delete me.refreshInnerState;
            }

            me.element.toggleCls(floatingCls, floating);

            if (me.initialized) {
                me.fireEvent('floatingchange', me, floating);
            }

            if (!floating) {
                me.refreshInnerState();
            }
        }
    },

    /**
     * Updates the floatingCls if the component is currently floating
     * @private
     */
    updateFloatingCls: function(newFloatingCls, oldFloatingCls) {
        if (this.isFloating()) {
            this.replaceCls(oldFloatingCls, newFloatingCls);
        }
    },

    applyDisabled: function(disabled) {
        return Boolean(disabled);
    },

    updateDisabled: function(disabled) {
        this.element.toggleCls(this.getDisabledCls(), disabled);
    },

    updateDisabledCls: function(newDisabledCls, oldDisabledCls) {
        if (this.isDisabled()) {
            this.element.replaceCls(oldDisabledCls, newDisabledCls);
        }
    },

    /**
     * Disables this Component
     */
    disable: function() {
       this.setDisabled(true);
    },

    /**
     * Enables this Component
     */
    enable: function() {
        this.setDisabled(false);
    },

    /**
     * Returns `true` if this Component is currently disabled.
     * @return {Boolean} `true` if currently disabled.
     */
    isDisabled: function() {
        return this.getDisabled();
    },

    applyZIndex: function(zIndex) {
        if (!zIndex && zIndex !== 0) {
            zIndex = null;
        }

        if (zIndex !== null) {
            zIndex = Number(zIndex);

            if (isNaN(zIndex)) {
                zIndex = null;
            }
        }

        return zIndex;
    },

    updateZIndex: function(zIndex) {
        var element = this.element,
            domStyle;

        if (element && !element.destroyed) {
            domStyle = element.dom.style;
            if (zIndex !== null) {
                domStyle.setProperty('z-index', zIndex, 'important');
            }
            else {
                domStyle.removeProperty('z-index');
            }
        }
    },

    getInnerHtmlElement: function() {
        var innerHtmlElement = this.innerHtmlElement,
            styleHtmlCls;

        if (!innerHtmlElement || !innerHtmlElement.dom || !innerHtmlElement.dom.parentNode) {
            this.innerHtmlElement = innerHtmlElement = Ext.Element.create({ cls: 'x-innerhtml' });

            if (this.getStyleHtmlContent()) {
                styleHtmlCls = this.getStyleHtmlCls();
                this.innerHtmlElement.addCls(styleHtmlCls);
                this.innerElement.removeCls(styleHtmlCls);
            }
            this.innerElement.appendChild(innerHtmlElement);
        }

        return innerHtmlElement;
    },

    updateHtml: function(html) {
        if (!this.destroyed) {
            var innerHtmlElement = this.getInnerHtmlElement();

            if (Ext.isElement(html)){
                innerHtmlElement.setHtml('');
                innerHtmlElement.append(html);
            } else {
                innerHtmlElement.setHtml(html);
            }
        }
    },

    applyHidden: function(hidden) {
        return Boolean(hidden);
    },

    updateHidden: function(hidden) {
        var me = this,
            element = me.renderElement;

        if (element.destroyed) {
            return;
        }

        if (hidden) {
            element.hide();
        } else {
            element.show();
        }

        if (me.element) {
            me.element.toggleCls(me.getHiddenCls(), hidden);
        }

        me.fireEvent(hidden ? 'hide' : 'show', me);
    },

    updateHiddenCls: function(newHiddenCls, oldHiddenCls) {
        if (this.isHidden()) {
            this.element.replaceCls(oldHiddenCls, newHiddenCls);
        }
    },

    /**
     * Returns `true` if this Component is currently hidden.
     * @param {Boolean} [deep=false] `true` to check if this component
     * is hidden because a parent container is hidden.
     * @return {Boolean} `true` if currently hidden.
     */
    isHidden: function(deep) {
        var hidden = !!this.getHidden(),
            owner;

        if (!hidden && deep) {
            owner = this.getRefOwner();
            while (owner) {
                hidden = !!owner.getHidden();
                if (hidden) {
                    break;
                }
                owner = owner.getRefOwner();
            }
        }
        return hidden;
    },

    /**
     * Returns `true` if this Component is currently visible.
     * @param {Boolean} [deep=false] `true` to check if this component
     * is visible and all parents are also visible.
     * @return {Boolean} `true` if currently visible.
     */
    isVisible: function(deep) {
        return !this.isHidden(deep);
    },

    /**
     * Hides this Component optionally using an animation.
     * @param {Object/Boolean} [animation] You can specify an animation here or a bool to use the {@link #hideAnimation} config.
     * @return {Ext.Component}
     * @chainable
     */
    hide: function(animation) {
        var me = this,
            activeAnim = me.activeAnimation;

        me.setCurrentAlignmentInfo(null);
        if (activeAnim) {
            activeAnim.on({
                animationend: function(){
                    me.hide(animation);
                },
                single: true
            });
            return me;
        }

        if (!me.getHidden()) {
            if (animation === undefined || (animation && animation.isComponent)) {
                animation = me.getHideAnimation();
            }
            if (animation) {
                if (animation === true) {
                    animation = 'fadeOut';
                }
                me.on({
                    beforehiddenchange: 'animateFn',
                    scope: this,
                    single: true,
                    args: [animation]
                });
            }
            me.setHidden(true);
        }
        return me;
    },

    /**
     * Shows this component optionally using an animation.
     * @param {Object/Boolean} [animation] You can specify an animation here or a bool to use the {@link #showAnimation} config.
     * @return {Ext.Component}
     * @chainable
     */
    show: function(animation) {
        if(this.activeAnimation) {
            this.activeAnimation.on({
                animationend: function(){
                    this.show(animation);
                },
                scope: this,
                single: true
            });
            return this;
        }

        var hidden = this.getHidden();
        if (hidden || hidden === null) {
            if (animation === true) {
                animation = 'fadeIn';
            }
            else if (animation === undefined || (animation && animation.isComponent)) {
                animation = this.getShowAnimation();
            }

            if (animation) {
                this.beforeShowAnimation();
                this.on({
                    beforehiddenchange: 'animateFn',
                    scope: this,
                    single: true,
                    args: [animation]
                });
            }

            this.setHidden(false);
        }

        return this;
    },

    beforeShowAnimation: function() {
        var element = this.element;

        if (element) {
            this.renderElement.show();
            element.removeCls(this.getHiddenCls());
        }
    },

    animateFn: function(animation, component, newState, oldState, controller) {
        var me = this;
        if (animation && (!newState || (newState && me.isPainted()))) {

            me.activeAnimation = new Ext.fx.Animation(animation);
            me.activeAnimation.setElement(component.element);

            if (!Ext.isEmpty(newState)) {
                me.activeAnimation.setOnEnd(function() {
                    me.activeAnimation = null;
                    controller.resume();
                });

                controller.pause();
            }

            Ext.Animator.run(me.activeAnimation);
        }
    },

    /**
     * @private
     */
    setVisibility: function(isVisible) {
        this.renderElement.setVisible(isVisible);
    },

    /**
     * @private
     */
    isRendered: function() {
        return this.rendered;
    },

    /**
     * @private
     */
    isPainted: function() {
        return this.renderElement.isPainted();
    },

    /**
     * @private
     */
    applyTpl: function(config) {
        return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
    },

    applyData: function(data) {
        if (Ext.isObject(data)) {
            return Ext.apply({}, data);
        } else if (!data) {
            data = {};
        }

        return data;
    },

    /**
     * @private
     */
    updateData: function(newData) {
        var me = this;
        if (newData) {
            var tpl = me.getTpl(),
                tplWriteMode = me.getTplWriteMode();

            if (tpl) {
                tpl[tplWriteMode](me.getInnerHtmlElement(), newData);
            }

            /**
             * @event updatedata
             * Fires whenever the data of the component is updated
             * @param {Ext.Component} this The component instance
             * @param {Object} newData The new data
             */
            this.fireEvent('updatedata', me, newData);
        }
    },

    applyRecord: function(config) {
        if (config && Ext.isObject(config) && config.isModel) {
            return config;
        }
        return  null;
    },

    updateRecord: function(newRecord, oldRecord) {
        var me = this;

        if (oldRecord) {
            oldRecord.unjoin(me);
        }

        if (!newRecord) {
            me.updateData('');
        }
        else {
            newRecord.join(me);
            me.updateData(newRecord.getData(true));
        }
    },

    /**
     * @private
     * Used to handle joining of a record to a tpl
     */
    afterEdit: function() {
        this.updateRecord(this.getRecord());
    },

    /**
     * @private
     * Used to handle joining of a record to a tpl
     */
    afterErase: function() {
        this.setRecord(null);
    },

    /**
     * Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all
     * available xtypes, see the {@link Ext.Component} header.
     *
     * __Note:__ If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.
     *
     * Example usage:
     *
     *     var t = new Ext.field.Text();
     *     alert(t.getXTypes());  // alerts 'component/field/textfield'
     *
     * @return {String} The xtype hierarchy string.
     */
    getXTypes: function() {
        return this.xtypesChain.join('/');
    },

    getDraggableBehavior: function() {
        var behavior = this.draggableBehavior;

        if (!behavior) {
            behavior = this.draggableBehavior = new Ext.behavior.Draggable(this);
        }

        return behavior;
    },

    applyDraggable: function(config) {
        this.getDraggableBehavior().setConfig(config);
    },

    getDraggable: function() {
        return this.getDraggableBehavior().getDraggable();
    },

    getTranslatableBehavior: function() {
        var behavior = this.translatableBehavior;

        if (!behavior) {
            behavior = this.translatableBehavior = new Ext.behavior.Translatable(this);
        }

        return behavior;
    },

    applyTranslatable: function(config) {
        this.getTranslatableBehavior().setConfig(config);
    },

    getTranslatable: function() {
        return this.getTranslatableBehavior().getTranslatable();
    },

    translateAxis: function(axis, value, animation) {
        var x, y;

        if (axis === 'x') {
            x = value;
        }
        else {
            y = value;
        }

        return this.translate(x, y, animation);
    },

    translate: function() {
        var translatable = this.getTranslatable();

        if (!translatable) {
            this.setTranslatable(true);
            translatable = this.getTranslatable();
        }

        translatable.translate.apply(translatable, arguments);
    },

    /**
     * Shows this component by another component. If you specify no alignment, it will automatically
     * position this component relative to the reference component.
     *
     * For example, say we are aligning a Panel next to a Button, the alignment string would look like this:
     *
     *     [panel-vertical (t/b/c)][panel-horizontal (l/r/c)]-[button-vertical (t/b/c)][button-horizontal (l/r/c)]
     *
     * where t = top, b = bottom, c = center, l = left, r = right.
     *
     * ## Examples
     *
     *  - `tl-tr` means top-left corner of the Panel to the top-right corner of the Button
     *  - `tc-bc` means top-center of the Panel to the bottom-center of the Button
     *
     * You can put a '?' at the end of the alignment string to constrain the floating element to the
     * {@link Ext.Viewport Viewport}
     *
     *     // show `panel` by `button` using the default positioning (auto fit)
     *     panel.showBy(button);
     *
     *     // align the top left corner of `panel` with the top right corner of `button` (constrained to viewport)
     *     panel.showBy(button, "tl-tr?");
     *
     *     // align the bottom right corner of `panel` with the center left edge of `button` (not constrained by viewport)
     *     panel.showBy(button, "br-cl");
     *
     * @param {Ext.Component} component The target component to show this component by.
     * @param {String} alignment (optional) The specific alignment.
     */
    showBy: function(component, alignment) {
        var me = this,
            viewport = Ext.Viewport,
            parent = me.getParent();

        me.setVisibility(false);

        if (parent !== viewport) {
            viewport.add(me);
        }

        me.show();

        me.on({
            hide: 'onShowByErased',
            destroy: 'onShowByErased',
            single: true,
            scope: me
        });
        viewport.on('resize', 'alignTo', me, { args: [component, alignment] });

        me.alignTo(component, alignment);
        me.setVisibility(true);
    },

    /**
     * @private
     * @param {Ext.Component} component
     */
    onShowByErased: function() {
        Ext.Viewport.un('resize', 'alignTo', this);
    },

    /**
     * Prepares information on aligning this to component using alignment.
     * Also checks to see if this is already aligned to component according to alignment.
     * @protected
     */
    getAlignmentInfo: function (component, alignment){
        var alignToElement = component.isComponent ? component.renderElement : component,
            alignToBox = alignToElement.getBox(),
            element = this.renderElement,
            box = element.getBox(),
            stats = {
                alignToBox: alignToBox,
                alignment: alignment,
                top: alignToBox.top,
                left: alignToBox.left,
                alignToWidth: alignToBox.width,
                alignToHeight: alignToBox.height,
                width: box.width,
                height: box.height
            },
            currentAlignmentInfo = this.getCurrentAlignmentInfo(),
            isAligned = true;

        if (!Ext.isEmpty(currentAlignmentInfo)) {
            Ext.Object.each(stats, function(key, value) {
                if (!Ext.isObject(value) && currentAlignmentInfo[key] != value) {
                    isAligned = false;
                    return false;
                }
                return true;
            });
        } else {
            isAligned = false;
        }

        return {isAligned: isAligned, stats: stats};
    },

    /**
     * Current Alignment information from the last alignTo call
     * @private
     */
    getCurrentAlignmentInfo: function() {
        return this.$currentAlignmentInfo;
    },

    /**
     * Sets the current Alignment information, called by alignTo
     * @private
     */
    setCurrentAlignmentInfo: function(alignmentInfo) {
        this.$currentAlignmentInfo = Ext.isEmpty(alignmentInfo) ? null : Ext.merge({}, alignmentInfo.stats ? alignmentInfo.stats : alignmentInfo);
    },

    /**
     * @private
     */
    alignTo: function(component, alignment) {
        var alignmentInfo = this.getAlignmentInfo(component, alignment);
        if(alignmentInfo.isAligned) return;

        var alignToBox = alignmentInfo.stats.alignToBox,
            constrainBox = this.getParent().element.getBox(),
            alignToHeight = alignmentInfo.stats.alignToHeight,
            alignToWidth = alignmentInfo.stats.alignToWidth,
            height = alignmentInfo.stats.height,
            width = alignmentInfo.stats.width;

        // Keep off the sides...
        constrainBox.bottom -= 5;
        constrainBox.height -= 10;
        constrainBox.left += 5;
        constrainBox.right -= 5;
        constrainBox.top += 5;
        constrainBox.width -= 10;

        if (!alignment || alignment === 'auto') {
            if (constrainBox.bottom - alignToBox.bottom < height) {
                if (alignToBox.top - constrainBox.top < height) {
                    if (alignToBox.left - constrainBox.left < width) {
                        alignment = 'cl-cr?';
                    }
                    else {
                        alignment = 'cr-cl?';
                    }
                }
                else {
                    alignment = 'bc-tc?';
                }
            }
            else {
                alignment = 'tc-bc?';
            }
        }

        var matches = alignment.match(this.alignmentRegex);
        //<debug>
        if (!matches) {
            Ext.Logger.error("Invalid alignment value of '" + alignment + "'");
        }
        //</debug>

        var from = matches[1].split(''),
            to = matches[2].split(''),
            constrained = (matches[3] === '?'),
            fromVertical = from[0],
            fromHorizontal = from[1] || fromVertical,
            toVertical = to[0],
            toHorizontal = to[1] || toVertical,
            top = alignToBox.top,
            left = alignToBox.left,
            halfAlignHeight = alignToHeight / 2,
            halfAlignWidth = alignToWidth / 2,
            halfWidth = width / 2,
            halfHeight = height / 2,
            maxLeft, maxTop;

        switch (fromVertical) {
            case 't':
                switch (toVertical) {
                    case 'c':
                        top += halfAlignHeight;
                        break;
                    case 'b':
                        top += alignToHeight;
                }
                break;

            case 'b':
                switch (toVertical) {
                    case 'c':
                        top -= (height - halfAlignHeight);
                        break;
                    case 't':
                        top -= height;
                        break;
                    case 'b':
                        top -= height - alignToHeight;
                }
                break;

            case 'c':
                switch (toVertical) {
                    case 't':
                        top -= halfHeight;
                        break;
                    case 'c':
                        top -= (halfHeight - halfAlignHeight);
                        break;
                    case 'b':
                        top -= (halfHeight - alignToHeight);
                }
                break;
        }

        switch (fromHorizontal) {
            case 'l':
                switch (toHorizontal) {
                    case 'c':
                        left += halfAlignHeight;
                        break;
                    case 'r':
                        left += alignToWidth;
                }
                break;

            case 'r':
                switch (toHorizontal) {
                    case 'r':
                        left -= (width - alignToWidth);
                        break;
                    case 'c':
                        left -= (width - halfWidth);
                        break;
                    case 'l':
                        left -= width;
                }
                break;

            case 'c':
                switch (toHorizontal) {
                    case 'l':
                        left -= halfWidth;
                        break;
                    case 'c':
                        left -= (halfWidth - halfAlignWidth);
                        break;
                    case 'r':
                        left -= (halfWidth - alignToWidth);
                }
                break;
        }

        if (constrained) {
            maxLeft = (constrainBox.left + constrainBox.width) - width;
            maxTop = (constrainBox.top + constrainBox.height) - height;

            left = Math.max(constrainBox.left, Math.min(maxLeft, left));
            top = Math.max(constrainBox.top, Math.min(maxTop, top));
        }

        this.setLeft(left);
        this.setTop(top);
        this.setCurrentAlignmentInfo(alignmentInfo);
    },

    /**
     * Walks up the `ownerCt` axis looking for an ancestor Container which matches
     * the passed simple selector.
     *
     * Example:
     *
     *     var owningTabPanel = grid.up('tabpanel');
     *
     * @param {String} selector (optional) The simple selector to test.
     * @return {Ext.Container} The matching ancestor Container (or `undefined` if no match was found).
     */
    up: function(selector) {
        var result = this.parent;

        if (selector) {
            for (; result; result = result.parent) {
                if (Ext.ComponentQuery.is(result, selector)) {
                    return result;
                }
            }
        }
        return result;
    },

    getBubbleTarget: function() {
        return this.getParent();
    },

    /**
     * Destroys this Component. If it is currently added to a Container it will first be removed from that Container.
     * All Ext.Element references are also deleted and the Component is de-registered from Ext.ComponentManager
     */
    destroy: function() {
        var me = this;
        
        // isDestroying added for compat reasons
        me.isDestroying = me.destroying = true;

        if (me.hasListeners.destroy) {
            me.fireEvent('destroy', me);
        }

        Ext.destroy(
            me.getTranslatable(),
            me.getPlugins(),
            me.innerHtmlElement,
            me.scrollerElement,
            me.getScrollable()
        );
        
        me.setRecord(null);
        me.callParent();

        // isDestroying added for compat reasons
        me.isDestroying = me.destroying = false;
    },

    privates: {
        doAddListener: function(name, fn, scope, options, order, caller, manager) {
            if (name == 'painted' || name == 'resize') {
                this.element.doAddListener(name, fn, scope || this, options, order);
            }

            this.callParent([name, fn, scope, options, order, caller, manager]);
        },

        doRemoveListener: function(name, fn, scope) {
            if (name == 'painted' || name == 'resize') {
                this.element.doRemoveListener(name, fn, scope);
            }

            this.callParent([name, fn, scope]);
        }
    }
}, function() {
    //<debug>
    var metaTags = document.getElementsByTagName('head')[0].getElementsByTagName('meta'),
        len = metaTags.length,
        i, hasViewport;

    for (i = 0; i < len; i++) {
        if (metaTags[i].name === 'viewport') {
            hasViewport = true;
        }
    }

    if (!hasViewport) {
        Ext.log.warn('Ext JS requires a viewport meta tag in order to function correctly on mobile devices.  Please add the following tag to the <head> of your html page: \n <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
    }
    //</debug>
});
