export let drawBars = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight, div, rect_bg) => {
    console.log("This function draws bars in the bar chart.");

    // ---------- draw x & y axis for the bar chart ----------
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    barChatLayer.append('g')
        .attr('class', 'x-axis')
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function (d) {
            return "rotate(-65)"
        });

    barChatLayer.append('g')
        .attr("transform", "translate(0," + (-barChartHeight / 2 + 70) + ")")
        .attr('class', 'y-axis')
        .call(yAxis);

    // ---------- put y axis label ----------
    barChatLayer.append('g')
        .attr("class", 'axis-label')
        .attr('transform', 'translate(40,' + (-barChartHeight / 2 + 60) + ')')
        .append("text")
        .style("text-anchor", 'middle')
        .text("Bikers start from")

    // ---------- draw bars ----------
    barChatLayer.selectAll('.bar')
        .data(data).enter()
        .append('rect')
        .attr('class', "bar")
        .attr('id', d => d.id + "bar")
        .attr('x', d => xScale(`${d.station}`))
        .attr('y', d => yScale(d.start))
        .attr('width', xScale.bandwidth())
        .attr('height', d => { return barChartHeight / 1.5 - yScale(d.start) - 170 })
        .attr("transform", "translate(0," + (-barChartHeight / 2 + 70) + ")")
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', '2')
        ;

    // ---------- mouseover events ----------
    barChatLayer.selectAll(".bar")
        .on("mouseover", function (event, d) {
            rect_bg.style('opacity', 0.5).MoveToFront();
            d3.select('#' + d.id + "bar").transition().style("fill", "red");
            d3.selectAll('#' + d.id + 'point').MoveToFront();
            d3.select('#' + d.id + "point").transition().attr("r", 10).style("fill", "red");
        })
        .on("mouseout", function (event, d) {
            rect_bg.style('opacity', 0).MoveToBack();
            d3.select('#' + d.id + "bar").transition().style("fill", "steelblue");
            d3.select('#' + d.id + "point").transition().attr('r', '5').style("fill", "steelblue");
        });
}