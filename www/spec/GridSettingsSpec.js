describe("Test Grid", function() {
    
    var home;

    beforeEach(function() {
        
        localStorage.removeItem('current_grid');
        
        $("#rows").val('3');
        $("#cols").val('2');
        $("#img").val('img/sample.jpg');
        $("#color_code").val('#FF0000');
        $("#color_code").val('#FF0000');
        $("#color").val('#FF0000');
        //filter: '',
        $("#rotation").val('90');
        
        $("#save_grid").click();
        new app.HomeView();
    });
    
    afterEach(function() {
        
    });

    it("should have 3 rows, 2 columns, an image rotated to 90 degrees, a red color drid.", function() {
        
        var current_grid = JSON.parse(localStorage.getItem('current_grid'));

        expect(current_grid.rows).toEqual("3");
        expect(current_grid.cols).toEqual("2");
        expect(current_grid.img).toEqual('img/sample.jpg');
        expect(current_grid.color).toEqual('#FF0000');
        expect(current_grid.rotation).toEqual('90');
    });
    
    describe("Main view", function() {
        
        it("should have an image element(img/sample.jpg), and grid table(3x2) with default styles.", function() {

            expect($("#active-grid img").prop("src")).toContain('img/sample.jpg');
            expect($("#active-grid table").find("tr:first td").length).toEqual(2);
            expect($("#active-grid table").find("tr").length).toEqual(3);
        });
        
        //TODO: Find a way to test Drag and Pinch Zoom
    });
    
    describe("Grid Settings:", function() {
        
        it("If you press rotate and save, preview should rotate, saved grid have new rotation.", function() {

            $("#btn_rotate_img").click();
            $("#save_grid").click();
            
            var current_grid = JSON.parse(localStorage.getItem('current_grid'));
            
            expect(current_grid.rotation).toEqual('180');
            
            var styles = $("#image_preview").prop("style");console.log(styles);
            expect($("#image_preview").css("background-image")).toContain('img/sample.jpg")');
            expect($("#image_preview").css("transform")).toEqual('matrix(-1, 0, 0, -1, 0, 0)');
        });
        
        //TODO: Finda a way to test Camera, Gallery, Clear.
    });
    
    //TODO: Test Filters
    //describe("Grid Settings:", function() {
        
    //});
});