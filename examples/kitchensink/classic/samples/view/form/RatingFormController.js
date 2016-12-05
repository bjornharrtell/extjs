Ext.define('KitchenSink.view.form.RatingFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-rating',

    onKeyPlus: function () {
        this.adjustRating(1);
    },

    onKeyMinus: function () {
        this.adjustRating(-1);
    },

    adjustRating: function (delta) {
        var employeeGrid = this.lookup('employeeGrid'),
            selection = employeeGrid.getSelection(),
            rating;

        selection = selection && selection.length === 1 && selection[0];
        if (selection) {
            rating = selection.get('ratingThisYear');
            rating += delta;
            rating = Math.max(0, Math.min(5, rating)); // keep in 0-5
            selection.set('ratingThisYear', rating);
        }
    }
});
