import MenuModal from "./MenuModal";
import "./TaskDataPage.css";

const TaskDataPage = (props) => {

    const closeSelf = () => {
        props.close();
    }
    return (
        <MenuModal isVisible={props.visible} close={closeSelf}>
            <div className="task-data-page">
                <ul className="task-data-page__menu">
                    <li className="task-data-page__menu-item active">Stats</li>
                    <li className="task-data-page__menu-item">Notes</li>
                    <li className="task-data-page__menu-item">History</li>
                </ul>
                <div className="task-data-header">
                    <h1>{props.task.name}</h1>
                </div>
            </div>
        </MenuModal>
    )
}

export default TaskDataPage;