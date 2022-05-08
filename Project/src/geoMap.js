import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function GeoMap(props) {
    const { offsetX, offsetY, map, data, height, width, selectedIncident, mouseOver, mouseOut, handleClick } = props;
    const projection = geoMercator().fitSize([width, height], map);
    const path = geoPath(projection);
    const r = scaleLinear().range([2, 28]).domain([min(data, d => d.casualty), max(data, d => d.casualty)]);
    const mapstyle = { fill: "#9a9e9e", stroke: "C0C0BB" };
    // const mouseOver = d => { setSelectedIncident(d.incident_id) };
    // const mouseOut = () => { setSelectedIncident(null) };

    const getColor = (selectedIncident, incident) => {
        return incident === selectedIncident ? "steelblue" : "brown";
    }

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {map.features.map((feature, i) => {
            return <path key={i + "boundary"} style={mapstyle} d={path(feature)} />
        })}
        {data.map(d => {
            let [x, y] = projection([d.longitude, d.latitude])
            return <circle key={d.incident_id + d.longitude + d.latitude}
                cx={x} cy={y} r={r(d.casualty)} opacity={0.7}
                fill={getColor(selectedIncident, d)}
                onMouseOver={(event) => mouseOver(event, d)} onMouseOut={mouseOut}
                onClick={(event) => handleClick(event, d)} />

        })}
    </g>


}