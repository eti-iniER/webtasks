import MenuModal from "./MenuModal";
import "./TaskStatsPage.css";

const TaskStatsPage = (props) => {
    const closeSelf = () => {
        props.close();
    }
    return (
        <MenuModal isVisible={props.visible} close={closeSelf}>
            <div className="task-stats-page">
                <div className="task-stats-header">
                    <h1>{props.task.name}</h1>
                </div>
            </div>
        </MenuModal>
    )
}

export default TaskStatsPage;