# Grids

The {@link Ext.grid.Panel Grid Panel} is one of the centerpieces of Ext JS. It's an incredibly versatile component that provides an easy way to display, sort, group, and edit data.

## Basic Grid Panel

{@img simple_grid.png Simple Grid}

Let's get started by creating a basic {@link Ext.grid.Panel Grid Panel}.  Here's all you need to know to get a simple grid up and running:

### Model and Store

A {@link Ext.grid.Panel Grid Panel} is simply a component that displays data contained in a {@link Ext.data.Store Store}. A {@link Ext.data.Store Store} can be thought of as a collection of records, or {@link Ext.data.Model Model} instances.
For more information on {@link Ext.data.Store Store}s and {@link Ext.data.Model Model}s see the [Data guide](#/guide/data).  The benefit of this setup is clear separation of concerns.  The {@link Ext.grid.Panel Grid Panel} is only concerned
with displaying the data, while the {@link Ext.data.Store Store} takes care of fetching and saving the data using its {@link Ext.data.proxy.Proxy Proxy}.

First we need to define a {@link Ext.data.Model Model}. A {@link Ext.data.Model Model} is just a collection of fields that represents a type of data.  Let's define a model that represents a "User":

    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [ 'name', 'email', 'phone' ]
    });

Next let's create a {@link Ext.data.Store Store} that contains several `User` instances.

    var userStore = Ext.create('Ext.data.Store', {
        model: 'User',
        data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'home@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
    });

For sake of ease we configured the {@link Ext.data.Store Store} to load its data inline.  In a real world application you'll usually configure the {@link Ext.data.Store Store} to use a {@link Ext.data.Proxy Proxy} to load data from the server.  See the [Data guide](#/guide/data) for more on using {@link Ext.data.Proxy Proxies}.

### Grid Panel

Now that we have a {@link Ext.data.Model Model} which defines our data structure, and we've loaded several {@link Ext.data.Model Model} instances into a {@link Ext.data.Store Store}, we're ready to display the data using a {@link Ext.grid.Panel Grid Panel}:

For the sake of ease we configured the grid with {@link Ext.AbstractComponent#renderTo renderTo} to immediately render the grid into the HTML document. In a real world application, the grid will usually be a {@link Ext.Container#property-items child item} of a
{@link Ext.Container Container} and rendering will therefore be the responsibility of that Container and the developer must not render.

    Ext.create('Ext.grid.Panel', {
        renderTo: Ext.getBody(),
        store: userStore,
        width: 400,
        height: 200,
        title: 'Application Users',
        columns: [
            {
                text: 'Name',
                width: 100,
                sortable: false,
                hideable: false,
                dataIndex: 'name'
            },
            {
                text: 'Email Address',
                width: 150,
                dataIndex: 'email',
                hidden: true
            },
            {
                text: 'Phone Number',
                flex: 1,
                dataIndex: 'phone'
            }
        ]
    });

And that's all there is to it.  We just created a {@link Ext.grid.Panel Grid Panel} that renders itself to the body element, and we told it to get its data from the `userStore` {@link Ext.data.Store Store} that we created earlier.  Finally we defined what columns the {@link Ext.grid.Panel Grid Panel} will have, and we used the `dataIndex` property to configure which field in the `User` {@link Ext.data.Model Model} each column will get its data from.  The `Name` column has a fixed width of 100px and has sorting and hiding disabled, the `Email Address` column is hidden by default (it can be shown again by using the menu on any other column), and the `Phone Number` column flexes to fit the remainder of the {@link Ext.grid.Panel Grid Panel}'s total width.  For a larger example, see the [Array Grid Example](#!/example/grid/array-grid.html).

## Renderers

You can use the `renderer` property of the column config to change the way data is displayed. A renderer is a function that modifies the underlying value and returns a new value to be displayed. Some of the most common renderers are included in {@link Ext.util.Format}, but you can write your own as well:

    columns: [
        {
            text: 'Birth Date',
            dataIndex: 'birthDate',
            // format the date using a renderer from the Ext.util.Format class
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
            text: 'Email Address',
            dataIndex: 'email',
            // format the email address using a custom renderer
            renderer: function(value) {
                return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
            }
        }
    ]

See [Array Grid Example](#!/example/grid/array-grid.html) for a live demo that uses custom renderers.


## Grouping

{@img grouping.png Grouping Grid}

Organizing the rows in a {@link Ext.grid.Panel Grid Panel} into groups is easy, first we specify a {@link Ext.data.Store#groupField groupField} property on our store:


    Ext.create('Ext.data.Store', {
        model: 'Employee',
        data: ...,
        groupField: 'department'
    });

For more on grouping in {@link Ext.data.Store Store}s please refer to the [Data guide](#/guide/data).  Next we configure a grid with a grouping {@link Ext.grid.feature.Feature Feature} that will handle displaying the rows in groups:


    Ext.create('Ext.grid.Panel', {
        ...
        features: [{ ftype: 'grouping' }]
    });

See [Grouping Grid Panel](#!/example/grid/groupgrid.html) for a live example.


## Selection Models

Sometimes {@link Ext.grid.Panel Grid Panel}s are use only to display data on the screen, but usually it is necessary to interact with or update that data.  All {@link Ext.grid.Panel Grid Panel}s have a {@link Ext.selection.Model Selection Model} which determines how data is selected. The two main types of Selection Model are {@link Ext.selection.RowModel Row Selection Model}, where entire rows are selected, and {@link Ext.selection.CellModel Cell Selection Model}, where individual cells are selected.

{@link Ext.grid.Panel Grid Panel}s use a {@link Ext.selection.RowModel Row Selection Model} by default, but it's easy to switch to a {@link Ext.selection.CellModel Cell Selection Model}:

    Ext.create('Ext.grid.Panel', {
        selType: 'cellmodel',
        store: ...
    });

Using a {@link Ext.selection.CellModel Cell Selection Model} changes a couple of things. Firstly, clicking on a cell now selects just that cell (using a {@link Ext.selection.RowModel Row Selection Model} will select the entire row), and secondly the keyboard navigation will walk from cell to cell instead of row to row. Cell-based selection models are usually used in conjunction with editing.

## Editing

{@link Ext.grid.Panel Grid Panel} has build in support for editing.  We're going to look at the two main editing modes - row editing and cell editing

### Cell Editing

Cell editing allows you to edit the data in a {@link Ext.grid.Panel Grid Panel} one cell at a time.  The first step in implementing cell editing is to configure an editor for each {@link Ext.grid.column.Column Column} in your {@link Ext.grid.Panel Grid Panel} that should be editable.  This is done using the {@link Ext.grid.column.Column#editor editor} config.  The simplest way is to specify just the xtype of the field you want to use as an editor:

    Ext.create('Ext.grid.Panel', {
        ...
        columns: [
            {
                text: 'Email Address',
                dataIndex: 'email',
                editor: 'textfield'
           }
        ]
    });

If you need more control over how the editor field behaves, the {@link Ext.grid.column.Column#editor editor} config can also take a config object for a Field.  For example if we are using a {@link Ext.form.field.Text Text Field} and we want to require a value:

    columns: [
        text: 'Name',
        dataIndex: 'name',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    [

You can use any class in the `Ext.form.field` package as an editor field.  Lets suppose we want to edit a column that contains dates.  We can use a {@link Ext.form.field.Date Date Field} editor:

    columns: [
        {
            text: 'Birth Date',
            dataIndex: 'birthDate',
            editor: 'datefield'
        }
    ]

Any {@link Ext.grid.column.Column}s in a {@link Ext.grid.Panel Grid Panel} that do not have a {@link Ext.grid.column.Column#editor editor} configured will not be editable.

Now that we've configured which columns we want to be editable, and the editor fields that will be used to edit the data, the next step is to specify a selection model. Let's use a {@link Ext.selection.CellModel Cell Selection Model} in our {@link Ext.grid.Panel Grid Panel} config:


    Ext.create('Ext.grid.Panel', {
        ...
        selType: 'cellmodel'
    });

Finally, to enable editing we need to configure the {@link Ext.grid.Panel Grid Panel} with a {@link Ext.grid.plugin.CellEditing Cell Editing Plugin}:

    Ext.create('Ext.grid.Panel', {
        ...
        selType: 'cellmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ]
    });

And that's all it takes to create an editable grid using cell editing. See [Cell Editing](#!/example/grid/cell-editing.html) for a working example.

{@img cell_editing.png Cell Editing Grid}

### Row Editing

Row editing enables you to edit an entire row at a time, rather than editing cell by cell. Row editing works in exactly the same way as cell editing - all we need to do is change the plugin type to {@link Ext.grid.plugin.RowEditing} and set the selType to `rowmodel`.

    Ext.create('Ext.grid.Panel', {
        ...
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1
            })
        ]
    });

[Row Editing - Live Example](#!/example/grid/cell-editing.html)

{@img row_editing.png Row Editing Grid}

## Paging

Sometimes your data set is too large to display all on one page.  {@link Ext.grid.Panel Grid Panel} supports two different methods of paging - {@link Ext.toolbar.Paging Paging Toolbar} which loads pages using previous/next buttons, and {@link Ext.grid.PagingScroller Paging Scroller} which loads new pages inline as you scroll.

### Store Setup

Before we can set up either type of paging on a {@link Ext.grid.Panel Grid Panel}, we have to configure the {@link Ext.data.Store Store} to support paging.  In the below example we add a {@link Ext.data.Store#pageSize pageSize} to the {@link Ext.data.Store Store}, and we configure our {@link Ext.data.reader.Reader Reader} with a {@link Ext.data.reader.Reader#totalProperty totalProperty}:

    Ext.create('Ext.data.Store', {
        model: 'User',
        autoLoad: true,
        pageSize: 4,
        proxy: {
            type: 'ajax',
            url : 'data/users.json',
            reader: {
                type: 'json',
                root: 'users',
                totalProperty: 'total'
            }
        }
    });

The {@link Ext.data.reader.Reader#totalProperty totalProperty} config tells the {@link Ext.data.reader.Reader Reader} where to get the total number of results in the JSON response.  This {@link Ext.data.Store Store} is configured to consume a JSON response that looks something like this:

    {
        "success": true,
        "total": 12,
        "users": [
            { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
            { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
            { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
            { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
        ]
    }

For more on {@link Ext.data.Store Stores}, {@link Ext.data.proxy.Proxy Proxies}, and {@link Ext.data.reader.Reader Readers} refer to the [Data Guide](#/guide/data).

### Paging Toolbar

Now that we've setup our {@link Ext.data.Store Store} to support paging, all that's left is to configure a {@link Ext.toolbar.Paging Paging Toolbar}.  You could put the {@link Ext.toolbar.Paging Paging Toolbar} anywhere in your application layout, but typically it is docked to the {@link Ext.grid.Panel Grid Panel}:

    Ext.create('Ext.grid.Panel', {
        store: userStore,
        columns: ...,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: userStore,   // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }]
    });

{@img paging_toolbar.png Paging Toolbar}

[Paging Toolbar Example](#!/example/grid/paging.html)

### Buffered rendering

Grids support buffered rendering of extremely large datasets as an alternative to using a paging toolbar.
Your users can scroll through thousands of records without the performance penalties of renderering all the
records on screen at once. The grid should be bound to a store with a pageSize specified.

To use buffered rendering, configure your grid with the `bufferedrenderer` plugin. The Store can be
fully loaded with a very large dataset.

Only enough rows are rendered to fill the visible area of the grid with a little
({@link Ext.grid.plugin.BufferedRenderer#leadingBufferZone configurable}) overflow either side to
allow scrolling. As scrolling proceeds, new rows are rendered in the direction of scroll, and rows are removed from
the receding side of the table.

    Ext.create('Ext.grid.Panel', {
        // Use a BufferedRenderer plugin
        plugins: {
            ptype: 'bufferedrenderer'
        },
        // Configure the rest as usual
        ...
    });

[Buffered rendering of a loaded store Example](#!/example/grid/buffer-grid.html)

### Buffered Stores

If a dataset is **extremely** large, then loading the full dataset into the Store may be infeasible. In this case, the solution is to
use a {@link Ext.data.Store#buffered buffered Store}. When using a buffered store, the grid automatically uses the buffered rendering plugin.

A buffered store must be configured with a {@link Ext.data.Store#pageSize pageSize}, and maintains a *sparsely populated* cache
of pages which are loaded from the server as needed.

A buffered store only loads the pages required to render the visible portion of the dataset with a little
({@link Ext.data.Store#leadingBufferZone configurable}) overflow either side to allow new data to be fetched by the buffered renderer
for immediate rendering while new pages are fetched in the background to fulfill future scrolling demands.

As the user scrolls through the dataset, and pages move outside of the visible range, they may be purged from the store's page cache
depending upon the {@link Ext.data.Store#purgePageCount purgePageCount} setting. Configuring this as zero means that once loaded,
pages are never purged from the cache, and may be returned to and rendered with no Ajax delay.

[Buffered store Example](#!/example/grid/infinite-scroll.html)
