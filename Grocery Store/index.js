var margin = {top: 100, right: 0, bottom: 0, left: 0},
      width = 500 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   
  
  
  var svg = d3.select("#container1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 4 + margin.top) + ")");
  
  d3.csv("https://raw.githubusercontent.com/Jthaker19/D3_Datasest/main/Updatd_GroceryStore.csv", function(data) {
  
    
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    
        .align(0)                  
        .domain(data.map(function(d) { return d.Chain; }));
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   
        .domain([0, 45200000]); 
  
    
    svg.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", "#5F9EA0")
        .attr("d", d3.arc()     
            .innerRadius(innerRadius)
            .outerRadius(function(d) { return y(d['Income']); })
            .startAngle(function(d) { return x(d.Chain); })
            .endAngle(function(d) { return x(d.Chain) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
  
    
    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
          .attr("text-anchor", function(d) { return (x(d.Chain) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
          .attr("transform", function(d) { return "rotate(" + ((x(d.Chain) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Income'])+10) + ",0)"; })
        .append("text")
          .text(function(d){return(d.Chain)})
          .attr("transform", function(d) { return (x(d.Chain) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
          .style("font-size", "11px")
          .attr("alignment-baseline", "middle")
  
  });