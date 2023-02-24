import "./TaskSetupSelectorChoice.css"

const TaskSetupSelectorChoice = (props) => {

    return (
        <div className="task-setup-selector-choice" onClick={props.action}>
            {props.leftIcon}
            <div className="task-setup-selector-choice__details">
                <h2 className="task-setup-selector-choice__title">{props.title}</h2>
                <p className="task-setup-selector-choice__description">
                    {props.description}
                </p>
            </div>
            {props.rightIcon}
        </div>
    )
}

export default TaskSetupSelectorChoice;