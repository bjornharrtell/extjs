Ext.define('KitchenSink.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    constructor: function(config) {
        var me = this,
            queryParams = Ext.Object.fromQueryString(location.search),
            charts = ('charts' in queryParams) && !/0|false|no/i.test(queryParams.charts);

        me.callParent([Ext.apply({
            root: {
                text: 'All',
                id: 'all',
                expanded: true,
                children: charts ? me.getChartNavItems() : me.getNavItems()
            }
        }, config)]);
    },

    addIconClasses: function (items) {
        for (var item, i = items.length; i-- > 0; ) {
            item = items[i];

            if (!('iconCls' in item)) {
                item.iconCls = 'icon-' + item.id;
            }

            if (!('glyph' in item)) {
                // sets the font-family
                item.glyph = '32@Sencha-Examples';
            }

            if (item.children) {
                this.addIconClasses(item.children);
            }
        }

        return items;
    },

    getChartNavItems: function() {
        var combinationExamples,
            drawExamples,
            items = this.addIconClasses([
            {
                text: 'Column Charts',
                id: 'column-charts',
                expanded: true,
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
            },
            {
                text: '3D Column Charts',
                id: 'column-charts-3d',
                expanded: true,
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
            },
            {
                text: 'Bar Charts',
                id: 'bar-charts',
                expanded: true,
                description: 'Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic', text: 'Basic', leaf: true },
                    { id: 'bar-stacked', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100', text: '100% Stacked', leaf: true }
                ]
            },
            {
                text: '3D Bar Charts',
                id: 'bar-charts-3d',
                expanded: true,
                description: '3D Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic-3d', text: 'Basic', leaf: true },
                    { id: 'bar-stacked-3d', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100-3d', text: '100% Stacked', leaf: true },
                    { id: 'bar-negative-3d', text: 'Negative values', leaf: true }
                ]
            },
            {
                text: 'Line Charts',
                id: 'line-charts',
                expanded: true,
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
            },
            {
                text: 'Area Charts',
                id: 'area-charts',
                expanded: true,
                description: 'Area charts display data by differentiating the area between lines. They are often ' +
                             'used to measure trends by representing totals over time.',
                children: [
                    { id: 'area-basic', text: 'Basic', leaf: true },
                    { id: 'area-stacked', text: 'Stacked', leaf: true },
                    { id: 'area-stacked-100', text: '100% Stacked', leaf: true },
                    { id: 'area-negative', text: 'Negative Values', leaf: true }
                ]
            },
            {
                text: 'Scatter Charts',
                id: 'scatter-charts',
                expanded: true,
                description: 'Scatter charts are diagrams that are used to display data as a collection of points.' +
                             'They are perfect for showing multiple measurements to aid in finding correlation ' +
                             'between variables.',
                children: [
                    { id: 'scatter-basic', text: 'Basic', leaf: true },
                    { id: 'scatter-custom-icons', text: 'Custom Icons', leaf: true },
                    { id: 'scatter-bubble', text: 'Bubble', leaf: true }
                ]
            },
            {
                text: 'Financial Charts',
                id: 'financial-charts',
                expanded: true,
                description : 'Financial charts provide a simple method for showing the change in price over time. ' +
                              'A quick look at these charts provides information regarding financial highs, lows, ' +
                              'opens, and closes.',
                children: [
                    { id: 'financial-candlestick', text: 'Candlestick', leaf: true },
                    { id: 'financial-ohlc', text: 'OHLC', leaf: true }
                ]
            },
            {
                text: 'Pie Charts',
                id: 'pie-charts',
                expanded: true,
                description: 'Pie charts show sectors of data proportional to the whole. They are excellent for ' +
                             'providing a quick and simple comparison of a category to the whole.',
                children: [
                    { id: 'pie-basic', text: 'Basic', leaf: true },
                    { id: 'pie-custom', text: 'Spie', leaf: true },
                    { id: 'pie-donut', text: 'Donut', leaf: true },
                    { id: 'pie-3d', text: '3D Pie', leaf: true }
                ]
            },
            {
                text: 'Radar Charts',
                id: 'radar-charts',
                expanded: true,
                description: 'Radar charts offer a flat view of data involving multiple variable quantities. They are ' +
                             'generally used to show performance metrics because they easily emphasize strengths and ' +
                             'weaknesses from a simple two-dimensional perspective.',
                children: [
                    { id: 'radar-basic', text: 'Basic', leaf: true },
                    { id: 'radar-filled', text: 'Filled', leaf: true },
                    { id: 'radar-marked', text: 'Marked', leaf: true },
                    { id: 'radar-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            },
            {
                text: 'Gauge Charts',
                id: 'guage-charts',
                expanded: true,
                description: 'Gauge charts contain a single value axis that provides simple visualization for dashboards.' +
                             'They are generally used to show the current status or heartbeat with a single point of data.',
                children: [
                    { id: 'gauge-basic', text: 'Basic', leaf: true }
                ]
            },
            {
                text: 'Combination Charts',
                id: 'combination-charts',
                expanded: true,
                description: 'Sencha Charts gives you the ability to easily join several chart types into one chart. ' +
                             'This gives developers the ability to show multiple series in a single view.',
                children: combinationExamples = [
                    { id: 'combination-pareto', text: 'Pareto', leaf: true },
                    { id: 'combination-dashboard', text: 'Interactive Dashboard', leaf: true },
                    { id: 'unemployment', text: 'Infographic', leaf: true },
                    { id: 'combination-theme', text: 'Custom Theme', leaf: true },
                    { id: 'combination-bindingtabs', text: 'Binding & Tabs', leaf: true}
                ]
            },
            {
                text: 'Drawing',
                id: 'drawing',
                expanded: true,
                description: 'The Sencha Draw package allows developers to create cross-browser compatible and mobile ' +
                             'friendly graphics, text, and shapes. You can even create a standalone drawing tool!',
                children: drawExamples = [
                    { id: 'free-paint', text: 'Free Paint', leaf: true },
                    { id: 'draw-bounce', text: 'Bouncing Logo', leaf: true },
                    { id: 'hit-test', text: 'Hit Testing', leaf: true },
                    { id: 'intersections', text: 'Path Intersections', leaf: true },
                    { id: 'draw-composite', text: 'Composite', leaf: true },
                    { id: 'sprite-events', text: 'Sprite Events', leaf: true},
                    { id: 'easing-functions', text: 'Easing Functions', leaf: true }
                ]
            }
        ]);
        if (Ext.isIE8) {
            combinationExamples.splice(2, 1);
            drawExamples.splice(1, 1);
        }
        return items;
    },

    getNavItems: function() {
        return this.addIconClasses([
            {
                text: 'Panels',
                id: 'panels',
                expanded: true,
                description: 'Panels are the basic container that makes up the structure ' +
                    'of most applications. Panels have a header and body, and can be arranged ' +
                    'in various ways using layouts. These examples provide a few common use cases of Ext JS Panels.',
                children: [
                    { id: 'basic-panels', text: 'Basic Panel', leaf: true },
                    { id: 'framed-panels', text: 'Framed Panel', leaf: true },
                    { id: 'panel-header-position', text: 'Header Positioning', leaf: true }
                ]
            },
            {
                text: 'Grids',
                id: 'grids',
                expanded: true,
                description: 'Grids are one of the centerpieces of Ext JS. They are incredibly versatile components ' +
                             'that provide an easy path to display, sort, group, and edit data. These examples show a ' +
                             'number of the most often used grids in Ext JS.',
                children: [
                    { id: 'array-grid', text: 'Array Grid', leaf: true },
                    { id: 'grouped-grid', text: 'Grouped Grid', leaf: true },
                    { id: 'locking-grid', text: 'Locking Grid', leaf: true },
                    { id: 'grouped-header-grid', text: 'Grouped Header Grid', leaf: true },
                    { id: 'multi-sort-grid', text: 'Multiple Sort Grid', leaf: true },
                    { id: 'spreadsheet', text: 'Spreadsheet with locking', leaf: true},
                    { id: 'spreadsheet-checked', text: 'Spreadsheet with Checked Rows', leaf: true },
                    { id: 'progress-bar-pager', text: 'Progress Bar Pager', leaf: true },
                    { id: 'sliding-pager', text: 'Sliding Pager', leaf: true },
                    { id: 'xml-grid', text: 'XML Grid', leaf: true },
                    { id: 'paging-grid', text: 'Paging', leaf: true },
                    {
                        id: 'grid-plugins',
                        expanded: true,
                        text: 'Grid Plugins',
                        leaf: false,
                        description: 'Grid panels can extend their functionality with the use of our Grid Plugins. ' +
                                     'Our plugins offer various accoutrements to basic Grid functionality, such as ' +
                                     'row numbering, row expanding, and checkbox selection models.',
                        children: [
                            {id: 'expander-lockable', text: 'Row Expander, lockable columns', leaf: true },
                            {id: 'checkbox-selection', text: 'Checkbox Selection Model', leaf: true },
                            {id: 'row-numberer', text: 'Row Numberer', leaf: true },
                            {id: 'framing-buttons', text: 'Framed with docked toolbars', leaf: true }
                        ]
                    },
                    { id: 'grid-filtering', text: 'Grid Filtering', leaf: true },
                    { id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                    { id: 'property-grid', text: 'Property Grid', leaf: true },
                    { id: 'cell-editing', text: 'Cell Editing', leaf: true },
                    { id: 'row-expander-grid', text: 'Row Expander', leaf: true },
                    { id: 'big-data-grid', text: 'Big Data', leaf: true },
                    { id: 'widget-grid', text: 'Widget grid', leaf: true },
                    { id: 'customer-grid', text: 'Customer/Order grid', leaf: true }
                ]
            },
            {
                text: 'Pivot Grids',
                id: 'pivot-grids',
                expanded: true,
                description:    'The Pivot Grid component enables rapid summarization of large sets of data. ' +
                                'It provides a simple way to condense many data points into a format that ' +
                                'makes trends and insights more apparent.',
                children: [
                    { id: 'outline-pivot-grid', text: 'Outline layout', leaf: true },
                    { id: 'compact-pivot-grid', text: 'Compact layout', leaf: true },
                    { id: 'drilldown-pivot-grid', text: 'DrillDown plugin', leaf: true },
                    { id: 'configurable-pivot-grid', text: 'Configurator plugin', leaf: true },
                    { id: 'rangeeditor-pivot-grid', text: 'RangeEditor plugin', leaf: true },
                    { id: 'excel-pivot-grid', text: 'Exporter plugin', leaf: true },
                    { id: 'chart-pivot-grid', text: 'Chart integration', leaf: true },
                    { id: 'remote-pivot-grid', text: 'Remote calculations', leaf: true }
                ]
            },
            {
                text: 'Data Binding',
                id: 'data-binding',
                expanded: true,
                description: 'Data binding, and the ViewModel that powers it, are powerful pieces of Ext JS 5. ' +
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
//                    { id: 'binding-gridform', text: 'Grid + Form', leaf: true },
                    { id: 'binding-model-validation', text: 'Model Validation', leaf: true },
                    { id: 'binding-field-validation', text: 'Field Validation', leaf: true },
                    { id: 'binding-two-way-formulas', text: 'Two-Way Formulas', leaf: true },
                    { id: 'binding-slider-form', text: 'Slider and Form Fields', leaf: true },
                    { id: 'binding-child-session', text: 'Isolated Child Sessions', leaf: true }
                ]
            },
            {
                text: 'Trees',
                id: 'trees',
                expanded: true,
                description: 'Tree Panels provide a tree-structured UI representation of tree-structured data.' +
                             'Tree Panel\'s built-in expand/collapse nodes offer a whole new set of opportunities' +
                             'for user interface and data display.',
                children: [
                    { id: 'basic-trees', text: 'Basic Trees', leaf: true },
                    { id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                    { id: 'tree-grid', text: 'Tree Grid', leaf: true },
                    { id: 'tree-two', text: 'Two Trees', leaf: true },
                    { id: 'check-tree', text: 'Check Tree', leaf: true },
                    { id: 'tree-xml', text: 'XML Tree', leaf: true },
                    { id: 'filtered-tree', text: 'Filtered Tree', leaf: true },
                    { id: 'heterogeneous-tree', text: 'Heterogeneous Tree', leaf: true },
                    { id: 'lineardata-tree', text: 'Linear Data Geographical Tree', leaf: true },

                    { id: 'tree-list', text: 'Tree List', leaf: true }
                ]
            },
            {
                text: 'Tabs',
                id: 'tabs',
                expanded: true,
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
            },
            {
                text: 'Windows',
                id: 'windows',
                expanded: true,
                description: 'Windows are specialized panels, intended to be used as application windows. ' +
                             'Windows are floating, resizable, and draggable by default and can add an OS flair' +
                             'to your application.',
                children: [
                    { id: 'basic-window', text: 'Basic Window', leaf: true },
                    { id: 'message-box', text: 'Message Box', leaf: true }
                ]
            },
            {
                text: 'Buttons',
                id: 'buttons',
                expanded: true,
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
            },
            {
                text: 'DataView',
                id: 'data-view',
                expanded: true,
                description: 'Dataviews are an XTemplate based mechanism for displaying data using custom layout' +
                             'templates and formatting. They can connect to any store and display data in any way' +
                             'you see fit.',
                children: [
                    { id: 'dataview-multisort', text: 'Multisort DataView', leaf: true }
                ]
            },
            {
                text: 'Form Fields',
                id: 'form-fields',
                expanded: true,
                description: 'Form Fields offer developers standard HTML form fields with built-in event handling, ' +
                             'rendering, and other common functionality you may require. Variations of fields include: ' +
                             'textfields, textareas, htmleditors, radio groups, checkboxes, and more!',
                children: [
                    { id: 'form-number', text: 'Number Field', leaf: true },
                    { id: 'form-date', text: 'Date/Month Picker', leaf: true },
                    {
                        id: 'combo-boxes',
                        expanded: true,
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
            },
            {
                text: 'Forms',
                id: 'forms',
                expanded: true,
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
            },
            {
                text: 'Toolbars',
                id: 'toolbars',
                expanded: true,
                description: 'Toolbars are easily customizable components that give developers a simple way to display ' +
                             'a variety of user interfaces.',
                children: [
                    { id: 'basic-toolbar', text: 'Basic Toolbar', leaf: true },
                    { id: 'docked-toolbars', text: 'Docked Toolbar', leaf: true },
                    { id: 'breadcrumb-toolbar', text: 'Breadcrumb Toolbar', leaf: true },
                    { id: 'toolbar-overflow', text: 'Toolbar Overflow', leaf: true }
                ]
            },
            {
                text: 'Layouts',
                id: 'layouts',
                expanded: true,
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
            },
            {
                text: 'Drag & Drop',
                id: 'drag-drop',
                expanded: true,
                description: 'Drag and Drop functionality gives developers the ability to create interesting ' +
                             'and useful interfaces for their users.',
                children: [
                    { id: 'dd-field-to-grid', text: 'Field to Grid', leaf: true },
                    { id: 'dd-grid-to-form', text: 'Grid to Form', leaf: true },
                    { id: 'dd-grid-to-grid', text: 'Grid to Grid', leaf: true }
                ]
            },
            {
                text: 'Ext Direct',
                id: 'direct',
                expanded: true,
                description: 'Ext Direct streamlines communication between the client and server by providing a single ' +
                             'interface that reduces much of the common code required to validate and handle data.',
                children: [
                    { id: 'direct-grid', text: 'Grid with Direct store', leaf: true },
                    { id: 'direct-tree', text: 'Tree with dynamic nodes', leaf: true },
                    { id: 'direct-form', text: 'Form load and submit actions', leaf: true },
                    { id: 'direct-generic', text: 'Generic remoting and polling', leaf: true },
                    { id: 'direct-named', text: 'Custom form processing', leaf: true }
                ]
            },
            {
                text: 'Enterprise',
                id: 'enterprise',
                description: 'Our Enterprise tools offer developers the ability to easily utilize data interfaces such' +
                             'as SOAP and AMF. These enterprise tools are available via our Sencha Complete package.',
                expanded: true,
                children: [
                    { id: 'amf-grid', text: 'AMF Grid', leaf: true },
                    { id: 'soap-grid', text: 'Soap Grid', leaf: true }
                ]
            }
        ]);
    }
});
