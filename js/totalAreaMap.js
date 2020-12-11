///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Map View //////////////////////////////////
///////////////////////////////////////////////////////////////////////////	


var mScale = d3.scale.sqrt(); 			
var mVar = "Jan";
var sVar = "unsort";
			
//This function shows the map and moves the circles to their geo locations
function totalAreaMap() {
	
	setTimeout(function() {counter = 3;}, 1000);
	modus = "Map";

	//Set the progress circles
	setCircleProgress(2);
	
	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////

	//Activate the back button
	d3.select("#clickerBack").classed("activeButton",true);
	d3.select("#clickerBack").classed("inactiveButton",false);
	//Activate the front button
	d3.select("#clickerFront").classed("activeButton",true);	
	d3.select("#clickerFront").classed("inactiveButton",false);	
	//Change text of front button
	d3.select("#clickerFront").html("Start");
	
	//Remove the intro explanation 
	d3.select("#explanationIntro")
		.transition().duration(1000)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanationIntro")
				.style("visibility","hidden");
		});
		
	//Show the buttons
	d3.select(".btn-group")
		.style("visibility", "visible");
	

	
	//Make text & call-out disappear - if present
	d3.select("#explanation")
			.transition().duration(1000)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#explanation")
					.style("visibility","hidden");
					
				d3.select("#callOut").style("visibility","hidden");
			});

	//////////////////////////////////////////////////////
	////////////////////// Initialize ////////////////////
	//////////////////////////////////////////////////////

	//Show the text in the top right corner
	d3.select("#section")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",1);

	//Show the text & button on the right
	d3.select("#section")
		.transition().delay(100)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");			
		})
		.transition().duration(1000)
		.style("opacity",1);

	//--------------

	d3.select("#sorting")
		.style("visibility","visible")
		.transition().duration(1000)
		.style("opacity",1);

	//Show the text & button on the right
	d3.select("#sorting")
		.transition().delay(100)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#sorting")
				.style("visibility","visible");			
		})
		.transition().duration(1000)
		.style("opacity",0.8);


	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.style("stroke-opacity", 1)
		.style("fill-opacity", 1);

	setTimeout(initiateBarChart(), 1000);
	
	//Plot the sizes of the cities in 2010 in reddish
	//On the same location plot the sizes of the cities in 2000 in greyish			
		

	//Plot the sizes of the confirmed in reddish
	//On the same location plot the sizes of death in greyish			
	if (mVar == "Jan") {JanMap();};
	if (mVar == "Feb") {FebMap();};
	if (mVar == "Mar") {MarMap();};
	
}//totalAreaMap	


function JanMap() {
	mScale.domain([d3.min(cases, function(d) {return d.JanConfirmed;}),d3.max(cases, function(d) {return d.JanConfirmed;})])
		  .range([1,30]);
	mVar = "Jan";
	updateMap();
}//JanMap

function FebMap() {
	mScale.domain([d3.min(cases, function(d) {return d.JanConfirmed;}),d3.max(cases, function(d) {return d.JanConfirmed;})])
		  .range([1,30]);
	mVar = "Feb";
	updateMap();	
}//FebMap

function MarMap() {
	mScale.domain([d3.min(cases, function(d) {return d.JanConfirmed;}),d3.max(cases, function(d) {return d.JanConfirmed;})])
		  .range([1,30]);
	mVar = "Mar";
	updateMap();	
}//MarMap


//Change the dots on the map
function updateMap() {
	//Plot the sizes of the cities in 2010 in reddish
	confirmed.selectAll(".confirmed")
		.on("mouseover", showOne)
		.on("mouseout", showAll)
		.transition().duration(1500)
			.attr("r", function(d) {return eval("mScale(d." + mVar + "Confirmed)");})
			.style("fill-opacity", 0.5)
			.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
			.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
	
	//On the same location plot the sizes of the cities in 2000 in greyish	
	deaths.selectAll(".deaths")
		.on("mouseover", showOne)
		.on("mouseout", showAll)
		.transition().duration(1500)
			.attr("r", function(d) {return eval("mScale(d." + mVar + "Deaths)");})
			.style("fill-opacity", 0.2)
			.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
			.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
}//updateMap