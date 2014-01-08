Ext.define('KitchenSink.view.Navigation', {
    extend: 'Ext.tree.Panel',
    xtype: 'navigation',
    title: 'Examples',
    rootVisible: false,
    lines: false,
    useArrows: true,
    root: {
        expanded: true,
        children: [
            {
                text: 'Panels',
                expanded: true,
                children: [
                    { id: 'basic-panels', text: 'Basic Panel', leaf: true },
                    { id: 'framed-panels', text: 'Framed Panel', leaf: true }
                ]
            },
            {
                text: 'Grids',
                expanded: true,
                children: [
                    { id: 'array-grid', text: 'Array Grid', leaf: true },
                    { id: 'grouped-grid', text: 'Grouped Grid', leaf: true },
                    { id: 'locking-grid', text: 'Locking Grid', leaf: true },
                    { id: 'grouped-header-grid', text: 'Grouped Header Grid', leaf: true },
                    { id: 'multi-sort-grid', text: 'Multiple Sort Grid', leaf: true },
                    { id: 'progress-bar-pager', text: 'Progress Bar Pager', leaf: true },
                    { id: 'sliding-pager', text: 'Sliding Pager', leaf: true },
                    { id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                    { id: 'property-grid', text: 'Property Grid', leaf: true },
                    { id: 'cell-editing', text: 'Cell Editing', leaf: true },
                    { id: 'row-expander-grid', text: 'Row Expander', leaf: true },
                    { id: 'big-data-grid', text: 'Big Data', leaf: true }
                ]
            },
            {
                text: 'Trees',
                expanded: true,
                children: [
                    { id: 'basic-trees', text: 'Basic Trees', leaf: true },
                    { id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                    { id: 'tree-grid', text: 'Tree Grid', leaf: true },
                    { id: 'tree-two', text: 'Two Trees', leaf: true },
                    { id: 'check-tree', text: 'Check Tree', leaf: true },
                    { id: 'tree-xml', text: 'XML Tree', leaf: true }
                ]
            },
            {
                text: 'Tabs',
                expanded: true,
                children: [
                    { id: 'basic-tabs', text: 'Basic Tabs', leaf: true },
                    { id: 'plain-tabs', text: 'Plain Tabs', leaf: true },
                    { id: 'framed-tabs', text: 'Framed Tabs', leaf: true },
                    { id: 'icon-tabs', text: 'Icon Tabs', leaf: true }
                ]
            },
            {
                text: 'Windows',
                expanded: true,
                children: [
                    { id: 'basic-window', text: 'Basic Window', leaf: true }
                ]
            },
            {
                text: 'Buttons',
                expanded: true,
                children: [
                    { id: 'basic-buttons', text: 'Basic Buttons', leaf: true },
                    { id: 'toggle-buttons', text: 'Toggle Buttons', leaf: true },
                    { id: 'menu-buttons', text: 'Menu Buttons', leaf: true },
                    { id: 'menu-bottom-buttons', text: 'Menu Bottom Buttons', leaf: true },
                    { id: 'split-buttons', text: 'Split Buttons', leaf: true },
                    { id: 'split-bottom-buttons', text: 'Split Bottom Buttons', leaf: true },
                    { id: 'left-text-buttons', text: 'Left Text Buttons', leaf: true },
                    { id: 'right-text-buttons', text: 'Right Text Buttons', leaf: true },
                    { id: 'link-buttons', text: 'Link Buttons', leaf: true }
                ]
            },
            {
                text: 'DataView',
                expanded: true,
                children: [
                    { id: 'dataview-multisort', text: 'Multisort DataView', leaf: true }
                ]
            },
            {
                text: 'Forms',
                expanded: true,
                children: [
                    { id: 'login-form', text: 'Login Form', leaf: true },
                    { id: 'contact-form', text: 'Contact Form', leaf: true },
                    { id: 'register-form', text: 'Register Form', leaf: true  },
                    { id: 'form-number', text: 'Number Field', leaf: true },
                    { id: 'form-checkout', text: 'Checkout Form', leaf: true },
                    { id: 'form-grid', text: 'Form with Grid', leaf: true }
                ]
            },
            {
                text: 'Toolbars',
                expanded: true,
                children: [
                    { id: 'basic-toolbar', text: 'Basic Toolbar', leaf: true },
                    { id: 'docked-toolbars', text: 'Docked Toolbar', leaf: true }
                ]
            },
            {
                text: 'Layout',
                expanded: true,
                children: [
                    { id: 'layout-accordion', text: 'Accordion Layout', leaf: true }
                ]
            },
            {
                text: 'Slider',
                expanded: true,
                children: [
                    { id: 'slider-field', text: 'Slider Field', leaf: true }
                ]
            },
            {
                text: 'Drag & Drop',
                expanded: true,
                children: [
                    { id: 'dd-field-to-grid', text: 'Field to Grid', leaf: true },
                    { id: 'dd-grid-to-form', text: 'Grid to Form', leaf: true },
                    { id: 'dd-grid-to-grid', text: 'Grid to Grid', leaf: true }
                ]
            }
        ]
    }
});