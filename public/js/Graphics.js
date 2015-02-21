// drawing the game menu
// drawing the game
// handle changes between game menu and game

define("Graphics", ['Button', 'Song'], function(Button, Song) {

	function Graphics(ctx, keys, width, height) {
		this.ctx = ctx;
		this.keys = keys;
		this.song = new Song();
		this.width = width;
		this.height = height;
		this.buttons = [
			new Button("start", width / 3, height / 3, 200, 75),
			new Button("credits", width / 3, 0.6 * height, 200, 75)
		];
		document.addEventListener("mousedown", this.onMouseDown.bind(this));
	}

	Graphics.prototype.drawGameMenu = function() {
		for(i = this.buttons.length - 1; i >= 0; i--) {
			this.buttons[i].draw(this.ctx);
		}
	};

	Graphics.prototype.drawScore = function(score) {
		console.log(score);
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline = 'top';
		this.ctx.fillText("score: " + score, 10, 10);
	};


	Graphics.prototype.draw = function() {
		var currentTime = this.song.getCurrentTime();
		var tracks = this.song.getTracks();
		var columns = tracks.length;
		var lineY = 400;
		var zoom = 0.1;
		var pxPerMs = 0.2;
		
		var columnColors = [
			{"playing" : "#bb0000", "notplaying" : "#8800000", "highlight" : "#ff0000"},
			{"playing" : "#00bb00", "notplaying" : "#0008800", "highlight" : "#00ff00"},
			{"playing" : "#0000bb", "notplaying" : "#0000088", "highlight" : "#0000ff"},
		]
		
		for (var i=0; i<columns; ++i) {
			for (j=0; j<tracks[i].length; ++j) {
				var note = tracks[i][j];
				var start = note.start;
				
				//this.ctx.beginPath();
				if(currentTime >= start && currentTime <= start + note.duration) {
					this.ctx.fillStyle=columnColors[i].playing;
					this.ctx.shadowColor = columnColors[i].highlight;
					this.ctx.shadowBlur = 15;
				} else {
					this.ctx.fillStyle=columnColors[i].notplaying;
					this.ctx.shadowBlur = 0;
				}
			
				msLeftToBePlayed = Math.round(start-currentTime);
				rectY = lineY - (msLeftToBePlayed+note.duration)*pxPerMs;
			
				this.ctx.fillRect(100+3*100*pxPerMs*i, rectY, 100*pxPerMs, note.duration*pxPerMs);
				//this.ctx.closePath();
				//this.ctx.fill();
			}
		}
		
		this.ctx.beginPath();
		this.ctx.moveTo(0,lineY);
		this.ctx.lineTo(512,lineY);
		this.ctx.stroke();
	};
	

	Graphics.prototype.update = function() {
	};

	Graphics.prototype.onMouseDown = function(event) {
		var x = event.clientX,
		    y = event.clientY;

		for (i = this.buttons.length - 1; i >= 0; i--) {
			if (x >= this.buttons[i].x && x <= this.buttons[i].x + this.buttons[i].width &&
					y >= this.buttons[i].y && y <= this.buttons[i].y + this.buttons[i].height) {
						console.log("Pressed button:", this.buttons[i]);
			}
		}
	};

	return Graphics;
});
