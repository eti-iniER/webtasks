import "./TaskItem.css";
import TaskCounter from "./TaskCounter";
import TaskTimer from "./TaskTimer"
import { useState } from "react";
import TaskCheckbox from "./TaskCheckbox";

const TaskItem = (props) => {
    const [active, setActive] = useState(false);
    const [menuState, setMenuState] = useState("closed");
    const [barWidth, setBarWidth] = useState(0);
    const [goalComplete, setGoalComplete] = useState(false);
    let activeClass = "";

    const toggleCheckbox = (state) => {
        if (state === true) {
            setBarWidth(100);
        } else {
            setBarWidth(0);
        }
    }
    const update = (value) => {
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

    const toggleMenu = () => {
        props.menu(props.id)
    }

    const goalCompleteHandler = (goalState) => {
        setGoalComplete(goalState);
    }
    return (
        <div className={`${"task-item" + " " + props.data.theme + " " + activeClass} ${goalComplete ? "completed" : ""} `} >
            {goalComplete ? <img src="src/assets/images/trophy.png" className="background"></img> : ""}
            <div className="task-item__details">
                <div className="task-item__emoji">{props.data.emoji}</div>
                <h1 className="task-item__name">{props.data.name}</h1>
                <button className="task-item__menu" onClick={toggleMenu}>
                    <span className="fa-solid fa-ellipsis-vertical"></span>
                </button>
                <p className="task-item__description">{props.data.description}</p>
            </div>
            <div className="task-item__action">
                {props.data.type === "Counter" ? <TaskCounter goal={props.data.goal} change={update} theme={props.data.theme} onCompleteGoal={goalCompleteHandler} /> : ""}
                {props.data.type === "Timer" ? <TaskTimer flip={doActivity} goal={props.data.goal} change={update} theme={props.data.theme} onCompleteGoal={goalCompleteHandler} /> : ""}
                {props.data.type === "Checkbox" ? <TaskCheckbox goal={props.data.goal} change={toggleCheckbox} theme={props.data.theme} onCompleteGoal={goalCompleteHandler} /> : ""}
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