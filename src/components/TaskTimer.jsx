import "./TaskTimer.css";
import { useState } from "react";

const TaskTimer = (props) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    const getTime = (elapsed) => {
        let hours = Math.floor(elapsed / 3600);
        let minutes = Math.floor((elapsed - (3600 * hours)) / 60);
        let seconds = Math.floor(elapsed - (3600 * hours) - (60 * minutes));
        // console.log(`${hours}, ${minutes}, ${seconds}`);

        return [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")]
    }

    const displayTime = () => {
        const currentTime = getTime(secondsElapsed);
        return currentTime[0] + ":" + currentTime[1] + ":" + currentTime[2];
    }

    if (timerRunning) {
        setInterval(() => {
            console.log("One second has passed");
            setSecondsElapsed(secondsElapsed + 1);
        }, 1000);
    }

    const doTimer = () => {
        setTimerRunning(true);
    }
    return (
        <div className="task-timer">
            <div className="task-timer__button" onClick={doTimer}><span className="fa-solid fa-play"></span></div>
            <div className="task-timer__timer"><span>{displayTime()}</span></div>
        </div>
    )
}

export default TaskTimer;