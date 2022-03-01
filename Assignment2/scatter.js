export let drawPoints = (scatterPlotLayer, data, xScale, yScale, div, scatterPlotWidth, scatterPlotHeight) => {
    console.log('This function plots the points in the scatter plot');

    // ---------- draw x & y axis for the scatter plot ----------
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    scatterPlotLayer.append('g')
        .attr("transform", "translate(0," + (scatterPlotHeight / 2 - 70) + ")")
        .attr('class', 'x-axis')
        .call(xAxis);

    scatterPlotLayer.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    // ---------- put axis labels ---------- 
    scatterPlotLayer.append('g')
        .attr("class", 'axis-label')
        .attr('transform', 'translate(' + 20 + ',' + 70 + ') rotate(' + 270 + ')')
        .append("text")
        .style("text-anchor", 'middle')
        .text("Trip Duration Ends in")

    scatterPlotLayer.append('g')
        .attr("class", 'axis-label')
        .attr('transform', 'translate(' + (scatterPlotWidth - 80) + ',' + (scatterPlotHeight / 2 - 80) + ')')
        .append("text")
        .style("text-anchor", 'middle')
        .text("Trip Duration Starts from")

    // ---------- draw points ---------- 
    scatterPlotLayer.selectAll('.point').data(data).enter()
        .append('circle')
        .attr('class', "point")
        .attr("cx", d => xScale(d.tripdurationS))
        .attr('cy', d => yScale(d.tripdurationE))
        .attr('r', '5')
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', '2')
        .on("mouseover", function (event, d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.station)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px")
                .style("height", 2 * d.station.length + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    ;
}