///////////////////////////////////////////////////////////////////////////
/////////////////////////// Helper Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////	

window.onerror = function() {
    location.reload();
}

//Change the explanation text
function explanationText(varText, delay, delayStep) {
	d3.select("#explanation")
		.transition().duration(1000).delay(delay*delayStep)
		.style("opacity",0)
		.call(endall, function() {
				d3.select("#explanation")
					.html(varText);	
		})
		.transition().duration(1000)
		.style("opacity",1);	
}//explanationText


//Set the progress circles white/grey
function setCircleProgress(num) {
	for (i = 0; i <= 9; i++) {
		if (i <= num) d3.select(eval('"#circle_' + i + '"')).style("background","#D3D3D3");
		if (i > num) d3.select(eval('"#circle_' + i + '"')).style("background","white");
	}//for i	
}//setCircleProgress


//Calls a function only after the total transition ends
function endall(transition, callback) { 
	var n = 0; 
	transition 
		.each(function() { ++n; }) 
		.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////// Mouseover events //////////////////////////////
///////////////////////////////////////////////////////////////////////////	
	
var hoverType;

//Show city statistics when hovering over circle in map
function circleHover(chosen) {
	
	//Position of call out depends on view
	d3.select("#callOut")
		.style("top", "480px")
		.style("left", "30px");
	

	//Change the numbers to reflect the hovered over city
	if (hoverType == "province") {d3.select("#callOutCity").html(chosen.province);}
	d3.select("#td-pop-2000").html(chosen.JanDeaths);
	d3.select("#td-land-2000").html(chosen.FebDeaths);
	d3.select("#td-density-2000").html(chosen.MarDeaths);

	d3.select("#td-pop-2010").html(chosen.JanConfirmed);
	d3.select("#td-land-2010").html(chosen.FebConfirmed);
	d3.select("#td-density-2010").html(chosen.MarConfirmed);

	d3.select("#td-pop-perc").html(numFormatThree((chosen.JanDeaths)/chosen.JanDeaths) + "%");
	d3.select("#td-land-perc").html(numFormatThree((chosen.FebDeaths)/chosen.FebConfirmed) + "%");
	d3.select("#td-density-perc").html(numFormatThree((chosen.MarDeaths)/chosen.MarConfirmed) + "%");
	
	//Make the callOut visible again
	d3.select("#callOut")
		.style("visibility","visible");

}//circleHover
	
 //Revert back to default when the mouse moves away from a city
function showAll() {
	
	deaths.selectAll(".deaths")
			.style("fill-opacity", 0.7);
			
	confirmed.selectAll(".confirmed")
		.style("fill-opacity", 0.5);

	barChart.selectAll(".deaths")
		.style("fill-opacity", 0.9);
		
	barChart.selectAll(".confirmed")
		.style("fill-opacity", 0.7);
	
	//Remove visibility of callout in lower left corner
	d3.select("#callOut").style("visibility","hidden");
	
}
		
 
 //Show only the circles and line for the hovered over city
 function showOne(d) {
	
	//Compare everything with the hovered over city
	var chosen = d;
	var setOpacity = 0;
	
	//Show information of city in small table in the lower left corner
	if (modus == "Map") {
		hoverType = "province";
		circleHover(chosen);
		setOpacity = 0.1;
	}
			
	deaths.selectAll(".deaths")
		.filter(function(d) {return eval("d.province") != eval("chosen.province");})
		.style("fill-opacity", setOpacity);
		
	confirmed.selectAll(".confirmed")
		.filter(function(d) {return eval("d.province") != eval("chosen.province");})
		.style("fill-opacity", setOpacity);

	barChart.selectAll(".deaths")
		.filter(function(d) {return eval("d.province") != eval("chosen.province");})
		.style("fill-opacity", setOpacity);
		
	barChart.selectAll(".confirmed")
		.filter(function(d) {return eval("d.province") != eval("chosen.province");})
		.style("fill-opacity", setOpacity);

}//showOne

//Mouseover event for the bar chart on the right
function highlight(d) {
	//Compare everything with the hovered over city
	var chosen = d,
		setOpacity = 0;

	//Show information of city in small table in the lower left corner
	hoverType = "province";
	circleHover(chosen);
	setOpacity = (modus == "Map" ? 0.1 : 0.2);
	
	
	deaths.selectAll(".deaths")
		.filter(function(d) {return d.province != chosen.province;})
		.style("fill-opacity", setOpacity);
		
	confirmed.selectAll(".confirmed")
		.filter(function(d) {return d.province != chosen.province;})
		.style("fill-opacity", setOpacity);
		

}//highlight	