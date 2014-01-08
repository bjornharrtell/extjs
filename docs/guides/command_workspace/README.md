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
contains one or more pages, frameworks, packages and other shared code or files. The
location of the workspace root folder should be chosen to facilitate these needs as well
as your source control requirements. Any generated applications/pages created in sub-folders
of the workspace folder regardless of their depth are consider to be members of the workspace.

Though not a requirement, it is typically the case that the workspace folder is the root
folder in a source control repository.

The exact organization of your pages inside your workspace is not important to Sencha Cmd.
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

## Frameworks

The location of Sencha Ext JS or Sencha Touch (i.e., the "SDK" or "framework") is stored
as a configuration property of the workspace. This allows multiple pages to share this
configuration. Different teams will have different preferences on these locations and
whether or not the Sencha SDK's are stored in their source control system. The settings
discussed below give you control over the location of Sencha SDK's in your workspace.

By default, a workspace that has both Sencha Ex JS and Sencha Touch SDK's will have these
property settings in `".sencha/workspace/sencha.cfg"`:

    ext.dir=${workspace.dir}/ext
    touch.dir=${workspace.dir}/touch

The value of the `workspace.dir` property is determined by Sencha Cmd and is expanded as
needed. In other words, by default, a workspace contains a copy of the SDK's used by the
applications it holds.

Applications reference their framework indirectly using the `app.framework` property in
their `".sencha/app/sencha.cfg"` file:

    app.framework=ext

## Generating Pages

Once you have a workspace, generating pages ("apps") is the same as before:

    sencha -sdk /path/to/ext generate app ExtApp /path/to/workspace/extApp

You can also generate Sencha Touch applications in the same workspace:

    sencha -sdk /path/to/touch generate app TouchApp /path/to/workspace/touchApp

Because the target of these generated pages is in a workspace, the following structure
will be created (which is slightly different than for a single-page app):

    .sencha/                    # Sencha-specific files (e.g. configuration)
        workspace/              # Workspace-specific content (see below)
            sencha.cfg          # Workspace's configuration file for Sencha Cmd
            plugin.xml          # Workspace plugin for Sencha Cmd

    ext/                        # A copy of the Ext JS SDK
        ...

    touch/                      # A copy of the Sencha Touch SDK
        ...

    extApp/
        .sencha/                # Sencha-specific files (e.g. configuration)
            app/                # Application-specific content
                sencha.cfg      # Application's configuration file for Sencha Cmd

    touchApp/
        .sencha/                # Sencha-specific files (e.g. configuration)
            app/                # Application-specific content
                sencha.cfg      # Configuration file for Sencha Cmd

    build/                      # The folder where build output is placed.
        extApp/                 # Build output for ExtApp (by environment)
            production/
            testing/
        touchApp/               # Build output for TouchApp (by environment)
            production/
            testing/
            native/
            package/

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
of these properties after framework locations is probably `workspace.classpath`.

Settings found in multiple files are processed in "first-write-wins" fashion (as is normal
for Apache Ant scripts). This allows properties to be controlled at the command-line when
necessary. The order these files are loaded when present is as follows:

 - `${app.dir}/.sencha/app/sencha.cfg`
 - `${workspace.dir}/.sencha/workspace/sencha.cfg`
 - `${ext.dir}/cmd/sencha.cfg` or `${touch.dir}/cmd/sencha.cfg`
 - `${cmd.dir}/sencha.cfg`

By convention, the properties defined in the `"sencha.cfg"` file for these "scopes" have
a common prefix. For properties at the Application scope (`".sencha/app/sencha.cfg"`)
start with "app." while those in the workspace scope (`".sencha/workspace/sencha.cfg"`)
have the prefix "workspace.", frameworks use "framework." and Sencha Cmd uses "cmd.".

Details on configuration properties can be found by reading the comments found in these
files. The prefix should help you find where a property is defined.

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
class definitions.
