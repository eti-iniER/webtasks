import "./CreateTask.css";
import TaskSetupSelectorChoice from "./TaskSetupSelectorChoice";
import Pagination from "./Pagination";
import { useState } from "react";

const CreateTask = (props) => {
    const [taskCreationProgress, setTaskCreationProgress] = useState(1);
    const [animation, setAnimation] = useState("slide-in");

    let newTask = {};
    let buildLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "#0a8d45" }}></span>;
    let rightIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chevron-right"></span>;
    let quitLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-cancel" style={{ color: "tomato" }}></span>;
    let trackLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-arrow-trend-up" style={{ color: "orange" }}></span>;
    let simpleLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chart-simple" style={{ color: "orangered" }}></span>;

    const close = () => {
        setAnimation("slide-out");
        props.close();
    }
    return (
        <div className="create-task" style={{ display: props.displayState, animationName: animation }}>
            <Pagination count={3} labels={["Want", "How", "Info"]} />
            <TaskSetupSelectorChoice title="Build a habit" leftIcon={buildLeftIcon} rightIcon={rightIcon}
                description={
                    "Something you want to do - successful if the goal you set is reached"
                } />
            <TaskSetupSelectorChoice title="Quit a habit" leftIcon={quitLeftIcon} rightIcon={rightIcon}
                description={
                    "Something you want to stop doing - successful if the goal you set is NOT reached"
                } />

            <TaskSetupSelectorChoice title="Track progress" leftIcon={trackLeftIcon} rightIcon={rightIcon}
                description={
                    "Track your progress over time (weight, savings, etc)"
                } />

            <TaskSetupSelectorChoice title="Simply track a habit" leftIcon={simpleLeftIcon} rightIcon={rightIcon}
                description={
                    "No goal or limit - just tracking what you're doing"
                } />

            <a className="cancel" onClick={close}>Cancel</a>
        </div>
    )
}

export default CreateTask;