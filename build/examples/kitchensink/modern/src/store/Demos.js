Ext.define('KitchenSink.store.Demos', {
    alias: 'store.Demos',
    extend: 'Ext.data.TreeStore',
    requires: ['KitchenSink.model.Demo'],

    config: {
        model: 'KitchenSink.model.Demo',
        defaultRootProperty: 'items',
        root: {
            id: 'root',
            text: 'Kitchen Sink',
            items: [{
                text: 'User Interface',
                id: 'ui',
                cls: 'launchscreen',
                items: [{
                    text: 'Grid/Tree',
                    leaf: false,
                    id: 'grid',
                    items: [{
                        text: 'Big Data',
                        leaf: true,
                        view: 'grid.BigData',
                        id: 'grid-bigdata'
                    }, {
                        text: 'Tree',
                        leaf: true,
                        view: 'grid.TreeList',
                        id: 'tree-list'
                    }]
                }, {
                    text: 'Buttons',
                    leaf: true,
                    id: 'buttons'
                }, {
                    text: 'Forms',
                    leaf: false,
                    id: 'forms',
                    items: [{
                        text: 'Form Panel',
                        leaf: true,
                        view: 'FormPanel',
                        id: 'formpanel'
                    }, {
                        text: 'Sliders',
                        leaf: true,
                        view: 'Sliders',
                        id: 'sliders'
                    }, {
                        text: 'Toolbar Inputs',
                        leaf: true,
                        view: 'ToolbarInput',
                        id: 'toolbarinput'
                    }, {
                        text: 'PlaceHolderLabel',
                        leaf: true,
                        view: 'PlaceHolderLabel',
                        id: 'placeholderlabel'
                    }]
                }, {
                    text: 'DataViews',
                    leaf: false,
                    id: 'dataviews',
                    items: [{
                        text: 'Basic',
                        leaf: true,
                        view: 'BasicDataView',
                        id: 'basicdataview'
                    }, {
                        text: 'Horizontal',
                        leaf: true,
                        view: 'HorizontalDataView',
                        id: 'horizontaldataview'
                    }, {
                        text: 'Inline',
                        leaf: true,
                        view: 'InlineDataView',
                        id: 'inlinedataview'
                    }]
                }, {
                    text: 'Lists',
                    leaf: false,
                    id: 'lists',
                    items: [{
                        text: 'Basic',
                        leaf: true,
                        view: 'BasicList',
                        id: 'basiclist'
                    }, {
                        text: 'Grouped',
                        leaf: true,
                        view: 'GroupedList',
                        id: 'groupedlist'
                    }, {
                        text: 'Disclosure',
                        leaf: true,
                        view: 'DisclosureList',
                        id: 'disclosurelist'
                    }]
                }, {
                    text: 'Nested List',
                    view: 'NestedList',
                    leaf: true,
                    id: 'nestedlist'
                }, {
                    text: 'Icons',
                    leaf: true,
                    id: 'icons'
                }, {
                    text: 'Toolbars',
                    leaf: true,
                    id: 'toolbars'
                }, {
                    text: 'Carousel',
                    leaf: true,
                    id: 'carousel'
                }, {
                    text: 'Tabs',
                    leaf: true,
                    id: 'tabs'
                }, {
                    text: 'Bottom Tabs',
                    view: 'BottomTabs',
                    leaf: true,
                    id: 'bottom-tabs'
                }, {
                    text: 'Overlays',
                    leaf: true,
                    id: 'overlays'
                }, {
                    text: 'Menus',
                    leaf: true,
                    id: 'menus'
                }]
            }, {
                text: 'Data Binding',
                id: 'databinding',
                items: [{
                    text: 'Simple',
                    leaf: true,
                    id: 'binding-simple',
                    view: 'binding.Simple'
                }, {
                    text: 'Two Way',
                    leaf: true,
                    id: 'binding-twoway',
                    view: 'binding.TwoWay'
                }, {
                    text: 'Formulas',
                    leaf: true,
                    id: 'binding-formula',
                    view: 'binding.Formula'
                }, {
                    text: 'Two Way Formulas',
                    leaf: true,
                    id: 'binding-twowayformula',
                    view: 'binding.TwoWayFormula'
                }, {
                    text: 'Chained Select',
                    leaf: true,
                    id: 'binding-chainedselect',
                    view: 'binding.ChainedSelect'
                }, {
                    text: 'Component State',
                    leaf: true,
                    id: 'binding-componentstate',
                    view: 'binding.ComponentState'
                }, {
                    text: 'Selection',
                    leaf: true,
                    id: 'binding-selection',
                    view: 'binding.Selection'
                }, {
                    text: 'Chained Stores',
                    leaf: true,
                    id: 'binding-chainedstores',
                    view: 'binding.ChainedStore'
                }, {
                    text: 'Form',
                    leaf: true,
                    id: 'binding-form',
                    view: 'binding.Form'
                }, {
                    text: 'Associations',
                    leaf: true,
                    id: 'binding-assocations',
                    view: 'binding.Association'
                }]
            }, {
                text: 'Animations',
                id: 'animations',
                items: [{
                    text: 'Slide',
                    id: 'Slide',
                    items: [{
                        text: 'Slide Left',
                        id: 'SlideLeft',
                        view: 'SlideLeft',
                        animation: {
                            type: 'slide'
                        },
                        leaf: true
                    }, {
                        text: 'Slide Right',
                        id: 'SlideRight',
                        view: 'SlideRight',
                        animation: {
                            type: 'slide',
                            direction: 'right'
                        },
                        leaf: true
                    }, {
                        text: 'Slide Up',
                        id: 'SlideUp',
                        view: 'SlideUp',
                        animation: {
                            type: 'slide',
                            direction: 'up'
                        },
                        leaf: true
                    }, {
                        text: 'Slide Down',
                        id: 'SlideDown',
                        view: 'SlideDown',
                        animation: {
                            type: 'slide',
                            direction: 'down'
                        },
                        leaf: true
                    }]
                }, {
                    text: 'Fade',
                    id: 'Fade',
                    animation: {
                        type: 'fade',
                        duration: 500
                    },
                    leaf: true
                }, {
                    text: 'Cover',
                    id: 'Cover',
                    items: [{
                        text: 'Cover Left',
                        view: 'CoverLeft',
                        id: 'CoverLeft',
                        animation: {
                            type: 'cover'
                        },
                        leaf: true
                    }, {
                        text: 'Cover Right',
                        id: 'CoverRight',
                        view: 'CoverRight',
                        animation: {
                            type: 'cover',
                            direction: 'right'
                        },
                        leaf: true
                    }, {
                        text: 'Cover Up',
                        view: 'CoverUp',
                        id: 'CoverUp',
                        animation: {
                            type: 'cover',
                            direction: 'up'
                        },
                        leaf: true
                    }, {
                        text: 'Cover Down',
                        id: 'CoverDown',
                        view: 'CoverDown',
                        animation: {
                            type: 'cover',
                            direction: 'down'
                        },
                        leaf: true
                    }]
                }, {
                    text: 'Reveal',
                    id: 'Reveal',
                    items: [{
                        text: 'Reveal Left',
                        id: 'RevealLeft',
                        view: 'RevealLeft',
                        animation: {
                            type: 'reveal'
                        },
                        leaf: true
                    }, {
                        text: 'Reveal Right',
                        id: 'RevealRight',
                        view: 'RevealRight',
                        animation: {
                            direction: 'right',
                            type: 'reveal'
                        },
                        leaf: true
                    }, {
                        text: 'Reveal Up',
                        id: 'RevealUp',
                        view: 'RevealUp',
                        animation: {
                            direction: 'up',
                            type: 'reveal'
                        },
                        leaf: true
                    }, {
                        text: 'Reveal Down',
                        id: 'RevealDown',
                        view: 'RevealDown',
                        animation: {
                            direction: 'down',
                            type: 'reveal'
                        },
                        leaf: true
                    }]
                }, {
                    text: 'Pop',
                    id: 'Pop',
                    animation: {
                        type: 'pop'
                    },
                    leaf: true
                }, {
                    text: 'Flip',
                    id: 'Flip',
                    animation: {
                        type: 'flip'
                    },
                    leaf: true
                }]
            }, {
                text: 'Touch Events',
                id: 'touchevents',
                view: 'TouchEvents',
                leaf: true
            }, {
                text: 'Data',
                id: 'data',
                items: [{
                    text: 'Nested Loading',
                    view: 'NestedLoading',
                    leaf: true,
                    id: 'nestedloading'
                }, {
                    text: 'JSONP',
                    leaf: true,
                    id: 'jsonp'
                }, {
                    text: 'YQL',
                    leaf: true,
                    id: 'yql'
                }, {
                    text: 'Ajax',
                    leaf: true,
                    id: 'ajax'
                }]
            }, {
                text: 'Media',
                id: 'media',
                items: [{
                    text: 'Video',
                    leaf: true,
                    id: 'video'
                }, {
                    text: 'Audio',
                    leaf: true,
                    id: 'audio'
                }]
            }, {
                text: 'Themes',
                id: 'theme',
                items: [{
                    text: 'Auto Detect',
                    leaf: true,
                    id: 'autotheme',
                    profileName: ''
                //}, {
                //    text: 'BlackBerry 10',
                //    leaf: true,
                //    id: 'bbtheme',
                //    profileName: 'blackberry'
                }, {
                    text: 'Cupertino',
                    view: 'ThemeCupertino',
                    leaf: true,
                    id: 'cupertinotheme',
                    profileName: 'cupertino'
                }, {
                    text: 'Mountain View',
                    leaf: true,
                    id: 'mountainviewtheme',
                    profileName: 'mountainview'
                }, {
                    text: 'Modern Neptune',
                    leaf: true,
                    id: 'modernneptunetheme',
                    profileName: 'modern-neptune'
                }, {
                    text: 'Modern Triton',
                    leaf: true,
                    id: 'moderntritontheme',
                    profileName: 'modern-triton'
                }, {
                    text: 'Windows',
                    leaf: true,
                    id: 'windowstheme',
                    profileName: 'windows'
                }, {
                    text: 'Neptune',
                    leaf: true,
                    id: 'neptunetheme',
                    profileName: 'neptune'
                }, {
                    text: 'Neptune Touch',
                    leaf: true,
                    id: 'neptunetouchtheme',
                    profileName: 'neptune-touch'
                }, {
                    text: 'Crisp',
                    leaf: true,
                    id: 'crisptheme',
                    profileName: 'crisp'
                }, {
                    text: 'Crisp Touch',
                    leaf: true,
                    id: 'crisptouchtheme',
                    profileName: 'crisp-touch'
                }, {
                    text: 'Classic',
                    leaf: true,
                    id: 'classictheme',
                    profileName: 'classic'
                }, {
                    text: 'Gray',
                    leaf: true,
                    id: 'graytheme',
                    profileName: 'gray'
                }]
            }, {
                text: 'Graphics',
                id: 'graphics',
                items: [{
                    text: 'Cartesian Charts',
                    id: 'CartesianChart',
                    items: [{
                        text: 'Column Chart',
                        view: 'chart.Column',
                        leaf: true,
                        id: 'chart-column',
                        limit: 1
                    }, {
                        text: 'Area Chart',
                        view: 'chart.Area',
                        leaf: true,
                        id: 'chart-area',
                        limit: 1
                    }, {
                        text: 'Line Chart (zoomable)',
                        view: 'chart.Line',
                        leaf: true,
                        id: 'chart-line',
                        limit: 1
                    }, {
                        text: 'Line Chart (with icons)',
                        view: 'chart.LineWithMarker',
                        leaf: true,
                        id: 'chart-linewithmarker',
                        limit: 1
                    }, {
                        text: 'Line Chart (with renderer)',
                        view: 'chart.LineWithRenderer',
                        leaf: true,
                        id: 'chart-linewithrenderer',
                        limit: 1
                    }, {
                        text: 'Column Chart (with renderer)',
                        view: 'chart.ColumnWithRenderer',
                        leaf: true,
                        id: 'chart-columnwithrenderer',
                        limit: 1
                    }, {
                        text: 'Bar Chart',
                        view: 'chart.Bar',
                        leaf: true,
                        id: 'chart-bar',
                        limit: 1
                    }, {
                        text: 'Column Chart (stacked)',
                        view: 'chart.ColumnStacked',
                        leaf: true,
                        id: 'chart-columnstacked',
                        limit: 1
                    }, {
                        text: 'Column Chart (3D)',
                        view: 'chart.Column3D',
                        leaf: true,
                        id: 'chart-column3d',
                        limit: 1
                    }, {
                        text: 'Scatter Chart',
                        view: 'chart.Scatter',
                        leaf: true,
                        id: 'chart-scatter',
                        limit: 1
                    }, {
                        text: 'Candlestick Chart',
                        view: 'chart.Candlestick',
                        leaf: true,
                        id: 'chart-candlestick',
                        limit: 1
                    }, {
                        text: 'OHLC Chart',
                        view: 'chart.OHLC',
                        leaf: true,
                        id: 'chart-ohlc',
                        limit: 1
                    }, {
                        text: 'Plot Chart',
                        view: 'chart.Plot',
                        leaf: true,
                        id: 'chart-plot',
                        limit: 1
                    }, {
                        text: 'Bubble Chart',
                        view: 'chart.Bubble',
                        leaf: true,
                        id: 'chart-bubble',
                        limit: 1
                    }]
                }, {
                    text: 'Polar Charts',
                    id: 'PolarChart',
                    items: [{
                        text: 'Pie Chart',
                        view: 'chart.Pie',
                        leaf: true,
                        id: 'chart-pie',
                        limit: 1
                    }, {
                        text: 'Pie Chart (3D)',
                        view: 'chart.Pie3D',
                        leaf: true,
                        id: 'chart-pie3d',
                        limit: 1
                    }, {
                        text: 'Radar Chart',
                        view: 'chart.Radar',
                        leaf: true,
                        id: 'chart-radar',
                        limit: 1
                    }, {
                        text: 'Gauge Chart',
                        view: 'chart.Gauge',
                        leaf: true,
                        id: 'chart-gauge',
                        limit: 1
                    }]
                }, {
                    text: 'Draw Component',
                    id: 'Draw',
                    items: [{
                        text: 'Touch Paint',
                        view: 'FreeDraw',
                        leaf: true,
                        id: 'FreeDraw',
                        limit: 1
                    }, {
                        text: 'Vector Icons',
                        view: 'VectorIcons',
                        leaf: true,
                        id: 'VectorIcons',
                        limit: 1
                    }]
                }]
            } , {
                text: 'Enterprise',
                id: 'enterprise',
                items: [
                    {
                        text: 'AMF0 format',
                        view: 'AMF0',
                        leaf: true,
                        id: 'amf-zero'
                    },{
                        text: 'AMF3 format',
                        view: 'AMF3',
                        leaf: true,
                        id: 'amf-three'
                    }, {
                        text: 'SOAP',
                        leaf: true,
                        id: 'soap'
                    }
                ]
            }]
        }
    }
});
