import React from "react";
import { max } from 'd3';
import { Scales } from "./scale";
import { Points } from "./points";
import { XAxis } from "./xaxis";
import { YAxis } from "./yaxis";


export function ScatterPlot(props) {
    const { dataAll, data, offsetX, offsetY, width, height } = props;
    const xScale = Scales.linear(0, max(dataAll, d => d.tripdurationS), 0, width);
    const yScale = Scales.linear(0, max(dataAll, d => d.tripdurationE), height / 2, 0);

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <XAxis chartType={"scatter"} xScale={xScale} height={height / 2} width={width} axisLable={"Trip duration start from"} />
        <YAxis chartType={"scatter"} yScale={yScale} height={height / 2} axisLable={"Trip duration end in"} />
        <Points data={data} xScale={xScale} yScale={yScale} />
    </g>

}