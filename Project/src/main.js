import React from "react";
import { csv, json } from "d3";
import "./styles.css";
import { GeoMap } from "./geoMap";
import { Tooltip } from "./tooltip";

const csvUrl = 'https://raw.githubusercontent.com/zoexiao0516/InfoViz/main/Project/DATA/mapdata.csv';
const mapUrl = "https://raw.githubusercontent.com/zoexiao0516/InfoViz/main/Project/DATA/gz_2010_us_040_00_500k.json";

function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.incident_id = +d.incident_id;
                d.state = d.state;
                d.n_killed = +d.n_killed;
                d.n_injured = +d.n_injured;
                d.casualty = d.n_killed + d.n_injured; //derive a new attribute
                d.source_url = d.source_url;
                d.latitude = +d.latitude;
                d.longitude = +d.longitude;
            });

            // var groupedData = group(data, d => d.state);
            // console.log(groupedData);

            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}

function Main() {
    const [selectedIncident, setSelectedIncident] = React.useState(null);
    const [left, setLeft] = React.useState(null);
    const [top, setTop] = React.useState(null);

    const WIDTH = 2800;
    const HEIGHT = 900;
    const margin = { top: 0, right: 40, bottom: 40, left: 40, gap: 40 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);

    if (!map || !dataAll) {
        return <pre>Loading...</pre>;
    };

    // const selectedPoint = dataAll.filter(d => d.incident_id === selectedIncident)[0];

    const mouseOver = (event, d) => {
        setSelectedIncident(d);
        setLeft(event.pageX);
        setTop(event.pageY);

    };
    const mouseOut = () => {
        setSelectedIncident(null);
        setLeft(null);
        setTop(null);
    };

    return <div>
        <svg width={WIDTH} height={HEIGHT}>
            <g>
                <GeoMap offsetX={margin.left} offsetY={margin.top}
                    map={map} data={dataAll}
                    height={innerHeight} width={innerWidth}
                    selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident}
                    mouseOver={mouseOver} mouseOut={mouseOut} />
            </g>
        </svg>
        <Tooltip d={selectedIncident} left={left} top={top} />
        <div style={{ position: "absolute", textAlign: "center", width: "460px", left: "40px", top: "10px" }}>
            <h3>Gun Violence in US (2018)</h3>
            <p>A visualization of the numbers of casualty in US gun violence.</p>
        </div>

    </div>
}

export default Main;