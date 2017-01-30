var width = 960,
		height = 700,
		radius = Math.min(width,height) / 2 - 20;


var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(radius / 1.5);

var hoverArc = d3.svg.arc()
			.outerRadius(radius + 10)
			.innerRadius(radius / 1.5);


var labelArc = d3.svg.arc()
			.outerRadius(radius - 30)
			.innerRadius(radius - 30);


var pie = d3.layout.pie()
		.sort(null)
		.value(function(data) { return data.population });

var svg = d3.select('.diagram')
						.append('svg')
						.attr('width', width)
						.attr('height', height)
						.append("g")
						.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var request = new XMLHttpRequest();
request.open('GET', './libs/population.json');

request.onload = function () {
	var dataset = JSON.parse(request.responseText).data;
	render(dataset);
};

request.send();




function render ( dataset ) {

var g = svg.selectAll('.arc')
	.data(pie(dataset))
	.enter()
	.append('g')
  .attr("class", "arc")	
  .on('mouseover', function(value, index){
		d3.select(this).select('path').attr('d', hoverArc);
		d3.select(this).select('text').attr('style', "font: 14px sans-serif;");
	})
	.on('mouseout', function(value, index){
		d3.select(this).select('path').attr('d', arc);
		d3.select(this).select('text').attr('style', "font: 12px sans-serif;");
	});


g.append('path')
	.attr('d', arc)
	.attr('fill', function(d) { return color(d.data.age)});
	


g.append('text')
	.attr('transform', function(d) { return 'translate (' + labelArc.centroid(d) + ')'})
	.text(function(d) { return d.data.age })
  .attr("dy", ".35em")
	.attr('text-anchor', "middle");


}