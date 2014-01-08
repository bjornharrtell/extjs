# Drawing

The drawing package enables you to draw
general purpose graphics and animations
that can be used with the
[charting classes](#!/guide/charting)
and other interfaces
to create graphics that work
on all browsers and mobile devices.
This document guides you through
the overall design and implementation details
of the Drawing package.

The draw package provides a versatile tool
that creates custom graphics in a cross-browser/device manner
and also performs rich animations with them.

The Draw package contains a Surface class
that abstracts the underlying graphics implementation
and enables the developer to create arbitrarily shaped Sprites or SpriteGroups
that respond to interactions like mouse events
and also provide rich animations on all attributes like shape, color, size, etc.

The underlying/concrete implementations for the Surface class
are SVG (for SVG capable browsers) and
VML (for the version 9 and earlier of the Internet Explorer family).
Surface can be considered as an interface
for the SVG and VML rendering engines
that is agnostic to its underlying implementations.
Most of the methods and ways to create sprites
are heavily inspired by the [SVG standard](http://www.w3.org/TR/SVG/).

## Creating a Drawing Surface

You can create a simple drawing surface
without loading the Charting package at all.
This enables you to create arbitrary graphics
that work on all browsers/devices and animate well.
For example, you could create an interactive map of the United States
where each state is a sprite,
or an infographic where each element is also a sprite.
What's interesting about making sprites and not images
is that the document acquires a new level of interactivity
but also that, because the images are VML and SVG based,
they will never loose quality and can be printed correctly.

In order to use the Draw package directly
you can create a Draw Component and
(for example) append it to an `Ext.Window`:

    @example
    var drawComponent = Ext.create('Ext.draw.Component', {
        viewBox: false,
        items: [{
            type: 'circle',
            fill: '#ffc',
            radius: 100,
            x: 100,
            y: 100
        }]
    });

    Ext.create('Ext.Window', {
        width: 230,
        height: 230,
        layout: 'fit',
        items: [drawComponent]
    }).show();

In this case, we created a draw component
and added a sprite to it.
The *type* of the sprite is *circle*
so if you run this code you'll see a yellow-ish circle in a Window.
When setting `viewBox` to `false`
we are responsible for setting
the object's position and dimensions accordingly.

Sprites can have different types. Some of them are:

 - *circle* - To draw circles.
You can set the radius by using the *radius* parameter in the sprite configuration.
 - *rect* - To render rectangles.
You can set the width and height of the rectangle by using the *width* and *height* parameters
 in the sprite configuration.
 - *text* - To render text as a sprite.
You can set the font/font-size by using the *font* parameter.
 - *path* - The most powerful sprite type.
With it you can create arbitrary shapes by using
the [SVG path syntax](http://www.w3.org/TR/SVG/paths.html).
You can find a quick tutorial on to how to get started
with the path syntax
[here](https://developer.mozilla.org/en/SVG/Tutorial/Paths).

A Sprite is an object rendered in a Drawing surface.
There are different options and types of sprites.
The configuration of a Sprite is an object with the following properties:

- **type** - (String) The type of the sprite.
Possible options are 'circle', 'path', 'rect', 'text', 'square'.
- **width** - (Number) Used in rectangle sprites,
the width of the rectangle.
- **height** - (Number) Used in rectangle sprites,
the height of the rectangle.
- **size** - (Number) Used in square sprites,
the dimension of the square.
- **radius** - (Number) Used in circle sprites, the radius of the circle.
- **x** - (Number) The position along the x-axis.
- **y** - (Number) The position along the y-axis.
- **path** - (Array) Used in path sprites,
the path of the sprite written in SVG-like path syntax.
- **opacity** - (Number) The opacity of the sprite.
- **fill** - (String) The fill color.
- **stroke** - (String) The stroke color.
- **stroke-width** - (Number) The width of the stroke.
- **font** - (String) Used with text type sprites.
The full font description.
Uses the same syntax as the CSS `font` parameter.
- **text** - (String) Used with text type sprites.
The text itself.

Additionally there are three transform objects
that can be set with `setAttributes`
which are `translate`, `rotate` and `scale`.

For translate, the configuration object
contains x and y attributes for the translation. For example:

    sprite.setAttributes({
      translate: {
       x: 10,
       y: 10
      }
    }, true);

For rotate, the configuration object
contains x and y attributes
for the center of the rotation (which are optional),
and a degrees attribute
that specifies the rotation in degrees. For example:

    sprite.setAttributes({
      rotate: {
       degrees: 90
      }
    }, true);

For scale, the configuration object contains x and y attributes
for the x-axis and y-axis scaling. For example:

    sprite.setAttributes({
      scale: {
       x: 10,
       y: 3
      }
    }, true);

## Interacting with a Sprite

Now that we've created a draw surface with a sprite in it,
let's dive into how to interact with the sprite.
We can get a handle to the sprite we want to modify
by adding that sprite imperatively to the surface:

    @example
    // Create a draw component
    var drawComponent = Ext.create('Ext.draw.Component', {
        viewBox: false
    });

    // Create a window to place the draw component in
    Ext.create('Ext.Window', {
        width: 220,
        height: 230,
        layout: 'fit',
        items: [drawComponent]
    }).show();

    // Add a circle sprite
    var myCircle = drawComponent.surface.add({
        type: 'circle',
        x: 100,
        y: 100,
        radius: 100,
        fill: '#cc5'
    });

    // Now do stuff with the sprite, like changing its properties:
    myCircle.setAttributes({
        fill: '#ccc'
    }, true);

    // or animate an attribute on the sprite
    myCircle.animate({
        to: {
            fill: '#555'
        },
        duration: 2000
    });

    // Add a mouseup listener to the sprite
    myCircle.addListener('mouseup', function() {
        alert('mouse upped!');
    });

In this example we've seen how we can add events,
set sprite attributes and animate these attributes
using the draw package.
As you can see this package is a versatile abstraction layer
over the graphics we can do.
What's most interesting about this class
is that we aren't tied to a specific shape or structure;
also all elements support events,
setting attributes and creating animations.
Most important of all, all of this is compatible in all browsers and devices.
