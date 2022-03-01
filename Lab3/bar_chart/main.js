function binning(arr, interval, numOfBins){
    let bins = [];
    let binCount = 0;
    for (let i = 0; i < numOfBins; i += 1){
        bins.push({
            binNum: binCount,
            minNum: i*interval,
            maxNum: (i+1)*interval,
            count: 0
        })
        binCount++;
    }
    console.log(bins);

    for (let i = 0; i < arr.length; i++){
        let item = arr[i];
        for(let j = 0; j < bins.length; j++){
            let bin = bins[j];
            if(item > bin.minNum && item <= bin.maxNum){
                bin.count++;
            };
        };
    };
    return bins;
}


d3.csv('faithful.csv').then(function(data){
    // the data is an array-like object
    data.forEach(d => {
        d.index = +d.index;
        d.eruptions = +d.eruptions;
        d.waiting = +d.waiting;
    });

    let eruptions = data.map((d) => d.eruptions);
    let numOfBins = 6;
    let interval = 1;
    let bins = binning(eruptions, interval, numOfBins);
    //console.log(bins);

    let svg = d3.select('svg')
    let margin = 120;
    let width = svg.attr("width") - margin ;
    let height = svg.attr("height") - margin;

    let xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.4)
            .domain(bins.map(d => `${d.maxNum} minutes` ));

    let yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(bins, d=>d.count)]);

    let g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
    
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale)
                .ticks(5);

    g.append('g')
    .attr("transform", "translate(0," + (height) + ")")
    .attr('class', 'x-axis')
    .call(xAxis);
    g.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

    g.selectAll('.bar')
     .data(bins)
     .enter().append('rect')
     .attr('class', "bar")
     .attr("x", d=> xScale(`${d.maxNum} minutes`))
     .attr('y', d=>yScale(d.count))
     .attr('width', xScale.bandwidth())
     .attr('height', d => {return height - yScale(d.count)});
     //.style('fill', 'steelblue'); 

})