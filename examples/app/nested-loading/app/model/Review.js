/**
 * Model for a books review.
 */
Ext.define('Books.model.Review', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],

    fields: [
        'product_id',
        'author',
        'rating',
        'date',
        'title',
        'comment'
    ],
    belongsTo: 'Books.model.Book'
});
