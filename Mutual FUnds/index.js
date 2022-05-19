var treeData = [
    {
      "name": "Mutuals Funds",
      "parent": "null",
      "children": [
        {
          "name": "International Stocks",
          "parent": "Mutuals Funds",
          "children": [
            {
              "name": "Alliance International Adv",
              "parent": "International Stocks"
            },
            {
              "name": "American Cent-20th Cent Intl Grth Is",
              "parent": "International Stocks"
            },
            {
              "name": "Boston 1784 International Equity",
              "parent": "International Stocks"
            },
          ]
        },
        {
          "name": "Small Growth",
          "parent": "Mutuals Funds",
          "children": [
              {
                  "name": "One Group Small Capitalization Fid", 
                  "parent": "Small Growth"  
              },
              {
                  "name": "Nicholas-Applegate Sm Cap Growth Q", 
                  "parent": "Small Growth"
              },
              {
                  "name": "Quantitative Small Cap Instl",
                  "parent": "Small Growth"
              }
          ]
        },
        {
          "name": "Large Value",
          "parent": "Mutuals Funds",
          "children": [
              {
                  "name": "HighMark Value Momentum Fid",
                  "parent": "Large Value"
              },
              {
                  "name": "ICAP Discretionary Equity",
                  "parent": "Large Value"
              },
              {
                  "name": "Kent Growth & Income Instl", 
                  "parent": "Large Value"
              }
          ]
        },
        {
          "name": "Large Growth",
          "parent": "Mutuals Funds",
          "children": [
              {
                  "name": "New England Capital Growth C",
                  "parent": "Large Growth"
              },
              {
                  "name": "Northern Select Equity",
                  "parent": "Large Growth"
              },
              {
                  "name": "Preferred Growth", 
                  "parent": "Large Growth"
              }
          ]
        },
        {
          "name": "Small Value",
          "parent": "Mutuals Funds", 
          "children": [
              {
                  "name": "Quaker Small-Cap Value",
                  "parent": "Small Value"  
              },
              {
                  "name": "Stratton Small-Cap Yield",
                  "parent": "Small Value"
  
              },
              {
                  "name": "Westport Small Cap R",
                  "parent": "Small Value"
              }
          ]
        }
      ]
    }
  ];
  
  var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;
      
  var i = 0,
      duration = 750,
      root;
  
  var tree = d3.layout.tree()
      .size([height, width]);
  
  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });
  
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
    
  update(root);
  
  d3.select(self.frameElement).style("height", "500px");
  
  function update(source) {
  
    
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
  
    
    nodes.forEach(function(d) { d.y = d.depth * 180; });
  
    
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);
  
    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -20 : 20; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);
  
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  
    nodeUpdate.select("circle")
        .attr("r", 10)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
  
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();
  
    nodeExit.select("circle")
        .attr("r", 1e-6);
  
    nodeExit.select("text")
        .style("fill-opacity", 1e-6);
  
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
  
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });
  
    link.transition()
        .duration(duration)
        .attr("d", diagonal);
  
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();
  
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
  