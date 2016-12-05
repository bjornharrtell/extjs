// Unused Views:
// animations/Cube.js
// Map.js (Google Maps ux)
// ColorPatterns.js
// GalleryPage.js
// ProfileSwitcher.js
// SourceItem.js
// SourceOverlay.js
//
Ext.define('KitchenSink.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    // So that a leaf node being filtered in
    // causes its parent to be filtered in too.
    filterer: 'bottomup',

    constructor: function (config) {
        var me = this,
            items = [],
            ver = Ext.getVersion().parts;

        me.ver = new Ext.Version(ver[0] + '.' + ver[1] + '.' + ver[2]); // just 3-digits

        items.push(me.getNavItemsGeneral());
        items.push(me.getNavItemsGrid());
        items.push(me.getNavItemsTrees());
        items.push(me.getNavItemsCharts());
        items.push(me.getNavItemsCalendar());
        items.push(me.getNavItemsGridPivot());
        if (!Ext.isIE10m) {
            items.push(me.getNavItemsD3());
        }

        items = {
            text: 'All',
            id: 'all',
            expanded: true,
            description: '<h2>Welcome To Ext JS Kitchen Sink!</h2>' +
                'This application showcases all the components in Ext JS and demonstrates ' +
                'how easy it is to start using them in your applications!',

            children: items
        };

        me.fixUp(items);

        me.callParent([Ext.apply({
            root: items
        }, config)]);
    },

    /**
     * This method is used to fill in missing fields (e.g. iconCls) and also to localize
     * the text and description fields if a translation is available.
     *
     * @param {Object/Object[]} items
     * @param {String} tier
     */
    fixUp: function (items, tier, parent) {
        var me = this,
            item = items,
            i, since;

        if (Ext.isArray(items)) {
            for (i = items.length; i-- > 0;) {
                item = items[i];

                if (item.compat === false) {
                    items.splice(i, 1);
                } else {
                    me.fixUp(item, tier, parent);

                    if (parent && (item.isNew || item.hasNew)) {
                        parent.hasNew = true;
                    }
                }
            }
        } else {
            since = item.since;
            if (since) {
                item.sinceVer = since = new Ext.Version(since);
                item.isNew = since.gtEq(me.ver);
            }

            tier = item.tier || (item.tier = tier || 'standard');
            
            if (!('iconCls' in item)) {
                item.iconCls = 'icon-' + item.id;
            }

            if (item.children) {
                me.fixUp(item.children, tier, item);
            }
        }
    },

    getNavItemsCalendar: function () {
        return {
            text: 'Calendar',
            id: 'calendar',
            tier: 'premium',
            since: '6.2.0',

            description: 'The calendar family of components allows you to present ' +
                'schedules and manage event information.',

            children: [
                { id: 'calendar-panel', text: 'Calendar Panel', view: 'calendar.Panel', leaf: true },
                { id: 'calendar-month-view', text: 'Month View', view: 'calendar.Month', leaf: true },
                { id: 'calendar-week-view', text: 'Week View', view: 'calendar.Week', leaf: true },
                { id: 'calendar-days-view', text: 'Days View', view: 'calendar.Days', leaf: true },
                { id: 'calendar-timezone', text: 'Timezone Support', view: 'calendar.Timezone', leaf: true },
                { id: 'calendar-validation', text: 'Drag/Resize Validation', view: 'calendar.Validation', leaf: true }
            ]
        };
    },

    getNavItemsCharts: function () {
        return {
            text: 'Charts',
            id: 'charts',
            expanded: true,

            description: 'With charts you can easily visualize many types of data. Charts ' +
                'leverage Stores of records and renders their meaningful fields ssssing ' +
                'lines, bars or other graphical elements.',

            children: [{
                text: 'Column Charts',
                id: 'column-charts',

                description: 'Column chsarts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic', text: 'Basic', view: 'chart.Column', leaf: true },
                    { id: 'column-stacked', text: 'Stacked', view: 'chart.ColumnStacked', leaf: true },
                    //{ id: s'column-stacked-100', text: '100% Stacked', view: 'chart.Column', leaf: true },
                    { id: 'column-renderer', text: 'With Renderer', view: 'chart.ColumnWithRenderer', leaf: true }
                    //{ id: 'column-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            }, 
            {
                text: '3D Column Charts',
                id: 'column-charts-3d',
                description: '3D Column charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic-3d', text: 'Basic', view: 'chart.Column3D', leaf: true }
                    //{ id: 'column-grouped-3d', text: 'Grouped', leaf: true },
                    //{ id: 'column-stacked-3d', text: 'Stacked', leaf: true },
                    //{ id: 'column-stacked-100-3d', text: '100% Stacked', leaf: true },
                    //{ id: 'column-negative-3d', text: 'Negative values', leaf: true },
                    //{ id: 'column-renderer-3d', text: 'With Renderer', leaf: true }
                ]
            }, 
            {
                text: 'Bar Charts',
                id: 'bar-charts',

                description: 'Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    //{ id: 'bar-basic', text: 'Basic', view: 'chart.Bar', leaf: true }
                    { id: 'bar-stacked', text: 'Stacked', view: 'chart.Bar', leaf: true }
                    //{ id: 'bar-stacked-100', text: '100% Stacked', leaf: true }
                ]
            }, 
            //{
            //    text: '3D Bar Charts',
            //    id: 'bar-charts-3d',

            //    description: '3D Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
            //                 'categories or groups. These charts display horizontal bars to represent information in a way + ' +
            //                 'that allows for quick generalizations regarding your data.',
            //    children: [
            //        { id: 'bar-basic-3d', text: 'Basic', leaf: true },
            //        { id: 'bar-stacked-3d', text: 'Stacked', leaf: true },
            //        { id: 'bar-stacked-100-3d', text: '100% Stacked', leaf: true },
            //        { id: 'bar-negative-3d', text: 'Negative values', leaf: true }
            //    ]
            //}, 
            {
                text: 'Line Charts',
                id: 'line-charts',

                description: 'Line charts display information as a series of markers that are connected by lines.' +
                             'These charts are excellent for showing underlying patterns between data points.',
                children: [
                    { id: 'line-basic', text: 'Basic', view: 'chart.Line', leaf: true },
                    { id: 'line-marked', text: 'Basic + Markers', view: 'chart.LineWithMarker', leaf: true },
                    //{ id: 'line-spline', text: 'Spline', leaf: true },
                    //{ id: 'line-marked-spline', text: 'Spline + Markers', leaf: true },
                    { id: 'line-plot', text: 'Plot', view: 'chart.Plot', leaf: true },
                    //{ id: 'line-markers', text: 'With Image Markers', leaf: true },
                    //{ id: 'line-crosszoom', text: 'With Zoom', leaf: true },
                    { id: 'line-renderer', text: 'With Renderer', view: 'chart.LineWithRenderer', leaf: true }
                    //{ id: 'line-real-time', text: 'Real-time', leaf: true }
                ]
            }, 
            {
                text: 'Area Charts',
                id: 'area-charts',

                description: 'Area charts display data by differentiating the area between lines. They are often ' +
                             'used to measure trends by representing totals over time.',
                children: [
                    { id: 'area-basic', text: 'Basic', view: 'chart.Area', leaf: true }
                    //{ id: 'area-stacked', text: 'Stacked', leaf: true },
                    //{ id: 'area-stacked-100', text: '100% Stacked', leaf: true },
                    //{ id: 'area-negative', text: 'Negative Values', leaf: true }
                ]
            }, 
            {
                text: 'Scatter Charts',
                id: 'scatter-charts',

                description: 'Scatter charts are diagrams that are used to display data as a collection of points.' +
                             'They are perfect for showing multiple measurements to aid in finding correlation ' +
                             'between variables.',
                children: [
                    { id: 'scatter-basic', text: 'Basic', view: 'chart.Scatter', leaf: true },
                    //{ id: 'scatter-custom-icons', text: 'Custom Icons', leaf: true },
                    { id: 'scatter-bubble', text: 'Bubble', view: 'chart.Bubble', leaf: true }
                ]
            },
            {
                text: 'Financial Charts',
                id: 'financial-charts',

                description : 'Financial charts provide a simple method for showing the change in price over time. ' +
                              'A quick look at these charts provides information regarding financial highs, lows, ' +
                              'opens, and closes.',
                children: [
                    { id: 'financial-candlestick', text: 'Candlestick', view: 'chart.Candlestick', leaf: true },
                    { id: 'financial-ohlc', text: 'OHLC', view: 'chart.OHLC', leaf: true }
                ]
            }, 
            {
                text: 'Pie Charts',
                id: 'pie-charts',

                description: 'Pie charts show sectors of data proportional to the whole. They are excellent for ' +
                             'providing a quick and simple comparison of a category to the whole.',
                children: [
                    { id: 'pie-basic', text: 'Basic', view: 'chart.Pie', leaf: true },
                    //{ id: 'pie-custom', text: 'Spie', leaf: true },
                    //{ id: 'pie-donut', text: 'Donut', leaf: true },
                    //{ id: 'pie-double-donut', text: 'Double Donut', leaf: true },
                    { id: 'pie-3d', text: '3D Pie', view: 'chart.Pie3D', leaf: true }
                ]
            }, 
            {
                text: 'Radar Charts',
                id: 'radar-charts',

                description: 'Radar charts offer a flat view of data involving multiple variable quantities. They are ' +
                             'generally used to show performance metrics because they easily emphasize strengths and ' +
                             'weaknesses from a simple two-dimensional perspective.',
                children: [
                    //{ id: 'radar-basic', text: 'Basic', leaf: true }
                    { id: 'radar-filled', text: 'Filled', view: 'chart.Radar', leaf: true }
                    //{ id: 'radar-marked', text: 'Marked', leaf: true },
                    //{ id: 'radar-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            }, 
            {
                text: 'Gauge Charts',
                id: 'gauge-charts',

                description: 'Gauge charts contain a single value axis that provides simple visualization for dashboards.' +
                             'They are generally used to show the current status or heartbeat with a single point of data.',
                children: [
                    { id: 'gauge-basic', text: 'Basic', view: 'chart.Gauge', leaf: true }
                ]
            },
            //{
            //    text: 'Combination Charts',
            //    id: 'combination-charts',

            //    description: 'Sencha Charts gives you the ability to easily join several chart types into one chart. ' +
            //                 'This gives developers the ability to show multiple series in a single view.',
            //    children: [
            //        { id: 'combination-pareto', text: 'Pareto', leaf: true },
            //        { id: 'combination-dashboard', text: 'Interactive Dashboard', leaf: true },
            //        { id: 'unemployment', text: 'Infographic', leaf: true, compat: !Ext.isIE8 },
            //        { id: 'combination-theme', text: 'Custom Theme', leaf: true },
            //        { id: 'combination-bindingtabs', text: 'Binding & Tabs', leaf: true}
            //    ]
            //}, 
            {
                text: 'Drawing',
                id: 'drawing',

                description: 'The Sencha Draw package allows developers to create cross-browser compatible and mobile ' +
                             'friendly graphics, text, and shapes. You can even create a standalone drawing tool!',
                children: [
                    { id: 'free-paint', text: 'Free Paint', view: 'chart.FreeDraw', leaf: true }
                    //{ id: 'draw-bounce', text: 'Bouncing Logo', leaf: true, compat: !Ext.isIE8 },
                    //{ id: 'hit-test', text: 'Hit Testing', leaf: true },
                    //{ id: 'intersections', text: 'Path Intersections', leaf: true },
                    //{ id: 'draw-composite', text: 'Composite', leaf: true },
                    //{ id: 'sprite-events', text: 'Sprite Events', leaf: true},
                    //{ id: 'easing-functions', text: 'Easing Functions', leaf: true }
                ]
            }
            ]
        };
    },

    getNavItemsD3: function () {
        return {
            text: 'D3',
            id: 'd3',
            expanded: true,
            tier: 'pro',
            since: '6.2.0',

            description: 'Ext JS seamlessly integrates with D3, so you can visualize ' +
                'your stores simply by binding them to D3 components.',

            children: [{
                id: 'd3-hierarchy',
                text: 'Hierarchy',

                description: 'This set of stock components uses D3\'s hierarchical layouts ' +
                    'to render tree stores.',

                children: [
                    { id: 'd3-view-tree', text: 'Tree', view: 'd3.Tree', leaf: true },
                    { id: 'd3-view-treemap', text: 'Treemap', view: 'd3.TreeMap', leaf: true },
                    { id: 'd3-view-pack', text: 'Pack', view: 'd3.Pack', leaf: true },
                    { id: 'd3-view-sunburst-zoom', text: 'Zoomable Sunburst', view: 'd3.SunburstZoom', leaf: true }
                ]
            },
            {
                id: 'd3-heatmap',
                text: 'Heatmap',

                description: 'The hierarchy component can visualize matrices ' +
                    'where individual values are represented as colors.',

                children: [
                    { id: 'd3-view-heatmap-purchases', text: 'Purchases by Day', view: 'd3.heatmap.Purchases', leaf: true },
                    { id: 'd3-view-heatmap-sales', text: 'Sales Per Employee', view: 'd3.heatmap.Sales', leaf: true }
                ]
            },
            {
                id: 'd3-svg',
                text: 'Custom SVG',

                description: 'Custom SVG visualizations can be easily created by using ' +
                    'the "d3" component directly.',

                children: [
                    { id: 'd3-view-transitions', text: 'Transitions', view: 'd3.custom.svg.Transitions', leaf: true }
                ]
            },
            {
                id: 'd3-canvas',
                text: 'Custom Canvas',

                description: 'Custom Canvas visualizations can be easily created by ' +
                    'using the "d3-canvas" component directly.',

                children: [
                    { id: 'd3-view-particles', text: 'Particles', view: 'd3.custom.canvas.Particles', leaf: true }
                ]
            }]
        };
    },

    getNavItemsData: function() {
        return {
            text: 'Data',
            id: 'Data',
            expanded: true,
            iconCls: 'icon-direct-named',
            description: 'Examples demonstrating ExtJS HTTP request types',

            children: [
                { id: 'nestedloading', text: 'Nested Loading', view: 'data.NestedLoading', leaf: true },   // needs icon
                { id: 'jsonp', text: 'JSONP', view: 'data.JSONP', leaf: true },                            // needs icon
                { id: 'yql', text: 'YQL', view: 'data.YQL', leaf: true },                                  // needs icon
                { id: 'ajax', text: 'Ajax', view: 'data.Ajax', leaf: true }                                // needs icon
            ]
        };
    },

    getNavItemsIcons: function() {
        return {
            text: 'Icons',
            id: 'Icons',
            expanded: true,
            iconCls: 'icon-layout-card',
            description: 'Ext JS provides a wide variety of icons.',

            children: [
                { id: 'fa-icons', text: 'Font Awesome Icons', view: 'icons.Icons', leaf: true },          // needs icon
                { id: 'vector-icons', text: 'Vector Icons', view: 'icons.VectorIcons', leaf: true }       // needs icon
            ]
        };
    },

    getNavItemsMedia: function() {
        return {
            text: 'Media',
            id: 'Media',
            expanded: true,
            iconCls: 'x-fa fa-video-camera',
            description: 'Ext JS multimedia components',

            children: [
                { id: 'video', text: 'Video', view: 'media.Video', leaf: true },          // needs icon
                { id: 'audio', text: 'Audio', view: 'media.Audio', leaf: true }             // needs icon
            ]
        };
    },

    getNavItemsGeneral: function () {
        var me = this;

        return {
            text: 'Components',
            id: 'components',
            expanded: true,
            iconCls: 'icon-state-saving',
            description: 'Ext JS provides a wide variety of other, simpler components.',

            children: [
                { id: 'animations', text: 'Animations', view: 'animations.Animations', leaf: true },          // needs icon
                me.getNavItemsButtons(),
                { id: 'carousel', text: 'Carousel', view: 'Carousel', leaf: true },          // needs icon
                me.getNavItemsData(),
                me.getNavItemsDataBinding(),
                me.getNavItemsDataView(),
                me.getNavItemsDragDrop(),
                //me.getNavItemsExtDirect(),
                //me.getNavItemsFormFields(),
                me.getNavItemsEnterprise(),
                me.getNavItemsForms(),
                //me.getNavItemsLayouts(),
                //me.getNavItemsPanelsWindows(),
                me.getNavItemsGauge(),
                me.getNavItemsIcons(),
                me.getNavItemsLists(),
                me.getNavItemsMedia(),
                me.getNavItemsPanels(),
                { id: 'progress-bar', text: 'Progress Bar', view: 'ProgressBar', leaf: true },          // needs icon
                { id: 'menus', text: 'Menus', view: 'Menus', leaf: true },          // needs icon
                { id: 'overlays', text: 'Overlays', view: 'Overlays', leaf: true },          // needs icon
                me.getNavItemsTabs(),
                me.getNavItemsToolbars(),
                { id: 'tooltips', compat: Ext.platformTags.desktop, text: 'ToolTips', view: 'tip.ToolTips', leaf: true },          // needs icon
                { id: 'touch-events', text: 'Touch Events', view: 'TouchEvents', leaf: true }         // needs icon
            ]
        };
    },

    getNavItemsGauge: function () {
        return {
            text: 'Gauges',
            id: 'gauges',
            iconCls: 'icon-gauge-charts', // TODO

            description: 'The gauge component is a flexible progress bar that displays ' +
            'its value in a circular form. The gauge is similar to a gauge chart ' +
            'except that there is no axis.',
            children: [
                { id: 'default-gauge', iconCls: 'icon-gauge-basic', text: 'Gauge', view: 'gauge.DefaultGauge', leaf: true }
            ]
        };
    },

    getNavItemsButtons: function () {
        return {
            text: 'Buttons',
            id: 'buttons',
            view: 'buttons.Buttons',
            leaf: true
        };
    },

    getNavItemsPanels: function () {
        return {
            text: 'Panels',
            id: 'panels',
            view: 'panels.BasicPanel',
            leaf: true
        };
    },

    getNavItemsDataBinding: function () {
        return {
            text: 'Data Binding',
            id: 'data-binding',

            description: 'Data binding, and the ViewModel that powers it, are powerful pieces of Ext JS. ' +
                         'Together, they enable you to create a seamless connection between your application UI ' +
                         'and your business logic.',
            children: [
                //{ id: 'binding-hello-world', text: 'Hello World', leaf: true },
                //{ id: 'binding-dynamic', text: 'Dynamic', leaf: true },
                { id: 'binding-two-way', text: 'Two Way', view: 'binding.TwoWay', leaf: true },
                { id: 'binding-formulas', text: 'Formulas', view: 'binding.Formula', leaf: true },
                { id: 'binding-associations', text: 'Associations', view: 'binding.Association', leaf: true },
                { id: 'binding-component-state', text: 'Component State', view: 'binding.ComponentState', leaf: true },
                { id: 'binding-chained-stores', text: 'Chaining Stores', view: 'binding.ChainedStore', leaf: true},
                { id: 'binding-combo-chaining', text: 'Chained Select', view: 'binding.ChainedSelect', leaf: true },
                { id: 'binding-selection', text: 'Selection', view: 'binding.Selection', leaf: true },
                { id: 'binding-form', text: 'Form', view: 'binding.Form', leaf: true },                             // needs icon
                //{ id: 'binding-gridform', text: 'Grid + Form', leaf: true },
                //{ id: 'binding-model-validation', text: 'Model Validation', leaf: true },
                //{ id: 'binding-field-validation', text: 'Field Validation', leaf: true },
                { id: 'binding-two-way-formulas', text: 'Two-Way Formulas', view: 'binding.TwoWayFormula', leaf: true },
                //{ id: 'binding-slider-form', text: 'Slider and Form Fields', leaf: true },
                //{ id: 'binding-child-session', text: 'Isolated Child Sessions', leaf: true },
                { id: 'binding-algebra-binary', text: 'Binary Operators', view: 'binding.AlgebraBinary', leaf: true },
                { id: 'binding-algebra-ternary', text: 'Ternary Operators', view: 'binding.AlgebraTernary', leaf: true },
                { id: 'binding-algebra-formatters', text: 'Formatters', view: 'binding.AlgebraFormatters', leaf: true },
                { id: 'binding-algebra-unary', text: 'Unary Operators', view: 'binding.AlgebraUnary', leaf: true }
            ]
        };
    },

    getNavItemsDataView: function () {
        return {
            text: 'DataView',
            id: 'data-view',

            description: 'Dataviews are an XTemplate based mechanism for displaying data using custom layout' +
                         'templates and formatting. They can connect to any store and display data in any way' +
                         'you see fit.',
            children: [
                //{ id: 'dataview-multisort', text: 'Multisort DataView', leaf: true }
                { id: 'dataview-basic', text: 'Basic DataView', view: 'dataview.BasicDataView', leaf: true },                   // needs icon
                { id: 'dataview-horizontal', text: 'Horizontal DataView', view: 'dataview.HorizontalDataView', leaf: true },    // needs icon
                { id: 'dataview-inline', text: 'Inline DataView', view: 'dataview.InlineDataView', leaf: true }                 // needs icon
            ]
        };
    },

    getNavItemsDragDrop: function () {
        // id: 'drag-drop-grid',
        // id: 'drag-drop-element',

        return {
            text: 'Drag & Drop',
            id: 'drag-drop',

            description: 'Drag and Drop functionality gives developers the ability to ' +
                'create interactive interfaces for their users.',

            children: [
                { id: 'drag-simple', text: 'Simple', view: 'drag.Simple', leaf: true },
                { id: 'drag-constraint', text: 'Constraints', view: 'drag.Constraint', leaf: true },
                { id: 'drag-proxy', text: 'Proxies', view: 'drag.Proxy', leaf: true },
                { id: 'drag-handle', text: 'Handles', view: 'drag.Handle', leaf: true },
                { id: 'drag-group', text: 'Groups', view: 'drag.Group', leaf: true },
                { id: 'drag-data', text: 'Data', view: 'drag.Data', leaf: true },
                { id: 'drag-file', compat: Ext.platformTags.desktop, text: 'Files', iconCls: 'icon-drag-drop-element', view: 'drag.File', leaf: true }

            ]
        };
    },

    //getNavItemsExtDirect: function () {
    //    return {
    //        text: 'Ext Direct',
    //        id: 'direct',

    //        description: 'Ext Direct streamlines communication between the client and server by providing a single ' +
    //                     'interface that reduces much of the common code required to validate and handle data.',

    //        children: [
    //            { id: 'direct-grid', text: 'Grid with Direct store', leaf: true },
    //            { id: 'direct-tree', text: 'Tree with dynamic nodes', leaf: true },
    //            { id: 'direct-form', text: 'Form load and submit actions', leaf: true },
    //            { id: 'direct-generic', text: 'Generic remoting and polling', leaf: true },
    //            { id: 'direct-named', text: 'Custom form processing', leaf: true }
    //        ]
    //    };
    //},

    getNavItemsEnterprise: function () {
        return {
            text: 'Enterprise',
            id: 'enterprise',

            description: 'Our Enterprise tools offer developers the ability to easily ' +
                'utilize data interfaces such as SOAP and AMF.',

            children: [
                { id: 'amf-zero', text: 'AMF0 Format', view: 'enterprise.AMF0', leaf: true, iconCls: 'icon-amf-one' },
                { id: 'amf-three', text: 'AMF3 Format', view: 'enterprise.AMF3', leaf: true, iconCls: 'icon-amf-three' },
                { id: 'soap', text: 'SOAP', leaf: true, view: 'enterprise.SOAP', iconCls: 'icon-soap-grid' }
            ]
        };
    },

    //getNavItemsFormFields: function () {
    //    return {
    //        text: 'Form Fields',
    //        id: 'form-fields',

    //        description: 'Form Fields offer developers standard HTML form fields with built-in event handling, ' +
    //                     'rendering, and other common functionality you may require. Variations of fields include: ' +
    //                     'textfields, textareas, htmleditors, radio groups, checkboxes, and more!',
    //        children: [
    //            { id: 'form-number', text: 'Number Field', leaf: true },
    //            { id: 'form-date', text: 'Date/Month Picker', leaf: true },
    //            {
    //                id: 'combo-boxes',
    //                text: 'ComboBoxes',
    //                leaf: false,

    //                description: 'These examples demonstrate that ComboBoxes can use any type of ' +
    //                        'Ext.data.Store as a data souce. This means your data can be XML, JSON, '+
    //                        'arrays or any other supported format. It can be loaded using Ajax, JSONP or locally.',

    //                children: [
    //                    {id: 'simple-combo', text: 'Simple ComboBox', leaf: true },
    //                    {id: 'remote-combo', text: 'Remote Query ComboBox', leaf: true },
    //                    {id: 'remote-loaded-combo', text: 'Remote loaded ComboBox', leaf: true },
    //                    {id: 'custom-template-combo', text: 'Custom Template ComboBox', leaf: true }
    //                ]
    //            },
    //            { id: 'form-fileuploads', text: 'File Uploads', leaf: true },
    //            { id: 'form-fieldreplicator', text: 'Field Replicator', leaf: true },
    //            { id: 'form-grid', text: 'Form with Grid', leaf: true },
    //            { id: 'form-tag', text: 'Tag Field', leaf: true },
    //            { id: 'multi-selector', text: 'Multi-Selector Grid', leaf: true },
    //            { id: 'form-fieldtypes', text: 'Field Types', leaf: true},
    //            { id: 'form-fieldcontainer', text: 'Field Container', leaf: true},
    //            { id: 'form-checkboxgroup', text: 'Checkbox Groups', leaf: true },
    //            { id: 'form-radiogroup', text: 'Radio Groups', leaf: true },
    //            { id: 'slider-field', text: 'Slider Field', leaf: true }
    //        ]
    //    };
    //},

    getNavItemsForms: function () {
        return {
            text: 'Forms',
            id: 'forms',

            description: 'Form Panel extends panel to offer developers the ability to manage data collection in a ' +
                         'simple and straightforward manner. Field display and handling can be configured in almost ' +
                         'any conceivable fashion and offers default objects to minimize repetitive code.',
            children: [
                //{ id: 'form-login', text: 'Login Form', leaf: true },
                //{ id: 'form-contact', text: 'Contact Form', leaf: true },
                //{ id: 'form-register', text: 'Register Form', leaf: true  },
                //{ id: 'form-checkout', text: 'Checkout Form', leaf: true },
                //{ id: 'form-color-picker', text: 'Color Picker', leaf: true},
                //{ id: 'form-rating', text: 'Rating Form', leaf: true},
                //{ id: 'form-vboxlayout', text: 'VBox Layout', leaf: true },
                //{ id: 'form-hboxlayout', text: 'HBox Layout', leaf: true },
                //{ id: 'form-multicolumn', text: 'Multi Column Form', leaf: true },
                //{ id: 'form-xml', text: 'XML Form', leaf: true },
                //{ id: 'form-advtypes', text: 'Custom VTypes', leaf: true },
                //{ id: 'form-customfields', text: 'Custom fields', leaf: true },
                //{ id: 'form-forumsearch', text: 'Forum Search', leaf: true },
                //{ id: 'form-customerrors', text: 'Custom Error Handling', leaf: true }
                { id: 'form-panel', text: 'Form Panel', view: 'forms.FormPanel', leaf: true },                            // needs icon
                { id: 'form-sliders', text: 'Sliders', view: 'forms.Sliders', leaf: true },                               // needs icon
                { id: 'form-placeholder', text: 'Label as Placeholder', view: 'forms.PlaceholderLabel', leaf: true }    // needs icon
            ]
        };
    },

    //getNavItemsLayouts: function () {
    //    return {
    //        text: 'Layouts',
    //        id: 'layouts',

    //        description: 'Layouts can be considered the heart and soul of Ext JS. They manage the DOM flow and ' +
    //                     'display of your content. There are multiple layout options that should satisfy almost' +
    //                     'any application wireframe.',
    //        children: [
    //            { id: 'layout-absolute', text: 'Absolute Layout', leaf: true },
    //            { id: 'layout-accordion', text: 'Accordion Layout', leaf: true },
    //            { id: 'layout-border', text: 'Border Layout', leaf: true },
    //            { id: 'layout-card', text: 'Card Layout', leaf: true },
    //            { id: 'layout-cardtabs', text: 'Card (Tabs)', leaf: true },
    //            { id: 'layout-center', text: 'Center Layout', leaf: true },
    //            { id: 'layout-column', text: 'Column Layout', leaf: true },
    //            { id: 'layout-fit', text: 'Fit Layout', leaf: true },
    //            { id: 'layout-horizontal-box', text: 'HBox Layout', leaf: true },
    //            { id: 'layout-table', text: 'Table Layout', leaf: true },
    //            { id: 'layout-vertical-box', text: 'VBox Layout', leaf: true }
    //        ]
    //    };
    //},

    //getNavItemsPanelsWindows: function () {
    //    return {
    //        text: 'Panels &amp; Windows',
    //        id: 'panels',
    //        iconCls: 'icon-windows',

    //        description: 'Panels are the basic container that makes up the structure ' +
    //            'of most applications. Panels have a header and body, and can be arranged ' +
    //            'in various ways using layouts.<br><br>' +
    //            'Windows are specialized panels, intended to be used as floating, ' +
    //            'resizable, and draggable containers in your application.',

    //        children: [
    //            { id: 'basic-panels', text: 'Basic Panel', leaf: true },
    //            { id: 'framed-panels', text: 'Framed Panel', leaf: true },
    //            { id: 'panel-header-position', text: 'Header Positioning', leaf: true },
    //            { id: 'basic-window', text: 'Basic Window', leaf: true },
    //            { id: 'message-box', text: 'Message Box', leaf: true },
    //            { id: 'window-variations', text: 'Window Variations',
    //              iconCls: 'icon-window', leaf: true }
    //        ]
    //    };
    //},

    getNavItemsTabs: function () {
        return {
            text: 'Tabs',
            id: 'tabs',

            description: 'Tab Panels are panels that have extended support for containing and displaying children ' +
                         'items. These children are managed using a Card Layout and are shown as tabulated content.',
            children: [
                { id: 'basic-tabs', text: 'Basic Tabs', view: 'tabs.Tabs', leaf: true },
                { id: 'bottom-tabs', text: 'Bottom Tabs', view: 'tabs.BottomTabs', leaf: true }      // needs icon
                //{ id: 'plain-tabs', text: 'Plain Tabs', leaf: true },
                //{ id: 'framed-tabs', text: 'Framed Tabs', leaf: true },
                //{ id: 'icon-tabs', text: 'Icon Tabs', leaf: true },
                //{ id: 'ajax-tabs', text: 'Ajax Tabs', leaf: true },
                //{ id: 'advanced-tabs', text: 'Advanced Tabs', leaf: true },
                //{ id: 'lazy-tabs', text: 'Lazy Instantiating Tabs', leaf: true},
                //{ id: 'navigation-tabs', text: 'Navigation Tabs', leaf: true },
                //{ id: 'side-navigation-tabs', text: 'Side Navigation Tabs', leaf: true },
                //{ id: 'header-tabs', text: 'Header Tabs', leaf: true },
                //{ id: 'reorderable-tabs', text: 'Reorderable Tabs', leaf: true }
            ]
        };
    },

    getNavItemsToolbars: function () {
        return {
            text: 'Toolbars',
            id: 'toolbars',

            description: 'Toolbars are easily customizable components that give developers a simple way to display ' +
                         'a variety of user interfaces.',
            children: [
                { id: 'basic-toolbar', text: 'Toolbar', view: 'toolbars.Toolbars', leaf: true },           // needs icon
                { id: 'toolbar-menus', text: 'Toolbar Input', view: 'toolbars.ToolbarInput', leaf: true }  // needs icon
                //{ id: 'basic-toolbar', text: 'Reorderable Toolbar', leaf: true },
                //{ id: 'docked-toolbars', text: 'Docked Toolbar', leaf: true },
                //{ id: 'breadcrumb-toolbar', text: 'Breadcrumb Toolbar', leaf: true },
                //{ id: 'toolbar-overflow', text: 'Toolbar Overflow', leaf: true },
                //{ id: 'statusbar-demo', text: 'StatusBar', leaf: true },
                //{ id: 'toolbar-menus', text: 'Toolbar with Menus', leaf: true }
            ]
        };
    },

    /**
     *
     */
    getNavItemsGrid: function () {
        return {
            text: 'Grids',
            id: 'grids',
            expanded: true,

            description: 'Grids are one of the centerpieces of Ext JS. They are incredibly versatile components ' +
                         'that provide an easy path to display, sort, group, and edit data. These examples show a ' +
                         'number of the most often used grids in Ext JS.',

            children: [
                //this.getNavItemsGridBasic(),
                //this.getNavItemsGridDecorations(),
                this.getNavItemsGridAdvanced()
                //this.getNavItemsGridPivot()
            ]
        };
    },

    getNavItemsGridAdvanced: function () {
        return {
            text: 'Advanced Features',
            id: 'grid-advanced',
            iconCls: 'icon-grid-plugins',

            children: [
                //{ id: 'framing-buttons', text: 'Framed with docked toolbars', leaf: true },
                //{ id: 'row-widget-grid', text: 'Row Widgets', leaf: true, since: '6.2.0' },
                //{ id: 'widget-grid', text: 'Cell Widgets', leaf: true },
                //{ id: 'expander-lockable', text: 'Row Expander, lockable columns', leaf: true },
                //{ id: 'spreadsheet', text: 'Spreadsheet with locking', leaf: true},
                //{ id: 'spreadsheet-checked', text: 'Spreadsheet with Checked Rows', leaf: true },
                //{ id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                { id: 'big-data-grid', text: 'Big Data', view: 'grid.BigData', leaf: true }
            ]
        };
    },

    //getNavItemsGridBasic: function () {
    //    return {
    //        text: 'Core Features',
    //        id: 'grid-core',
    //        iconCls: 'icon-grids',

    //        children: [
    //            { id: 'array-grid', text: 'Basic Grid', leaf: true },
    //            { id: 'grouped-grid', text: 'Grouped Grid', leaf: true },
    //            { id: 'checkbox-selection', text: 'Checkbox Selection Model', leaf: true },
    //            { id: 'row-numberer', text: 'Row Numberer', leaf: true },
    //            { id: 'grouped-header-grid', text: 'Grouped Header Grid', leaf: true },
    //            { id: 'multi-sort-grid', text: 'Multiple Sort Grid', leaf: true },
    //            { id: 'locking-grid', text: 'Locking Grid', leaf: true },
    //            { id: 'cell-editing', text: 'Cell Editing', leaf: true },
    //            { id: 'row-expander-grid', text: 'Row Expander', leaf: true },
    //            { id: 'property-grid', text: 'Property Grid', leaf: true },
    //            { id: 'xml-grid', text: 'XML Grid', leaf: true }
    //        ]
    //    };
    //},

    //getNavItemsGridDecorations: function () {
    //    return {
    //        text: 'Add-ons and Decorations',
    //        id: 'grid-addons',
    //        iconCls: 'icon-framing-buttons',

    //        children: [
    //            { id: 'grid-filtering', text: 'Grid Filtering', leaf: true },
    //            { id: 'grid-exporter', text: 'Grid Export', leaf: true, tier: 'premium' },
    //            { id: 'paging-grid', text: 'Paging', leaf: true },
    //            { id: 'progress-bar-pager', text: 'Progress Bar Pager', leaf: true },
    //            { id: 'sliding-pager', text: 'Sliding Pager', leaf: true },
    //            { id: 'dd-field-to-grid', text: 'Drag Field to Grid', leaf: true },
    //            { id: 'dd-grid-to-form', text: 'Drag Grid to Form', leaf: true },
    //            { id: 'dd-grid-to-grid', text: 'Drag Grid to Grid', leaf: true },
    //            { id: 'actions-grid', text: 'Reusable Actions', leaf: true }
    //        ]
    //    };
    //},

    getNavItemsGridPivot: function () {
        return {
            text: 'Pivot Grids',
            id: 'pivot-grids',
            tier: 'premium',

            description:
                'The Pivot Grid component enables rapid summarization of large sets of data. ' +
                'It provides a simple way to condense many data points into a format that ' +
                'makes trends and insights more apparent.',

            children: [
                { id: 'outline-pivot-grid', text: 'Outline layout', view: 'pivot.LayoutOutline', leaf: true },
                { id: 'compact-pivot-grid', text: 'Compact layout', view: 'pivot.LayoutCompact', leaf: true },
                //{ id: 'locked-pivot-grid', text: 'Locked', leaf: true },
                { id: 'drilldown-pivot-grid', text: 'DrillDown plugin', view: 'pivot.DrillDown', leaf: true },
                { id: 'configurable-pivot-grid', text: 'Configurator plugin', view: 'pivot.Configurator', leaf: true },
                //{ id: 'cellediting-pivot-grid', text: 'CellEditing plugin', leaf: true },
                { id: 'rangeeditor-pivot-grid', text: 'RangeEditor plugin', view: 'pivot.RangeEditor', leaf: true },
                { id: 'exporter-pivot-grid', text: 'Exporter plugin', view: 'pivot.Exporter', leaf: true },
                { id: 'grandtotals-pivot-grid', text: 'Row styling', view: 'pivot.RowStyling', leaf: true },
                { id: 'cellediting-pivot-grid', text: 'Cell styling', view: 'pivot.CellStyling', leaf: true },
                //{ id: 'chart-pivot-grid', text: 'Chart integration', leaf: true },
                //{ id: 'grandtotals-pivot-grid', text: 'Custom grand totals', leaf: true },
                { id: 'remote-pivot-grid', text: 'Remote calculations', view: 'pivot.RemoteCalculations', leaf: true }
            ]
        };
    },

    getNavItemsTrees: function () {
        return {
            text: 'Trees',
            id: 'trees',

            description: 'Tree Panels provide a tree-structured UI representation of tree-structured data.' +
                         'Tree Panel\'s built-in expand/collapse nodes offer a whole new set of opportunities' +
                         'for user interface and data display.',
            children: [
                //{ id: 'basic-trees', text: 'Basic Trees', leaf: true },
                //{ id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                { id: 'tree-grid', text: 'Tree Grid', view: 'grid.Tree', leaf: true },
                //{ id: 'tree-two', text: 'Two Trees', leaf: true },
                //{ id: 'check-tree', text: 'Check Tree', leaf: true },
                //{ id: 'filtered-tree', text: 'Filtered Tree', leaf: true },
                //{ id: 'heterogeneous-tree', text: 'Heterogeneous Tree', leaf: true },
                //{ id: 'lineardata-tree', text: 'Linear Data Geographical Tree', leaf: true },

                { id: 'tree-list', text: 'Tree List', view: 'grid.TreeList', leaf: true }
                //{ id: 'tree-xml', text: 'XML Tree', leaf: true }
            ]
        };
    },

    getNavItemsLists: function() {
        // needs icon
        return {
            text: 'Lists',
            id: 'lists',
            
            description: 'Lists allow for the display of lists of information and provide a means of selecting items from the lists.' + 
                         'Lists may be nested fo provide a structure for navigation through the structured list items.',

            children: [
                { id: 'basic-list', text: 'Basic List', view: 'lists.BasicList', leaf: true },                     // needs icon
                { id: 'grouped-list', text: 'Grouped List', view: 'lists.GroupedList', leaf: true },               // needs icon
                { id: 'disclosure-list', text: 'Disclosure List', view: 'lists.DisclosureList', leaf: true },      // needs icon
                { id: 'nested-list', text: 'Nested List', view: 'lists.NestedList', leaf: true }                   // needs icon
            ]
        };
    }
});

