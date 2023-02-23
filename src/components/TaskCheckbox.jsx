import "./TaskCheckbox.css";
import { useState } from "react";

const TaskCheckbox = (props) => {
    const [checkbox, setCheckbox] = useState(false);

    const mark = () => {
        props.change(!checkbox)
        setCheckbox(!checkbox);
    }
    return (
        <div className="task-checkbox">
            <div className={"task-checkbox__checkbox" + " " + props.theme} onClick={mark}>
                {checkbox ? <span className="fa-solid fa-check"></span> : ""}
            </div>
        </div>
    )
}

export default TaskCheckbox