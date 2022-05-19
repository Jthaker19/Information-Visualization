var margin = {top: 10, right: 30, bottom: 40, left: 100},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  
  var svg = d3.select("#Container2")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  
  d3.csv("https://raw.githubusercontent.com/Jthaker19/D3_Datasest/main/Films-uppppddated.csv", function(data) {
  
  
  data.sort(function(b, a) {
    return a.popularity - b.popularity;

});

var x = d3.scaleLinear()
    .domain([0, 30000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  

  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.subject; }))
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y))
  
  
  svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.popularity); })
      .attr("x2", x(0))
      .attr("y1", function(d) { return y(d.subject); })
      .attr("y2", function(d) { return y(d.subject); })
      .attr("stroke", "grey")
  
  
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.popularity); })
      .attr("cy", function(d) { return y(d.subject); })
      .attr("r", "7")
      .style("fill", "#4682B4")
      .attr("stroke", "black")
  })