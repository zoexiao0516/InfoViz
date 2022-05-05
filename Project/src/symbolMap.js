import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function SymbolMap(props) {
    const { offsetX, offsetY, map, data, height, width, selectedStation, setSelectedStation } = props;
    const projection = geoMercator().fitSize([width, height], map);
    const path = geoPath(projection);
    const r = scaleLinear().range([2, 20]).domain([min(data, d => d.popularity), max(data, d => d.popularity)]);
    const mapstyle = { fill: "#9a9e9e", stroke: "C0C0BB" };
    const mouseOver = d => { setSelectedStation(d.station) };
    const mouseOut = () => { setSelectedStation(null) };
    const getColor = (selectedStation, station) => {
        return station === selectedStation ? "steelblue" : "red";
    }

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {map.features.map((feature, i) => {
            return <path key={i + "boundary"} style={mapstyle} d={path(feature)} />
        })}
        {data.map(d => {
            let [x, y] = projection([d.longitude, d.latitude])
            return <circle key={"station" + d.longitude + d.latitude}
                cx={x} cy={y} r={r(d.popularity)} opacity={0.7} stroke={"black"}
                fill={getColor(selectedStation, d.station)}
                onMouseOver={() => mouseOver(d)}
                onMouseOut={mouseOut} />

        })}

    </g>

}