# Workspaces in Sencha Cmd

{@img ../command/sencha-command-128.png}

This guide shows how to use the new workspace feature of Sencha Cmd for building large
applications that use multiple pages. This feature lets Sencha Cmd understand the pages,
frameworks, and the shared code used by the various pages of your application. This
enables Sencha Cmd to automate many common tasks.

The process for building a large application starts off the same as the process for
building a single-page app. Before learning about the workspace feature for large
applications, be sure to understand Sencha Cmd basics by reading
[Using Sencha Cmd](#/guide/command_app). 

*Note on terminology.* Sencha frameworks-based applications, which employ MVC architecture,
call `Ext.application` at the top of the code tree. This can be confusing because the
frameworks use the term "application" to describe each page. In single-page applications,
these terms are interchangeable. When your application involves multiple pages, however,
this is not the case. This guide uses the term "page" in most cases because that is more
fitting in this context.

## What's a Workspace?

New to Sencha Cmd V3 is the concept of a "workspace". A workspace is simply a folder that
contains one or more pages, frameworks and other shared code or files. The location of the
workspace root folder should be chosen to facilitate the needs of your application's pages,
shared code, and framework locations. All generated pages should reside in sub-folders of
the workspace folder. Though not a requirement, it is typically the case that the workspace
folder is the root folder in a source control repository.

The exact organization of your pages inside a workspace is not important to Sencha Cmd.
For the sake of simplicity, however, the examples in this guide create all pages as immediate
sub-folders of the workspace.

## Generating a Workspace

To generate a workspace, use this command:

    sencha generate workspace /path/to/workspace

This will create the following structure in the specified folder.

    .sencha/                # Sencha-specific files (e.g. configuration)
        workspace/          # Workspace-specific content (see below)
            sencha.cfg      # Configuration file for Sencha Cmd
            plugin.xml      # Plugin for Sencha Cmd

The above directory structure should be familiar as it was part of the structure created in
[Using Sencha Cmd](#/guide/command_app). In this case, however, only the ".sencha/workspace"
folder is created.

## Generating Pages

Once you have a workspace, generating pages ("apps") is the same as before:

    sencha -sdk /path/to/ext generate app ExtApp /path/to/workspace/extApp

You can also generate Sencha Touch applications in the same workspace:

    sencha -sdk /path/to/touch generate app TouchApp /path/to/workspace/touchApp

Because the target of these generated pages is in a Workspace, the following structure
will be created (which is slightly different than for a single-page app):

    .sencha/                    # Sencha-specific files (e.g. configuration)
        workspace/              # Workspace-specific content (see below)
            sencha.cfg          # Configuration file for Sencha Cmd
            plugin.xml          # Plugin for Sencha Cmd

    ext/                        # A copy of the Ext JS SDK
        ...

    touch/                      # A copy of the Sencha Touch SDK
        ...

    extApp/
        .sencha/                # Sencha-specific files (e.g. configuration)
            app/                # Application-specific content
                sencha.cfg      # Configuration file for Sencha Cmd

    touchApp/
        .sencha/                # Sencha-specific files (e.g. configuration)
            app/                # Application-specific content
                sencha.cfg      # Configuration file for Sencha Cmd

    build/                      # The folder where build output is placed.
        extApp/                 # Build output for ExtApp
            ...
        touchApp/               # Build output for TouchApp (by environment)
            native/
            package/
            production/
            testing/

To generate more pages, repeat the above command. See the respective framework's
[Using Sencha Cmd](#/guide/command_app) guide for details.

## Building Pages

The process for building each page of a multipage application is to run this command
from each of the appropriate folders:

    sencha app build

For efficiency, you can create a script for this process, perhaps using Sencha Cmd's
[Ant Integration](#/guide/command_ant).

## Configuration

Configuration is similar to what is described in [Using Sencha Cmd](#/guide/command_app).
The file `".sencha/app/sencha.cfg"` holds configuration for one page ("app"). The most
important of the properties found there is perhaps `app.classpath`.

Unlike the single-page application, the `".sencha/workspace/sencha.cfg"` file is now useful
for setting configuration properties for all pages in the workspace. The most important
of these properties is probably `workspace.classpath`.

Settings found in multiple files are replaced as the properties in each file are loaded in
the following order:

 - `/some/system/path/Sencha/Cmd/<version>/sencha.cfg`
 - `${workspace.dir}/${app.framework}/cmd/sencha.cfg`
 - `${workspace.dir}/.sencha/workspace/sencha.cfg`
 - `${app.dir}/.sencha/app/sencha.cfg`

Configuration properties set by Sencha Cmd can be overridden by the config of the framework,
which can be overridden at the workspace level and finally at the level of the application
itself. This means that the final result of a property can always be controlled by the
`"sencha.cfg"` file for a page.

Details on configuration properties can be found by reading the comments found in these
files.

## Sharing Code Between Pages

Multipage applications commonly share code between pages. Using a workspace, you can use
Sencha Cmd to automatically scan shared code with the `sencha app build` command. Here's
how to do that.

Let's add a `common` folder to the workspace, like so:

    .sencha/
        workspace/
        ...
    common/             # Folder for common things between pages.
        src/            # Folder for common JavaScript code for all pages.

To include `common/src` when building all pages in the application, add the follow to
`".sencha/workspace/sencha.cfg"`:

    workspace.classpath=${workspace.dir}/common/src

This adds the following component to the default classpath:

    ${framework.classpath},${workspace.classpath},${app.classpath}

## Mixed Applications

Beyond sharing code between multiple Ext JS pages, or between multiple Sencha Touch
applications, there is often the need to share code across the two Sencha frameworks.
While the frameworks have a lot in common, they differ in many significant aspects,
particularly in the areas of UI components and layouts, which one would expect given that
they target such different device environments. Even with these differences, it's possible
to share code between the two frameworks, for example, sharing code between two model
class definitions. The specifics of sharing code between Ext JS and Sencha Touch differs
between the two frameworks, so be sure to read the guides for using Sencha Cmd with each.
