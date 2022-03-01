import { Scales } from './scales.js';
import { getDataByMonth } from './data_filter.js';
import { drawPoints } from './scatter.js';
import { drawBars } from './bar.js';

const svg = d3.select('svg');
const WIDTH = svg.attr('width');
const HEIGHT = svg.attr('height');
let div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("citi_bike_2020.csv").then(function (data) {
  // some framework-codes are given to guide you complete the tasks;
  // in some places, you need to modify them so that they will adapt to your code.
  // Q2.1 Scatter Plot
  // ---------- converting the attributes into numbers ----------
  data.forEach(element => {
    element.latitude = +element.latitude
    element.longitude = +element.longitude
    element.start = +element.start
    element.tripdurationS = +element.tripdurationS
    element.end = +element.end
    element.tripdurationE = +element.tripdurationE
  });

  // ---------- set the boundary of the canvas ----------
  const margin = { left: 300, right: 0, top: 300, bottom: 0, gap: 70 };
  const width = WIDTH - margin.left;
  const height = HEIGHT - margin.top;

  // ---------- set the scales ----------
  const xScale_spl = Scales.linear(0, d3.max(data, d => d.tripdurationS), 0, width);
  const yScale_spl = Scales.linear(0, d3.max(data, d => d.tripdurationE), (height / 2 - margin.gap), 0);

  const scatterPlotLayer = svg.append("g")
    .attr("transform", "translate(" + 70 + "," + 70 + ")");


  drawPoints(scatterPlotLayer, getDataByMonth(data, 'May'), xScale_spl, yScale_spl, div, width, height);

  //Q2.2 Bar Chart
  const xScale_bar = Scales.band([], 0, 0);
  const yScale_bar = Scales.linear(0, 0, 0, 0);

  let barChartLayer = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (height / 2 + margin.top + margin.gap) + ")");

  drawBars(barChartLayer, getDataByMonth(data, "May"), xScale_bar, yScale_bar, width, height / 2, div);

  //Q2.4 Slider
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let slider = d3.select('#slider');
  let slidertext = d3.select('#slidertext');
  slider.on("input", function () {
    console.log(this.value);
    slidertext.attr('value', month[this.value - 1]);

  });


});