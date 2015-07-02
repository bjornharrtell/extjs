describe('Ext.draw.sprite.Sprite', function () {

    describe('remove', function () {
        it("should remove itself from the surface, returning itself or null (if already removed)", function () {
            var surface = new Ext.draw.Surface({}),
                sprite = new Ext.draw.sprite.Rect({}),
                id = sprite.getId(),
                result;

            surface.add(sprite);
            result = sprite.remove();

            expect(surface.getItems().length).toBe(0);
            expect(surface.get(id)).toBe(undefined);
            expect(result).toEqual(sprite);

            result = sprite.remove(); // sprite with no surface, expect not to throw
            expect(result).toBe(null);

            sprite.destroy();
            surface.destroy();
        });
    });

    describe('destroy', function () {
        it("should remove itself from the surface", function () {
            var surface = new Ext.draw.Surface({}),
                sprite = new Ext.draw.sprite.Rect({}),
                id = sprite.getId();

            surface.add(sprite);
            sprite.destroy();

            expect(surface.getItems().length).toBe(0);
            expect(surface.get(id)).toBe(undefined);

            surface.destroy();
        });
    });

});