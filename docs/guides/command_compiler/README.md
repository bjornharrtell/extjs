# Sencha Compiler Reference

One of the major components new to Sencha Cmd with version 3 is the compiler. In a nutshell,
the compiler is a JavaScript-to-JavaScript, framework-aware optimizer. It is designed to
"understand" your high-level Ext JS and Sencha Touch code and produce the smallest, most
efficient code possible to support these high-level abstractions.

{@img ../command/sencha-command-128.png}

Before using the compiler, you should understand the basics of Sencha Cmd by reading the
following guides:

 * [Introduction to Sencha Cmd](#/guide/command)
 * [Using Sencha Cmd](#/guide/command_app)
 * [Compiler-Friendly Code Guidelines](#/guide/command_code)

## Sets And The Current Set

Under the covers, the compiler manages a set of source files and analyzes these files to
determine their dependencies. The set of all files is determined by the `classpath`:

    sencha compile -classpath=sdk/src,app ...

In this example, the compiler recursively loads `"*.js"` from the specified list of folders.
This set of all files defines the basis for all operations to follow (that is, it defines
the "universe").

The default classpath used by the compiler comes from these configuration properties:

    ${framework.classpath},${workspace.classpath},${app.classpath}

The compiler's output commands (for example, `concat` and `metadata`) operate on the set
of files called the "current set". The current set starts out equal to the universe of all
files, but this can be manipulated using the many commands provided to perform set
operations.

*Note.* With the compiler, you will often see rather long command lines using the command
chaining mechanism `and`. Also, in practical use cases, for long command lines you should
consider using [Ant](#/guide/command_ant) or a "response file". See
[Advanced Sencha Cmd](#/guide/command_advanced). In this guide, all command lines will be
complete (and potentially long) to keep the examples as clear as possible.

## Generating Output with `concat`

A compiler ultimately is all about writing useful output given some number of inputs. The
`concat` command is designed to concatenate the source for the current set of files in the
appropriate dependency order.

The one required parameter is `-out`, which indicates the name of the output file. There
are other options, however, that effect the generated file. You can pick one of the
following options for compression:

 * `-compress` - Compress the generated file using the default compressor. Currently this
 is the same as `-yui`.
 * `-max` - Compress the generated file using all compressors and keep the smallest.
 * `-closure` - Compress the generated file using [Google Closure Compiler](https://developers.google.com/closure/compiler/).
 * `-uglify` - Compress the generated file using [UglifyJS](https://github.com/mishoo/UglifyJS/).
 * `-yui` - Compress the source file using  [YUI Compressor](http://developer.yahoo.com/yui/compressor/).
 * `-strip` - Strip comments from the output file, but preserve whitespace. This is the
 option used to convert "ext-all-debug-w-comments.js" into "ext-all-debug.js".

The following command illustrates how to produce three flavors of output given a single
read of the source.

    sencha compile -classpath=sdk/src \
        exclude -namespace Ext.chart and \
        concat ext-all-nocharts-debug-w-comments.js and \
        -debug=true \
        concat -strip ext-all-nocharts-debug.js and \
        -debug=false \
        concat -yui ext-all-nocharts.js

### Generating Metadata

The compiler can also generate metadata in many useful ways, for example, the names of
all source files, the set of files in dependency order, etc. To see what is available,
see the [Generating Metadata](#/guide/command_compiler_meta) guide.

## Saving And Restoring Sets

When you need to produce multiple output files, it can be very helpful to save the
current set for later use, which you do like this:

    sencha compile -classpath=sdk/src \
        exclude -namespace Ext.chart and \
        save nocharts and \
        ...
        restore nocharts and \
        ...

`The `save` command takes a snapshot of the current set and stores it under the given name
(`nocharts` in the above).

The simplest use of a saved set is the `restore` command. This does the reverse and
restores the current set to its state at the time of the `save`.

## Set Operations

Many of the commands provided by the compiler are classified as set operations, which are
operations that work on and produce sets. In the case of the compiler, this means sets of
files or classes. Let's first take a look at set terminology.

### A Little Set Theory

There are three classic set operations:

 * Intersection - The intersection of two sets is a set containing only what was in both
 sets.
 {@img set-intersect.png}

 * Union - The union of two sets is a set containing whatever was in either of the sets.
{@img set-union.png}

 * Difference - The difference of two sets is the set of all things in the first set that
 are not in the second set.
 {@img set-difference.png}

### Set `include` and `exclude`

These two set operations are probably the most common (and flexible) set operations. Both
support these basic switches:

 * `-namespace` - Matches files that define types in the specified namespace.
 * `-class` - Matches a specific defined type.
 * `-file` - Matches filenames and/or folder names using Ant-style glob patterns (a "*"
 matches only filename characters, where "**" matches folders).
 * `-tag` - Matches any files with the specified tag(s) (see below).
 * `-set` - The files that are present in any of the specified named sets.

In all of these cases, the next command line argument is a list of match criteria
separated by commas. Also, a single `exclude` or `include` can have as many switch/value
pairs as needed.

So, let's start with a simple example and build an `"ext-all-no-charts-debug-w-comments.js"`.

    sencha compile -classpath=sdk/src \
        exclude -namespace Ext.chart and \
        ...

What is happening here is that we started with only the Ext JS sources (in `"sdk/src"`) and
they were all part of the "current set". We then performed a set difference by excluding
all files in the `Ext.chart` namespace. The current set was then equivalent to `"ext-all.js"`
but without any of the Chart package.

### Negating `include` and `exclude` with `-not`

Both `include` and `exclude` support a rich set of matching criteria. This is rounded out
by the `-not` switch, which negates the matching criteria that follows it. This means that
the files included or excluded are all those that do not match the criteria.

For example:

    sencha compile -classpath=sdk/src,js \
        ... \
        exclude -not -namespace Ext and \
        ...

The above `exclude` command will exclude from the current set any classes that are not in
the `Ext` namespace.

### The `all` Set

In some cases, it is very handy to restore the current set to all files or to the empty
set. To do this, you simply use `include` or `exclude` with the `-all` switch. To build
on the previous example:

    sencha compile -classpath=sdk/src \
        ... \
        include -all and \
        ... \
        exclude -all and \
        ...

After the `include -all`, the current set is all files. After `exclude -all` it is the
empty set.

### Union

As shown already, the `include` command is a form of set union: it performs a union of
the current set with the set of matching files. Sometimes it is desirable to not include
the current set in the union and only those file matching the desired criteria. This is
what the `union` command does.

The `union` command has all of the options of `include`. Consider this `union` command:

    sencha compile -classpath=sdk/src ... and \
        union -namespace Ext.grid,Ext.chart and \
        ...

It is exactly equivalent to this pair of `exclude` and `include` commands:

    sencha compile -classpath=sdk/src ... and \
        exclude -all and \
        include -namespace Ext.grid,Ext.chart and \
        ...

### Transitivity/Recursive Union

One of the most important set operations is the union of all files explicitly specified
and all of the files they require. This is the core of a build process, since this is
how you select only the set of files you need. So, if you have a small set of top-level
files to start the process, say the class `MyApp.App`, you can do something like this:

    sencha compile -classpath=sdk/src,app \
        union -r -class MyApp.App and \
        ...

The `union` command starts with no current set, includes only the class `MyApp.App` and
then proceeds to include all the things it needs recursively. The resulting current set
is all files needed by the application.

### Intersect (Strict)

The `intersect` command is a bit less flexible in the criteria it supports: it only
accepts named sets (using `-set`).

    sencha compile -classpath=sdk/src,common,page1/src,page2/src \
        ... \
        intersect -set page1,page2 and \
        ... \

This command above intersects the two page sets and produces their intersection as the
current set.

### Intersect (Fuzzy)

When dealing with more than two sets, `intersect` has an option called `-min` that sets
the threshold for membership in the current set. This option is discussed in more detail
in [Multi-Page Ext JS Apps](#/guide/command_app_multi).

For example,

    sencha compile ... \
        intersect -min=2 -set page1,page2,page3 and \
        ...

This use of `intersect` produces in the current set all files that are found in two of
the three sets specified.

## Compiler Directives

In many situations, it is helpful to embed metadata in files that only the compiler will
pick up. To do this, the compiler recognizes special line comments as directives.

The list of directives is:

 * `//@charset`
 * `//@tag`
 * `//@define`
 * `//@require`

### Character Encoding

There is no standard way to specify the character encoding of a particular JS file. The
Sencha Cmd compiler, therefore, understands the following directive:

    //@charset ISO-9959-1

This must be the first line of the JS file. The value to the right of `charset` can be any
valid [Java charset](http://docs.oracle.com/javase/7/docs/api/java/nio/charset/Charset.html)
name. The default is "UTF-8".

The `charset` directive is used to describe the encoding of an input file to the compiler.
This does not effect the encoding of the output file. The content of the input file is
converted to Unicode internally.

### Tagging

In an ideal world, a namespace would be sufficient to define a set of interest. Sometimes,
however, a set can be quite arbitrary and even cross namespace boundaries. Rather than
move this issue to the command-line level, the compiler can track arbitrary tags in files.

Consider the example:

    //@tag foo,bar

This assigns the tags `foo` and `bar` to the file. These tags can be used in the `include`,
`exclude` and `union` commands with their `-tag` option.

### Dealing with "Other" JavaScript Files

In some cases, JavaScript files define classes or objects and require classes or objects
that are not expressed in terms of `Ext.define` and `requires` or `Ext.require`. Using
`Ext.define` you can still say that a class `requires` such things and the dynamic loader
will not complain so long as those things exist (if they do not exist, the loader will
try to load them, which will most likely fail).

To support arbitrary JavaScript approaches to defining and requiring types, the compiler
also provides these directives:

    //@define Foo.bar.Thing
    //@requires Bar.foo.Stuff

These directives set up the same basic metadata in the compiler that tracks what file
defines a type and what types that file requires. In most ways, then, these directives
accomplish the same thing as an `Ext.define` with a `requires` property.

You can use either of these directives in a file without using the other.

## Conditional Compilation

The compiler supports conditional compilation directives, such as the one illustrated here:

    foo: function () {
        //<debug>
        if (sometest) {
            Ext.log.warn("Something is wrong...");
        }
        //</debug>

        this.bar();
    }

This may be the most useful of the conditional directives, which you'd use for code that
you want to run in a development environment but not in production. 

**Important.** When you use conditional compilation, remember that unless you always run
compiled code, the directives are just comments and the conditional code will be "live"
during development.

### The debug directive

When compiling, by default, none of the preprocessor statements are examined. So in this
case, the result is development mode. If we switch on `-debug` we get a very similar
result, but with the preprocessor active. In fact, the only difference is that the
preprocessor directives are removed.

For example, this command:

    sencha compile -classpath=... \
        -debug \
        ...

generates code like this:

    foo: function () {
        if (sometest) {
            Ext.log.warn("Something is wrong...");
        }

        this.bar();
    }

However, this command:

    sencha compile -classpath=... \
        -debug=false \
        ...

generates code like this:

    foo: function () {
        this.bar();
    }

You can see that the `if` test and the log statement are both removed.

### The if directive

The most general directive is `if`. The `if` directive tests one or more configured
options against the attributes of the directive and removes the code in the block
if any are false.

For example:

    //<if debug>
    //</if>

This is equivalent to the `<debug>` directive.
