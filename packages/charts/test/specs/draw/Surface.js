describe('Ext.draw.Surface', function () {

    describe('add', function () {
        it("should not add the same sprite to the surface twice", function () {
            var surface = new Ext.draw.Surface({}),
                sprite = new Ext.draw.sprite.Rect({});

            surface.add(sprite);
            surface.add(sprite);

            expect(surface.getItems().length).toEqual(1);
            surface.removeAll(true);

            surface.add([sprite, sprite]);
            expect(surface.getItems().length).toEqual(1);
            surface.destroy();
        });
    });

    describe('get', function () {
        var surface, result;

        beforeEach(function () {
            surface = new Ext.draw.Surface({
                items: [
                    {
                        type: 'rect',
                        id: 'sprite1'
                    },
                    {
                        type: 'text',
                        id: 'sprite2'
                    }
                ]
            });
        });

        afterEach(function () {
            surface.destroy();
        })

        it("should be able to get a sprite by id", function () {
            result = surface.get('sprite1');
            expect(result.isSprite).toBe(true);
            expect(result.type).toBe('rect');

            result = surface.get('sprite2');
            expect(result.isSprite).toBe(true);
            expect(result.type).toBe('text');
        });

        it("should be able to get a sprite by index", function () {
            result = surface.get(0);
            expect(result.isSprite).toBe(true);
            expect(result.type).toBe('rect');

            result = surface.get(1);
            expect(result.isSprite).toBe(true);
            expect(result.type).toBe('text');
        });
    });

    describe('remove', function () {
        it("should be able to remove the sprite (instance or id), should return removed sprite", function () {
            var givenId = 'testing',
                sprite = new Ext.draw.sprite.Rect({}),
                spriteId = new Ext.draw.sprite.Text({id: givenId}),
                surface = new Ext.draw.Surface({}),
                result, id;

            surface.add(sprite, spriteId);
            expect(surface.getItems().length).toBe(2);

            id = sprite.getId();
            result = surface.remove(sprite);
            expect(result).toEqual(sprite);
            expect(sprite.isDestroyed).toBe(undefined);
            expect(surface.getItems().length).toBe(1);
            expect(surface.get(id)).toBe(undefined);

            result = surface.remove(givenId);
            expect(result).toEqual(spriteId);
            expect(spriteId.isDestroyed).toBe(undefined);
            expect(surface.getItems().length).toBe(0);
            expect(surface.get(givenId)).toBe(undefined);

            surface.destroy();
            sprite.destroy();
            spriteId.destroy();
        });

        it("should be able to destroy the sprite (instance or id) in the process, should return destroyed sprite", function () {
            var sprite = new Ext.draw.sprite.Rect({}),
                spriteId = new Ext.draw.sprite.Text({id: 'testing'}),
                surface = new Ext.draw.Surface({}),
                result;

            surface.add(sprite, spriteId);
            expect(surface.getItems().length).toBe(2);

            result = surface.remove(sprite, true);
            expect(result).toEqual(sprite);
            expect(result.isDestroyed).toBe(true);
            expect(surface.getItems().length).toBe(1);

            result = surface.remove('testing', true);
            expect(result).toEqual(spriteId);
            expect(result.isDestroyed).toBe(true);
            expect(surface.getItems().length).toBe(0);

            surface.destroy();
        });

        it("should return null if not given a sprite", function () {
            var surface = new Ext.draw.Surface({});

            function isNull(value) {
                return (null === surface.remove(value)) && (null === surface.remove(value, true));
            }

            expect(isNull(0)).toBe(true);
            expect(isNull(5)).toBe(true);
            expect(isNull(true)).toBe(true);
            expect(isNull(false)).toBe(true);
            expect(isNull(undefined)).toBe(true);
            expect(isNull(null)).toBe(true);
            expect(isNull('hello')).toBe(true);
            expect(isNull('')).toBe(true);
            expect(isNull({})).toBe(true);
            expect(isNull([])).toBe(true);

            surface.destroy();
        });

        it("if passed an already destroyed sprite, should return it without doing anything", function () {
            var deadSprite = new Ext.draw.sprite.Rect({}),
                surface = new Ext.draw.Surface({}),
                result;

            deadSprite.destroy();

            result = surface.remove(deadSprite);
            expect(result).toEqual(deadSprite);

            result = surface.remove(deadSprite, true);
            expect(result).toEqual(deadSprite);

            surface.destroy();
        });

        it("should be able to destroy (but not remove!) a sprite that belongs to another or no surface", function () {
            var surface1 = new Ext.draw.Surface({}),
                surface2 = new Ext.draw.Surface({}),
                sprite1 = new Ext.draw.sprite.Rect({}),
                sprite = new Ext.draw.sprite.Text({}),
                result;

            surface1.add(sprite1);

            result = surface2.remove(sprite1);
            expect(result).toBe(sprite1);
            expect(surface1.getItems()[0]).toEqual(sprite1);

            result = surface2.remove(sprite1, true);
            expect(result).toEqual(sprite1);
            expect(result.isDestroyed).toBe(true);
            expect(surface1.getItems().length).toBe(0);

            result = surface2.remove(sprite);
            expect(result).toEqual(sprite);
            expect(result.isDestroyed).toBe(undefined);

            result = surface2.remove(sprite, true);
            expect(result).toEqual(sprite);
            expect(result.isDestroyed).toBe(true);

            surface1.destroy();
            surface2.destroy();
        });
    });

    describe('destroy', function () {
        it("should fire the 'destroy' event", function () {
            var surface = new Ext.draw.Surface,
                isFired;

            surface.on('destroy', function () {
                isFired = true;
            });
            surface.destroy();

            expect(isFired).toBe(true);
        });
    });

});