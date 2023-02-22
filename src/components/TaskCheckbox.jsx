import "./TaskCheckbox.css";
import { useState } from "react";

const TaskCheckbox = (props) => {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <div className="task-checkbox">
            <input type="checkbox" className="task-checkbox__checkbox">

            </input>
        </div>
    )
}

export default TaskCheckbox