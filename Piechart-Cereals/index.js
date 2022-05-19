
import { getData } from './getData';
import {
  select,
  json,
  pie,
  arc,
  scaleOrdinal,
  format
} from 'd3';

const svg = select("svg");
const width = +svg.attr('width');
const height = +svg.attr('height');
const xAxisTickFormat = number =>
  	format('.4~g')(number);


const render = (data,total) => {
  const pieData = pie().value(d=>d.protein)(data);
  const colors = scaleOrdinal()
  	.domain(data)
  	.range([
      "#FFD700",
      "#018670",
      "#B22222",
      "#8dc63f",
      "#f58026",
      "#4b4b4b",
      "#9acbc2",
      "#00b5cc",
      "#014140"
    ]);
  
	const segments = arc()
  	.innerRadius(0)
  	.outerRadius(175)
  	.padAngle(0)
  	.padRadius(0);
  
  const sections = svg.append("g")
  	.attr("transform", `translate(250,250)`)
  	.selectAll("path").data(pieData);
  sections.enter().append("path").attr("d", segments)
  	.attr("fill", d => colors(d.data.name));
  
  const legends = svg.append("g")
  	.attr("transform", "translate(500,100)")
    .selectAll(".legends").data(pieData);
  const legend = legends.enter().append("g").classed(".legends",true)
  	.attr("transform", (d,i)=>{
      return `translate(0,${(i+1)*30})`;
    });
  
  legend.append("rect").attr("width",20).attr("height",20)
  	.attr("fill", d => colors(d.data.name));
 
  legend.append("text")
  	.attr("x", 25)
  	.attr("y", 15)
  	.attr("class","legend_text")
  	.text(d => d.data.name);
    
  legend.append("text")
  	.attr("x", 300)
  	.attr("y", 15)
  	.attr("class","legend_value")
  	.text(d=>xAxisTickFormat((d.data.protein))+"gms");
}

const run = async () => {
  let data = await getData()
  let total = 0
  data.forEach(d=>{
    d.protein = +d.protein;
    total += d.protein
  });
  console.log(data)
	render(data,total);
};
run();