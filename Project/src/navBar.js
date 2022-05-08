import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <ul>
            <li> <Link to="/">Map</Link></li>
            <li> <Link to="/charts">Charts</Link></li>
        </ul>
    );
}
