import "./TaskCounter.css";
import { useState } from "react";

const TaskCounter = (props) => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
        props.change(count + 1);
    };

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
            props.change(count - 1);
        }
    }
    return (
        <div className="task-counter">
            <button className="task-counter__button" onClick={decreaseCount}><span className="fa-solid fa-minus"></span></button>
            <div className="task-counter__count"><span>{count}</span></div>
            <button className="task-counter__button" onClick={increaseCount}><span className="fa-solid fa-plus"></span></button>
        </div>
    )
}

export default TaskCounter;