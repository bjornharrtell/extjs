# sencha


## sencha ant

Invokes the embedded version of Apache Ant providing the `cmd.dir` property to
access Sencha Cmd using the following `taskdef`:

    <taskdef resource="com/sencha/ant/antlib.xml"
             classpath="${cmd.dir}/sencha.jar"/>

This command recognizes the `-Dproperty=value` syntax for properties used by
Ant, even though this does not conform to normal Sencha Cmd parameter syntax.
Similar to directly invoking Ant, this command defaults to `"build.xml"` for
the script file basing its search on the current directory or the value of the
`-cwd` switch passed to `sencha`.

For example, the following command uses `"../build.xml"` as the script and
passes in the `foo` property as "42" when executing the default target (since
no target was specified).

    sencha -cwd=.. ant -Dfoo=42


### Options
  * `--debug`, `-d` - Enables Ant debug level messages
  * `--file`, `-f` - The Ant file to execute (default is build.xml)
  * `--props`, `-p` - One or more properties for the Ant script (name=value,...)
  * `--target`, `-t` - The target(s) to execute from the Ant script (comma separated)
  * `--verbose`, `-v` - Enables Ant verbose level messages

## sencha app

This category contains various commands for application management.


### Categories
  * `package` - Packages a Sencha Touch application for native app stores

### Commands
  * `build` - Executes the build process for an application
  * `refresh` - Updates the application metadata (aka "bootstrap") file
  * `resolve` - Generate a list of dependencies in the exact loading order for the given application.
  * `upgrade` - Upgrade the given application to the SDK at the current working directory

## sencha app build

This command builds the current application.

    sencha app build [production|testing|native|package]

This will build your application in its current configuration and generate the
build output in the `"build/<environment>"` folder. This location and many
other properties can be configured in your application's configuration file
`".sencha/app/sencha.cfg"` or the provided build script `"build.xml"`.

For locally overriding build properties, the build script loads an optional
properties file called `"local.properties"` if present in your app folder. The
purpose of this file is to define build properties that are in some way special
to the local environment (that is, the local machine). As such, this file is
not intended to be tracked in source control.

#### Using Ant

This command is equivalent to running the provided Ant script directly using
the following command:

    sencha ant [production|testing|native|package] build

To tune the process, start by looking at the generated `"build.xml"` in your
app folder. The actual build logic is located in `".sencha/app/build-impl.xml"`.

The `"build.xml"` script can be used by many Continuous Integration (CI) systems
if they understand Apache Ant (most do). If not, the Sencha Cmd command line
can be used as you would during development. If the CI system understands Ant,
however, it is often more convenient to use that integration rather than using
a command line invocation.


### Options
  * `--archive`, `-a` - The directory path where all previous builds were stored.
  * `--destination`, `-d` - The directory path to build this application to. Default: build
  * `--environment`, `-e` - The build environment, either 'testing', 'production', 'package' (Touch Specific), or 'native' (Touch Specific).
  * `--run`, `-r` - Enables automatically running builds with the native packager

## sencha app package



### Commands
  * `build` - Packages an app with the given configuration file
  * `generate` - Generates a Packager configuration JSON file
  * `run` - Packages and tries to run the application for the given configuration JSON file

## sencha app package build

This command creates a native package of the current application.


### Options
  * `--path`, `-p` - the path to the configuration file

## sencha app package generate

This command generates a Packager configuration JSON file.


### Options
  * `--path`, `-p` - the path to the configuration file

## sencha app package run

This command packages and runs the current application.


### Options
  * `--path`, `-p` - the path to the configuration file

## sencha app refresh

This command regenerates the metadata file containing "bootstrap" data for the
dynamic loader and class system.

This must be done any time a class is added, renamed or removed.

This command can also update any required packages if you have added package
requirements to your application. To refresh required packages (which may
download those packages from remote repositories), do this:

    sencha app refresh --packages


### Options
  * `--base-path`, `-b` - The base path to use to calculate relative path information. Defaults to index.html directory
  * `--metadata-file`, `-m` - The output filename for the js file containing the manifest metadata
  * `--packages`, `-pac` - Update required packages from remote repositories

## sencha app resolve

Generate a list of dependencies in the exact loading order for the current
application.

NOTE: the resolved paths are relative to the current application's HTML file.


### Options
  * `--output-file`, `-o` - The file path to write the results to in JSON format.
  * `--uri`, `-u` - The URI to the application\'s HTML document

## sencha app upgrade

This command upgrades the current application (based on current directory) to a
specified new framework.

    sencha app upgrade /path/to/sdk

NOTE: This will upgrade the framework used by the current application in the
current workspace. This will effect any other applications in this workspace
using the same framework (i.e., "ext" or "touch").

To upgrade just the generate scaffolding of your application to a new version
of Sencha Cmd and not the framework in use, do this:

    sencha app upgrade --noframework


### Options
  * `--noframework`, `-no` - Upgrade only the Sencha Cmd scaffolding and not the SDK
  * `--path`, `-p` - The path to the framework to which to upgrade

## sencha build

This command is used to process a legacy JSBuilder ("jsb") file.

DEPRECATED: This command is provided for backwards compatibility with previous
releases. It is highly recommended to migrate applications to the new `compile`
command and discontinue use of this command.


## sencha cert



### Commands
  * `check` - Check signatures on a certificate against other certificates
  * `create` - Create a new certificate
  * `merge` - Merge signatures from one copy of a certificate to another
  * `sign` - Signs one certificate with another

## sencha cert check



### Options
  * `--from`, `-f` - The certificate(s) or folder(s) from which to check
  * `--minimum-signatures`, `-m` - The minimum number of valid signature required

## sencha cert create



### Options
  * `--data`, `-d` - Extra data for the certificate (e.g., -data name1:value1 -data name2:value2
  * `--email`, `-em` - The email address for the owner of the local repository
  * `--expiration`, `-ex` - The number of years before the generated key pair becomes invalid
  * `--keybits`, `-k` - Specifies the number of bits for the generated public/private key pair
  * `--name`, `-n` - The name for the owner of the certificate
  * `--password`, `-p` - The password to apply to the private key (default is none)

## sencha cert merge



### Options
  * `--from`, `-f` - Name of the certificate from which to copy signatures

## sencha cert sign



### Options
  * `--password`, `-p` - Password for the signing certificate's private key (default is none)
  * `--with`, `-w` - Name of the certificate with which to sign

## sencha compass



### Options
  * `--native`, `-n` - Enables / disables calls to system installed MRI compass
  * `--ruby-path`, `-r` - set the path to MRI ruby executable

## sencha compass compile



### Options
  * `--config`, `-co` - controls the '--config' argument to compass, specifies the configuration ruby file to use
  * `--css-dir`, `-cs` - sets the css-dir compass argument
  * `--sass-dir`, `-s` - sets the sass-dir compass argument
  * `--workingdir`, `-w` - sets the working directory for the compass process

## sencha compile

This command category provides JavaScript compilation commands. The `compile`
category maintains compilation state across its sub-commands so using `and` to
connect sub-commands can provide significant time savings compared to making
repeated calls.


### Options
  * `--classpath`, `-cl` - Add one or more folders to the classpath
  * `--debug`, `-d` - Enable the debug option for the js directive parser
  * `--ignore`, `-ig` - Ignore files in the classpath with names containing substrings (comma separated)
  * `--options`, `-o` - Sets options for the js directive parser (name:value,...)
  * `--prefix`, `-p` - The file with header or license prefix to remove from source files

### Commands
  * `concatenate` - Produce output file by concatenating the files in the current set
  * `exclude` - Exclude files from the current set matching given criteria
  * `include` - Add files to the current set matching given criteria
  * `intersect` - Intersect specified saved sets to produce a new set
  * `metadata` - Generates information about the classes and files in the classpath
  * `page` - Compiles the content of a page of markup (html, jsp, php, etc)
  * `pop` - Pops the current set back to the most recently pushed set from the stack
  * `push` - Pushes the current set on to a stack for later pop to restore the current set
  * `restore` - Restores the enabled set of files from a previously saved set
  * `save` - Stores the currently enabled set of files by a given name
  * `show-ignored` - Shows any files being ignored in the classpath
  * `union` - Similar to include but selects only the files that match the given criteria

## sencha compile concatenate



### Options
  * `--append`, `-a` - Appends output to output file instead of overwriting output file
  * `--beautify`, `-b` - enables / disables beautification of sources after compilation
  * `--closure`, `-cl` - Compress generate file using Closure Compiler
  * `--compress`, `-co` - Compress generated file using default compressor (YUI)
  * `--output-file`, `-o` - the output file name
  * `--remove-text-references`, `-r` - enables / disables reference optimization by converting string classnames to static references
  * `--strip-comments`, `-st` - Strip comments from the generated file
  * `--uglify`, `-u` - Compress generate file using uglify-js
  * `--yui`, `-y` - Compress generated file using YUI Compressor

## sencha compile exclude



### Options
  * `--all`, `-a` - Select all files in global cache (ignores other options)
  * `--class`, `-c` - Selects files according to the specified class names
  * `--file`, `-f` - Selects the specified file names (supports glob patterns)
  * `--namespace`, `-na` - Selects all files with class definitions in the given namespace(s)
  * `--not`, `-no` - Inverts the matching criteria
  * `--recursive`, `-r` - Enable traversal of dependency relationships when selecting files
  * `--set`, `-s` - Selects files from on a previously saved set (ignores other options)
  * `--tag`, `-t` - Selects all files with the specified '//@tag' values

## sencha compile include



### Options
  * `--all`, `-a` - Select all files in global cache (ignores other options)
  * `--class`, `-c` - Selects files according to the specified class names
  * `--file`, `-f` - Selects the specified file names (supports glob patterns)
  * `--namespace`, `-na` - Selects all files with class definitions in the given namespace(s)
  * `--not`, `-no` - Inverts the matching criteria
  * `--recursive`, `-r` - Enable traversal of dependency relationships when selecting files
  * `--set`, `-s` - Selects files from on a previously saved set (ignores other options)
  * `--tag`, `-t` - Selects all files with the specified '//@tag' values

## sencha compile intersect



### Options
  * `--min-match`, `-m` - The minimum number of sets containing a file to cause a match (-1 = all)
  * `--name`, `-n` - The name by which to save the intersection as a set
  * `--sets`, `-s` - The sets to include in the intersection

## sencha compile metadata



### Options

#### Data Type
Choose one of the following options

  * `--alias`, `-ali` - Generate class name to alias information
  * `--alternates`, `-alt` - Generate class alternate name information
  * `--definitions`, `-d` - Generate symbol information
  * `--filenames`, `-f` - Generate source file name information
  * `--loader-paths`, `-l` - Generate dynamic loader path information
  * `--manifest`, `-m` - Generate a class definition manifest file

#### Format
Choose one of the following options

  * `--json`, `-json` - Generate data in JSON format
  * `--jsonp`, `-jsonp` - Generate data in JSONP format using the given function
  * `--tpl`, `-t` - The line template for generating filenames as text (e.g. <script src="{0}"></script>)

#### Misc

  * `--append`, `-ap` - Appends output to output file instead of overwriting output file
  * `--base-path`, `-b` - Set the base path for relative path references
  * `--output-file`, `-o` - the output file name
  * `--separator`, `-s` - The delimiter character used to separate multiple templates

## sencha compile optimize



### Options
  * `--define-rewrite`, `-d` - enables / disables class definition optimizations (default: false)
  * `--include-metadata`, `-i` - enables / disables class system metadata inclusion in optimized output

## sencha compile page



### Options
  * `--append`, `-ap` - Appends output to output file instead of overwriting output file
  * `--beautify`, `-b` - enables / disables beautification of sources after compilation
  * `--classes-file`, `-cla` - the name of the js file containing the concatenated output
  * `--closure`, `-clo` - Compress generate file using Closure Compiler
  * `--compress`, `-co` - Compress generated file using default compressor (YUI)
  * `--input-file`, `-i` - the html page to process
  * `--name`, `-n` - sets a reference name for the page
  * `--output-page`, `-o` - the output html page
  * `--remove-text-references`, `-r` - enables / disables reference optimization by converting string classnames to static references
  * `--scripts`, `-sc` - inject the given script path into the generated markup ahead of the all classes file
  * `--strip-comments`, `-str` - Strip comments from the generated file
  * `--uglify`, `-u` - Compress generate file using uglify-js
  * `--yui`, `-y` - Compress generated file using YUI Compressor

## sencha compile pop



## sencha compile push



## sencha compile restore

This command restores a saved set as the current set.


## sencha compile sass



### Options
  * `--etc-path`, `-etc-` - adds sass path entries to etc. files (comma separated file or dir paths)
  * `--ruby-path`, `-ruby-` - add paths to ruby files to include in generated config.rb
  * `--sass-path`, `-s` - adds sass path entries to rule files (comma separated file or dir paths)
  * `--var-path`, `-var-` - adds sass path entries to variable files (comma separated file or dir paths)

## sencha compile save

This command saves the current set with the specified name. A saved set can be
used as a criteria for set operations (e.g., `include`) via the `-set` option.
A saved set can also be restored as the current set via the `restore` command.


## sencha compile show-ignored



## sencha compile union



### Options
  * `--all`, `-a` - Select all files in global cache (ignores other options)
  * `--class`, `-c` - Selects files according to the specified class names
  * `--file`, `-f` - Selects the specified file names (supports glob patterns)
  * `--namespace`, `-na` - Selects all files with class definitions in the given namespace(s)
  * `--not`, `-no` - Inverts the matching criteria
  * `--recursive`, `-r` - Enable traversal of dependency relationships when selecting files
  * `--set`, `-s` - Selects files from on a previously saved set (ignores other options)
  * `--tag`, `-t` - Selects all files with the specified '//@tag' values

## sencha config

This command can be used to either set configuration options singly or load a
configuration file to set multiple options.

Because these configuration options are only held for the current execution of
Sencha Cmd, you will almost always use `then` to chain commands that will now
be executed with the modified configuration.

For example, to change the theme of an Ext JS application for a build:

    sencha config -prop app.theme=ext-theme-neptune then app build

Multiple properties can be loaded from a properties file:

    sencha config -file neptune.properties then app build

The content of `"neptune.properties"` might be something like this:

    app.theme=ext-theme-neptune
    app.build.dir=${app.dir}/build/neptune

In this case, an alternative would be to set `app.dir` in the applications's
`"sencha.cfg"` file like so:

    app.build.dir=${app.dir}/build/${app.theme}


### Options
  * `--file`, `-f` - The properties file to load
  * `--prop`, `-p` - One or more property names and values to set

## sencha diag



## sencha diag command



## sencha diag jar



## sencha diag show-props



## sencha diag version



## sencha fashion



### Options
  * `--output-type`, `-o` - Set the type of output (css or json). Defaults to css.

## sencha fs

This category provides commands for manipulating files.


### Categories
  * `mirror` - Commands for making mirror images for RTL languages
  * `web` - Manages a simple HTTP file server

### Commands
  * `concatenate` - Concatenate multiple files into one
  * `difference` - Generates deltas between two files in JSON format
  * `minify` - Minify a JavaScript file, currently support YUICompressor (default), Closure Compiler and UglifyJS
  * `slice` - Generates image slices from a given image directed by a JSON manifest

## sencha fs cache



### Options
  * `--enable`, `-e` - Enables / disables file system io caching (default: false)

## sencha fs concatenate

This command combines multiple input files into a single output file.

    sencha fs concat -to=output.js input1.js input2.js input3.js


### Options
  * `--from`, `-f` - List of files to concatenate, comma-separated
  * `--to`, `-t` - The destination file to write concatenated content

## sencha fs difference

This command produces a delta (or "patch") file between input files.

    sencha fs diff -from=base.js -to=modified.js -delta=patch


## sencha fs minify

This command produced minified files using various back-end compressors.

    sencha fs minify -compressor=yui -from=input.js -to=output.js


### Options
  * `--compressor`, `-c` - The compressor to use (closure or yui). default: yui
  * `--from`, `-f` - The input js file to minify
  * `--to`, `-t` - The destination filename for minified output.

## sencha fs mirror

Commands for create horizontal mirror of images and sprites for RTL locales.

This family of commands is intended for automated production of "derivative"
images based on hand maintained and designed image assets authored in the more
familiar, left-to-right (LTR) form.


### Commands
  * `all` - Horizontally flip a folder of images and sprites based on naming convention
  * `image` - Horizontally flip an image
  * `sprite` - Horizontally flip a "sprite" (multi-cell image)

## sencha fs mirror all

This command creates horizontal mirror images of a folder of images and/or
sprites. This command requires some name consistency in order to differentiate
output files from input files and the geometry of sprites.

Sprites must have a name segment that looks like "4x3" to define its geometry.
This is understood as "columns" x "rows" or, in this example, 4 columns and 3
rows.

The following examples all fit this pattern:

 * tools-2x12.png
 * sprite_12x3.gif
 * some-3x5-sprite.png

The input files and output files are separated by a suffix that must be given.
THe output files will be produced from the input files applying the suffix. By
default, the output files are written to the same folder as the input files.
This can be changed by specifying "-out".

For example:

    sencha fs mirror all -r -suffix=-rtl /path/to/images

The above command performs the following:

 * Scans `"/path/to/images"` (and all sub folders due to `-r`) for images.
 * Any image not ending in `"-rtl"` is considered an input file.
 * Any input image with sprite geometry in its name has its cells flipped.
 * Other input images are entirely flipped.
 * The input files are written using their original name plus the suffix.
 * Up-to-date checks are made but can be skipped by passing `-overwrite`.
 * Files are written to `"/path/to/images"`.

By passing the `-format` switch, the format of the output images can be set
to be other than the same format as the original file. For example, one could
convert PNG files to GIF by passing `-format=gif`. This does only basic image
conversion and no advanced image processing. Simple color quantization can be
enabled using `-quantize`.

For example:

    sencha fs mirror all all -format=gif -ext=png -quantize -out=/out/dir \
         -suffix=-rtl /some/pngs

The above command will process all `"png"` images and will write out their
`"gif"` versions (using color quantization) to a different folder.



### Options
  * `--dry-run`, `-d` - When set no images will be saved but all normal work is still done
  * `--extensions`, `-e` - Comma-separated list of image extensions (default is "gif,png")
  * `--format`, `-f` - The image format to write all output files (e.g., "-f=png")
  * `--output-dir`, `-ou` - The output folder for generated images (defaults to input folder)
  * `--overwrite`, `-ov` - Disable up-to-date check and always generate output file
  * `--quantize`, `-q` - Enable basic color quantization (useful with -format=gif)
  * `--recurse`, `-r` - Process the input folder recursively (i.e., include sub-folders)
  * `--suffix`, `-s` - The suffix of output files (e.g., "-rtl")

## sencha fs mirror image

This command create a horizontal mirror image of a given input file.

For example

    sencha fs mirror image foo.png foo-rtl.png

The above command creates `"foo-rtl.png"` from `"foo.png"`.


## sencha fs mirror sprite

This command create a horizontal mirror image of the cells in a given sprite.

For example

    sencha fs mirror sprite -rows=2 -cols=4 sprite.png sprite-rtl.png

The above command horizontally flips each cell in the 2x4 sprite `"sprite.png"`
and produces `"sprite-rtl.png"`.

`NOTE`: The number of rows and columns are required.


### Options
  * `--columns`, `-c` - The number of columns in the sprite.
  * `--rows`, `-r` - The number of rows in the sprite.

## sencha fs slice

This command performs image slicing and manipulation driven by the contents of
a JSON manifest file. The manifest file contains an array of image area
definitions that further contain a set of "slices" to make.

This file and the corresponding image are typically produced for a Theme as
part of the theme package build. For details on this process, consult this
guide:

http://docs.sencha.com/ext-js/4-2/#!/guide/command_slice


### Options
  * `--format`, `-f` - The image format to save - either "png" or "gif" (the default)
  * `--image`, `-i` - The image to slice
  * `--manifest`, `-m` - The slicer manifest (JSON) file
  * `--out-dir`, `-o` - The root folder to which sliced images are written
  * `--quantized`, `-q` - Enables image quantization (default is true)
  * `--tolerate-conflicts`, `-t` - Tolerate conflicts in slice manifest

## sencha fs web

This category provides commands to manage a simple HTTP file server.


### Options
  * `--port`, `-p` - Set the port for the web server

### Commands
  * `start` - Starts a static file Web Server on a port
  * `stop` - Stops the local web server on the specific port

## sencha fs web start

This command starts the Web server and routes requests to the specified files.
For example:

    sencha fs web -port 8000 start -map foo=/path/to/foo,bar=/another/path

Given the above, the following URL entered in a browser will display the files
in `"/path/to/foo"`:

    http://localhost:8000/foo

And this URL will display the files in `"/another/path"`:

    http://localhost:8000/bar

To stop the server, press CTRL+C or run the `sencha fs web stop` command:

    sencha fs web -port 8000 stop


### Options
  * `--mappings`, `-m` - List of names for local folders, for example: [urlpath=]/path/to/folder)

## sencha fs web stop

This command stops the Web server previously started by `sencha fs web start`.

For example:

    sencha fs web -port 8000 start -map foo=/path/to/foo,bar=/another/path

From another terminal or console, this will stop the server:

    sencha fs web -port 8000 stop


## sencha generate

This category contains code generators used to generate applications as well
as add new classes to the application.

### Commands
  * `app` - Generates a starter application
  * `controller` - Generates a Controller for the current application
  * `form` - Generates a Form for the current application (Sencha Touch Specific)
  * `model` - Generates a Model for the current application
  * `package` - Generates a starter package
  * `profile` - Generates a Profile for the current application (Sencha Touch Specific)
  * `theme` - Generates a theme page for slice operations (Ext JS Specific)
  * `view` - Generates a View for the current application (Ext JS Specific)
  * `workspace` - Initializes a multi-app workspace

## sencha generate app

This command generates an empty application given a name and target folder.

The application can be extended using other `sencha generate` commands (e.g.,
`sencha generate model`).

Other application actions are provided in the `sencha app` category (e.g.,
`sencha app build`).


### Options
  * `--controller-name`, `-c` - The name of the default Controller
  * `--library`, `-l` - the pre-built library to use (core or all). Default: core
  * `--path`, `-p` - The path for the generated application
  * `--theme-name`, `-t` - The name of the defualt Theme
  * `--view-name`, `-v` - The name of the defalut View

## sencha generate controller

This command generates a new Controller and adds it to the current application.


### Options
  * `--name`, `-n` - The name of the Controller to generate

## sencha generate form

This command generates a new form and adds it to the current application.


### Options
  * `--fields`, `-f` - Comma separated list of "name:type" field pairs
  * `--name`, `-n` - The name of the Form to generate
  * `--xtype`, `-x` - The xtype for the form. Defaults to the lowercase form of the name.

## sencha generate model

This command generates a new Model class and adds it to the current application.


### Options
  * `--base`, `-b` - The base class of the Model (default: Ext.data.Model)
  * `--fields`, `-f` - Comma separated list of "name:type" field pairs
  * `--name`, `-n` - The name of the Model

## sencha generate package



### Options
  * `--name`, `-n` - The name of the package to generate
  * `--type`, `-t` - The type of the package to generate (i.e., "code" or "theme")

## sencha generate profile

This command generates a new Profile and adds it to the current application.

NOTE: Sencha Touch only.


### Options
  * `--name`, `-n` - The name of the Profile to generate

## sencha generate theme

This command generates a new Theme and adds it to the current application.


### Options
  * `--name`, `-n` - The name of the Theme to generate

## sencha generate view

This command generates a new View class and adds it to the current application.


### Options
  * `--name`, `-n` - The name of the View to generate

## sencha generate workspace

This command generates a workspace for managing shared code across pages or
applications.


### Options
  * `--path`, `-p` - Sets the target path for the workspace

## sencha help

The `help` command generates help for other commands.

### Usage

sencha help <command>


## sencha io

These commands give you access to all the tools required to create, manage and deploy web applications in the io cloud.

Sencha.io provides a backend-as-a-service that enables developers with a set of APIs that helps them build and run their applications. It allows you to build web applications using services provided through our client side SDKs, Ext JS and Sencha Touch.

### Commands
  * `app-set-group` - Sets the Auth Group associated with an app
  * `create-app` - Creates an app in Sencha.io
  * `create-auth-group` - Creates an auth group in Sencha.io
  * `create-version` - Creates a version of an app in Sencha.io
  * `deploy` - Deploys a version of an application in Sencha.io
  * `list-apps` - Lists all the apps for this developer in Sencha.io
  * `list-groups` - Lists Authentication Groups for a Developer
  * `list-versions` - Lists all the versions for this app in Sencha.io
  * `set-group-auth` - Sets an Auth Group's authentication mechanism
  * `undeploy` - Undeploys a version of an application in Sencha.io

## sencha io app-set-group

Sets the Authentication Group which is associated with this Application.

Only one Authentication Group may be associated with an Application at any given time.

An Authentication Group controls which methods of authentication are available to users of your application.  Users are members of Authentication Groups.

### Options
  * `--group-name`, `-g` - The Auth Group name to associate with this app

## sencha io create-app

Creates a new Application in the context of Sencha Io.

## sencha io create-auth-group

Creates a new Authentication Group in Sencha Io.

### Options
  * `--group-name`, `-g` - The Auth Group name to associate with this app

## sencha io create-version

Creates a new Version of an Application.  In doing so, an application .zip file is uploaded to the cloud, along with a version tag and a description of this version.  Once a version has been successfully created, it must be deployed before it can be accessed.

### Options
  * `--package-path`, `-pac` - The path to the package to be used in a new application version.
  * `--version-description`, `-version-d` - The version description for this new application version
  * `--version-tag`, `-version-t` - The version tag for this new application version

## sencha io deploy

Deploys a previously created version of an Application to the cloud.

Once an application has been deployed, it becomes publicly accessible.

### Options
  * `--version-tag`, `-v` - The version tag to deploy

## sencha io list-apps

Lists all Applications which are accessible by this Developer (in the current Team context).

If the Developer is a member of multiple teams, they may have to switch Team contexts to see all of the Applications they have access to.

## sencha io list-groups

Lists all the Authentication Groups which this Developer currently has access to.

If the Developer is a member of multiple teams, they may have to switch Team contexts to see all of the Authentication Groups they have access to.

## sencha io list-versions

Lists all of the currently uploaded versions of an Application in the system.

## sencha io set-group-auth

Sets an Authentication Group's configuration.

Acceptible values for Authentication Method are senchaio (which is on by default), facebook, and twitter.

In order to use facebook or twitter, Application Keys and Secrets must be obtained for you application with those services, and then be provided as the final parameters of this command.

### Options
  * `--auth-method`, `-au` - The auth method to set
  * `--enabled`, `-e` - true/false, to enable the auth method
  * `--group-name`, `-g` - The group name to set
  * `--key`, `-k` - key for twitter/facebook auth
  * `--secret`, `-s` - secret for twitter/facebook auth

## sencha io undeploy

Undeploys a previously deployed version of an Application.

Once this has been done, the application will no longer be publicly available.

### Options
  * `--version-tag`, `-v` - The version tag to undeploy

## sencha iofs

These commands gives you low level access to an io application's cloud hosting through an interface which ressembles a file system shell.

### Commands
  * `get` - Retrieve a remote file from the file system
  * `ls` - List all files in the file system for the supplied path
  * `put` - Upload a file to the remote filesystem
  * `rm` - Remove a file or directory from the file system

## sencha iofs get

Retrieves a remote file from an Application's filesystem in Sencha io.

## sencha iofs ls

Lists the contents of a remote path in an Application's Sencha Io hosting.

## sencha iofs put

Uploads a local file to a remote path in an Application's Sencha Io hosting.

### Options
  * `--content-type`, `-c` - The MIME content type of the file to be uploaded
  * `--local-path`, `-l` - The local path of the file to be uploaded

## sencha iofs rm

Removes a remote directory or file from an Application's remote Sencha Io hosting.

## sencha js

This command loads and executes the specified JavaScript source file or files.

    sencha js file.js[,file2.js,...] [arg1 [arg2 ...] ]

#### Files

The first argument to this command is the file or files to execute. If there
are multiple files, separate them with commas. In addition to the command line
technique of specifying files, this command also recognizes the following
directive:

    //@require ../path/to/source.js

This form of `require` directive uses a relative path based on the file that
contains the directive. Any given file will only be executed once, in much the
same manner as the compiler.

#### Context

A primitive `console` object with the following methods is provided to the
JavaScript execution context:

 * `log`
 * `debug`
 * `info`
 * `warn`
 * `error`
 * `dir`
 * `trace`
 * `time` / `timeEnd`

Arguments beyond the first can be accessed in JavaScript with the global `$args`
array. The current directory can be accessed with `$curdir`.

The Sencha Cmd object can be accessed with `sencha`. This object has a `version`
property and a `dispatch` method.

    if (sencha.version.compareTo('3.0.0.210') < 0) {
        console.warn('Some message');
    } else {
        // dispatch any command provided by Cmd:
        sencha.dispatch([ 'app', 'build', $args[1] ]);
    }

Beyond the above, the executing JavaScript has full access to the JRE using
the `importPackage` and `importClass` methods.

For example:

    importPackage(java.io);

    var f = new File('somefile.txt');  // create a java.io.File object

For further details on the JavaScript engine provided by Java, consult the
Java Scripting guide:

http://docs.oracle.com/javase/6/docs/technotes/guides/scripting/programmer_guide/index.html


## sencha manifest

This category provides commands to manage application manifests.


### Commands
  * `create` - Generate a list of metadata for all classes found in the given directories

## sencha manifest create

This command generates a list of metadata for all classes.


### Options
  * `--output-path`, `-o` - The file path to write the results to in JSON format.
  * `--path`, `-p` - The directory path(s) that contains all classes

## sencha package

These commands manage packages in the local repository.

These commands are not typically used directly because application requirements
are automatically be used by `sencha app build` and `sencha app refresh --packages`
to handle these details.

#### Using Packages

The most common commands needed to use packages are those that connect your
local package repository to remote repositories. By default, the local repo has
one remote repository defined that points at Sencha's package repository.

To add, remove or display these connections see:

    sencha help package repo

#### Authoring Packages

When authoring packages for others to use in their applications, however, these
commands are involved. In particular, you must first initialize your local
package repository. This is because the local repository is automatically
initialized "anonymously". In this state, the local repository can only be used
to retrieve and cache other packages. To create and publish packages, the local
repository must be initialized with a name and an optional email address.

This name is not required to be globally unique, but it is a good idea to use a
name that is unique and meaningful as a package author.

    sencha package repository init -name "My Company, Inc."

    sencha package repository init -name mySenchaForumId

For details see:

    sencha help package repository init


### Options
  * `--repository-dir`, `-r` - Sets the folder of the local package repository

### Categories
  * `repository` - Manage local repository and remote repository connections

### Commands
  * `add` - Adds a package file (.pkg) to the local repository
  * `build` - Builds the current package
  * `extract` - Extracts the contents of a package to an output folder
  * `get` - Get a package from a remote repository
  * `remove` - Removes a package from the local repository
  * `upgrade` - Upgrades the current pacakge

## sencha package add

Adds a new package file (`"*.pkg"`) to the local repository. These packages will
be signed automatically if their `creator` property matches the `name` associated
with the local repository.

Once a package is added to the local repository, any repository that points to
this repository as a remote repository will be able to download the package.


## sencha package build

This command invokes the build process for the current package. Similar to an
application and `sencha app build`, this command builds the current package (as
defined by the current folder).

    sencha package build


## sencha package extract

This command extracts a package from the local repository.

`NOTE:` This is `not` typically executed manually but is handle automatically
as part of the build process based on the "requires".

To extract a package named "foo" at version "1.2" to a specified location:

    sencha package extract -todir=/some/path foo@1.2

This will create `"/some/path/foo"`.


### Options
  * `--clean`, `-c` - Delete any files in the output folder before extracting
  * `--force`, `-f` - Ignore local copy and fetch from remote repository
  * `--outdir`, `-o` - The output folder for the extracted package contents
  * `--recurse`, `-r` - Also get all required packages recursively
  * `--todir`, `-t` - The output folder for the extracted package folder

## sencha package get



### Options
  * `--force`, `-f` - Ignore local copy and fetch from remote repository
  * `--recurse`, `-r` - Also get all required packages recursively

## sencha package list



## sencha package remove

Removes one or more packages from the local repository.

Removes version 1.2 of the package "foo":

    sencha package remove foo@1.2

Remove all versions of "foo"

    sencha package remove foo@...


## sencha package repository

These commands manage the local repository and its connections to remote
repositories.

#### Remote Repositories

The primary role of the local repository is as a cache of packages that it
downloads from one or more specified remote repositories. By default, Sencha
Cmd adds the Sencha package repository as a remote repository. Using these
commands you can manage these connections.

This command adds a remote repository connection named `"foo"`:

    sencha package repo add foo http://coolstuff.foo/packages

Following this command, any packages contained in this repository will be
available. Typically these packages are used by adding their name (and possibly
version) to your application's `"app.json"` in its `requires` array.

    {
        requires: [
            'cool-package@2.1'
        ]
    }

Then:

    sencha app build

The above addition will require version 2.1 of `"cool-package"`. The remote
repository added above will be checked for this package, and if found, it is
downloaded to the local repository and cached there as well as extracted to
your app's`"packages/cool-package"` folder and automatically integrated in to
your build.

#### Authoring Packages

To author packages for others to use in their applications, you will need to
initialize your local repository with your name:

    sencha package repo init -name "My Company, Inc."

See these for more details:

    sencha help package
    sencha help package repo init


### Commands
  * `add` - Add a remote repository connection
  * `init` - Initializes the local package repository
  * `remove` - Remove a remote repository connection
  * `show` - Show details for a repository
  * `sync` - Clears caches to force refetching for a remote repository

## sencha package repository add

Adds a remote repository connection. Once added, packages from that repository
will be available to applications for use.

    sencha package repo add foo http://foo.bar/pkgs


### Options
  * `--address`, `-a` - The address (or URL) for the remote repository
  * `--name`, `-n` - The name for the remote connection

## sencha package repository init

Initializes the local repository. The local repository is used to cache local
copies of packages (potentially for multiple versions).

`NOTE:` This step is not typically necessary because the local repository is
automatically initialized in "anonymous" mode. This command is needed only if
you want to publish packages for others to use in their application. To publish
packages you must initial the local repository and provide a name:

    sencha package repository init -name "My Company, Inc." -email me@foo.com

Beyond initializing the repository file structures, this command also generates
a public/private key pair and stores these in the local repository. The private
key is used to sign packages added to this local repository.

For details on adding packages:

    sencha help package add

#### Private Key

Packages added to the local repository with a `creator` property equal to the
name given to `sencha package repository init` will be signed using the private
key stored in the local repository.

In this release of Sencha Cmd, these signatures are only used to test package
integrity. You can backup this key if desired, but a new key can be regenerated
by running `sencha package repo init` at any time. In future versions it may be
more important to backup your private key.

#### Remote Access

Making the local package repository available as a remote repository for others
to access requires some knowledge of the disk structure of the repository. By
default, Sencha Cmd creates the local repository adjacent to its installation
folder. For example, given the following location of Sencha Cmd:

    /Users/myself/bin/sencha/Cmd/3.1.0.200/sencha

The local respository is located at:

    /Users/myself/bin/sencha/Cmd/repo

This is to allow your local repository to be used by newer versions of Sencha
Cmd. The folder to make publish to others as an HTTP URL is:

    /Users/myself/bin/sencha/Cmd/repo/pkgs

`IMPORTANT:` Do `NOT` expose the parent folder of `"pkgs"` - that folder holds
private information (such as your private key). Further, Sencha Cmd will not
recognize the structure as a valid remote repository.

If you want to host the repository on a public server, simply copy the `"pkgs"`
folder to a web server and share the HTTP address.


### Options
  * `--email`, `-em` - The email address for the owner of the local repository
  * `--expiration`, `-ex` - The number of years before the generated key pair becomes invalid
  * `--keybits`, `-k` - Specifies the number of bits for the generated public/private key pair
  * `--name`, `-n` - The name for the owner of the local repository

## sencha package repository remove

Remove a remote repository from the local repository's list of remote
repositories. For example, if a remote was previously added:

    sencha package repo add foo http://foo.bar/pkgs

This command will remove it:

    sencha package repo remove foo

`NOTE:` This command does not remove packages that you may have downloaded from
this remote as they are now cached in the local repository.


### Options
  * `--name`, `-n` - The name for the remote connection

## sencha package repository server



### Options
  * `--port`, `-p` - The TCP port to which the HTTP repository server binds

### Commands
  * `start` - Starts the HTTP repository server
  * `stop` - Stops the HTTP repository server

## sencha package repository server start



## sencha package repository server stop



## sencha package repository show

Shows information about a remote repository or package.

To show information about the local repository:

    sencha package repo show .

To show information about a specific remote repository:

    sencha package repo show some-remote

The name given should match the name previously given to:

    sencha package repo add some-remote ...


### Options
  * `--all`, `-a` - Include all details about the repository

## sencha package repository sync

Forces (re)synchronization with a remote repository catalog. Normally this is
done periodically and does not need to be manually synchronized. This command
may be needed if there something known to have been added to a remote repo but
has not yet shown up in the catalog on this machine.

    sencha package repo sync someremote

To resynchronize with all remote repositories:

    sencha package repo sync


### Options
  * `--name`, `-n` - The name for the remote connection (blank for all)

## sencha package sign



## sencha package upgrade

Upgrades the current package to a newer SDK or Sencha Cmd version.

This command must be run from the desired package's folder.

    sencha package upgrade


## sencha phantom



## sencha schema



### Commands
  * `export` - Exports a Schema definition

## sencha schema export



### Options

#### Export Type
Select one option to specify the export format

  * `--js`, `-j` - Set the export type to "js" for Ext JS or Sencha Touch (short for -type=js)
  * `--sql`, `-s` - Set the export type to "sql" (short for -type=sql)

#### Misc

  * `--dbtype`, `-d` - The database type used for SQL export, e.g., "oracle" or "mssql"
  * `--name`, `-n` - The name of the Schema to export
  * `--output`, `-o` - The output file or folder, depending on the type of export
  * `--type`, `-t` - The type of data to produce from the Schema, e.g., "sql" or "js"

## sencha theme

This category contains commands for managing themes.


### Commands
  * `build` - Builds a custom theme from a given page
  * `slice` - Generates image slices from a given image directed by a JSON manifest

## sencha theme build

This command will build the specified theme's image sprites.


### Options
  * `--environment`, `-en` - The build environment (e.g., production or testing)
  * `--output-path`, `-o` - The destination path for the sliced images
  * `--page`, `-p` - The page to slice
  * `--theme-name`, `-t` - The name of the theme to build

## sencha theme capture



## sencha theme generate



## sencha theme slice

This command performs image slicing and manipulation driven by the contents of
a JSON manifest file. The manifest file contains an array of image area
definitions that further contain a set of "slices" to make.

This file and the corresponding image are typically produced for a Theme as
part of the theme package build. For details on this process, consult this
guide:

http://docs.sencha.com/ext-js/4-2/#!/guide/command_slice


### Options
  * `--format`, `-f` - The image format to save - either "png" or "gif" (the default)
  * `--image`, `-i` - The image to slice
  * `--manifest`, `-m` - The slicer manifest (JSON) file
  * `--out-dir`, `-o` - The root folder to which sliced images are written
  * `--quantized`, `-q` - Enables image quantization (default is true)
  * `--tolerate-conflicts`, `-t` - Tolerate conflicts in slice manifest

## sencha upgrade

This command downloads and installs the current version of Sencha Cmd. Or you
can specify the version you want to install as part of the command.

The following command downloads and installs the current version of Sencha Cmd:

    sencha upgrade

This command downloads a particular version:

    sencha upgrade 3.0.2.288

If the version requested is the already installed then this command will, by
default, do nothing. This can be forced using `--force`:

    sencha upgrade --force

If the version requested is the version in the `PATH`, the command will exit
with a message saying that the current version cannot be upgraded. In this case
the `--force` option is ignored.


### Options
  * `--force`, `-f` - Force instalation even if the specified version is already installed

## sencha which



### Options
  * `--output`, `-o` - Name of an output property file to write the location as a property
  * `--property`, `-p` - Name of the property to write to the output property file for the location
