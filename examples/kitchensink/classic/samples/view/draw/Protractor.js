Ext.define('KitchenSink.view.draw.Protractor', {
    // Typically, you'd want to extend the Composite sprite instead of using it directly.
    extend: 'Ext.draw.sprite.Composite',
    alias: 'sprite.protractor',

    inheritableStatics: {
        def: {
            // And define your own attributes on the composite that abstract away
            // the actual implementation.
            processors: {
                // The first four attributes (start and end point coordinates)
                // is all we really need for this sprite to work.
                fromX: 'number',
                fromY: 'number',
                toX: 'number',
                toY: 'number',
                // The rest of the attributes is just to allow customization.
                baseLineLength: 'number',
                arcRadius: 'number',
                arrowLength: 'number',
                arrowAngle: 'number'
            },
            // Changes to composite attributes will then trigger the recalculation of
            // attributes of composite's children sprites.
            // Here we define which composite's attributes should trigger such recalculation.
            // In this case we use a single updater function called 'recalculate', but it's
            // possible to specify and use different updaters for different attributes.
            dirtyTriggers: {
                fromX: 'recalculate',
                fromY: 'recalculate',
                toX: 'recalculate',
                toY: 'recalculate',
                baseLineLength: 'recalculate',
                arcRadius: 'recalculate',
                arrowLength: 'recalculate',
                arrowAngle: 'recalculate'
            },
            // Default values of composite's attributes.
            defaults: {
                fromX: 0,
                fromY: 0,
                toX: 100,
                toY: 100,
                baseLineLength: 50,
                arcRadius: 40,
                arrowLength: 10,
                arrowAngle: Math.PI / 8
            },
            updaters: {
                // This updater function is called every time the attributes
                // of the composite change, including animations.
                // Inside this updater we calculate and set the values of the attributes
                // of the children of the composite based on the values of the composite's
                // attributes.
                recalculate: function (attr) {
                    // Please see this ticket https://sencha.jira.com/browse/EXTJS-15521
                    // for a graphical representation of what's going on in this function.
                    var me = this,
                        fromX = attr.fromX,
                        fromY = attr.fromY,
                        toX = attr.toX,
                        toY = attr.toY,
                        dx = toX - fromX,
                        dy = toY - fromY,
                        PI = Math.PI,
                        radius = Math.sqrt(dx*dx + dy*dy);

                    if (dx === 0 || dy === 0) {
                        return;
                    }

                    var alpha = Math.atan2(dy, dx),
                        sin = Math.sin,
                        cos = Math.cos,
                        arcRadius = attr.arcRadius,
                        beta = PI - attr.arrowAngle,
                        x = attr.arrowLength * cos(beta),
                        y = attr.arrowLength * sin(beta),
                        // Coordinates of the arc arrow tip.
                        ax = arcRadius * cos(alpha) + fromX,
                        ay = arcRadius * sin(alpha) + fromY,
                        mat = Ext.draw.Matrix.fly([cos(alpha), sin(alpha), -sin(alpha), cos(alpha), toX, toY]),
                        angleArrowThreshold = Ext.draw.Draw.radian * me.getAngleArrowThreshold(),
                        isSmallAngle = alpha < angleArrowThreshold && alpha > -angleArrowThreshold,
                        angleTextRadius = arcRadius * 1.2,
                        isSmallRadius = radius < angleTextRadius,
                        radiusTextFlip, fontSize,
                        theta = 0;

                    if (alpha > 0) {
                        theta = alpha + PI / 2 - attr.arrowAngle / (arcRadius * 0.1);
                    } else if (alpha < 0) {
                        theta = alpha - PI / 2 + attr.arrowAngle / (arcRadius * 0.1);
                    }

                    me.createSprites();

                    me.baseLine.setAttributes({
                        fromX: fromX,
                        fromY: fromY,
                        toX: fromX + attr.baseLineLength,
                        toY: fromY,
                        hidden: isSmallRadius
                    });
                    me.radiusLine.setAttributes({
                        fromX: fromX,
                        fromY: fromY,
                        toX: toX,
                        toY: toY,
                        strokeStyle: attr.strokeStyle
                    });
                    me.radiusArrowLeft.setAttributes({
                        fromX: toX,
                        fromY: toY,
                        toX: mat.x(x, y),
                        toY: mat.y(x, y),
                        strokeStyle: attr.strokeStyle
                    });
                    me.radiusArrowRight.setAttributes({
                        fromX: toX,
                        fromY: toY,
                        toX: mat.x(x, -y),
                        toY: mat.y(x, -y),
                        strokeStyle: attr.strokeStyle
                    });

                    mat = Ext.draw.Matrix.fly([cos(theta), sin(theta), -sin(theta), cos(theta), ax, ay]);

                    me.angleLine.setAttributes({
                        startAngle: 0,
                        endAngle: alpha,
                        cx: fromX,
                        cy: fromY,
                        r: arcRadius,
                        anticlockwise: alpha < 0,
                        hidden: isSmallRadius
                    });
                    me.angleArrowLeft.setAttributes({
                        fromX: ax,
                        fromY: ay,
                        toX: mat.x(x, y),
                        toY: mat.y(x, y),
                        hidden: isSmallAngle || isSmallRadius
                    });
                    me.angleArrowRight.setAttributes({
                        fromX: ax,
                        fromY: ay,
                        toX: mat.x(x, -y),
                        toY: mat.y(x, -y),
                        hidden: isSmallAngle || isSmallRadius
                    });
                    me.angleText.setAttributes({
                        x: angleTextRadius * cos(alpha / 2) + fromX,
                        y: angleTextRadius * sin(alpha / 2) + fromY,
                        text: me.getAngleText() + ': ' + (alpha * 180 / PI).toFixed(me.getPrecision()) + '°',
                        hidden: isSmallRadius
                    });
                    radiusTextFlip = ((alpha > -0.5 * PI && alpha < 0.5 * PI) || (alpha > 1.5 * PI && alpha < 2 * PI)) ? 1 : -1;
                    fontSize = parseInt(me.radiusText.attr.fontSize, 10);
                    x = 0.5 * radius * cos(alpha) + fromX + radiusTextFlip * fontSize * sin(alpha);
                    y = 0.5 * radius * sin(alpha) + fromY - radiusTextFlip * fontSize * cos(alpha);
                    me.radiusText.setAttributes({
                        x: x,
                        y: y,
                        rotationRads: alpha,
                        rotationRads: radiusTextFlip === 1 ? alpha : alpha - PI,
                        rotationCenterX: x,
                        rotationCenterY: y,
                        text: me.getRadiusText() + ': ' + radius.toFixed(me.getPrecision()),
                        hidden: isSmallRadius
                    });
                }
            }
        }
    },

    // Additional configuration options that are meant to be used once during setup time.
    // These need not be attributes, because we don't need them to animate
    // or trigger changes in other attributes.
    config: {
        radiusText: 'length',
        angleText: 'angle',
        precision: 1,
        angleArrowThreshold: 15
    },

    // The 'recalculate' updater will be called at construction time.
    // But the children sprites have not been created and added to the composite yet.
    // We can't add children to the composite before the parent constructor call,
    // because the composite hasn't been initialized yet.
    // And adding them after construction is too late, because the 'recalculate'
    // updater needs them.
    // So we define the 'createSprites' function that is called inside the 'recalculate'
    // updater before the sprites are used.
    createSprites: function () {
        var me = this;

        // Only create sprites if they haven't been created yet.
        if (!me.baseLine) {
            me.baseLine = me.add({
                type: 'line',
                lineDash: [2, 2]
            });
            me.radiusLine = me.add({
                type: 'line'
            });
            // Left line of the radius arrow.
            me.radiusArrowLeft = me.add({
                type: 'line'
            });
            // Right line of the radius arrow.
            me.radiusArrowRight = me.add({
                type: 'line'
            });
            me.angleLine = me.add({
                type: 'arc',
                strokeStyle: 'black',
                lineDash: [2, 2]
            });
            // Left line of the angle arrow.
            me.angleArrowLeft = me.add({
                type: 'line',
                lineDash: [2, 2]
            });
            // Right line of the angle arrow.
            me.angleArrowRight = me.add({
                type: 'line',
                lineDash: [2, 2]
            });
            me.radiusText = me.add({
                type: 'text',
                textAlign: 'center',
                textBaseline: 'middle',
                font: '12px'
            });
            me.angleText = me.add({
                type: 'text',
                textBaseline: 'middle',
                font: '12px'
            });
        }
    }

});