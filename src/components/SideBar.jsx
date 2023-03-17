import Calendar from "./Calendar";
import "./SideBar.css";
import TaskSetupSelectorChoice from "./TaskSetupSelectorChoice";
import ChoicePage from "./ChoicePage";

import { useEffect, useState } from "react";
import TaskConfigPage from "./TaskConfigPage";

const SideBar = (props) => {
    let defaultChoices = {
        buildOrQuit: "Build",
    }


    const [taskCreationProgress, setTaskCreationProgress] = useState(1);
    const [choices, setChoices] = useState(defaultChoices);
    const [taskToBeEdited, setTaskToBeEdited] = useState({});

    useEffect(() => {
        if (props.isEdit === true) {
            setTaskToBeEdited(props.getTask(props.taskIndex));
            setTaskCreationProgress(3);
        }
    })

    let buildLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "#0a8d45" }}></span>;
    let rightIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chevron-right"></span>;
    let quitLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-cancel" style={{ color: "tomato" }}></span>;
    let trackLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-arrow-trend-up" style={{ color: "orange" }}></span>;
    let simpleLeftIcon = <span className="task-setup-selector-choice__icon fa-solid fa-chart-simple" style={{ color: "orangered" }}></span>;
    let doDontLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-circle-check" style={{ color: "orange" }}></span>;
    let amountLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-square-plus" style={{ color: "green" }}></span>;
    let timeLeftIcon = <span className="task-setup-selector-choice__icon fa-regular fa-clock" style={{ color: "#329b4d" }}></span>;

    const close = () => {
        props.close();
        setTaskCreationProgress(1);
    }
    const nextPage = () => {
        setTaskCreationProgress(taskCreationProgress + 1);
    }

    const setToBuild = () => {
        setChoices({ ...choices, buildOrQuit: "Build" });
        nextPage();
    }
    const setToQuit = () => {
        setChoices({ ...choices, buildOrQuit: "Quit" });
        nextPage();
    }
    const setToTrack = () => {
        setChoices({ ...choices, buildOrQuit: "Track" });
        nextPage();
    }
    const setToCounter = () => {
        setChoices({ ...choices, type: "Counter" })
        nextPage()
    }
    const setToTimer = () => {
        setChoices({ ...choices, type: "Timer" })
        nextPage();
    }
    const setToCheckbox = () => {
        setChoices({ ...choices, type: "Checkbox" })
        nextPage();
    }
    const createTask = (taskData) => {
        let defaultChoices = {
            buildOrQuit: "Build",
        }
        props.createTask(taskData);
    }

    const saveEditHandler = (taskData) => {
        console.log(taskData);
        props.saveEdit({ ...taskData, id: props.taskIndex });
        setTaskToBeEdited({})
        setTaskCreationProgress(1);
    }

    return (
        <div className="sidebar" style={{ display: props.displayState, animationName: props.animation }}>
            <ChoicePage displayState={taskCreationProgress === 1 ? "flex" : "none"}>
                <h2 className="create-task-header">What do you want to do?</h2>
                <TaskSetupSelectorChoice title="Build a habit" leftIcon={buildLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to do - successful if the goal you set is reached"
                    } action={setToBuild} />
                <TaskSetupSelectorChoice title="Quit a habit" leftIcon={quitLeftIcon} rightIcon={rightIcon}
                    description={
                        "Something you want to stop doing - successful if the goal you set is NOT reached"
                    } action={setToQuit} />

                <TaskSetupSelectorChoice title="Track progress" leftIcon={trackLeftIcon} rightIcon={rightIcon}
                    description={
                        "Track your progress over time (weight, savings, distances etc)"
                    } action={setToTrack} />

                <TaskSetupSelectorChoice title="Simply track a habit" leftIcon={simpleLeftIcon} rightIcon={rightIcon}
                    description={
                        "No goal or limit - just tracking what you're doing at the moment"
                    } action={setToTrack} />

            </ChoicePage>

            <ChoicePage displayState={taskCreationProgress === 2 ? "flex" : "none"}>
                <h2 className="create-task-header">How do you want to track it?</h2>

                <TaskSetupSelectorChoice title="Track your do's or dont's" leftIcon={doDontLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - sobriety, flossing, laundry, no fap, watering plants, etc"
                    } action={setToCheckbox} />

                <TaskSetupSelectorChoice title="Track specific amount" leftIcon={amountLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - glasses of water, cups of coffee, pushups, situps, cigarettes, etc"
                    } action={setToCounter} />

                <TaskSetupSelectorChoice title="Track specific time" leftIcon={timeLeftIcon} rightIcon={rightIcon}
                    description={
                        "For example - studying, fasting, gaming, working out, on social media, meditation, etc."
                    } action={setToTimer} />

            </ChoicePage>

            {taskCreationProgress === 3 || props.thisIsAnEdit ? <TaskConfigPage previousChoices={choices} createTask={createTask} closeSidebar={close}
                preconfigs={taskToBeEdited} thisIsAnEdit={props.isEdit} saveEdit={saveEditHandler} /> : ""}

            <a className="cancel" onClick={close}>Cancel</a>
        </div>
    )
}
export default SideBar