//declaration of variable
var myGamePiece;
var arrows=[];
var balloons=[];
var staticballoons=[];
var myScore;
var finalScore;
var chances;
var gameover;
var levels;
var ghost;
var lose;
var sound1= new Audio("audio/shoot.wav");
var sound2=new Audio("audio/killing sound.wav");
var sound3= new Audio("audio/game over sound.wav");
var sound4 =new Audio("audio/ho-ho-sound.wav");
//var sound5=new Audio("audio/monster echo.wav");
function startGame() {
	myGamePiece = new component( 80, 100,"images bow/bow3.png",-4, 500 , "image");
	myScore = new component("34px", "serif", "black", 820, 40, "text");
	ghost=new component( 60, 50,"images balloons/ghosty.png",545,10 , "image");
	lose= new component("34px", "serif", "white", 610, 40, "text");
	chances = new component("30px", "sanserif", "white", 665, 40, "text");
	levels = new component("30px", "Righteous", "#80ff00", 250, 40, "text");
	finalScore = new component("40px", "Righteous", "white", 380, 360, "text");
	gameover= new component("45px", "serif", "red", 400, 300, "text");
	myGameArea.start();
    sound5.play();

}

//defining gamearea
var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		
		this. canvas.width=1000;
		this.canvas.height = 700;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo=0;
		this.kill=0;
		this.interval = setInterval(updateGameArea, 20);

		window.addEventListener('keydown', function (e) { myGameArea.key = e.keyCode;})
		window.addEventListener('keyup', function (e) { myGameArea.key =false;})
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	},
	stop : function() {
		clearInterval(this.interval);
	}
}

//defining component
function component(width, height, color1, x, y, type) {
	this.img1 =color1;
	this.type = type;
	this.image = new Image();
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;    
	this.x = x;
	this.y = y; 

	this.update = function() {
		ctx = myGameArea.context;
		if (type == "image") {
			this.image.src = this.img1;
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		}
		else if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle =this.img1;
			ctx.fillText(this.text, this.x, this.y);
		}
		else {
			ctx.fillStyle = color1;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	this.newPos = function() {
		this.x+=this.speedX;
		this.y += this.speedY;

	}

	this.crashWith = function(otherobj) 
	{
		var myleft = this.x;
		var myright = this.x + (this.width-20);
		var mytop = this.y;
		var mybottom = this.y + (this.height-35);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) 
		{
			crash = false;
		}
		return crash;
	}

}
var  time=0,time1=0,run=1,delay=0,arrowspeed=7,run=1,balloonspeed=-2,points=1,balloon_miss=0,lives=8,pos=620,level=1,loss=3;

//update gamearea every 20 milliseconds
function updateGameArea() 
{
	var x,y,ax,ay;

	myGameArea.clear();
	myGamePiece.newPos();       
	myGamePiece.update();
	for(i=0;i<staticballoons.length;i++)
	{
		staticballoons[i].update();
	}
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;

//keys for the shoot ,upward and downward movements
	if (myGameArea.key == 32) 
	{
		//creating arrows for shoot
		if((time>=(delay+13)) || (run==1))
		{
			ax=myGamePiece.x;
			ay=myGamePiece.y;
			sound1.play();
			arrows.push(new component(60,57,"images bow/arrow1.png", ax, ay+25,"image"));
			myGamePiece.img1="images bow/bow1.png";
			run++; 
		}

		delay=time;
	}  

	if (myGameArea.key == 38) {
		if (myGamePiece.y <1)
		{
			myGamePiece.speedY=0;
		}
		else{

			myGamePiece.speedY = -5; }
		}
		if (myGameArea.key == 40) {
			if (myGamePiece.y >= myGameArea.canvas.height -(myGamePiece.height+balloon_miss*80))

			{
				myGamePiece.speedY=0;
			}
			else{

				myGamePiece.speedY = 5; }
			}
			time++;
			time1++;

			if(time1==2100)
			{
				arrowspeed+=1;
				time1=0;
			}  

			if(time==1500)
			{
				balloonspeed+=-1;
				time=0;	
				level++;
				points++;
			}


			for (i = 0; i < arrows.length; i++) {
				{
					arrows[i].x += arrowspeed;
				}  
				arrows[i].update();
			}


			//creating balloons and ranndom places
			if(time==delay+3)
			{
				myGamePiece.img1="images bow/bow3.png";
			}
			myGameArea.frameNo+=1;

			if(myGameArea.frameNo==1||everyinterval(150))
			{
				t=Math.random()*1000;

				while (( t<600)||(t>900)){
					t=Math.random()*1000;

				} 

				y=myGameArea.canvas.height;
				x=t;
				balloons.push(new component(100,80,"images balloons/balloon.png",x,y,"image"));
			}

			for(i=0;i<balloons.length;i++)
			{
				balloons[i].speedY=balloonspeed;
				balloons[i].newPos();
				balloons[i].update();
			}
			for (i = 0; i < balloons.length; i++) 
			{
				for(j = 0; j < arrows.length;j++)
				{
					if (balloons[i].crashWith(arrows[j])) 
					{    

						if(balloons[i].img1=="images balloons/ghosty.png")
						{
							loss--;
							arrows[j].x=1200;   
						}
						else
						{
							sound2.play();
							myGameArea.kill+=points;
							arrows[j].x=1200;
						}
						balloons[i].img1="images balloons/ghosty.png";
						balloons[i].width=60;
						balloons[i].height=60;	

					} 

				}

			}
			for ( i = 0; i < balloons.length; i++) {

				if(balloons[i].img1=="images balloons/balloon.png")
				{
					if(balloons[i].y==-80)
					{
						if(balloon_miss<7)
						{
							sound4.play();
						}
						balloon_miss+=1;

						if(myGamePiece.y>=myGameArea.canvas.height-balloon_miss*100)
						{
							myGamePiece.y=myGameArea.canvas.height-myGamePiece.height-balloon_miss*80;
						}
						staticballoons.push(new component(100,80,"images balloons/balloon.png",-15,pos,"image"));
						pos+=-80
						lives--;
					}
				}

			} 
			if(lives==3)
			{
				chances.img1=" #ff3333";
				chances.width="35px";
				chances.height="Righteous";
			}

			if((balloon_miss==8)||(loss==0))
			{
				sound3.play();
				gameover.text="GAME OVER ";
				gameover.update();
				finalScore.text="FINAL SCORE: " +myGameArea.kill;
				finalScore.update();
				for(i=0;i<2;i++);
					if(i==2)
					{
						myGameArea.stop();
					}
				}
				myScore.text="SCORE: " +myGameArea.kill;
				myScore.update();
				chances.text="LIVES: " +lives;

				chances.update();
				levels.text="LEVEL: " +level;
				levels.update();
				lose.text=":"+ loss;
				lose.update();
				ghost.update();
			}
			function everyinterval(n) {
				if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
				return false;
			}
