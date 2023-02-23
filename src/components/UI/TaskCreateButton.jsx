import "./TaskCreateButton.css";

const TaskCreateButton = (props) => {

    return (
        <button className="task-create-button" onClick={props.toggleCreateMenu}>
            <span className="fa-solid fa-plus"></span>
        </button>
    )
}

export default TaskCreateButton;