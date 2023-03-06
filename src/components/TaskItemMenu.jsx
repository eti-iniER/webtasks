import "./TaskItemMenu.css"
import MenuModal from "./MenuModal";

const TaskItemMenu = (props) => {
    const editTaskHandler = () => {
        props.showEditMenu(props.task.id);
    };

    const deleteTaskHandler = () => {
        props.deleteTask(props.task.id)
    };

    let menuWidth = "100vw"
    if (props.sideBarState === "flex") {
        menuWidth = "65vw";
    } else {
        menuWidth = "100vw";
    }

    return (
        <MenuModal isVisible={true}>
            <div className="task-item-menu">
                <h1 className="task-item-menu__task-name">{props.task.name}</h1>
                <ul className="task-item-menu__actions">
                    <li onClick={editTaskHandler}>
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
                    <li onClick={deleteTaskHandler}>
                        <span className="fa-solid fa-trash"></span>
                        <p className="task-item-menu__action-name">Delete</p>
                    </li>
                </ul>
            </div>
        </MenuModal>
    )
}

export default TaskItemMenu;