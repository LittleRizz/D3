# D3

##Collider
We're going to be building a collider game modeled off of the one here: [Epic Collider] (http://latentflip.com/LearningD3/collider/) <br>
You can use that for inspiration, but the code is written in CoffeeScript, so while you can use it for strategy reference, it's not what you should be reverse-engineering. <br>
Before starting, this may be a good thing to look over, as well as my powerpoints:
[General Update Patterns in D3] (http://bl.ocks.org/mbostock/3808218).
Let's have some coding fun! <br>

###Initialize a Game Container
* Create an svg with a class of <b>gameCanvas</b> in your index.html
* In your collider.js, create a canvasSize object with an x and y keys, and set values for those keys. This is going to be your game board size.
* Next create a variable called gameCanvas and use the d3 select method to set it equal to the svg selection by class. <br>
```
var gameCanvas= d3.select(".gameCanvas")
```
* Next add height and width attributes from your canvasSize object to your gameCanvas, using .attr method (remind you of JQuery?)


###Create a Hero
* In your inline svg in index.html, create a circle with the class Hero. Give him a radius attribute. 
* In collider.js, add positional attributes to the hero, which place him at the exact center of the canvas. Hint: Use the canvasSize object properties to dynamically create these values.

###Create the Enemy Data Array
* This should be a function that takes the number of enemies you'd like. Initialize the enemy array to an empty array. Loop through the specified number of enemies and push an object for each iteration into the enemy array. 
* The object should have an <b>id</b>, <b>x</b>, <b>y</b> key. The value for id will be the number of enemy created, x and y will be randomized using Math.random(). Make sure the points are valid points for canvasSize!!
* Return the Enemy Array when you are done.

###Create Enemies
* Create a variable to hold the number of enemies you will have.
* Create an enemyUpdate function which selects every enemy on the gameCanvas by it's enemy class attribute and use the .data d3 method to return the id's of every single bound enemy. It should look like:
```
.data(data, function(d){ return d.id });
```

* Now create the enter function for the enemies. When you have unbound data, you want to create circles for it and append it to your container. 
* After you append a circle for each enemy, attach an enemy class attribute, it's generated x and y position and a set radius for every enemy.

###Update Enemy position
Use the transition method to change the x and y attributes of each enemy after a certain duration. Check out the <b>duration</b> method.
```
enemies
.transition()
*YOUR CODE HERE*
```
###Drag your Hero
* Create a function that allows you to drag your hero.
* Read more about the D3 drag behavior here: https://github.com/mbostock/d3/wiki/Drag-Behavior
* Now remember you want to keep track of your hero's x and y position at all times.
* After you initialize the d3 drag behavior (look at the doc), make sure to specify this:
```
.on("drag", YOURFUNCTION);
d3.select('.hero').call(drag);
```
* Here YOURFUNCTION is selecting *this*, as in what is being dragged.
```
d3.select(this);
```
* Then you are attaching x and y attributes to it, which are updating it's position.
* You can do this by 
```
.attr('cx', d3.event.sourceEvent.pageX);
```
* This will give you the x coordinate on the page where the event is triggered. You may have to adjust the offset between the gameCanvas and the actual coordinate grid by subtracting the offset from pageX.
* Example:
```
.attr('cx', d3.event.sourceEvent.pageX - 10);
```

###COLLISIONS
* Create a function that checks for collisions that takes data as an argument, but before getting mathmatical, initiate a score-check:

####Check Scores
* Create two divs in index.html which have respective classes of current score and high score.
* Next, in your checkCollision function, select those classes in your collision.js and use d3's <b>.text</b> method to add "score" and "highScore" variables to the selection.
* Make sure that if score ever exceeds highScore it is set as the new highScore.   

####Back to Collisions
* For every enemy run a function:
```
enemies.each(function(){
```
* You need six variables: heroX, heroY, heroR, enemyX, enemyY, enemyR.
* Use d3 to create a selection and then extract the value of an attribute for that selection.
```
var heroR = parseFloat(d3.select('.hero'.attr('r'));
```
* You're going to want to use parseFloat here to make sure you always have a rounded decimal number.
* Next figure out the coordinate distance on the x and y axes between the hero and the enemy.
* Hint: Add the coordinate value and the hero radius and subtract from the enemy value at that coordinate plus the enemy radius.
* Calculate the total distance: <b>the square root of x^2 + y2</b>.
* Check if a collision has taken place.
* If the total distance is less than the hero and enemy radius combined, reset the score. 
* Use setInterval to run this function every 100 ms. Docs here: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval

###Finishing Touches
* Pass in your enemyArray with the enemyNum into your enemyUpdate function. 
* Use setInterval to run an anonymous function that increases the score by a set value every 100 ms.
* Create another setInterval function that takes an anonymous function which calls the run to the enemyUpdate function every 1000ms.


##Style your awesome game.
####Push it up so we can check it out.
#Further Reading Resources:
* [Visualizing Data with D3] (http://www.sitepoint.com/visualizing-data-d3/)
* [Manipulating D3 Data Like a Boss] (http://www.jeromecukier.net/blog/2012/05/28/manipulating-data-like-a-boss-with-d3/)
* [Motherlode of all D3 API information] (https://github.com/mbostock/d3/wiki/API-Reference)
