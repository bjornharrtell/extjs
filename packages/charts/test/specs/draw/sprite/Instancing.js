describe("Ext.draw.sprite.Instancing", function () {
    describe("'template' config", function () {
        it("should set the template's parent to the instancing sprite", function () {
            var template = new Ext.draw.sprite.Rect(),
                instancing = new Ext.draw.sprite.Instancing({
                    template: template
                });

            expect(template.getParent()).toBe(instancing);

            instancing.destroy();
        });

        it("should destroy the template when destroyed", function () {
            var template = new Ext.draw.sprite.Rect(),
                instancing = new Ext.draw.sprite.Instancing({
                    template: template
                });

            instancing.destroy();

            expect(instancing.isDestroyed).toBe(true);
        });
    });

    describe("hitTest", function () {
        var sprite, instancingSprite, surface, container;

        beforeEach(function () {
            container = new Ext.draw.Container();
            surface = new Ext.draw.Surface();
            sprite = new Ext.draw.sprite.Circle({
                hidden: false,
                globalAlpha: 1,
                fillOpacity: 1,
                strokeOpacity: 1,
                fillStyle: 'red',
                strokeStyle: 'red'
            });
            instancingSprite = new Ext.draw.sprite.Instancing({
                template: sprite
            });
            surface.add(instancingSprite);
            container.add(surface);
        });

        afterEach(function () {
            Ext.destroy(sprite, instancingSprite, surface, container);
        });

        it("should return an object with the 'sprite' property set to the instancing sprite, " +
            "'template' property set to the instancing template, " +
            "'instance' property set to the attributes of the instance, " +
            "'index' property set to the index of the instance, " +
            "and 'isInstance' property set to true", function () {
            instancingSprite.createInstance({
                r: 50,
                cx: 300,
                cy: 300
            });
            instancingSprite.createInstance({
                r: 100,
                cx: 100,
                cy: 100
            });
            var result = instancingSprite.hitTest([90, 90]);
            expect(result.isInstance).toBe(true);
            expect(result.instance).toBe(instancingSprite.get(1));
            expect(result.index).toBe(1);
            expect(result.template).toBe(sprite);
            expect(result.sprite).toBe(instancingSprite);
        });

        it("should return null for hidden instances", function () {
            instancingSprite.createInstance({
                r: 100,
                cx: 100,
                cy: 100,
                hidden: true
            });
            var result = instancingSprite.hitTest([90, 90]);
            expect(result).toBe(null);
        });

    });
});