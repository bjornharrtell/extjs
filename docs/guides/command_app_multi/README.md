# Multi-page and Mixed Apps

{@img ../command/sencha-command-128.png}

## Large Application Alternatives

[Workspaces in Sencha Cmd](#/guide/command_workspace) describes the new workspace support
in Sencha Cmd that is designed specifically to facilitate large, multi-page applications.

This guide picks up where that guide left off and describes how to use lower-level
commands to perform some advanced build operations. These are primarily focused on creating
two scripts per page instead of the typical one (`"all-classes.js"`) to improve caching as
users navigate between pages. While there are many variations on the ideas discussed here
that could be similarly implemented, this guide describes two approaches:

 - Putting all code common to multiple pages in a `"common.js"` file.
 - Putting all framework code needed by any page in a `"common.js"` file.

Further, since we are using lower-level commands in this guide, we use a custom application
folder structure to show how Sencha Cmd can be used to fit your own specific choices for
code organization.

This guide focuses primarily on Ext JS applications. Support for these techniques will be
available for Sencha Touch in future releases.

## Custom Structure Application

To consider applications that do not have a workspace, lets assume that we have a two-page
application with the following folder structure:

    build/              # The folder where build output is placed.
    common/             # Things common to all pages of the application.
        src/            # Shared JavaScript code for all pages.
    ext/                # The framework distribution.
        src/            # The framework source tree.
    page1/
        index.php       # The markup file for page 1.
        src/            # Folder containing JavaScript code unique to page 1.
    page2/
        index.php       # The markup file for page 2.
        src/            # Folder containing JavaScript code unique to page 2.

This example could be extended to cover many more pages, which would make it harder to
follow the example commands. There are some features that only apply to applications with
three or more pages so we will expand the example to illustrate that usage.

## Caching Shared Code

If users of the application tend to visit more than one page, it may be helpful to split
up the code such that common code is in a shared file while page-specific code is isolated
to a second script file.

In set operations terminology this is called a set "intersection". That is to say, we want to
take the files in the intersection of the two sets of files needed by each page and generate
a file with just those classes.

The following command will do precisely that:

    sencha compile -classpath=ext/src,common/src,page1/src,page2/src \
        page -name=page1 -in page1/index.php -out build/page1/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page2/index.php -out build/page2/index.php \
             -scripts ../common.js and \
        intersect -set page1,page2 and \
        save common and \
        concat -yui build/common.js and \
        restore page1 and \
        exclude -set common and \
        concat -yui build/page1/all-classes.js and \
        restore page2 and \
        exclude -set common and \
        concat -yui build/page2/all-classes.js

Let's look closely at what each part of this command accomplishes.

The first thing is to create the `compile` context and tell it the `classpath` for all of
the source code folders:

    sencha compile -classpath=ext/src,common/src,page1/src,page2/src \

Then we use two `page` commands to include the source from each page as well as generate
the appropriate output pages in the `build` folder. Each `page` command produces a set
of files containing exactly the files needed by that page. These sets are given the names
`page1` and `page2`. Finally, each generated output page will get an extra `script` tag
whose `src` attribute is `"../common.js"`.

        page -name=page1 -in page1/index.php -out build/page1/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page2/index.php -out build/page2/index.php \
             -scripts ../common.js and \

Now that all of the files needed by each page are recorded in two sets, we use `intersect`
to determine the files needed by both pages. Only these files will be included in the
current set.

        intersect -set page1,page2 and \

We use `save` to record the current set of files (the result of the intersection). These
are the files we will put in `"common.js"`. The name for the new set is `common`.

        save common and \

Then we use `concat` to combine the files and produce `"build/common.js"` (also compressing
the file using `-yui' to engage the YUI Compressor).

        concat -yui build/common.js and \

Now we need to produce the `"all-classes.js"` for each page, so we use `restore` to make
the current set equal to the previously saved set for the page:

        restore page1 and \

Then we remove from this set all of the files that we just generated in `"common.js"`:

        exclude -set common and \

And then use `concat` again to produce `"all-classes.js"` for the page:

        concat -yui build/page1/all-classes.js and \

We repeat the last few steps again for `page2`:

        restore page2 and \
        exclude -set common and \
        concat -yui build/page2/all-classes.js

### Alternative Strategy - Sharing A Framework Subset

A different way to partition shared code would be to isolate all of the framework code
needed by the application and produce a file similar to `"ext-all.js"` but only containing
those classes needed by some part of the application. This approach might load more of the
framework than needed by each page, but the benefits of the browser cache could easily
make up for this increase.

The following command contains only a slight adjustment to the above:

    sencha compile -classpath=ext/src,common/src,page1/src,page2/src \
        page -name=page1 -in page1/index.php -out build/page1/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page2/index.php -out build/page2/index.php \
             -scripts ../common.js and \
        union -set page1,page2 and \
        exclude -not -namespace Ext and \
        save common and \
        concat -yui build/common.js and \
        restore page1 and \
        exclude -set common and \
        concat -yui build/page1/all-classes.js and \
        restore page2 and \
        exclude -set common and \
        concat -yui build/page2/all-classes.js

The difference between this command and the previous command is in how the `common` set is
calculated.

        union -set page1,page2 and \
        exclude -not -namespace Ext and \

In this case the `union` command is used to include all files used by either page. This
set is then reduced using the `exclude` command to remove all classes that are not in the
Ext namespace. This will leave only the framework code that is needed by either page in
the current set.

The remainder of the command above and below these two lines is the same as before.

## Beyond Two Pages

Applications with more than two pages can be managed as an extension of a two-page
application as discussed above. Just add extra `page` commands (one for each page) and
extra set operations to produce the appropriate `"all-classes.js"` file for each page.

There are interesting possibilities for code sharing among the multiple pages. For
example, let's consider a five-page application structured in the same basic way.

It may be that the common set of files produced by the intersection of all pages is quite
small. This will force code that is not used by all pages out of `"common.js"` and into an
`"all-classes.js"` file for each page. One strategy for dealing with this is to manually
divide up similar pages and treat the application as multiple, independent, multipage
applications.

Another, simpler, way would be to use a "fuzzy intersection," that is an operation the
selects all classes used by a specified minimum number of pages. Here's an example:

    sencha compile -classpath=ext/src,common/src,page1/src,page2/src \
        page -name=page1 -in page1/index.php -out build/page1/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page2/index.php -out build/page2/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page3/index.php -out build/page3/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page4/index.php -out build/page4/index.php \
             -scripts ../common.js and \
        page -name=page2 -in page5/index.php -out build/page5/index.php \
             -scripts ../common.js and \
        intersect -min=3 -set page1,page2,page3,page4,page5 and \
        save common and \
        concat -yui build/common.js and \
        restore page1 and \
        exclude -set common and \
        concat -yui build/page1/all-classes.js and \
        restore page2 and \
        exclude -set common and \
        concat -yui build/page2/all-classes.js and \
        restore page3 and \
        exclude -set common and \
        concat -yui build/page3/all-classes.js and \
        restore page4 and \
        exclude -set common and \
        concat -yui build/page4/all-classes.js and \
        restore page5 and \
        exclude -set common and \
        concat -yui build/page5/all-classes.js

Other than the three additional `page` commands as well as three stanzas of `restore`,
`exclude` and `concat`, the above command only changed from the original intersection in
this one way:

        intersect -min=3 -set page1,page2,page3,page4,page5 and \

The `-min` switch activated the fuzzy intersection method. By default, `intersect` selects
classes used by 100% of the specified sets or, in this case, all 5 sets. With `-min` you
can override this threshold. By specifying `-min=3` we are saying to include in the current
set any class used by at least 3 sets (or 60%).
