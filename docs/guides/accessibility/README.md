# Creating Accessible Ext JS Applications (Section 508 and ARIA)

Ext JS 4.2.1 makes it possible to create accessible JavaScript applications by providing
the tools that developers need to achieve [Section 508](http://www.section508.gov) and 
[ARIA](http://www.w3.org/WAI/intro/aria) compliance.  These brand new features make it
easier than ever before for application developers to create user interfaces that are
usable by people with disabilities and by those who use assistive technologies to navigate
the web.

## Overview of Accessibility

What does it mean for a software application to be Accessible? In general accessibility means
that the functionality and content of an application is available to people with disabilities
especially the visually impaired, those who rely on a screen reader to use a computer, and
those who cannot use a mouse to navigate the screen.  In 1998, the United States Congress
passed the "[Section 508 Amendment to the Rehabilitation Act of 1973](http://www.section508.gov)"
more commonly referred to as just "Section 508", requiring Federal agencies to make all
information that is electronically available accessible to people with disabilities. Because
of Section 508 accessibility is a requirement for anyone producing software applications
that will be used by U.S. government agencies, however, applications not designed for
government use may also benefit since accessibility features will enable them to reach a
larger number of users. Web applications can make significant steps toward achieving
compliance with Section 508 by following the guidelines spelled out in the
[Web Accessibility Initiative](http://www.w3.org/WAI/)'s "Accessible Rich Internet
Applications Suite", otherwise known as [WAI-ARIA](http://www.w3.org/WAI/intro/aria) or
just "ARIA".

## What Accessibility Support Means for Ext JS

Accessibility support in Ext JS is designed with three major goals in mind:

1. Keyboard Navigation - Components should be fully navigable using only the keyboard with
no mouse interaction required.
2. Focus Management - The framework should provide a clear indication of the currently
focused element that changes as the focused element changes.
3. DOM attributes - A Component's DOM elements should use attributes that provide semantic
information regarding the elements' type, state, and description.  These attributes
are used by screen readers to provide verbal cues to the user and can be categorized into
two separate groups:

    a. [ARIA Roles](http://www.w3.org/TR/wai-aria/roles) are the main indicator of a
    Component's or Element's type.  Roles are constant and do not change as the user
    interacts with a Component.  The most commmonly used ARIA Roles in Ext JS are
    [Widget Roles](http://www.w3.org/TR/wai-aria/roles#widget_roles), many of which
    directly correspond to Ext JS components.  Some examples of widget roles are:

        - button
        - checkbox
        - tabpanel
        - menuitem
        - tooltip

    b. [ARIA States and Properties](http://www.w3.org/TR/wai-aria/states_and_properties)
    are DOM attributes that may change in response to user interaction or application state.
    An example of an ARIA State is the `"aria-checked"` attribute that is applied to a
    checkbox component when it is checked by the user.  An example of an ARIA Property is
    the `"aria-readonly"` property of a form field which may be dynamically changed based
    on validation or user input.

## How Accessibility Support is implemented in Ext JS

Accessibility support in Ext JS is implemented in three major pieces:

1. Core Framework Support - ARIA support in Ext JS is designed to be opt-in as much as
possible, and so is implemented primarily usisng a separate package and theme.  However, 
support for most [ARIA Roles](http://www.w3.org/TR/wai-aria/roles), especially Widget Roles
is implemented in the core framework.  This is done because ARIA Roles need to be applied
to Components at render time and so must be included in the Components'
`{@link Ext.Component#renderTpl renderTpl}`.   
2. The `"ext-aria"` package - `"ext-aria"` is a separate [Sencha Cmd Package](#/guide/command_packages)
that provides improved keyboard navigation, focus management, and support for
[ARIA States and Properties](http://www.w3.org/TR/wai-aria/states_and_properties). It is
usually not necessary to directly require the `"ext-aria"` package in an application because
it is already required by the `"ext-theme-aria"` theme.
3. The `"ext-theme-aria"` theme - A high-contrast theme makes applications easier for visually
impaired users to view.  `"ext-theme-aria"` can be used out of the box, or extended to
create a customized look and feel.

## Building an Accessible Ext JS Application

Lets start by building an new application from scratch that uses the Accessibility features
of Ext JS 4.2.1.

### Download the Ext JS SDK

The first step is to download the [Ext JS SDK](http://www.sencha.com/products/extjs/download/).
Unzip the SDK to a location of your choosing.  For this tutorial, we assume that you
unzipped the SDK to your home directory: `"~/extjs-4.2.1/"`.

### Install Sencha Cmd

To build an Ext JS Application with accessibility features enabled you need to have at least
version 3.1.2 of Sencha Cmd installed.  For installation instructions see:
[Introduction to Sencha Cmd](#/guide/command).

### Create a Workspace

Now that you have Sencha Cmd and the Ext JS SDK installed, you are ready to begin building
the application.  From the command line, enter the following command, and replace
`"~/ext-4.2.1"` with the path where you unzipped the Ext JS SDK.

    sencha -sdk ~/ext-4.2.1 generate workspace my-workspace

This generates a Sencha Cmd workspace that will contain your application and copies the
Ext JS SDK into the workspaces `"ext"` directory.  For more information on workspaces see:
[Workspaces in Sencha Cmd](#/guide/command_workspace).

### Generate the Application

Sencha Cmd makes generating an application easy. Navigate into the workspace you just
created:

    cd my-workspace

Then run:

    sencha -sdk ext generate app MyAriaApp my-aria-app

This tells Sencha Cmd to generate an application named `"MyAriaApp"` in a directory named
`"my-aria-app"` and to find the Ext JS SDK in  the workspace's `"ext"` directory.  You
can build the application by running the following command from the newly created
`"my-aria-app"` directory:

    sencha app build

After building the application you can run it by opening
`"my-workspace/build/MyAriaApp/production/index.html"` in a browser.

### Enabling Accessibility (ARIA) Support in the Application

The easiest way to enable ARIA support in your application is to use the `"ext-theme-aria"`
theme. To do this, find following line in `"my-aria-app/.sencha/app/sencha.cfg"`:

    app.theme=ext-theme-classic

And replace it with this:

    app.theme=ext-theme-aria

If you want to be able to run your app in development mode, you will need to refresh the
bootstrap files now (for more info see [Single-Page Ext JS Apps](#/guide/command_app_single)):

    sencha app refresh

Now build your app again by running the following command:

    sencha app build

Run your app by opening the index.html page in a browser.  You should see an empty
application shell with a viewport and a few components that Sencha Cmd generaated for you:

{@img generated-app.png Generated Application}

### Navigating an ARIA-Enabled Ext JS Application

With ARIA support turned on, an Ext JS Application should be navigable using only the keyboard,
with no mouse input required.  The visual indicator of which component currently has focus
is referred to as the "focus frame".  In `"ext-theme-aria"` the focus frame is rendered
with an orange border.  You will notice when you load the index page of the app you just
created that this border appears around the edge of the {@link Ext.container.Viewport Viewport}.
This is because the Viewport is automatically recognized as the application's main container.
It is the starting point of all navigation and so receives focus by default when the page
is loaded.  If your application does not use a Viewport, you need to set the `ariaRole`
config of the top-level container in your application to `'application'`. For example:

    Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        title: 'Main Panel',
        ariaRole: 'application',
        ...
    });

In the application there is currently only one focusable Component - the Viewport.
Let's add some more focusable Components so we can see how keyboard navigation works.
Modify `"my-aria-app/app/view/Viewport.js"` to contain the following code:

    Ext.define('MyAriaApp.view.Viewport', {
        extend: 'Ext.container.Viewport',
        requires: [
            'Ext.layout.container.Border'
        ],

        layout: 'border',

        defaults: {
            split: true
        },

        items: [{
            region: 'west',
            width: 200,
            title: 'West Panel',
            ariaRole: 'region',
            items: [{
                xtype: 'textfield'
            }, {
                xtype: 'textfield'
            }, {
                xtype: 'button',
                text: 'Toggle Me',
                enableToggle: true
            }]
        }, {
            xtype: 'tabpanel',
            region: 'center',
            title: 'Center Panel',
            ariaRole: 'region',
            items: [{
                title: 'Tab 1'
            }, {
                title: 'Tab 2'
            }, {
                title: 'Tab 3'
            }]
        }, {
            region: 'east',
            width: 200,
            title: 'East Panel',
            ariaRole: 'region'
        }]
    });

Here we create a viewport that uses a {@link Ext.layout.container.Border Border Layout}
and has three child panels laid out as east, west, and center regions.  Each region is
made focusable and navigable via the keyboard by configuring it with an `ariaRole` of
`'region'`.  The center panel is a {@link Ext.tab.Panel Tab Panel} and has three tabs.
Tabs are focusable by default and so no special code is needed to enable keyboard navigation.
We've added some {@link Ext.form.field.Text Text Fields} and a
{@link Ext.button.Button#enableToggle Toggle Button} to the `"west"` region, and these
components are also focusable by default.

Let's rebuild the application and view the result:

    sencha app build

{@img app.png ARIA Application}

By default the Viewport is the focused Component.  Press the enter key to navigate into
The Viewport and cycle through it's children (the west, center, and east regions) using
the tab key.  Try pressing the enter key while the west region is focused and using
the tab key to cycle through the items.  When the toggle button is focused use the enter
or space key to toggle its pressed state.  You can move back out of the west region by
pressing the "esc" key.  To navigate the tabs, move the focus to the center panel and
press "enter", then use the arrow keys to navigate the tabs and the enter key to activate
a tab.

### Verifying that ARIA Attributes Have Been Applied

You can verify that the correct ARIA Roles, States and Properties have been applied to
components by inspecting the DOM using the development tools in your browser of choice.
For example, inspect the {@link Ext.button.Button Button} component in your app.  In
[Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/) the Button's
main "A" element looks something like this:

{@img button-element.png Button DOM Element}

Notice how it has the ARIA Role of "button" (`role="button"`), and an ARIA State of
`aria-pressed="false"`.  If you toggle the button either by clicking it or by pressing
the space or enter key while the button is focused you should see the value of the
`aria-pressed` attribute change to `"true"`.

## Creating Your Own ARIA Theme

The best way to create a customized ARIA Theme is to create a theme package that extends
`"ext-theme-aria"`.  For instructions on theme creation see the
[Theming Guide](#/guide/theming).  The `"ext-theme-aria"` theme automatically includes
all of the required JavaScript overrides from the `"ext-aria"` package, and themes that
extend `"ext-theme-aria"` will as well.

If for some reason extending `"ext-theme-aria"` will not work for you, then you need to
make sure that you correctly require the `"ext-aria"` package, either in your theme, or in
your application.  This ensures that the JavaScript overrides from the `"ext-aria"`
package are included in your app, and is done by adding the following JSON property to
either your custom theme package's `"package.json"` file, or your application's `"app.json"`
file.

    "requires": [
        "ext-aria"
    ]

## Adding Accessibility Support to an Existing Application - Using Sencha Cmd

We've been over how to create a new Ext JS Application with ARIA support, but adding
ARIA support to an existing application is just as easy.  First make sure your application
is using Ext JS 4.2.1 or later.  You can upgrade an app that uses an older 4.x version of
the framework by downloading the [Ext JS SDK](http://www.sencha.com/products/extjs/download/)
and then running the following command from your application's root directory:

    sencha app upgrade /path/to/sdk

Then modify the application's `".sencha/app/sencha.cfg"` file and make sure the
`"app.theme"` property is set to `"ext-theme-aria"`:

    app.theme=ext-theme-aria

Refresh your application's bootstrap files if you want to use development mode:

    sencha app refresh

Then build your app by running the following command from the application's root directory:

    sencha app build

You may also set the theme from the command line if, for example, you want to build
your application with multiple themes:

    sencha config -prop app.theme=ext-theme-aria then app build

To enable keyboard navigation, add the appropriate `"ariaRole"` configs to your application's
Components as described above in the section on "Navigating an ARIA-Enabled Ext JS Application".

## Adding Accessibility Support to an Existing Application - Without Sencha Cmd

You may find yourself in the position of maintaining an older Ext JS application that
does not build using Sencha Cmd.  It is a beneficial to update these applications so that
they can build using Sencha Cmd; however, if using Sencha Cmd to build the app is not an
option, the application can still use the ARIA features of Ext JS by including the "all"
JavaScript and CSS files of the `"ext-aria"` package and the `"ext-theme-aria"` theme.

To use the ARIA features you will need to upgrade your application to use at least
[Ext JS 4.2.1](http://www.sencha.com/products/extjs/download/).  The next step is to
download the `"ext-aria"` and `"ext-theme-aria"` packages.  The easiest way to do this
is using Sencha Cmd.  If you don't have Sencha Cmd 3.2.1 or later already installed,
use the instructions found in the [Introduction to Sencha Cmd Guide](#/guide/command),
Then from the command line, run the following two command from your application's root
directory:

    sencha pacakge extract -todir . ext-aria
    sencha package extract -todir . ext-theme-aria

You can change the directory where the packages are extracted to by replacing the "."
in the `"sencha package"` command with the path to the directory where you want the packages
to be extracted.  After running this command you should see the following  2 directories in
your application root directory or the directory you specified:

- `"ext-aria"`
- `"ext-theme-aria"`.

An older Ext JS application typically has an index.html page that has the following structure:

    <html>
    <head>
        <title>My Application</title>

        <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
        <script src="ext/ext-all.js"></script>
        <script src="app.js"></script>
    </head>
    <body></body>
    </html>

Replace the href value for the `"ext-all.css"` link tag with
`"ext-theme-aria/build/resources/ext-theme-aria-all.css"`, and add a script tag that includes
`"ext-aria/build/ext-aria-debug.js"` after `"ext-all.js"`.  In the end your upgraded
index.html page should look something like this:

    <html>
    <head>
        <title>My Application</title>

        <link rel="stylesheet" type="text/css" href="ext-theme-aria/build/resources/ext-theme-aria-all.css">
        <script src="ext/ext-all.js"></script>
        <script src="ext-aria/build/ext-aria.js"></script>
        <script src="app.js"></script>
    </head>
    <body></body>
    </html>

To enable keyboard navigation, add the appropriate `"ariaRole"` configs to your application's
Components as described above in the section on "Navigating an ARIA-Enabled Ext JS Application".
