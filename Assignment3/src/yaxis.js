import React from "react";

export function YAxis(props) {
    const { chartType, yScale, height, axisLable } = props;

    if (chartType === "scatter") {
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
    if (chartType === "bar") {
        return <g>
            <line x1={0} y1={height * 2 + 70} x2={0} y2={height + 70} stroke='black' />
            {yScale.ticks().map(tickValue => {
                return <g key={tickValue} transform={`translate(-5, ${yScale(tickValue) + 70})`}>
                    <line x2={5} stroke={"black"} />
                    <text style={{ textAnchor: 'end', fontSize: '10px' }}>
                        {tickValue}
                    </text>
                </g>
            })}
            <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={'translate(15,370) rotate(270)'}> {"Bikes start from"}
            </text>
        </g>
    }
}