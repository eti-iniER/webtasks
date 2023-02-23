import "./TaskItem.css";
import TaskCounter from "./TaskCounter";
import TaskTimer from "./TaskTimer"
import { useState } from "react";
import TaskCheckbox from "./TaskCheckbox";

const TaskItem = (props) => {
    const [active, setActive] = useState(false);
    const [barWidth, setBarWidth] = useState(0);
    let activeClass = "";

    const update = (value) => {
        if (value === true) {
            // for the checkbox-type of task. This is a potential bug if you don't use ===
            setBarWidth(100);
            return
        }
        let newBarWidth = Math.floor(value / props.data.goal * 100);
        // console.log(`Bar width is ${newBarWidth}`);
        setBarWidth(newBarWidth);
    }

    const doActivity = () => {
        setActive(!active);
    }

    if (active) {
        activeClass = "active";
    }
    else {
        activeClass = "";
    }
    return (
        <div className={"task-item" + " " + props.data.theme + " " + activeClass} >
            <div className="task-item__details">
                <div className="task-item__emoji">{props.data.emoji}</div>
                <h1 className="task-item__name">{props.data.name}</h1>
                <p className="task-item__description">{props.data.description}</p>
            </div>
            <div className="task-item__action">
                {props.data.type === "Counter" ? <TaskCounter goal={props.goal} change={update} theme={props.data.theme} /> : ""}
                {props.data.type === "Timer" ? <TaskTimer flip={doActivity} goal={props.goal} change={update} theme={props.data.theme} /> : ""}
                {props.data.type === "Checkbox" ? <TaskCheckbox goal={props.goal} change={update} theme={props.data.theme} /> : ""}
            </div>
            <div className="task-item__progress-bar-container">
                <div className={"task-item__progress-bar" + " " + props.data.theme + " " + activeClass}>
                    <div className={"task-item__progress-bar-bar" + " " + props.data.theme + " " + activeClass} style={{ width: barWidth.toString() + "%" }}></div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;