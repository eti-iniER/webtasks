import "./TaskCounter.css";
import { useState } from "react";

const TaskCounter = (props) => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        console.log(props.goal);
        setCount(count + 1);
        if (count + 1 >= props.goal) {
            // the user has reached the goal
            props.onCompleteGoal(true);
        }
        props.change(count + 1);
    };

    const decreaseCount = () => {
        if (count - 1 < props.goal) {
            props.onCompleteGoal(false);
        }
        if (count > 0) {
            setCount(count - 1);
            props.change(count - 1);
        }

    }
    return (
        <div className="task-counter">
            <button className={"task-counter__button" + " " + props.theme} onClick={decreaseCount}><span className="fa-solid fa-minus"></span></button>
            <div className="task-counter__count"><span>{count}</span></div>
            <button className={"task-counter__button" + " " + props.theme} onClick={increaseCount}><span className="fa-solid fa-plus"></span></button>
        </div>
    )
}

export default TaskCounter;