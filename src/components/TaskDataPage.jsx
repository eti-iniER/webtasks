import MenuModal from "./MenuModal";
import "./TaskDataPage.css";

const TaskDataPage = (props) => {

    const closeSelf = () => {
        props.close();
    }
    return (
        <MenuModal isVisible={props.visible} close={closeSelf}>
            <div className="task-data-page">
                <div className="task-data-page__overview">
                    <ul className="task-data-page__menu">
                        <li className="task-data-page__menu-item active">Stats</li>
                        <li className="task-data-page__menu-item">Notes</li>
                        <li className="task-data-page__menu-item">History</li>
                    </ul>
                    <h1>{props.task.name}</h1>
                </div>
                <div className="task-data-page__section-container">
                    <div className="task-data-page__section">
                        <div className="task-data-page__section-header">
                            <span className="section-title-icon fa-solid fa-fire"></span>
                            <h2 className="section-title">Streaks</h2>
                        </div>
                    </div>
                </div>
            </div>
        </MenuModal>
    )
}

export default TaskDataPage;