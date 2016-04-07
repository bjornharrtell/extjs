/**
 * A sprite is an object rendered in a drawing {@link Ext.draw.Surface}.
 * The Sprite class itself is an abstract class and is not meant to be used directly.
 * Every sprite in the Draw and Chart packages is a subclass of the Ext.draw.sprite.Sprite.
 * The standard Sprite subclasses are:
 *
 * * {@link Ext.draw.sprite.Path} - A sprite that represents a path.
 * * {@link Ext.draw.sprite.Rect} - A sprite that represents a rectangle.
 * * {@link Ext.draw.sprite.Circle} - A sprite that represents a circle.
 * * {@link Ext.draw.sprite.Sector} - A sprite representing a pie slice.
 * * {@link Ext.draw.sprite.Arc} - A sprite that represents a circular arc.
 * * {@link Ext.draw.sprite.Ellipse} - A sprite that represents an ellipse.
 * * {@link Ext.draw.sprite.EllipticalArc} - A sprite that represents an elliptical arc.
 * * {@link Ext.draw.sprite.Text} - A sprite that represents text.
 * * {@link Ext.draw.sprite.Image} -  A sprite that represents an image.
 * * {@link Ext.draw.sprite.Instancing} - A sprite that represents multiple instances based on the given template.
 * * {@link Ext.draw.sprite.Composite} - Represents a group of sprites.
 *
 * Sprites can be created with a reference to a {@link Ext.draw.Surface}
 *
 *      var drawContainer = Ext.create('Ext.draw.Container', {
 *          // ...
 *      });
 *
 *      var sprite = Ext.create('Ext.draw.sprite.Sprite', {
 *          type: 'circle',
 *          fill: '#ff0',
 *          surface: drawContainer.getSurface('main'),
 *          radius: 5
 *      });
 *
 * Sprites can also be added to the surface as a configuration object:
 *
 *      var sprite = drawContainer.getSurface('main').add({
 *          type: 'circle',
 *          fill: '#ff0',
 *          radius: 5
 *      });
 */
Ext.define('Ext.draw.sprite.Sprite', {
    alias: 'sprite.sprite',

    mixins: {
        observable: 'Ext.mixin.Observable'
    },

    requires: [
        'Ext.draw.Draw',
        'Ext.draw.gradient.Gradient',
        'Ext.draw.sprite.AttributeDefinition',
        'Ext.draw.modifier.Target',
        'Ext.draw.modifier.Animation',
        'Ext.draw.modifier.Highlight'
    ],

    isSprite: true,

    statics: {
        defaultHitTestOptions: {
            fill: true,
            stroke: true
        }
        //<debug>
        /**
         * Debug rendering options:
         *
         * debug: {
         *     bbox: true, // renders the bounding box of the sprite
         *     xray: true  // renders control points of the path (for Ext.draw.sprite.Path and descendants only)
         * }
         *
         */
        ,debug: false
        //</debug>
    },

    inheritableStatics: {
        def: {
            processors: {
                //<debug>
                debug: 'default',
                //</debug>

                /**
                 * @cfg {String} [strokeStyle="none"] The color of the stroke (a CSS color value).
                 */
                strokeStyle: "color",

                /**
                 * @cfg {String} [fillStyle="none"] The color of the shape (a CSS color value).
                 */
                fillStyle: "color",

                /**
                 * @cfg {Number} [strokeOpacity=1] The opacity of the stroke. Limited from 0 to 1.
                 */
                strokeOpacity: "limited01",

                /**
                 * @cfg {Number} [fillOpacity=1] The opacity of the fill. Limited from 0 to 1.
                 */
                fillOpacity: "limited01",

                /**
                 * @cfg {Number} [lineWidth=1] The width of the line stroke.
                 */
                lineWidth: "number",

                /**
                 * @cfg {String} [lineCap="butt"] The style of the line caps.
                 */
                lineCap: "enums(butt,round,square)",

                /**
                 * @cfg {String} [lineJoin="miter"] The style of the line join.
                 */
                lineJoin: "enums(round,bevel,miter)",

                /**
                 * @cfg {Array} [lineDash=[]]
                 * An even number of non-negative numbers specifying a dash/space sequence.
                 * Note that while this is supported in IE8 (VML engine), the behavior is
                 * different from Canvas and SVG. Please refer to this document for details:
                 * http://msdn.microsoft.com/en-us/library/bb264085(v=vs.85).aspx
                 * Although IE9 and IE10 have Canvas support, the 'lineDash'
                 * attribute is not supported in those browsers.
                 */
                lineDash: "data",

                /**
                 * @cfg {Number} [lineDashOffset=0]
                 * A number specifying how far into the line dash sequence drawing commences.
                 */
                lineDashOffset: "number",

                /**
                 * @cfg {Number} [miterLimit=10]
                 * Sets the distance between the inner corner and the outer corner where two lines meet.
                 */
                miterLimit: "number",

                /**
                 * @cfg {String} [shadowColor="none"] The color of the shadow (a CSS color value).
                 */
                shadowColor: "color",

                /**
                 * @cfg {Number} [shadowOffsetX=0] The offset of the sprite's shadow on the x-axis.
                 */
                shadowOffsetX: "number",

                /**
                 * @cfg {Number} [shadowOffsetY=0] The offset of the sprite's shadow on the y-axis.
                 */
                shadowOffsetY: "number",

                /**
                 * @cfg {Number} [shadowBlur=0] The amount blur used on the shadow.
                 */
                shadowBlur: "number",

                /**
                 * @cfg {Number} [globalAlpha=1] The opacity of the sprite. Limited from 0 to 1.
                 */
                globalAlpha: "limited01",

                /**
                 * @cfg {String} [globalCompositeOperation=source-over]
                 * Indicates how source images are drawn onto a destination image.
                 * globalCompositeOperation attribute is not supported by the SVG and VML (excanvas) engines.
                 */
                globalCompositeOperation: "enums(source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy)",

                /**
                 * @cfg {Boolean} [hidden=false] Determines whether or not the sprite is hidden.
                 */
                hidden: "bool",

                /**
                 * @cfg {Boolean} [transformFillStroke=false]
                 * Determines whether the fill and stroke are affected by sprite transformations.
                 */
                transformFillStroke: "bool",

                /**
                 * @cfg {Number} [zIndex=0]
                 * The stacking order of the sprite.
                 */
                zIndex: "number",

                /**
                 * @cfg {Number} [translationX=0]
                 * The translation of the sprite on the x-axis.
                 */
                translationX: "number",

                /**
                 * @cfg {Number} [translationY=0]
                 * The translation of the sprite on the y-axis.
                 */
                translationY: "number",

                /**
                 * @cfg {Number} [rotationRads=0]
                 * The angle of rotation of the sprite in radians.
                 */
                rotationRads: "number",

                /**
                 * @cfg {Number} [rotationCenterX=null]
                 * The central coordinate of the sprite's scale operation on the x-axis.
                 */
                rotationCenterX: "number",

                /**
                 * @cfg {Number} [rotationCenterY=null]
                 * The central coordinate of the sprite's rotate operation on the y-axis.
                 */
                rotationCenterY: "number",

                /**
                 * @cfg {Number} [scalingX=1] The scaling of the sprite on the x-axis.
                 */
                scalingX: "number",

                /**
                 * @cfg {Number} [scalingY=1] The scaling of the sprite on the y-axis.
                 */
                scalingY: "number",

                /**
                 * @cfg {Number} [scalingCenterX=null]
                 * The central coordinate of the sprite's scale operation on the x-axis.
                 */
                scalingCenterX: "number",

                /**
                 * @cfg {Number} [scalingCenterY=null]
                 * The central coordinate of the sprite's scale operation on the y-axis.
                 */
                scalingCenterY: "number",
                
                constrainGradients: "bool"
            },

            aliases: {
                "stroke": "strokeStyle",
                "fill": "fillStyle",
                "color": "fillStyle",
                "stroke-width": "lineWidth",
                "stroke-linecap": "lineCap",
                "stroke-linejoin": "lineJoin",
                "stroke-miterlimit": "miterLimit",
                "text-anchor": "textAlign",
                "opacity": "globalAlpha",

                translateX: "translationX",
                translateY: "translationY",
                rotateRads: "rotationRads",
                rotateCenterX: "rotationCenterX",
                rotateCenterY: "rotationCenterY",
                scaleX: "scalingX",
                scaleY: "scalingY",
                scaleCenterX: "scalingCenterX",
                scaleCenterY: "scalingCenterY"
            },

            defaults: {
                hidden: false,
                zIndex: 0,

                strokeStyle: "none",
                fillStyle: "none",
                lineWidth: 1,
                lineDash: [],
                lineDashOffset: 0,
                lineCap: "butt",
                lineJoin: "miter",
                miterLimit: 10,

                shadowColor: "none",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,

                globalAlpha: 1,
                strokeOpacity: 1,
                fillOpacity: 1,
                transformFillStroke: false,

                translationX: 0,
                translationY: 0,
                rotationRads: 0,
                rotationCenterX: null,
                rotationCenterY: null,
                scalingX: 1,
                scalingY: 1,
                scalingCenterX: null,
                scalingCenterY: null,
                
                constrainGradients: false
            },

            triggers: {
                zIndex: "zIndex",

                globalAlpha: "canvas",
                globalCompositeOperation: "canvas",

                transformFillStroke: "canvas",
                strokeStyle: "canvas",
                fillStyle: "canvas",
                strokeOpacity: "canvas",
                fillOpacity: "canvas",

                lineWidth: "canvas",
                lineCap: "canvas",
                lineJoin: "canvas",
                lineDash: "canvas",
                lineDashOffset: "canvas",
                miterLimit: "canvas",

                shadowColor: "canvas",
                shadowOffsetX: "canvas",
                shadowOffsetY: "canvas",
                shadowBlur: "canvas",

                translationX: "transform",
                translationY: "transform",
                rotationRads: "transform",
                rotationCenterX: "transform",
                rotationCenterY: "transform",
                scalingX: "transform",
                scalingY: "transform",
                scalingCenterX: "transform",
                scalingCenterY: "transform",
                
                constrainGradients: "canvas"
            },

            updaters: {
                // 'bbox' updater is meant to be called by subclasses when changes
                // to attributes are expected to result in a change in sprite's dimensions.
                bbox: 'bboxUpdater',

                zIndex: function (attr) {
                    attr.dirtyZIndex = true;
                },

                transform: function (attr) {
                    attr.dirtyTransform = true;
                    attr.bbox.transform.dirty = true;
                }
            }
        }
    },

    /**
     * @property {Object} attr
     * The visual attributes of the sprite, e.g. strokeStyle, fillStyle, lineWidth...
     */

    /**
     * @cfg {Ext.draw.modifier.Animation} animation
     * @accessor
     */

    config: {
        /**
         * @cfg {Ext.draw.Surface/Ext.draw.sprite.Instancing/Ext.draw.sprite.Composite} parent
         * The immediate parent of the sprite. Not necessarily a surface.
         */
        parent: null,
        /**
         * @cfg {Ext.draw.Surface} surface
         * The surface that this sprite is rendered into.
         */
        surface: null
    },

    onClassExtended: function (subClass, data) {
        // The `def` here is no longer a config, but an instance
        // of the AttributeDefinition class created with that config,
        // which can now be retrieved from `initialConfig`.
        var superclassCfg = subClass.superclass.self.def.initialConfig,
            ownCfg = data.inheritableStatics && data.inheritableStatics.def,
            cfg;

        // If sprite defines attributes of its own, merge that with those of its parent.
        if (ownCfg) {
            cfg = Ext.Object.merge({}, superclassCfg, ownCfg);
            subClass.def = new Ext.draw.sprite.AttributeDefinition(cfg);
            delete data.inheritableStatics.def;
        } else {
            subClass.def = new Ext.draw.sprite.AttributeDefinition(superclassCfg);
        }

        subClass.def.spriteClass = subClass;
    },

    constructor: function (config) {
        //<debug>
        if (Ext.getClassName(this) === 'Ext.draw.sprite.Sprite') {
            throw 'Ext.draw.sprite.Sprite is an abstract class';
        }
        //</debug>
        var me = this,
            attributeDefinition = me.self.def,
            // It is important to get defaults (make sure
            // 'defaults' config applier of the AttributeDefinition is called,
            // since it is initialized lazily) before the attributes
            // are initialized ('initializeAttributes' call).
            defaults = attributeDefinition.getDefaults(),
            modifiers;

        config = Ext.isObject(config) ? config : {};

        me.id = config.id || Ext.id(null, 'ext-sprite-');
        me.attr = {};
        me.mixins.observable.constructor.apply(me, arguments);
        
        modifiers = Ext.Array.from(config.modifiers, true);
        me.prepareModifiers(modifiers);
        me.initializeAttributes();
        me.setAttributes(defaults, true);
        //<debug>
        var processors = attributeDefinition.getProcessors();
        for (var name in config) {
            if (name in processors && me['get' + name.charAt(0).toUpperCase() + name.substr(1)]) {
                Ext.raise('The ' + me.$className +
                    ' sprite has both a config and an attribute with the same name: ' + name + '.');
            }
        }
        //</debug>
        me.setAttributes(config);
    },

    /**
     * @private
     * Current state of the sprite.
     * Set to `true` if the sprite needs to be repainted.
     * @cfg {Boolean} dirty
     * @accessor
     */

    getDirty: function () {
        return this.attr.dirty;
    },

    setDirty: function (dirty) {
        // This could have been a regular attribute.
        // Instead, it's a hidden one, which is initialized inside in the
        // Target's modifier `prepareAttributes` method and is exposed
        // as a config. The idea is to skip the modifier chain when
        // we simply need to change the sprite's state and notify
        // the sprite's parent.
        this.attr.dirty = dirty;
        if (dirty) {
            var parent = this.getParent();
            if (parent) {
                parent.setDirty(true);
            }
        }
    },

    addModifier: function (modifier, reinitializeAttributes) {
        var me = this;
        if (!(modifier instanceof Ext.draw.modifier.Modifier)) {
            modifier = Ext.factory(modifier, null, null, 'modifier');
        }
        modifier.setSprite(me);
        if (modifier.preFx || modifier.config && modifier.config.preFx) {
            if (me.fx.getPrevious()) {
                me.fx.getPrevious().setNext(modifier);
            }
            modifier.setNext(me.fx);
        } else {
            me.topModifier.getPrevious().setNext(modifier);
            modifier.setNext(me.topModifier);
        }
        if (reinitializeAttributes) {
            me.initializeAttributes();
        }
        return modifier;
    },

    prepareModifiers: function (additionalModifiers) {
        // Set defaults
        var me = this,
            i, ln;

        me.topModifier = new Ext.draw.modifier.Target({sprite: me});

        // Link modifiers
        me.fx = new Ext.draw.modifier.Animation({sprite: me});
        me.fx.setNext(me.topModifier);

        for (i = 0, ln = additionalModifiers.length; i < ln; i++) {
            me.addModifier(additionalModifiers[i], false);
        }
    },

    getAnimation: function () {
        return this.fx;
    },

    setAnimation: function (config) {
        this.fx.setConfig(config);
    },

    initializeAttributes: function () {
        this.topModifier.prepareAttributes(this.attr);
    },

    /**
     * @private
     * Calls updaters triggered by changes to sprite attributes.
     * @param attr The attributes of a sprite or its instance.
     */
    callUpdaters: function (attr) {
        var me = this,
            pendingUpdaters = attr.pendingUpdaters,
            updaters = me.self.def.getUpdaters(),
            any = false,
            dirty = false,
            flags, updater, fn;

        // If updaters set sprite attributes that trigger other updaters,
        // those updaters are not called right away, but wait until all current
        // updaters are called (till the next do/while loop iteration).

        me.callUpdaters = Ext.emptyFn; // Hide class method from the instance.

        do {
            any = false;
            for (updater in pendingUpdaters) {
                any = true;
                flags = pendingUpdaters[updater];
                delete pendingUpdaters[updater];
                fn = updaters[updater];
                if (typeof fn === 'string') {
                    fn = me[fn];
                }
                if (fn) {
                    fn.call(me, attr, flags);
                }
            }
            dirty = dirty || any;
        } while (any);

        delete me.callUpdaters; // Restore class method.

        if (dirty) {
            me.setDirty(true);
        }
    },

    /**
     * @private
     * Schedules specified updaters to be called.
     * Updaters are called implicitly as a result of a change to sprite attributes.
     * But sometimes it may be required to call an updater without setting an attribute,
     * and without messing up the updater call order (by calling the updater immediately).
     * For example:
     *
     *     updaters: {
     *          onDataX: function (attr) {
     *              this.processDataX();
     *              // Process data Y every time data X is processed.
     *              // Call the onDataY updater as if changes to dataY attribute itself
     *              // triggered the update.
     *              this.scheduleUpdaters(attr, {onDataY: ['dataY']});
     *              // Alternatively:
     *              // this.scheduleUpdaters(attr, ['onDataY'], ['dataY']);
     *          }
     *     }
     *
     * @param {Object} attr The attributes object (not necesseraly of a sprite, but of its instance).
     * @param {Object/String[]} updaters A map of updaters to be called to attributes that triggered the update.
     * @param {String[]} [triggers] Attributes that triggered the update. An optional parameter.
     * If used, the `updaters` parameter will be treated as an array of updaters to be called.
     */
    scheduleUpdaters: function (attr, updaters, triggers) {
        var updater;

        if (triggers) {
            for (var i = 0, ln = updaters.length; i < ln; i++) {
                updater = updaters[i];
                this.scheduleUpdater(attr, updater, triggers);
            }
        } else {
            for (updater in updaters) {
                triggers = updaters[updater];
                this.scheduleUpdater(attr, updater, triggers);
            }
        }
    },

    /**
     * @private
     * @param attr {Object} The attributes object (not necesseraly of a sprite, but of its instance).
     * @param updater {String} Updater to be called.
     * @param {String[]} [triggers] Attributes that triggered the update.
     */
    scheduleUpdater: function (attr, updater, triggers) {
        triggers = triggers || [];

        var pendingUpdaters = attr.pendingUpdaters;

        if (updater in pendingUpdaters) {
            if (triggers.length) {
                pendingUpdaters[updater] = Ext.Array.merge(pendingUpdaters[updater], triggers);
            }
        } else {
            pendingUpdaters[updater] = triggers;
        }
    },

    /**
     * Set attributes of the sprite.
     * By default only the attributes that have processors will be set
     * and all other attributes will be filtered out as a result of the
     * normalization process.
     * The normalization process can be skipped. In that case all the given
     * attributes will be set unprocessed. This will result in better
     * performance, but might also pollute the sprite's attributes with
     * unwanted attributes or attributes with invalid values, if one is not
     * careful. See also {@link #setAttributesBypassingNormalization}.
     * If normalization is skipped, one may also chose to avoid copying
     * the given object. This may result in even better performance, but
     * only in cases where most of the attributes have values that are
     * different from the old values, because copying additionally checks
     * if the value has changed.
     *
     * @param {Object} changes The content of the change.
     * @param {Boolean} [bypassNormalization] `true` to avoid normalization of the given changes.
     * @param {Boolean} [avoidCopy] `true` to avoid copying the `changes` object.
     * `bypassNormalization` should also be `true`. The content of object may be destroyed.
     */
    setAttributes: function (changes, bypassNormalization, avoidCopy) {
        var attr = this.attr,
            name, value, obj;

        if (bypassNormalization) {
            if (avoidCopy) {
                this.topModifier.pushDown(attr, changes);
            } else {
                obj = {};
                for (name in changes) {
                    value = changes[name];
                    if (value !== attr[name]) {
                        obj[name] = value;
                    }
                }
                this.topModifier.pushDown(attr, obj);
            }
        } else {
            this.topModifier.pushDown(attr, this.self.def.normalize(changes));
        }
    },

    /**
     * Set attributes of the sprite, assuming the names and values have already been
     * normalized.
     *
     * @deprecated Use setAttributes directy with bypassNormalization argument being `true`.
     * @param {Object} changes The content of the change.
     * @param {Boolean} [avoidCopy] `true` to avoid copying the `changes` object.
     * The content of object may be destroyed.
     */
    setAttributesBypassingNormalization: function (changes, avoidCopy) {
        return this.setAttributes(changes, true, avoidCopy);
    },

    /**
     * @private
     */
    bboxUpdater: function (attr) {
        var hasRotation = attr.rotationRads !== 0,
            hasScaling = attr.scalingX !== 1 || attr.scalingY !== 1,
            noRotationCenter = attr.rotationCenterX === null || attr.rotationCenterY === null,
            noScalingCenter = attr.scalingCenterX === null || attr.scalingCenterY === null;

        // 'bbox' is not a standard attribute (in the sense that it doesn't have
        // a processor = not explicitly declared and cannot be set by a user)
        // and is calculated automatically by the 'getBBox' method.
        // The 'bbox' attribute is created by the 'prepareAttributes' method
        // of the Target modifier at construction time.

        // Both plain and tranformed bounding boxes need to be updated.
        // Mark them as such below.
        attr.bbox.plain.dirty = true;      // updated by the 'updatePlainBBox' method

        // Before transformed bounding box can be updated,
        // we must ensure that we have correct forward and inverse
        // transformation matrices (which are also created by the Target modifier),
        // so that they reflect the current state of the scaling, rotation
        // and other transformation attributes.
        // The 'applyTransformations' method does just that.

        // The 'dirtyTransform' flag (another implicit attribute)
        // is set to true when any of the transformation attributes change,
        // to let us know that transformation matrices need to be updated.

        attr.bbox.transform.dirty = true;  // updated by the 'updateTransformedBBox' method

        if (hasRotation && noRotationCenter || hasScaling && noScalingCenter) {
            this.scheduleUpdater(attr, 'transform');
        }
    },

    /**
     * Returns the bounding box for the given Sprite as calculated with the Canvas engine.
     *
     * @param {Boolean} [isWithoutTransform] Whether to calculate the bounding box with the current transforms or not.
     */
    getBBox: function (isWithoutTransform) {
        var me = this,
            attr = me.attr,
            bbox = attr.bbox,
            plain = bbox.plain,
            transform = bbox.transform;

        if (plain.dirty) {
            me.updatePlainBBox(plain);
            plain.dirty = false;
        }

        if (!isWithoutTransform) {
            // If tranformations are to be applied ('dirtyTransform' is true),
            // then this will itself call the 'getBBox' method
            // to get the plain untransformed bbox and calculate its center.
            me.applyTransformations();
            if (transform.dirty) {
                me.updateTransformedBBox(transform, plain);
                transform.dirty = false;
            }
            return transform;
        }

        return plain;
    },

    /**
     * @method
     * @protected
     * Subclass will fill the plain object with `x`, `y`, `width`, `height` information
     * of the plain bounding box of this sprite.
     *
     * @param {Object} plain Target object.
     */
    updatePlainBBox: Ext.emptyFn,

    /**
     * @protected
     * Subclass will fill the plain object with `x`, `y`, `width`, `height` information
     * of the transformed bounding box of this sprite.
     *
     * @param {Object} transform Target object (transformed bounding box) to populate.
     * @param {Object} plain Untransformed bounding box.
     */
    updateTransformedBBox: function (transform, plain) {
        this.attr.matrix.transformBBox(plain, 0, transform);
    },

    /**
     * Subclass can rewrite this function to gain better performance.
     * @param {Boolean} isWithoutTransform
     * @return {Array}
     */
    getBBoxCenter: function (isWithoutTransform) {
        var bbox = this.getBBox(isWithoutTransform);
        if (bbox) {
            return [
                bbox.x + bbox.width * 0.5,
                bbox.y + bbox.height * 0.5
            ];
        } else {
            return [0, 0];
        }
    },

    /**
     * Hide the sprite.
     * @return {Ext.draw.sprite.Sprite} this
     * @chainable
     */
    hide: function () {
        this.attr.hidden = true;
        this.setDirty(true);
        return this;
    },

    /**
     * Show the sprite.
     * @return {Ext.draw.sprite.Sprite} this
     * @chainable
     */
    show: function () {
        this.attr.hidden = false;
        this.setDirty(true);
        return this;
    },

    /**
     * Applies sprite's attributes to the given context.
     * @param {Object} ctx Context to apply sprite's attributes to.
     * @param {Array} rect The rect of the context to be affected by gradients.
     */
    useAttributes: function (ctx, rect) {
        this.applyTransformations();
        var attr = this.attr,
            canvasAttributes = attr.canvasAttributes,
            strokeStyle = canvasAttributes.strokeStyle,
            fillStyle = canvasAttributes.fillStyle,
            lineDash = canvasAttributes.lineDash,
            lineDashOffset = canvasAttributes.lineDashOffset,
            id;

        if (strokeStyle) {
            if (strokeStyle.isGradient) {
                ctx.strokeStyle = 'black';
                ctx.strokeGradient = strokeStyle;
            } else {
                ctx.strokeGradient = false;
            }
        }

        if (fillStyle) {
            if (fillStyle.isGradient) {
                ctx.fillStyle = 'black';
                ctx.fillGradient = fillStyle;
            } else {
                ctx.fillGradient = false;
            }
        }

        if (lineDash) {
            ctx.setLineDash(lineDash);
        }

        // Only set lineDashOffset to contexts that support the property (excludes VML).
        if (Ext.isNumber(lineDashOffset + ctx.lineDashOffset)) {
            ctx.lineDashOffset = lineDashOffset;
        }

        for (id in canvasAttributes) {
            if (canvasAttributes[id] !== undefined && canvasAttributes[id] !== ctx[id]) {
                ctx[id] = canvasAttributes[id];
            }
        }

        this.setGradientBBox(ctx, rect);
    },

    setGradientBBox: function (ctx, rect) {
        var attr = this.attr;
        if (attr.constrainGradients) {
            ctx.setGradientBBox({x: rect[0], y: rect[1], width: rect[2], height: rect[3]});
        } else {
            ctx.setGradientBBox(this.getBBox(attr.transformFillStroke));
        }
    },

    /**
     * @private
     *
     * Calculates forward and inverse transform matrices from sprite's attributes.
     * Transformations are applied in the following order: Scaling, Rotation, Translation.
     * @param {Boolean} [force=false] Forces recalculation of transform matrices even when
     * sprite's transform attributes supposedly haven't changed.
     */
    applyTransformations: function (force) {
        if (!force && !this.attr.dirtyTransform) {
            return;
        }
        var me = this,
            attr = me.attr,
            center = me.getBBoxCenter(true),
            centerX = center[0],
            centerY = center[1],

            tx = attr.translationX,
            ty = attr.translationY,

            sx = attr.scalingX,
            sy = attr.scalingY === null ? attr.scalingX : attr.scalingY,
            scx = attr.scalingCenterX === null ? centerX : attr.scalingCenterX,
            scy = attr.scalingCenterY === null ? centerY : attr.scalingCenterY,

            rad = attr.rotationRads,
            rcx = attr.rotationCenterX === null ? centerX : attr.rotationCenterX,
            rcy = attr.rotationCenterY === null ? centerY : attr.rotationCenterY,

            cos = Math.cos(rad),
            sin = Math.sin(rad),

            tx_4, ty_4;

        if (sx === 1 && sy === 1) {
            scx = 0;
            scy = 0;
        }

        if (rad === 0) {
            rcx = 0;
            rcy = 0;
        }

        // Translation component after steps 1-4 (see below).
        // Saving it here to prevent double calculation.
        tx_4 = scx * (1 - sx) - rcx;
        ty_4 = scy * (1 - sy) - rcy;

        // The matrix below is a result of:
        //     (7)          (6)             (5)             (4)           (3)           (2)           (1)
        // | 1 0 tx |   | 1 0 rcx |   | cos -sin 0 |   | 1 0 -rcx |   | 1 0 scx |   | sx 0 0 |   | 1 0 -scx |
        // | 0 1 ty | * | 0 1 rcy | * | sin  cos 0 | * | 0 1 -rcy | * | 0 1 scy | * | 0 sy 0 | * | 0 1 -scy |
        // | 0 0  1 |   | 0 0  1  |   |  0    0  1 |   | 0 0  1   |   | 0 0  1  |   | 0  0 0 |   | 0 0  1   |
        attr.matrix.elements = [
            cos * sx, sin * sx,
            -sin * sy, cos * sy,
            cos * tx_4 - sin * ty_4 + rcx + tx,
            sin * tx_4 + cos * ty_4 + rcy + ty
        ];
        attr.matrix.inverse(attr.inverseMatrix);
        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;
    },

    /**
     * Pre-multiplies the current transformation matrix of a sprite with the given matrix.
     * If `isSplit` parameter is `true`, the resulting matrix is also split into
     * individual components (scaling, rotation, translation) and corresponding sprite
     * attributes are updated. The shearing component is not extracted.
     * Note, that transformation attributes work as if transformations are applied to the
     * local coordinate system of a sprite, while matrix transformations transform
     * the global coordinate space or the surface grid.
     * Since the `transform` method returns the sprite itself, calls to the method
     * can be chained. And if updating sprite transformation attributes is desired,
     * it can be achieved by setting the `isSplit` parameter of the last call to `true`.
     * For example:
     *
     *     sprite.transform(matrixA).transform(matrixB).transform(matrixC, true);
     *
     * @param {Ext.draw.Matrix/Number[]} matrix A transformation maxtrix or array of its elements.
     * @param {Boolean} [isSplit=false] If 'true', transformation attributes are updated.
     * @return {Ext.draw.sprite.Sprite} This sprite.
     */
    transform: function (matrix, isSplit) {
        var attr = this.attr,
            spriteMatrix = attr.matrix,
            elements;

        if (matrix && matrix.isMatrix) {
            elements = matrix.elements;
        } else {
            elements = matrix;
        }
        //<debug>
        if (!(Ext.isArray(elements) && elements.length === 6)) {
            Ext.raise("An instance of Ext.draw.Matrix or an array of 6 numbers is expected.");
        }
        //</debug>

        spriteMatrix.prepend.apply(spriteMatrix, elements.slice());
        spriteMatrix.inverse(attr.inverseMatrix);

        if (isSplit) {
            this.updateTransformAttributes();
        }

        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;

        this.setDirty(true);

        return this;
    },

    /**
     * @private
     */
    updateTransformAttributes: function () {
        var attr = this.attr,
            split = attr.matrix.split();

        attr.rotationRads = split.rotate;
        attr.rotationCenterX = 0;
        attr.rotationCenterY = 0;
        attr.scalingX = split.scaleX;
        attr.scalingY = split.scaleY;
        attr.scalingCenterX = 0;
        attr.scalingCenterY = 0;
        attr.translationX = split.translateX;
        attr.translationY = split.translateY;
    },

    /**
     * Resets current transformation matrix of a sprite to the identify matrix.
     * @param {Boolean} [isSplit=false] If 'true', transformation attributes are updated.
     * @return {Ext.draw.sprite.Sprite} This sprite.
     */
    resetTransform: function (isSplit) {
        var attr = this.attr;

        attr.matrix.reset();
        attr.inverseMatrix.reset();

        if (!isSplit) {
            this.updateTransformAttributes();
        }

        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;

        this.setDirty(true);

        return this;
    },

    /**
     * Resets current transformation matrix of a sprite to the identify matrix
     * and pre-multiplies it with the given matrix.
     * This is effectively the same as calling {@link #resetTransform},
     * followed by {@link #transform} with the same arguments.
     * @param {Array} matrix The transformation matrix to apply or its raw elements as an array.
     * @param {Boolean} [isSplit=false] If `true`, transformation attributes are updated.
     * @return {Ext.draw.sprite.Sprite} This sprite.
     */
    setTransform: function (matrix, isSplit) {
        this.resetTransform(true);
        this.transform.call(this, matrix, isSplit);

        return this;
    },

    /**
     * Called before rendering.
     */
    preRender: Ext.emptyFn,

    /**
     * @method
     * Render method.
     * @param {Ext.draw.Surface} surface The surface.
     * @param {Object} ctx A context object compatible with CanvasRenderingContext2D.
     * @param {Array} rect The clip rect (or called dirty rect) of the current rendering. Not to be confused
     * with `surface.getRect()`.
     *
     * @return {*} returns `false` to stop rendering in this frame.
     * All the sprites that haven't been rendered will have their dirty flag untouched.
     */
    render: Ext.emptyFn,

    //<debug>
    /**
     * @private
     * Renders the bounding box of transformed sprite.
     */
    renderBBox: function (surface, ctx) {
        var bbox = this.getBBox();

        ctx.beginPath();
        ctx.moveTo(bbox.x, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height);
        ctx.lineTo(bbox.x, bbox.y + bbox.height);
        ctx.closePath();

        ctx.strokeStyle = 'red';
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 0.5;

        ctx.stroke();
    },
    //</debug>

    /**
     * Performs a hit test on the sprite.
     * @param {Array} point A two-item array containing x and y coordinates of the point.
     * @param {Object} options Hit testing options.
     * @return {Object} A hit result object that contains more information about what
     * exactly was hit or null if nothing was hit.
     */
    hitTest: function (point, options) {
        // Meant to be overridden in subclasses for more precise hit testing.
        // This version doesn't take any options and simply hit tests sprite's
        // bounding box, if the sprite is visible.
        if (this.isVisible()) {
            var x = point[0],
                y = point[1],
                bbox = this.getBBox(),
                isBBoxHit = bbox && x >= bbox.x && x <= (bbox.x + bbox.width) &&
                                    y >= bbox.y && y <= (bbox.y + bbox.height);
            if (isBBoxHit) {
                return {
                    sprite: this
                };
            }
        }
        return null;
    },

    /**
     * @private
     * Checks if the sprite can be seen.
     * This includes the `hidden` attribute check, alpha/opacity checks,
     * fill/stroke color checks and surface/parent checks.
     * The method doesn't check if the sprite is off-screen.
     * @return {Boolean} Returns `true`, if the sprite can be seen.
     */
    isVisible: function () {
        var attr = this.attr,
            parent = this.getParent(),
            hasParent = parent && (parent.isSurface || parent.isVisible()),
            isSeen = hasParent && !attr.hidden && attr.globalAlpha,
            none1 = Ext.draw.Color.NONE,
            none2 = Ext.draw.Color.RGBA_NONE,
            hasFill = attr.fillOpacity && attr.fillStyle !== none1 && attr.fillStyle !== none2,
            hasStroke = attr.strokeOpacity && attr.strokeStyle !== none1 && attr.strokeStyle !== none2,
            result = isSeen && (hasFill || hasStroke);

        return !!result;
    },

    repaint: function () {
        var surface = this.getSurface();
        if (surface) {
            surface.renderFrame();
        }
    },

    /**
     * Removes this sprite from its surface.
     * The sprite itself is not destroyed.
     * @returns {Ext.draw.sprite.Sprite} Returns the removed sprite or `null` otherwise.
     */
    remove: function () {
        var surface = this.getSurface();

        if (surface && surface.isSurface) {
            return surface.remove(this);
        }

        return null;
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function () {
        var me = this,
            modifier = me.topModifier,
            currentModifier;

        while (modifier) {
            currentModifier = modifier;
            modifier = modifier.getPrevious();
            currentModifier.destroy();
        }

        delete me.attr;

        me.remove();

        if (me.fireEvent('beforedestroy', me) !== false) {
            me.fireEvent('destroy', me);
        }

        me.callParent();
    }
}, function () { // onClassCreated
    // Create one AttributeDefinition instance per sprite class when a class is created
    // and replace the `def` config with the instance that was created using that config.
    // Here we only create an AttributeDefinition instance for the base Sprite class,
    // attribute definitions for subclasses are created inside onClassExtended method.
    this.def = new Ext.draw.sprite.AttributeDefinition(this.def);
    this.def.spriteClass = this;
});

