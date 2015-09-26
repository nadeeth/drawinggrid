describe("Grid", function() {
    
    var home;

    beforeEach(function() {
        
        localStorage.removeItem('current_grid');
        
        $("#rows").val('3');
        $("#cols").val('2');
        $("#img").val('img/sample.jpg');
        $("#color_code").val('#FF0000');
        //filter: '',
        $("#rotation").val('90');
        
        $("#save_grid").click();
        new app.HomeView();
    });
    
    afterEach(function() {
        
    });

    it("This test grid should have 3 rows, 2 columns, an image rotated to 90 degrees, a red color drid", function() {
        
        var current_grid = JSON.parse(localStorage.getItem('current_grid'));

        expect(current_grid.rows).toEqual("3");
        expect(current_grid.cols).toEqual("2");
        expect(current_grid.img).toEqual('img/sample.jpg');
        expect(current_grid.color).toEqual('#FF0000');
        expect(current_grid.rotation).toEqual('90');
    });
    
    
});
  
describe("Player", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
