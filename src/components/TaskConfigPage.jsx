import { useEffect, useRef, useState } from "react";
import "./TaskConfigPage.css";

const TaskConfigPage = (props) => {
    let defaultTask = {
        buildOrQuit: "",
        name: "",
        description: "Build • 3h • Every day",
        type: "Counter",
        emoji: "💻",
        theme: "blue",
        start: "",
        goal: 0,
        reminders: [],
    };

    defaultTask = { ...props.presets };

    const colors = ["#5ba6ec", "#e05a39", "#da8d35", "#279e59", "#962a96"];
    const colorThemes = ["blue", "red", "orange", "green", "purple"];
    // blue, red, orange, green, purple
    const [currentColor, setCurrentColor] = useState(0);
    const [periodDropdownDisplay, setPeriodDropdownDisplay] = useState("none");
    const [seconds, setSeconds] = useState("");
    const [minutes, setMinutes] = useState("");
    const [hours, setHours] = useState("");
    const [taskName, setTaskName] = useState(defaultTask.name);
    const [taskDescription, setTaskDescription] = useState(defaultTask.description);
    const [taskGoal, setTaskGoal] = useState(defaultTask.goal);
    const [taskTheme, setTaskTheme] = useState(defaultTask.theme);
    const [taskType, setTaskType] = useState(defaultTask.type);
    const [taskEmoji, setTaskEmoji] = useState(defaultTask.emoji);

    useEffect(() => {
        setTaskGoal(Number(hours * 3600) + Number(minutes * 60) + Number(seconds));

    }, [hours, minutes, seconds])

    const cycleColor = () => {
        setTaskTheme(colorThemes[(currentColor + 1) % colors.length]);
        setCurrentColor((currentColor + 1) % colors.length);
    }

    const togglePeriodDropdown = () => {
        if (periodDropdownDisplay === "none") {
            setPeriodDropdownDisplay("flex");
        } else {
            setPeriodDropdownDisplay("none");
        }
    }

    const handleNameInput = (event) => {
        setTaskName(event.target.value);
    }

    const handleAmountInput = (event) => {
        setTaskGoal(event.target.value);
    }

    const handleSecondsInput = (event) => {
        setSeconds(event.target.value);
    }

    const handleMinutesInput = (event) => {
        setMinutes(event.target.value);
    }

    const handleHoursInput = (event) => {
        setHours(event.target.value);
    };

    const saveTask = () => {
        let task = {
            name: taskName,
            description: taskDescription,
            theme: taskTheme,
            goal: taskGoal,
            type: taskType,
            emoji: taskEmoji,
        }
        props.createTask(task);

    }
    return (
        <div className="task-config-page">
            <div className="task-config-form">
                <div className="task-config-form__field">
                    <label>BUILD OR QUIT THIS HABIT?</label>
                    <input type="text" value={props.previousChoices.buildOrQuit}></input>
                </div>

                <div className="task-config-form__field">
                    <label>HABIT NAME</label>
                    <input type="text" onChange={(event) => { handleNameInput(event) }}></input>
                </div>

                {props.previousChoices.type === "Timer" ?
                    <div className="task-config-form__field time-container">
                        <span className="task-config-form__label">LENGTH OF TIME</span>
                        <div className="task-config-form__time">
                            <div className="task-config-form__field">
                                <input type="number" placeholder="hours" onChange={(event) => { handleHoursInput(event) }} min={0} max={100} value={hours}></input>
                            </div>
                            <div className="task-config-form__field">
                                <input type="number" placeholder="minutes" onChange={(event) => { handleMinutesInput(event) }} min={0} max={59} value={minutes}></input>
                            </div>
                            <div className="task-config-form__field">
                                <input type="number" placeholder="seconds" onChange={(event) => { handleSecondsInput(event) }} min={0} max={59} value={seconds}></input>
                            </div>
                        </div>
                    </div> : ""}

                {props.previousChoices.type === "Counter" ?
                    <div className="task-config-form__field">
                        <label>AMOUNT PER PERIOD</label>
                        <input type="number" min={1} onChange={(event) => { handleAmountInput(event) }}></input>
                    </div> : ""}

                <div className="task-config-form__field">
                    <label>PERIOD</label>
                    <div className="task-config-form__dropdown form-input" onClick={togglePeriodDropdown}>
                        Every day
                        {periodDropdownDisplay === "none" ? <span className="task-config-form__dropdown-icon fa-solid fa-chevron-down"></span> :
                            <span className="task-config-form__dropdown-icon fa-solid fa-chevron-up"></span>}
                        <ul className="task-config-form__dropdown-content" style={{ display: periodDropdownDisplay }}>
                            <li>Every day</li>
                            <li>Every week</li>
                            <li>Every month</li>
                            <li>Every year</li>
                            <li>Select week days</li>
                            <li>Every X days</li>
                            <li>X times per Y</li>
                        </ul>
                    </div>
                </div>

                <div className="task-config-form__emoji-colour-container">
                    <div className="task-config-form__field color">
                        <label>EMOJI</label>
                        <div className="task-config-form__emoji-picker"><span className="task-config-form__emoji-picker-emoji">➗</span></div>
                    </div>

                    <div className="task-config-form__field color">
                        <label>COLOR</label>
                        <div className="task-config-form__color-picker" style={{ borderColor: colors[currentColor], backgroundColor: colors[currentColor] }} onClick={cycleColor}><span className="fa-solid fa-palette"></span></div>
                    </div>

                </div>


                <button className="task-config-form__submit" onClick={saveTask}>Create Task</button>
            </div>
        </div>
    )
}

export default TaskConfigPage;