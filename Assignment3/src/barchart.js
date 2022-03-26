import React from "react";
import { max } from "d3";
import { XAxis } from "./xaxis";
import { YAxis } from "./yaxis";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart(props) {
    const { selectedStation, mouseEnter, mouseOut, dataAll, data, offsetX, offsetY, width, height } = props;
    const xScale = Scales.band(data.map(d => { return d.station }), width, 0);
    const yScale = Scales.linear(0, max(dataAll, d => d.start), height, height / 2);

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <XAxis chartType={"bar"} xScale={xScale} width={width} height={height / 2} />
        <YAxis chartType={"bar"} yScale={yScale} height={height / 2} axisLable={"Bikers star from"} />
        <Bars selectedStation={selectedStation} mouseEnter={mouseEnter} mouseOut={mouseOut} data={data} xScale={xScale} yScale={yScale} height={height} />
    </g>
}