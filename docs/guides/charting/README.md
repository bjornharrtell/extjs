# Charting

The chart package uses the surfaces and sprites developed with
[the drawing package](#!/guide/drawing)
to create versatile graphics
that run on virtually any browser or device.

The chart package consists of
a hierarchy of classes that define a chart container
(something like a surface but more specific for handling charts);
axes, legends, series, labels, callouts, tips,
cartesian and radial coordinates,
and specific series like Pie, Area, and Bar.

In this guide, we discuss

- how these classes are tied together
- what bits of functionality go into each of these classes
- how to apply themes to a chart
- how to use specific series such as Pie, Area, and Bar

## Chart class

The Chart class is the main drawing surface for series.
It manages the rendering of each series
and also how axes are drawn and defined.
Chart also delegates mouse events over
to different areas of the Chart like Series, Axes, etc.
The Chart class extends Draw Component.

A Chart instance has access to:

 - axes - Standard Cartesian charts using the x,y scheme
and accessed through `chart.axes`.
All the axes being defined and drawn for this visualization.
This is a mixed collection.
 - series - Accessed through `chart.series`.
All the series being drawn for the chart.
This could be line, bar, scatter, etc. This is also a mixed collection.
 - legend - The legend box object and its legend items.

The chart instance supports custom events
that can be triggered right before and during
the rendering of the visualization.
We can add handlers for these events by using:

    chart.on({
      'refresh': function() {
        alert('(re)drawing the chart');
      }
    });

Chart also delegates events like `itemmousedown` and `itemmouseup`
to the series so that we can append listeners
to those objects and get the target sprite of the event.

## Legend

The chart configuration object accepts a `legend` parameter
to enable legend items for each series
and to set the position of the legend.
These options are passed into the constructor of the chart. For example:

    var chart = Ext.create('Ext.chart.Chart', {
        width: 200,
        height: 200,

        // Set a legend
        legend: {
            position: 'left'
        },

        // Define axes
        axes: [/*set an axis configuration*/],

        // Define series
        series: [/*set series configuration*/]
    });

Each series object needs to have the `showInLegend` parameter
set to `true` in order to be in the legend list.

### Axis

The `axis` package contains an `Abstract` axis class
that is extended by `Axis` and `Radial` axes.
`Axis` represents a `Cartesian` axis
and `Radial` uses polar coordinates
to represent the information for polar based visualizations
like Pie and Radar series.
Axes are bound to the type of data we're trying to represent.
There are axes for categorical information (called `Category` axis)
and also axes for quantitative information like `Numeric`.
For time-based information we have the `Time` axis
that enables us to render information over a specific period of time,
and to update that period of time with smooth animations.
If you'd like to know more about each axis
please go to the axis package documentation.
Also, you will find configuration examples for axis
in the bottom series examples.

An axis contains divisions and subdivisions of values,
represented by major and minor ticks.
These can be adjusted automatically or manually
to some specified interval, maximum and minimum values.
The configuration options `maximum`, `minimum`,
`majorTickSteps` and `minorTickSteps` in the `Numeric` axis
are used to change the configuration and placement of the major and minor ticks.
For example, by using:

            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                title: 'Number of Hits',
                minimum: 0,
                //one minor tick between two major ticks
                minorTickSteps: 1
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }]

The following configuration produces minor ticks in the left axis
for the line series:

{@img Ticks.jpg Series Image}


### Gradients

The drawing and charting package
has also the power to create linear gradients.
The gradients can be defined in the Chart configuration object
as an array of gradient configurations.
For each gradient configuration
the following parameters are specified:

 * **id** - string - The unique name of the gradient.
 * **angle** - number, optional - The angle of the gradient in degrees.
 * **stops** - object - An object with numbers as keys
(from 0 to 100) and style objects as values.

Each key in the stops object represents
the percentage of the fill on the specified color for the gradient.

For example:

        gradients: [{
            id: 'gradientId',
            angle: 45,
            stops: {
                0: {
                    color: '#555'
                },
                100: {
                    color: '#ddd'
                }
            }
        },  {
            id: 'gradientId2',
            angle: 0,
            stops: {
                0: {
                    color: '#590'
                },
                20: {
                    color: '#599'
                },
                100: {
                    color: '#ddd'
                }
            }
        }]

You can apply a gradient to a sprite
by setting a reference to a gradient **id** in the fill property.
This reference is done via a url syntax. For example:

        sprite.setAttributes({
            fill: 'url(#gradientId)'
        }, true);


### Series

A `Series` is an abstract class
extended by concrete visualizations
like `Line` or `Scatter`:

- The `Series` class contains code that is common to all of these series,
such as event handling, animation handling, shadows,
gradients, and common offsets.
- The `Series` class is enhanced with a set of *mixins*
that provide functionality such as highlighting, callouts, and tips.
- A `Series` contains an array of `items`
where each item contains information about
the positioning of each element,
its associated `sprite` and a `storeItem`.
- A `Series` also shares the `drawSeries` method
that updates all positions for the series and then renders the series.

## Theming

The Chart configuration object may have a `theme` property
with a string value that references a builtin theme name.

    var chart = Ext.create('Ext.chart.Chart', {
        theme: 'Blue',
        /* Other options... */
    });

**Note:** Charting is implemented with the surfaces and sprites
defined by the graphics libraries
and created with the drawing package.
It does not use CSS and so theming is done
using its own theming implementation,
not the Ext JS 4.2 theming package implementation.

A Theme defines the style of the shapes, color, font,
axes and background of a chart.
The theming configuration can be very rich and complex:


    {
        axis: {
            fill: '#000',
            'stroke-width': 1
        },
        axisLabelTop: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelLeft: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelRight: {
            fill: '#000',
            font: '11px Arial'
        },
        axisLabelBottom: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleTop: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleLeft: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleRight: {
            fill: '#000',
            font: '11px Arial'
        },
        axisTitleBottom: {
            fill: '#000',
            font: '11px Arial'
        },
        series: {
            'stroke-width': 1
        },
        seriesLabel: {
            font: '12px Arial',
            fill: '#333'
        },
        marker: {
            stroke: '#555',
            fill: '#000',
            radius: 3,
            size: 3
        },
        seriesThemes: [{
            fill: '#C6DBEF'
        }, {
            fill: '#9ECAE1'
        }, {
            fill: '#6BAED6'
        }, {
            fill: '#4292C6'
        }, {
            fill: '#2171B5'
        }, {
            fill: '#084594'
        }],
        markerThemes: [{
            fill: '#084594',
            type: 'circle'
        }, {
            fill: '#2171B5',
            type: 'cross'
        }, {
            fill: '#4292C6',
            type: 'plus'
        }]
    }

We can also create a seed of colors
that is a base for the entire theme
just by creating a simple array of colors
in the configuration object like:

    {
      colors: ['#aaa', '#bcd', '#eee']
    }

When setting a base color, the theme generates
an array of colors that match the base color:

    {
      baseColor: '#bce'
    }

You can create a custom theme by extending from the base theme.
For example, to create a custom `Fancy` theme we can do:

    var colors = ['#555',
                  '#666',
                  '#777',
                  '#888',
                  '#999'];

    var baseColor = '#eee';

    Ext.define('Ext.chart.theme.Fancy', {
        extend: 'Ext.chart.theme.Base',

        constructor: function(config) {
            this.callParent([Ext.apply({
                axis: {
                    fill: baseColor,
                    stroke: baseColor
                },
                axisLabelLeft: {
                    fill: baseColor
                },
                axisLabelBottom: {
                    fill: baseColor
                },
                axisTitleLeft: {
                    fill: baseColor
                },
                axisTitleBottom: {
                    fill: baseColor
                },
                colors: colors
            }, config)]);
        }
    });

    var chart = Ext.create('Ext.chart.Chart', {
        theme: 'Fancy',

        /* Other options here... */
    });


## Series

The following section will go through our available series/visualizations,
introduces each of the series and visualizations
that are included in Ext JS
and shows a complete configuration example of the series.
The example includes the `Chart`,
`Axis` and `Series` configuration options.

## Area

Creates a Stacked Area Chart.
The stacked area chart is useful
when displaying multiple aggregated layers of information.
As with all other series,
the Area Series must be appended in the *series* Chart array configuration.


{@img Area.jpg Series Image}


A typical configuration object for the area series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store,
        legend: {
            position: 'bottom'
        },

        // Add Numeric and Category axis
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Number of Hits',
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            },
            minimum: 0,
            adjustMinimumByMajorUnit: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year',
            grid: true,
            label: {
                rotate: {
                    degrees: 315
                }
            }
        }],

        // Add the Area Series
        series: [{
            type: 'area',
            highlight: true,
            axis: 'left',
            xField: 'name',
            yField: ['data1', 'data2', 'data3'],
            style: {
                opacity: 0.93
            }
        }]
    });


## Bar

Creates a Bar Chart.
A Bar Chart is a useful visualization technique
to display quantitative information for different categories
that can show some progression (or regression) in the dataset.
As with all other series,
the Bar Series must be appended in the *series* Chart array configuration.
See the Chart documentation for more information.


{@img Bar.jpg Series Image}


A typical configuration object for the bar series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store,
        theme: 'White',
        axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['data1'],
            title: 'Number of Hits'
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        //Add Bar series.
        series: [{
            type: 'bar',
            axis: 'bottom',
            xField: 'name',
            yField: 'data1',
            highlight: true,
            label: {
                display: 'insideEnd',
                field: 'data1',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
               'text-anchor': 'middle'
            }
        }]
    });


## Line

Creates a Line Chart.
A Line Chart is a useful visualization technique
to display quantitative information for different categories
or other real values (as opposed to the bar chart),
that can show some progression (or regression) in the dataset.
As with all other series,
the Line Series must be appended
in the *series* Chart array configuration.
See the Chart documentation for more information.


{@img Line.jpg Series Image}


A typical configuration object for the line series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store,
        shadow: true,
        theme: 'Category1',
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Number of Hits'
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year'
        }],

        // Add two line series
        series: [{
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            axis: 'left',
            fill: true,
            xField: 'name',
            yField: 'data3',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
    });

A marker configuration object
contains the same properties used to create a Sprite.
You can find the properties
used to create a Sprite in the Sprite section of the
[Drawing](#!/guide/drawing) guide.


## Pie

Creates a Pie Chart.
A Pie Chart is a useful visualization technique
to display quantitative information for different categories
that also have a meaning as a whole.
As with all other series,
the Pie Series must be appended
in the *series* Chart array configuration.
See the Chart documentation for more information.
A typical configuration object for the pie series could be:


{@img Pie.jpg Series Image}


A typical configuration object for the pie series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        width: 800,
        height: 600,
        animate: true,
        shadow: true,
        store: store,
        renderTo: Ext.getBody(),
        legend: {
            position: 'right'
        },
        insetPadding: 25,
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            field: 'data1',
            showInLegend: true,
            highlight: {
              segment: {
                margin: 20
              }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '18px Arial'
            }
        }]
    });


## Radar

Creates a Radar Chart.
A Radar Chart is a useful visualization technique
for comparing different quantitative values
for a constrained number of categories.
As with all other series,
the Radar series must be appended
in the *series* Chart array configuration.
See the Chart documentation for more information.

{@img Radar.jpg Series Image}

A typical configuration object for the radar series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        width: 800,
        height: 600,
        animate: true,
        store: store,
        renderTo: Ext.getBody(),
        insetPadding: 20,
        theme: 'Category2',
        axes: [{
            type: 'Radial',
            position: 'radial',
            label: {
                display: true
            }
        }],

        // Add two series for radar.
        series: [{
            type: 'radar',
            xField: 'name',
            yField: 'data1',
            showMarkers: true,
            markerConfig: {
                radius: 5,
                size: 5
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        },{
            type: 'radar',
            xField: 'name',
            yField: 'data3',
            showMarkers: true,
            markerConfig: {
                radius: 5,
                size: 5
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        }]
    });


## Scatter

Creates a Scatter Chart.
The scatter plot is useful
when trying to display more than two variables in the same visualization.
These variables can be mapped into x, y coordinates
and also to an element's radius/size, color, etc.
As with all other series,
the Scatter Series must be appended
in the *series* Chart array configuration.
See the Chart documentation for more information on creating charts.

{@img Scatter.jpg Series Image}

A typical configuration object for the scatter series could be:

    var chart = Ext.create('Ext.chart.Chart', {
        width: 800,
        height: 600,
        animate: true,
        store: store,
        renderTo: Ext.getBody(),
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Number of Hits'
        }],
        series: [{
            type: 'scatter',
            markerConfig: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            color: '#a00'
        }, {
            type: 'scatter',
            markerConfig: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data2'
        }, {
            type: 'scatter',
            markerConfig: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data3'
        }]
    });


## Gauge

Creates a Gauge Chart.
Gauge Charts are used to show progress in a certain variable.
A Gauge chart can be used
to set a store element into the Gauge
and select the field to be used from that store;
or it can be used to instantiate the visualization,
using the `setValue` method to adjust the value you want.

{@img Gauge.jpg Series Image}

A chart/series configuration
for the Gauge visualization could look like this:

    {
        xtype: 'chart',
        store: store,
        axes: [{
            type: 'gauge',
            position: 'gauge',
            minimum: 0,
            maximum: 100,
            steps: 10,
            margin: -10
        }],
        series: [{
            type: 'gauge',
            field: 'data1',
            donut: false,
            colorSet: ['#F49D10', '#ddd']
        }]
    }


In this configuration we create a special Gauge axis
to be used with the gauge visualization (describing half-circle markers),
and also we're setting a maximum, minimum
and steps configuration options into the axis.
The Gauge series configuration contains the store field
to be bound to the visual display.
and the color set to be used with the visualization.
