import MenuModal from "./MenuModal";
import "./TaskDataPage.css";

const TaskDataPage = (props) => {

    const closeSelf = () => {
        props.close();
    }
    return (
        <MenuModal isVisible={props.visible} close={closeSelf}>
            <div className={`task-data-page ${props.task.theme}`}>
                <div className="task-data-page__overview">
                    <ul className="task-data-page__menu">
                        <li className="task-data-page__menu-item active">Stats</li>
                        <li className="task-data-page__menu-item">Notes</li>
                        <li className="task-data-page__menu-item">History</li>
                    </ul>
                    <h1 className="task-data-page__task-name">{props.task.name}</h1>
                    <p className="task-data-page__task-description">{props.task.description}</p>
                </div>
                <div className="task-data-page__section-container">
                    <div className={`task-data-page__section ${props.task.theme}`}>
                        <div className="task-data-page__section-header">
                            <span className={`section-title-icon ${props.task.theme} fa-solid fa-fire`}></span>
                            <h2 className="section-title">Streaks</h2>
                        </div>
                    </div>
                    <div className={`task-data-page__section ${props.task.theme}`}>
                        <div className="task-data-page__section-header">
                            <span className={`section-title-icon ${props.task.theme} fa-regular fa-circle-check`}></span>
                            <h2 className="section-title">Success rate</h2>
                        </div>
                    </div>
                    <div className={`task-data-page__section ${props.task.theme}`}>
                        <div className="task-data-page__section-header">
                            <span className={`section-title-icon ${props.task.theme} fa-solid fa-chart-simple`}></span>
                            <h2 className="section-title">History</h2>
                        </div>
                    </div>
                </div>
            </div>
        </MenuModal>
    )
}

export default TaskDataPage;