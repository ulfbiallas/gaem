define("ScoreCalculator", function() {
  function ScoreCalculator() {
  };

  ScoreCalculator.prototype.setSong = function(song, currentTrack) {
    this.song = song;
    this.currentTrack = currentTrack;
  };

  ScoreCalculator.prototype.calculate = function(keyState) {
    if (keyState[0] === undefined) {
      return 0;
    }

    var score = -1;

    this.currentTrack.some(function(note) {
      var beginGap = note.start - 100;
      var endGap = note.start + 100;

      if (this.song.getCurrentTime() > endGap) {
        return false;
      }

      if (keyState[0].start > beginGap && keyState[0].start < endGap) {
        score = 10;

        var minDuration = note.duration - 50;
        var maxDuration = note.duration + 50;
        if (keyState[0].duration < minDuration && keyState[0].duration > maxDuration) {
          score += 10;
        }
        return true;
      }
    }.bind(this));

    return score;
  };

  return ScoreCalculator;
});
