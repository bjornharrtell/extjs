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
                { id: 'calendar-panel', text: 'Calendar Panel', leaf: true },
                { id: 'calendar-month-view', text: 'Month View', leaf: true },
                { id: 'calendar-week-view', text: 'Week View', leaf: true },
                { id: 'calendar-days-view', text: 'Days View', leaf: true },
                { id: 'calendar-timezone', text: 'Timezone Support', leaf: true },
                { id: 'calendar-validation', text: 'Drag/Resize Validation', leaf: true }
            ]
        };
    },

    getNavItemsCharts: function () {
        return {
            text: 'Charts',
            id: 'charts',
            expanded: true,

            description: 'With charts you can easily visualize many types of data. Charts ' +
                'leverage Stores of records and renders their meaningful fields using ' +
                'lines, bars or other graphical elements.',

            children: [{
                text: 'Column Charts',
                id: 'column-charts',

                description: 'Column charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic', text: 'Basic', leaf: true },
                    { id: 'column-stacked', text: 'Stacked', leaf: true },
                    { id: 'column-stacked-100', text: '100% Stacked', leaf: true },
                    { id: 'column-renderer', text: 'With Renderer', leaf: true },
                    { id: 'column-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            }, {
                text: '3D Column Charts',
                id: 'column-charts-3d',
                description: '3D Column charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic-3d', text: 'Basic', leaf: true },
                    { id: 'column-grouped-3d', text: 'Grouped', leaf: true },
                    { id: 'column-stacked-3d', text: 'Stacked', leaf: true },
                    { id: 'column-stacked-100-3d', text: '100% Stacked', leaf: true },
                    { id: 'column-negative-3d', text: 'Negative values', leaf: true },
                    { id: 'column-renderer-3d', text: 'With Renderer', leaf: true }
                ]
            }, {
                text: 'Bar Charts',
                id: 'bar-charts',

                description: 'Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic', text: 'Basic', leaf: true },
                    { id: 'bar-stacked', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100', text: '100% Stacked', leaf: true }
                ]
            }, {
                text: '3D Bar Charts',
                id: 'bar-charts-3d',

                description: '3D Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic-3d', text: 'Basic', leaf: true },
                    { id: 'bar-stacked-3d', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100-3d', text: '100% Stacked', leaf: true },
                    { id: 'bar-negative-3d', text: 'Negative values', leaf: true }
                ]
            }, {
                text: 'Line Charts',
                id: 'line-charts',

                description: 'Line charts display information as a series of markers that are connected by lines.' +
                             'These charts are excellent for showing underlying patterns between data points.',
                children: [
                    { id: 'line-basic', text: 'Basic', leaf: true },
                    { id: 'line-marked', text: 'Basic + Markers', leaf: true },
                    { id: 'line-spline', text: 'Spline', leaf: true },
                    { id: 'line-marked-spline', text: 'Spline + Markers', leaf: true },
                    { id: 'line-plot', text: 'Plot', leaf: true },
                    { id: 'line-markers', text: 'With Image Markers', leaf: true },
                    { id: 'line-crosszoom', text: 'With Zoom', leaf: true },
                    { id: 'line-renderer', text: 'With Renderer', leaf: true },
                    { id: 'line-real-time', text: 'Real-time', leaf: true }
                ]
            }, {
                text: 'Area Charts',
                id: 'area-charts',

                description: 'Area charts display data by differentiating the area between lines. They are often ' +
                             'used to measure trends by representing totals over time.',
                children: [
                    { id: 'area-basic', text: 'Basic', leaf: true },
                    { id: 'area-stacked', text: 'Stacked', leaf: true },
                    { id: 'area-stacked-100', text: '100% Stacked', leaf: true },
                    { id: 'area-negative', text: 'Negative Values', leaf: true }
                ]
            }, {
                text: 'Scatter Charts',
                id: 'scatter-charts',

                description: 'Scatter charts are diagrams that are used to display data as a collection of points.' +
                             'They are perfect for showing multiple measurements to aid in finding correlation ' +
                             'between variables.',
                children: [
                    { id: 'scatter-basic', text: 'Basic', leaf: true },
                    { id: 'scatter-custom-icons', text: 'Custom Icons', leaf: true },
                    { id: 'scatter-bubble', text: 'Bubble', leaf: true }
                ]
            }, {
                text: 'Financial Charts',
                id: 'financial-charts',

                description : 'Financial charts provide a simple method for showing the change in price over time. ' +
                              'A quick look at these charts provides information regarding financial highs, lows, ' +
                              'opens, and closes.',
                children: [
                    { id: 'financial-candlestick', text: 'Candlestick', leaf: true },
                    { id: 'financial-ohlc', text: 'OHLC', leaf: true }
                ]
            }, {
                text: 'Pie Charts',
                id: 'pie-charts',

                description: 'Pie charts show sectors of data proportional to the whole. They are excellent for ' +
                             'providing a quick and simple comparison of a category to the whole.',
                children: [
                    { id: 'pie-basic', text: 'Basic', leaf: true },
                    { id: 'pie-custom', text: 'Spie', leaf: true },
                    { id: 'pie-donut', text: 'Donut', leaf: true },
                    { id: 'pie-double-donut', text: 'Double Donut', leaf: true },
                    { id: 'pie-3d', text: '3D Pie', leaf: true }
                ]
            }, {
                text: 'Radar Charts',
                id: 'radar-charts',

                description: 'Radar charts offer a flat view of data involving multiple variable quantities. They are ' +
                             'generally used to show performance metrics because they easily emphasize strengths and ' +
                             'weaknesses from a simple two-dimensional perspective.',
                children: [
                    { id: 'radar-basic', text: 'Basic', leaf: true },
                    { id: 'radar-filled', text: 'Filled', leaf: true },
                    { id: 'radar-marked', text: 'Marked', leaf: true },
                    { id: 'radar-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            }, {
                text: 'Gauge Charts',
                id: 'gauge-charts',

                description: 'Gauge charts contain a single value axis that provides simple visualization for dashboards.' +
                             'They are generally used to show the current status or heartbeat with a single point of data.',
                children: [
                    { id: 'gauge-basic', text: 'Basic', leaf: true }
                ]
            }, {
                text: 'Combination Charts',
                id: 'combination-charts',

                description: 'Sencha Charts gives you the ability to easily join several chart types into one chart. ' +
                             'This gives developers the ability to show multiple series in a single view.',
                children: [
                    { id: 'combination-pareto', text: 'Pareto', leaf: true },
                    { id: 'combination-dashboard', text: 'Interactive Dashboard', leaf: true },
                    { id: 'unemployment', text: 'Infographic', leaf: true, compat: !Ext.isIE8 },
                    { id: 'combination-theme', text: 'Custom Theme', leaf: true },
                    { id: 'combination-bindingtabs', text: 'Binding & Tabs', leaf: true}
                ]
            }, {
                text: 'Drawing',
                id: 'drawing',

                description: 'The Sencha Draw package allows developers to create cross-browser compatible and mobile ' +
                             'friendly graphics, text, and shapes. You can even create a standalone drawing tool!',
                children: [
                    { id: 'free-paint', text: 'Free Paint', leaf: true },
                    { id: 'draw-bounce', text: 'Bouncing Logo', leaf: true, compat: !Ext.isIE8 },
                    { id: 'hit-test', text: 'Hit Testing', leaf: true },
                    { id: 'intersections', text: 'Path Intersections', leaf: true },
                    { id: 'draw-composite', text: 'Composite', leaf: true },
                    { id: 'sprite-events', text: 'Sprite Events', leaf: true},
                    { id: 'easing-functions', text: 'Easing Functions', leaf: true }
                ]
            }]
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
                    { id: 'd3-view-tree', text: 'Tree', leaf: true },
                    { id: 'd3-view-treemap', text: 'Treemap', leaf: true },
                    { id: 'd3-view-treemap-tooltip', text: 'Treemap Tooltip', leaf: true },
                    { id: 'd3-view-treemap-pivot-configurator', text: 'Configurable Pivot TreeMap', leaf: true },
                    { id: 'd3-view-pack', text: 'Pack', leaf: true },
                    { id: 'd3-view-words', text: 'Words', leaf: true },
                    { id: 'd3-view-sunburst', text: 'Sunburst', leaf: true },
                    { id: 'd3-view-sunburst-zoom', text: 'Zoomable Sunburst', leaf: true }
                ]
            }, {
                id: 'd3-heatmap',
                text: 'Heatmap',

                description: 'The hierarchy component can visualize matrices ' +
                    'where individual values are represented as colors.',

                children: [
                    { id: 'd3-view-heatmap-purchases', text: 'Purchases by Day', leaf: true },
                    { id: 'd3-view-heatmap-sales', text: 'Sales Per Employee', leaf: true },
                    { id: 'd3-view-heatmap-pivot', text: 'Pivot Heatmap', leaf: true },
                    { id: 'd3-view-heatmap-pivot-configurator', text: 'Configurable Pivot Heatmap', leaf: true }                ]
            }, {
                id: 'd3-svg',
                text: 'Custom SVG',

                description: 'Custom SVG visualizations can be easily created by using ' +
                    'the "d3" component directly.',

                children: [
                    { id: 'd3-view-transitions', text: 'Transitions', leaf: true },
                    { id: 'd3-view-day-hour-heatmap', text: 'Day / Hour Heatmap', leaf: true }
                ]
            }, {
                id: 'd3-canvas',
                text: 'Custom Canvas',

                description: 'Custom Canvas visualizations can be easily created by ' +
                    'using the "d3-canvas" component directly.',

                children: [
                    { id: 'd3-view-particles', text: 'Particles', leaf: true }
                ]
            }]
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
                me.getNavItemsButtons(),
                me.getNavItemsDataBinding(),
                me.getNavItemsDataView(),
                me.getNavItemsDragDrop(),
                me.getNavItemsExtDirect(),
                me.getNavItemsFormFields(),
                me.getNavItemsForms(),
                me.getNavItemsLayouts(),
                me.getNavItemsPanels(),
                me.getNavItemsTabs(),
                me.getNavItemsTips(),
                me.getNavItemsToolbars(),
                me.getNavItemsWindows(),
                me.getNavItemsGauge(),
                me.getNavItemsEnterprise()
            ]
        };
    },

    getNavItemsButtons: function () {
        return {
            text: 'Buttons',
            id: 'buttons',

            description: 'Buttons are a utilitarian component of Ext JS. From forms to grid row widgets, ' +
                         'they can be used in nearly any application for user interaction and directing usability.',
            children: [
                { id: 'basic-buttons', text: 'Basic Buttons', leaf: true },
                { id: 'toggle-buttons', text: 'Toggle Buttons', leaf: true },
                { id: 'menu-buttons', text: 'Menu Buttons', leaf: true },
                { id: 'menu-bottom-buttons', text: 'Menu Bottom Buttons', leaf: true },
                { id: 'split-buttons', text: 'Split Buttons', leaf: true },
                { id: 'split-bottom-buttons', text: 'Split Bottom Buttons', leaf: true },
                { id: 'left-text-buttons', text: 'Left Text Buttons', leaf: true },
                { id: 'right-text-buttons', text: 'Right Text Buttons', leaf: true },
                { id: 'link-buttons', text: 'Link Buttons', leaf: true },
                { id: 'segmented-buttons', text: 'Segmented Buttons', leaf: true },
                { id: 'vertical-segmented-buttons', text: 'Vertical Segmented Buttons', leaf: true }
            ]
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
                { id: 'binding-hello-world', text: 'Hello World', leaf: true },
                { id: 'binding-dynamic', text: 'Dynamic', leaf: true },
                { id: 'binding-two-way', text: 'Two Way', leaf: true },
                { id: 'binding-formulas', text: 'Formulas', leaf: true },
                { id: 'binding-associations', text: 'Associations', leaf: true },
                { id: 'binding-component-state', text: 'Component State', leaf: true },
                { id: 'binding-chained-stores', text: 'Chaining Stores', leaf: true},
                { id: 'binding-combo-chaining', text: 'Chained ComboBoxes', leaf: true },
                { id: 'binding-selection', text: 'Chaining Selection', leaf: true },
                //{ id: 'binding-gridform', text: 'Grid + Form', leaf: true },
                { id: 'binding-model-validation', text: 'Model Validation', leaf: true },
                { id: 'binding-field-validation', text: 'Field Validation', leaf: true },
                { id: 'binding-two-way-formulas', text: 'Two-Way Formulas', leaf: true },
                { id: 'binding-slider-form', text: 'Slider and Form Fields', leaf: true },
                { id: 'binding-child-session', text: 'Isolated Child Sessions', leaf: true },
                { id: 'binding-algebra-binary', text: 'Binary Operators', leaf: true },
                { id: 'binding-algebra-ternary', text: 'Ternary Operators', leaf: true },
                { id: 'binding-algebra-formatters', text: 'Formatters', leaf: true },
                { id: 'binding-algebra-unary', text: 'Unary Operators', leaf: true }
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
                { id: 'dataview-multisort', text: 'Multisort DataView', leaf: true }
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
                { id: 'drag-simple', text: 'Simple', leaf: true },
                { id: 'drag-constraint', text: 'Constraints', leaf: true },
                { id: 'drag-proxy', text: 'Proxies', leaf: true },
                { id: 'drag-handle', text: 'Handles', leaf: true },
                { id: 'drag-group', text: 'Groups', leaf: true },
                { id: 'drag-data', text: 'Data', leaf: true },
                { id: 'drag-file', text: 'Files', iconCls: 'icon-drag-drop-element', leaf: true }
            ]
        };
    },

    getNavItemsExtDirect: function () {
        return {
            text: 'Ext Direct',
            id: 'direct',

            description: 'Ext Direct streamlines communication between the client and server by providing a single ' +
                         'interface that reduces much of the common code required to validate and handle data.',

            children: [
                { id: 'direct-grid', text: 'Grid with Direct store', leaf: true },
                { id: 'direct-tree', text: 'Tree with dynamic nodes', leaf: true },
                { id: 'direct-form', text: 'Form load and submit actions', leaf: true },
                { id: 'direct-generic', text: 'Generic remoting and polling', leaf: true },
                { id: 'direct-named', text: 'Custom form processing', leaf: true }
            ]
        };
    },

    getNavItemsEnterprise: function () {
        return {
            text: 'Enterprise',
            id: 'enterprise',

            description: 'Our Enterprise tools offer developers the ability to easily ' +
                'utilize data interfaces such as SOAP and AMF.',

            children: [
                { id: 'amf-grid', text: 'AMF Grid', leaf: true },
                { id: 'soap-grid', text: 'SOAP Grid', leaf: true }
            ]
        };
    },

    getNavItemsFormFields: function () {
        return {
            text: 'Form Fields',
            id: 'form-fields',

            description: 'Form Fields offer developers standard HTML form fields with built-in event handling, ' +
                         'rendering, and other common functionality you may require. Variations of fields include: ' +
                         'textfields, textareas, htmleditors, radio groups, checkboxes, and more!',
            children: [
                { id: 'form-number', text: 'Number Field', leaf: true },
                { id: 'form-date', text: 'Date/Month Picker', leaf: true },
                {
                    id: 'combo-boxes',
                    text: 'ComboBoxes',
                    leaf: false,

                    description: 'These examples demonstrate that ComboBoxes can use any type of ' +
                            'Ext.data.Store as a data souce. This means your data can be XML, JSON, '+
                            'arrays or any other supported format. It can be loaded using Ajax, JSONP or locally.',

                    children: [
                        {id: 'simple-combo', text: 'Simple ComboBox', leaf: true },
                        {id: 'remote-combo', text: 'Remote Query ComboBox', leaf: true },
                        {id: 'remote-loaded-combo', text: 'Remote loaded ComboBox', leaf: true },
                        {id: 'custom-template-combo', text: 'Custom Template ComboBox', leaf: true }
                    ]
                },
                { id: 'form-fileuploads', text: 'File Uploads', leaf: true },
                { id: 'form-fieldreplicator', text: 'Field Replicator', leaf: true },
                { id: 'form-grid', text: 'Form with Grid', leaf: true },
                { id: 'form-tag', text: 'Tag Field', leaf: true },
                { id: 'multi-selector', text: 'Multi-Selector Grid', leaf: true },
                { id: 'form-fieldtypes', text: 'Field Types', leaf: true},
                { id: 'form-fieldcontainer', text: 'Field Container', leaf: true},
                { id: 'form-checkboxgroup', text: 'Checkbox Groups', leaf: true },
                { id: 'form-radiogroup', text: 'Radio Groups', leaf: true },
                { id: 'slider-field', text: 'Slider Field', leaf: true }
            ]
        };
    },

    getNavItemsForms: function () {
        return {
            text: 'Forms',
            id: 'forms',

            description: 'Form Panel extends panel to offer developers the ability to manage data collection in a ' +
                         'simple and straightforward manner. Field display and handling can be configured in almost ' +
                         'any conceivable fashion and offers default objects to minimize repetitive code.',
            children: [
                { id: 'form-login', text: 'Login Form', leaf: true },
                { id: 'form-contact', text: 'Contact Form', leaf: true },
                { id: 'form-register', text: 'Register Form', leaf: true  },
                { id: 'form-checkout', text: 'Checkout Form', leaf: true },
                { id: 'form-color-picker', text: 'Color Picker', leaf: true},
                { id: 'form-rating', text: 'Rating Form', leaf: true},
                { id: 'form-vboxlayout', text: 'VBox Layout', leaf: true },
                { id: 'form-hboxlayout', text: 'HBox Layout', leaf: true },
                { id: 'form-multicolumn', text: 'Multi Column Form', leaf: true },
                { id: 'form-xml', text: 'XML Form', leaf: true },
                { id: 'form-advtypes', text: 'Custom VTypes', leaf: true },
                { id: 'form-customfields', text: 'Custom fields', leaf: true },
                { id: 'form-forumsearch', text: 'Forum Search', leaf: true },
                { id: 'form-customerrors', text: 'Custom Error Handling', leaf: true }
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
                { id: 'default-gauge', iconCls: 'icon-gauge-basic', text: 'Gauge', leaf: true }
            ],

            compat: !Ext.isIE8
        };
    },

    getNavItemsLayouts: function () {
        return {
            text: 'Layouts',
            id: 'layouts',

            description: 'Layouts can be considered the heart and soul of Ext JS. They manage the DOM flow and ' +
                         'display of your content. There are multiple layout options that should satisfy almost' +
                         'any application wireframe.',
            children: [
                { id: 'layout-absolute', text: 'Absolute Layout', leaf: true },
                { id: 'layout-accordion', text: 'Accordion Layout', leaf: true },
                { id: 'layout-border', text: 'Border Layout', leaf: true },
                { id: 'layout-card', text: 'Card Layout', leaf: true },
                { id: 'layout-cardtabs', text: 'Card (Tabs)', leaf: true },
                { id: 'layout-center', text: 'Center Layout', leaf: true },
                { id: 'layout-column', text: 'Column Layout', leaf: true },
                { id: 'layout-fit', text: 'Fit Layout', leaf: true },
                { id: 'layout-horizontal-box', text: 'HBox Layout', leaf: true },
                { id: 'layout-table', text: 'Table Layout', leaf: true },
                { id: 'layout-vertical-box', text: 'VBox Layout', leaf: true }
            ]
        };
    },

    getNavItemsPanels: function () {
        return {
            text: 'Panels',
            id: 'panels',
            // iconCls: 'icon-windows',

            description: 'Panels are the basic container that makes up the structure ' +
                'of most applications. Panels have a header and body, and can be arranged ' +
                'in various ways using layouts.',

            children: [
                { id: 'basic-panels', text: 'Basic Panel', leaf: true },
                { id: 'framed-panels', text: 'Framed Panel', leaf: true },
                { id: 'panel-header-position', text: 'Header Positioning', leaf: true }
            ]
        };
    },

    getNavItemsWindows: function () {
        return {
            text: 'Windows',
            id: 'windows',
            // iconCls: 'icon-windows',

            description: 'Windows are specialized panels, intended to be used as floating, ' +
            'resizable, and draggable containers in your application.',

            children: [
                { id: 'basic-window', text: 'Basic Window', leaf: true },
                { id: 'message-box', text: 'Message Box', leaf: true },
                { id: 'window-variations', text: 'Window Variations',
                    iconCls: 'icon-window', leaf: true }
            ]
        };
    },

    getNavItemsTabs: function () {
        return {
            text: 'Tabs',
            id: 'tabs',

            description: 'Tab Panels are panels that have extended support for containing and displaying children ' +
                         'items. These children are managed using a Card Layout and are shown as tabulated content.',
            children: [
                { id: 'basic-tabs', text: 'Basic Tabs', leaf: true },
                { id: 'plain-tabs', text: 'Plain Tabs', leaf: true },
                { id: 'framed-tabs', text: 'Framed Tabs', leaf: true },
                { id: 'icon-tabs', text: 'Icon Tabs', leaf: true },
                { id: 'ajax-tabs', text: 'Ajax Tabs', leaf: true },
                { id: 'advanced-tabs', text: 'Advanced Tabs', leaf: true },
                { id: 'lazy-tabs', text: 'Lazy Instantiating Tabs', leaf: true},
                { id: 'navigation-tabs', text: 'Navigation Tabs', leaf: true },
                { id: 'side-navigation-tabs', text: 'Side Navigation Tabs', leaf: true },
                { id: 'header-tabs', text: 'Header Tabs', leaf: true },
                { id: 'reorderable-tabs', text: 'Reorderable Tabs', leaf: true }
            ]
        };
    },

    getNavItemsTips: function () {
        return { id: 'tooltips', text: 'ToolTips', leaf: true };
    },

    getNavItemsToolbars: function () {
        return {
            text: 'Toolbars',
            id: 'toolbars',

            description: 'Toolbars are easily customizable components that give developers a simple way to display ' +
                         'a variety of user interfaces.',
            children: [
                { id: 'basic-toolbar', text: 'Reorderable Toolbar', leaf: true },
                { id: 'docked-toolbars', text: 'Docked Toolbar', leaf: true },
                { id: 'breadcrumb-toolbar', text: 'Breadcrumb Toolbar', leaf: true },
                { id: 'toolbar-overflow', text: 'Toolbar Overflow', leaf: true },
                { id: 'statusbar-demo', text: 'StatusBar', leaf: true },
                { id: 'toolbar-menus', text: 'Toolbar with Menus', leaf: true }
            ]
        };
    },

    getNavItemsGrid: function () {
        return {
            text: 'Grids',
            id: 'grids',
            expanded: true,

            description: 'Grids are one of the centerpieces of Ext JS. They are incredibly versatile components ' +
                         'that provide an easy path to display, sort, group, and edit data. These examples show a ' +
                         'number of the most often used grids in Ext JS.',

            children: [
                this.getNavItemsGridBasic(),
                this.getNavItemsGridDecorations(),
                this.getNavItemsGridAdvanced()
            ]
        };
    },

    getNavItemsGridAdvanced: function () {
        return {
            text: 'Advanced Features',
            id: 'grid-advanced',
            iconCls: 'icon-grid-plugins',

            children: [
                { id: 'framing-buttons', text: 'Framed with docked toolbars', leaf: true },
                { id: 'row-widget-grid', text: 'Row Widgets', leaf: true, since: '6.2.0' },
                { id: 'widget-grid', text: 'Cell Widgets', leaf: true },
                { id: 'expander-lockable', text: 'Row Expander, lockable columns', leaf: true },
                { id: 'spreadsheet', text: 'Spreadsheet with locking', leaf: true},
                { id: 'spreadsheet-checked', text: 'Spreadsheet with Checked Rows', leaf: true },
                { id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                { id: 'big-data-grid', text: 'Big Data', leaf: true }
            ]
        };
    },

    getNavItemsGridBasic: function () {
        return {
            text: 'Core Features',
            id: 'grid-core',
            iconCls: 'icon-grids',

            children: [
                { id: 'array-grid', text: 'Basic Grid', leaf: true },
                { id: 'grouped-grid', text: 'Grouped Grid', leaf: true },
                { id: 'checkbox-selection', text: 'Checkbox Selection Model', leaf: true },
                { id: 'row-numberer', text: 'Row Numberer', leaf: true },
                { id: 'grouped-header-grid', text: 'Grouped Header Grid', leaf: true },
                { id: 'multi-sort-grid', text: 'Multiple Sort Grid', leaf: true },
                { id: 'locking-grid', text: 'Locking Grid', leaf: true },
                { id: 'cell-editing', text: 'Cell Editing', leaf: true },
                { id: 'row-editing', text: 'Row Editing', leaf: true },
                { id: 'row-expander-grid', text: 'Row Expander', leaf: true },
                { id: 'property-grid', text: 'Property Grid', leaf: true },
                { id: 'xml-grid', text: 'XML Grid', leaf: true }
            ]
        };
    },

    getNavItemsGridDecorations: function () {
        return {
            text: 'Add-ons and Decorations',
            id: 'grid-addons',
            iconCls: 'icon-framing-buttons',

            children: [
                { id: 'grid-filtering', text: 'Grid Filtering', leaf: true },
                { id: 'grid-exporter', text: 'Grid Export', leaf: true, tier: 'premium' },
                { id: 'paging-grid', text: 'Paging', leaf: true },
                { id: 'progress-bar-pager', text: 'Progress Bar Pager', leaf: true },
                { id: 'sliding-pager', text: 'Sliding Pager', leaf: true },
                { id: 'dd-field-to-grid', text: 'Drag Field to Grid', leaf: true },
                { id: 'dd-grid-to-form', text: 'Drag Grid to Form', leaf: true },
                { id: 'dd-grid-to-grid', text: 'Drag Grid to Grid', leaf: true },
                { id: 'actions-grid', text: 'Reusable Actions', leaf: true }
            ]
        };
    },

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
                { id: 'outline-pivot-grid', text: 'Outline layout', leaf: true },
                { id: 'compact-pivot-grid', text: 'Compact layout', leaf: true },
                { id: 'locked-pivot-grid', text: 'Locked', leaf: true },
                { id: 'drilldown-pivot-grid', text: 'DrillDown plugin', leaf: true },
                { id: 'configurable-pivot-grid', text: 'Configurator plugin', leaf: true },
                { id: 'cellediting-pivot-grid', text: 'CellEditing plugin', leaf: true },
                { id: 'rangeeditor-pivot-grid', text: 'RangeEditor plugin', leaf: true },
                { id: 'exporter-pivot-grid', text: 'Exporter plugin', leaf: true },
                { id: 'chart-pivot-grid', text: 'Chart integration', leaf: true },
                { id: 'grandtotals-pivot-grid', text: 'Custom grand totals', leaf: true },
                { id: 'remote-pivot-grid', text: 'Remote calculations', leaf: true }
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
                { id: 'basic-trees', text: 'Basic Trees', leaf: true },
                { id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                { id: 'tree-grid', text: 'Tree Grid', leaf: true },
                { id: 'tree-two', text: 'Two Trees', leaf: true },
                { id: 'check-tree', text: 'Check Tree', leaf: true },
                { id: 'filtered-tree', text: 'Filtered Tree', leaf: true },
                { id: 'heterogeneous-tree', text: 'Heterogeneous Tree', leaf: true },
                { id: 'lineardata-tree', text: 'Linear Data Geographical Tree', leaf: true },

                { id: 'tree-list', text: 'Tree List', leaf: true },
                { id: 'tree-xml', text: 'XML Tree', leaf: true }
            ]
        };
    }
});
