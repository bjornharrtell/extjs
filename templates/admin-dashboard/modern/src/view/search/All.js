Ext.define('Admin.view.search.All', {
    extend: 'Ext.dataview.DataView',
    xtype: 'allresults',

    cls: 'search-all',

    selectedCls: 'search-result-item-selected',

    itemTpl: '<div class="search-result-item">' +
        '<div class="list-cls">{title}</div>'+
        '<div><a href="#">{url}</a></div>'+
        '<div>{content}</div>'+
        '<tpl for="attachments"> '+
            '<img class="search-result-attachment" src="{url}" alt="{title}">' +
        '</tpl>'+
    '</div>'
});
