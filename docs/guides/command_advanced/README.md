# Advanced Sencha Cmd

This guide covers capabilities of Sencha Cmd available to advanced users. Before using the
functionality described in this guide, you should have read
[Introduction to Sencha Cmd](#/guide/command) and have a thorough understanding of Sencha
Cmd basics.

{@img ../command/sencha-command-128.png}

## Installation Considerations

### Location

The Installer lets you select a destination path, but changing this can have side effects
(see the section "Multiple Installed Versions"). Ideally, all versions of Sencha Cmd are
installed in a single base folder with sub-folders named by the version number. On Windows,
the default install folder for a single-user installation looks like this:

    C:\Users\myself\bin\Sencha\Cmd\3.1.n.n\

It is highly recommended that if you change this path, you preserve the last piece (that
is, the version number) as well as install any other versions of Sencha Cmd in that same
parent folder.

### Multiple Installed Versions

At the command prompt, all calls to `sencha` land in the most recently installed version
of Sencha Cmd. Sometimes this version may not be compatible with the current
application.

To support such scenarios, Sencha Cmd looks at the required version as specified by the
framework used by the application. It then delegates the command to the the proper version
of Sencha Cmd.

**Important** For this to work properly, both versions must be installed in a folder
named by their version number and located in a common parent folder.

Alternatively, each installed version also provides a version-specific name for Sencha Cmd.
This can be run as follows:

    sencha-3.1.n ....

Finally, the installer also sets an environment variable of the form `SENCHA_CMD_3_n_n`,
which can be used to adjust the PATH of the current console/shell, as follows.

On Windows, this looks like this (n is the current version):

    set PATH=%SENCHA_CMD_3_n_n%;%PATH%
    sencha ....

On OSX/Linux, this looks like this:

    set PATH=$SENCHA_CMD_3_n_n:$PATH
    sencha ....

## Configuration

Any parameter that can be passed to Sencha Cmd on the command line can be set as a
configuration option in one of the configuration files discussed below. If you know the
command line option, it is a simple matter to add that option to a configuration file.

For example, to specify the `ignore` parameter for `sencha compile` in the configuration,
add this line:

    sencha.compile#ignore=attic

This particular setting is not necessarily a recommended practice, but it just serves to
illustrate the syntax. The parts of the command that goes before the `#` are the Sencha
Cmd commands separated by dots. Following the `#` is the option name.

To set global options (like `debug` logging), do this:

    sencha#debug=true

Configuration becomes more important over time as Sencha Cmd (especially the compiler)
evolves.

### Configuration Files

Similar to Apache Ant (on which many aspects of Sencha Cmd are based), configuration is
applied in a "first-write-wins" model. This is essential to allow property values to be
overridden by the command line.

The process of loading configuration begins by searching from the current directory and
proceeds up the file system until the Workspace is found. Along the way, Sencha Cmd looks
detected the presence of an Application or Sencha Framework SDK. At the end of the loading
process, Sencha Cmd will load any of the following files it detects in this order:

  * **`${app.dir}/.sencha/app/sencha.cfg`** - Application configuration when in an application
  folder is the most specific and is loaded first.
  * **`${package.dir}/.sencha/package/sencha.cfg`** - Package configuration when in a package
  folder is the most specific and is loaded first.
  * **`${workspace.dir}/.sencha/workspace/sencha.cfg`** - Workspace configuration is applied
  next when you are in a workspace (or an app or package in the workspace).
  * **`${framework.dir}/cmd/sencha.cfg`** - Based on the applicable framework for the app or
  package at the current directory, those properties are loaded next.
  * **`${home.dir}/.sencha/cmd/sencha.cfg`** - *(New to v3.1.1)* Your personal configuration
  is loaded next. This will typically only set high-level properties.
  * **`${cmd.dir}/../sencha.cfg`** - *(New to v3.1.1)* Local machine Cmd configuration is
  loaded next. This will typically only set high-level properties. This is loaded from the
  parent folder of the running Sencha Cmd, which is intended to be the folder that holds
  the various installed versions of Sencha Cmd.
  * **`${cmd.dir}/sencha.cfg`** - Lastly, the Sencha Cmd, version specific configuration is
  loaded.

This yields basically the same result as Sencha Cmd v3.0's approach which used a cascade
that loaded the above files in reverse order but overwrote properties as it progressed.
The key difference between Sencha Cmd v3.0 and v3.1 is that properties passed at the
command line override those in these files. This is seen in the following command:

    sencha config -prop foo=42 then ...

This will set `"foo"` to 42 prior to the loading of config files, and in Sencha Cmd v3.1,
this setting will "win".

### Java System Properties

There are certain Java System Properties that you may need to set for Sencha Cmd. The most
typical are HTTP Proxy Server settings. The `"sencha.cfg"` file in your Cmd install folder
has default settings for proxies that should enable detection of your system-defined proxy.
For further information, consult the comments found in `"${cmd.dir}/sencha.cfg"`.

**NOTE:** If you should need to change any of these settings, you may want to do so in the 
`"${cmd.dir}/../sencha.cfg"` file instead so that these settings are preserved across Cmd
upgrades.

These properties will effect Sencha Cmd's ability to access the Web in order to perform
`sencha upgrade` or to download packages. These options are new to Cmd v3.1.1.

## Command Line Details

Here are some helpful tricks if you make frequent use of Sencha Cmd.

### Shortest Unique Prefix

All commands, categories and options in Sencha Cmd can be specified by their full name or
by the shortest prefix that is unique.

To illustrate, since `generate` is the only top-level category in Sencha Cmd that currently
starts with the letter "g", and likewise, `app` is the only command in that category that
starts with an "a", the following commands are equivalent:

    sencha generate app MyApp ../MyApp
    sencha gen ap MyApp ../MyApp

**Important** While this can be convenient at the console or terminal, it is not a good
practice to use extremely short/terse prefixes in scripts. The use of such terse commands
in scripts will needlessly confuse anyone trying to understand or maintain the script in
the future and can break if the addition of new commands makes the short form ambiguous.

### Command Chaining

The Sencha Cmd command-line processor executes all commands given to it until they have
all been dispatched. This means you can avoid the cost of relaunching the whole Sencha Cmd
process to execute multiple commands. To take advantage of this, insert `and` or `then`
between commands.

The `and` and `then` commands are based on the execution model of Sencha Cmd and its
hierarchical structure of commands and categories. The `and` command is used to execute
another command in the same category as the previous command. This is the most common use
case.

For example, to generate a controller and two models, use this:

    cd /path/to/MyApp
    sencha generate controller Central and model User id:int and model Ticket id,name,email

In the above, the two uses of `and` caused two `generate model` commands to be executed.
The `then` command is similar to `and`, except that the next command will be part of the
root category (that is, the `sencha` command).

For example, the following generates a new model, then builds the application:

    cd /path/to/MyApp
    sencha generate model User id:int,name then app build

### Response Files

When command chaining starts to make command lines too long to be readable, perhaps in a
complex build script, you can put command line arguments in a file and tell Sencha Cmd to
read arguments from that file.

For example:

    cd /path/to/MyApp
    sencha @file.sencha

In the above, the `"file.sencha"` file is read and each line is taken to be a command line
argument, unless that line begins with "#", in which case it is skipped. All lines from
the specified file are inserted into the command line arguments as if they had been typed
there instead of `"@file.sencha"`. This means that `"file.sencha"` can contain response file
insertions as well (for example, `"@file2.sencha"`).

### Category State

For performance reasons, some categories maintain state across multiply executed commands.
The best example of this is the new `compile` category of commands. Instead of reading all
the sources for each command, the `compile` category maintains a cache of all the files in
the class path. This context is then available to all of the commands in the category.

The following command rebuilds the `ext-all-dev.js` and `ext-all.js` files while reading
the framework sources only once:

    cd /path/to/MyApp
    sencha compile -c sdk/src --debug=true concat -o sdk/ext-all-dev.js \
        and --debug=false concat -c -o sdk/ext-all.js

If you don't want to use this caching, perhaps because the set of files is not the same
for the next set of outputs, use the `then` command, like this:

    cd /path/to/MyApp
    sencha compile -c sdk/src --debug=true concat -o sdk/ext-all-dev.js \
         then compile -c app/foo --debug=true concat -o app/foo/foo-all.js

At present, only the `compile` category maintains state across commands.

## Plugins

While the same Sencha Cmd install is used by both Ext JS and Sencha Touch, there are many
times when commands perform slightly different operations depending on the framework.
Further, some commands may only be available for one framework.

To accommodate this, the functionality of Sencha Cmd is partitioned across two layers: the
command line (properly called "Sencha Cmd") and the lower-level interface for use in
[Ant](http://ant.apache.org/). Commands that have these special concerns are routed from
the command line into a plugin.

{@img sencha-command-diagram.png}

A Sencha Cmd plugin is just an Ant script contained in a file called `"plugin.xml"` though
for any given command, executed in an application or workspace, there are potentially
several active plugins.

The process begins by looking for the most specific plugin available. The search goes
like this:

  * `${app.dir}/.sencha/app/plugin.xml`
  * `${workspace.dir}/.sencha/workspace/plugin.xml`
  * `${cmd.dir}/plugins/${framework.name}/${framework.plugin.version}/plugin.xml`
  * `${cmd.dir}/plugin.xml (also known as the "default plugin")`

The first of these to be found will be based on the current directory. Sencha Cmd will
then load only that plugin and invoke specific targets based on the command it was given.
These plugins, however, contain the Ant invocation required to load the plugin at the next
level up. For example, if the application plugin is found, it contains an `import` of the
workspace plugin. That plugin contains an `import` of the framework plugin and, lastly,
that contains an `import` of the default plugin.

### Extension Points

Technically, the lowest two levels (the framework and default plugins) are the only plugins
that contain actual code. The application and workspace plugins are empty by default but
are present to allow for user extension of these built-in commands. The purpose for this
is to allow you to add logic to enforce project or application standards for code
generation requests made to Sencha Cmd.

If you want to check to see if new model definitions follow project guidelines, say that
the first field is always `id:string`, you could add something this to the application or
workspace `"plugins.xml"`:

    <target name="-before-generate-model">
        <if>
            <not><matches string="${args.fields}" pattern="^id\:string,.*"/></not>
            <then>
                <fail>Models must have "id:string" as first field.</fail>
            </then>
        </if>
    </target>

Similarly you could also provide a hook to update other systems when a new model has been
added.

    <target name="-after-generate-model">
        ... post new/updated Model ${args.name} and ${args.fields} ...
    </target>

The actual target names will be slightly different based on which plugin you extend. For
specifics, consult the comments in the respective `"plugin.xml"` file.

**Note.** The default `"plugin.xml"` file imports [Ant Contrib](http://ant-contrib.sourceforge.net/)
which provides many [useful tasks](http://ant-contrib.sourceforge.net/tasks/tasks/index.html).

## Use in Ant

While the primary use of Sencha Cmd is at the command line (hence its name), Sencha Cmd is
also usable directly from Ant. For details about the many commands provided at this level,
see the [Ant Integration](#/guide/command_ant) guide.
