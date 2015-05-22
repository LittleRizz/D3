// Initialize Game Container
var canvasSize = {};
canvasSize.x = 800;
canvasSize.y = 500;

var speed = 500;

// var dx = d3.event.sourceEvent.pageX;
// var dy = d3.event.sourceEvent.pageY;

var gameCanvas= d3.select(".gameCanvas")
	.attr('width', canvasSize.x)
	.attr('height', canvasSize.y);     	

// Here is where my hero goes.
var Hero = d3.select(".hero")
		.attr("cx", canvasSize.x / 2)
		.attr("cy", canvasSize.y / 2);
//Ohhhh it's drag time, baby.  You ready?  You ready?
// var dragger = function(){
// 	d3.select(this)
// 	 	.attr("cx", d3.event.sourceEvent.pageX)
// 	 	.attr("cy", d3.event.sourceEvent.pageY);
// };

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
	for (var i = 0; i < 1000; i++) {
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
	console.log("get to the choppa!!");
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



//update enemy location
//retrieve all current enemy data
//make circles for each enemy
//update position


//COLLISIONS:
//Check Score:
//Check Collision:
//SetInterval to run checkCollision


//ENEMY DATA ARRAY:
//create the enemy data array
//loop through number of enemies
//assign id and a random position
//returns array of enemy objects


//HERO DRAG FUNCTION

 //Here is our test shit
enemyUpdate(createEnemies);
gametime();
//ENEMY UPDATER
