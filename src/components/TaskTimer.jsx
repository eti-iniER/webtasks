import "./TaskTimer.css";
import { useState } from "react";

const TaskTimer = (props) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    const getTime = (elapsed) => {
        let seconds = Math.min
        let minutes = elapsed % 3600;
        let hours = elapsed % 5;
    }
    return (
        <div className="task-timer">
            <div className="task-timer__button"><span className="fa-solid fa-play"></span></div>
            <div className="task-timer__timer"></div>
        </div>
    )
}

export default TaskTimer;