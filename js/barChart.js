///////////////////////////////////////////////////////////////////////////
///////////////////////////////// Bar Chart ///////////////////////////////
///////////////////////////////////////////////////////////////////////////	

var barScale = d3.scale.linear();
		
var xAxis = d3.svg.axis()
	.orient("bottom");
	
var yAxis = d3.svg.axis()
    .orient("left")
	.ticks(8);  //Set rough # of ticks
		
var barHeight = 17,
	barChartHeight = 330,
	barChartWidth = 600,
	barTitleText;


		
function initiateBarChart() {

	
	//Remove all previous elements of the bar chart
	barChart.selectAll("g").remove();
	barWrappingOther.selectAll("g").remove();
		
	//Set the bar chart dimension and location
	barChart.attr("width", barChartWidth)
			.attr("height", barChartHeight)
			.attr("transform","translate(650,20)")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2000)
			.style("opacity",1);
			
	barWrappingOther.attr("width", barChartWidth)
			.attr("height", 20)
			.attr("transform","translate(650, " + (20 + barChartHeight) +")")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2000)
			.style("opacity",1);

	//Create the bar scale for population as the initialization
	barScale
		.range([0, 200])
		.domain([0,d3.max(cases, function(d) {return d.JanConfirmed;})]);
		
	//Set up axes
	xAxis
		.ticks(5)
		.scale(barScale)
		.tickFormat(numFormatSI);
	
	//Create a group for each bar
	var bar = barChart.selectAll("g")
		.data(cases)
		.enter().append("g")
		.attr("class", "barWrapper")
		.style("visibility","visible")
		.attr("transform", function(d, i) { return "translate(75," + (20 + (d.rank-1) * (barHeight)) + ")"; })
		.on("mouseover", highlight)
		.on("mouseout", showAll);

	//Create a white bar to give better mousover and mouseout events
	bar.append("rect")
		.attr("class","background")
		.attr("x", -100)
		.attr("width", 500)
		.attr("height", barHeight)
		.style("fill", "white");

	//Already append a few lines for later
	bar.append("line")
		.attr("class", "line-connect")
		.style("stroke-width", 1)
		.attr("stroke", "#858483")
		.style("opacity", 0);
		
	//Create the confirmed reddish bars	
	bar.append("rect")
		.attr("class","confirmed")
		.style("fill","#104c91")
		.style("opacity", 0.9)
		.attr("width", 0)
		.attr("height", barHeight - 2);
	
	//Create the deaths grey bars	
	bar.append("rect")
		.attr("class","deaths")
		.style("fill","#f4a896")
		.style("opacity", 1)
		.attr("width", 0)
		.attr("height", barHeight - 2);
		
	//Append country name	
	bar.append("text")
		.attr("class", "barLabels")
		.attr("x", -10)
		.attr("y", 11)
		.style("text-anchor", "end")
		.style("font-size", 10)
		.style("font-weight", 300)
		.style("fill","#292929")
		.style("font-family", "'Open Sans', sans-serif")
		.text(function(d) { return d.province; });
	
	//Append the x-axis
	barWrappingOther.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(75," + 220 + ")");
	
	//Append the y-axis
	barWrappingOther.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(65," + -barChartHeight + ")");
		
	var barTitle = barChart.append("g")
		.append("text")
		.attr("class","barTitle titleTop")
		.style("visibility","visible")
		.attr("transform", "translate(175,5)")
		.style("text-anchor", "middle");	

	
	//Create the slopegraph based on the dimension selected		
	if (mVar == "Jan") {JanBarGraph();};
	if (mVar == "Feb") {FebBarGraph();};
	if (mVar == "Mar") {MarBarGraph();};	

}//initiateBarChart



//Update the bar graph to density
function JanBarGraph() {
	mVar = "Jan";
	barTitleText = "January";
	//barScale.domain([0,d3.max(cases, function(d) {return eval("d.JanConfirmed");})])
	barScale.domain([0,3000])
	
	xAxis.scale(barScale);
	if(sVar == "unsort"){changeBar1();};
	if(sVar == "sort"){changeBar2();};
}

//Update the bar graph to density
function FebBarGraph() {
	mVar = "Feb";
	barTitleText = "Febuary";
	barScale.domain([0,d3.max(cases, function(d) {return eval("d.JanConfirmed");})])
	xAxis.scale(barScale);
	if(sVar == "unsort"){changeBar1();};
	if(sVar == "sort"){changeBar2();};
}

//Update the bar graph to density
function MarBarGraph() {
	mVar = "Mar";
	barTitleText = "March";
	barScale.domain([0,d3.max(cases, function(d) {return eval("d.JanConfirmed");})])
	xAxis.scale(barScale);
	if(sVar == "unsort"){changeBar1();};
	if(sVar == "sort"){changeBar2();};
}



//Update the bar graph to the chosen dimension in the buttons
function changeBar1() {
	
	barChart.selectAll(".barWrapper")
		.style("visibility","visible")
		.transition().duration(1000)
		//.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d.rank_" + rVar + "-1") * barHeight) + ")"; });
		.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d.rank-1") * barHeight) + ")"; });

	barChart.selectAll(".confirmed")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + mVar + "Confirmed"));})

	barChart.selectAll(".deaths")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + mVar + "Deaths"));})

	//Update the x axis
	barWrappingOther.select(".x.axis")
		.transition().duration(1000)
		.call(xAxis);
		
	barChart.selectAll(".barTitle")
		.text(barTitleText);
		
}//updateBar


function changeBar2() {
	
	barChart.selectAll(".barWrapper")
		.style("visibility","visible")
		.transition().duration(1000)
		//.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d.rank_" + rVar + "-1") * barHeight) + ")"; });
		.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d." + mVar + "Rank-1") * barHeight) + ")"; });

	barChart.selectAll(".confirmed")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + mVar + "Confirmed"));})

	barChart.selectAll(".deaths")
		.transition().duration(1000)
		.attr("width", function(d) {return barScale(eval("d." + mVar + "Deaths"));})

	//Update the x axis
	barWrappingOther.select(".x.axis")
		.transition().duration(1000)
		.call(xAxis);
		
	barChart.selectAll(".barTitle")
		.text(barTitleText);
		
}
