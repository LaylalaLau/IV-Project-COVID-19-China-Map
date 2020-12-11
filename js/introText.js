///////////////////////////////////////////////////////////////////////////
/////////////////////// Text at the introduction //////////////////////////
///////////////////////////////////////////////////////////////////////////	

function introText() {
	
	modus = "intro";
	
	//De-activate the back button
	d3.select("#clickerBack").classed("inactiveButton",true);	
	d3.select("#clickerBack").classed("activeButton",false);
	//Change text of front button
	d3.select("#clickerFront").html("Start");

	setTimeout(function() {counter = 2;}, 1000);

	//////////////////////////////////////////////////////
	////////////////// Hide & Remove /////////////////////
	//////////////////////////////////////////////////////
	
	

	d3.select("#section")
		.style("opacity",0)
		.style("visibility","hidden");

	d3.select("#sorting")
		.style("opacity",0)
		.style("visibility","hidden");

	//Remove the bar chart to the right - if present
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();
	
	//Hide call-out
	d3.select("#callOut").style("visibility","hidden");

	//Hide the cities - if present
	confirmed.selectAll(".confirmed")
		.on("mouseover", null)
		.on("mouseout", null)
		.transition().duration(1000)
		.attr("r", 0)
		.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
		.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});
	deaths.selectAll(".deaths")
		.on("mouseover", null)
		.on("mouseout", null)
		.transition().duration(1000)
		.attr("r", 0)
		.attr("cx", function(d) {return projection([d.longitude, d.latitude])[0];})
		.attr("cy", function(d) {return projection([d.longitude, d.latitude])[1];});

	//Hide the buttons - if present
	d3.select(".btn-group")
		.style("visibility", "hidden");		
	
	//////////////////////////////////////////////////////
	///////////////////////// Map ////////////////////////
	//////////////////////////////////////////////////////
	
	//Increase opacity of the map
	map.selectAll(".geo-path")
		.attr("visibility", "visible")
		.transition().duration(2000)
		.style("stroke-opacity", 1)
		.style("fill-opacity", 0.5);
		
	//Start explanation about the World Bank
	d3.select("#explanation")
		.style("visibility","visible")
		.style("top", 200 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		.html("<p>COVID-19 has become the center of contention since the occurrence of a cluster of viral pneumonia cases in Wuhan, Hubei Province, since December 2019. According to an investigation by the Mainland health authorities, a novel coronavirus is found to be the causative agent. Therefore, this project is designed to visualize the COVID-19 confirmed/recovered/death cases from January to March in 31 districts across China. It aims to help people better understand the spread of the pandemic across the country and how well different provinces respond to this disease outbreak.<p>")
		.transition().duration(1000)
		.style("opacity",1);

	//Show the intro explanation 
	d3.select("#explanationIntro")
	d3.select("#explanationIntro")
		.style("visibility","visible")
		.style("top", 475 + "px")
		.style("left", 50 + "px")
		.style("width", 550 + "px")
		//.html("Press Start to be taken through the complete story, or press the circles that correspond to <br> map | slope | histogram | scatter <br> to jump straight to the intermediary views")	
		.style("opacity",1);
	
}//introText