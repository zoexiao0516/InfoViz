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

    const WIDTH = 4000;
    const HEIGHT = 1000;
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

    const handleClick = (e, d) => {
        e.preventDefault();
        console.log('The link was clicked.');
        var url = d.source_url;
        console.log(url);
        window.open(url);
    };


    return <div>
        <svg width={WIDTH} height={HEIGHT}>
            <g>
                <GeoMap offsetX={margin.left} offsetY={margin.top}
                    map={map} data={dataAll}
                    height={innerHeight} width={innerWidth}
                    selectedIncident={selectedIncident}
                    mouseOver={mouseOver} mouseOut={mouseOut} handleClick={handleClick} />
            </g>
        </svg>
        <Tooltip d={selectedIncident} left={left} top={top} />
        <div style={{ color: "#333333", position: "absolute", textAlign: "right", width: "1400px", top: "8px" }}>
            <h1>Gun Violence in the US (2018) </h1>
            <a href="https://zoexiao0516.github.io/InfoViz/Project/src/charts/index.html">Cross-filter Chart</a>
        </div>

    </div>
}

export default Main;