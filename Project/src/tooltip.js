import React from "react";

export function Tooltip(props) {
    const { d, left, top } = props;
    // console.log(d, left, top);

    if (left === null) {
        return <div></div>;
    } else {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            padding: "2px",
            font: "12px sans-serif",
            background: "steelblue",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: `${left + 10}px`,
            top: `${top}px`
        };
        return <div style={divStyle} >
            <p>State: {d.state}</p>
            <ul>
                <li>Killed: {d.n_killed}</li>
                <li>Injured: {d.n_injured}</li>
            </ul>
        </div>

    };
}