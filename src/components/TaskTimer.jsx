import "./TaskTimer.css";
import { useState, useEffect } from "react";

const TaskTimer = (props) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [activeClass, setActiveClass] = useState("");

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

    useEffect(() => {
        if (timerRunning) {
            // console.log("Timer has started");
            setTimeout(() => {
                props.change(secondsElapsed + 1)
                setSecondsElapsed(secondsElapsed + 1);
            }, 1000)
        }
    }, [secondsElapsed, timerRunning]);

    const doTimer = () => {
        if (timerRunning == true) {
            props.flip();
            setActiveClass("");
            setTimerRunning(false);
        }
        else {
            props.flip();
            setTimerRunning(true);
            setActiveClass("active");
        }
    }
    return (
        <div className="task-timer">
            <div className={"task-timer__button" + " " + activeClass} onClick={doTimer}>
                {timerRunning ? <span className="fa-solid fa-pause"></span> : <span className="fa-solid fa-play"></span>}
            </div>
            <div className="task-timer__timer"><span>{displayTime()}</span></div>
        </div>
    )
}

export default TaskTimer;