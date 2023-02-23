import "./TaskItemMenu.css"

const TaskItemMenu = (props) => {

    return (
        <div className="task-item-menu__container" style={{ display: props.displayState }}>
            <div className="task-item-menu">
                <h1 className="task-item-menu__task-name">{props.task.name}</h1>
                <button className="task-item-menu__close-button" onClick={props.close}>
                    <span className="fa-solid fa-close"></span>
                </button>
                <ul className="task-item-menu__actions">
                    <li>
                        <span className="fa-regular fa-pen-to-square"></span>
                        <p className="task-item-menu__action-name">Edit</p>
                    </li>
                    <li>
                        <span className="fa-solid fa-filter"></span>
                        <p className="task-item-menu__action-name">Manage tags</p>
                    </li>
                    <li>
                        <span className="fa-solid fa-box-archive"></span>
                        <p className="task-item-menu__action-name">Archive</p>
                    </li>
                    <li>
                        <span className="fa-regular fa-rotate-left"></span>
                        <p className="task-item-menu__action-name">Reset</p>
                    </li>
                    <li>
                        <span className="fa-solid fa-trash" onClick={props.deleteTask}></span>
                        <p className="task-item-menu__action-name">Delete</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TaskItemMenu;