import React from "react";

export function XAxis(props) {
    const { chartType, xScale, height, width, axisLable } = props;

    if (chartType === "scatter") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black' />}
            {xScale.ticks().map(tickValue =>
                < g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                    <line y2={5} stroke={"black"} />
                    <text style={{ textAnchor: 'middle', fontSize: '10px' }} y={20}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(${width}, ${height - 10})`}>
                {axisLable}
            </text>
        </g >
    }
    if (chartType === "bar") {
        return <g>
            <line x1={0} y1={height * 2 + 70} x2={500} y2={height * 2 + 70} stroke={`black`} />
            {xScale.domain().map(domainValue => {
                return <g key={domainValue} transform={`translate(${xScale(domainValue)}, ${height * 2 + 75})`}>
                    <text style={{ textAnchor: '', fontSize: '10px' }} y={15} transform={`rotate(75,10,10)`}>
                        {domainValue}
                    </text>
                </g>
            })}
        </g>
    }
}