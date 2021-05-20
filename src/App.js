import React from "react";
import ControlLine from "./redux/components/controlLine";
import Timer from "./redux/components/timer";
import './App.css';

function App() {
    return (
        <div className="main">
            <div className="main-title">25 + 5 Clock</div>
            <ControlLine/>
            <Timer/>
        </div>
    );
}

export default App;
