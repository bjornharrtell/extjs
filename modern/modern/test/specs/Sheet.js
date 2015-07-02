describe('Ext.Sheet', function() {
    var sheet;

    var createSheet = function(config) {
        sheet = Ext.create('Ext.Sheet', config || {});
    };


    afterEach(function() {
        if (sheet) {
            sheet.destroy();
        }
    });

    describe('deprecated', function() {
        describe("configurations", function() {
            describe("stretchX", function() {
                it("should set the floatable property", function() {
                    createSheet({stretchX: true});

                    expect(sheet.getLeft()).toEqual(0);
                    expect(sheet.getRight()).toEqual(0);
                });
            });

            describe("stretchY", function() {

                it("should set the floatable property", function() {
                    createSheet({stretchY: true});

                    expect(sheet.getTop()).toEqual(0);
                    expect(sheet.getBottom()).toEqual(0);
                });

            });
        });
    });

    describe("configurations", function() {

    });

});
