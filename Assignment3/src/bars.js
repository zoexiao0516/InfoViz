import React from "react";

export function Bars(props) {
    const { data, xScale, yScale, height } = props;

    //complete the getColor when you are asked to
    const getColor = () => {
        return
    }

    return <g>
        {data.map(d => {
            return <rect key={d.latitude} x={xScale(d.station)} y={yScale(d.start) + 70} width={xScale.bandwidth()} height={height - yScale(d.start)}
                fill={"steelblue"} stroke={"black"} />
        })}
    </g>
}