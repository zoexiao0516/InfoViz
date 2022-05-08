import React from "react";

export function Tooltip(props) {
    const { d, left, top } = props;
    // console.log(left, top);

    if (left === null) {
        return <div></div>;
    } else {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            // width: "150px",
            // height: "100px",
            padding: "2px",
            font: "12px sans-serif",
            background: "lightblue",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: `${left + 10}px`,
            top: `${top}px`,
            transition: "all 2s"
        };
        return <div style={divStyle} >
            <p>State: {d.state}</p>
            <ul>
                <li>Killed: {d.n_killed}</li>
                <li>Injured: {d.n_injured}</li>
            </ul>
            <p>Read more at <a href={d.source_url}>{d.source_url}</a></p>
        </div>
    };
}