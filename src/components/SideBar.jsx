import Calendar from "./Calendar";
import "./SideBar.css";
import TaskSetupSelectorChoice from "./TaskSetupSelectorChoice";
import ChoicePage from "./ChoicePage";

import { useState } from "react";
import TaskConfigPage from "./TaskConfigPage";

const SideBar = (props) => {
    const [taskCreationProgress, setTaskCreationProgress] = useState(1);

    let buildLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "#0a8d45" }}></span>;
    let rightIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chevron-right"></span>;
    let quitLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-cancel" style={{ color: "tomato" }}></span>;
    let trackLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-arrow-trend-up" style={{ color: "orange" }}></span>;
    let simpleLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chart-simple" style={{ color: "orangered" }}></span>;
    let doDontLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "orange" }}></span>;
    let amountLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-square-plus" style={{ color: "green" }}></span>;
    let timeLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-clock" style={{ color: "#329b4d" }}></span>;

    const close = () => {
        setTaskCreationProgress(1);
        props.close();
    }

    const nextPage = () => {
        setTaskCreationProgress(taskCreationProgress + 1);
    }
    return (
        <div className="create-task" style={{ display: props.displayState }}>
            <ChoicePage displayState={taskCreationProgress === 1 ? "flex" : "none"}>
                <h2 className="create-task-header">What do you want to do?</h2>
                <TaskSetupSelectorChoice title="Build a habit" leftIcon={buildLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to do - successful if the goal you set is reached"
                    } action={nextPage} />
                <TaskSetupSelectorChoice title="Quit a habit" leftIcon={quitLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to stop doing - successful if the goal you set is NOT reached"
                    } action={nextPage} />

                <TaskSetupSelectorChoice title="Track progress" leftIcon={trackLeftIcon} rightIcon={rightIcon}
                    description={
                        "Track your progress over time (weight, savings, etc)"
                    } action={nextPage} />

                <TaskSetupSelectorChoice title="Simply track a habit" leftIcon={simpleLeftIcon} rightIcon={rightIcon}
                    description={
                        "No goal or limit - just tracking what you're doing"
                    } action={nextPage} />

            </ChoicePage>

            <ChoicePage displayState={taskCreationProgress === 2 ? "flex" : "none"}>
                <h2 className="create-task-header">How do you want to track it?</h2>

                <TaskSetupSelectorChoice title="Track your do's or dont's" leftIcon={doDontLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - sobriety, flossing, laundry,, no fap, watering plants, etc"
                    } action={nextPage} />

                <TaskSetupSelectorChoice title="Track specific amount" leftIcon={amountLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - glasses of water, cups of coffee, pushups, situps, cigarettes, etc"
                    } action={nextPage} />

                <TaskSetupSelectorChoice title="Track specific time" leftIcon={timeLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - studying, fasting, gaming, working out, on social media, meditation, etc."
                    } action={nextPage} />

            </ChoicePage>

            {taskCreationProgress === 3 ? <TaskConfigPage createTask={props.createTask} /> : ""}

            <a className="cancel" onClick={close}>Cancel</a>
        </div>
    )
}

export default SideBar;