import React from "react";

export function YAxis(props) {
    const { yScale, height, axisLable } = props;
    return <g>
        {<line y2={height} stroke='black' />}
        {yScale.ticks().map(tickValue =>
            <g key={tickValue} transform={`translate(-5, ${yScale(tickValue)})`}>
                <line x2={5} stroke='black' />
                <text style={{ textAnchor: 'end', fontSize: '10px' }} >
                    {tickValue}
                </text>
            </g>
        )}
        <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(15, 0)rotate(270)`}>
            {axisLable}
        </text>
    </g>

}