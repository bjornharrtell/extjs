describe('Ext.draw.sprite.Composite', function () {

    var proto = Ext.draw.sprite.Text.prototype;

    describe('destroy', function () {
        it("should destroy composite's children", function () {
            var composite = new Ext.draw.sprite.Composite({});

            composite.add({
                type: 'text',
                text: 'hello'
            });

            composite.add({
                type: 'rect'
            });

            var child = composite.sprites[1];

            composite.destroy();

            expect(composite.sprites.length).toEqual(0);
            expect(child.isDestroyed).toEqual(true);
        });
    });
});