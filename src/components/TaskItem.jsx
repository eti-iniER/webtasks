import "./TaskItem.css";

const TaskItem = (props) => {
    return (
        <div className="task-item">
            <div className="task-item__details">
                <h1 className="task-item__name">{props.data.name}</h1>
                <p className="task-item__description">{props.data.description}</p>
            </div>
            <div className="task-item-counter">

            </div>
        </div>
    )
}

export default TaskItem;