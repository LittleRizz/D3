// Initialize Game Container
var canvasSize = {};
canvasSize.x = 800;
canvasSize.y = 500;
 
 
var currentScore = 0;
var highScore = 0;

var speed = 2000;

var gameCanvas= d3.select(".gameCanvas")
	.attr('width', canvasSize.x)
	.attr('height', canvasSize.y);     	

// Here is where my hero goes.
var Hero = d3.select(".hero")
		.attr("cx", canvasSize.x / 2)
		.attr("cy", canvasSize.y / 2);

// Setting up drag behavior
var drag = d3.behavior.drag()  
             .on('drag', function(){
             	d3.select(this)
             		.attr("cy", d3.event.sourceEvent.pageY-91)
             		.attr("cx", d3.event.sourceEvent.pageX-6)
             }); 

// Setting a listener
d3.select(".hero").call(drag);



// Special Random Function! Hooray!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//ENEMIES:

//array to hold coordinate values for our enemy dots
var enemies = [];

//will push random coordinates into our enemies array
function createEnemies(){
	for (var i = 0; i < 20; i++) {
		enemies.push({
			"x": getRandomInt(10, 790),
			"y": getRandomInt(10, 490),
			"id": i
		})
	}; return enemies;
};

//Creates our enemies
function enemyUpdate(enemies){
	gameCanvas.selectAll(".enemy")
		.data(enemies, function(d){ return d.id })
		.enter()
		.append("circle")
			.attr("r", 10)
			.attr("cy", function(d){ return d.y})
			.attr("cx", function(d){ return d.x})
			.classed('enemy', true);
};

//function to get new values (and sizes) of circles
function getToDaChoppa() {
	// console.log("get to the choppa!!");
	gameCanvas.selectAll(".enemy")
	.transition()
		.duration([speed])
			.attr("cy", function(){return getRandomInt(10, 490)})
			.attr("cx", function() {return getRandomInt(10, 790)})
			.attr("r", function() {return getRandomInt(2, 20)});

 };

//This badboy is gonna make things work.
 var gametime = function(){
 	window.setInterval(getToDaChoppa, speed);
 };

var collisionCheck = function(){
	var enemyList = d3.select('.gameCanvas').selectAll('.enemy');
	// console.log(enemyList);
	enemyList.each(function(a, b){
		// console.log(a, b);
		var enemyR = parseFloat(d3.select(this).attr('r'));
		var enemyX = parseFloat(d3.select(this).attr('cx'));
		var enemyY = parseFloat(d3.select(this).attr('cy'));
		var heroX = parseFloat(d3.select('.hero').attr('cx'));
		var heroR = parseFloat(d3.select('.hero').attr('r'));
		var heroY = parseFloat(d3.select('.hero').attr('cy'));
		// console.log(heroR, heroX, heroY);
		var totalDistance = heroR + enemyR;

		var roughDistanceX = Math.sqrt(Math.pow(heroX, 2)) - Math.sqrt(Math.pow(enemyX,2));
		var finalDistanceX = Math.sqrt(Math.pow(roughDistanceX, 2));

		var roughDistanceY = Math.sqrt(Math.pow(heroY, 2)) - Math.sqrt(Math.pow(enemyY,2));
		var finalDistanceY = Math.sqrt(Math.pow(roughDistanceY, 2));

		if (finalDistanceX <= totalDistance && finalDistanceY <=totalDistance){
			d3.select('.current span').text('0');
			currentScore = 0;
		};
		// console.log(totalDistance, finalDistanceX, finalDistanceY);
			
		
	});
};

var updateScore = function(){
	var NewCurrentScore = currentScore + 25;
	console.log(NewCurrentScore);
	d3.select('.current span').html(NewCurrentScore);
	d3.select('.high span').html(highScore);
	currentScore = NewCurrentScore;
	console.log("current Score:", currentScore)
	if (currentScore >= highScore){
		highScore = currentScore;
		};
	};

var BestPorkchopSandwichEver = function(){
	window.setInterval(updateScore, 100);
};

var checkInterval = function(){
	window.setInterval(collisionCheck, 100);
};
//update enemy location
//retrieve all current enemy data
//make circles for each enemy
//update position

//COLLISIONS:

//ENEMY DATA ARRAY:
//create the enemy data array
//loop through number of enemies
//assign id and a random position
//returns array of enemy objects


//HERO DRAG FUNCTION

 //Here is our test shit
enemyUpdate(createEnemies);
gametime();
checkInterval();
BestPorkchopSandwichEver();


//ENEMY UPDATER

//want to set gravity centered on player
// want objects to collide with each other as well
