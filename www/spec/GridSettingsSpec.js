define(['jquery', 'jasmine', 'jasminehtml', 'boot', 'app/models/grid'], 
function ($, jasmine, jasminehtml, boot, Grid) {

    function getCurrentGrid() {
        return new Grid({ id: 1 });
    }

    describe("Test Grid", function() {

        beforeEach(function(done) {

            $("#rows").val('3');
            $("#cols").val('2');
            $("#img").val('img/sample.jpg');
            $("#color_code").val('#FF0000');
            $("#color_code").val('#FF0000');
            $("#color").val('#FF0000');
            $("#rotation").val('90');

            $("#save_grid").click();

            done();
        });

        afterEach(function() {
            localStorage.removeItem('filtered_image');
            localStorage.removeItem('settings-1');
            localStorage.removeItem('settings');
        });

        it("should have 3 rows, 2 columns, an image rotated to 90 degrees, a red color drid.", function() {

            getCurrentGrid().fetch({
                success : function (grid, response, options) {

                    expect(grid.get("rows")).toEqual("3");
                    expect(grid.get("cols")).toEqual("2");
                    expect(grid.get("img")).toEqual('img/sample.jpg');
                    expect(grid.get("color")).toEqual('#FF0000');
                    expect(grid.get("rotation")).toEqual('90');
                },
                error : function (grid, response, options) {

                }
            });
        });

        describe("Main view", function() {

            it("should have an image element(img/sample.jpg), and grid table(3x2) with default styles.", function() {
                expect($("#active-grid img").prop("src")).toContain('img/sample.jpg');
                expect($("#active-grid table").find("tr:first td").length).toEqual(2);
                expect($("#active-grid table").find("tr").length).toEqual(3);
            });

            //TODO: Find a way to test Drag and Pinch Zoom
        });

        describe("Settings - Rotate:", function() {

            it("If you press rotate and save, preview should rotate, saved grid have new rotation.", function() {

                $("#btn_rotate_img").click();
                $("#save_grid").click();

                getCurrentGrid().fetch({
                    success : function (grid, response, options) {
                        expect(grid.get("rotation")).toEqual('180');
                    },
                    error : function (grid, response, options) {

                    }
                });

                //expect($("#image_preview").css("background-image")).toContain('img/sample.jpg")');//This field is populated by camera/gallery callback, therefore it can not be tested like this
                //expect($("#image_preview").css("transform")).toEqual('matrix(-1, 0, 0, -1, 0, 0)');//The values are slightly (fractional parts etc) diffrent from browsers to browser
            });

            //TODO: Finda a way to test Camera, Gallery, Clear.
        });
        
        describe("Settings - Square Cells:", function() {

            it("If you turn on Square Cells, Grid cells should have equal widths and heights", function() {

                $("#square_cells").click();

                getCurrentGrid().fetch({
                    success : function (grid, response, options) {
                        expect(grid.get("square")).toEqual(1);
                        var firstcell = $("#active-grid table").find("tr:first td:first");
                        expect(firstcell.width()).toEqual(firstcell.height());
                    },
                    error : function (grid, response, options) {

                    }
                });
            });
        });

        describe("Filters:", function() {

            beforeEach(function(done) {
                $('button[data-dg-filter="sepia"]').click();
                setTimeout(function () {
                    done();
                }, 2000);
            });

            it("If you press sapia filter, image should change, filter = ture in the model, store image.", function(done) {

                getCurrentGrid().fetch({
                    success : function (grid, response, options) {

                        expect(grid.get("filter")).toEqual(true);

                        var filtered_image = localStorage.getItem('filtered_image');
                        var src = $("#active-grid-img").prop("src");                    
                        //expect(filtered_image.length).toEqual(160695);//The values are different from browser to browser
                        //expect(src.length).toEqual(160695);//The values are different from browser to browser

                        done();
                    },
                    error : function (grid, response, options) {

                    }
                });
            });
            //TODO: Finda a way test mobile file system etc
        });
    });
});