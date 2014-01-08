# Ext JS 4.2 Upgrade Guide

This guide will assist developers migrating from Ext JS 4.1.x to 4.2. As always our goal
was to maintain API compatibility as much as possible. The areas where changes were needed
are described here to help you upgrade to Ext JS 4.2 as easily as possible.

## ComboBox filters

Keystroke filtering of the store in a ComboBox is now implemented using the standard
Store filtering mechanism and is independent of any other filters an application may add
to the store.

## Menus

Menu icon elements are now `div` elements in order that they can display the new `glyph`
configuration as well as background images. This means that any high-specificity rules
which made use of the `img` tag name to impose a `background-image` will have to change
to use the `div` tag name.

## Grids

In addition to the new `bufferedrenderer` plugin (`Ext.grid.plugin.BufferedRenderer`),
many more grid features work together than in previous releases. If some combination of
standard grid `features` or `plugins` does not work together, please report it to us -
it is probably a bug!

A locking grid's View now aggregates the columns from both sides, and offers more of the
interface of a true grid view. In particular, the `getGridColumns` method has been added.

Row editing on a locked grid now produces one row editor which spans both sides.

## MVC

  - The `Ext.app.EventBus` is now a singleton, and is always available in the application.
  - `Ext.app.Controller` no longer depends on `Ext.app.Application` to do things, and can
  be instantiated without bringing up the whole dependency tree.
  - It is now possible to create your own Application class(es) extending from 
  `Ext.app.Application`, and include custom logic in this class.
  - `Ext.application` when passed the application class name just instantiates it. If
  passed a config object like before, it will declare new `Ext.app.Application` class with
  these config options, and instantiate it - same logic as with Application class.
  - As the result of two items above, `Ext.application` no longer requires all of the
  dependency tree synchronously.
  - It is now possible to explicitly declare all namespaces (project parts) in the
  Application class, to avoid any kind of ambiguities when resolving dependencies.
  - Ext.app.Application now deals properly with its own ancestry and can be used as a
  top-level Controller in the application.
  - A new concept of "event domains" was introduced; it is now possible to fire and
  listen to events not related to Components. Several domains are provided out of the box,
  and it's easy to add your own.
  - You can pass method names to the control or listen methods on Controller.

## Ext.Direct

  - Direct namespaces can be nested, i.e. if the server side declares a class
  `Foo.Bar.Baz` with methods `foo` and `bar`, resulting stub methods will be
  `Foo.Bar.Baz.foo` and `Foo.Bar.Baz.bar`.
  - Direct method callback can be canceled by listening to `beforecallback` events and
  returning `false` from event handler. This is true for both successful and failed calls,
  i.e. in case of server failures and such.
  - Direct method accepts extra `options` Object as last parameter (after callback and
  scope), this object is applied to resulting `Ext.Ajax.request` parameters so it is now
  possible to set individual timeout and any other `Ext.Ajax.request` parameter per-method
  call.
  - The `options` object is passed back to the Direct method callback function, so it is
  possible to pass any kind of data from caller to the callback.
  - When the `timeout` option is specified, the Direct method is dispatched immediately,
  bypassing request queue.
  - PollProvider now accepts empty "no events" responses without breaking.
  - Each Provider can now be configured to have its events relayed by `Ext.direct.Manager`,
  so these can be listened to in centralized fashion.
  - Direct proxy resolves string method names on first call, not at construction time as
  in previous release. This allows for late binding and fits better with MVC and builds.

## Containers

Since version 4.0, i.e., in the Classic Theme, border:false was inherited by logic in the
`Ext.container.AbstractContainer` base class. This conflicted with the Neptune Theme
requirements and was removed. To restore this behavior, apply this override in your
application:

    Ext.define('Compat.container.AbstractContainer', {
        override: 'Ext.container.AbstractContainer',

        onBeforeAdd : function(item) {
            this.callParent(arguments);

            // If the parent has no border, only use an explicitly defined border
            if (this.border === false || this.border === 0) {
                var b = item.border;
                item.border = Ext.isDefined(b) && b !== false && b !== 0;
            }
        }
    });

## Panel

Panel dragging has been enhanced to allow for simple, portal-like dragging. To enable this
mode on a draggable panels which are `floating: true`, add the new `simpleDrag: true`.

This causes the Panel to use a simple `ComponentDragger` the same as `Windows` use so
that it simply makes the Panel mobile. It does not use the default Panel drag mechanism
which uses the `Ext.dd` package (to allow the dragged Panel to interact with other
`Ext.dd` instances).

The default behavior is there to allow things like portal panel dragging to interact with
portal containers.

### Borders in Neptune

Neptune is a (mostly) borderless design. Even so, you can always use the `border` config
to enable borders and `bodyBorder` to enable borders on the body element of a panel. This
implies there is some inherent border styling that is being enabled which is correct. As
in the Classic theme, there are CSS classes added to suppress the borders, but unlike in
Classic, the Neptune theme uses one CSS class to suppress the undesired borders.

While only one class is added to any element, there are 15 different classes declared in
`"./packages/ext-theme-base/sass/src/layout/component/Dock.scss"` for this purpose. If
none of these classes are added, then the element will present its natural border. The
classes that suppress the border edges are as follows:

  * x-noborder-t
  * x-noborder-r
  * x-noborder-b
  * x-noborder-l
  * x-noborder-tl
  * x-noborder-rl
  * x-noborder-bl
  * x-noborder-tr
  * x-noborder-tb
  * x-noborder-rb
  * x-noborder-tbl
  * x-noborder-trl
  * x-noborder-trb
  * x-noborder-rbl
  * x-noborder-trbl

Also in Neptune, the borders of the panel, its body and docked items are "collapsed" using
another class, again from another set of 15 classes found in
`"./packages/ext-theme-base/sass/etc/mixins/border-management.scss"`:

  * x-panel-default-outer-border-t
  * x-panel-default-outer-border-r
  * x-panel-default-outer-border-b
  * x-panel-default-outer-border-l
  * x-panel-default-outer-border-tl
  * x-panel-default-outer-border-rl
  * x-panel-default-outer-border-bl
  * x-panel-default-outer-border-tr
  * x-panel-default-outer-border-tb
  * x-panel-default-outer-border-rb
  * x-panel-default-outer-border-tbl
  * x-panel-default-outer-border-trl
  * x-panel-default-outer-border-trb
  * x-panel-default-outer-border-rbl
  * x-panel-default-outer-border-trbl

Because this class has to impose the proper component and UI styling, these classes are
generated for each component/UI combination using the `border-management` mixin. So the
"panel" and "default" pieces of the above classes will vary for other components (such as
"window") and UI names.

## Buttons and Tabs

The `Ext.button.Button` has changed its rendering to no longer render a `button` element.
This (greatly) simplifies the styling required for IE and the resulting button layout code.
The appropriate Aria `role` is added for accessibility concerns, but all Buttons now render
an `a` (anchor) tag.

## Glyphs

Buttons, tabs, panel headers and menu items now support a `glyph` configuration that is
similar to `iconCls` and `icon`. The `glyph` uses Web Fonts to convert a character in to
a scalable image. To take advantage of this, you will need to pick out your own glyphs and
produce your own `font-family`. See the `Ext.button.Button` class and its `glyph` config
for further details.

## Class System

We have added a `callSuper` method for situations where you need to patch/replace a method
on the target class in an `override`. This method should only be needed when an `override`
needs to workaround the behavior of a specific method it is designed to replace so is not
something to use in most cases. The typical use cases should still use `callParent`.
