/* global d3, crossfilter, timeSeriesChart, barChart */

// 2015-05-01 00:43:28
var dateFmt = d3.timeParse("%Y-%m-%d");

var chartTimeline = timeSeriesChart()
  .width(1400)
  .x(function (d) { return d.key; })
  .y(function (d) { return d.value; });
var barChartCasualties = barChart()
  .x(function (d) { return d.key; })
  .y(function (d) { return d.value; });
var barChartStates = barChart()
  .width(600)
  .x(function (d) { return d.key; })
  .y(function (d) { return d.value; });

d3.csv("https://raw.githubusercontent.com/zoexiao0516/InfoViz/main/Project/DATA/bar_5000.csv",
  function (d) {
    // This function is applied to each row of the dataset
    d.Timestamp = dateFmt(d.date);
    return d;
  },
  function (err, data) {
    if (err) throw err;

    var csData = crossfilter(data);

    // We create dimensions for each attribute we want to filter by
    csData.dimTime = csData.dimension(function (d) { return d.Timestamp; });
    csData.dimCasualtiesType = csData.dimension(function (d) { return d["total"]; });
    csData.dimStateType = csData.dimension(function (d) { return d["state"]; });

    // We bin each dimension
    csData.times = csData.dimTime.group();
    csData.casultiesNum = csData.dimCasualtiesType.group();
    csData.stateNames = csData.dimStateType.group();


    chartTimeline.onBrushed(function (selected) {
      csData.dimTime.filter(selected);
      update();
    });

    barChartCasualties.onMouseOver(function (d) {
      csData.dimCasualtiesType.filter(d.key);
      update();
    }).onMouseOut(function () {
      // Clear the filter
      csData.dimCasualtiesType.filterAll();
      update();
    });

    barChartStates.onMouseOver(function (d) {
      csData.dimStateType.filter(d.key);
      update();
    }).onMouseOut(function () {
      // Clear the filter
      csData.dimStateType.filterAll();
      update();
    });

    function update() {
      d3.select("#timeline")
        .datum(csData.times.all())
        .call(chartTimeline);

      d3.select("#casultiesNum")
        .datum(csData.casultiesNum.all())
        .call(barChartCasualties);

      d3.select("#states")
        .datum(csData.stateNames.all())
        .call(barChartStates)
        .select(".x.axis") //Adjusting the tick labels after drawn
        .selectAll(".tick text")
        .attr("transform", "translate(-8,-1) rotate(-45)");

    }

    update();


  }
);