import "./TaskItem.css";
import TaskCounter from "./TaskCounter";

const TaskItem = (props) => {
    return (
        <div className="task-item">
            <div className="task-item__details">
                <div className="task-item__emoji">&#128261;</div>
                <h1 className="task-item__name">{props.data.name}</h1>
                <p className="task-item__description">{props.data.description}</p>
            </div>
            <div className="task-item__action">
                <TaskCounter />
            </div>
        </div>
    )
}

export default TaskItem;