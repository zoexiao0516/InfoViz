import React from "react";
import { scaleLinear, scaleBand, area, max, curveBasis } from "d3";

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
    const xScale = scaleBand().range([0, width]).domain(data.map(d => d.station));
    const yScale = scaleLinear().range([height / 2, 0]).domain([0, Math.max(max(data, d => d.start), max(data, d => d.end))]).nice();
    const yScaleReverse = scaleLinear().range([0, height / 2]).domain([0, Math.max(max(data, d => d.start), max(data, d => d.end))]).nice();

    const mouseOver = d => { setSelectedStation(d.station) };
    const mouseOut = d => { setSelectedStation(null) };

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? "red" : "#99d594";
    }
    const getColorReverse = (selectedStation, station) => {
        return station === selectedStation ? "steelblue" : "#fc8d59";
    }

    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor: 'start', fontSize: '15px' }} transform={`translate(${width / 3}, 0)`}>
            {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}

        {/* draw the upper part of bar chart */}
        <g>
            {<line y2={height / 2} stroke='black' />}
            {yScale.ticks(5).map(tickValue =>
                <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor: 'end', fontSize: '10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
        </g>

        <g>
            {data.map(d => {
                return <rect key={d.station}
                    x={xScale(d.station)}
                    y={yScale(d.start)} width={xScale.bandwidth()} height={height / 2 - yScale(d.start)}
                    fill={getColor(selectedStation, d.station)} stroke={"black"}
                    onMouseEnter={() => mouseOver(d)}
                    onMouseOut={mouseOut} />
            })}
        </g>

        {/* draw the lower part of bar chart */}
        <g transform={`translate(${0}, ${height / 2})`}>
            {/* the text needed is given as the following */}
            <text style={{ textAnchor: 'start', fontSize: '15px' }} transform={`translate(${width / 3}, ${height / 2 + 10})`}>
                {"Num. of ridders end into a station"}
            </text>
            {/* start your code here */}

            <g>
                {<line y2={height / 2} stroke='black' />}
                {yScaleReverse.ticks(5).reverse().map(tickValue =>
                    <g key={tickValue} transform={`translate(-10, ${yScaleReverse(tickValue)})`}>
                        <line x2={10} stroke='black' />
                        <text style={{ textAnchor: 'end', fontSize: '10px' }} >
                            {tickValue}
                        </text>
                    </g>
                )}
            </g>

            <g>
                {data.map(d => {
                    return <rect key={d.station}
                        x={xScale(d.station)}
                        y={0} width={xScale.bandwidth()} height={height / 2 - yScale(d.end)}
                        fill={getColorReverse(selectedStation, d.station)} stroke={"black"}
                        onMouseEnter={() => mouseOver(d)}
                        onMouseOut={mouseOut} />
                })}
            </g>

        </g>
    </g>
}

function SymmetricAreaChart(props) {
    const { offsetX, offsetY, data, height, width } = props;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const xScale = scaleBand().range([0, width]).domain(data.map(d => d.month));
    const yScale = scaleLinear().range([height / 2, 0]).domain([0, Math.max(max(data, d => d.start), max(data, d => d.end))]).nice();
    const yScaleReverse = scaleLinear().range([0, height / 2]).domain([0, Math.max(max(data, d => d.start), max(data, d => d.end))]).nice();

    const p1 = area()
        .x(d => xScale(d.month))
        .y0(height / 2)
        .y1(d => yScale(d.start))
        .curve(curveBasis)
        (data);
    const p2 = area()
        .x(d => xScale(d.month))
        .y0(0)
        .y1(d => yScaleReverse(d.end))
        .curve(curveBasis)
        (data);

    return <g transform={`translate(${offsetX}, ${offsetY + 10})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(${width}, ${20})rotate(0)`}>
            {"Start"}
        </text>
        <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(${width * 2 / 3}, ${-10})rotate(0)`}>
            {"Num. of riders over the year"}
        </text>
        <g transform={`translate(${offsetX}, ${offsetY + height / 2})`}>
            <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(${width}, ${height / 2 - 20})rotate(0)`}>
                {"End"}
            </text>
        </g>

        {/* start your code here */}

        {/* draw the upper part of area chart */}
        <g>
            <line y1={height / 2} stroke={"black"} />
            {yScale.ticks(2).map(tickValue => {
                return <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor: 'end', fontSize: '10px' }}>
                        {tickValue}
                    </text>
                </g>
            })}
        </g>

        <path d={p1} fill={"lightgreen"} stroke={"black"} />
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke={"black"} />

        {/* draw the lower part of area chart */}
        <g transform={`translate(${0}, ${height / 2})`}>
            <g>
                <line y1={height / 2} stroke={"black"} />
                {yScale.ticks(2).map(tickValue =>
                    <g key={tickValue} transform={`translate(-10, ${yScaleReverse(tickValue)})`}>
                        <line x2={10} stroke='black' />
                        <text style={{ textAnchor: 'end', fontSize: '10px' }}>
                            {tickValue}
                        </text>
                    </g>
                )}
            </g>

            <path d={p2} fill={"pink"} stroke={"black"} />

            {xScale.domain().map((tickValue) =>
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height / 2 + 10})`}>
                    <line y2={10} stroke='black' />
                    <text style={{ textAnchor: 'middle', fontSize: '10px' }} y={20}>
                        {tickValue}
                    </text>
                </g>
            )}
        </g>

    </g>
}

export { SymmetricAreaChart, SymmetricBarChart }

