import Calendar from "./Calendar";
import "./CreateTask.css";
import TaskSetupSelectorChoice from "./TaskSetupSelectorChoice";
import ChoicePage from "./ChoicePage";

import { useState } from "react";
import TaskConfigPage from "./TaskConfigPage";

const CreateTask = (props) => {
    const [taskCreationProgress, setTaskCreationProgress] = useState(0);

    let newTask = {};
    let buildLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "#0a8d45" }}></span>;
    let rightIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chevron-right"></span>;
    let quitLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-cancel" style={{ color: "tomato" }}></span>;
    let trackLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-arrow-trend-up" style={{ color: "orange" }}></span>;
    let simpleLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chart-simple" style={{ color: "orangered" }}></span>;

    const close = () => {
        // setTaskCreationProgress(1);
        props.close();
    }

    const howPage = () => {
        setTaskCreationProgress(2);
    }
    return (
        <div className="create-task" style={{ display: props.displayState }}>
            <ChoicePage displayState={taskCreationProgress === 1 ? "flex" : "none"}>
                <h2 className="create-task-header">What do you want to do?</h2>
                <TaskSetupSelectorChoice title="Build a habit" leftIcon={buildLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to do - successful if the goal you set is reached"
                    } action={howPage} />
                <TaskSetupSelectorChoice title="Quit a habit" leftIcon={quitLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to stop doing - successful if the goal you set is NOT reached"
                    } action={howPage} />

                <TaskSetupSelectorChoice title="Track progress" leftIcon={trackLeftIcon} rightIcon={rightIcon}
                    description={
                        "Track your progress over time (weight, savings, etc)"
                    } action={howPage} />

                <TaskSetupSelectorChoice title="Simply track a habit" leftIcon={simpleLeftIcon} rightIcon={rightIcon}
                    description={
                        "No goal or limit - just tracking what you're doing"
                    } action={howPage} />

            </ChoicePage>

            <ChoicePage displayState={taskCreationProgress === 2 ? "flex" : "none"}>
                <h2 className="create-task-header">How do you want to track it?</h2>
            </ChoicePage>
            <a className="cancel" onClick={close}>Cancel</a>

            <TaskConfigPage />
        </div>
    )
}

export default CreateTask;