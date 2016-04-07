Ext.define('KitchenSink.locale.store.Navigation', {
    override: 'KitchenSink.store.Navigation',
    title: 'דוגמאות',
    
    getNavItems: function() {
        return Ext.Object.merge(this.callParent(), [
            {
                text: 'פנלים',
                description: 'פנלים הם מיכל הבסיסי המרכיב את המבנה של רוב היישומים. יש פנלים כותרת ובגוף, והוא יכול להיות מסודר בדרכים שונות באמצעות פריסות.',
                children: [
                    { id: 'basic-panels', text: 'פנל בסיסי', leaf: true },
                    { id: 'framed-panels', text: 'פנל ממוסגר', leaf: true },
                    { id: 'panel-header-position', text: 'מיצוב כותרת', leaf: true }
                ]
            },
            {
                text: 'רשתות',
                children: [
                    { id: 'array-grid', text: 'רשת מערך', leaf: true },
                    { id: 'grouped-grid', text: 'רשת מקובצת ', leaf: true },
                    { id: 'locking-grid', text: 'רשת קפוא', leaf: true },
                    { id: 'grouped-header-grid', text: 'רשת כותרת מקובצים', leaf: true },
                    { id: 'multi-sort-grid', text: 'רשת רבת מיון', leaf: true },
                    { id: 'progress-bar-pager', text: 'סרגל התקדמות עם החלפה', leaf: true },
                    { id: 'sliding-pager', text: 'סרגל התקדמות עם מחוון', leaf: true },
                    { id: 'xml-grid', text: 'רשת ה-XML', leaf: true },
                    {
                        id: 'grid-plugins',
                        expanded: true,
                        text: 'רשת תוספים',
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
                    { id: 'grid-filtering', text: 'סינון רשת', leaf: true },
                    { id: 'reconfigure-grid', text: 'שינוי תצורה של רשתות', leaf: true },
                    { id: 'property-grid', text: 'רשת מאפיינים', leaf: true },
                    { id: 'cell-editing', text: 'עריכה בתוך תאים', leaf: true },
                    { id: 'row-expander-grid', text: 'מרחיב שורות', leaf: true },
                    { id: 'big-data-grid', text: 'נתונים גדולים', leaf: true },
                    { id: 'widget-grid', text: 'רשת יישומון', leaf: true },
                    { id: 'customer-grid', text: 'רשת לקוחות / סדר', leaf: true }
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
                text: 'נתונים מחייבים',
                children: [
                    { id: 'binding-hello-world', text: 'שלום עולם', leaf: true },
                    { id: 'binding-dynamic', text: 'דינמי', leaf: true },
                    { id: 'binding-two-way', text: 'שתי בדרך', leaf: true },
                    { id: 'binding-formulas', text: 'נוסחאות', leaf: true },
                    { id: 'binding-associations', text: 'הִתלַכְּדוּת', leaf: true },
                    { id: 'binding-component-state', text: 'מצב רכיב', leaf: true },
                    { id: 'binding-chained-stores', text: 'שרשור חנויות', leaf: true},
                    { id: 'binding-combo-chaining', text: 'תיבות משולבות משורשרות', leaf: true },
                    { id: 'binding-selection', text: 'מבחר שרשור', leaf: true },
                    { id: 'binding-model-validation', text: 'אימות מודל', leaf: true },
                    { id: 'binding-field-validation', text: 'אימות שדה', leaf: true },
                    { id: 'binding-two-way-formulas', text: 'נוסחאות דו כיוונית', leaf: true },
                    { id: 'binding-slider-form', text: 'שדות מחוון וצורה', leaf: true },
                    { id: 'binding-child-session', text: 'מפגשי ילד מבודדים', leaf: true }
                ]
            },
            {
                text: 'תצוגות עץ',
                children: [
                    { id: 'basic-trees', text: 'תצוגות עץ בסיסיות', leaf: true },
                    { id: 'tree-reorder', text: 'מיון תצוגות עץ', leaf: true },
                    { id: 'tree-grid', text: 'רשת עץ', leaf: true },
                    { id: 'tree-two', text: 'שתי תצוגות עץ', leaf: true },
                    { id: 'check-tree', text: 'תצוגות עץ עם תיבות סימון', leaf: true },
                    { id: 'tree-xml', text: 'XML תצוגות עץ', leaf: true },
                    { id: 'filtered-tree', text: 'עץ מסונן', leaf: true },
                    { id: 'heterogeneous-tree', text: 'עץ הטרוגנית', leaf: true },
                    { id: 'lineardata-tree', text: 'עץ גיאוגרפי ליניארי נתונים', leaf: true }
                ]
            },
            {
                text: 'כרטיסיות',
                children: [
                    { id: 'basic-tabs', text: 'כרטיסיות בסיסיות', leaf: true },
                    { id: 'plain-tabs', text: 'כרטיסיות רגילות', leaf: true },
                    { id: 'framed-tabs', text: 'כרטיסיות ממוסגרות', leaf: true },
                    { id: 'icon-tabs', text: 'כרטיסיות סמלים', leaf: true },
                    { id: 'ajax-tabs', text: 'כרטיסיות אייאקס', leaf: true },
                    { id: 'advanced-tabs', text: 'כרטיסיות מתקדמות', leaf: true },
                    { id: 'navigation-tabs', text: 'כרטיסיות ניווט', leaf: true },
                    { id: 'side-navigation-tabs', text: 'כרטיסיות ניווט צד', leaf: true },
                    { id: 'header-tabs', text: 'כרטיסיות כותרת', leaf: true },
                    { id: 'reorderable-tabs', text: 'סדר כרטיסיות שינוי', leaf: true }
                ]
            },
            {
                text: 'חלונות',
                children: [
                    { id: 'basic-window', text: 'חלון בסיסי', leaf: true },
                    { id: 'message-box', text: 'תיבת הודעה', leaf: true }
                ]
            },
            {
                text: 'לחצנים',
                children: [
                    { id: 'basic-buttons', text: 'לחצנים בסיסיים', leaf: true },
                    { id: 'toggle-buttons', text: 'לחצנים דו-מצבים', leaf: true },
                    { id: 'menu-buttons', text: 'לחצני תפריט', leaf: true },
                    { id: 'menu-bottom-buttons', text: 'לחצני תפריט מתחת', leaf: true },
                    { id: 'split-buttons', text: 'לחצנים מפוצלים', leaf: true },
                    { id: 'split-bottom-buttons', text: 'לחצנים מפוצלים מתחת', leaf: true },
                    { id: 'left-text-buttons', text: 'לחצני טקסט משמאל', leaf: true },
                    { id: 'right-text-buttons', text: 'לחצני טקסט מימין', leaf: true },
                    { id: 'link-buttons', text: 'לחצני קישור', leaf: true },
                    { id: 'segmented-buttons', text: 'לחצנים מפולחים', leaf: true },
                    { id: 'vertical-segmented-buttons', text: 'לחצנים אנכיים מקוטע', leaf: true }
                ]
            },
            {
                text: 'תצוגת נתונים',
                children: [
                    { id: 'dataview-multisort', text: 'תצוגת נתונים רבת מיון', leaf: true }
                ]
            },
            {
                text: 'שדות טופס',
                children: [
                    { id: 'form-number', text: 'מספר שדה', leaf: true },
                    { id: 'form-date', text: 'תאריך / חודש פיקר', leaf: true },
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
                    { id: 'form-fileuploads', text: 'העלאת קבצים', leaf: true },
                    { id: 'form-fieldreplicator', text: 'מעתק שדה', leaf: true },
                    { id: 'form-grid', text: 'טופס עם גריד', leaf: true },
                    { id: 'form-tag', text: 'שדה תג', leaf: true },
                    { id: 'multi-selector', text: 'רב בורר גריד', leaf: true },
                    { id: 'form-fieldtypes', text: 'סוגי שדות', leaf: true},
                    { id: 'form-fieldcontainer', text: 'שדה מכולות', leaf: true},
                    { id: 'form-checkboxgroup', text: 'קבוצות תיבת הסימון', leaf: true },
                    { id: 'form-radiogroup', text: 'קבוצות לחצן אפשרויות', leaf: true },
                    { id: 'slider-field', text: 'מחוון שדה', leaf: true }
                ]
            },
            {
                text: 'טפסים',
                children: [
                    { id: 'form-login', text: 'טופס כניסה', leaf: true },
                    { id: 'form-contact', text: 'בטופס איש הקשר', leaf: true },
                    { id: 'form-register', text: 'טופס הרשמה', leaf: true  },
                    { id: 'form-checkout', text: 'טופס לקופה', leaf: true },
                    { id: 'form-color-picker', text: 'Color Picker', leaf: true},
                    { id: 'form-rating', text: 'Rating Form', leaf: true},
                    { id: 'form-vboxlayout', text: 'VBox פריסה', leaf: true },
                    { id: 'form-hboxlayout', text: 'HBox פריסה', leaf: true },
                    { id: 'form-multicolumn', text: 'טופס טור רב', leaf: true },
                    { id: 'form-xml', text: 'טופס XML', leaf: true },
                    { id: 'form-advtypes', text: 'אישית VType', leaf: true },
                    { id: 'form-customfields', text: 'שדות מותאמים אישית', leaf: true },
                    { id: 'form-forumsearch', text: 'חיפוש בפורום', leaf: true },
                    { id: 'form-customerrors', text: 'טיפול בשגיאות מותאמות אישית', leaf: true }
                ]
            },
            {
                text: 'סרגלי כלים',
                children: [
                    { id: 'basic-toolbar', text: 'סרגל כלים בסיסי', leaf: true },
                    { id: 'docked-toolbars', text: 'סרגל כלים מעוגן', leaf: true },
                    { id: 'breadcrumb-toolbar', text: 'סרגל כלים סימני דרך', leaf: true },
                    { id: 'toolbar-overflow', text: 'Toolbar Overflow', leaf: true }
                ]
            },
            {
                text: 'פריסה',
                children: [
                    { id: 'layout-absolute', text: 'פריסה מוחלטת', leaf: true },
                    { id: 'layout-accordion', text: 'פריסת אקורדיון', leaf: true },
                    { id: 'layout-border', text: 'פריסת גבול', leaf: true },
                    { id: 'layout-card', text: 'פריסת כרטיס', leaf: true },
                    { id: 'layout-cardtabs', text: 'כרטיס (כרטיסיות)', leaf: true },
                    { id: 'layout-center', text: 'מרכז פריסה', leaf: true },
                    { id: 'layout-column', text: 'פריסת עמודה', leaf: true },
                    { id: 'layout-fit', text: 'פריסת Fit', leaf: true },
                    { id: 'layout-horizontal-box', text: 'HBox פריסה', leaf: true },
                    { id: 'layout-table', text: 'פריסת שולחן', leaf: true },
                    { id: 'layout-vertical-box', text: 'VBox פריסה', leaf: true }
                ]
            },
            {
                text: 'גרירה ושחרור',
                children: [
                    { id: 'dd-field-to-grid', text: 'משדה לרשת', leaf: true },
                    { id: 'dd-grid-to-form', text: 'משדה לטופס', leaf: true },
                    { id: 'dd-grid-to-grid', text: 'מרשת לרשת', leaf: true }
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
                text: 'מפעל',
                children: [
                    { id: 'amf-grid', text: 'AMF רשת', leaf: true },
                    { id: 'soap-grid', text: 'רשת SOAP', leaf: true }
                ]
            }
        ]);
    }
});

