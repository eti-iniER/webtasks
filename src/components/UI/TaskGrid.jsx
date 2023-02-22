import "./TaskGrid.css";

const TaskGrid = (props) => {

    return (
        <div className="task-grid">
            {props.children}
        </div>
    )
}

export default TaskGrid;