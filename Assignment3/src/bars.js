import React from "react";

export function Bars(props) {
    const { data, xScale, yScale, height } = props;
    const [selectedStation, SetSelectedStation] = React.useState(null);

    const mouseEnter = (d) => {
        SetSelectedStation(d);
    };
    const mouseOut = () => {
        SetSelectedStation(null);
    };

    // complete the getColor when you are asked to
    const getColor = (selectedStation, station) => {
        if (selectedStation == station) {
            return "red";
        } else {
            return "steelblue";
        }
    }

    if (selectedStation == null) {
        return <g>
            {data.map(d => {
                return <rect key={d.latitude} x={xScale(d.station)} y={yScale(d.start) + 70}
                    width={xScale.bandwidth()} height={height - yScale(d.start)}
                    fill={"steelblue"} stroke={"black"}
                    onMouseEnter={() => mouseEnter(d)} onMouseOut={mouseOut} />
            })}
        </g>
    } else {
        return <g>
            {data.map(d => {
                return (
                    < rect key={d.station} x={xScale(d.station)} y={yScale(d.start) + 70}
                        width={xScale.bandwidth()} height={height - yScale(d.start)}
                        fill="steelblue" stroke={"black"}
                        onMouseEnter={() => mouseEnter(d)} onMouseOut={mouseOut} />
                )
            })}
            {data.filter(d => d.station == selectedStation.station).map(d => {
                return (
                    <rect key={d.station} x={xScale(d.station)} y={yScale(d.start) + 70}
                        width={xScale.bandwidth()} height={height - yScale(d.start)}
                        fill={getColor(selectedStation, d)} stroke={"black"}
                        onMouseEnter={() => mouseEnter(d)} onMouseOut={mouseOut} />
                )
            })}

        </g>
    }
}