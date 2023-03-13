import "./TaskTag.css";

const TaskTag = (props) => {
    const removeSelf = () => {
        props.onDelete(props.name);
    };

    return (
        <div className="task-tag">
            <span className="task-tag__name">{props.name}</span>
            <button className="task-tag__close" onClick={removeSelf}><span className="fa-solid fa-close"></span></button>
        </div>
    )
}

export default TaskTag;