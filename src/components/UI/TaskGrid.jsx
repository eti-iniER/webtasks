import "./TaskGrid.css";

const TaskGrid = (props) => {
    return (
        <div className="task-grid">
            {props.children.length > 0 ? props.children :
                <div className="task-grid__no-tasks">
                    <h2>You have no tasks</h2>
                    <button className="task-grid__create-task-button" onClick={props.sideBar}>Create Task</button>
                </div>}
        </div>
    )
}

export default TaskGrid;